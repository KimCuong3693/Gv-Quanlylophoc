import React from 'react';
import {
  Home,
  Users,
  Award,
  Trophy,
  CheckSquare,
  BookOpen,
  Bell,
  BarChart3,
  Settings,
  Sparkles,
  HelpCircle,
  Pencil,
  LogOut
} from 'lucide-react';
import { ViewTab, ClassSettings } from '../types';

interface SidebarProps {
  currentView: ViewTab;
  onSelectView: (view: ViewTab) => void;
  settings: ClassSettings;
  isOpen: boolean;
  onCloseMobile: () => void;
  onOpenEditTeacher: () => void;
  onOpenSupport: () => void;
  unreadNoticesCount?: number;
  openTasksCount?: number;
  onLogout?: () => void;
}

interface NavItem {
  id: ViewTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  settings,
  isOpen,
  onCloseMobile,
  onOpenEditTeacher,
  onOpenSupport,
  unreadNoticesCount = 2,
  openTasksCount = 2,
  onLogout
}) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Trang chủ', icon: Home },
    { id: 'students', label: 'Quản lý học sinh', icon: Users },
    { id: 'points', label: 'Tích điểm & Khen thưởng', icon: Award },
    { id: 'leaderboard', label: 'Bảng vàng vinh danh', icon: Trophy },
    { id: 'tasks', label: 'Nhiệm vụ & Bài tập', icon: CheckSquare, badge: openTasksCount > 0 ? openTasksCount : undefined },
    { id: 'library', label: 'Thư viện học liệu', icon: BookOpen },
    { id: 'notices', label: 'Thông báo', icon: Bell, badge: unreadNoticesCount > 0 ? unreadNoticesCount : undefined },
    { id: 'reports', label: 'Báo cáo lớp', icon: BarChart3 },
    { id: 'settings', label: 'Cài đặt', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-30 md:hidden backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-[270px] bg-white border-r border-[#e7edf4] flex flex-col p-4 z-40 transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand & Teacher Header */}
        <div className="flex items-center gap-3 p-2 pb-4 mb-2 border-b border-slate-100">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-100 via-sky-100 to-amber-100 border-2 border-white shadow-sm flex items-center justify-center text-2xl shrink-0">
            👩‍🏫
          </div>
          <div className="min-w-0 flex-1">
            <strong className="block text-sm font-bold text-slate-800 truncate" title={settings.teacherName}>
              {settings.teacherName}
            </strong>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              Giáo viên chủ nhiệm
            </span>
          </div>
          <button
            onClick={onOpenEditTeacher}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors shrink-0"
            title="Đổi tên giáo viên"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-1 overflow-y-auto flex-1 py-1 pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => {
                  onSelectView(item.id);
                  onCloseMobile();
                }}
                className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-bold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Classroom garden encouragement widget */}
        <div className="mt-3 p-3.5 bg-gradient-to-br from-sky-50 via-blue-50/50 to-amber-50/60 border border-sky-100 rounded-2xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🌟</span>
            <strong className="text-xs font-bold text-slate-800">Vườn Ươm Tri Thức</strong>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
            {settings.slogan}
          </p>
          <div className="flex items-center gap-2 mt-2.5">
            <button
              onClick={onOpenSupport}
              className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Trợ giúp</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                title="Đăng xuất giáo viên"
                className="py-2 px-3 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors shadow-2xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="sr-only sm:not-sr-only">Thoát</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
