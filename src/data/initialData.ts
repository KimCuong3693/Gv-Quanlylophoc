import { Student, Task, Notice, LibraryItem, ClassSettings } from '../types';

export const initialStudents: Student[] = [
  { id: 1, name: 'Nguyễn Hoàng Minh Khang', team: 'Tổ 1', points: 112, badge: 'Lớp trưởng', level: 'Nở hoa', progress: 100, flowers: 22 },
  { id: 2, name: 'Trần Ngọc Bảo An', team: 'Tổ 1', points: 80, badge: 'Tổ trưởng Tổ 1', level: 'Có nụ hoa', progress: 80, flowers: 16 },
  { id: 3, name: 'Lê Gia Huy', team: 'Tổ 1', points: 70, badge: '', level: 'Hạt giống', progress: 70, flowers: 14 },
  { id: 4, name: 'Phạm Quỳnh Chi', team: 'Tổ 1', points: 90, badge: '', level: 'Có nụ hoa', progress: 90, flowers: 18 },
  { id: 5, name: 'Vũ Đức Anh', team: 'Tổ 1', points: 60, badge: '', level: 'Hạt giống', progress: 60, flowers: 12 },
  { id: 6, name: 'Đặng Mai Phương', team: 'Tổ 1', points: 65, badge: '', level: 'Hạt giống', progress: 65, flowers: 13 },
  { id: 7, name: 'Hoàng Nhật Nam', team: 'Tổ 1', points: 50, badge: '', level: 'Hạt giống', progress: 50, flowers: 10 },
  { id: 8, name: 'Bùi Đỗ Thảo Linh', team: 'Tổ 2', points: 75, badge: 'Lớp phó học tập', level: 'Hạt giống', progress: 75, flowers: 15 },
  { id: 9, name: 'Nguyễn Minh Anh', team: 'Tổ 2', points: 58, badge: '', level: 'Hạt giống', progress: 58, flowers: 11 },
  { id: 10, name: 'Phan Tuấn Kiệt', team: 'Tổ 2', points: 46, badge: '', level: 'Hạt giống', progress: 46, flowers: 9 },
  { id: 11, name: 'Đỗ Khánh Linh', team: 'Tổ 2', points: 84, badge: '', level: 'Có nụ hoa', progress: 84, flowers: 16 },
  { id: 12, name: 'Lê Minh Châu', team: 'Tổ 2', points: 67, badge: '', level: 'Hạt giống', progress: 67, flowers: 13 },
  { id: 13, name: 'Nguyễn Gia Bảo', team: 'Tổ 2', points: 72, badge: '', level: 'Hạt giống', progress: 72, flowers: 14 },
  { id: 14, name: 'Trần Hà My', team: 'Tổ 2', points: 95, badge: '', level: 'Có nụ hoa', progress: 95, flowers: 19 },
  { id: 15, name: 'Phạm Đức Minh', team: 'Tổ 3', points: 43, badge: '', level: 'Hạt giống', progress: 43, flowers: 8 },
  { id: 16, name: 'Ngô Mai Anh', team: 'Tổ 3', points: 88, badge: '', level: 'Có nụ hoa', progress: 88, flowers: 17 },
  { id: 17, name: 'Hoàng Gia Hân', team: 'Tổ 3', points: 61, badge: '', level: 'Hạt giống', progress: 61, flowers: 12 },
  { id: 18, name: 'Bùi Minh Đức', team: 'Tổ 3', points: 77, badge: '', level: 'Hạt giống', progress: 77, flowers: 15 },
  { id: 19, name: 'Võ Ngọc Hà', team: 'Tổ 3', points: 69, badge: '', level: 'Hạt giống', progress: 69, flowers: 13 },
  { id: 20, name: 'Lý Anh Quân', team: 'Tổ 3', points: 52, badge: '', level: 'Hạt giống', progress: 52, flowers: 10 },
  { id: 21, name: 'Nguyễn Phương Thảo', team: 'Tổ 3', points: 91, badge: '', level: 'Có nụ hoa', progress: 91, flowers: 18 },
  { id: 22, name: 'Trần Quang Huy', team: 'Tổ 4', points: 49, badge: '', level: 'Hạt giống', progress: 49, flowers: 9 },
  { id: 23, name: 'Phạm Ngọc Mai', team: 'Tổ 4', points: 73, badge: '', level: 'Hạt giống', progress: 73, flowers: 14 },
  { id: 24, name: 'Lê Anh Tú', team: 'Tổ 4', points: 64, badge: '', level: 'Hạt giống', progress: 64, flowers: 12 },
  { id: 25, name: 'Nguyễn Nhật Minh', team: 'Tổ 4', points: 86, badge: '', level: 'Có nụ hoa', progress: 86, flowers: 17 },
  { id: 26, name: 'Đặng Thu Uyên', team: 'Tổ 4', points: 55, badge: '', level: 'Hạt giống', progress: 55, flowers: 11 },
  { id: 27, name: 'Đỗ Minh Khôi', team: 'Tổ 4', points: 78, badge: '', level: 'Hạt giống', progress: 78, flowers: 15 },
  { id: 28, name: 'Trần Minh Thư', team: 'Tổ 4', points: 82, badge: '', level: 'Có nụ hoa', progress: 82, flowers: 16 }
];

