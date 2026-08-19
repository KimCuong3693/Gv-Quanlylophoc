import React, { useState, useEffect, useRef } from 'react';
import { X, Timer, Play, Pause, RotateCcw, BellRing } from 'lucide-react';
import { playTimerFinishSound } from '../../utils/audio';

interface CountdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  enableSound?: boolean;
}

export const CountdownModal: React.FC<CountdownModalProps> = ({
  isOpen,
  onClose,
  enableSound = true
}) => {
  const [totalSeconds, setTotalSeconds] = useState(300); // default 5m
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const presets = [
    { label: '15 phút', seconds: 15 * 60, color: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100' },
    { label: '10 phút', seconds: 10 * 60, color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100' },
    { label: '5 phút', seconds: 5 * 60, color: 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-100' },
    { label: '1 phút', seconds: 60, color: 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-100' },
    { label: '30 giây', seconds: 30, color: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-100' }
  ];

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setIsFinished(true);
            if (enableSound) {
              playTimerFinishSound();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, remainingSeconds, enableSound]);

  if (!isOpen) return null;

  const startTimer = (seconds: number) => {
    setTotalSeconds(seconds);
    setRemainingSeconds(seconds);
    setIsFinished(false);
    setIsRunning(true);
  };

  const handleCustomStart = () => {
    const mins = parseFloat(customInput);
    if (!Number.isFinite(mins) || mins <= 0) return;
    const secs = Math.round(mins * 60);
    startTimer(secs);
    setCustomInput('');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const percent = totalSeconds > 0 ? (remainingSeconds / totalSeconds) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Timer className="w-4 h-4" />
            </div>
            <span>Đồng hồ đếm ngược lớp học</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 text-center">
          {/* Big Digital Display */}
          <div className="relative py-4 my-2">
            <div
              className={`text-6xl sm:text-7xl font-black font-mono tracking-wider transition-colors ${
                isFinished
                  ? 'text-rose-600 animate-bounce'
                  : isRunning
                  ? 'text-blue-600'
                  : 'text-slate-700'
              }`}
            >
              {formatTime(remainingSeconds)}
            </div>

            <p className="text-xs font-bold text-slate-500 mt-2">
              {isFinished
                ? '🎉 HẾT GIỜ RỒI! THẦY CÔ VÀ CÁC EM DỪNG BÚT.'
                : isRunning
                ? '⏳ Đang đếm ngược thời gian làm bài…'
                : 'Chọn thời lượng hoặc bấm Bắt đầu'}
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-6">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                remainingSeconds <= 10 ? 'bg-rose-500' : 'bg-blue-600'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-5 gap-1.5 mb-5">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => startTimer(p.seconds)}
                className={`py-2.5 px-1 rounded-xl text-xs font-black border transition-all ${p.color}`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Custom Time */}
          <div className="flex items-center gap-2 mb-6">
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="60"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Nhập số phút (ví dụ: 3 hoặc 7.5)"
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:border-blue-500"
            />
            <button
              onClick={handleCustomStart}
              disabled={!customInput || parseFloat(customInput) <= 0}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 text-xs font-bold rounded-xl transition-colors shrink-0"
            >
              Đặt giờ
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3 pt-2 border-t border-slate-100">
            {isRunning ? (
              <button
                onClick={() => setIsRunning(false)}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
              >
                <Pause className="w-4 h-4" />
                <span>Tạm dừng</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (remainingSeconds === 0) {
                    setRemainingSeconds(totalSeconds);
                    setIsFinished(false);
                  }
                  setIsRunning(true);
                }}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>{remainingSeconds === 0 ? 'Chạy lại' : 'Tiếp tục'}</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsRunning(false);
                setIsFinished(false);
                setRemainingSeconds(totalSeconds);
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Đặt lại</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
