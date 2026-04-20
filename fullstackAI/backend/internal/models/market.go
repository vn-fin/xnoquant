package models

type MarketOverview struct {
	Label         string  `json:"label"`
	Value         string  `json:"value"`
	Change        float64 `json:"change"`
	ChangePercent float64 `json:"changePercent"`
}
