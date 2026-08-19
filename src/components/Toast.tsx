import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export interface ToastData {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info' | 'points';
}

interface ToastProps {
  toasts: ToastData[];
}

export const Toast: React.FC<ToastProps> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 bg-[#19324d] text-white rounded-2xl shadow-xl border border-slate-700/50 text-xs sm:text-sm font-semibold animate-in slide-in-from-bottom-3 duration-200"
        >
          {t.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : t.type === 'points' ? (
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="flex-1 leading-snug">{t.message}</span>
        </div>
      ))}
    </div>
  );
};