export const initialTasks: Task[] = [
  {
    id: 101,
    name: 'Hoàn thành 5 bài toán ôn tập cuối tuần',
    points: 10,
    due: '2026-08-25',
    done: false,
    assigned_students: [1, 2, 4, 8, 11, 14, 16, 21, 25, 28],
    category: 'Toán'
  },
  {
    id: 102,
    name: 'Đọc diễn cảm bài tập đọc tuần 34 và ghi âm',
    points: 15,
    due: '2026-08-26',
    done: false,
    assigned_students: [], // all students
    category: 'Tiếng Việt'
  },
  {
    id: 103,
    name: 'Thực hiện 1 việc tốt giúp đỡ bố mẹ / bạn bè',
    points: 5,
    due: '2026-08-27',
    done: true,
    assigned_students: [],
    category: 'Rèn luyện'
  }
];

export const initialNotices: Notice[] = [
  {
    id: 201,
    title: 'Lịch kiểm tra đánh giá định kỳ cuối học kỳ',
    content: 'Thứ Ba (Toán), Thứ Năm (Tiếng Việt). Các em ôn tập kỹ theo đề cương đã phát và chuẩn bị đầy đủ dụng cụ học tập.',
    date: '18/05/2024',
    author: 'Cô Ngọc Anh',
    important: true,
    tag: 'Kiểm tra'
  },
  {
    id: 202,
    title: 'Phát động tuần lễ thi đua “Hoa Điểm Mười Dâng Thầy Cô”',
    content: 'Mỗi điểm 10 trong tuần sẽ được thưởng thêm 5 bông hoa trên Vườn Ươm Tri Thức. Tổ dẫn đầu sẽ nhận cúp luân lưu!',
    date: '16/05/2024',
    author: 'Ban Thi Đua Lớp 4A2',
    important: false,
    tag: 'Thi đua'
  },
  {
    id: 203,
    title: 'Nhắc nhở nộp phiếu đăng ký tham gia CLB STEM',
    content: 'Hạn cuối vào thứ Sáu tuần này. Phụ huynh vui lòng ký xác nhận vào phiếu gửi về cho giáo viên chủ nhiệm.',
    date: '14/05/2024',
    author: 'Cô Ngọc Anh',
    important: false,
    tag: 'Hoạt động'
  }
];

export const initialLibrary: LibraryItem[] = [
  {
    id: 301,
    title: 'Tổng hợp phiếu bài tập Toán lớp 4 - Dạng toán tìm hai số khi biết Tổng và Tỉ số',
    subject: 'Toán',
    type: 'Bài tập',
    description: '15 bài toán mẫu kèm lời giải chi tiết, phân dạng từ cơ bản đến nâng cao.',
    fileSize: '1.2 MB'
  },
  {
    id: 302,
    title: 'Cẩm nang 50 bài văn miêu tả cây cối và loài vật hay nhất',
    subject: 'Tiếng Việt',
    type: 'Tài liệu',
    description: 'Tài liệu bồi dưỡng cảm thụ văn học, tuyển chọn các bài viết đạt điểm cao của học sinh tiểu học.',
    fileSize: '2.5 MB'
  },
  {
    id: 303,
    title: 'Bộ thẻ trò chơi khám phá thế giới Tự Nhiên & Khoa Học',
    subject: 'Khoa học',
    type: 'Trò chơi',
    description: '30 câu đố khoa học vui về thực vật, động vật và vòng tuần hoàn của nước.',
    fileSize: '4.8 MB'
  },
  {
    id: 304,
    title: 'Dự án STEM: Tự làm mô hình máy lọc nước mini',
    subject: 'STEM',
    type: 'Giáo án',
    description: 'Hướng dẫn từng bước dành cho học sinh thực hành nhóm với các vật liệu tái chế.',
    fileSize: '3.1 MB'
  },
  {
    id: 305,
    title: 'Kỹ năng phòng chống đuối nước và an toàn mùa hè cho học sinh',
    subject: 'Kỹ năng sống',
    type: 'Tài liệu',
    description: 'Infographic sinh động, trực quan giúp các em ghi nhớ 6 nguyên tắc vàng bảo vệ bản thân.',
    fileSize: '1.8 MB'
  }
];

export const defaultSettings: ClassSettings = {
  teacherName: 'Cô Ngọc Anh',
  className: 'Lớp 4A2',
  bloomTarget: 100,
  pointUnit: 'điểm',
  slogan: '“Mỗi việc tốt gieo xuống hôm nay là một đóa hoa rực rỡ ngày mai.”',
  enableSound: true
};
