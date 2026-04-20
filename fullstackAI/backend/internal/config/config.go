package config

import (
	"fmt"
	"os"
	"strconv"
)

type Config struct {
	ServiceName string
	Port        int
	DatabaseURL string
}

func InitConfig() (Config, error) {
	cfg := Config{
		ServiceName: getEnv("SERVICE_NAME", "trading-dashboard"),
		DatabaseURL: os.Getenv("DATABASE_URL"),
	}

	portRaw := getEnv("PORT", "8080")
	port, err := strconv.Atoi(portRaw)
	if err != nil {
		return Config{}, fmt.Errorf("invalid PORT %q: %w", portRaw, err)
	}
	cfg.Port = port

	return cfg, nil
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
