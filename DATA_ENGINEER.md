# Data Engineer Challenge: "The Cross-Sectional Momentum Pipeline"

## 1. Summary & Objective

Build a scalable streaming pipeline and a real-time momentum detection engine that consumes trade data across multiple cryptocurrency pairs, computes technical indicators, and detects cross-sectional momentum opportunities.

**Core Requirements:**

* **Live Ingestion:** Subscribe to the `aggTrade` stream for **20+ crypto futures pairs** simultaneously. Do not use the `depth` stream.
* **Real-time Transformations:** Compute streaming RSI and MACD continuously for all pairs.
* **Momentum Detection:** Rank all symbols by relative strength to identify the strongest and weakest assets.
* **Portfolio Output:** Construct and output a market-neutral sample portfolio with dynamic weights based on momentum rankings.

---

## 2. Technical Stack

* **Streaming & Pipeline:** You are encouraged to use industry-standard event streaming and stream-processing tools (e.g., Apache Kafka, Apache Flink, Spark Streaming, Redis Streams, Faust, Bytewax) or build a custom concurrent event-driven architecture.
* **Language:** Language of your choice (e.g., Python, Scala, Java, Go, Rust), but the pipeline must demonstrate scalability.
* **Storage:** Sink the processed indicators and signals into a suitable database or temporal datastore.
* **Library Note:** Heavy technical analysis libraries (e.g., `TA-Lib`, `Pandas TA`) are **optional**. Implementing **incremental/recursive** versions of RSI and MACD demonstrates stronger signal-engineering depth and is preferred. If you use a library, document the trade-off in your `README.md`.

---

## 3. Data Source (Live Stream)

You will need to discover and interface with the [Binance WebSocket Streams](https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams). Please read the official documentation to obtain the correct stream URLs, channels, and data types for depth and aggregated trade events. Use the combined stream endpoint to subscribe across all 20+ tickers.

---

## 4. Pipeline Tasks & Logic

### Task A: Reliable Ingestion & Kafka Storage
Consume `aggTrade` events for 20+ symbols concurrently and publish to **Apache Kafka** (strict requirement).
*   **Topic:** `raw-trades`
*   Partition by symbol to ensure ordered processing.

### Task B: Real-Time Feature Engineering (Transformations)
Subscribe to `raw-trades` and compute technical indicators using a stream processing engine (e.g., Apache Flink, Spark Structured Streaming, Faust, Bytewax).

*   **1. Time Windowing:** Align streams into **15-second tumbling windows**. Use the `close` price $P_t$ for each window.
*   **2. Streaming RSI (14-period):** Calculate Wilders Smoothing RSI based on the windowed close price. Let $N=14$.
$$
Gain_t = \max(P_t - P_{t-1}, 0)
$$

$$
Loss_t = \max(P_{t-1} - P_t, 0)
$$

$$
AvgGain_t = \frac{AvgGain_{t-1} \times (N-1) + Gain_t}{N}
$$

$$
AvgLoss_t = \frac{AvgLoss_{t-1} \times (N-1) + Loss_t}{N}
$$

$$
RS_t = \frac{AvgGain_t}{AvgLoss_t} \quad \text{(Handle division by zero)}
$$

$$
RSI_t = 100 - \frac{100}{1 + RS_t}
$$
*   **3. Streaming MACD (12, 26, 9):** Use the standard recursive EMA formula:
$$
EMA_{t, N} = P_t \times \alpha + EMA_{t-1, N} \times (1 - \alpha) \quad \text{where } \alpha = \frac{2}{N+1}
$$

$$
MACD\_Line_t = EMA_{t, 12} - EMA_{t, 26}
$$

$$
Signal\_Line_t = EMA(MACD\_Line_t, 9)
$$

$$
MACD\_Histogram_t = MACD\_Line_t - Signal\_Line_t
$$

Publish these aggregated features back to Kafka:
*   **Topic:** `features-stream`

### Task C: Cross-Sectional Momentum & Portfolio Construction
Subscribe to the `features-stream` Kafka topic. Every **15 seconds**, process the latest features for all 20+ tickers across the market.

