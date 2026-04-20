import os
from dotenv import load_dotenv

load_dotenv()

# Database settings
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/trading_db')

# Redis settings
REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379')

# API settings
MARKET_DATA_API_KEY = os.getenv('MARKET_DATA_API_KEY', '')

# Job settings
JOB_INTERVAL_MINUTES = int(os.getenv('JOB_INTERVAL_MINUTES', '5'))
LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')

# Stock symbols to track
TRACKED_SYMBOLS = [
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA',
    'NVDA', 'META', 'JPM', 'V', 'WMT'
]

# Market indices
MARKET_INDICES = {
    '^GSPC': 'S&P 500',
    '^IXIC': 'NASDAQ',
    '^DJI': 'DOW',
    'GC=F': 'GOLD'
}
