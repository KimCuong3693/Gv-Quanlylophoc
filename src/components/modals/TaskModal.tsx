import React, { useState } from 'react';
import { X, CheckSquare, Users, User, Search } from 'lucide-react';
import { Student } from '../../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onCreateTask: (task: {
    name: string;
    points: number;
    due: string;
    assigned_students: (string | number)[];
    category: 'Toán' | 'Tiếng Việt' | 'Khoa học' | 'Rèn luyện' | 'Khác';
  }) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  students,
  onCreateTask
}) => {
  const [name, setName] = useState('');
  const [points, setPoints] = useState(10);
  const [due, setDue] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<'Toán' | 'Tiếng Việt' | 'Khoa học' | 'Rèn luyện' | 'Khác'>('Toán');
  const [mode, setMode] = useState<'all' | 'selected'>('selected');
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleToggleStudent = (id: string | number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((x) => x !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAllInView = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedIds(students.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Vui lòng nhập tên nhiệm vụ');
      return;
    }

    if (mode === 'selected' && selectedIds.length === 0) {
      setError('Vui lòng chọn ít nhất 1 học sinh hoặc chọn "Cả lớp"');
      return;
    }

    onCreateTask({
      name: trimmed,
      points: Math.max(1, Number(points) || 10),
      due,
      category,
      assigned_students: mode === 'all' ? [] : selectedIds
    });

    setName('');
    setPoints(10);
    setSelectedIds([]);
    setError('');
    onClose();
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.team.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
            <span>Giao nhiệm vụ & Bài tập</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Tên nhiệm vụ <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Ví dụ: Hoàn thành 10 bài tập Toán trang 82"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 text-sm font-medium"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Môn / Chủ đề</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 text-xs sm:text-sm font-semibold bg-white"
              >
                <option value="Toán">Toán</option>
                <option value="Tiếng Việt">Tiếng Việt</option>
                <option value="Khoa học">Khoa học</option>
                <option value="Rèn luyện">Rèn luyện</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Điểm thưởng</label>
              <input
                type="number"
                min="1"
                max="100"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 text-xs sm:text-sm font-bold text-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Hạn nộp</label>
              <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="w-full px-2 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 text-xs font-medium"
              />
            </div>
          </div>

          {/* Target Audience Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Đối tượng giao nhiệm vụ</label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setMode('selected')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  mode === 'selected'
                    ? 'bg-white text-blue-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Học sinh được chọn ({selectedIds.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('all')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  mode === 'all'
                    ? 'bg-white text-blue-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Cả lớp ({students.length})</span>
              </button>
            </div>

            {mode === 'selected' ? (
              <div className="mt-3 border border-slate-200 rounded-xl p-3 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Tìm theo tên học sinh, tổ..."
                      className="w-full pl-8 pr-3 py-1.5 bg-white rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectAllInView(selectedIds.length < students.length)}
                    className="text-xs font-bold text-blue-600 hover:underline shrink-0"
                  >
                    {selectedIds.length < students.length ? 'Chọn tất cả' : 'Bỏ chọn'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                  {filteredStudents.map((s) => {
                    const isChecked = selectedIds.includes(s.id);
                    return (
                      <label
                        key={s.id}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-blue-50/90 border-blue-300 text-blue-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleStudent(s.id)}
                          className="rounded-sm text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                        />
                        <span className="truncate flex-1">{s.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal shrink-0">{s.team}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Nhiệm vụ này sẽ tự động áp dụng cho tất cả {students.length} học sinh trong lớp.</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-xs transition-colors"
            >
              Tạo nhiệm vụ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
