import React, { useState } from 'react';
import { CheckSquare, Plus, Search, Calendar, Users, CheckCircle2, Trash2, Award } from 'lucide-react';
import { Task, Student } from '../../types';

interface TasksViewProps {
  tasks: Task[];
  students: Student[];
  onOpenCreateTask: () => void;
  onCompleteTask: (taskId: string | number) => void;
  onDeleteTask: (taskId: string | number) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  students,
  onOpenCreateTask,
  onCompleteTask,
  onDeleteTask
}) => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'done'>('all');

  const filtered = tasks.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !filterCategory || t.category === filterCategory;
    const matchStatus =
      filterStatus === 'all' ? true : filterStatus === 'done' ? !!t.done : !t.done;
    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div className="bg-white rounded-2xl border border-[#e7edf4] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-[#e7edf4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Nhiệm vụ & Bài tập rèn luyện</h2>
            <p className="text-xs text-slate-500">
              Giao bài tập hoặc việc tốt cho học sinh. Khi hoàn thành, hệ thống sẽ tự động cộng điểm thưởng cho các em.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCreateTask}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tạo nhiệm vụ</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="p-4 bg-slate-50/50 border-b border-[#e7edf4] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm nhiệm vụ..."
              className="w-full pl-9 pr-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-purple-500 font-medium"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="">Tất cả môn</option>
            <option value="Toán">Toán</option>
            <option value="Tiếng Việt">Tiếng Việt</option>
            <option value="Khoa học">Khoa học</option>
            <option value="Rèn luyện">Rèn luyện</option>
          </select>
        </div>

        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'all' ? 'bg-purple-50 text-purple-700' : 'text-slate-600'
            }`}
          >
            Tất cả ({tasks.length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'pending' ? 'bg-purple-50 text-purple-700' : 'text-slate-600'
            }`}
          >
            Đang mở ({tasks.filter((t) => !t.done).length})
          </button>
          <button
            onClick={() => setFilterStatus('done')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'done' ? 'bg-purple-50 text-purple-700' : 'text-slate-600'
            }`}
          >
            Đã xong ({tasks.filter((t) => !!t.done).length})
          </button>
        </div>
      </div>

      {/* Task list */}
      <div className="p-4 sm:p-5 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            Chưa có nhiệm vụ nào phù hợp. Bấm "+ Tạo nhiệm vụ" để thêm mới.
          </div>
        ) : (
          filtered.map((t) => {
            const isAll = !t.assigned_students || t.assigned_students.length === 0 || t.assigned_students.length === students.length;
            const assignedCount = isAll ? students.length : t.assigned_students?.length || 0;

            return (
              <div
                key={t.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  t.done
                    ? 'bg-slate-50/70 border-slate-200'
                    : 'bg-white border-[#e4ebf2] hover:border-purple-300 shadow-2xs'
                }`}
              >
                <div className="min-w-0 space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {t.category && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                        {t.category}
                      </span>
                    )}
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      +{t.points} điểm
                    </span>
                    {t.done && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        ✓ Đã duyệt xong
                      </span>
                    )}
                  </div>

                  <h3 className={`text-sm sm:text-base font-bold text-slate-800 ${t.done ? 'line-through text-slate-400' : ''}`}>
                    {t.name}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Hạn nộp: {t.due || 'Không giới hạn'}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isAll ? 'Cả lớp' : `${assignedCount} học sinh`}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  {!t.done ? (
                    <button
                      onClick={() => onCompleteTask(t.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                      title="Hoàn thành và cộng điểm cho học sinh"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Duyệt xong (+{t.points}đ)</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Đã nhận điểm</span>
                    </span>
                  )}

                  <button
                    onClick={() => onDeleteTask(t.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Xóa nhiệm vụ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
