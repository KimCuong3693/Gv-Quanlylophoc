import React from 'react';

interface Open22LogoProps {
  className?: string;
  variant?: 'icon' | 'full' | 'badge' | 'watermark' | 'card';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Open22Logo: React.FC<Open22LogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md'
}) => {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24'
  };

  // Pixel-perfect vector render of the exact OPEN 22 MEDIA logo from prototype
  const LogoVector = () => (
    <svg
      viewBox="0 0 500 500"
      className="w-full h-full drop-shadow-sm select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Background Mesh Gradient resembling the exact original aurora/nebula style */}
        <radialGradient id="meshTopLeft" cx="20%" cy="15%" r="65%" fx="15%" fy="10%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#0d9488" stopOpacity="0.6" />
          <stop offset="80%" stopColor="#1e1b4b" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="meshTopRight" cx="85%" cy="20%" r="70%" fx="90%" fy="15%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="meshBottomCenter" cx="50%" cy="85%" r="65%">
          <stop offset="0%" stopColor="#4338ca" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#1e106a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#030712" />
        </radialGradient>

        <linearGradient id="baseBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="40%" stopColor="#170c3a" />
          <stop offset="80%" stopColor="#1e106a" />
          <stop offset="100%" stopColor="#052e26" />
        </linearGradient>

        {/* Soft neon glow for green '22' */}
        <filter id="neonGreenGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#4ade80" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Main Square Background with rounded corners */}
      <rect width="500" height="500" rx="72" fill="url(#baseBgGrad)" />
      <rect width="500" height="500" rx="72" fill="url(#meshTopLeft)" />
      <rect width="500" height="500" rx="72" fill="url(#meshTopRight)" />
      <rect width="500" height="500" rx="72" fill="url(#meshBottomCenter)" />

      {/* Subtle outer stroke glass highlight */}
      <rect
        width="498"
        height="498"
        x="1"
        y="1"
        rx="71"
        stroke="rgba(255, 255, 255, 0.18)"
        strokeWidth="2"
      />

      {/* LOGO GRAPHIC MARK: "OPEN 22 MEDIA" */}
      <g transform="translate(85, 140)">
        {/* ================= LETTER 'O' ================= */}
        {/* Outer O stroke with top-left rounded corner */}
        <path
          d="M 14 30 
             C 14 13.43 27.43 0 44 0 
             L 74 0 
             L 74 190 
             L 28 190 
             L 28 205 
             L 74 205 
             L 74 220 
             L 14 220 
             L 14 30 Z"
          fill="#FFFFFF"
        />
        {/* Cutout hole of 'O' */}
        <path
          d="M 28 32 
             C 28 23.16 35.16 16 44 16 
             L 60 16 
             L 60 174 
             L 28 174 
             L 28 32 Z"
          fill="#0c0728"
          fillOpacity="0.92"
        />

        {/* ================= LETTER 'P' ================= */}
        <g transform="translate(84, 0)">
          {/* Outer P */}
          <path
            d="M 0 30 
               C 0 13.43 13.43 0 30 0 
               L 42 0 
               C 58.57 0 72 13.43 72 30 
               L 72 65 
               C 72 81.57 58.57 95 42 95 
               L 15 95 
               L 15 105 
               L 0 105 
               L 0 30 Z"
            fill="#FFFFFF"
          />
          {/* Inner cutout hole of 'P' */}
          <path
            d="M 15 16 
               L 40 16 
               C 49.94 16 58 24.06 58 34 
               L 58 61 
               C 58 70.94 49.94 79 40 79 
               L 15 79 
               L 15 16 Z"
            fill="#0c0728"
            fillOpacity="0.92"
          />
        </g>

        {/* ================= LETTER 'E' ================= */}
        <g transform="translate(170, 0)">
          <path
            d="M 0 0 
               L 66 0 
               L 66 16 
               L 15 16 
               L 15 40 
               L 58 40 
               L 58 56 
               L 15 56 
               L 15 80 
               L 66 80 
               L 66 96 
               L 0 96 
               L 0 0 Z"
            fill="#FFFFFF"
          />
        </g>

        {/* ================= LETTER 'N' ================= */}
        <g transform="translate(250, 0)">
          {/* Outer N spanning both rows with bottom-right curved sweep */}
          <path
            d="M 0 0 
               L 54 0 
               C 70.57 0 84 13.43 84 30 
               L 84 190 
               C 84 206.57 70.57 220 54 220 
               L 38 220 
               L 38 204 
               L 52 204 
               C 60.84 204 68 196.84 68 188 
               L 68 20 
               C 68 17.79 66.21 16 64 16 
               L 16 16 
               L 16 220 
               L 0 220 
               L 0 0 Z"
            fill="#FFFFFF"
          />
        </g>

        {/* ================= NUMBER '22' (VIVID LIME GREEN) ================= */}
        {/* First '2' */}
        <g transform="translate(84, 110)" filter="url(#neonGreenGlow)">
          <path
            d="M 0 0 
               L 50 0 
               C 62.15 0 72 9.85 72 22 
               L 72 44 
               C 72 56.15 62.15 66 50 66 
               L 16 66 
               L 16 78 
               L 72 78 
               L 72 96 
               L 0 96 
               L 0 52 
               L 54 52 
               C 55.1 52 56 51.1 56 50 
               L 56 20 
               C 56 16.69 53.31 14 50 14 
               L 0 14 
               L 0 0 Z"
            fill="#4ade80"
          />
        </g>

        {/* Second '2' */}
        <g transform="translate(166, 110)" filter="url(#neonGreenGlow)">
          <path
            d="M 0 0 
               L 50 0 
               C 62.15 0 72 9.85 72 22 
               L 72 44 
               C 72 56.15 62.15 66 50 66 
               L 16 66 
               L 16 78 
               L 72 78 
               L 72 96 
               L 0 96 
               L 0 52 
               L 54 52 
               C 55.1 52 56 51.1 56 50 
               L 56 20 
               C 56 16.69 53.31 14 50 14 
               L 0 14 
               L 0 0 Z"
            fill="#4ade80"
          />
        </g>

        {/* ================= WORD 'MEDIA' ================= */}
        <g transform="translate(252, 230)">
          {/* Custom vector geometric glyphs for MEDIA matching prototype */}
          {/* M */}
          <path d="M 0 20 L 0 4 L 5 4 L 9 14 L 13 4 L 18 4 L 18 20 L 14 20 L 14 9 L 10.5 17.5 L 7.5 17.5 L 4 9 L 4 20 Z" fill="#FFFFFF" />
          {/* E */}
          <path d="M 22 4 L 35 4 L 35 7.5 L 26 7.5 L 26 10 L 33 10 L 33 13.5 L 26 13.5 L 26 16.5 L 35 16.5 L 35 20 L 22 20 Z" fill="#FFFFFF" />
          {/* D */}
          <path d="M 39 4 L 48 4 C 53.5 4 57 7.5 57 12 C 57 16.5 53.5 20 48 20 L 39 20 Z M 43 7.5 L 43 16.5 L 47.5 16.5 C 50.5 16.5 52.8 14.8 52.8 12 C 52.8 9.2 50.5 7.5 47.5 7.5 Z" fill="#FFFFFF" />
          {/* I */}
          <path d="M 61 4 L 65 4 L 65 20 L 61 20 Z" fill="#FFFFFF" />
          {/* A */}
          <path d="M 72 20 L 76.5 4 L 81.5 4 L 86 20 L 81.8 20 L 80.6 15.5 L 77.4 15.5 L 76.2 20 Z M 78.2 12.5 L 79.8 12.5 L 79 7.8 Z" fill="#FFFFFF" />
        </g>
      </g>
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div className={`relative shrink-0 ${sizeMap[size]} ${className}`} title="OPEN 22 MEDIA">
        <LogoVector />
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`relative shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden shadow-xl ${className}`}>
        <LogoVector />
      </div>
    );
  }

  if (variant === 'watermark') {
    return (
      <div
        className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-white shadow-xl ${className}`}
      >
        <div className="w-7 h-7 shrink-0 rounded-lg overflow-hidden">
          <LogoVector />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[9px] uppercase tracking-wider text-slate-300 font-bold leading-tight">
            Đồng hành bởi
          </span>
          <span className="text-xs font-black tracking-tight text-white flex items-center gap-1">
            OPEN <span className="text-emerald-400">22</span> MEDIA
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-2.5 px-3 py-1.5 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border border-indigo-500/40 rounded-2xl text-white shadow-md hover:border-indigo-400/60 transition-all ${className}`}
      >
        <div className="w-7 h-7 shrink-0 rounded-lg overflow-hidden shadow-xs">
          <LogoVector />
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1 font-black text-xs tracking-wider">
            <span className="text-white">OPEN</span>
            <span className="text-emerald-400">22</span>
            <span className="text-slate-300 text-[10px]">MEDIA</span>
          </div>
          <span className="text-[10px] text-emerald-300/90 font-semibold leading-none">
            Đối tác phát triển giáo dục
          </span>
        </div>
      </div>
    );
  }

  // Full default variant
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className={`${sizeMap[size]} shrink-0 rounded-xl overflow-hidden shadow-sm`}>
        <LogoVector />
      </div>
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1 font-black text-sm text-slate-900 tracking-tight leading-tight">
          <span>OPEN</span>
          <span className="text-emerald-500">22</span>
          <span className="text-slate-600 text-xs font-extrabold">MEDIA</span>
        </div>
        <span className="text-[11px] text-slate-500 font-semibold">
          Công nghệ phát triển giáo dục
        </span>
      </div>
    </div>
  );
};

