export function Watchlist({ type = 'vn' }: { type?: 'vn' | 'crypto' }) {
    
    const vnStocks = [
        { sym: 'VPB', name: 'Ngân hàng VN Thịnh Vượng', p: '28.25', c: '+2.36%', up: true },
        { sym: 'FPT', name: 'Tập đoàn FPT', p: '76.00', c: '+2.56%', up: true },
        { sym: 'HPG', name: 'Tập đoàn Hòa Phát', p: '28.00', c: '+0.18%', up: true },
        { sym: 'NVL', name: 'Tập đoàn Novaland', p: '17.05', c: '0.00%', up: null },
        { sym: 'VHM', name: 'Vinhomes', p: '135.70', c: '-5.17%', up: false },
        { sym: 'VCB', name: 'Vietcombank', p: '59.50', c: '+0.17%', up: true },
        { sym: 'MWG', name: 'Thế Giới Di Động', p: '56.90', c: '+6.89%', up: true },
        { sym: 'SSI', name: 'Chứng khoán SSI', p: '36.65', c: '+0.41%', up: true },
        { sym: 'DIG', name: 'DIC Corp', p: '3.51', c: '-0.85%', up: false },
        { sym: 'GAS', name: 'PV GAS', p: '80.10', c: '+2.17%', up: true },
        { sym: 'MBB', name: 'Ngân hàng MB', p: '26.45', c: '+0.57%', up: true },
    ];

    const crStocks = [
        { sym: 'BTCUSDT', name: 'Bitcoin', p: '71,250.0', c: '+3.04%', up: true },
        { sym: 'ETHUSDT', name: 'Ethereum', p: '3,605.5', c: '-1.30%', up: false },
        { sym: 'SOLUSDT', name: 'Solana', p: '180.20', c: '+7.40%', up: true },
        { sym: 'BNBUSDT', name: 'Binance Coin', p: '590.20', c: '+1.00%', up: true },
        { sym: 'ADAUSDT', name: 'Cardano', p: '0.582', c: '+0.25%', up: true },
        { sym: 'XRPUSDT', name: 'Ripple', p: '0.612', c: '-2.10%', up: false },
        { sym: 'DOGEUSDT', name: 'Dogecoin', p: '0.198', c: '+12.5%', up: true },
        { sym: 'AVAXUSDT', name: 'Avalanche', p: '45.10', c: '-1.15%', up: false },
        { sym: 'LINKUSDT', name: 'Chainlink', p: '18.40', c: '+2.20%', up: true },
    ];

    const data = type === 'vn' ? vnStocks : crStocks;

    return (
        <div className="flex flex-col h-full bg-transparent overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 border-b border-white/5 bg-[#080b13] shrink-0">
                <span className="font-bold text-white text-xs tracking-widest uppercase">Watchlist</span>
                <button className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold">+</button>
            </div>
            
            <div className="flex justify-between px-4 py-2 border-b border-white/5 text-[9px] text-slate-500 uppercase tracking-widest bg-[#0b0e17] shrink-0">
                <span>Symbol</span>
                <div className="flex gap-4">
                    <span>Price</span>
                    <span>24h%</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar">
                <div className="flex flex-col divide-y divide-white/[0.02]">
                    {data.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center px-4 py-2.5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
                             <div className="flex flex-col">
                                 <span className="text-white font-bold text-xs group-hover:text-cyan-400 transition-colors">{item.sym}</span>
                                 <span className="text-slate-500 text-[9px] truncate max-w-[80px]">{item.name}</span>
                             </div>
                             <div className="flex items-center gap-4 text-right">
                                 <span className="text-white font-mono text-xs">{item.p}</span>
                                 <span className={`w-[50px] text-right font-mono text-xs
                                    ${item.up === true ? 'text-emerald-400' : item.up === false ? 'text-rose-400' : 'text-slate-400'}
                                 `}>{item.c}</span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
