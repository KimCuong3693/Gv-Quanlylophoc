import React from 'react';
import { X, HelpCircle, BookOpen, Star, Sparkles, CheckCircle2 } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqs = [
    {
      q: '🌱 Quy tắc nở hoa trong Vườn Ươm Tri Thức hoạt động như thế nào?',
      a: 'Mỗi học sinh bắt đầu ở giai đoạn "Hạt giống" (🌱). Khi đạt từ 80 - 99 điểm, cây chuyển sang giai đoạn "Có nụ hoa" (🌸). Khi đạt từ 100 điểm trở lên, cây sẽ "Nở hoa rực rỡ" (🌳) kèm hiệu ứng pháo hoa chúc mừng!'
    },
    {
      q: '🌼 Cách tính số lượng đóa hoa của học sinh?',
      a: 'Mỗi 5 điểm tích lũy học tập hoặc rèn luyện sẽ tự động kết tinh thành 1 đóa hoa (🌼). Ví dụ: 80 điểm = 16 đóa hoa.'
    },
    {
      q: '📝 Khi giao nhiệm vụ cho "Cả lớp", việc duyệt xong sẽ tính điểm ra sao?',
      a: 'Khi giáo viên bấm "Duyệt xong (+X điểm)", toàn bộ học sinh được giao nhiệm vụ đó sẽ được tự động cộng thêm số điểm thưởng tương ứng ngay lập tức.'
    },
    {
      q: '💾 Dữ liệu được lưu trữ như thế nào?',
      a: 'Toàn bộ danh sách học sinh, điểm số, nhiệm vụ, ghi chú và tài liệu được lưu trữ an toàn và tự động vào bộ nhớ trình duyệt (localStorage). Thầy cô cũng có thể xuất file sao lưu JSON hoặc file báo cáo Excel (CSV) bất cứ lúc nào trong mục Cài đặt & Báo cáo.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <span>Hướng dẫn sử dụng Vườn Ươm Tri Thức</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 via-blue-50/40 to-amber-50/60 border border-sky-100">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Sứ mệnh Vườn Ươm Tri Thức</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ứng dụng hỗ trợ giáo viên tiểu học tạo động lực thi đua học tập tích cực, ghi nhận sự tiến bộ hàng ngày của từng em học sinh một cách sinh động, trực quan và tràn đầy niềm vui.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <strong className="text-xs sm:text-sm font-bold text-slate-800 block mb-1.5 leading-snug">
                  {faq.q}
                </strong>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-3 border-t border-slate-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
