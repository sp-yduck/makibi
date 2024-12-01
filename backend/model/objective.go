package model

import (
	"time"

	"gorm.io/gorm"
)

type Objective struct {
	ID          uint         `json:"id" gorm:"primaryKey,unique"`
	CreatedAt   time.Time    `json:"created_at"`
	UpdatedAt   time.Time    `json:"updated_at"`
	Title       string       `json:"title" gorm:""`
	Description string       `json:"description" gorm:""`
	StartDate   time.Time    `json:"start_date" gorm:""`
	DueDate     time.Time    `json:"due_date" gorm:""`
	UserID      string       `json:"user_id" gorm:"references:UserID"`
	KeyResults  []*KeyResult `json:"key_results" gorm:"foreignKey:ObjectiveID"`
}

type KeyResult struct {
	ID          uint      `json:"id" gorm:"primaryKey,unique"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	Title       string    `json:"title" gorm:""`
	Description string    `json:"description" gorm:""`
	StartDate   time.Time `json:"start_date" gorm:""`
	DueDate     time.Time `json:"due_date" gorm:""`
	ObjectiveID uint      `json:"objective_id" gorm:"references:ID"`
}

func CreateObjective(objective *Objective) error {
	return db.Create(objective).Error
}

func UpdateObjective(objective *Objective) error {
	return db.Session(&gorm.Session{FullSaveAssociations: true}).Updates(objective).Error
}

func DeleteObjective(userID string, objectiveID uint) (*Objective, error) {
	o, err := GetObjective(userID, objectiveID)
	if err != nil {
		return nil, err
	}
	// delete all the associated key results
	if err := db.Unscoped().Model(&o).Association("KeyResults").Unscoped().Clear(); err != nil {
		return nil, err
	}
	return o, db.Delete(o).Error
}

func ListObjectives(userID string) ([]Objective, error) {
	var objectives []Objective
	if err := db.Preload("KeyResults").Where("user_id = ?", userID).Find(&objectives).Error; err != nil {
		return nil, err
	}
	return objectives, nil
}

func GetObjective(userID string, objectiveID uint) (*Objective, error) {
	var objective Objective
	if err := db.Preload("KeyResults").Where("user_id = ? AND id = ?", userID, objectiveID).First(&objective).Error; err != nil {
		return nil, err
	}
	return &objective, nil
}

func GetKeyResult(userID string, objectiveID, keyResultID uint) (*KeyResult, error) {
	var keyResult KeyResult
	if err := db.Where("user_id = ? AND objective_id = ? AND id = ?", userID, objectiveID, keyResultID).First(&keyResult).Error; err != nil {
		return nil, err
	}
	return &keyResult, nil
}
