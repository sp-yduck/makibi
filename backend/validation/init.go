package validation

import (
	"github.com/go-playground/validator/v10"
	"github.com/sp-yduck/makibi/backend/log"
)

var (
	// use a single instance of Validate, it caches struct info
	validate *validator.Validate
)

// initialize validator
func InitValidator() error {
	log.S().Info("initializing validator")

	// initialize
	validate = validator.New()

	// register custom validations
	if err := validate.RegisterValidation("resourceID", validateResourceID); err != nil {
		return err
	}

	return nil
}