**Rules for Detection:**
1.  **Calculate Score:** For each asset, calculate a simple `Momentum Score`:
$$
Momentum\_Score = RSI_{14} + (\text{sign}(MACD\_Histogram) \times 10)
$$
2.  **Rank:** Rank all 20+ assets descending by their `Momentum Score`.
3.  **Select Longs:** The top 3 assets (highest scores > 50) enter the **Long** basket (+0.33 weight each).
4.  **Select Shorts:** The bottom 3 assets (lowest scores < 50) enter the **Short** basket (-0.33 weight each).
5.  **Output:** Construct a market-neutral portfolio, distributing weights evenly across the selections. Publish this signal back to Kafka:
    *   **Topic:** `portfolio-signals`

Your engine must output a **sample portfolio payload** representing the trade setup.

**Example Portfolio Output (from `portfolio-signals` topic):**
If `SOLUSDT`, `AVAXUSDT`, and `DOGEUSDT` are surging while `LTCUSDT`, `ADAUSDT`, and `BCHUSDT` are dumping:
```json
{
  "timestamp": 1774929201000,
  "strategy": "Cross_Sectional_Momentum",
  "portfolio_weights": {
    "SOLUSDT": 0.33,
    "AVAXUSDT": 0.33,
    "DOGEUSDT": 0.34,
    "LTCUSDT": -0.33,
    "ADAUSDT": -0.33,
    "BCHUSDT": -0.34
  },
  "metadata": {
    "ranking_metric": "RSI_Plus_MACD_Heuristic",
    "top_scores": {"SOLUSDT": 85.4, "AVAXUSDT": 82.1, "DOGEUSDT": 79.5},
    "bottom_scores": {"LTCUSDT": 22.1, "ADAUSDT": 25.4, "BCHUSDT": 27.8}
  }
}
```

### Task D: Real-Time Visualization Dashboard
Build a live dashboard that reflects the pipeline output and updates every 15 seconds.

**Required displays:**
* A ranked **leaderboard table** of all 20+ assets sorted by `Momentum Score` (descending), with their current RSI and MACD histogram values.
* The active **Long basket** (highlighted green) and **Short basket** (highlighted red) with their current weights.
* A time-series chart of `Momentum Score` for at least the top 3 and bottom 3 assets over the last 10 minutes.

**Acceptable implementations (pick one):**
* A **Streamlit** or **Dash** app consuming your storage layer directly.
* A minimal **Grafana** dashboard connected to your database/broker.
* A **Vite + React + TypeScript** page subscribing to a `/sse` or WebSocket endpoint served from your pipeline.

---

## 5. Deliverables & Submission

### AI Policy

The use of AI is **strongly encouraged**. You must include an `AI.md` file in the root directory documenting:

1. Which tools were used
2. Which parts of the code were generated vs. manually written
3. How to setup project with AI tools or agents
4. How you prompted the AI to handle complex logic (e.g., stream alignment, distributed state)

### Project Requirements

* **README.md:** Include a `README.md` at the root of your repository covering:
  * A brief summary of your solution and pipeline architecture (ingestion → Kafka → processing → storage → visualization).
  * How to run the project locally (setup and `docker-compose` instructions).
  * Your choice of stream processing engine and why.
  * Any third-party libraries used (e.g., for indicators) and their trade-offs vs. a hand-rolled implementation.
* **Infrastructure:** Provide a `docker-compose.yml` that provisions your entire data pipeline (ingestion, processing engine, storage/broker).
* **Evidence:** In an `/evidence` folder, include:
  * `logs.txt`: Showing successful ingestion of 20+ pairs and Kafka message flow.
  * `indicators.txt` or `indicators.json`: Sample output of the calculated RSI/MACD indicator streams.
  * `portfolio_sample.json`: Sample JSON outputs of the dynamically weighted portfolio from `portfolio-signals`.
  * Screenshots of your **Task D dashboard** showing the live momentum leaderboard, Long/Short baskets, and the time-series chart.
* **Submission:** Push your solution to a public GitHub repository.

---

## 6. Tips for Success

* **Time Synchronization:** Market data is asynchronous. Think carefully about how you align data streams for cross-symbol correlation logic (e.g., using tumbling windows, sliding windows, or resampling).
* **Fault Tolerance:** If your processing engine crashes, does it resume where it left off, or does it lose state? Consider how you manage the state of your moving averages and RSI across restarts.
* **Scalability:** Design the architecture so that adding 100 more tickers wouldn't require a complete rewrite.
