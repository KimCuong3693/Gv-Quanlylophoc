import React, { useState } from 'react';
import { X, FileText, Plus, Trash2, CheckCircle } from 'lucide-react';

interface NoteItem {
  id: string;
  text: string;
  date: string;
  done?: boolean;
}

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: NoteItem[];
  onSaveNotes: (notes: NoteItem[]) => void;
}

export const NotesModal: React.FC<NotesModalProps> = ({
  isOpen,
  onClose,
  notes: initialNotes,
  onSaveNotes
}) => {
  const [notes, setNotes] = useState<NoteItem[]>(initialNotes);
  const [newText, setNewText] = useState('');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    const item: NoteItem = {
      id: Date.now().toString(),
      text: newText.trim(),
      date: new Date().toLocaleDateString('vi-VN'),
      done: false
    };
    const updated = [item, ...notes];
    setNotes(updated);
    onSaveNotes(updated);
    setNewText('');
  };

  const handleToggle = (id: string) => {
    const updated = notes.map((n) => (n.id === id ? { ...n, done: !n.done } : n));
    setNotes(updated);
    onSaveNotes(updated);
  };

  const handleDelete = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    onSaveNotes(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <span>Sổ tay & Lời dặn dò của giáo viên</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Add note input */}
          <form onSubmit={handleAdd} className="flex gap-2">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Thêm lời dặn, ghi chú việc cần làm trong ngày..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!newText.trim()}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold flex items-center gap-1 transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm</span>
            </button>
          </form>

          {/* List of notes */}
          <div className="space-y-2">
            {notes.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                Chưa có ghi chú nào. Hãy thêm lời dặn cho lớp học.
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className={`p-3 rounded-xl border flex items-start justify-between gap-3 transition-colors ${
                    note.done ? 'bg-slate-50 border-slate-200 text-slate-400' : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <button
                    onClick={() => handleToggle(note.id)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-600 shrink-0"
                  >
                    <CheckCircle className={`w-4 h-4 ${note.done ? 'text-emerald-600 fill-emerald-100' : ''}`} />
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${note.done ? 'line-through' : 'font-medium'}`}>{note.text}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{note.date}</span>
                  </div>

                  <button
                    onClick={() => handleDelete(note.id)}
                    className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                    title="Xóa ghi chú"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="px-6 py-3 border-t border-slate-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors"
          >
            Đóng sổ tay
          </button>
        </div>
      </div>
    </div>
  );
};
