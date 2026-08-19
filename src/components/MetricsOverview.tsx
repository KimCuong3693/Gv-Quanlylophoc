import React from 'react';
import { Users, Award, Trophy, CheckSquare, Bell } from 'lucide-react';
import { Student, Task, Notice, ClassSettings } from '../types';

interface MetricsOverviewProps {
  students: Student[];
  tasks: Task[];
  notices: Notice[];
  settings: ClassSettings;
  onNavigate: (tab: 'students' | 'leaderboard' | 'tasks' | 'notices' | 'points') => void;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({
  students,
  tasks,
  notices,
  settings,
  onNavigate
}) => {
  const total = students.length;
  const avgPoints = total > 0 ? Math.round(students.reduce((a, b) => a + b.points, 0) / total) : 0;
  const excellentCount = students.filter((s) => s.points >= 80).length;
  const openTasks = tasks.filter((t) => !t.done).length;

  const metrics = [
    {
      id: 'students',
      label: 'Tổng số học sinh',
      value: `${total} học sinh`,
      icon: Users,
      color: 'from-blue-50 to-sky-50 text-blue-600 border-blue-100',
      action: () => onNavigate('students')
    },
    {
      id: 'points',
      label: 'Điểm trung bình lớp',
      value: `${avgPoints} / ${settings.bloomTarget} ${settings.pointUnit}`,
      icon: Award,
      color: 'from-emerald-50 to-teal-50 text-emerald-600 border-emerald-100',
      action: () => onNavigate('points')
    },
    {
      id: 'leaderboard',
      label: 'Học sinh xuất sắc (≥80đ)',
      value: `${excellentCount} em`,
      icon: Trophy,
      color: 'from-amber-50 to-yellow-50 text-amber-600 border-amber-100',
      action: () => onNavigate('leaderboard')
    },
    {
      id: 'tasks',
      label: 'Nhiệm vụ đang mở',
      value: `${openTasks} nhiệm vụ`,
      icon: CheckSquare,
      color: 'from-purple-50 to-indigo-50 text-purple-600 border-purple-100',
      action: () => onNavigate('tasks')
    },
    {
      id: 'notices',
      label: 'Thông báo lớp học',
      value: `${notices.length} thông báo`,
      icon: Bell,
      color: 'from-rose-50 to-pink-50 text-rose-600 border-rose-100',
      action: () => onNavigate('notices')
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 my-4">
      {metrics.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={item.action}
            className="text-left p-3.5 sm:p-4 rounded-2xl bg-white border border-[#e7edf4] hover:border-blue-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-slate-500 line-clamp-1">{item.label}</span>
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 border`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <strong className="text-lg sm:text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">
              {item.value}
            </strong>
          </button>
        );
      })}
    </div>
  );
};
