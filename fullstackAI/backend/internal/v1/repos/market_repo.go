package repos

import "trading-dashboard/internal/models"

type MarketRepository struct{}

func NewMarketRepository() *MarketRepository {
	return &MarketRepository{}
}

func (r *MarketRepository) GetMarketOverview() []models.MarketOverview {
	return []models.MarketOverview{
		{Label: "S&P 500", Value: "4,783.45", Change: 23.45, ChangePercent: 0.49},
		{Label: "NASDAQ", Value: "15,095.14", Change: -12.34, ChangePercent: -0.08},
		{Label: "DOW", Value: "37,545.33", Change: 156.78, ChangePercent: 0.42},
	}
}
