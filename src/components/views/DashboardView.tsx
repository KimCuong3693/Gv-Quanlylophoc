import React from 'react';
import { ArrowRight, Trophy } from 'lucide-react';
import { Student, Task, Notice, ClassSettings } from '../../types';
import { Banner } from '../Banner';
import { MetricsOverview } from '../MetricsOverview';
import { QuickTeacherTools } from '../QuickTeacherTools';
import { StudentCard } from '../StudentCard';
import { Open22Logo } from '../Open22Logo';

interface DashboardViewProps {
  students: Student[];
  tasks: Task[];
  notices: Notice[];
  settings: ClassSettings;
  onNavigate: (tab: any) => void;
  onAddPoints: (id: string | number, pts: number, reason?: string) => void;
  onOpenEditStudent: (student: Student) => void;
  onOpenQuickPointsFor: (student: Student) => void;
  onDeleteStudent: (id: string | number) => void;
  onOpenQuickPoints: () => void;
  onOpenAttendance: () => void;
  onOpenCreateTask: () => void;
  onOpenLeaderboard: () => void;
  onOpenRandomPicker: () => void;
  onOpenCountdown: () => void;
  onOpenNotes: () => void;
  onExportCSV: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  students,
  tasks,
  notices,
  settings,
  onNavigate,
  onAddPoints,
  onOpenEditStudent,
  onOpenQuickPointsFor,
  onDeleteStudent,
  onOpenQuickPoints,
  onOpenAttendance,
  onOpenCreateTask,
  onOpenLeaderboard,
  onOpenRandomPicker,
  onOpenCountdown,
  onOpenNotes,
  onExportCSV
}) => {
  // Top 8 highest point students
  const topStudents = [...students].sort((a, b) => b.points - a.points).slice(0, 8);

  return (
    <div className="space-y-5">
      {/* Banner */}
      <Banner
        students={students}
        settings={settings}
        onOpenLeaderboard={onOpenLeaderboard}
      />

      {/* 5 Class Metrics */}
      <MetricsOverview
        students={students}
        tasks={tasks}
        notices={notices}
        settings={settings}
        onNavigate={onNavigate}
      />

      {/* Main Grid: Quick tools & Top students roster */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Quick Teacher Actions */}
        <div className="lg:col-span-4 space-y-4">
          <QuickTeacherTools
            onOpenQuickPoints={onOpenQuickPoints}
            onOpenAttendance={onOpenAttendance}
            onOpenCreateTask={onOpenCreateTask}
            onOpenLeaderboard={onOpenLeaderboard}
            onOpenRandomPicker={onOpenRandomPicker}
            onOpenCountdown={onOpenCountdown}
            onOpenNotes={onOpenNotes}
            onExportCSV={onExportCSV}
          />
        </div>

        {/* Right Column: Top Students Roster */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border border-[#e7edf4] shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-[#e7edf4] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                    Bảng điểm thi đua nổi bật
                  </h3>
                  <span className="text-xs text-slate-400">Top 8 học sinh dẫn đầu lớp</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('leaderboard')}
                className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <span>Xem tất cả</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 sm:p-5">
              {topStudents.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm">
                  Chưa có học sinh trong danh sách.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
                  {topStudents.map((s, idx) => (
                    <StudentCard
                      key={s.id}
                      student={s}
                      rank={idx + 1}
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
        </div>
      </div>

      {/* OPEN 22 MEDIA Footer Recognition Bar */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-[#e7edf4] text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <Open22Logo variant="icon" size="sm" />
          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <span>Đồng hành cùng</span>
              <span className="text-blue-700">Vườn Ươm Tri Thức</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-600">OPEN 22 MEDIA</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Nền tảng thi đua & quản lý lớp học tiểu học thông minh 4.0
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Open22Logo variant="badge" />
        </div>
      </div>
    </div>
  );
};
