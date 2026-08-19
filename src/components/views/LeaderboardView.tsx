import React from 'react';
import { Trophy, Medal, Sparkles, Users, Award, Crown } from 'lucide-react';
import { Student, ClassSettings } from '../../types';

interface LeaderboardViewProps {
  students: Student[];
  settings: ClassSettings;
  onOpenQuickPointsFor: (student: Student) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  students,
  settings,
  onOpenQuickPointsFor
}) => {
  const ranked = [...students].sort((a, b) => b.points - a.points);
  const top1 = ranked[0];
  const top2 = ranked[1];
  const top3 = ranked[2];

  // Team summary
  const teams = ['Tổ 1', 'Tổ 2', 'Tổ 3', 'Tổ 4'].map((tName) => {
    const members = students.filter((s) => s.team === tName);
    const totalPoints = members.reduce((sum, s) => sum + s.points, 0);
    const avgPoints = members.length > 0 ? Math.round(totalPoints / members.length) : 0;
    const totalFlowers = members.reduce((sum, s) => sum + s.flowers, 0);
    return { name: tName, membersCount: members.length, totalPoints, avgPoints, totalFlowers };
  }).sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <div className="space-y-6">
      {/* Podium for Top 3 */}
      {students.length >= 3 && (
        <div className="bg-gradient-to-b from-sky-100/60 via-blue-50/40 to-white rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-xs">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-200 rounded-full text-xs font-black shadow-2xs">
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              <span>VINH DANH HỌC SINH TIÊU BIỂU</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-2">
              Bảng Vàng Vinh Danh Lớp {settings.className}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Những bông hoa rực rỡ nhất trong vườn ươm tri thức tuần này
            </p>
          </div>

          {/* 3 Columns Podium Layout */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end max-w-2xl mx-auto pt-4">
            {/* Rank 2 (Silver) */}
            {top2 && (
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 border-4 border-slate-300 shadow-md flex items-center justify-center text-3xl">
                    🌸
                  </div>
                  <span className="absolute -bottom-2 -right-1 text-2xl">🥈</span>
                </div>
                <strong className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 block" title={top2.name}>
                  {top2.name}
                </strong>
                <span className="text-[11px] text-slate-500">{top2.team}</span>
                <span className="text-sm sm:text-base font-black text-slate-700 mt-1">
                  {top2.points} ⭐
                </span>
                <div className="w-full h-24 sm:h-28 bg-gradient-to-t from-slate-200 to-slate-100 rounded-t-2xl mt-2.5 flex items-center justify-center font-black text-slate-600 text-lg border-t-2 border-slate-300">
                  2
                </div>
              </div>
            )}

            {/* Rank 1 (Gold - Center highest) */}
            {top1 && (
              <div className="flex flex-col items-center text-center -mt-6">
                <div className="relative mb-2">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-100 border-4 border-amber-400 shadow-xl flex items-center justify-center text-4xl ring-4 ring-amber-200 animate-pulse">
                    🌳
                  </div>
                  <span className="absolute -top-3 -right-2 text-3xl">👑</span>
                  <span className="absolute -bottom-2 -right-1 text-2xl">🥇</span>
                </div>
                <strong className="text-sm sm:text-base font-black text-slate-900 line-clamp-1 block" title={top1.name}>
                  {top1.name}
                </strong>
                <span className="text-xs font-bold text-amber-700">{top1.team}</span>
                <span className="text-base sm:text-lg font-black text-blue-600 mt-1">
                  {top1.points} ⭐
                </span>
                <div className="w-full h-32 sm:h-36 bg-gradient-to-t from-amber-300 to-amber-200 rounded-t-2xl mt-2.5 flex flex-col items-center justify-center font-black text-amber-950 text-2xl border-t-2 border-amber-400 shadow-md">
                  <span>1</span>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-900/80">Quán Quân</span>
                </div>
              </div>
            )}

            {/* Rank 3 (Bronze) */}
            {top3 && (
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-50 border-4 border-amber-600 shadow-md flex items-center justify-center text-3xl">
                    🌸
                  </div>
                  <span className="absolute -bottom-2 -right-1 text-2xl">🥉</span>
                </div>
                <strong className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 block" title={top3.name}>
                  {top3.name}
                </strong>
                <span className="text-[11px] text-slate-500">{top3.team}</span>
                <span className="text-sm sm:text-base font-black text-amber-800 mt-1">
                  {top3.points} ⭐
                </span>
                <div className="w-full h-20 sm:h-24 bg-gradient-to-t from-amber-200/80 to-amber-100 rounded-t-2xl mt-2.5 flex items-center justify-center font-black text-amber-900 text-lg border-t-2 border-amber-500">
                  3
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Grid: Top 10 Table & Team Competition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Top 10 Leaderboard Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e7edf4] shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#e7edf4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Trophy className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                Bảng xếp hạng Top 10 xuất sắc
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
              Top 10
            </span>
          </div>

          <div className="p-4 space-y-2">
            {ranked.slice(0, 10).map((s, idx) => {
              const percent = Math.min(100, Math.round((s.points / settings.bloomTarget) * 100));
              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 shadow-2xs ${
                        idx === 0
                          ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-200'
                          : idx === 1
                          ? 'bg-slate-300 text-slate-800'
                          : idx === 2
                          ? 'bg-amber-600 text-white'
                          : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      {idx < 3 ? (idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉') : idx + 1}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-slate-800 truncate">{s.name}</strong>
                        {s.badge && (
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 font-bold hidden sm:inline truncate">
                            {s.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span>{s.team}</span>
                        <span>•</span>
                        <span className="font-semibold text-emerald-600">{s.level}</span>
                        <span>•</span>
                        <span>{s.flowers} 🌼</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-base sm:text-lg font-black text-blue-600">
                      {s.points} <span className="text-amber-500 text-xs">⭐</span>
                    </div>
                    <button
                      onClick={() => onOpenQuickPointsFor(s)}
                      className="text-[11px] font-bold text-blue-600 hover:underline"
                    >
                      + Điểm
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Competition Rankings */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#e7edf4] shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#e7edf4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                Thi đua giữa các Tổ
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-400">4 Tổ</span>
          </div>

          <div className="p-4 space-y-3">
            {teams.map((t, idx) => (
              <div
                key={t.name}
                className="p-4 rounded-xl border border-slate-100 bg-gradient-to-r from-white to-slate-50 shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {idx === 0 ? '🏆' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '🎖️'}
                    </span>
                    <strong className="text-sm font-extrabold text-slate-800">{t.name}</strong>
                    <span className="text-xs text-slate-500 font-medium">({t.membersCount} em)</span>
                  </div>

                  <div className="text-right">
                    <strong className="text-base font-black text-blue-600">{t.totalPoints} ⭐</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
                  <span>Trung bình: <strong className="text-slate-700">{t.avgPoints} điểm/em</strong></span>
                  <span>Tổng hoa: <strong className="text-amber-700">{t.totalFlowers} 🌼</strong></span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-600"
                    style={{ width: `${Math.min(100, (t.totalPoints / (settings.bloomTarget * t.membersCount || 1)) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
