import React from 'react';

interface Open22LogoProps {
  className?: string;
  variant?: 'icon' | 'full' | 'badge' | 'watermark';
  size?: 'xs' | 'sm' | 'md' | 'lg';
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
    lg: 'w-14 h-14'
  };

  const svgSizeMap = {
    xs: { w: 24, h: 24 },
    sm: { w: 32, h: 32 },
    md: { w: 42, h: 42 },
    lg: { w: 56, h: 56 }
  };

  // Vector render of the OPEN 22 MEDIA logo
  const LogoVector = () => (
    <svg
      viewBox="0 0 160 160"
      className="w-full h-full drop-shadow-xs"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="open22Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e106a" />
          <stop offset="35%" stopColor="#1e3a8a" />
          <stop offset="70%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Rounded gradient background plate */}
      <rect width="160" height="160" rx="32" fill="url(#open22Grad)" />

      {/* Ambient glass shine */}
      <rect
        width="160"
        height="160"
        rx="32"
        fill="white"
        fillOpacity="0.04"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
      />

      {/* Logo Typography Group */}
      <g transform="translate(18, 20)">
        {/* Letter 'O' */}
        <path
          d="M 12 18 C 12 10 18 4 26 4 L 32 4 C 40 4 46 10 46 18 L 46 92 C 46 96 42 100 38 100 L 16 100 L 16 90 L 36 90 C 37 90 38 89 38 88 L 38 20 C 38 15 35 13 30 13 L 28 13 C 23 13 20 15 20 20 L 20 98 L 12 98 Z"
          fill="#FFFFFF"
        />

        {/* Letter 'P' */}
        <path
          d="M 52 4 L 88 4 C 95 4 100 9 100 16 L 100 34 C 100 41 95 46 88 46 L 60 46 L 60 52 L 52 52 Z M 60 13 L 60 37 L 86 37 C 89 37 92 35 92 32 L 92 18 C 92 15 89 13 86 13 Z"
          fill="#FFFFFF"
        />

        {/* Letter 'E' */}
        <path
          d="M 106 4 L 140 4 L 140 13 L 115 13 L 115 22 L 138 22 L 138 31 L 115 31 L 115 41 L 140 41 L 140 50 L 106 50 Z"
          fill="#FFFFFF"
        />

        {/* Letter 'N' */}
        <path
          d="M 148 4 L 156 4 L 156 86 C 156 94 150 100 142 100 L 136 100 L 136 91 L 141 91 C 145 91 148 88 148 84 Z M 148 4 L 148 80 L 140 4 Z"
          fill="#FFFFFF"
        />

        {/* Number '22' in bright neon green */}
        {/* First '2' */}
        <path
          d="M 52 58 C 52 54 55 51 60 51 L 86 51 C 91 51 94 54 94 58 L 94 70 C 94 75 90 78 86 80 L 62 88 L 94 88 L 94 97 L 52 97 L 52 89 L 78 80 C 82 78 85 76 85 72 L 85 60 L 61 60 L 61 68 L 52 68 Z"
          fill="#4ade80"
          filter="url(#glow)"
        />

        {/* Second '2' */}
        <path
          d="M 98 58 C 98 54 101 51 106 51 L 132 51 C 137 51 140 54 140 58 L 140 70 C 140 75 136 78 132 80 L 108 88 L 140 88 L 140 97 L 98 97 L 98 89 L 124 80 C 128 78 131 76 131 72 L 131 60 L 107 60 L 107 68 L 98 68 Z"
          fill="#4ade80"
          filter="url(#glow)"
        />

        {/* 'MEDIA' text below */}
        <text
          x="146"
          y="114"
          textAnchor="end"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="17"
          letterSpacing="2.5"
        >
          MEDIA
        </text>
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

  if (variant === 'watermark') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-white shadow-lg ${className}`}
      >
        <div className="w-6 h-6 shrink-0">
          <LogoVector />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-wider text-slate-300 font-bold leading-tight">
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
        className={`inline-flex items-center gap-2.5 px-3 py-1.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-xl text-white shadow-xs ${className}`}
      >
        <div className="w-7 h-7 shrink-0">
          <LogoVector />
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1 font-black text-xs tracking-wider">
            <span className="text-white">OPEN</span>
            <span className="text-emerald-400">22</span>
            <span className="text-slate-300 text-[10px]">MEDIA</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium leading-none">
            Giải pháp giáo dục số
          </span>
        </div>
      </div>
    );
  }

  // Full default variant
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className={`${sizeMap[size]} shrink-0`}>
        <LogoVector />
      </div>
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1 font-black text-sm text-slate-800 tracking-tight leading-tight">
          <span>OPEN</span>
          <span className="text-emerald-500">22</span>
          <span className="text-slate-500 text-xs font-bold">MEDIA</span>
        </div>
        <span className="text-[11px] text-slate-500 font-semibold">
          Công nghệ phát triển giáo dục
        </span>
      </div>
    </div>
  );
};
