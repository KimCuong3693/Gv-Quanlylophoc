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
    // Graceful offline fallback
    return [];
  }
}

export async function loginTeacherAPI(
  emailOrUsername: string,
  password?: string
): Promise<{ success: boolean; teacher?: TeacherAccount; message?: string; networkError?: boolean }> {
  try {
    const res = await fetch('/api/teachers/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrUsername, password })
    });
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        const errData = await res.json().catch(() => null);
        return { success: false, message: errData?.message || 'Tài khoản hoặc mật khẩu không chính xác.' };
      }
      return { success: false, networkError: true };
    }
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, networkError: true };
  }
}

export async function registerTeacherAPI(teacherData: {
  name: string;
  email: string;
  password?: string;
  className: string;
  avatar?: string;
}): Promise<{ success: boolean; teacher?: TeacherAccount; message?: string; conflict?: boolean; networkError?: boolean }> {
  try {
    const res = await fetch('/api/teachers/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherData)
    });
    if (res.status === 409) {
      const errData = await res.json().catch(() => null);
      return {
        success: false,
        conflict: true,
        message: errData?.message || 'Tài khoản với Email hoặc Tên này đã tồn tại trên hệ thống.'
      };
    }
    if (!res.ok) {
      return { success: false, networkError: true };
    }
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, networkError: true };
  }
}

export async function googleAuthAPI(payload: {
  email: string;
  name: string;
  className: string;
  avatar?: string;
}): Promise<{ success: boolean; teacher?: TeacherAccount; message?: string; networkError?: boolean }> {
  try {
    const res = await fetch('/api/teachers/google-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      return { success: false, networkError: true };
    }
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, networkError: true };
  }
}

export async function loadTeacherClassData(teacherId: string): Promise<Partial<ClassPayload> | null> {
  try {
    const res = await fetch(`/api/class-data/${encodeURIComponent(teacherId)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (err) {
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
    return false;
  }
}

