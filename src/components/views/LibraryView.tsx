import React, { useState } from 'react';
import { BookOpen, Plus, Search, FileText, Download, Tag, BookMarked, Sparkles } from 'lucide-react';
import { LibraryItem } from '../../types';

interface LibraryViewProps {
  library: LibraryItem[];
  onOpenAddResource: () => void;
  onDownload: (item: LibraryItem) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  library,
  onOpenAddResource,
  onDownload
}) => {
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');

  const subjects = ['Toán', 'Tiếng Việt', 'Khoa học', 'STEM', 'Kỹ năng sống'];

  const filtered = library.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchSubject = !subjectFilter || item.subject === subjectFilter;
    return matchSearch && matchSubject;
  });

  const getSubjectColor = (subj: string) => {
    switch (subj) {
      case 'Toán':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Tiếng Việt':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Khoa học':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'STEM':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Kỹ năng sống':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e7edf4] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-[#e7edf4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Thư viện tài liệu & Học liệu số</h2>
            <p className="text-xs text-slate-500">
              Kho tài liệu môn Toán, Tiếng Việt, Khoa học, STEM và Kỹ năng sống dành cho lớp học
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddResource}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Thêm tài liệu</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="p-4 bg-slate-50/50 border-b border-[#e7edf4] flex flex-wrap items-center justify-between gap-2.5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm tài liệu, bài tập..."
            className="w-full pl-9 pr-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSubjectFilter('')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              subjectFilter === ''
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Tất cả môn
          </button>
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSubjectFilter(sub)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                subjectFilter === sub
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Materials */}
      <div className="p-4 sm:p-5">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            Chưa có tài liệu nào phù compliance. Bấm "+ Thêm tài liệu" để đăng tải.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-[#e4ebf2] bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getSubjectColor(item.subject)}`}>
                      {item.subject}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">{item.type}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.fileSize || '1.8 MB'} • PDF
                  </span>
                  <button
                    onClick={() => onDownload(item)}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải về</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
