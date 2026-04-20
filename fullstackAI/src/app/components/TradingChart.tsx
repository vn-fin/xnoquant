import { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, Time } from 'lightweight-charts';

interface ChartProps {
  symbol?: string;
  name?: string;
  price?: string;
  change?: string;
  isUp?: boolean;
  startPrice?: number;
  minimal?: boolean;
}

export function TradingChart({ symbol = 'VPB', name = 'Ngân hàng TMCP VN Thịnh Vượng', price = '28.25', change = '+0.65 (2.36%)', isUp = true, startPrice = 25.00, minimal = false }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#64748b',
      },
      grid: {
        vertLines: { visible: !minimal, color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { visible: !minimal, color: 'rgba(255, 255, 255, 0.05)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        visible: !minimal,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        timeVisible: true,
      },
      rightPriceScale: {
        visible: !minimal,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      crosshair: {
        mode: 0,
        vertLine: { visible: !minimal, color: 'rgba(255, 255, 255, 0.2)', style: 3 },
        horzLine: { visible: !minimal, color: 'rgba(255, 255, 255, 0.2)', style: 3 },
      },
      handleScroll: !minimal,
      handleScale: !minimal,
    });

    chartInstanceRef.current = chart;

    let series;
    if (minimal) {
        series = chart.addLineSeries({
            color: isUp ? '#10b981' : '#f43f5e',
            lineWidth: 2,
            crosshairMarkerVisible: false,
            priceLineVisible: false,
        });
    } else {
        series = chart.addCandlestickSeries({
            upColor: '#10b981',
            downColor: '#f43f5e',
            borderVisible: false,
            wickUpColor: '#10b981',
            wickDownColor: '#f43f5e',
        });
    }

    const generateData = () => {
      const data = [];
      let baseTime = new Date('2025-01-01T00:00:00Z').getTime() / 1000;
      let open = startPrice;
      const volatility = startPrice * (minimal ? 0.01 : 0.02);
      for (let i = 0; i < 150; i++) {
        const bias = isUp ? 0.48 : 0.52;
        const close = open + (Math.random() - bias) * volatility;
        if (minimal) {
            data.push({ time: baseTime as Time, value: close });
        } else {
            const high = Math.max(open, close) + Math.random() * (volatility * 0.5);
            const low = Math.min(open, close) - Math.random() * (volatility * 0.5);
            data.push({ time: baseTime as Time, open, high, low, close });
        }
        open = close;
        baseTime += 86400;
      }
      return data;
    };

    const data = generateData();
    series.setData(data);

    // Apply Event Markers if not minimal (News / Trades overlaid on chart natively)
    if (!minimal && data.length > 30) {
        series.setMarkers([
            {
                time: data[data.length - 20].time,
                position: 'aboveBar',
                color: '#eab308', // yellow-500
                shape: 'circle',
                text: 'CPI News Event',
            },
            {
                time: data[data.length - 12].time,
                position: 'belowBar',
                color: '#3b82f6', // blue-500
                shape: 'arrowUp',
                text: 'Auto Journal: BUY Filled',
            },
            {
                time: data[data.length - 3].time,
                position: 'aboveBar',
                color: '#8b5cf6', // violet-500
                shape: 'arrowDown',
                text: 'Whale Block 1.2M Vol',
            }
        ]);
    }

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth, height: chartContainerRef.current.clientHeight });
      }
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [startPrice, isUp, minimal]);

  return (
    <div className={`flex flex-col w-full h-full bg-[#0b0f19] rounded-lg overflow-hidden relative ${minimal ? 'border border-white/5 shadow-md hover:bg-white/[0.02] cursor-pointer transition-colors' : ''}`}>
      {minimal ? (
          <div className="flex justify-between items-start px-3 py-2 z-10 absolute inset-x-0 pointer-events-none">
              <div className="flex flex-col">
                 <span className="font-bold text-white text-[11px] tracking-widest">{symbol}</span>
              </div>
              <div className="flex flex-col items-end">
                 <span className={`font-mono font-bold text-xs ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>{price}</span>
                 <span className={`text-[9px] font-medium leading-none mt-0.5 ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>{change}</span>
              </div>
          </div>
      ) : (
          <div className="flex justify-between items-center px-4 py-3 border-b border-white/5 bg-[#080b13] relative z-10 shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-7 h-7 rounded bg-indigo-500/20 text-indigo-400 font-bold text-sm shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                {symbol.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm tracking-widest">{symbol}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">{name}</span>
              </div>
              <div className="flex items-end gap-2 ml-4">
                <span className={`font-mono font-bold text-lg leading-none ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>{price}</span>
                <span className={`text-xs font-medium px-1.5 py-0.5 rounded leading-none mb-0.5 ${isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>{change}</span>
              </div>
            </div>
            <div className="flex bg-[#0b0f19] rounded p-1 border border-white/5">
              <button className="px-3 py-1 text-xs text-white bg-white/10 rounded font-medium shadow-sm">1D</button>
              <button className="px-3 py-1 text-xs text-slate-400 hover:text-white transition-colors">1W</button>
              <button className="px-3 py-1 text-xs text-slate-400 hover:text-white transition-colors">1M</button>
            </div>
          </div>
      )}
      <div className={`flex-1 w-full min-h-0 relative ${minimal ? 'mt-4' : ''}`} ref={chartContainerRef}></div>
    </div>
  );
}
