package db

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"trading-dashboard/internal/config"
	"trading-dashboard/internal/models"
)

type Connections struct {
	Postgres *gorm.DB
}

func InitPostgres(cfg config.Config) (*Connections, error) {
	conn := &Connections{}

	if cfg.DatabaseURL == "" {
		log.Printf("DATABASE_URL is empty, running in in-memory example mode")
		return conn, nil
	}

	db, err := gorm.Open(postgres.Open(cfg.DatabaseURL), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("connect postgres: %w", err)
	}

	if err := db.AutoMigrate(&models.Position{}); err != nil {
		return nil, fmt.Errorf("auto migrate models: %w", err)
	}

	conn.Postgres = db
	return conn, nil
}
