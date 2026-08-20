import { TeacherAccount, Student, Task, Notice, LibraryItem, ClassSettings } from '../types';

export interface ClassPayload {
  students: Student[];
  tasks: Task[];
  notices: Notice[];
  library: LibraryItem[];
  settings: ClassSettings;
  notes: any[];
}

export async function fetchTeachersList(): Promise<TeacherAccount[]> {
  try {
    const res = await fetch('/api/teachers');
    if (!res.ok) throw new Error('Failed to fetch teachers');
    const data = await res.json();
    return data.teachers || [];
  } catch (err) {
    console.warn('[API] Could not fetch teachers from server, using local fallback:', err);
    return [];
  }
}

export async function loginTeacherAPI(
  emailOrUsername: string,
  password?: string
): Promise<{ success: boolean; teacher?: TeacherAccount; message?: string }> {
  try {
    const res = await fetch('/api/teachers/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrUsername, password })
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error('[API] Login request error:', err);
    return { success: false, message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng.' };
  }
}

export async function registerTeacherAPI(teacherData: {
  name: string;
  email: string;
  password?: string;
  className: string;
  avatar?: string;
}): Promise<{ success: boolean; teacher?: TeacherAccount; message?: string }> {
  try {
    const res = await fetch('/api/teachers/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherData)
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error('[API] Register request error:', err);
    return { success: false, message: 'Không thể kết nối đến máy chủ đăng ký.' };
  }
}

export async function googleAuthAPI(payload: {
  email: string;
  name: string;
  className: string;
  avatar?: string;
}): Promise<{ success: boolean; teacher?: TeacherAccount; message?: string }> {
  try {
    const res = await fetch('/api/teachers/google-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error('[API] Google auth request error:', err);
    return { success: false, message: 'Lỗi khi gửi yêu cầu đăng nhập Google.' };
  }
}

export async function loadTeacherClassData(teacherId: string): Promise<Partial<ClassPayload> | null> {
  try {
    const res = await fetch(`/api/class-data/${encodeURIComponent(teacherId)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (err) {
    console.warn('[API] Failed to load remote class data:', err);
    return null;
  }
}

export async function saveTeacherClassData(teacherId: string, payload: ClassPayload): Promise<boolean> {
  try {
    const res = await fetch(`/api/class-data/${encodeURIComponent(teacherId)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (err) {
    console.warn('[API] Failed to sync class data to server:', err);
    return false;
  }
}
