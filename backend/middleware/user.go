package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sp-yduck/makibi/backend/model"
)

// user middleware checks if user exists and authorized
func UserMiddleware(c *gin.Context) {
	userID := c.Param("userid")
	authorizedUserID, ok := c.Get("userid")
	if !ok {
		log.Debug("unauthorized user")
		c.String(http.StatusUnauthorized, "Unauthorized")
		c.Abort()
		return
	}
	if userID != authorizedUserID {
		// use can see only owned resource
		log.Debugf("user %s can not see %s's resource", authorizedUserID, userID)
		c.String(http.StatusNotFound, "404 page not found")
		c.Abort()
		return
	}
	user, err := model.GetUser(userID)
	if err != nil {
		if !model.IsRecordNotFound(err) {
			log.Errorf("internal server error: %v", err)
			c.String(http.StatusInternalServerError, "internal server error")
			c.Abort()
			return
		}
		// user not found, return error
		log.Debugf("user %s not found", userID)
		c.String(http.StatusNotFound, "404 page not found")
		c.Abort()
		return
	}
	c.Set("user", &user)
}