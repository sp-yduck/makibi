package validation

// wraps the validator.Validate.Struct function
func ValidateStruct(obj interface{}) error {
	return validate.Struct(obj)
}
