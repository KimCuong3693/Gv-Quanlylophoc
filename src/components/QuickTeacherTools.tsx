import React from 'react';
import {
  Award,
  UserCheck,
  CheckSquare,
  Trophy,
  Dices,
  Timer,
  FileText,
  FileSpreadsheet,
  ChevronRight
} from 'lucide-react';

interface QuickTeacherToolsProps {
  onOpenQuickPoints: () => void;
  onOpenAttendance: () => void;
  onOpenCreateTask: () => void;
  onOpenLeaderboard: () => void;
  onOpenRandomPicker: () => void;
  onOpenCountdown: () => void;
  onOpenNotes: () => void;
  onExportCSV: () => void;
}

export const QuickTeacherTools: React.FC<QuickTeacherToolsProps> = ({
  onOpenQuickPoints,
  onOpenAttendance,
  onOpenCreateTask,
  onOpenLeaderboard,
  onOpenRandomPicker,
  onOpenCountdown,
  onOpenNotes,
  onExportCSV
}) => {
  const tools = [
    {
      label: 'Tích điểm thi đua',
      badge: '+2…+15',
      icon: Award,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      action: onOpenQuickPoints
    },
    {
      label: 'Điểm danh lớp',
      badge: 'Hôm nay',
      icon: UserCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      action: onOpenAttendance
    },
    {
      label: 'Giao nhiệm vụ',
      badge: 'Tạo mới',
      icon: CheckSquare,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      action: onOpenCreateTask
    },
    {
      label: 'Bảng vàng vinh danh',
      badge: 'Top 10',
      icon: Trophy,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      action: onOpenLeaderboard
    },
    {
      label: 'Gọi tên ngẫu nhiên',
      badge: 'Vòng quay',
      icon: Dices,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
      action: onOpenRandomPicker
    },
    {
      label: 'Đồng hồ đếm ngược',
      badge: 'Bấm giờ',
      icon: Timer,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      action: onOpenCountdown
    },
    {
      label: 'Sổ tay & Ghi chú',
      badge: 'Lời dặn',
      icon: FileText,
      color: 'text-teal-600 bg-teal-50 border-teal-100',
      action: onOpenNotes
    },
    {
      label: 'Xuất báo cáo',
      badge: 'CSV / Excel',
      icon: FileSpreadsheet,
      color: 'text-sky-600 bg-sky-50 border-sky-100',
      action: onExportCSV
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#e7edf4] shadow-xs overflow-hidden">
      <div className="p-4 border-b border-[#e7edf4] flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
          <span className="text-blue-600">⚡</span>
          <span>Công cụ nhanh cho giáo viên</span>
        </h3>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">8 tiện ích</span>
      </div>

      <div className="p-3 space-y-1.5">
        {tools.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <button
              key={idx}
              onClick={tool.action}
              className="w-full flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50/70 hover:bg-blue-50/80 text-slate-700 hover:text-blue-700 border border-slate-100/80 hover:border-blue-200 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${tool.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold truncate">{tool.label}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 group-hover:border-blue-200 group-hover:text-blue-600 shadow-2xs">
                  {tool.badge}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
