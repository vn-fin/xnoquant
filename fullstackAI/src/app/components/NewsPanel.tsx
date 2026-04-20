import { Clock } from "lucide-react";
import { useState } from "react";

export function NewsPanel() {
  const [activeTab, setActiveTab] = useState('TẤT CẢ');

  const news = [
    { time: '1 phút trước', source: 'VNExpress', text: 'Thị trường chứng khoán Việt Nam hồi phục sau phiên giảm điểm sâu, VN-Index tăng 12 điểm', category: 'THỊ TRƯỜNG', impact: 'high', tab: 'VĨ MÔ' },
    { time: '5 phút trước', source: 'Reuters', text: 'Fed quyết định giữ nguyên lãi suất ở mức 5.25% - 5.5%, thị trường chứng khoán Mỹ hưng phấn', category: 'THẾ GIỚI', impact: 'high', tab: 'THẾ GIỚI' },
    { time: '12 phút trước', source: 'Cafef', text: 'Khối ngoại đảo chiều mua ròng hơn 500 tỷ đồng trên HOSE, tập trung gom HPG và SSI', category: 'DÒNG TIỀN', impact: 'medium', tab: 'VĨ MÔ' },
    { time: '25 phút trước', source: 'Bloomberg', text: 'Giá vàng thế giới liên tục lập đỉnh mới do lo ngại lạm phát và căng thẳng địa chính trị', category: 'HÀNG HÓA', impact: 'high', tab: 'THẾ GIỚI' },
    { time: '34 phút trước', source: 'VTV News', text: 'Ngân hàng nhà nước có động thái mới về tỷ giá: Sẵn sàng can thiệp bán ngoại tệ', category: 'VĨ MÔ', impact: 'high', tab: 'VĨ MÔ' },
    { time: '41 phút trước', source: 'Vietstock', text: 'MWG đặt kế hoạch lợi nhuận năm 2026 tăng trưởng đột biến nhờ tối ưu hóa chi phí', category: 'DOANH NGHIỆP', impact: 'medium', tab: 'DOANH NGHIỆP' },
    { time: '55 phút trước', source: 'CNBC', text: 'Cổ phiếu công nghệ tiếp tục dẫn sóng: Nvidia và Microsoft đạt mức vốn hóa kỷ lục mới', category: 'THẾ GIỚI', impact: 'medium', tab: 'THẾ GIỚI' },
    { time: '1 giờ trước', source: 'Tin Nhanh CK', text: 'Ngành dệt may và thủy sản đón nhận nhiều tín hiệu tích cực từ các đơn hàng xuất khẩu quý 2', category: 'NGÀNH', impact: 'low', tab: 'DOANH NGHIỆP' },
    { time: '2 giờ trước', source: 'Reuters', text: 'Giá dầu thô giảm nhẹ sau khi Mỹ công bố dữ liệu dự trữ xăng dầu hàng tuần', category: 'HÀNG HÓA', impact: 'low', tab: 'THẾ GIỚI' },
  ];

  const tabs = ['TẤT CẢ', 'VĨ MÔ', 'DOANH NGHIỆP', 'THẾ GIỚI'];
  const filteredNews = activeTab === 'TẤT CẢ' ? news : news.filter(n => n.tab === activeTab);

  return (
    <div className="flex flex-col h-full bg-[#0b0f19] text-slate-300 font-sans text-xs overflow-hidden">
      {/* Header Tabs */}
      <div className="flex items-center justify-between border-b border-white/5 bg-[#080b13] px-4 py-3">
        <div className="flex gap-5 font-bold text-[11px] uppercase tracking-wider overflow-x-auto hide-scrollbar">
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? 'text-white after:absolute after:-bottom-3 after:left-0 after:w-full after:h-[2px] after:bg-indigo-500 after:rounded-t-full' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
        </div>
      </div>

      {/* Breaking News Flash */}
      <div className="flex items-center border-b border-white/5 bg-rose-500/10 px-4 py-2.5 text-rose-200">
        <div className="bg-gradient-to-r from-rose-500 to-red-500 text-white px-2 py-0.5 rounded flex items-center text-[10px] font-bold uppercase tracking-wider mr-3 shadow-[0_0_10px_rgba(244,63,94,0.4)] animate-pulse">HOT</div>
        <div className="truncate font-medium text-xs">Ngân hàng nhà nước có động thái mới về tỷ giá: Sẵn sàng can thiệp bán ngoại tệ để ổn định thị trường.</div>
      </div>

      {/* Ticker Feed */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="grid divide-y divide-white/5">
          {filteredNews.map((item, idx) => (
            <div key={idx} className="flex flex-col p-3 hover:bg-white/[0.04] transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-1.5">
                 <div className="flex items-center gap-2">
                     <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase
                        ${item.impact === 'high' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/20' : item.impact === 'medium' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/20' : 'bg-slate-700/50 text-slate-400 border border-slate-700'}
                     `}>{item.category}</span>
                     <span className="text-slate-500 font-semibold text-[10px]">{item.source}</span>
                 </div>
                 <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                     <Clock className="w-3 h-3" />
                     {item.time}
                 </div>
              </div>
              <div className="text-slate-300 group-hover:text-white transition-colors leading-relaxed font-medium">
                  {item.text}
              </div>
            </div>
          ))}
          {filteredNews.length === 0 && (
             <div className="p-8 text-center text-slate-500">Không có tin tức nào trong danh mục này.</div>
          )}
        </div>
      </div>
    </div>
  );
}
