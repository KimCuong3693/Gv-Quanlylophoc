import React, { useState } from 'react';
import { X, FileSpreadsheet, Users, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Student } from '../../types';

interface BulkStudentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (newStudents: Student[], replaceMode: boolean) => void;
  onResetToDefault: () => void;
  currentCount: number;
}

export const BulkStudentsModal: React.FC<BulkStudentsModalProps> = ({
  isOpen,
  onClose,
  onImport,
  onResetToDefault,
  currentCount
}) => {
  const [inputText, setInputText] = useState('');
  const [importMode, setImportMode] = useState<'replace' | 'append'>('replace');
  const [teamAssignment, setTeamAssignment] = useState<'auto_4_teams' | 'fixed_team'>('auto_4_teams');
  const [fixedTeam, setFixedTeam] = useState('Tổ 1');
  const [previewList, setPreviewList] = useState<string[]>([]);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleTextChange = (text: string) => {
    setInputText(text);
    setError('');
    // Split by new lines, commas, or semicolons
    const lines = text
      .split(/\r?\n/)
      .map((line) => {
        // Clean leading numbers like "1. ", "1 - ", "01. "
        return line.replace(/^\s*\d+[\.\-\)\s]+/, '').trim();
      })
      .filter((line) => line.length > 0);

    setPreviewList(lines);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (previewList.length === 0) {
      setError('Vui lòng dán hoặc nhập ít nhất 1 tên học sinh.');
      return;
    }

    const newStudents: Student[] = previewList.map((name, index) => {
      let team = fixedTeam;
      if (teamAssignment === 'auto_4_teams') {
        const teamNum = (index % 4) + 1;
        team = `Tổ ${teamNum}`;
      }
      return {
        id: Date.now() + index + Math.floor(Math.random() * 1000),
        name,
        team,
        points: 0,
        badge: '',
        level: 'Hạt giống',
        progress: 0,
        flowers: 0
      };
    });

    onImport(newStudents, importMode === 'replace');
    setInputText('');
    setPreviewList([]);
    onClose();
  };

  const handleLoadSample = () => {
    const sampleNames = Array.from({ length: 28 }, (_, i) => {
      const num = String(i + 1).padStart(2, '0');
      return `Học sinh ${num}`;
    }).join('\n');
    handleTextChange(sampleNames);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 via-white to-sky-50/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Nhập danh sách học sinh</h3>
              <p className="text-xs text-slate-500">
                Dán danh sách từ Excel, Word hoặc soạn thảo trực tiếp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick options bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
            <span className="font-semibold text-slate-600 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              Hiện có <strong className="text-blue-700">{currentCount}</strong> học sinh trong lớp
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLoadSample}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 text-blue-700 font-bold border border-slate-200 hover:border-blue-200 transition-colors shadow-2xs"
              >
                Điền mẫu (Học sinh 01 → 28)
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Đặt lại toàn bộ danh sách lớp về mẫu 28 học sinh (Học sinh 01 → Học sinh 28)?')) {
                    onResetToDefault();
                    onClose();
                  }
                }}
                className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold border border-amber-200 transition-colors shadow-2xs flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Đặt lại mặc định</span>
              </button>
            </div>
          </div>

          {/* Input text area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Dán danh sách tên học sinh (mỗi dòng 1 tên):
            </label>
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Ví dụ:&#10;Học sinh 01&#10;Học sinh 02&#10;Học sinh 03&#10;Học sinh 04..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs font-mono sm:text-sm bg-slate-50/40"
            />
          </div>

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Import Mode */}
            <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-2">Chế độ cập nhật</label>
              <div className="space-y-2 text-xs font-medium text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="importMode"
                    value="replace"
                    checked={importMode === 'replace'}
                    onChange={() => setImportMode('replace')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    <strong>Thay thế toàn bộ</strong> danh sách lớp hiện tại
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="importMode"
                    value="append"
                    checked={importMode === 'append'}
                    onChange={() => setImportMode('append')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    <strong>Thêm tiếp</strong> vào danh sách học sinh hiện có
                  </span>
                </label>
              </div>
            </div>

            {/* Team assignment */}
            <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-2">Phân bổ tổ học tập</label>
              <div className="space-y-2 text-xs font-medium text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="teamAssignment"
                    value="auto_4_teams"
                    checked={teamAssignment === 'auto_4_teams'}
                    onChange={() => setTeamAssignment('auto_4_teams')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>Tự động chia đều cho <strong>4 Tổ (Tổ 1 → Tổ 4)</strong></span>
                </label>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="teamAssignment"
                      value="fixed_team"
                      checked={teamAssignment === 'fixed_team'}
                      onChange={() => setTeamAssignment('fixed_team')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Gán tất cả vào:</span>
                  </label>
                  <select
                    disabled={teamAssignment !== 'fixed_team'}
                    value={fixedTeam}
                    onChange={(e) => setFixedTeam(e.target.value)}
                    className="px-2 py-1 bg-white rounded-lg border border-slate-200 text-xs font-bold disabled:opacity-50"
                  >
                    <option value="Tổ 1">Tổ 1</option>
                    <option value="Tổ 2">Tổ 2</option>
                    <option value="Tổ 3">Tổ 3</option>
                    <option value="Tổ 4">Tổ 4</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Preview section */}
          {previewList.length > 0 && (
            <div className="p-3.5 bg-sky-50/60 rounded-xl border border-sky-200">
              <div className="flex items-center justify-between text-xs font-bold text-sky-900 mb-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Đã nhận diện: {previewList.length} học sinh
                </span>
                <span className="text-slate-500 font-normal text-[11px]">
                  (Xem trước 6 học sinh đầu tiên)
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {previewList.slice(0, 6).map((name, idx) => {
                  const assigned =
                    teamAssignment === 'auto_4_teams'
                      ? `Tổ ${(idx % 4) + 1}`
                      : fixedTeam;
                  return (
                    <div
                      key={idx}
                      className="px-2.5 py-1.5 bg-white rounded-lg border border-sky-100 text-xs flex items-center justify-between"
                    >
                      <span className="font-semibold text-slate-800 truncate" title={name}>
                        {idx + 1}. {name}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 shrink-0 ml-1">
                        {assigned}
                      </span>
                    </div>
                  );
                })}
              </div>
              {previewList.length > 6 && (
                <p className="text-[11px] text-sky-700 mt-2 text-center font-medium">
                  ...và {previewList.length - 6} học sinh khác sẽ được thêm đầy đủ.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={previewList.length === 0}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-bold shadow-xs transition-colors"
          >
            Áp dụng danh sách ({previewList.length} HS)
          </button>
        </div>
      </div>
    </div>
  );
};
