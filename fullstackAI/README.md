# FullstackAI Senior

This repository is the template for the senior developer entrance test.

## Goal
Build an end-to-end market data system from data ingestion to user-facing app.

The test evaluates your engineering quality in:
- Data pipeline design and implementation (batch and/or stream)
- Backend API architecture in Golang + Fiber (must follow template style)
- AI post-processing on crawled/ingested data
- Frontend implementation for a small but usable product
- DevOps packaging with Dockerfile + docker-compose

## Difficulty Weight (Hard -> Easy)
1. Data Pipeline (Batch/Stream): 30%
2. Backend (Golang Fiber + template architecture): 25%
3. AI Post-Processing: 20%
4. DevOps (Dockerfile + docker-compose): 15%
5. Frontend (small app): 10%

## Scope and Requirements

### 1) Data Pipeline (30%)
- Ingest market/user-selected datasource data.
- Support either stream-first, batch-first, or hybrid architecture.
- Build reliable processing jobs for normalization and feature generation.
- Add idempotency/deduplication and failure-recovery strategy.

Allowed choices:
- You can freely choose pipeline framework (e.g. Kafka/Flink/Spark/Airflow/Beam/RabbitMQ).
- You can freely choose storage and database.

Mandatory explanation:
- Explain why your stack was chosen.
- Compare with at least 2 equivalent alternatives and discuss trade-offs.

### 2) Backend (25%)
- Must use Golang + Fiber.
- Must follow the architecture style from:
  `/home/kim/Downloads/xalpha-api-main/xalpha-api-main/`

Required backend organization (reorganized from current simple layout):
- `cmd/main.go` as service entrypoint
- `internal/config` for config bootstrap
- `internal/db` for DB/Redis initialization
- `internal/middlewares` for auth/logging/rate-limit/cross-cutting concerns
- Versioned API modules:
  - `internal/v1/{routes,handlers,repos}`
  - `internal/v2/{routes,handlers,repos}`
- Shared HTTP response/context helpers in `internal/api` (or equivalent)

Backend expectations:
- Clear boundaries: route -> handler -> repository/service
- Structured error handling and request validation
- Health endpoint and production-ready startup flow

### 3) AI Post-Processing (20%)
- Apply AI or quantitative post-processing after crawl/ingestion.
- Examples: anomaly detection, regime classification, signal scoring, summarization, enrichment.
- Explain model/algorithm choice, features, and limitations.
- Show how AI output is consumed by backend/frontend.

### 4) DevOps (15%)
- Provide Dockerfile for relevant services.
- Provide `docker-compose.yml` to run the full system locally.
- Include one-command startup instructions.
- Include environment variable documentation.

### 5) Frontend (10%)
- Build a small app to visualize core outputs.
- Minimum: data list/table, key metric cards, and one detail view/chart.
- Keep UX simple but clear for product/demo usage.

## Submission Deliverables
- Source code with clear project structure
- `README.md` with setup/run/test instructions
- Architecture decision notes and trade-off comparison
- API documentation (short but usable)
- Sample data flow walkthrough (input -> processing -> output)

## Senior-Level Evaluation Criteria
- Architecture quality and reasoning
- Reliability and failure handling
- Code organization and maintainability
- Ability to justify technology decisions with alternatives
- Production-mindedness (observability, reproducibility, deployment clarity)

## Time Guidance
Suggested duration: 1.5 to 3 days (senior scope).

## Role-Specific Challenge Docs
Detailed role challenge descriptions are in:
- [`intern/AI.md`](./intern/AI.md)
- [`intern/BACKEND.md`](./intern/BACKEND.md)
- [`intern/DATA_ENGINEER.md`](./intern/DATA_ENGINEER.md)
