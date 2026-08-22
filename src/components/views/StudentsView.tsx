import React, { useState } from 'react';
import { Search, UserPlus, Gift, MinusCircle, ArrowUpDown, FileSpreadsheet, RefreshCw, Users } from 'lucide-react';
import { Student, ClassSettings } from '../../types';
import { StudentCard } from '../StudentCard';

interface StudentsViewProps {
  students: Student[];
  settings: ClassSettings;
  onAddStudentClick: () => void;
  onOpenBulkModal: () => void;
  onResetStudentsToDefault: () => void;
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
  onOpenBulkModal,
  onResetStudentsToDefault,
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
    const matchQuery =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.badge && s.badge.toLowerCase().includes(search.toLowerCase()));
    const matchTeam = !teamFilter || s.team === teamFilter;
    return matchQuery && matchTeam;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name, 'vi', { numeric: true });
    if (sortBy === 'points-desc') return b.points - a.points;
    if (sortBy === 'points-asc') return a.points - b.points;
    if (sortBy === 'team') return a.team.localeCompare(b.team, 'vi');
    return 0;
  });

  // Calculate team counts
  const teamCounts = {
    'Tổ 1': students.filter((s) => s.team === 'Tổ 1').length,
    'Tổ 2': students.filter((s) => s.team === 'Tổ 2').length,
    'Tổ 3': students.filter((s) => s.team === 'Tổ 3').length,
    'Tổ 4': students.filter((s) => s.team === 'Tổ 4').length
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e7edf4] shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-[#e7edf4] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-800">Quản lý danh sách học sinh</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              {students.length} học sinh
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Giáo viên có thể nhấp trực tiếp vào tên hoặc nút <strong>Sửa</strong> để đổi tên và thông tin từng học sinh
          </p>
        </div>

        {/* Action button cluster */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenBulkModal}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors border border-slate-200"
            title="Dán danh sách học sinh từ Excel hoặc danh sách có sẵn"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Nhập danh sách nhanh</span>
          </button>

          <button
            onClick={onAddStudentClick}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Thêm học sinh</span>
          </button>

          <button
            onClick={() => {
              if (
                window.confirm(
                  'Bạn có muốn đặt lại danh sách lớp về 1 học sinh tượng trưng ban đầu (Học sinh 01) không?'
                )
              ) {
                onResetStudentsToDefault();
              }
            }}
            className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-500 hover:text-amber-700 border border-slate-200 hover:border-amber-200 transition-colors"
            title="Đặt lại về 1 học sinh tượng trưng"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Team Tabs / Stats */}
      <div className="px-4 sm:px-5 py-2.5 bg-slate-50/70 border-b border-[#e7edf4] flex flex-wrap items-center gap-2">
        <button
          onClick={() => setTeamFilter('')}
          className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            teamFilter === ''
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Tất cả ({students.length})</span>
        </button>

        {(['Tổ 1', 'Tổ 2', 'Tổ 3', 'Tổ 4'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTeamFilter(teamFilter === t ? '' : t)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              teamFilter === t
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{t}</span>
            <span
              className={`px-1.5 py-0.2 rounded-md text-[10px] font-extrabold ${
                teamFilter === t ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {teamCounts[t] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Toolbar: Search, Filters, Bulk Operations */}
      <div className="p-4 bg-white border-b border-[#e7edf4] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          {/* Search */}
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên học sinh, chức vụ..."
              className="w-full pl-9 pr-3.5 py-2 bg-slate-50/50 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-500 focus:bg-white font-medium"
            />
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
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
