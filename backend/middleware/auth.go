package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/sp-yduck/makibi/backend/logger"
	"github.com/sp-yduck/makibi/backend/oauth"
)

const (
	BearerPrefix        = "Bearer "
	AuthorizationHeader = "Authorization"
	SessionCookieName   = "access_token"
)

var (
	log             = logger.S().With("pkg", "middleware")
	ErrInvalidToken = fmt.Errorf("invalid beare token")
)

// authentication middleware checks session
func AuthMiddleware(c *gin.Context) {
	tokenString, err := c.Cookie(SessionCookieName)
	if err != nil {
		log.Debugf("no authorization cookie : %v", err)

		// no cookie, check authorization header
		authorizationHeader := c.GetHeader(AuthorizationHeader)
		if authorizationHeader == "" {
			log.Debug("no authorization header")
			c.String(http.StatusUnauthorized, "Unauthorized")
			c.Abort()
			return
		}
		if !strings.HasPrefix(authorizationHeader, BearerPrefix) {
			log.Errorf("invalid authorization header: %s", authorizationHeader)
			c.String(http.StatusUnauthorized, ErrInvalidToken.Error())
			c.Abort()
			return
		}
		tokenString = authorizationHeader[len(BearerPrefix):]
	}

	log.Debugf("jwt token string = %s", tokenString)
	userID, err := validateJWTToken(tokenString)
	if err != nil {
		log.Errorf("invalid token: %v", err)
		log.Debugf("token: %s", tokenString)
		c.String(http.StatusUnauthorized, ErrInvalidToken.Error())
		c.Abort()
		return
	}
	c.Set("userid", userID)
	c.Next()
}

// validateJWTToken validates a JWT token and returns the user ID if the token is valid.
func validateJWTToken(tokenString string) (string, error) {
	token, err := parseJWTToken(tokenString)
	if err != nil {
		return "", err
	}
	if !token.Valid {
		return "", ErrInvalidToken
	}
	userID, ok := token.Claims.(jwt.MapClaims)["user_id"].(string)
	if !ok {
		return "", ErrInvalidToken
	}
	return userID, nil
}

func parseJWTToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(oauth.TokenSecret()), nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}
