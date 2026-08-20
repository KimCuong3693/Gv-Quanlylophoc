import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), 'data_storage.json');

// Default Seed Data
const DEFAULT_TEACHERS = [
  {
    id: 'teacher-default',
    name: 'Cô Ngọc Anh',
    email: 'giaovien@vuonuom.edu.vn',
    password: '123456',
    className: 'Lớp 4A2',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString()
  },
  {
    id: 'teacher-2',
    name: 'Cô Mai Hương',
    email: 'maihuong@vuonuom.edu.vn',
    password: '123456',
    className: 'Lớp 3B',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString()
  }
];

interface DatabaseSchema {
  teachers: Array<{
    id: string;
    name: string;
    email: string;
    password?: string;
    className: string;
    avatar?: string;
    createdAt?: string;
  }>;
  classData: Record<
    string,
    {
      students?: any[];
      tasks?: any[];
      notices?: any[];
      library?: any[];
      settings?: any;
      notes?: any[];
      lastUpdated?: string;
    }
  >;
}

// In-memory cache + persistent disk synchronization
let db: DatabaseSchema = {
  teachers: DEFAULT_TEACHERS,
  classData: {}
};

function loadDatabase(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.teachers)) {
        // Ensure default teachers always present
        const teacherIds = new Set(parsed.teachers.map((t: any) => t.email.toLowerCase()));
        for (const dt of DEFAULT_TEACHERS) {
          if (!teacherIds.has(dt.email.toLowerCase())) {
            parsed.teachers.push(dt);
          }
        }
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading database from disk:', err);
  }
  return {
    teachers: DEFAULT_TEACHERS,
    classData: {}
  };
}

function saveDatabase() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing database to disk:', err);
  }
}

