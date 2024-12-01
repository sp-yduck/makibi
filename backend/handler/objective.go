package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sp-yduck/makibi/backend/log"
	"github.com/sp-yduck/makibi/backend/model"
)

// @Summary		get all objectives of a user
// @Description	get all objectives of a user
// @Tags			objectives
// @Accept			json
// @Produce		json
// @Param			user_id	path		string	true	"User ID"
// @Success		200		{object}	[]model.Objective
// @Failure		401		{string}	string	"Unauthorized"
// @Failure		500		{string}	string	"internal server error"
// @Router			/users/{user_id}/objectives [get]
func ListObjectives(c *gin.Context) {
	userID, ok := c.Get("userid")
	if !ok {
		c.String(http.StatusUnauthorized, "Unauthorized")
		return
	}

	objectives, err := model.ListObjectives(userID.(string))
	if err != nil {
		log.S().Errorf("internal server error: %v", err)
		c.String(http.StatusInternalServerError, "internal server error")
		return
	}
	c.JSON(http.StatusOK, objectives)
}

// @Summary		get a objectives of a user
// @Description	get a objectives of a user
// @Tags			objectives
// @Accept			json
// @Produce		json
// @Param			user_id			path		string	true	"User ID"
// @Param			objective_id	path		string	true	"Objective ID"
// @Success		200				{object}	model.Objective
// @Failure		401				{string}	string	"Unauthorized"
// @Failure		500				{string}	string	"internal server error"
// @Router			/users/{user_id}/objectives/{objective_id} [get]
func GetObjective(c *gin.Context) {
	userID, ok := c.Get("userid")
	if !ok {
		c.String(http.StatusUnauthorized, "Unauthorized")
		return
	}

	objectiveID, err := strconv.ParseUint(c.Param("objective_id"), 10, 64)
	if err != nil {
		c.String(http.StatusBadRequest, "invalid objective id")
		return
	}

	objective, err := model.GetObjective(userID.(string), uint(objectiveID))
	if err != nil {
		if err == model.ErrRecordNotFound {
			c.String(http.StatusNotFound, "404 not found")
			return
		}
		log.S().Errorf("internal server error: %v", err)
		c.String(http.StatusInternalServerError, "internal server error")
		return
	}
	c.JSON(http.StatusOK, objective)
}

// @Summary		create new objective
// @Description	create new objective
// @Tags			objectives
// @Accept			json
// @Produce		json
// @Param			user_id		path		string			true	"User ID"
// @Param			objective	body		model.Objective	true	"Objective"
// @Success		200			{object}	model.Objective
// @Failure		401			{string}	string	"Unauthorized"
// @Failure		500			{string}	string	"internal server error"
// @Router			/users/{user_id}/objectives [post]
func CreateObjective(c *gin.Context) {
	userID, ok := c.Get("userid")
	if !ok {
		c.String(http.StatusUnauthorized, "Unauthorized")
		return
	}

	var objective model.Objective
	if err := BindJSON(c, &objective); err != nil {
		log.S().Infof("invalid request: %v", err)
		c.String(http.StatusBadRequest, "invalid request")
		return
	}
	objective.UserID = userID.(string)

	if err := model.CreateObjective(&objective); err != nil {
		log.S().Errorf("internal server error: %v", err)
		c.String(http.StatusInternalServerError, "internal server error")
		return
	}
	c.JSON(http.StatusCreated, objective)
}

// @Summary		delete a objective of a user
// @Description	delete a objective of a user
// @Tags			objectives
// @Accept			json
// @Produce		json
// @Param			user_id			path		string	true	"User ID"
// @Param			objective_id	path		string	true	"Objective ID"
// @Success		200				{object}	model.Objective
// @Failure		401				{string}	string	"Unauthorized"
// @Failure		500				{string}	string	"internal server error"
// @Router			/users/{user_id}/objectives/{objective_id} [delete]
func DeleteObjective(c *gin.Context) {
	userID, ok := c.Get("userid")
	if !ok {
		c.String(http.StatusUnauthorized, "Unauthorized")
		return
	}

	objectiveID, err := strconv.ParseUint(c.Param("objective_id"), 10, 64)
	if err != nil {
		c.String(http.StatusBadRequest, "invalid objective id")
		return
	}

	objective, err := model.DeleteObjective(userID.(string), uint(objectiveID))
	if err != nil {
		if err == model.ErrRecordNotFound {
			c.String(http.StatusNotFound, "404 not found")
			return
		}
		log.S().Errorf("internal server error: %v", err)
		c.String(http.StatusInternalServerError, "internal server error")
		return
	}
	c.JSON(http.StatusOK, objective)
}
