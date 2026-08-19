import React from 'react';
import { BarChart3, Download, Users, Award, Trophy, Flower2, TrendingUp } from 'lucide-react';
import { Student, ClassSettings } from '../../types';

interface ReportsViewProps {
  students: Student[];
  settings: ClassSettings;
  onExportCSV: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  students,
  settings,
  onExportCSV
}) => {
  const total = students.length;
  const totalPoints = students.reduce((sum, s) => sum + s.points, 0);
  const avg = total > 0 ? Math.round(totalPoints / total) : 0;
  const sorted = [...students].sort((a, b) => b.points - a.points);
  const topStudent = sorted[0];
  const lowestStudent = sorted[sorted.length - 1];

  const excellentCount = students.filter((s) => s.points >= 80).length;
  const goodCount = students.filter((s) => s.points >= 60 && s.points < 80).length;
  const needImproveCount = students.filter((s) => s.points < 60).length;
  const totalFlowers = students.reduce((sum, s) => sum + s.flowers, 0);

  // Teams breakdown
  const teamStats = ['Tổ 1', 'Tổ 2', 'Tổ 3', 'Tổ 4'].map((tName) => {
    const members = students.filter((s) => s.team === tName);
    const pts = members.reduce((sum, s) => sum + s.points, 0);
    const avgPts = members.length ? Math.round(pts / members.length) : 0;
    const flws = members.reduce((sum, s) => sum + s.flowers, 0);
    return { name: tName, count: members.length, points: pts, avgPoints: avgPts, flowers: flws };
  });

  return (
    <div className="space-y-5">
      {/* Top Overview Bar */}
      <div className="bg-white rounded-2xl border border-[#e7edf4] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Báo cáo & Thống kê chất lượng lớp học</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tổng hợp dữ liệu thi đua, mức độ tăng trưởng và kết quả học tập của lớp {settings.className}
          </p>
        </div>

        <button
          onClick={onExportCSV}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Xuất báo cáo (CSV/Excel)</span>
        </button>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-[#e7edf4] shadow-2xs">
          <span className="text-xs text-slate-500 font-semibold block">Sĩ số lớp học</span>
          <strong className="text-2xl font-black text-slate-800 mt-1 block">{total} học sinh</strong>
          <span className="text-[11px] text-blue-600 font-medium">100% tham gia thi đua</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e7edf4] shadow-2xs">
          <span className="text-xs text-slate-500 font-semibold block">Điểm trung bình lớp</span>
          <strong className="text-2xl font-black text-blue-600 mt-1 block">{avg} điểm</strong>
          <span className="text-[11px] text-emerald-600 font-medium">Mục tiêu: {settings.bloomTarget} điểm</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e7edf4] shadow-2xs">
          <span className="text-xs text-slate-500 font-semibold block">Điểm cao nhất</span>
          <strong className="text-2xl font-black text-amber-600 mt-1 block">{topStudent?.points || 0} ⭐</strong>
          <span className="text-[11px] text-slate-600 font-medium truncate block">{topStudent?.name}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e7edf4] shadow-2xs">
          <span className="text-xs text-slate-500 font-semibold block">Tổng hoa đã nở</span>
          <strong className="text-2xl font-black text-emerald-600 mt-1 block">{totalFlowers} 🌼</strong>
          <span className="text-[11px] text-emerald-700 font-medium">Vườn ươm phong phú</span>
        </div>
      </div>

      {/* Two columns: Growth distribution & Team comparisons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Growth Distribution */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#e7edf4] p-5 shadow-xs">
          <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>Phân loại mức độ rèn luyện</span>
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-emerald-700">🌸 Xuất sắc / Có nụ hoa & Nở hoa (≥80 điểm)</span>
                <span className="text-slate-700">{excellentCount} em ({total ? Math.round((excellentCount / total) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${total ? (excellentCount / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-blue-700">🌱 Tiến bộ tốt (60 - 79 điểm)</span>
                <span className="text-slate-700">{goodCount} em ({total ? Math.round((goodCount / total) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${total ? (goodCount / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-amber-700">🌾 Cần cố gắng thêm (&lt;60 điểm)</span>
                <span className="text-slate-700">{needImproveCount} em ({total ? Math.round((needImproveCount / total) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${total ? (needImproveCount / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Team Performance Table */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#e7edf4] p-5 shadow-xs">
          <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" />
            <span>Thống kê theo Tổ học tập</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold">
                  <th className="pb-2">Tổ</th>
                  <th className="pb-2">Sĩ số</th>
                  <th className="pb-2">Tổng điểm</th>
                  <th className="pb-2">Trung bình</th>
                  <th className="pb-2">Tổng hoa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {teamStats.map((t) => (
                  <tr key={t.name} className="hover:bg-slate-50/50">
                    <td className="py-2.5 font-bold text-slate-900">{t.name}</td>
                    <td className="py-2.5">{t.count} em</td>
                    <td className="py-2.5 text-blue-600 font-bold">{t.points} ⭐</td>
                    <td className="py-2.5 text-slate-800">{t.avgPoints} đ/em</td>
                    <td className="py-2.5 text-amber-700">{t.flowers} 🌼</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
