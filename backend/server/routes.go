package server

import (
	"github.com/gin-gonic/gin"
	"github.com/sp-yduck/makibi/backend/handler"
	"github.com/sp-yduck/makibi/backend/middleware"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// register handlers to each endpoint
func registerRoutes(r *gin.Engine) {
	// to do: cors config
	r.Use(middleware.NewCorsMiddleware())

	// auth
	auth := r.Group("/auth/v1")
	{
		auth.GET("/github/login", handler.AuthGithubLogin)
		auth.GET("/github/callback", handler.AuthGithubCallback)
	}

	// api
	api := r.Group("/api/v1")
	api.Use(middleware.AuthMiddleware)
	{
		// auth and user
		api.GET("/me", handler.GetAuthenticatedUser)

		// user
		user := api.Group("/users/:userid")
		user.Use(middleware.UserMiddleware)
		{
			user.GET("", handler.GetUser)
			user.PUT("", handler.UpdateUser)
			// user.DELETE("", deleteUser)
		}
	}

	if isDebugMode() {
		// swagger docs
		docs := r.Group("/docs")
		// to do: auth for docs
		// docs.Use(middleware.AuthMiddleware)
		{
			docs.GET("/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
		}
	}
}

// true if debug mode
func isDebugMode() bool {
	return gin.Mode() == gin.DebugMode
}
