import { Student, Task, Notice, ClassSettings } from '../types';

export const initialStudents: Student[] = [
  { id: 1, name: 'Học sinh 01', team: 'Tổ 1', points: 0, badge: '', level: 'Hạt giống', progress: 0, flowers: 0 }
];

export const initialTasks: Task[] = [];

export const initialNotices: Notice[] = [];

export const defaultSettings: ClassSettings = {
  teacherName: 'Cô Ngọc Anh',
  className: 'Lớp 4A2',
  bloomTarget: 100,
  pointUnit: 'Điểm',
  slogan: 'Mỗi ngày đến trường là một ngày vui — Tích lũy điểm tốt, rèn luyện chăm ngoan!',
  enableSound: true
};
