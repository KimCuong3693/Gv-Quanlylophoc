import React from 'react';
import { Bell, Calendar, Menu, Volume2, VolumeX, Sparkles, LogOut, User } from 'lucide-react';
import { ViewTab, ClassSettings } from '../types';
import { Open22Logo } from './Open22Logo';

interface HeaderProps {
  currentView: ViewTab;
  settings: ClassSettings;
  onUpdateSettings: (settings: ClassSettings) => void;
  onToggleSidebar: () => void;
  onSelectClass: (className: string) => void;
  onOpenNotices: () => void;
  onLogout?: () => void;
}

const VIEW_TITLES: Record<ViewTab, string> = {
  dashboard: 'Tổng quan lớp học',
  students: 'Quản lý học sinh',
  points: 'Tích điểm thi đua',
  leaderboard: 'Bảng vàng vinh danh',
  tasks: 'Nhiệm vụ & Bài tập',
  library: 'Thư viện học liệu',
  notices: 'Thông báo lớp học',
  reports: 'Báo cáo & Thống kê',
  settings: 'Cài đặt lớp học'
};

export const Header: React.FC<HeaderProps> = ({
  currentView,
  settings,
  onUpdateSettings,
  onToggleSidebar,
  onSelectClass,
  onOpenNotices,
  onLogout
}) => {
  const currentDate = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <header className="h-[72px] bg-white border-b border-[#e7edf4] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20 shadow-xs">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <button
          id="btn-toggle-sidebar"
          onClick={onToggleSidebar}
          aria-label="Mở danh mục"
          className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors md:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <select
              value={settings.className}
              onChange={(e) => onSelectClass(e.target.value)}
              className="bg-transparent font-bold text-blue-700 focus:outline-hidden cursor-pointer"
            >
              <option value="Lớp 1">Lớp 1</option>
              <option value="Lớp 2">Lớp 2</option>
              <option value="Lớp 3">Lớp 3</option>
              <option value="Lớp 4A2">Lớp 4A2</option>
              <option value="Lớp 5">Lớp 5</option>
            </select>
          </div>

          <span className="text-slate-300 hidden sm:inline">›</span>
          <span className="text-slate-700 font-semibold text-sm sm:text-base truncate">
            {VIEW_TITLES[currentView]}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Open22 Media brand marker */}
        <div className="hidden xl:flex items-center">
          <Open22Logo variant="badge" />
        </div>

        <button
          onClick={() => onUpdateSettings({ ...settings, enableSound: !settings.enableSound })}
          title={settings.enableSound ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
          className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
        >
          {settings.enableSound ? (
            <Volume2 className="w-4 h-4 text-blue-600" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </button>

        <button
          id="btn-header-notices"
          onClick={onOpenNotices}
          className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors relative"
          title="Thông báo lớp học"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
        </button>

        <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-xs font-medium">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span className="capitalize">{currentDate}</span>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            title="Đăng xuất khỏi tài khoản"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 text-slate-600 text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Đăng xuất</span>
          </button>
        )}
      </div>
    </header>
  );
};

