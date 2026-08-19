import React, { useState } from 'react';
import { Bell, Plus, Search, Calendar, User, AlertTriangle, Trash2, Pin } from 'lucide-react';
import { Notice } from '../../types';

interface NoticesViewProps {
  notices: Notice[];
  onOpenAddNotice: () => void;
  onDeleteNotice: (id: string | number) => void;
}

export const NoticesView: React.FC<NoticesViewProps> = ({
  notices,
  onOpenAddNotice,
  onDeleteNotice
}) => {
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  const filtered = notices.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());
    const matchTag = !tagFilter || n.tag === tagFilter;
    return matchSearch && matchTag;
  });

  return (
    <div className="bg-white rounded-2xl border border-[#e7edf4] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-[#e7edf4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Thông báo & Lời dặn lớp học</h2>
            <p className="text-xs text-slate-500">
              Lịch kiểm tra, hoạt động thi đua và thông tin quan trọng gửi tới toàn thể phụ huynh & học sinh
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddNotice}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tạo thông báo</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="p-4 bg-slate-50/50 border-b border-[#e7edf4] flex flex-wrap items-center justify-between gap-2.5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm nội dung thông báo..."
            className="w-full pl-9 pr-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-rose-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {['', 'Kiểm tra', 'Thi đua', 'Hoạt động', 'Thông báo'].map((tag) => (
            <button
              key={tag}
              onClick={() => setTagFilter(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tagFilter === tag
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tag || 'Tất cả'}
            </button>
          ))}
        </div>
      </div>

      {/* Notices list */}
      <div className="p-4 sm:p-5 space-y-3.5">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            Không tìm thấy thông báo nào. Bấm "+ Tạo thông báo" để đăng tin mới.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                item.important
                  ? 'bg-gradient-to-r from-rose-50/50 via-amber-50/30 to-white border-rose-200 shadow-xs'
                  : 'bg-white border-[#e4ebf2] hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.important && (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center gap-1 shadow-2xs">
                        <AlertTriangle className="w-3 h-3" />
                        <span>QUAN TRỌNG</span>
                      </span>
                    )}
                    {item.tag && (
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold">
                        {item.tag}
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-normal">
                    {item.content}
                  </p>

                  <div className="pt-2 flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <User className="w-3 h-3" />
                    <span>Người đăng: {item.author}</span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteNotice(item.id)}
                  className="text-slate-300 hover:text-rose-600 p-1 rounded-lg transition-colors"
                  title="Xóa thông báo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
