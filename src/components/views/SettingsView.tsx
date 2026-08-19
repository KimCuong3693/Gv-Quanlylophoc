import React, { useState, useRef } from 'react';
import { Settings, Save, RotateCcw, Download, Upload, Volume2, Sparkles, Check } from 'lucide-react';
import { ClassSettings } from '../../types';

interface SettingsViewProps {
  settings: ClassSettings;
  onSaveSettings: (settings: ClassSettings) => void;
  onResetData: () => void;
  onExportJSON: () => void;
  onImportJSON: (file: File) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onSaveSettings,
  onResetData,
  onExportJSON,
  onImportJSON
}) => {
  const [formData, setFormData] = useState<ClassSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJSON(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e7edf4] shadow-xs overflow-hidden max-w-3xl mx-auto">
      <div className="p-5 border-b border-[#e7edf4] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Cài đặt cấu hình lớp học</h2>
            <p className="text-xs text-slate-500">Tùy biến thông tin giáo viên, quy tắc tích điểm và quản lý dữ liệu</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {savedSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Đã lưu thành công các thay đổi cài đặt!</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Họ và tên giáo viên chủ nhiệm
            </label>
            <input
              type="text"
              value={formData.teacherName}
              onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Tên lớp học
            </label>
            <input
              type="text"
              value={formData.className}
              onChange={(e) => setFormData({ ...formData, className: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Mục tiêu điểm để Nở Hoa (🌳)
            </label>
            <input
              type="number"
              min="50"
              max="1000"
              value={formData.bloomTarget}
              onChange={(e) => setFormData({ ...formData, bloomTarget: Number(e.target.value) || 100 })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-blue-600 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Đơn vị tích lũy
            </label>
            <input
              type="text"
              value={formData.pointUnit}
              onChange={(e) => setFormData({ ...formData, pointUnit: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Slogan / Khẩu hiệu lớp học
          </label>
          <textarea
            rows={2}
            value={formData.slogan}
            onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-500 italic"
          />
        </div>

        {/* Sound toggle */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-xs sm:text-sm font-bold text-slate-800 block">Âm thanh hiệu ứng</strong>
              <span className="text-[11px] text-slate-500">Phát âm thanh khi cộng điểm, nở hoa và hết giờ</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={formData.enableSound}
            onChange={(e) => setFormData({ ...formData, enableSound: e.target.checked })}
            className="w-5 h-5 rounded-md text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Lưu cài đặt</span>
          </button>
        </div>
      </form>

      {/* Backup and Restore Data section */}
      <div className="p-6 bg-slate-50/70 border-t border-[#e7edf4] space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Sao lưu & Khôi phục dữ liệu
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onExportJSON}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Tải file sao lưu (JSON)</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-600" />
            <span>Khôi phục từ file JSON</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />

          <button
            type="button"
            onClick={onResetData}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
            <span>Đặt lại dữ liệu mẫu ban đầu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
