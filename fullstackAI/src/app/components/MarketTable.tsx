import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
}

export function MarketTable() {
  const stocks: Stock[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 182.45, change: 2.34, changePercent: 1.3, volume: '52.4M', marketCap: '2.89T' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91, change: -1.23, changePercent: -0.32, volume: '23.1M', marketCap: '2.81T' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 140.23, change: 3.45, changePercent: 2.52, volume: '28.7M', marketCap: '1.75T' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 152.67, change: 1.89, changePercent: 1.25, volume: '45.2M', marketCap: '1.58T' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.32, change: -5.67, changePercent: -2.23, volume: '98.3M', marketCap: '788B' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 495.22, change: 12.45, changePercent: 2.58, volume: '41.6M', marketCap: '1.22T' },
    { symbol: 'META', name: 'Meta Platforms', price: 393.45, change: -2.34, changePercent: -0.59, volume: '15.8M', marketCap: '998B' },
    { symbol: 'JPM', name: 'JPMorgan Chase', price: 167.89, change: 0.45, changePercent: 0.27, volume: '9.4M', marketCap: '485B' },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700/50 shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700/50">
        <h2 className="text-xl font-bold text-white">Top Movers</h2>
        <p className="text-slate-400 text-sm mt-1">Real-time market data</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Change</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Change %</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Volume</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Market Cap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {stocks.map((stock) => (
              <tr key={stock.symbol} className="hover:bg-slate-800/50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-white font-bold">{stock.symbol}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-slate-300 text-sm">{stock.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-white font-semibold">
                  ${stock.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1">
                    {stock.change >= 0 ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-rose-400" />
                    )}
                    <span className={stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    stock.changePercent >= 0
                      ? 'bg-emerald-400/10 text-emerald-400'
                      : 'bg-rose-400/10 text-rose-400'
                  }`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-slate-300 text-sm">
                  {stock.volume}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-slate-300 text-sm">
                  ${stock.marketCap}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
