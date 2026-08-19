import React, { useState } from 'react';
import { X, BellPlus } from 'lucide-react';
import { Notice } from '../../types';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNotice: (notice: Omit<Notice, 'id'>) => void;
  teacherName: string;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  onClose,
  onAddNotice,
  teacherName
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Thông báo');
  const [important, setImportant] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Vui lòng nhập đầy đủ tiêu đề và nội dung');
      return;
    }

    onAddNotice({
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('vi-VN'),
      author: teacherName,
      important,
      tag
    });

    setTitle('');
    setContent('');
    setImportant(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <BellPlus className="w-4 h-4" />
            </div>
            <span>Tạo thông báo mới cho lớp</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Tiêu đề thông báo <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Kế hoạch ôn tập thi học kỳ 2"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:border-blue-500"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Chủ đề phân loại</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white"
              >
                <option value="Thông báo">Thông báo chung</option>
                <option value="Kiểm tra">Lịch kiểm tra</option>
                <option value="Thi đua">Phong trào thi đua</option>
                <option value="Hoạt động">Hoạt động ngoại khóa</option>
              </select>
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-rose-600">
                <input
                  type="checkbox"
                  checked={important}
                  onChange={(e) => setImportant(e.target.checked)}
                  className="rounded-sm text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span>Đánh dấu QUAN TRỌNG 🚨</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Nội dung thông báo <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung chi tiết dặn dò học sinh và phụ huynh..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-500 leading-relaxed"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold shadow-xs transition-colors"
            >
              Đăng thông báo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
