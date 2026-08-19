import React, { useState } from 'react';
import { X, UserCheck, Check, Clock, UserX, AlertCircle } from 'lucide-react';
import { Student } from '../../types';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onSaveAttendance: (summary: string) => void;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  onClose,
  students,
  onSaveAttendance
}) => {
  const [attendance, setAttendance] = useState<Record<string | number, 'present' | 'late' | 'excused' | 'unexcused'>>(() => {
    const init: Record<string | number, 'present' | 'late' | 'excused' | 'unexcused'> = {};
    students.forEach((s) => {
      init[s.id] = 'present';
    });
    return init;
  });

  const [teamFilter, setTeamFilter] = useState<string>('');

  if (!isOpen) return null;

  const setStatus = (id: string | number, status: 'present' | 'late' | 'excused' | 'unexcused') => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const markAll = (status: 'present' | 'late' | 'excused' | 'unexcused') => {
    const updated: Record<string | number, 'present' | 'late' | 'excused' | 'unexcused'> = {};
    students.forEach((s) => {
      updated[s.id] = status;
    });
    setAttendance(updated);
  };

  const presentCount = Object.values(attendance).filter((s) => s === 'present').length;
  const lateCount = Object.values(attendance).filter((s) => s === 'late').length;
  const excusedCount = Object.values(attendance).filter((s) => s === 'excused').length;
  const unexcusedCount = Object.values(attendance).filter((s) => s === 'unexcused').length;

  const handleSave = () => {
    const summary = `Điểm danh ${new Date().toLocaleDateString('vi-VN')}: Có mặt ${presentCount}/${students.length}, Đi trễ: ${lateCount}, Vắng phép: ${excusedCount}, Vắng không phép: ${unexcusedCount}`;
    onSaveAttendance(summary);
    onClose();
  };

  const filteredStudents = teamFilter
    ? students.filter((s) => s.team === teamFilter)
    : students;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <span>Điểm danh học sinh hôm nay</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick summary status chips */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold text-emerald-700">✓ Có mặt: {presentCount}</span>
            <span className="font-bold text-amber-600">⏱ Trễ: {lateCount}</span>
            <span className="font-bold text-sky-600">📝 Có phép: {excusedCount}</span>
            <span className="font-bold text-rose-600">✕ Không phép: {unexcusedCount}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => markAll('present')}
              className="text-xs px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold"
            >
              Tất cả có mặt
            </button>
            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="text-xs px-2.5 py-1 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700"
            >
              <option value="">Tất cả tổ</option>
              <option value="Tổ 1">Tổ 1</option>
              <option value="Tổ 2">Tổ 2</option>
              <option value="Tổ 3">Tổ 3</option>
              <option value="Tổ 4">Tổ 4</option>
            </select>
          </div>
        </div>

        {/* Student roll call list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-2 flex-1">
          {filteredStudents.map((s, idx) => {
            const currentStatus = attendance[s.id] || 'present';
            return (
              <div
                key={s.id}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-bold text-slate-400 w-5">{idx + 1}</span>
                  <div className="min-w-0">
                    <strong className="text-sm font-bold text-slate-800 truncate block">{s.name}</strong>
                    <span className="text-xs text-slate-400">{s.team}</span>
                  </div>
                </div>

                {/* 4 Status Toggle Buttons */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setStatus(s.id, 'present')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      currentStatus === 'present'
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    title="Có mặt"
                  >
                    <Check className="w-3 h-3" />
                    <span className="hidden sm:inline">Có mặt</span>
                  </button>

                  <button
                    onClick={() => setStatus(s.id, 'late')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      currentStatus === 'late'
                        ? 'bg-amber-500 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    title="Đi trễ"
                  >
                    <Clock className="w-3 h-3" />
                    <span className="hidden sm:inline">Trễ</span>
                  </button>

                  <button
                    onClick={() => setStatus(s.id, 'excused')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      currentStatus === 'excused'
                        ? 'bg-sky-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    title="Vắng có phép"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span className="hidden sm:inline">Có phép</span>
                  </button>

                  <button
                    onClick={() => setStatus(s.id, 'unexcused')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      currentStatus === 'unexcused'
                        ? 'bg-rose-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    title="Vắng không phép"
                  >
                    <UserX className="w-3 h-3" />
                    <span className="hidden sm:inline">K.phép</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            Sĩ số: {students.length} em • Có mặt: {presentCount}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs transition-colors"
            >
              Lưu sổ điểm danh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
