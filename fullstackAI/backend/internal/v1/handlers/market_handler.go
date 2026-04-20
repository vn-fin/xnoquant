package handlers

import (
	"github.com/gofiber/fiber/v3"
	"trading-dashboard/internal/api"
	"trading-dashboard/internal/v1/repos"
)

type MarketHandler struct {
	repo *repos.MarketRepository
}

func NewMarketHandler(repo *repos.MarketRepository) *MarketHandler {
	return &MarketHandler{repo: repo}
}

func (h *MarketHandler) Ping(c fiber.Ctx) error {
	return api.Success(c, fiber.StatusOK, fiber.Map{"version": "v1", "status": "ok"})
}

func (h *MarketHandler) Overview(c fiber.Ctx) error {
	return api.Success(c, fiber.StatusOK, h.repo.GetMarketOverview())
}
