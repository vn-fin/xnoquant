# XnoQuant Engineering Challenges

Welcome to the XnoQuant technical assessment! We've designed these challenges to evaluate your ability to solve real-world problems in high-frequency trading and market data ingestion. 

Please select the challenge corresponding to the role you are applying for and follow the instructions provided in its document:

## [AI Engineer Challenge: "The Intelligent Order Flow"](./AI.md)
**Focus:** Stateful computation, complex streaming mathematical transformations ($O(1)$ calculation of VWAP, RSI, MACD), and real-time statistical anomaly detection.

In this challenge, you will build an intelligence engine that processes live Binance Futures event streams to provide real-time quant signals.

## [Backend Engineer Challenge: "The Order Flow Firehose"](./BACKEND.md)
**Focus:** High-throughput WebSocket streaming, system architecture, data normalization, database storage, and full-stack API/UI experience.

In this challenge, you will build a robust ingestion engine that consumes multiple Binance pairs with zero data loss, builds an L2 orderbook, and exposes the normalized data through a real-time web dashboard and a native Python SDK.

## [Data Engineer Challenge: "The Cross-Sectional Momentum Pipeline"](./DATA_ENGINEER.md)
**Focus:** Real-time stream processing, time-series alignment, scalable data pipelines, and quantitative feature engineering.

In this challenge, you will build a distributed streaming pipeline that ingests trade executions for 20+ pairs, calculates technical indicators (RSI, MACD) on the fly, and detects cross-sectional momentum to construct a dynamic, market-neutral, weighted portfolio.
