import { ArrowDownRight, ArrowUpRight, Filter, Download } from 'lucide-react';

export function Screener() {
  const data = [
    { sym: 'FPT', name: 'Tập đoàn FPT', sector: 'Công nghệ', pe: 18.5, roe: '28.4%', rsi: 65.2, signal: 'STRONG BUY', price: '76.00', change: '+2.56%' },
    { sym: 'MBB', name: 'Ngân hàng MB', sector: 'Ngân hàng', pe: 5.2,  roe: '23.1%', rsi: 54.1, signal: 'BUY', price: '26.45', change: '+0.57%' },
    { sym: 'VPB', name: 'Ngân hàng VPBank', sector: 'Ngân hàng', pe: 8.4,  roe: '16.5%', rsi: 58.9, signal: 'BUY', price: '28.25', change: '+2.36%' },
    { sym: 'HPG', name: 'Tập đoàn Hòa Phát', sector: 'Thép', pe: 14.1, roe: '12.0%', rsi: 48.5, signal: 'NEUTRAL', price: '28.00', change: '+0.18%' },
    { sym: 'VNM', name: 'Vinamilk', sector: 'Tiêu dùng', pe: 16.8, roe: '25.6%', rsi: 35.2, signal: 'SELL', price: '68.50', change: '-1.25%' },
    { sym: 'MWG', name: 'Thế Giới Di Động', sector: 'Bán lẻ', pe: 45.2, roe: '3.5%',  rsi: 72.4, signal: 'OVERBOUGHT', price: '56.90', change: '+6.89%' },
    { sym: 'DIG', name: 'DIC Corp', sector: 'Bất động sản', pe: 120.5, roe: '1.2%',  rsi: 28.5, signal: 'OVERSOLD / BUY', price: '3.51', change: '-0.85%' },
    { sym: 'SSI', name: 'Chứng khoán SSI', sector: 'Tài chính', pe: 12.5, roe: '18.4%', rsi: 61.0, signal: 'BUY', price: '36.65', change: '+0.41%' },
    { sym: 'VHM', name: 'Vinhomes', sector: 'Bất động sản', pe: 4.5,  roe: '32.1%', rsi: 41.2, signal: 'NEUTRAL', price: '135.70', change: '-5.17%' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0b0e17] rounded-lg border border-white/5 overflow-hidden shadow-xl">
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#080b13]">
         <div>
             <h2 className="text-xl font-bold text-white tracking-widest uppercase">Hybrid Platform Screener</h2>
             <p className="text-slate-500 text-xs mt-1">Cross-analyzing Yahoo Finance Fundamentals with TradingView Technicals in real-time.</p>
         </div>
         <div className="flex gap-3">
             <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded hover:bg-indigo-500/20 transition-colors text-sm font-bold">
                 <Filter size={16} /> Filters
             </button>
             <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 text-white border border-white/10 rounded hover:bg-white/10 transition-colors text-sm font-bold">
                 <Download size={16} /> Export
             </button>
         </div>
      </div>

      <div className="p-4 grid grid-cols-4 gap-4 bg-[#05070a] border-b border-white/5">
          <div className="flex flex-col p-3 border border-white/5 rounded bg-white/[0.02]">
              <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">Active Presets</span>
              <span className="text-cyan-400 font-bold text-sm">Undervalued & Breakout</span>
          </div>
          <div className="flex flex-col p-3 border border-white/5 rounded bg-white/[0.02]">
              <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">Fundamental Filter</span>
              <span className="text-emerald-400 font-bold text-sm">P/E &lt; 15, ROE &gt; 15%</span>
          </div>
          <div className="flex flex-col p-3 border border-white/5 rounded bg-white/[0.02]">
              <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">Technical Filter</span>
              <span className="text-indigo-400 font-bold text-sm">RSI &gt; 50, MACD Bull Cross</span>
          </div>
          <div className="flex flex-col p-3 border border-white/5 rounded bg-white/[0.02]">
              <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">Matches</span>
              <span className="text-white font-bold text-sm">9 Results Found</span>
          </div>
      </div>

      <div className="flex-1 overflow-auto hide-scrollbar">
          <table className="w-full text-left border-collapse">
              <thead>
                  <tr className="bg-[#080b13] text-[10px] uppercase tracking-wider text-slate-500 border-b border-white/5 sticky top-0 z-10 box-border">
                      <th className="p-4 font-semibold">Asset (Sym)</th>
                      <th className="p-4 font-semibold">Sector</th>
                      <th className="p-4 font-semibold">Price</th>
                      <th className="p-4 font-semibold">24h Change</th>
                      <th className="p-4 font-semibold border-l border-white/5">P/E Ratio <span className="text-[9px] lowercase text-slate-600 block">(Fundamental)</span></th>
                      <th className="p-4 font-semibold">ROE <span className="text-[9px] lowercase text-slate-600 block">(Fundamental)</span></th>
                      <th className="p-4 font-semibold border-l border-white/5">RSI 14D <span className="text-[9px] lowercase text-slate-600 block">(Technical)</span></th>
                      <th className="p-4 font-semibold">Tech Signal <span className="text-[9px] lowercase text-slate-600 block">(Technical)</span></th>
                  </tr>
              </thead>
              <tbody className="text-sm">
                  {data.map((row, idx) => {
                      const isUp = row.change.startsWith('+');
                      return (
                      <tr key={idx} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group cursor-pointer">
                          <td className="p-4">
                              <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-white shadow-inner">{row.sym.charAt(0)}</div>
                                  <div className="flex flex-col">
                                      <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">{row.sym}</span>
                                      <span className="text-xs text-slate-500">{row.name}</span>
                                  </div>
                              </div>
                          </td>
                          <td className="p-4 text-slate-400">{row.sector}</td>
                          <td className="p-4 font-mono font-bold text-white">{row.price}</td>
                          <td className="p-4">
                              <span className={`flex items-center gap-1 font-mono font-bold text-xs px-2 py-1 rounded inline-flex ${isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                  {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {row.change}
                              </span>
                          </td>
                          
                          {/* Fundamentals */}
                          <td className="p-4 font-mono text-slate-300 border-l border-white/5">{row.pe}</td>
                          <td className="p-4 font-mono text-slate-300">{row.roe}</td>

                          {/* Technicals */}
                          <td className={`p-4 font-mono font-bold border-l border-white/5 ${row.rsi > 70 ? 'text-rose-400' : row.rsi < 30 ? 'text-emerald-400' : 'text-slate-300'}`}>{row.rsi}</td>
                          <td className="p-4">
                              <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded border
                                 ${row.signal.includes('BUY') ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : 
                                   row.signal.includes('SELL') || row.signal.includes('OVERBOUGHT') ? 'border-rose-500/30 text-rose-400 bg-rose-500/10' : 
                                   'border-slate-600 text-slate-400 bg-slate-800/50'}
                              `}>{row.signal}</span>
                          </td>
                      </tr>
                  )})}
              </tbody>
          </table>
      </div>
    </div>
  );
}
