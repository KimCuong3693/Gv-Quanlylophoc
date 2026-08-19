import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Student,
  Task,
  Notice,
  LibraryItem,
  ClassSettings,
  ViewTab
} from './types';
import {
  initialStudents,
  initialTasks,
  initialNotices,
  initialLibrary,
  defaultSettings
} from './data/initialData';
import {
  playPointAwardSound,
  playPointDeductSound,
  playBloomCelebrationSound
} from './utils/audio';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Toast, ToastData } from './components/Toast';

import { DashboardView } from './components/views/DashboardView';
import { StudentsView } from './components/views/StudentsView';
import { PointsView } from './components/views/PointsView';
import { LeaderboardView } from './components/views/LeaderboardView';
import { TasksView } from './components/views/TasksView';
import { LibraryView } from './components/views/LibraryView';
import { NoticesView } from './components/views/NoticesView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';

import { StudentModal } from './components/modals/StudentModal';
import { EditStudentModal } from './components/modals/EditStudentModal';
import { QuickPointsModal } from './components/modals/QuickPointsModal';
import { TaskModal } from './components/modals/TaskModal';
import { CountdownModal } from './components/modals/CountdownModal';
import { RandomPickerModal } from './components/modals/RandomPickerModal';
import { AttendanceModal } from './components/modals/AttendanceModal';
import { NotesModal } from './components/modals/NotesModal';
import { NoticeModal } from './components/modals/NoticeModal';
import { LibraryModal } from './components/modals/LibraryModal';
import { TeacherEditModal } from './components/modals/TeacherEditModal';
import { SupportModal } from './components/modals/SupportModal';

const STORAGE_KEYS = {
  students: 'vuon-uom-tri-thuc-students-v2',
  tasks: 'vuon-uom-tri-thuc-tasks-v2',
  notices: 'vuon-uom-tri-thuc-notices-v2',
  library: 'vuon-uom-tri-thuc-library-v2',
  settings: 'vuon-uom-tri-thuc-settings-v2',
  notes: 'vuon-uom-tri-thuc-notes-v2'
};

