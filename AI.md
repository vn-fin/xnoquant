
# AI Engineer Challenge: "The Intelligent Order Flow"

## 1. Summary & Objective
High-frequency market data is inherently noisy. Your goal is to build an intelligence engine that consumes live market data, maintains an internal state, and applies real-time transformations to identify structural anomalies and momentum shifts.

### The Mission
Build a real-time intelligence engine and a FastAPI service (`quants`) that processes the **BTCUSDT** live stream from Binance Futures to provide multi-window signals for researchers.

**Core Requirements:**
* **Live Ingestion:** Connect to Binance Futures WebSocket (`aggTrade` and `depth`).
* **Stateful Compute:** Maintain an in-memory L2 order book and rolling windows for indicators.
* **Transformations:** Implement streaming versions of VWAP, RSI, and MACD.
* **Anomaly Detection:** Identify price/volume spikes using statistical rolling methods.
* **API:** A FastAPI service broadcasting signals via **Server-Sent Events (SSE)**.

---

## 2. Technical Stack
* **Language:** Python 3.11+ (Strictly Python-focused).
* **Library Prefs:** `Pandas`, `Polars`, `NumPy`, `Arrow`, `FastAPI`, `websockets`.
* **Library Note:** Heavy technical analysis libraries (e.g., `TA-Lib`, `Pandas TA`) are **optional**. Candidates who implement **incremental/recursive** formulas from scratch demonstrate stronger math proficiency and are preferred. If you use a library for any indicator, document the trade-off in your `README.md`.

---

## 3. Input Data & Connectivity

Interface with the [Binance WebSocket Streams](https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams) for USD-margined futures. Use the `aggTrade` and `depth` channels.

---

## 4. Intelligence Tasks & Formulas

### Task A: Order Book Imbalance (OBI)
Calculate buy/sell pressure at the top of the book ($Level_1$).

**Variables:**
*   $BQ_1$: Total Bid Quantity at the best bid price level.
*   $AQ_1$: Total Ask Quantity at the best ask price level.

$$OBI = \frac{BQ_1 - AQ_1}{BQ_1 + AQ_1}$$

*   **Output Range:** $[-1, 1]$. An $OBI$ approaching $1$ indicates strong buying pressure, while $-1$ indicates strong selling pressure.

### Task B: VWAP Windows (Session vs. Rolling)
The engine must track two versions of Volume Weighted Average Price without recalculating from scratch on every tick.

**Variables:**
*   $t$: The current event tick.
*   $P_t$: The executed price of the trade at tick $t$.
*   $Q_t$: The executed quantity of the trade at tick $t$.
*   $N$: The rolling window size (for rolling VWAP, $N=200$).

1.  **Session VWAP:** Cumulative since the service started.
    $$CumulativePV_t = CumulativePV_{t-1} + (P_t \times Q_t)$$
    $$CumulativeV_t = CumulativeV_{t-1} + Q_t$$
    $$SessionVWAP_t = \frac{CumulativePV_t}{CumulativeV_t}$$

2.  **Rolling VWAP ($N=200$):** Weighted average of the last $N$ trade events.
    $$RollingPV_t = RollingPV_{t-1} + (P_t \times Q_t) - (P_{t-N} \times Q_{t-N})$$
    $$RollingV_t = RollingV_{t-1} + Q_t - Q_{t-N}$$
    $$RollingVWAP_t = \frac{RollingPV_t}{RollingV_t}$$

### Task C: Momentum Oscillators (RSI & MACD)
Implement these as **incremental** updates (updating with every new trade event) without retaining full history.

**Variables:**
*   $P_t$: The latest executed trade price at tick $t$.
*   $N$: The lookback period for the indicator or moving average calculation.
*   $\alpha$: The smoothing factor for Exponential Moving Averages (EMA), derived as $\alpha = \frac{2}{N+1}$.

