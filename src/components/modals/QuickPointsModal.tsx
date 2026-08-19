import React, { useState, useEffect } from 'react';
import { X, Sparkles, Plus, Minus } from 'lucide-react';
import { Student } from '../../types';

interface QuickPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  initialStudentId?: string | number;
  onApplyPoints: (studentId: string | number, points: number, reason: string) => void;
}

export const QuickPointsModal: React.FC<QuickPointsModalProps> = ({
  isOpen,
  onClose,
  students,
  initialStudentId,
  onApplyPoints
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string | number>('');
  const [reason, setReason] = useState('Phát biểu xây dựng bài');
  const [customPoints, setCustomPoints] = useState('');

  const quickReasons = [
    'Phát biểu hay',
    'Làm bài tập tốt',
    'Giúp đỡ bạn bè',
    'Tích cực trong nhóm',
    'Hoàn thành bài sớm',
    'Chữ viết sạch đẹp',
    'Nói chuyện riêng (-)',
    'Quên đồ dùng học tập (-)'
  ];

  useEffect(() => {
    if (initialStudentId) {
      setSelectedStudentId(initialStudentId);
    } else if (students.length > 0 && !selectedStudentId) {
      setSelectedStudentId(students[0].id);
    }
  }, [initialStudentId, students, selectedStudentId]);

  if (!isOpen) return null;

  const handleQuickAward = (pts: number) => {
    if (!selectedStudentId) return;
    onApplyPoints(selectedStudentId, pts, reason);
    onClose();
  };

  const handleCustomApply = () => {
    const pts = Number(customPoints);
    if (!Number.isFinite(pts) || pts === 0) return;
    if (!selectedStudentId) return;
    onApplyPoints(selectedStudentId, pts, reason);
    setCustomPoints('');
    onClose();
  };

  const selectedStudent = students.find((s) => String(s.id) === String(selectedStudentId));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>Tặng & Trừ điểm thi đua</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Student Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Chọn học sinh</label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 text-sm font-semibold bg-white"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.team} • {s.points} ⭐ • {s.level})
                </option>
              ))}
            </select>
            {selectedStudent && (
              <div className="mt-1.5 text-xs text-slate-500 flex items-center gap-2">
                <span>Hiện có: <strong className="text-blue-600 font-bold">{selectedStudent.points} ⭐</strong></span>
                <span>•</span>
                <span>{selectedStudent.flowers} đóa hoa 🌼</span>
              </div>
            )}
          </div>

          {/* Reason */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Lý do khen thưởng / nhắc nhở</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập lý do..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 text-sm"
            />
            {/* Quick Reason Chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {quickReasons.map((r, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setReason(r)}
                  className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors border ${
                    reason === r
                      ? 'bg-blue-50 text-blue-700 border-blue-200 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Points Grid */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Tặng điểm nhanh (Khen ngợi)</label>
            <div className="grid grid-cols-4 gap-2">
              {[2, 5, 10, 15].map((pts) => (
                <button
                  key={pts}
                  type="button"
                  onClick={() => handleQuickAward(pts)}
                  className="py-2.5 px-3 bg-sky-50 hover:bg-blue-100 text-blue-700 font-black text-sm rounded-xl border border-sky-100 flex items-center justify-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{pts}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Trừ điểm nhanh (Nhắc nhở)</label>
            <div className="grid grid-cols-4 gap-2">
              {[2, 5, 10, 15].map((pts) => (
                <button
                  key={pts}
                  type="button"
                  onClick={() => handleQuickAward(-pts)}
                  className="py-2.5 px-3 bg-rose-50/80 hover:bg-rose-100 text-rose-600 font-black text-sm rounded-xl border border-rose-100 flex items-center justify-center gap-1 transition-all"
                >
                  <Minus className="w-3.5 h-3.5" />
                  <span>{pts}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Points Input */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Số điểm tùy chỉnh khác</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={customPoints}
                onChange={(e) => setCustomPoints(e.target.value)}
                placeholder="Ví dụ: +20 hoặc -7"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 text-sm font-bold text-blue-600"
              />
              <button
                type="button"
                onClick={handleCustomApply}
                disabled={!customPoints || Number(customPoints) === 0}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-bold transition-colors shrink-0"
              >
                Áp dụng điểm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