export default function App() {
  // Load data from localStorage or seed
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.students);
      return saved ? JSON.parse(saved) : initialStudents;
    } catch {
      return initialStudents;
    }
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.tasks);
      return saved ? JSON.parse(saved) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.notices);
      return saved ? JSON.parse(saved) : initialNotices;
    } catch {
      return initialNotices;
    }
  });

  const [library, setLibrary] = useState<LibraryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.library);
      return saved ? JSON.parse(saved) : initialLibrary;
    } catch {
      return initialLibrary;
    }
  });

  const [settings, setSettings] = useState<ClassSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.settings);
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [notes, setNotes] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.notes);
      return saved ? JSON.parse(saved) : [
        { id: '1', text: 'Nhắc cả lớp chuẩn bị vở bài tập Toán cho tiết 3', date: 'Hôm nay', done: false },
        { id: '2', text: 'Kiểm tra đồ dùng học vẽ thứ 5', date: 'Hôm nay', done: true }
      ];
    } catch {
      return [];
    }
  });

  const [currentView, setCurrentView] = useState<ViewTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // Modal visibility states
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [quickPointsStudent, setQuickPointsStudent] = useState<Student | null>(null);
  const [isQuickPointsModalOpen, setIsQuickPointsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCountdownModalOpen, setIsCountdownModalOpen] = useState(false);
  const [isRandomPickerOpen, setIsRandomPickerOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
  const [isTeacherEditModalOpen, setIsTeacherEditModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.students, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.notices, JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.library, JSON.stringify(library));
  }, [library]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(notes));
  }, [notes]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'points' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2400);
  };

  // Helper for computing student growth stages
  const calculateStudentGrowth = (pts: number) => {
    const validPts = Math.max(0, Math.round(pts));
    const progress = Math.min(100, Math.round((validPts / settings.bloomTarget) * 100));
    const flowers = Math.floor(validPts / 5);
    const level: 'Hạt giống' | 'Có nụ hoa' | 'Nở hoa' =
      validPts >= settings.bloomTarget ? 'Nở hoa' : validPts >= 80 ? 'Có nụ hoa' : 'Hạt giống';
    return { points: validPts, progress, flowers, level };
  };

  // Student Point Adjustment Handler
  const handleAddPoints = (id: string | number, pts: number, reason = '') => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const oldPoints = s.points;
          const newPoints = Math.max(0, oldPoints + pts);
          const growth = calculateStudentGrowth(newPoints);

          if (settings.enableSound) {
            if (newPoints >= settings.bloomTarget && oldPoints < settings.bloomTarget) {
              playBloomCelebrationSound();
              confetti({
                particleCount: 100,
                spread: 80,
                origin: { y: 0.6 }
              });
            } else if (pts > 0) {
              playPointAwardSound();
            } else if (pts < 0) {
              playPointDeductSound();
            }
          }

          showToast(
            `${pts >= 0 ? '+' : ''}${pts} ${settings.pointUnit} · ${s.name} (${oldPoints} → ${newPoints})`,
            pts >= 0 ? 'points' : 'info'
          );

          return {
            ...s,
            ...growth
          };
        }
        return s;
      })
    );
  };

  // Student Management Handlers
  const handleAddStudent = (name: string, team: string, badge?: string) => {
    const newStudent: Student = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name,
      team,
      badge: badge || '',
      points: 0,
      level: 'Hạt giống',
      progress: 0,
      flowers: 0
    };
    setStudents((prev) => [newStudent, ...prev]);
    showToast(`Đã thêm học sinh ${name} vào ${team}!`);
  };

  const handleSaveEditedStudent = (updated: Partial<Student>) => {
    if (!editingStudent) return;
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === editingStudent.id) {
          const newPts = updated.points !== undefined ? updated.points : s.points;
          const growth = calculateStudentGrowth(newPts);
          return {
            ...s,
            ...updated,
            ...growth
          };
        }
        return s;
      })
    );
    showToast('Đã cập nhật thông tin học sinh!');
  };

  const handleDeleteStudent = (id: string | number) => {
    const target = students.find((s) => s.id === id);
    if (!target) return;
    if (window.confirm(`Bạn có chắc chắn muốn xóa học sinh "${target.name}" khỏi danh sách lớp?`)) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showToast(`Đã xóa ${target.name}`);
    }
  };

  // Bulk Operations
  const handleBulkAward = () => {
    const input = window.prompt('Nhập số điểm thưởng muốn tặng cho cả lớp:', '5');
    if (input === null) return;
    const pts = parseInt(input, 10);
    if (!Number.isFinite(pts) || pts <= 0) {
      showToast('Vui lòng nhập số điểm hợp lệ', 'error');
      return;
    }

    setStudents((prev) =>
      prev.map((s) => {
        const growth = calculateStudentGrowth(s.points + pts);
        return { ...s, ...growth };
      })
    );
    if (settings.enableSound) playBloomCelebrationSound();
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    showToast(`🎉 Đã tặng +${pts} điểm cho toàn bộ ${students.length} học sinh!`);
  };

  const handleBulkDeduct = () => {
    const input = window.prompt('Nhập số điểm muốn trừ cho cả lớp:', '5');
    if (input === null) return;
    const pts = parseInt(input, 10);
    if (!Number.isFinite(pts) || pts <= 0) {
      showToast('Vui lòng nhập số điểm hợp lệ', 'error');
      return;
    }

    setStudents((prev) =>
      prev.map((s) => {
        const growth = calculateStudentGrowth(Math.max(0, s.points - pts));
        return { ...s, ...growth };
      })
    );
    if (settings.enableSound) playPointDeductSound();
    showToast(`Đã trừ -${pts} điểm đối với cả lớp`);
  };

  // Task Management
  const handleCreateTask = (newTask: {
    name: string;
    points: number;
    due: string;
    assigned_students: (string | number)[];
    category: 'Toán' | 'Tiếng Việt' | 'Khoa học' | 'Rèn luyện' | 'Khác';
  }) => {
    const taskItem: Task = {
      id: Date.now(),
      ...newTask,
      done: false,
      createdAt: new Date().toISOString()
    };
    setTasks((prev) => [taskItem, ...prev]);
    const targetCount =
      newTask.assigned_students.length === 0 || newTask.assigned_students.length === students.length
        ? 'cả lớp'
        : `${newTask.assigned_students.length} học sinh`;
    showToast(`Đã giao nhiệm vụ mới cho ${targetCount}!`);
  };

  const handleCompleteTask = (taskId: string | number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    if (task.done) {
      showToast('Nhiệm vụ này đã được duyệt xong trước đó', 'info');
      return;
    }

    // Mark task done
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: true } : t))
    );

    // Award points to assigned students
    const isAll = !task.assigned_students || task.assigned_students.length === 0 || task.assigned_students.length === students.length;
    const targetIds = isAll
      ? students.map((s) => String(s.id))
      : (task.assigned_students || []).map(String);

    let countAwarded = 0;
    setStudents((prev) =>
      prev.map((s) => {
        if (targetIds.includes(String(s.id))) {
          countAwarded++;
          const growth = calculateStudentGrowth(s.points + task.points);
          return { ...s, ...growth };
        }
        return s;
      })
    );

    if (settings.enableSound) playBloomCelebrationSound();
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    showToast(`🎉 Đã hoàn thành nhiệm vụ · +${task.points} điểm cho ${countAwarded} học sinh!`);
  };

  const handleDeleteTask = (taskId: string | number) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast('Đã xóa nhiệm vụ');
  };

  // Notice & Library
  const handleAddNotice = (notice: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      id: Date.now(),
      ...notice
    };
    setNotices((prev) => [newNotice, ...prev]);
    showToast('Đã đăng thông báo mới cho lớp học!');
  };

  const handleDeleteNotice = (id: string | number) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    showToast('Đã xóa thông báo');
  };

  const handleAddResource = (item: Omit<LibraryItem, 'id'>) => {
    const newItem: LibraryItem = {
      id: Date.now(),
      ...item
    };
    setLibrary((prev) => [newItem, ...prev]);
    showToast('Đã thêm tài liệu học tập vào thư viện!');
  };

  const handleDownloadResource = (item: LibraryItem) => {
    showToast(`Đang tải tài liệu "${item.title}"...`, 'info');
  };

  // Export & Import
  const handleExportCSV = () => {
    const headers = ['Họ và tên', 'Tổ', 'Điểm tích lũy', 'Giai đoạn', 'Số hoa đã nở', 'Chức vụ/Huy hiệu'];
    const rows = students.map((s) => [
      s.name,
      s.team,
      s.points,
      s.level,
      s.flowers,
      s.badge || ''
    ]);

    const csvContent = '\uFEFF' + [headers, ...rows].map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Bao_cao_thi_dua_${settings.className.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Đã xuất báo cáo CSV thành công!');
  };

  const handleExportJSON = () => {
    const backup = {
      version: '2.0',
      timestamp: new Date().toISOString(),
      students,
      tasks,
      notices,
      library,
      settings,
      notes
    };
    const jsonStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `vuon-uom-tri-thuc-backup-${settings.className}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Đã sao lưu dữ liệu lớp học (JSON)!');
  };

  const handleImportJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        if (data.students && Array.isArray(data.students)) setStudents(data.students);
        if (data.tasks && Array.isArray(data.tasks)) setTasks(data.tasks);
        if (data.notices && Array.isArray(data.notices)) setNotices(data.notices);
        if (data.library && Array.isArray(data.library)) setLibrary(data.library);
        if (data.settings) setSettings(data.settings);
        if (data.notes) setNotes(data.notes);
        showToast('Khôi phục dữ liệu từ file JSON thành công!');
      } catch (err) {
        showToast('File JSON không hợp lệ hoặc bị lỗi', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục toàn bộ danh sách lớp và dữ liệu mẫu ban đầu?')) {
      setStudents(initialStudents);
      setTasks(initialTasks);
      setNotices(initialNotices);
      setLibrary(initialLibrary);
      setSettings(defaultSettings);
      showToast('Đã khôi phục dữ liệu mẫu ban đầu!');
    }
  };

  const handleSelectClass = (clsName: string) => {
    setSettings((prev) => ({ ...prev, className: clsName }));
    showToast(`Đã chuyển sang quản lý ${clsName}`);
  };

  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-800 flex flex-col md:flex-row antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        settings={settings}
        isOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
        onOpenEditTeacher={() => setIsTeacherEditModalOpen(true)}
        onOpenSupport={() => setIsSupportModalOpen(true)}
        unreadNoticesCount={notices.length}
        openTasksCount={tasks.filter((t) => !t.done).length}
      />

      {/* Main App Content */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-8">
        {/* Top Header */}
        <Header
          currentView={currentView}
          settings={settings}
          onUpdateSettings={setSettings}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onSelectClass={handleSelectClass}
          onOpenNotices={() => setCurrentView('notices')}
        />

        {/* View Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-7xl w-full mx-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              students={students}
              tasks={tasks}
              notices={notices}
              settings={settings}
              onNavigate={setCurrentView}
              onAddPoints={handleAddPoints}
              onOpenEditStudent={(s) => setEditingStudent(s)}
              onOpenQuickPointsFor={(s) => {
                setQuickPointsStudent(s);
                setIsQuickPointsModalOpen(true);
              }}
              onDeleteStudent={handleDeleteStudent}
              onOpenQuickPoints={() => {
                setQuickPointsStudent(students[0] || null);
                setIsQuickPointsModalOpen(true);
              }}
              onOpenAttendance={() => setIsAttendanceModalOpen(true)}
              onOpenCreateTask={() => setIsTaskModalOpen(true)}
              onOpenLeaderboard={() => setCurrentView('leaderboard')}
              onOpenRandomPicker={() => setIsRandomPickerOpen(true)}
              onOpenCountdown={() => setIsCountdownModalOpen(true)}
              onOpenNotes={() => setIsNotesModalOpen(true)}
              onExportCSV={handleExportCSV}
            />
          )}

          {currentView === 'students' && (
            <StudentsView
              students={students}
              settings={settings}
              onAddStudentClick={() => setIsStudentModalOpen(true)}
              onBulkAward={handleBulkAward}
              onBulkDeduct={handleBulkDeduct}
              onAddPoints={handleAddPoints}
              onOpenEditStudent={(s) => setEditingStudent(s)}
              onOpenQuickPointsFor={(s) => {
                setQuickPointsStudent(s);
                setIsQuickPointsModalOpen(true);
              }}
              onDeleteStudent={handleDeleteStudent}
            />
          )}

          {currentView === 'points' && (
            <PointsView
              students={students}
              settings={settings}
              onAddPoints={handleAddPoints}
              onOpenEditStudent={(s) => setEditingStudent(s)}
              onOpenQuickPointsFor={(s) => {
                setQuickPointsStudent(s);
                setIsQuickPointsModalOpen(true);
              }}
              onDeleteStudent={handleDeleteStudent}
            />
          )}

          {currentView === 'leaderboard' && (
            <LeaderboardView
              students={students}
              settings={settings}
              onOpenQuickPointsFor={(s) => {
                setQuickPointsStudent(s);
                setIsQuickPointsModalOpen(true);
              }}
            />
          )}

          {currentView === 'tasks' && (
            <TasksView
              tasks={tasks}
              students={students}
              onOpenCreateTask={() => setIsTaskModalOpen(true)}
              onCompleteTask={handleCompleteTask}
              onDeleteTask={handleDeleteTask}
            />
          )}

          {currentView === 'library' && (
            <LibraryView
              library={library}
              onOpenAddResource={() => setIsLibraryModalOpen(true)}
              onDownload={handleDownloadResource}
            />
          )}

          {currentView === 'notices' && (
            <NoticesView
              notices={notices}
              onOpenAddNotice={() => setIsNoticeModalOpen(true)}
              onDeleteNotice={handleDeleteNotice}
            />
          )}

          {currentView === 'reports' && (
            <ReportsView
              students={students}
              settings={settings}
              onExportCSV={handleExportCSV}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              settings={settings}
              onSaveSettings={(newSet) => {
                setSettings(newSet);
                showToast('Đã lưu cấu hình cài đặt lớp học!');
              }}
              onResetData={handleResetData}
              onExportJSON={handleExportJSON}
              onImportJSON={handleImportJSON}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 px-2 flex items-center justify-around z-30 shadow-lg">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-bold ${
            currentView === 'dashboard' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <span className="text-lg">🏠</span>
          <span>Trang chủ</span>
        </button>

        <button
          onClick={() => setCurrentView('students')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-bold ${
            currentView === 'students' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <span className="text-lg">👥</span>
          <span>Học sinh</span>
        </button>

        <button
          onClick={() => {
            setQuickPointsStudent(students[0] || null);
            setIsQuickPointsModalOpen(true);
          }}
          className="flex flex-col items-center justify-center -mt-4 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg font-black text-2xl"
          title="Tích điểm nhanh"
        >
          +
        </button>

        <button
          onClick={() => setCurrentView('tasks')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-bold ${
            currentView === 'tasks' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <span className="text-lg">📝</span>
          <span>Nhiệm vụ</span>
        </button>

        <button
          onClick={() => setCurrentView('settings')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-bold ${
            currentView === 'settings' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <span className="text-lg">⚙️</span>
          <span>Cài đặt</span>
        </button>
      </div>

      {/* Modals */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onAddStudent={handleAddStudent}
        existingNames={students.map((s) => s.name)}
      />

      <EditStudentModal
        isOpen={!!editingStudent}
        onClose={() => setEditingStudent(null)}
        student={editingStudent}
        onSave={handleSaveEditedStudent}
      />

      <QuickPointsModal
        isOpen={isQuickPointsModalOpen}
        onClose={() => setIsQuickPointsModalOpen(false)}
        students={students}
        initialStudentId={quickPointsStudent?.id}
        onApplyPoints={handleAddPoints}
      />

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        students={students}
        onCreateTask={handleCreateTask}
      />

      <CountdownModal
        isOpen={isCountdownModalOpen}
        onClose={() => setIsCountdownModalOpen(false)}
        enableSound={settings.enableSound}
      />

      <RandomPickerModal
        isOpen={isRandomPickerOpen}
        onClose={() => setIsRandomPickerOpen(false)}
        students={students}
        onAwardSelected={(id, pts) => handleAddPoints(id, pts, 'Thưởng phát biểu vòng quay')}
        enableSound={settings.enableSound}
      />

      <AttendanceModal
        isOpen={isAttendanceModalOpen}
        onClose={() => setIsAttendanceModalOpen(false)}
        students={students}
        onSaveAttendance={(summary) => showToast(summary)}
      />

      <NotesModal
        isOpen={isNotesModalOpen}
        onClose={() => setIsNotesModalOpen(false)}
        notes={notes}
        onSaveNotes={setNotes}
      />

      <NoticeModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        onAddNotice={handleAddNotice}
        teacherName={settings.teacherName}
      />

      <LibraryModal
        isOpen={isLibraryModalOpen}
        onClose={() => setIsLibraryModalOpen(false)}
        onAddResource={handleAddResource}
      />

      <TeacherEditModal
        isOpen={isTeacherEditModalOpen}
        onClose={() => setIsTeacherEditModalOpen(false)}
        currentName={settings.teacherName}
        onSave={(name) => {
          setSettings((prev) => ({ ...prev, teacherName: name }));
          showToast(`Đã đổi tên giáo viên thành: ${name}`);
        }}
      />

      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />

      {/* Global Toast System */}
      <Toast toasts={toasts} />
    </div>
  );
}
