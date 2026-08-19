import React, { useState, useEffect, useRef } from 'react';
import { X, Dices, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Student } from '../../types';
import { playWheelTickSound, playBloomCelebrationSound } from '../../utils/audio';

interface RandomPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onAwardSelected: (studentId: string | number, pts: number) => void;
  enableSound?: boolean;
}

export const RandomPickerModal: React.FC<RandomPickerModalProps> = ({
  isOpen,
  onClose,
  students,
  onAwardSelected,
  enableSound = true
}) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [candidateName, setCandidateName] = useState<string>('Bấm "Quay ngẫu nhiên" để bắt đầu');
  const [filterTeam, setFilterTeam] = useState<string>('');
  const spinInterval = useRef<NodeJS.Timeout | null>(null);

  const eligibleStudents = filterTeam
    ? students.filter((s) => s.team === filterTeam)
    : students;

  const startSpin = () => {
    if (eligibleStudents.length === 0) return;

    setIsSpinning(true);
    setSelectedStudent(null);
    let speed = 40;
    let iterations = 0;
    const maxIterations = 30 + Math.floor(Math.random() * 15);

    const step = () => {
      const randomIndex = Math.floor(Math.random() * eligibleStudents.length);
      const current = eligibleStudents[randomIndex];
      setCandidateName(current.name);
      if (enableSound) playWheelTickSound();

      iterations++;
      if (iterations < maxIterations) {
        speed += 6;
        spinInterval.current = setTimeout(step, speed);
      } else {
        setIsSpinning(false);
        setSelectedStudent(current);
        if (enableSound) playBloomCelebrationSound();

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    };

    step();
  };

  useEffect(() => {
    return () => {
      if (spinInterval.current) clearTimeout(spinInterval.current);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Dices className="w-4 h-4" />
            </div>
            <span>Vòng quay gọi tên ngẫu nhiên</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 text-center">
          {/* Team filter selector */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xs font-semibold text-slate-500">Phạm vi:</span>
            <select
              value={filterTeam}
              onChange={(e) => setFilterTeam(e.target.value)}
              disabled={isSpinning}
              className="px-3 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white"
            >
              <option value="">Tất cả học sinh ({students.length})</option>
              <option value="Tổ 1">Tổ 1</option>
              <option value="Tổ 2">Tổ 2</option>
              <option value="Tổ 3">Tổ 3</option>
              <option value="Tổ 4">Tổ 4</option>
            </select>
          </div>

          {/* Wheel stage */}
          <div className="py-8 px-4 my-2 rounded-2xl bg-gradient-to-b from-sky-50 via-blue-50 to-indigo-50 border-2 border-blue-200/80 flex flex-col items-center justify-center relative overflow-hidden min-h-[160px]">
            <div className="text-4xl mb-2 animate-bounce">
              {isSpinning ? '🎲' : selectedStudent ? '🎉' : '✨'}
            </div>

            <div
              className={`text-xl sm:text-2xl font-black text-slate-800 transition-all ${
                isSpinning ? 'scale-105 text-blue-600' : selectedStudent ? 'text-blue-700 font-extrabold' : ''
              }`}
            >
              {candidateName}
            </div>

            {selectedStudent && !isSpinning && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {selectedStudent.team}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {selectedStudent.points} ⭐
                </span>
              </div>
            )}
          </div>

          {/* Spin trigger button */}
          <div className="mt-5 space-y-3">
            <button
              onClick={startSpin}
              disabled={isSpinning || eligibleStudents.length === 0}
              className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Dices className="w-5 h-5" />
              <span>{isSpinning ? 'Đang quay số...' : 'Quay ngẫu nhiên'}</span>
            </button>

            {/* If a student is picked, give quick award option */}
            {selectedStudent && !isSpinning && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Thưởng điểm ngay:</span>
                {[2, 5, 10].map((pts) => (
                  <button
                    key={pts}
                    onClick={() => {
                      onAwardSelected(selectedStudent.id, pts);
                      onClose();
                    }}
                    className="py-1 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                    <span>+{pts}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
