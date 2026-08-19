import React, { useState } from 'react';
import { X, BookPlus } from 'lucide-react';
import { LibraryItem } from '../../types';

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddResource: (item: Omit<LibraryItem, 'id'>) => void;
}

export const LibraryModal: React.FC<LibraryModalProps> = ({
  isOpen,
  onClose,
  onAddResource
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<'Toán' | 'Tiếng Việt' | 'Khoa học' | 'STEM' | 'Kỹ năng sống'>('Toán');
  const [type, setType] = useState<'Tài liệu' | 'Bài tập' | 'Giáo án' | 'Trò chơi'>('Tài liệu');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Vui lòng nhập tên tài liệu');
      return;
    }

    onAddResource({
      title: title.trim(),
      subject,
      type,
      description: description.trim() || 'Tài liệu học tập bổ trợ.',
      fileSize: '1.5 MB'
    });

    setTitle('');
    setDescription('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookPlus className="w-4 h-4" />
            </div>
            <span>Thêm tài liệu học liệu mới</span>
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
              Tên tài liệu / Bài giảng <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Phiếu bài tập cuối tuần môn Toán tuần 32"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:border-blue-500"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Môn học</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white"
              >
                <option value="Toán">Toán</option>
                <option value="Tiếng Việt">Tiếng Việt</option>
                <option value="Khoa học">Khoa học</option>
                <option value="STEM">STEM</option>
                <option value="Kỹ năng sống">Kỹ năng sống</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Dạng tài liệu</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white"
              >
                <option value="Tài liệu">Tài liệu tham khảo</option>
                <option value="Bài tập">Phiếu bài tập</option>
                <option value="Giáo án">Kế hoạch bài dạy</option>
                <option value="Trò chơi">Trò chơi học tập</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Mô tả tóm tắt</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ghi chú nội dung trọng tâm hoặc hướng dẫn sử dụng..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-500"
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
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-xs transition-colors"
            >
              Thêm vào thư viện
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
