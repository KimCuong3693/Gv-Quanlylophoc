import React, { useState } from 'react';
import { Search, UserPlus, Gift, MinusCircle, ArrowUpDown } from 'lucide-react';
import { Student, ClassSettings } from '../../types';
import { StudentCard } from '../StudentCard';

interface StudentsViewProps {
  students: Student[];
  settings: ClassSettings;
  onAddStudentClick: () => void;
  onBulkAward: () => void;
  onBulkDeduct: () => void;
  onAddPoints: (id: string | number, pts: number, reason?: string) => void;
  onOpenEditStudent: (student: Student) => void;
  onOpenQuickPointsFor: (student: Student) => void;
  onDeleteStudent: (id: string | number) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  settings,
  onAddStudentClick,
  onBulkAward,
  onBulkDeduct,
  onAddPoints,
  onOpenEditStudent,
  onOpenQuickPointsFor,
  onDeleteStudent
}) => {
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'points-desc' | 'points-asc' | 'team'>('name');

  const filtered = students.filter((s) => {
    const matchQuery = s.name.toLowerCase().includes(search.toLowerCase()) || (s.badge && s.badge.toLowerCase().includes(search.toLowerCase()));
    const matchTeam = !teamFilter || s.team === teamFilter;
    return matchQuery && matchTeam;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name, 'vi');
    if (sortBy === 'points-desc') return b.points - a.points;
    if (sortBy === 'points-asc') return a.points - b.points;
    if (sortBy === 'team') return a.team.localeCompare(b.team, 'vi');
    return 0;
  });

  return (
    <div className="bg-white rounded-2xl border border-[#e7edf4] shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-[#e7edf4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Quản lý học sinh</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tổng cộng: <strong className="text-blue-600 font-bold">{students.length}</strong> học sinh trong danh sách lớp
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAddStudentClick}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Thêm học sinh</span>
          </button>
        </div>
      </div>

      {/* Toolbar: Search, Filters, Bulk Operations */}
      <div className="p-4 bg-slate-50/50 border-b border-[#e7edf4] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên học sinh, chức vụ..."
              className="w-full pl-9 pr-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>

          {/* Team Filter */}
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-hidden focus:border-blue-500"
          >
            <option value="">Tất cả các tổ</option>
            <option value="Tổ 1">Tổ 1</option>
            <option value="Tổ 2">Tổ 2</option>
            <option value="Tổ 3">Tổ 3</option>
            <option value="Tổ 4">Tổ 4</option>
          </select>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="name">Tên (A → Z)</option>
              <option value="points-desc">Điểm cao nhất</option>
              <option value="points-asc">Điểm thấp nhất</option>
              <option value="team">Theo Tổ</option>
            </select>
          </div>
        </div>

        {/* Bulk Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBulkAward}
            className="px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-blue-700 border border-sky-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Gift className="w-3.5 h-3.5 text-blue-600" />
            <span>Tặng điểm cả lớp</span>
          </button>

          <button
            onClick={onBulkDeduct}
            className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <MinusCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Trừ điểm cả lớp</span>
          </button>
        </div>
      </div>

      {/* Students Grid */}
      <div className="p-4 sm:p-5">
        {sorted.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            Không tìm thấy học sinh nào phù hợp với bộ lọc.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {sorted.map((s, idx) => (
              <StudentCard
                key={s.id}
                student={s}
                rank={sortBy === 'points-desc' ? idx + 1 : undefined}
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
