package model

import (
	"errors"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserID       string `json:"user_id" gorm:"primaryKey;unique"`
	EmailAddress string `json:"email" gorm:"unique"`
}

func CreateUser(user *User) error {
	return db.Create(user).Error
}

func UpdateUser(user *User) error {
	return db.Model(user).Where("user_id = ?", user.UserID).Updates(user).Error
}

func CreateOrUpdateUser(user *User) error {
	if _, err := GetUser(user.UserID); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return CreateUser(user)
		}
	}
	return UpdateUser(user)
}

// physically delete the user
func DeleteUser(userID string) error {
	log.Debugf("DeleteUser: %s", userID)
	return db.Unscoped().Where("user_id = ?", userID).Delete(&User{}).Error
}

func ListUsers() ([]User, error) {
	log.Debugf("GetUsers")
	var users []User
	if err := db.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

func GetUser(userID string) (*User, error) {
	log.Debugf("GetUser: %s", userID)
	var user User
	if err := db.Where("user_id = ?", userID).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func GetOrCreateUser(user User) (*User, error) {
	log.Debugf("GetOrCreateUser: %v", user)
	var u User
	if err := db.Where("user_id = ?", user.UserID).FirstOrCreate(&u, user).Error; err != nil {
		return nil, err
	}
	return &u, nil
}
