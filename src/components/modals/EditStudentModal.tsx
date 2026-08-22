import React, { useState, useEffect } from 'react';
import { X, UserCheck, Plus, Minus, RotateCcw } from 'lucide-react';
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

  const adjustPoints = (delta: number) => {
    setPoints((prev) => Math.max(0, prev + delta));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-white">
          <div className="flex items-center gap-2.5 text-slate-800 font-bold">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Chỉnh sửa thông tin học sinh</h3>
              <p className="text-[11px] text-slate-500 font-normal">
                Cập nhật họ tên, điểm số và tổ học tập
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
              placeholder="Ví dụ: Học sinh 01 hoặc Nguyễn Văn A"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm font-bold text-slate-800"
              autoFocus
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

          {/* Quick point adjustment buttons */}
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="font-semibold text-slate-500">Chỉnh điểm nhanh:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => adjustPoints(-5)}
                className="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold border border-rose-200"
              >
                -5
              </button>
              <button
                type="button"
                onClick={() => adjustPoints(5)}
                className="px-2 py-1 rounded-lg bg-sky-50 hover:bg-blue-100 text-blue-700 font-bold border border-sky-200"
              >
                +5
              </button>
              <button
                type="button"
                onClick={() => adjustPoints(10)}
                className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                +10
              </button>
              <button
                type="button"
                onClick={() => setPoints(0)}
                className="p-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700"
                title="Về 0 điểm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Huy hiệu / Chức vụ</label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Ví dụ: Lớp trưởng, Tổ trưởng, Ban văn nghệ..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 text-sm font-medium"
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
