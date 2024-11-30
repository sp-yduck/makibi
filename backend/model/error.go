package model

import (
	"errors"

	"gorm.io/gorm"
)

var ErrRecordNotFound = gorm.ErrRecordNotFound

func IsRecordNotFound(err error) bool {
	return errors.Is(err, ErrRecordNotFound)
}
