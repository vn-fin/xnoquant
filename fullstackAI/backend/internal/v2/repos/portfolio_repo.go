package repos

import (
	"trading-dashboard/internal/models"

	"gorm.io/gorm"
)

type PortfolioRepository struct {
	db *gorm.DB
}

func NewPortfolioRepository(db *gorm.DB) *PortfolioRepository {
	return &PortfolioRepository{db: db}
}

func (r *PortfolioRepository) GetPortfolioSummary() models.PortfolioSummary {
	return models.PortfolioSummary{
		TotalValue:      124567.89,
		TodayGain:       1234.56,
		TodayGainPct:    0.99,
		TotalReturn:     24567.89,
		TotalReturnPct:  24.56,
		ActivePositions: 3,
		TotalInvested:   100000,
	}
}

func (r *PortfolioRepository) ListPositions() ([]models.Position, error) {
	if r.db == nil {
		return []models.Position{
			{ID: 1, Symbol: "AAPL", Quantity: 50, EntryPrice: 140, CurrentPrice: 182.45, ProfitLoss: 2122.5, ProfitLossPct: 30.35},
			{ID: 2, Symbol: "TSLA", Quantity: 20, EntryPrice: 220, CurrentPrice: 248.32, ProfitLoss: 566.4, ProfitLossPct: 12.87},
		}, nil
	}

	var positions []models.Position
	if err := r.db.Order("updated_at desc").Find(&positions).Error; err != nil {
		return nil, err
	}
	return positions, nil
}
