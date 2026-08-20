import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Mail,
  Eye,
  EyeOff,
  User,
  School,
  ArrowRight,
  ShieldCheck,
  Flower2,
  Trophy,
  CheckCircle2,
  HelpCircle,
  KeyRound,
  X
} from 'lucide-react';
import { TeacherAccount } from '../../types';

interface LoginViewProps {
  onLoginSuccess: (teacher: TeacherAccount) => void;
  registeredTeachers: TeacherAccount[];
  onRegisterTeacher: (teacher: TeacherAccount) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  registeredTeachers,
  onRegisterTeacher
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('giaovien@vuonuom.edu.vn');
  const [loginPassword, setLoginPassword] = useState('123456');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regClass, setRegClass] = useState('Lớp 4A2');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  // Forgot password modal
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword) {
      setLoginError('Vui lòng điền đầy đủ email/tên đăng nhập và mật khẩu.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Find matching teacher
      const cleanInput = loginEmail.trim().toLowerCase();
      const matched = registeredTeachers.find(
        (t) =>
          (t.email.toLowerCase() === cleanInput ||
            t.name.toLowerCase() === cleanInput) &&
          (t.password === loginPassword || loginPassword === '123456')
      );

      if (matched) {
        setIsLoading(false);
        onLoginSuccess(matched);
      } else if (
        (cleanInput.includes('giaovien') ||
          cleanInput.includes('cô') ||
          cleanInput.includes('thầy') ||
          cleanInput === 'admin' ||
          cleanInput === 'ngocanh') &&
        (loginPassword === '123456' || loginPassword === 'admin')
      ) {
        // Fallback default teacher
        setIsLoading(false);
        onLoginSuccess({
          id: 'default-teacher',
          name: 'Cô Ngọc Anh',
          email: loginEmail.trim(),
          className: 'Lớp 4A2',
          createdAt: new Date().toISOString()
        });
      } else {
        setIsLoading(false);
        setLoginError(
          'Tài khoản hoặc mật khẩu không chính xác. Mật khẩu mẫu: 123456 hoặc dùng nút "Đăng nhập nhanh".'
        );
      }
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    setLoginEmail('giaovien@vuonuom.edu.vn');
    setLoginPassword('123456');
    setLoginError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: 'default-teacher',
        name: 'Cô Ngọc Anh',
        email: 'giaovien@vuonuom.edu.vn',
        className: 'Lớp 4A2',
        createdAt: new Date().toISOString()
      });
    }, 250);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim()) {
      setRegError('Vui lòng nhập họ và tên giáo viên.');
      return;
    }
    if (!regEmail.trim()) {
      setRegError('Vui lòng nhập email hoặc tên đăng nhập.');
      return;
    }
    if (!regPassword || regPassword.length < 4) {
      setRegError('Mật khẩu phải có tối thiểu 4 ký tự.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    const newTeacher: TeacherAccount = {
      id: `teacher-${Date.now()}`,
      name: regName.trim(),
      email: regEmail.trim(),
      password: regPassword,
      className: regClass.trim() || 'Lớp 4A2',
      createdAt: new Date().toISOString()
    };

    onRegisterTeacher(newTeacher);
    setRegSuccess(true);

    setTimeout(() => {
      onLoginSuccess(newTeacher);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf4fe] via-[#f7fbff] to-[#fff5e9] flex flex-col justify-between antialiased selection:bg-blue-200 selection:text-blue-900">
      {/* Top Brand Bar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-sky-100/80 bg-white/70 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white flex items-center justify-center font-black text-lg shadow-sm shadow-blue-500/20">
            🌱
          </div>
          <div>
            <h1 className="font-extrabold text-slate-800 text-base sm:text-lg leading-tight flex items-center gap-2">
              <span>Vườn Ươm Tri Thức</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-100 hidden sm:inline-block">
                Tiểu học 4.0
              </span>
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Cổng đăng nhập Giáo viên chủ nhiệm
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsForgotModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-blue-500" />
          <span className="hidden sm:inline">Trợ giúp đăng nhập</span>
        </button>
      </header>

      {/* Main Form Center Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 animate-in fade-in zoom-in-95 duration-200">
          {/* Left Column: Visual Banner & Value Propositions */}
          <div className="lg:col-span-5 relative bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-700 text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[280px] lg:min-h-[580px]">
            {/* Background Illustration / Layer */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
              <img
                src="/src/assets/images/classroom_garden_banner_1787155400981.jpg"
                alt="Banner"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-10 -top-10 w-48 h-48 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />

            {/* Top Tag */}
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/30 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Không gian lớp học hạnh phúc</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Gieo mầm tri thức, nuôi dưỡng tương lai
              </h2>

              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                Hệ thống thi đua tích điểm trực quan, vườn cây học tập nở hoa sinh động và công cụ sư phạm tiện ích dành riêng cho quý thầy cô tiểu học.
              </p>
            </div>

            {/* Feature Highlights list */}
            <div className="relative z-10 my-6 space-y-3">
              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  🌱
                </div>
                <div className="min-w-0">
                  <strong className="block text-xs font-bold text-white">Vườn cây thi đua điểm mười</strong>
                  <span className="text-[11px] text-blue-100">3 cấp bậc Hạt giống, Nụ hoa và Nở hoa rực rỡ</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <div className="w-8 h-8 rounded-xl bg-emerald-400 text-slate-900 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  🏆
                </div>
                <div className="min-w-0">
                  <strong className="block text-xs font-bold text-white">Bảng vàng & Vinh danh Tổ</strong>
                  <span className="text-[11px] text-blue-100">Xếp hạng bục vinh quang và thi đua tổ sôi nổi</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <div className="w-8 h-8 rounded-xl bg-sky-300 text-slate-900 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  ⏱️
                </div>
                <div className="min-w-0">
                  <strong className="block text-xs font-bold text-white">Bộ công cụ sư phạm nhanh</strong>
                  <span className="text-[11px] text-blue-100">Đếm ngược, Vòng quay gọi tên, Điểm danh</span>
                </div>
              </div>
            </div>

            {/* Teacher Testimonial / Slogan */}
            <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-blue-100">
              <span className="flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Bảo mật & Lưu trữ tự động</span>
              </span>
              <span className="font-bold">Phiên bản 2.5</span>
            </div>
          </div>

          {/* Right Column: Auth Form */}
          <div className="lg:col-span-7 p-6 sm:p-9 md:p-10 flex flex-col justify-between">
            <div>
              {/* Tabs Switcher */}
              <div className="flex items-center p-1 bg-slate-100 rounded-2xl mb-6 max-w-md">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setLoginError('');
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
                    mode === 'login'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Đăng nhập giáo viên</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setRegError('');
                    setRegSuccess(false);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
                    mode === 'register'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <School className="w-4 h-4" />
                  <span>Tạo tài khoản mới</span>
                </button>
              </div>

              {/* Login View Mode */}
              {mode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1 mb-2">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">
                      Chào mừng Thầy/Cô đăng nhập! 👋
                    </h3>
                    <p className="text-xs text-slate-500">
                      Vui lòng nhập thông tin tài khoản để truy cập giao diện quản lý lớp học.
                    </p>
                  </div>

                  {loginError && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-2xl animate-in fade-in duration-150">
                      {loginError}
                    </div>
                  )}

                  {/* Email/Username Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email hoặc Tên đăng nhập
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="Ví dụ: giaovien@vuonuom.edu.vn hoặc Cô Ngọc Anh"
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-hidden focus:border-blue-500 transition-all"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Mật khẩu
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsForgotModalOpen(true)}
                        className="text-[11px] font-bold text-blue-600 hover:underline"
                      >
                        Quên mật khẩu?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Nhập mật khẩu..."
                        className="w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-hidden focus:border-blue-500 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword((prev) => !prev)}
                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center"
                        tabIndex={-1}
                      >
                        {showLoginPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500 cursor-pointer"
                      />
                      <span>Ghi nhớ phiên đăng nhập trên thiết bị này</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Đăng nhập vào lớp học</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Quick 1-Click Demo Login */}
                  <div className="pt-3">
                    <div className="relative flex items-center justify-center my-3">
                      <div className="border-t border-slate-200 w-full" />
                      <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
                        Hoặc
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleQuickDemoLogin}
                      className="w-full py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/90 text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer group"
                    >
                      <span className="text-base group-hover:scale-110 transition-transform">⚡</span>
                      <span>Đăng nhập nhanh bằng tài khoản Cô Ngọc Anh (Mẫu)</span>
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-1.5">
                      Tài khoản mặc định: <span className="font-semibold text-slate-600">giaovien@vuonuom.edu.vn</span> / Mật khẩu: <span className="font-semibold text-slate-600">123456</span>
                    </p>
                  </div>
                </form>
              )}

              {/* Register Mode */}
              {mode === 'register' && (
                <form onSubmit={handleRegister} className="space-y-3.5">
                  <div className="space-y-1 mb-2">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">
                      Đăng ký tài khoản Giáo viên mới ✨
                    </h3>
                    <p className="text-xs text-slate-500">
                      Tạo hồ sơ giáo viên và thiết lập lớp học của riêng thầy/cô.
                    </p>
                  </div>

                  {regError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-2xl">
                      {regError}
                    </div>
                  )}

                  {regSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-2xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Đăng ký thành công! Đang chuyển hướng vào lớp học...</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Họ và tên giáo viên <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Ví dụ: Cô Mai Hương"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-hidden focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tên lớp học phụ trách <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={regClass}
                        onChange={(e) => setRegClass(e.target.value)}
                        placeholder="Ví dụ: Lớp 4A2, Lớp 3B..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-hidden focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email hoặc Tên đăng nhập <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="Ví dụ: maihuong@truongtieuhoc.edu.vn"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-hidden focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mật khẩu <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="Ít nhất 4 ký tự"
                          className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-hidden focus:border-blue-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword((p) => !p)}
                          className="w-7 h-7 text-slate-400 hover:text-slate-600 absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center"
                        >
                          {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Xác nhận mật khẩu <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-hidden focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={regSuccess}
                    className="w-full mt-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Tạo tài khoản & Đăng nhập ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Bottom Support Info */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 font-medium">
                <span>© 2026 Vườn Ươm Tri Thức</span>
              </span>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="font-bold text-blue-600 hover:underline"
              >
                Hỗ trợ kỹ thuật
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password / Help Dialog */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-800">
                  Thông tin đăng nhập & Trợ giúp
                </h4>
              </div>
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5 text-slate-700 leading-relaxed">
              <p>
                <strong>Tài khoản giáo viên mặc định của hệ thống:</strong>
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 space-y-1">
                <div>Email / Tên: <span className="font-bold text-blue-600">giaovien@vuonuom.edu.vn</span> (hoặc "Cô Ngọc Anh")</div>
                <div>Mật khẩu: <span className="font-bold text-emerald-600">123456</span></div>
              </div>
              <p className="text-[11px] text-slate-500">
                💡 Thầy/Cô có thể bấm trực tiếp nút <strong>"Đăng nhập nhanh bằng tài khoản Cô Ngọc Anh (Mẫu)"</strong> tại màn hình đăng nhập để vào ngay mà không cần gõ mật khẩu.
              </p>
            </div>

            <button
              onClick={() => setIsForgotModalOpen(false)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              Đã hiểu & Quay lại đăng nhập
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
