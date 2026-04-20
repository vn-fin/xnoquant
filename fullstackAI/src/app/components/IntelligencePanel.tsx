import { Calendar, Tag, AlertTriangle, TrendingUp, Zap } from 'lucide-react';

export function IntelligencePanel() {
  const events = [
    { time: '14:30', currency: 'USD', impact: 'HIGH', event: 'Bộ Lao động Mỹ công bố CPI (Core Retail Sales m/m)', act: '0.4%', fcast: '0.3%', prev: '0.2%' },
    { time: '15:00', currency: 'VND', impact: 'HIGH', event: 'NHNN họp báo về chính sách điều hành tỷ giá quý tới', act: '-', fcast: '-', prev: '-' },
    { time: '19:15', currency: 'EUR', impact: 'MED',  event: 'ECB Chủ tịch Lagarde phát biểu', act: '-', fcast: '-', prev: '-' },
    { time: '21:30', currency: 'USD', impact: 'HIGH', event: 'Biên bản cuộc họp FOMC (Fed Minutes)', act: '-', fcast: '-', prev: '-' },
    { time: 'Ngày mai', currency: 'VND', impact: 'MED', event: 'Đáo hạn hợp đồng tương lai VN30F1M', act: '-', fcast: '-', prev: '-' },
  ];

  const trades = [
    { time: '10:45 AM', asset: 'BTCUSDT', type: 'LONG', price: '70,120', profit: '+$450', pnlPercent: '+0.6%' },
    { time: '09:15 AM', asset: 'VPB', type: 'SHORT', price: '28.40', profit: '-₫1,250K', pnlPercent: '-1.5%' },
    { time: 'Hôm qua', asset: 'FPT', type: 'LONG', price: '74.50', profit: '+₫12,400K', pnlPercent: '+2.1%' },
  ];

  const whales = [
    { time: 'Breakout', asset: 'MWG', detail: 'Huge block trade: 1.2M shares @ 56.40', type: 'BULLISH' },
    { time: 'Anomaly', asset: 'BTC', detail: 'Wallet 0x8a... transferred 5,400 BTC to Binance', type: 'BEARISH' },
    { time: 'Sweep', asset: 'SSI', detail: 'Aggressive sweep of offer: 500k shares lifted at 36.65', type: 'BULLISH' },
  ];

  return (
    <div className="flex h-full gap-4 w-full px-4 min-h-0 text-slate-300 font-sans">
        
        {/* Economic Calendar */}
        <div className="flex-1 flex flex-col bg-[#0b0e17] rounded-lg border border-white/5 overflow-hidden shadow-xl min-h-0">
            <div className="px-4 py-3 border-b border-white/5 bg-[#080b13] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-white font-bold tracking-widest text-sm uppercase">
                    <Calendar size={16} className="text-indigo-400" /> Economic Calendar
                </div>
            </div>
            <div className="flex-1 overflow-y-auto hide-scrollbar p-0">
                <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/50 sticky top-0 text-[10px] text-slate-500 uppercase">
                        <tr>
                            <th className="p-3 font-semibold border-b border-white/5">Time</th>
                            <th className="p-3 font-semibold border-b border-white/5">Cur</th>
                            <th className="p-3 font-semibold border-b border-white/5">Imp</th>
                            <th className="p-3 font-semibold border-b border-white/5">Event</th>
                            <th className="p-3 font-semibold border-b border-white/5">Actual</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {events.map((ev, i) => (
                            <tr key={i} className="hover:bg-white/[0.02] cursor-pointer group">
                                <td className="p-3 font-mono font-medium text-slate-400">{ev.time}</td>
                                <td className="p-3 font-bold">{ev.currency}</td>
                                <td className="p-3">
                                    <span className={`w-3 h-3 rounded-full inline-block ${ev.impact==='HIGH'?'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]':'bg-amber-500'}`}></span>
                                </td>
                                <td className="p-3 text-slate-300 group-hover:text-white transition-colors">{ev.event}</td>
                                <td className="p-3 font-mono font-bold text-emerald-400">{ev.act}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Action Panel: Trade Journal & Whale Tracker */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
            {/* Auto Trade Journal */}
            <div className="flex-1 flex flex-col bg-[#0b0e17] rounded-lg border border-white/5 overflow-hidden shadow-xl min-h-0">
                <div className="px-4 py-3 border-b border-white/5 bg-[#080b13] flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2 text-white font-bold tracking-widest text-sm uppercase">
                        <Tag size={16} className="text-cyan-400" /> Automated Trade Journal
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto hide-scrollbar p-3 flex flex-col gap-2">
                    {trades.map((tr, i) => {
                        const isWin = tr.profit.includes('+');
                        return (
                        <div key={i} className="flex justify-between items-center p-3 border border-white/5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${isWin ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
                                    {isWin ? <TrendingUp size={20} className="text-emerald-400"/> : <ArrowDownRight size={20} className="text-rose-400"/>}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-white text-sm">{tr.asset} <span className="ml-1 text-[10px] font-mono text-slate-500">{tr.type} @ {tr.price}</span></span>
                                    <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar size={10}/> {tr.time} (Auto-Tagged on Chart)</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={`font-mono font-bold text-lg leading-none ${isWin ? 'text-emerald-400' : 'text-rose-400'}`}>{tr.profit}</span>
                                <span className={`font-mono text-xs font-bold ${isWin ? 'text-emerald-500' : 'text-rose-500'}`}>{tr.pnlPercent}</span>
                            </div>
                        </div>
                    )})}
                </div>
            </div>

            {/* Whale / Block Trade Flow */}
            <div className="flex-[0.8] flex flex-col bg-[#0b0e17] rounded-lg border border-white/5 overflow-hidden shadow-xl min-h-0">
                <div className="px-4 py-3 border-b border-white/5 bg-[#080b13] flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2 text-white font-bold tracking-widest text-sm uppercase">
                        <Zap size={16} className="text-indigo-400" /> Smart Order Flow & Whales
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto hide-scrollbar p-3 flex flex-col gap-2">
                    {whales.map((w, i) => (
                        <div key={i} className="flex flex-col p-3 border-l-2 border-white/5 border-l-indigo-500 bg-white/[0.01] rounded-r mt-1 hover:bg-white/[0.03] transition-colors">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-indigo-400 text-xs tracking-widest uppercase">{w.time} | {w.asset}</span>
                                <span className={`text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded ${w.type==='BULLISH'?'bg-emerald-500/20 text-emerald-400':'bg-rose-500/20 text-rose-400'}`}>{w.type}</span>
                            </div>
                            <span className="text-sm text-slate-300 font-medium leading-relaxed">{w.detail}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

// Ensure standalone ArrowDownRight icon runs cleanly if needed locally inside this component file 
// (Even though it normally imports from lucide-react above, we missed adding it to imports, so let's import it to be safe)
import { ArrowDownRight } from 'lucide-react';
