import React, { useState } from 'react';
import { Award, Search, Sparkles, Plus, Minus } from 'lucide-react';
import { Student, ClassSettings } from '../../types';
import { StudentCard } from '../StudentCard';

interface PointsViewProps {
  students: Student[];
  settings: ClassSettings;
  onAddPoints: (id: string | number, pts: number, reason?: string) => void;
  onOpenEditStudent: (student: Student) => void;
  onOpenQuickPointsFor: (student: Student) => void;
  onDeleteStudent: (id: string | number) => void;
}

export const PointsView: React.FC<PointsViewProps> = ({
  students,
  settings,
  onAddPoints,
  onOpenEditStudent,
  onOpenQuickPointsFor,
  onDeleteStudent
}) => {
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('');

  const filtered = students
    .filter((s) => {
      const matchName = s.name.toLowerCase().includes(search.toLowerCase());
      const matchTeam = !teamFilter || s.team === teamFilter;
      return matchName && matchTeam;
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'vi'));

  return (
    <div className="bg-white rounded-2xl border border-[#e7edf4] shadow-xs overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-[#e7edf4]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Tích điểm thi đua trực tiếp</h2>
            <p className="text-xs text-slate-500">
              Bấm nhanh vào các nút cộng / trừ điểm trên thẻ học sinh để ghi nhận tức thì vào vườn ươm
            </p>
          </div>
        </div>

        {/* Quick Teacher Instruction Tip */}
        <div className="mt-3 p-3 bg-gradient-to-r from-blue-50/80 to-sky-50 border border-blue-100 rounded-xl flex items-center justify-between gap-3 text-xs text-blue-900 font-medium">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              Mỗi <strong>5 điểm</strong> tương ứng với <strong>1 đóa hoa</strong>. Đạt <strong>100 điểm</strong> để cây nở hoa rực rỡ!
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-slate-50/50 border-b border-[#e7edf4] flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm tên học sinh để chấm điểm..."
            className="w-full pl-9 pr-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {['', 'Tổ 1', 'Tổ 2', 'Tổ 3', 'Tổ 4'].map((t) => (
            <button
              key={t}
              onClick={() => setTeamFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                teamFilter === t
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t || 'Tất cả tổ'}
            </button>
          ))}
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="p-4 sm:p-5">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            Không tìm thấy học sinh phù hợp.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((s) => (
              <StudentCard
                key={s.id}
                student={s}
                bloomTarget={settings.bloomTarget}
                onAddPoints={onAddPoints}
                onOpenEdit={onOpenEditStudent}
                onOpenQuickModal={onOpenQuickPointsFor}
                onDeleteStudent={onDeleteStudent}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
