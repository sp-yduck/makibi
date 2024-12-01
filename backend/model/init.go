package model

import (
	"fmt"

	"github.com/sp-yduck/makibi/backend/log"
	"go.uber.org/zap"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"moul.io/zapgorm2"
)

var (
	db *gorm.DB
)

type DBConfig struct {
	Host     string `yaml:"host" validate:"required"`
	Port     int    `yaml:"port" validate:"required"`
	User     string `yaml:"user" validate:"required"`
	Password string `yaml:"password" validate:"required"`
	DBName   string `yaml:"dbName" validate:"required"`
}

// initiate the connection with PostgreSQL DB and do auto-migrate
func InitDB(dbcfg DBConfig) error {
	log.S().Info("Initializing db")

	log.S().Info("Opening db connection")
	var err error
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%d sslmode=disable TimeZone=Asia/Tokyo",
		dbcfg.Host, dbcfg.User, dbcfg.Password, dbcfg.DBName, dbcfg.Port,
	)
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger:                                   zapgorm2.New(zap.L()),
		DisableForeignKeyConstraintWhenMigrating: false,
	})
	if err != nil {
		return err
	}

	log.S().Info("Migrating db")
	return db.Debug().AutoMigrate(
		&User{},
	)
}
