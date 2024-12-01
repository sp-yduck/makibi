package handler

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/go-github/v66/github"
	"github.com/sp-yduck/makibi/backend/log"
	"github.com/sp-yduck/makibi/backend/middleware"
	"github.com/sp-yduck/makibi/backend/model"
	"github.com/sp-yduck/makibi/backend/oauth"
	"golang.org/x/oauth2"
)

const (
	// oauth
	OAuthState = "oauthstate"

	// jwt
	TokenIssuer       = "makibi-api"
	TokenExpiry       = 24 * time.Hour
	SessionCookieName = middleware.SessionCookieName

	// cookie
	// to do : make it configurable
	// max age for session cookie (24 hours)
	SetCookieSessionMaxAge = 24 * 60 * 60
	// max age for oauth state code (1 hour)
	SetCookieStateMaxAge = 1 * 60 * 60
	SetCookiePath        = "/"
	SetCookieDomain      = "localhost"
	SetCookieSecure      = true
	SetCookieHttpOnly    = true
)

// /auth/github/login
func AuthGithubLogin(c *gin.Context) {
	state := generateOauthStateCookie(c)
	url := oauth.GithubOauthConfig().AuthCodeURL(state)
	c.Redirect(http.StatusTemporaryRedirect, url)
}

// /auth/github/callback
func AuthGithubCallback(c *gin.Context) {
	oauthState, err := c.Cookie(OAuthState)
	if c.Query("state") != oauthState || err != nil {
		log.S().Errorf("invalid oauth state(%s): %v", oauthState, err)
		c.String(http.StatusUnauthorized, "invalid oauth state")
		return
	}

	// exchange code into a token
	token, err := oauth.GithubOauthConfig().Exchange(c.Request.Context(), c.Query("code"))
	if err != nil {
		log.S().Errorf("failed to exchange github access token: %v", err)
		c.String(http.StatusBadRequest, "invalid oauth code")
	}
	log.S().Debugf("Got token for github: %v", *token)

	// get gh user data
	gUser, err := getUserDataFromGithub(c.Request.Context(), token)
	if err != nil {
		log.S().Errorf("failed to get github user data: %v", err)
		c.String(http.StatusBadRequest, "failed to get github user data")
		return
	}
	log.S().Debugf("Got user info for %s", *gUser.Login)

	// create entry for the user
	userID := *gUser.Login
	if err := model.CreateOrUpdateUser(
		&model.User{
			UserID:       *gUser.Login,
			EmailAddress: *gUser.Email,
		},
	); err != nil {
		log.S().Errorf("failed to create ot create user: %v", err)
		c.String(http.StatusInternalServerError, "internal server error")
		return
	}

	c.Set("userid", userID)
	jwtToken, err := generateJWTToken(userID)
	if err != nil {
		log.S().Errorf("failed to generate jwt token: %v", err)
		c.String(http.StatusInternalServerError, "internal server error")
		return
	}
	c.SetCookie(
		SessionCookieName,
		jwtToken,
		SetCookieSessionMaxAge,
		SetCookiePath,
		SetCookieDomain,
		SetCookieSecure,
		SetCookieHttpOnly,
	)
	c.SetSameSite(http.SameSiteNoneMode)
	c.Redirect(http.StatusTemporaryRedirect, oauth.CallbackURL())
}

// generate oauthstate and set it to cookie
func generateOauthStateCookie(c *gin.Context) string {
	b := make([]byte, 16)
	_, _ = rand.Read(b)
	state := base64.URLEncoding.EncodeToString(b)
	c.SetCookie(
		OAuthState,
		state,
		SetCookieStateMaxAge,
		SetCookiePath,
		SetCookieDomain,
		SetCookieSecure,
		SetCookieHttpOnly,
	)
	return state
}

// get github user data
func getUserDataFromGithub(ctx context.Context, token *oauth2.Token) (*github.User, error) {
	client := github.NewClient(oauth.GithubOauthConfig().Client(ctx, token))
	user, res, err := client.Users.Get(ctx, "")
	log.S().Debug(res)
	if err != nil {
		log.S().Errorf("failed to get github user data: %v", err)
		return nil, err
	}
	emails, res, err := client.Users.ListEmails(ctx, &github.ListOptions{})
	log.S().Debug(res)
	if err != nil {
		log.S().Errorf("failed to get github user emails: %v", err)
		return nil, err
	}
	for _, email := range emails {
		if *email.Primary {
			user.Email = email.Email
		}
	}
	log.S().Debug(user)
	return user, nil
}

func generateJWTToken(userID string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"iss":     TokenIssuer,
		"exp":     time.Now().Add(TokenExpiry).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(oauth.TokenSecret()))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
