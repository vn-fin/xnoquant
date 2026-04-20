export function OrderBook({ isCrypto = false, currentPrice = 28.25 }) {
  // Generate dummy bids (buyers) and asks (sellers)
  const generateOrders = (type: 'ask' | 'bid', count: number) => {
     let price = currentPrice;
     const items = [];
     let totalVolume = 0;
     for(let i=0; i<count; i++) {
        price = type === 'ask' ? price + Math.random() * (isCrypto ? 10 : 0.05) : price - Math.random() * (isCrypto ? 10 : 0.05);
        const amount = Math.floor(Math.random() * (isCrypto ? 500 : 50000)) + 1;
        totalVolume += amount;
        items.push({ price: price.toFixed(isCrypto ? 2 : 2), amount, total: totalVolume });
     }
     return type === 'ask' ? items.reverse() : items; // Asks descending to current price, Bids descending from current price
  };

  const asks = generateOrders('ask', 12);
  const bids = generateOrders('bid', 12);
  const maxVolume = Math.max(...asks.map(a => a.total), ...bids.map(b => b.total));

  return (
    <div className="flex flex-col h-full bg-transparent text-slate-300 font-mono text-[10px] sm:text-xs overflow-hidden">
      <div className="p-2 border-b border-white/5 bg-[#080b13] font-bold text-white tracking-widest shrink-0">ORDER BOOK</div>
      <div className="flex justify-between px-3 py-1.5 border-b border-white/5 text-[9px] text-slate-500 uppercase tracking-widest sticky top-0 bg-[#0b0e17] z-10 shrink-0">
          <span>Price</span>
          <span>Amount</span>
          <span>Total</span>
      </div>
      
      <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col py-1">
         {/* Asks (Sell Orders) */}
         <div className="flex flex-col justify-end min-h-0">
             {asks.map((ask, i) => (
                 <div key={`a-${i}`} className="flex justify-between items-center px-3 py-[2px] relative group cursor-pointer hover:bg-white/[0.02]">
                     {/* Depth Bar Background */}
                     <div className="absolute right-0 top-0 h-full bg-rose-500/10 pointer-events-none transition-all" style={{ width: `${(ask.total / maxVolume) * 100}%` }}></div>
                     <span className="text-rose-400 z-10 font-bold">{ask.price}</span>
                     <span className="text-slate-300 z-10">{ask.amount.toLocaleString()}</span>
                     <span className="text-slate-500 z-10">{ask.total.toLocaleString()}</span>
                 </div>
             ))}
         </div>

         {/* Current Price Divider */}
         <div className="py-2 my-1 px-3 flex items-center justify-between border-y border-white/5 bg-[#080b13] shrink-0">
             <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                 {currentPrice.toFixed(2)}
                 <span className="text-[10px] font-normal px-1 bg-emerald-500/20 text-emerald-300 rounded">+{isCrypto ? '15.5' : '0.65'}</span>
             </div>
             <span className="text-white font-medium text-[10px] uppercase">
                {isCrypto ? 'Spread 0.01' : 'Index'}
             </span>
         </div>

         {/* Bids (Buy Orders) */}
         <div className="flex flex-col min-h-0">
             {bids.map((bid, i) => (
                 <div key={`b-${i}`} className="flex justify-between items-center px-3 py-[2px] relative group cursor-pointer hover:bg-white/[0.02]">
                     {/* Depth Bar Background */}
                     <div className="absolute right-0 top-0 h-full bg-emerald-500/10 pointer-events-none transition-all" style={{ width: `${(bid.total / maxVolume) * 100}%` }}></div>
                     <span className="text-emerald-400 z-10 font-bold">{bid.price}</span>
                     <span className="text-slate-300 z-10">{bid.amount.toLocaleString()}</span>
                     <span className="text-slate-500 z-10">{bid.total.toLocaleString()}</span>
                 </div>
             ))}
         </div>
      </div>
    </div>
  );
}
