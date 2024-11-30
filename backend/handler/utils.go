package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/sp-yduck/makibi/backend/validation"
)

// bind and validate request body
func BindJSON(c *gin.Context, obj interface{}) error {
	if err := c.BindJSON(obj); err != nil { // nolint
		return err
	}
	if err := validation.ValidateStruct(obj); err != nil {
		return err
	}
	return nil
}
