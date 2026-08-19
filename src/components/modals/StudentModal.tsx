import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { Student } from '../../types';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (name: string, team: string, badge?: string) => void;
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

    onAddStudent(trimmedName, team, badge.trim());
    setName('');
    setBadge('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <span>Thêm học sinh mới</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
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
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Họ và tên học sinh <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Ví dụ: Nguyễn Văn An"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm font-medium"
              autoFocus
            />
          </div>

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
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Huy hiệu / Chức vụ (không bắt buộc)
            </label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Ví dụ: Lớp trưởng, Tổ trưởng, Ban văn nghệ..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 text-sm"
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
              Thêm học sinh
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
