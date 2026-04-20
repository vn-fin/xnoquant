package routes

import (
	"github.com/gofiber/fiber/v3"
	"trading-dashboard/internal/v1/handlers"
	"trading-dashboard/internal/v1/repos"
)

func SetupRoutes(app *fiber.App) {
	repo := repos.NewMarketRepository()
	h := handlers.NewMarketHandler(repo)

	v1 := app.Group("/api/v1")
	v1.Get("/ping", h.Ping)
	v1.Get("/market/overview", h.Overview)
}
