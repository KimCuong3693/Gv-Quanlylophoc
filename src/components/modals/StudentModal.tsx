import React, { useState } from 'react';
import { X, UserPlus, Sparkles } from 'lucide-react';
import { Student } from '../../types';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (name: string, team: string, badge?: string, points?: number) => void;
  existingNames: string[];
}

export const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  onAddStudent,
  existingNames
}) => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('Tổ 1');
  const [badge, setBadge] = useState('');
  const [points, setPoints] = useState(0);
  const [keepOpen, setKeepOpen] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Vui lòng nhập họ và tên học sinh');
      return;
    }

    if (existingNames.some((n) => n.trim().toLowerCase() === trimmedName.toLowerCase())) {
      setError('Học sinh này đã có trong danh sách');
      return;
    }

    onAddStudent(trimmedName, team, badge.trim(), Math.max(0, Number(points) || 0));
    setName('');
    setBadge('');
    setPoints(0);
    setError('');

    if (!keepOpen) {
      onClose();
    }
  };

  const nextDefaultIndex = existingNames.length + 1;
  const samplePlaceholder = `Ví dụ: Học sinh ${String(nextDefaultIndex).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-white">
          <div className="flex items-center gap-2.5 text-slate-800 font-bold">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Thêm học sinh mới</h3>
              <p className="text-[11px] text-slate-500 font-normal">
                Bổ sung học sinh vào danh sách lớp học
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Họ và tên học sinh <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setName(`Học sinh ${String(nextDefaultIndex).padStart(2, '0')}`)}
                className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold"
              >
                Gợi ý: Học sinh {String(nextDefaultIndex).padStart(2, '0')}
              </button>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder={samplePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm font-medium"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Phân tổ học tập</label>
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 text-sm font-medium bg-white"
              >
                <option value="Tổ 1">Tổ 1</option>
                <option value="Tổ 2">Tổ 2</option>
                <option value="Tổ 3">Tổ 3</option>
                <option value="Tổ 4">Tổ 4</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Điểm ban đầu</label>
              <input
                type="number"
                min="0"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 text-sm font-bold text-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Huy hiệu / Chức vụ (không bắt buộc)
            </label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Ví dụ: Lớp trưởng, Tổ trưởng, Ban cán sự..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 text-sm font-medium"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-600 select-none">
              <input
                type="checkbox"
                checked={keepOpen}
                onChange={(e) => setKeepOpen(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>Giữ cửa sổ mở để tiếp tục thêm học sinh khác</span>
            </label>
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
              Thêm học sinh
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
