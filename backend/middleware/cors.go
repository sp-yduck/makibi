package middleware

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var (
	// cors config
	allowOrigins = []string{"http://localhost:5173"}
	allowHeaders = []string{
		"Authorization",
		"Content-Type",
		"Content-Length",
		"Authorization",
		"Access-Control-Allow-Origin",
		"Access-Control-Allow-Credentials",
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Methods",
		"Set-Cookie",
		"Cookie",
	}
	allowCredentials = true
	maxAge           = 1 * time.Hour
)

// returns a new cors middleware
func NewCorsMiddleware() gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowOrigins:     allowOrigins,
		AllowHeaders:     allowHeaders,
		AllowCredentials: allowCredentials,
		MaxAge:           maxAge,
	})
}
