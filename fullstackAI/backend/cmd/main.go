package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"trading-dashboard/internal/api"
	"trading-dashboard/internal/config"
	"trading-dashboard/internal/db"
	"trading-dashboard/internal/middlewares"
	v1Routes "trading-dashboard/internal/v1/routes"
	v2Routes "trading-dashboard/internal/v2/routes"
)

func main() {
	cfg, err := config.InitConfig()
	if err != nil {
		log.Fatalf("config init failed: %v", err)
	}

	connections, err := db.InitPostgres(cfg)
	if err != nil {
		log.Fatalf("db init failed: %v", err)
	}

	app := fiber.New(fiber.Config{
		ProxyHeader:        fiber.HeaderXForwardedFor,
		EnableIPValidation: true,
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Accept", "Authorization", "X-Request-ID"},
	}))

	app.Use(middlewares.RequestID())
	app.Use(middlewares.RequestLogging())

	app.Get("/health", func(c fiber.Ctx) error {
		return api.Success(c, fiber.StatusOK, fiber.Map{"status": "ok", "service": cfg.ServiceName})
	})

	v1Routes.SetupRoutes(app)
	v2Routes.SetupRoutes(app, connections)

	listenAddr := fmt.Sprintf("0.0.0.0:%d", cfg.Port)
	log.Printf("server running on http://%s", listenAddr)
	if err := app.Listen(listenAddr); err != nil {
		log.Fatalf("server start failed: %v", err)
	}
}