* **Streaming RSI (14-period):** Use Wilder’s Smoothing (SMMA). Let $N=14$.
    $$Gain_t = \max(P_t - P_{t-1}, 0)$$
    $$Loss_t = \max(P_{t-1} - P_t, 0)$$
    $$AvgGain_t = \frac{AvgGain_{t-1} \times (N-1) + Gain_t}{N}$$
    $$AvgLoss_t = \frac{AvgLoss_{t-1} \times (N-1) + Loss_t}{N}$$
    $$RS_t = \frac{AvgGain_t}{AvgLoss_t} \quad \text{(Handle division by zero)}$$
    $$RSI_t = 100 - \frac{100}{1 + RS_t}$$

* **Streaming MACD (12, 26, 9):**
    First, the standard generalized recursive EMA formula:
    $$EMA_{t, N} = P_t \times \alpha + EMA_{t-1, N} \times (1 - \alpha)$$
    Then, calculate the final components:
    $$MACD\_Line_t = EMA_{t, 12} - EMA_{t, 26}$$
    $$Signal\_Line_t = MACD\_Line_t \times \alpha_{signal} + Signal\_Line_{t-1} \times (1 - \alpha_{signal}) \quad \text{where } N=9$$
    $$MACD\_Histogram_t = MACD\_Line_t - Signal\_Line_t$$

### Task D: Anomaly Detection (Volatility Spikes)
Flag an anomaly if the current log return deviates by more than $z$ standard deviations from the rolling mean of the last $N$ returns.

**Variables:**
*   $P_t$: The latest executed trade price at tick $t$.
*   $r_t$: The log return at tick $t$.
*   $\mu_t$: The rolling mean of the last $N$ returns.
*   $\sigma_t$: The rolling standard deviation of the last $N$ returns.
*   $N$: The window size for returns (e.g., $N=100$).
*   $z$: The standard deviation threshold (e.g., $z=3.5$).

$$r_t = \ln\left(\frac{P_t}{P_{t-1}}\right)$$

**Anomaly Condition:**
$$|r_t - \mu_t| > z \times \sigma_t$$

---

## 5. API Specification

**Endpoint:** `GET /quants/v1/tickers/btcusdt/signals` (SSE Stream)

**Response Shape:**
```json
{
  "ticker": "BTCUSDT",
  "timestamp": 1774929195004,
  "metrics": {
    "price": 67696.80,
    "obi": 0.45,
    "vwap_session": 67690.20,
    "vwap_rolling_200": 67694.15
  },
  "signals": {
    "rsi": 62.4,
    "macd": {"line": 1.2, "signal": 0.8, "hist": 0.4},
    "is_anomaly": false,
    "trend": "Bullish"
  }
}
```

---

## 6. Deliverables & Submission

### AI Policy

The use of AI is **strongly encouraged**. You must include an `AI.md` file in the root directory documenting:

1. Which tools were used
2. Which parts of the code were generated vs. manually written
3. How to setup project with AI tools or agents
4. How you prompted the AI to handle complex logic

### Project Requirements

* **README.md:** Include a `README.md` at the root of your repository covering:
  * A brief summary of your solution and architecture.
  * How to run the project locally (setup and `docker-compose` instructions).
  * Any third-party libraries used and their trade-offs vs. a hand-rolled implementation.
* **Infrastructure:** Provide a `docker-compose.yml` that spins up the backend API, and the database.
* **Submission:** Push your solution to a public GitHub repository.

---

## 7. Tips for Success

* **Recursive Math:** For $EMA$ and $RSI$, don't re-calculate the whole list every tick. Store the previous $Average$ and use the recursive formula.
* **Circular Buffers:** Use `collections.deque` or a fixed-size `NumPy` array for your rolling 200-event VWAP.
* **Efficient Variance:** For anomaly detection, avoid recalculating `np.std()` on a 100-element array every tick. Think about how to compute variance and standard deviation efficiently using rolling sums.
* **Concurrency:** Use a background task to consume the WebSocket so the FastAPI event loop stays responsive.
* **Edge Cases:** Handle the "Cold Start" problem (what happens to RSI/MACD before you have enough data points?).

