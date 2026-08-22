import React, { useState } from 'react';
import { Sparkles, Trophy, Flower2, Sprout, Image as ImageIcon } from 'lucide-react';
import { Student, ClassSettings } from '../types';
import { Open22Logo } from './Open22Logo';
import localBannerImg from '../assets/images/classroom_garden_banner_1787155400981.jpg';

interface BannerProps {
  students: Student[];
  settings: ClassSettings;
  onOpenLeaderboard: () => void;
}

// Robust fallback image URLs in case of CDN / browser restrictions
const FALLBACK_BANNERS = [
  localBannerImg,
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&auto=format&fit=crop&q=80'
];

export const Banner: React.FC<BannerProps> = ({ students, settings, onOpenLeaderboard }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [hasImageError, setHasImageError] = useState(false);

  const bloomedCount = students.filter((s) => s.points >= settings.bloomTarget).length;
  const totalFlowers = students.reduce((acc, s) => acc + s.flowers, 0);

  const handleImageError = () => {
    if (imgIndex < FALLBACK_BANNERS.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else {
      setHasImageError(true);
    }
  };

  return (
    <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-md border border-sky-200/80 min-h-[230px] sm:min-h-[260px] md:min-h-[290px] flex flex-col justify-between group bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
      {/* High-quality illustration with teacher & students */}
      {!hasImageError ? (
        <img
          src={FALLBACK_BANNERS[imgIndex]}
          alt="Vườn Ươm Tri Thức — Giáo viên và học sinh"
          referrerPolicy="no-referrer"
          onError={handleImageError}
          className="absolute inset-0 w-full h-full object-cover object-right md:object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-blue-600 to-teal-500 opacity-90" />
      )}

      {/* Gradient readability overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/30 sm:to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-white/40 pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-10 p-5 sm:p-7 flex flex-col justify-between h-full flex-1">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          {/* Left Text Card */}
          <div className="max-w-xl bg-white/80 sm:bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/80 shadow-xs">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-full text-xs font-black shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{settings.className} • VƯỜN ƯƠM TRI THỨC</span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-snug">
              Vườn Hoa Điểm Mười & Rèn Luyện
            </h1>

            <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1.5 italic leading-relaxed">
              {settings.slogan}
            </p>
          </div>

          {/* Right Area: Status chips & OPEN 22 MEDIA Brand Watermark */}
          <div className="flex flex-col md:items-end gap-2.5 self-start md:self-auto">
            {/* OPEN 22 MEDIA Identity Watermark */}
            <Open22Logo variant="watermark" className="hidden sm:inline-flex" />

            {/* Quick status pill chips */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="px-3.5 py-2 bg-white/90 backdrop-blur-md border border-emerald-200/90 rounded-2xl flex items-center gap-2 text-emerald-800 shadow-sm hover:bg-white transition-colors">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Flower2 className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-black text-base text-emerald-700 block leading-tight">{totalFlowers}</span>
                  <span className="text-slate-600 font-bold text-[11px]">đóa hoa nở</span>
                </div>
              </div>

              <div className="px-3.5 py-2 bg-white/90 backdrop-blur-md border border-amber-200/90 rounded-2xl flex items-center gap-2 text-amber-800 shadow-sm hover:bg-white transition-colors">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Sprout className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-black text-base text-amber-700 block leading-tight">{bloomedCount}</span>
                  <span className="text-slate-600 font-bold text-[11px]">cây nở hoa</span>
                </div>
              </div>

              <button
                onClick={onOpenLeaderboard}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl flex items-center gap-2 font-extrabold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Bảng vàng</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mini growth progress legend & Mobile brand badge on bottom */}
        <div className="mt-5 pt-3 border-t border-white/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-800 font-bold">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="px-3 py-1 bg-white/85 backdrop-blur-xs rounded-xl border border-white/80 shadow-2xs flex items-center gap-1.5">
              <span>🌱</span> <span>Hạt giống (&lt;80đ)</span>
            </div>
            <div className="px-3 py-1 bg-white/85 backdrop-blur-xs rounded-xl border border-white/80 shadow-2xs flex items-center gap-1.5">
              <span>🌸</span> <span>Có nụ hoa (80 - 99đ)</span>
            </div>
            <div className="px-3 py-1 bg-white/85 backdrop-blur-xs rounded-xl border border-white/80 shadow-2xs flex items-center gap-1.5">
              <span>🌳</span> <span>Nở hoa rực rỡ (&ge;{settings.bloomTarget}đ)</span>
            </div>
          </div>

          <div className="sm:hidden">
            <Open22Logo variant="watermark" />
          </div>
        </div>
      </div>
    </div>
  );
};
