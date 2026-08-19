import React, { useState, useEffect } from 'react';
import { X, UserCheck } from 'lucide-react';
import { Student } from '../../types';

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  onSave: (updated: Partial<Student>) => void;
}

export const EditStudentModal: React.FC<EditStudentModalProps> = ({
  isOpen,
  onClose,
  student,
  onSave
}) => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('Tổ 1');
  const [points, setPoints] = useState(0);
  const [badge, setBadge] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setName(student.name);
      setTeam(student.team);
      setPoints(student.points);
      setBadge(student.badge || '');
      setError('');
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Vui lòng nhập họ tên học sinh');
      return;
    }

    onSave({
      name: trimmedName,
      team,
      points: Math.max(0, Number(points) || 0),
      badge: badge.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <span>Chỉnh sửa thông tin học sinh</span>
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 text-sm font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Tổ</label>
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
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Điểm tích lũy</label>
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
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Huy hiệu / Chức vụ</label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Ví dụ: Lớp trưởng, Tổ trưởng..."
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
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