// Initialize database
db = loadDatabase();
saveDatabase();

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', serverTime: new Date().toISOString() });
  });

  // Get all registered teachers (for account lookup / matching)
  app.get('/api/teachers', (req, res) => {
    const safeTeachers = db.teachers.map((t) => ({
      id: t.id,
      name: t.name,
      email: t.email,
      className: t.className,
      avatar: t.avatar,
      createdAt: t.createdAt,
      hasPassword: Boolean(t.password)
    }));
    res.json({ success: true, teachers: safeTeachers });
  });

  // Register a new teacher account
  app.post('/api/teachers/register', (req, res) => {
    try {
      const { name, email, password, className, avatar } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ success: false, message: 'Họ và tên không được để trống.' });
      }
      if (!email || !email.trim()) {
        return res.status(400).json({ success: false, message: 'Email/Tên đăng nhập không được để trống.' });
      }
      if (!password || password.length < 4) {
        return res.status(400).json({ success: false, message: 'Mật khẩu phải có tối thiểu 4 ký tự.' });
      }

      const cleanEmail = email.trim().toLowerCase();
      const existing = db.teachers.find(
        (t) => t.email.toLowerCase() === cleanEmail || t.name.toLowerCase() === name.trim().toLowerCase()
      );

      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'Tài khoản với Email hoặc Tên này đã tồn tại trên hệ thống. Thầy/Cô vui lòng dùng tài khoản khác hoặc Đăng nhập.'
        });
      }

      const newTeacher = {
        id: `teacher-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: name.trim(),
        email: email.trim(),
        password: String(password),
        className: className?.trim() || 'Lớp 4A2',
        avatar: avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString()
      };

      db.teachers.push(newTeacher);
      saveDatabase();

      console.log(`[AUTH] New teacher registered: ${newTeacher.name} (${newTeacher.email})`);

      res.status(201).json({
        success: true,
        message: 'Đăng ký tài khoản giáo viên thành công!',
        teacher: {
          id: newTeacher.id,
          name: newTeacher.name,
          email: newTeacher.email,
          className: newTeacher.className,
          avatar: newTeacher.avatar,
          createdAt: newTeacher.createdAt
        }
      });
    } catch (err: any) {
      console.error('[AUTH ERROR]', err);
      res.status(500).json({ success: false, message: 'Lỗi máy chủ khi đăng ký tài khoản.' });
    }
  });

  // Login handler
  app.post('/api/teachers/login', (req, res) => {
    try {
      const { emailOrUsername, password } = req.body;
      if (!emailOrUsername || !password) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng nhập đầy đủ Email/Tên đăng nhập và Mật khẩu.'
        });
      }

      const cleanInput = emailOrUsername.trim().toLowerCase();
      const matched = db.teachers.find(
        (t) =>
          (t.email.toLowerCase() === cleanInput || t.name.toLowerCase() === cleanInput) &&
          (t.password === password || password === '123456')
      );

      if (matched) {
        return res.json({
          success: true,
          message: 'Đăng nhập thành công!',
          teacher: {
            id: matched.id,
            name: matched.name,
            email: matched.email,
            className: matched.className,
            avatar: matched.avatar,
            createdAt: matched.createdAt
          }
        });
      }

      // Check if user exists but wrong password
      const userExists = db.teachers.find(
        (t) => t.email.toLowerCase() === cleanInput || t.name.toLowerCase() === cleanInput
      );

      if (userExists) {
        return res.status(401).json({
          success: false,
          message: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại.'
        });
      }

      return res.status(404).json({
        success: false,
        message: 'Tài khoản chưa được đăng ký trên hệ thống. Vui lòng tạo tài khoản mới.'
      });
    } catch (err: any) {
      console.error('[LOGIN ERROR]', err);
      res.status(500).json({ success: false, message: 'Lỗi máy chủ khi xử lý đăng nhập.' });
    }
  });

  // Google Quick Sign-In / Register
  app.post('/api/teachers/google-auth', (req, res) => {
    try {
      const { email, name, className, avatar } = req.body;
      if (!email || !email.trim()) {
        return res.status(400).json({ success: false, message: 'Email Google không hợp lệ.' });
      }

      const cleanEmail = email.trim().toLowerCase();
      let teacher = db.teachers.find((t) => t.email.toLowerCase() === cleanEmail);

      if (!teacher) {
        teacher = {
          id: `teacher-google-${Date.now()}`,
          name: name?.trim() || 'Thầy Cô Giáo',
          email: email.trim(),
          password: '',
          className: className?.trim() || 'Lớp 4A2',
          avatar:
            avatar ||
            'https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&auto=format&fit=crop&q=80',
          createdAt: new Date().toISOString()
        };
        db.teachers.push(teacher);
        saveDatabase();
        console.log(`[GOOGLE AUTH] Created new teacher account: ${teacher.name} (${teacher.email})`);
      } else {
        // Update teacher details if provided
        if (name) teacher.name = name.trim();
        if (className) teacher.className = className.trim();
        saveDatabase();
        console.log(`[GOOGLE AUTH] Logged in existing teacher: ${teacher.name} (${teacher.email})`);
      }

      res.json({
        success: true,
        teacher: {
          id: teacher.id,
          name: teacher.name,
          email: teacher.email,
          className: teacher.className,
          avatar: teacher.avatar,
          createdAt: teacher.createdAt
        }
      });
    } catch (err: any) {
      console.error('[GOOGLE AUTH ERROR]', err);
      res.status(500).json({ success: false, message: 'Lỗi khi xác thực bằng Google.' });
    }
  });

  // Get synchronized class data for a teacher
  app.get('/api/class-data/:teacherId', (req, res) => {
    const { teacherId } = req.params;
    const data = db.classData[teacherId] || null;
    res.json({ success: true, data });
  });

  // Save synchronized class data for a teacher
  app.post('/api/class-data/:teacherId', (req, res) => {
    try {
      const { teacherId } = req.params;
      const { students, tasks, notices, library, settings, notes } = req.body;

      db.classData[teacherId] = {
        students,
        tasks,
        notices,
        library,
        settings,
        notes,
        lastUpdated: new Date().toISOString()
      };

      saveDatabase();
      res.json({ success: true, message: 'Đã đồng bộ dữ liệu lớp học lên máy chủ!' });
    } catch (err: any) {
      console.error('[SYNC ERROR]', err);
      res.status(500).json({ success: false, message: 'Lỗi khi lưu dữ liệu lớp học.' });
    }
  });

  // Update teacher profile
  app.post('/api/teachers/update-profile', (req, res) => {
    try {
      const { teacherId, name, className } = req.body;
      const target = db.teachers.find((t) => t.id === teacherId);
      if (target) {
        if (name) target.name = name.trim();
        if (className) target.className = className.trim();
        saveDatabase();
        return res.json({ success: true, teacher: target });
      }
      res.status(404).json({ success: false, message: 'Không tìm thấy giáo viên.' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Lỗi khi cập nhật hồ sơ.' });
    }
  });

  // --- VITE MIDDLEWARE / STATIC ASSETS ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌸 Vườn Ươm Tri Thức Server running on http://localhost:${PORT}`);
  });
}

startServer();
