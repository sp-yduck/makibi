package validation

import (
	"regexp"

	"github.com/go-playground/validator/v10"
)

const (
	resourceIDRegexString = `^[a-zA-Z0-9]([a-zA-Z0-9]?|[\-]?([a-zA-Z0-9])){0,38}$`
)

var (
	resourceIDRegex = regexp.MustCompile(resourceIDRegexString)
)

func validateResourceID(fl validator.FieldLevel) bool {
	return resourceIDRegex.MatchString(fl.Field().String())
}
