import React from 'react';
import { Sparkles, Trophy, Flower2, Sprout } from 'lucide-react';
import { Student, ClassSettings } from '../types';

interface BannerProps {
  students: Student[];
  settings: ClassSettings;
  onOpenLeaderboard: () => void;
}

export const Banner: React.FC<BannerProps> = ({ students, settings, onOpenLeaderboard }) => {
  const bloomedCount = students.filter((s) => s.points >= settings.bloomTarget).length;
  const buddingCount = students.filter((s) => s.points >= 80 && s.points < settings.bloomTarget).length;
  const totalFlowers = students.reduce((acc, s) => acc + s.flowers, 0);

  return (
    <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-sky-100 bg-gradient-to-r from-[#d9f1ff] via-[#e5f5ff] to-[#fff3df] p-5 sm:p-7 min-h-[160px] md:min-h-[190px] flex flex-col justify-between">
      {/* Background soft botanical illustration aura */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none flex items-center justify-end pr-6 select-none text-8xl md:text-9xl">
        🌳🌸🌼🌱
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur-xs border border-sky-200/80 rounded-full text-blue-700 text-xs font-bold mb-2.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{settings.className} • Vườn Ươm Tri Thức</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            Vườn Hoa Điểm Mười & Rèn Luyện
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 italic leading-relaxed">
            {settings.slogan}
          </p>
        </div>

        {/* Quick status pill chips */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 self-start md:self-auto">
          <div className="px-3.5 py-2 bg-white/90 backdrop-blur-xs border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 shadow-2xs">
            <Flower2 className="w-4 h-4 text-emerald-600" />
            <div className="text-xs">
              <span className="font-extrabold text-sm text-emerald-700">{totalFlowers}</span>
              <span className="text-slate-600 font-medium ml-1">đóa hoa</span>
            </div>
          </div>

          <div className="px-3.5 py-2 bg-white/90 backdrop-blur-xs border border-amber-200 rounded-xl flex items-center gap-2 text-amber-800 shadow-2xs">
            <Sprout className="w-4 h-4 text-amber-600" />
            <div className="text-xs">
              <span className="font-extrabold text-sm text-amber-700">{bloomedCount}</span>
              <span className="text-slate-600 font-medium ml-1">nở hoa</span>
            </div>
          </div>

          <button
            onClick={onOpenLeaderboard}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-1.5 font-bold text-xs shadow-xs transition-colors"
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>Bảng vàng</span>
          </button>
        </div>
      </div>

      {/* Mini growth progress legend */}
      <div className="relative z-10 mt-4 pt-3 border-t border-sky-200/50 flex flex-wrap items-center gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-1.5 font-medium">
          <span>🌱</span> <span>Hạt giống (&lt;80đ)</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium">
          <span>🌸</span> <span>Có nụ hoa (80 - 99đ)</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium">
          <span>🌳</span> <span>Nở hoa rực rỡ (&ge;{settings.bloomTarget}đ)</span>
        </div>
      </div>
    </div>
  );
};
