package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sp-yduck/makibi/backend/model"
)

// getAuthenticatedUser returns the authenticated user
//
//	@Summary		get current authorized user
//	@Description	get current authorized user
//	@Tags			me
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	model.User
//	@Failure		401	{string}	string	"Unauthorized"
//	@Failure		500	{string}	string	"internal server error"
//	@Router			/me [get]
func GetAuthenticatedUser(c *gin.Context) {
	userID, ok := c.Get("userid")
	if !ok {
		c.String(http.StatusUnauthorized, "Unauthorized")
		return
	}
	user, err := model.GetUser(userID.(string))
	if err != nil {
		log.Errorf("internal server error: %v", err)
		c.String(http.StatusInternalServerError, "internal server error")
		return
	}
	c.JSON(http.StatusOK, user)
}

// @Summary		get specific user
// @Description	get specific user
// @Tags			users
// @Accept			json
// @Produce		json
// @Param			user_id	path		string	true	"User ID"
// @Success		200		{object}	model.User
// @Failure		401		{string}	string	"Unauthorized"
// @Failure		500		{string}	string	"internal server error"
// @Router			/users/{user_id} [get]
func GetUser(c *gin.Context) {
	user, ok := c.Get("user")
	if !ok {
		c.String(http.StatusNotFound, "404 page not found")
		return
	}
	c.JSON(http.StatusOK, user)
}

// @Summary		get specific user
// @Description	get specific user
// @Tags			users
// @Accept			json
// @Produce		json
// @Param			user_id	path		string		true	"User ID"
// @Param			user	body		model.User	true	"User"
// @Success		200		{object}	model.User
// @Failure		401		{string}	string	"Unauthorized"
// @Failure		500		{string}	string	"internal server error"
// @Router			/users/{user_id} [put]
func UpdateUser(c *gin.Context) {
	_, ok := c.Get("user")
	if !ok {
		c.String(http.StatusNotFound, "404 page not found")
		return
	}
	var user model.User
	if err := BindJSON(c, &user); err != nil {
		log.Errorf("failed to bind request: %v", err)
		c.String(http.StatusBadRequest, "bad request")
		return
	}
	// to do: check diff between currentUser and requested user
	if err := model.UpdateUser(&user); err != nil {
		log.Errorf("failed to update user: %v", err)
		c.String(http.StatusBadRequest, "bad request")
		return
	}
	c.JSON(http.StatusOK, user)
}
