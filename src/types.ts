export interface Student {
  id: number | string;
  name: string;
  team: string; // "Tổ 1", "Tổ 2", "Tổ 3", "Tổ 4"
  points: number;
  badge?: string; // "Lớp trưởng", "Tổ trưởng", etc.
  level: 'Hạt giống' | 'Có nụ hoa' | 'Nở hoa';
  progress: number; // 0 - 100
  flowers: number; // calculated e.g. Math.floor(points / 5)
  gender?: 'male' | 'female';
  notes?: string;
}

export interface Task {
  id: number | string;
  name: string;
  points: number;
  due: string; // YYYY-MM-DD or readable date
  done: boolean | number;
  assigned_students?: (number | string)[]; // student IDs or empty for all
  createdAt?: string;
  category?: 'Toán' | 'Tiếng Việt' | 'Khoa học' | 'Rèn luyện' | 'Khác';
}

export interface Notice {
  id: number | string;
  title: string;
  content: string;
  date: string;
  author: string;
  important?: boolean;
  tag?: string;
}

export interface LibraryItem {
  id: number | string;
  title: string;
  subject: 'Toán' | 'Tiếng Việt' | 'Khoa học' | 'STEM' | 'Kỹ năng sống';
  type: 'Tài liệu' | 'Bài tập' | 'Giáo án' | 'Trò chơi';
  description: string;
  downloadUrl?: string;
  fileSize?: string;
}

export interface AttendanceRecord {
  studentId: number | string;
  status: 'present' | 'late' | 'excused' | 'unexcused';
}

export interface ClassSettings {
  teacherName: string;
  className: string;
  bloomTarget: number;
  pointUnit: string;
  slogan: string;
  enableSound: boolean;
}

export interface TeacherAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  className: string;
  avatar?: string;
  createdAt?: string;
}

export type ViewTab =
  | 'dashboard'
  | 'students'
  | 'points'
  | 'leaderboard'
  | 'tasks'
  | 'library'
  | 'notices'
  | 'reports'
  | 'settings';
