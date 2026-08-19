import React from 'react';
import { Pencil, Sparkles, Trash2, Award } from 'lucide-react';
import { Student } from '../types';

interface StudentCardProps {
  student: Student;
  rank?: number;
  bloomTarget?: number;
  onAddPoints: (id: string | number, pts: number, reason?: string) => void;
  onOpenEdit: (student: Student) => void;
  onOpenQuickModal: (student: Student) => void;
  onDeleteStudent: (id: string | number) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  rank,
  bloomTarget = 100,
  onAddPoints,
  onOpenEdit,
  onOpenQuickModal,
  onDeleteStudent
}) => {
  const getGrowthIcon = (pts: number) => {
    if (pts >= bloomTarget) return '🌳';
    if (pts >= 80) return '🌸';
    return '🌱';
  };

  const getGrowthStageColor = (pts: number) => {
    if (pts >= bloomTarget) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (pts >= 80) return 'bg-pink-50 text-pink-700 border-pink-200';
    return 'bg-sky-50 text-sky-700 border-sky-200';
  };

  const progressPercent = Math.min(100, Math.round((student.points / bloomTarget) * 100));

  return (
    <div className="relative rounded-2xl bg-white border border-[#e4ebf2] hover:border-blue-300 hover:shadow-md transition-all p-3.5 flex flex-col justify-between group">
      {/* Rank Indicator if provided */}
      {rank !== undefined && (
        <div
          className={`absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shadow-2xs ${
            rank === 1
              ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-200'
              : rank === 2
              ? 'bg-slate-300 text-slate-800 ring-2 ring-slate-200'
              : rank === 3
              ? 'bg-amber-600 text-white ring-2 ring-amber-300'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {rank <= 3 ? (rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉') : rank}
        </div>
      )}

      {/* Top Details */}
      <div className={rank !== undefined ? 'pl-9' : ''}>
        <div className="flex items-start justify-between gap-1">
          <strong className="block text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1" title={student.name}>
            {student.name}
          </strong>
          <div className="text-right shrink-0">
            <span className="text-base font-black text-blue-600">{student.points}</span>
            <span className="text-xs text-amber-500 font-bold ml-0.5">⭐</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mt-1">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
            {student.team}
          </span>
          {student.badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 truncate max-w-[120px]" title={student.badge}>
              {student.badge}
            </span>
          )}
        </div>
      </div>

      {/* Growth Visualization Stage */}
      <div className="h-[96px] rounded-xl bg-gradient-to-b from-sky-50/70 to-emerald-50/50 border border-slate-100 my-2.5 flex flex-col items-center justify-center relative overflow-hidden">
        <span className="text-4xl transform group-hover:scale-110 transition-transform duration-200">
          {getGrowthIcon(student.points)}
        </span>
        <div className="absolute top-2 right-2.5 px-2 py-0.5 bg-white/90 backdrop-blur-xs border border-amber-200 rounded-full text-[10px] font-extrabold text-amber-700 shadow-2xs flex items-center gap-1">
          <span>🌼</span>
          <span>{student.flowers} hoa</span>
        </div>
      </div>

      {/* Progress metrics */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
          <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold border ${getGrowthStageColor(student.points)}`}>
            {student.level}
          </span>
          <span className="font-semibold">{student.points} / {bloomTarget} điểm</span>
        </div>

        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Quick Points Award (+2, +5, +10, +15) */}
      <div className="grid grid-cols-4 gap-1 mt-2.5">
        {[2, 5, 10, 15].map((pts) => (
          <button
            key={pts}
            onClick={() => onAddPoints(student.id, pts, `Khen thưởng +${pts} điểm`)}
            className="py-1 px-0.5 rounded-lg bg-sky-50 hover:bg-blue-100 text-blue-700 font-extrabold text-xs transition-colors border border-sky-100 flex items-center justify-center"
            title={`Tặng +${pts} điểm`}
          >
            +{pts}
          </button>
        ))}
      </div>

      {/* Quick Points Deduct (-2, -5, -10, -15) */}
      <div className="grid grid-cols-4 gap-1 mt-1">
        {[2, 5, 10, 15].map((pts) => (
          <button
            key={pts}
            onClick={() => onAddPoints(student.id, -pts, `Nhắc nhở -${pts} điểm`)}
            className="py-1 px-0.5 rounded-lg bg-rose-50/70 hover:bg-rose-100 text-rose-600 font-bold text-xs transition-colors border border-rose-100/80 flex items-center justify-center"
            title={`Trừ -${pts} điểm`}
          >
            −{pts}
          </button>
        ))}
      </div>

      {/* Student Card Action Buttons */}
      <div className="flex items-center gap-1 mt-2.5 pt-2 border-t border-slate-100">
        <button
          onClick={() => onOpenEdit(student)}
          className="flex-1 py-1 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
        >
          <Pencil className="w-3 h-3 text-slate-400" />
          <span>Sửa</span>
        </button>

        <button
          onClick={() => onOpenQuickModal(student)}
          className="flex-1 py-1 px-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
        >
          <Sparkles className="w-3 h-3 text-blue-500" />
          <span>Điểm</span>
        </button>

        <button
          onClick={() => onDeleteStudent(student.id)}
          className="py-1 px-2 rounded-lg bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 text-xs font-semibold flex items-center justify-center transition-colors"
          title="Xóa học sinh"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
