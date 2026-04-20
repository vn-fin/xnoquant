import { Flame, Star } from 'lucide-react';

export function MarketOverview() {
  const sectors = [
    { title: 'VN30', index: '+0.58%', items: [
      { t: 'MWG', p: '56.90', c: '6.89%', v: '15.1m', color: 'text-purple-400' },
      { t: 'GVR', p: '33.50', c: '4.04%', v: '7.7m', color: 'text-emerald-500' },
      { t: 'FPT', p: '76.00', c: '2.56%', v: '12.3m', color: 'text-emerald-500' },
      { t: 'VPB', p: '28.25', c: '2.36%', v: '25.7m', color: 'text-emerald-500' },
      { t: 'GAS', p: '80.10', c: '2.17%', v: '1.2m', color: 'text-emerald-500' },
      { t: 'VNM', p: '61.30', c: '0.33%', v: '3.1m', color: 'text-emerald-500' },
      { t: 'VCB', p: '59.50', c: '0.17%', v: '4.3m', color: 'text-emerald-500' },
      { t: 'VHM', p: '135.70', c: '-5.17%', v: '9.4m', color: 'text-rose-500' }
    ]},
    { title: 'Ngân hàng', index: '+0.26%', items: [
      { t: 'OCB', p: '11.75', c: '2.62%', v: '3.0m', color: 'text-emerald-500' },
      { t: 'VPB', p: '28.25', c: '2.36%', v: '25.7m', color: 'text-emerald-500' },
      { t: 'SSB', p: '16.85', c: '1.20%', v: '2.1m', color: 'text-emerald-500' },
      { t: 'VIB', p: '17.35', c: '1.17%', v: '5.7m', color: 'text-emerald-500' },
      { t: 'TCB', p: '32.25', c: '1.10%', v: '12.2m', color: 'text-emerald-500' },
      { t: 'MBB', p: '26.45', c: '0.57%', v: '8.6m', color: 'text-emerald-500' },
      { t: 'VCB', p: '59.50', c: '0.17%', v: '4.3m', color: 'text-emerald-500' },
      { t: 'BID', p: '40.30', c: '0.25%', v: '1.5m', color: 'text-emerald-500' },
      { t: 'SHB', p: '12.65', c: '-1.01%', v: '9.0m', color: 'text-rose-500' }
    ]},
    { title: 'Bất động sản', index: '-2.28%', items: [
      { t: 'BCM', p: '55.70', c: '1.27%', v: '630.0k', color: 'text-emerald-500' },
      { t: 'HTN', p: '7.30', c: '0.69%', v: '171.9k', color: 'text-emerald-500' },
      { t: 'KBC', p: '35.05', c: '0.29%', v: '3.4m', color: 'text-emerald-500' },
      { t: 'NVL', p: '17.05', c: '0.00%', v: '16.8m', color: 'text-amber-500' },
      { t: 'CRE', p: '7.63', c: '0.00%', v: '182.9k', color: 'text-amber-500' },
      { t: 'DIG', p: '3.51', c: '-0.85%', v: '941.1k', color: 'text-rose-500' },
      { t: 'IJC', p: '10.40', c: '-0.95%', v: '2.7m', color: 'text-rose-500' },
      { t: 'KDH', p: '26.05', c: '-0.95%', v: '3.0m', color: 'text-rose-500' },
      { t: 'VHM', p: '135.70', c: '-5.17%', v: '9.4m', color: 'text-rose-500' }
    ]},
    { title: 'Chứng khoán', index: '-0.70%', items: [
      { t: 'TCI', p: '10.35', c: '2.48%', v: '155.4k', color: 'text-emerald-500' },
      { t: 'APG', p: '5.16', c: '1.38%', v: '416.6k', color: 'text-emerald-500' },
      { t: 'AAS', p: '8.60', c: '1.18%', v: '371.3k', color: 'text-emerald-500' },
      { t: 'DSC', p: '13.00', c: '0.78%', v: '14.6k', color: 'text-emerald-500' },
      { t: 'TVS', p: '13.90', c: '0.72%', v: '32.6k', color: 'text-emerald-500' },
      { t: 'VND', p: '16.55', c: '0.00%', v: '7.1m', color: 'text-amber-500' },
      { t: 'HCM', p: '27.00', c: '0.56%', v: '24.2m', color: 'text-emerald-500' },
      { t: 'SSI', p: '36.65', c: '0.41%', v: '180.6k', color: 'text-emerald-500' }
    ]},
    { title: 'Thép', index: '+0.20%', items: [
      { t: 'POM', p: '4.20', c: '5.00%', v: '3.6m', color: 'text-purple-400' },
      { t: 'NSH', p: '5.60', c: '1.82%', v: '459.8k', color: 'text-emerald-500' },
      { t: 'VCA', p: '7.00', c: '1.30%', v: '200', color: 'text-emerald-500' },
      { t: 'TLH', p: '4.81', c: '0.21%', v: '187.8k', color: 'text-emerald-500' },
      { t: 'HPG', p: '28.00', c: '0.18%', v: '21.4m', color: 'text-emerald-500' },
      { t: 'HSG', p: '16.00', c: '0.00%', v: '3.6m', color: 'text-amber-500' },
      { t: 'NKG', p: '14.70', c: '-0.68%', v: '3.9m', color: 'text-rose-500' }
    ]}
  ];

  return (
    <div className="flex flex-col h-full bg-[#111] overflow-hidden rounded border border-slate-800">
      {/* Heatmap Grid */}
      <div className="flex-1 overflow-x-auto overflow-y-auto p-2 bg-[#050505]">
         <div className="flex gap-2 min-w-max h-full">
             {sectors.map((sector, sIdx) => (
                <div key={sIdx} className="w-48 bg-[#111] rounded border border-slate-800 flex flex-col hide-scrollbar">
                    <div className="text-center py-2 border-b border-slate-800 font-bold bg-[#1a1a1a]">
                        <div className="text-white text-xs">{sector.title}</div>
                        <div className={`text-[10px] ${sector.index.includes('-') ? 'text-rose-500' : 'text-emerald-500'}`}>{sector.index}</div>
                    </div>
                    <div className="flex justify-between px-2 py-1 text-[9px] text-slate-500 uppercase border-b border-slate-800">
                        <span>Mã</span>
                        <span>Giá</span>
                        <span>+/-</span>
                        <span>KL</span>
                    </div>
                    <div className="flex flex-col flex-1 pb-1">
                        {sector.items.map((item, iIdx) => (
                            <div key={iIdx} className="flex justify-between items-center px-2 py-1.5 hover:bg-slate-800 cursor-pointer border-b border-slate-900/50">
                                <span className={`text-[11px] font-bold ${item.color} w-8`}>{item.t}</span>
                                <span className={`text-[10px] font-mono ${item.color}`}>{item.p}</span>
                                <span className={`text-[10px] font-mono ${item.color} w-10 text-right`}>{item.c}</span>
                                <span className="text-[10px] font-mono text-slate-400 w-8 text-right">{item.v}</span>
                            </div>
                        ))}
                    </div>
                </div>
             ))}
         </div>
      </div>
    </div>
  );
}
