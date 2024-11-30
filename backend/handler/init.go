package handler

import (
	// "github.com/sp-yduck/makibi/backend/middleware"
	"github.com/sp-yduck/makibi/backend/logger"
	// "golang.org/x/oauth2"
)

var (
	log = logger.S().With("pkg", "handler")

	// oauth
	// githubOauthConfig *oauth2.Config
	// callbackURL       string
	// tokenSecret       string
)

// initialize handler pkg: init validator, load oauth config etc.
// must be executed after middleware.InitMiddleware()
func InitHandlers() error {
	log.Info("initializing handlers")

	// oauth
	// to do: do not use alias, just use each func directly
	// githubOauthConfig = middleware.GithubOauthConfig()
	// callbackURL = middleware.CallbackURL()
	// tokenSecret = middleware.TokenSecret()
	return nil
}
