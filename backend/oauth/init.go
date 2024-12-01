package oauth

import (
	"fmt"

	"github.com/sp-yduck/makibi/backend/log"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

var (
	// oauth
	callbackURL       string
	tokenSecret       string
	githubOauthConfig *oauth2.Config
	githubOauthScope  = []string{"user:email"}
)

type OAuth2Config struct {
	GithubClientID     string `yaml:"githubClientID" validate:"required"`
	GithubClientSecret string `yaml:"githubClientSecret" validate:"required"`
	GithubRedirectURL  string `yaml:"githubRedirectURL" validate:"required"`
	LoginCallbackURL   string `yaml:"loginCallbackURL" validate:"required"`
	TokenSecret        string `yaml:"tokenSecret" validate:"required"`
}

// initialize config
func InitOauthConfig(cfg OAuth2Config) error {
	log.S().Debug("initializing oauth config")

	if cfg.GithubClientID == "" || cfg.GithubRedirectURL == "" {
		return fmt.Errorf("github client_id or redirect_url must not be empty")
	}
	githubOauthConfig = &oauth2.Config{
		ClientID:     cfg.GithubClientID,
		ClientSecret: cfg.GithubClientSecret,
		RedirectURL:  cfg.GithubRedirectURL,
		Scopes:       githubOauthScope,
		Endpoint:     github.Endpoint,
	}
	callbackURL = cfg.LoginCallbackURL
	tokenSecret = cfg.TokenSecret
	if includesEmptyString(callbackURL, tokenSecret) {
		return fmt.Errorf("callback_url or token_secret must not be empty")
	}
	return nil
}

func includesEmptyString(ss ...string) bool {
	for _, s := range ss {
		if s == "" {
			return true
		}
	}
	return false
}

func CallbackURL() string {
	return callbackURL
}

func TokenSecret() string {
	return tokenSecret
}

func GithubOauthConfig() *oauth2.Config {
	return githubOauthConfig
}
