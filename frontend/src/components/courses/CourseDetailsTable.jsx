import React, { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CourseDetailsTable({ t, searchQuery }) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const courses = [
    {
      id: 1,
      title: "Digital Marketing Mastery",
      level: "beginner",
      modules: "12 Modules",
      duration: "8h 45m",
      purchasedOn: "18 May 2025",
      status: "inProgress",
      iconTheme: "bg-indigo-600 text-white"
    },
    {
      id: 2,
      title: "Social Media Marketing Secrets",
      level: "intermediate",
      modules: "10 Modules",
      duration: "6h 20m",
      purchasedOn: "10 May 2025",
      status: "completed",
      iconTheme: "bg-emerald-500 text-white"
    },
    {
      id: 3,
      title: "Affiliate Marketing Pro",
      level: "advanced",
      modules: "15 Modules",
      duration: "9h 25m",
      purchasedOn: "05 May 2025",
      status: "notStarted",
      iconTheme: "bg-slate-800 text-white"
    }
  ];

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalEntries = filteredCourses.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage) || 1;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalEntries);
  const paginatedData = filteredCourses.slice(startIndex, endIndex);

  const getLevelStyles = (level) => {
    switch (level) {
      case 'beginner': return 'text-purple-600 font-bold';
      case 'intermediate': return 'text-indigo-600 font-bold';
      case 'advanced': return 'text-blue-600 font-bold';
      default: return 'text-slate-600 font-bold';
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'inProgress': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'notStarted': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group/card transition-all duration-300 hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 flex flex-col">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

      {/* Header Controls */}
      <div className="relative z-10 p-5 lg:p-6 border-b border-indigo-100/60">
        <h3 className="font-bold text-[#1a1446] text-[16px]">{t('myCourses.detailsTitle')}</h3>
      </div>

      <div className="relative z-10 hidden lg:block w-full overflow-x-hidden custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-20 bg-slate-50/90 backdrop-blur-md shadow-sm">
            <tr>
              <th className="px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('myCourses.table.courseName')}</th>
              <th className="px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('myCourses.table.level')}</th>
              <th className="px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('myCourses.table.modules')}</th>
              <th className="px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('myCourses.table.duration')}</th>
              <th className="px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('myCourses.table.purchasedOn')}</th>
              <th className="px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('myCourses.table.status')}</th>
              <th className="px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap text-center">{t('myCourses.table.action')}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((course) => (
              <tr key={course.id} className="group border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.01] hover:z-10 relative transition-all duration-300 cursor-pointer">
                <td className="px-6 py-3 rounded-l-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 ${course.iconTheme}`}>
                      <span className="font-bold text-[16px]">{course.title.charAt(0)}</span>
                    </div>
                    <span className="text-[13px] font-extrabold text-[#1a1446] group-hover:text-[#4f3bf3] transition-colors">{course.title}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-[13px] font-bold">
                  <span className={`${getLevelStyles(course.level)}`}>
                    {t(`myCourses.levels.${course.level}`)}
                  </span>
                </td>
                <td className="px-6 py-3 text-[12px] font-semibold text-slate-600">{course.modules}</td>
                <td className="px-6 py-3 text-[12px] font-semibold text-slate-600">{course.duration}</td>
                <td className="px-6 py-3 text-[12px] font-semibold text-slate-600">{course.purchasedOn}</td>
                <td className="px-6 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border border-white/40 shadow-sm whitespace-nowrap ${getStatusStyles(course.status)}`}>
                    {t(`myCourses.status.${course.status}`)}
                  </span>
                </td>
                <td className="px-6 py-3 text-center rounded-r-xl">
                  <button className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors inline-flex justify-center items-center">
                    <Eye className="w-4.5 h-4.5" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredCourses.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-indigo-400 font-bold">
                  No courses found matching "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (Hidden on desktop) */}
      <div className="block lg:hidden w-full p-4 space-y-4">
        {paginatedData.map((course) => (
          <div key={course.id} className="group p-4 flex flex-col gap-3 bg-white/40 border border-indigo-100/50 rounded-2xl hover:bg-white hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 relative z-10">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 ${course.iconTheme}`}>
                  <span className="font-bold text-[16px]">{course.title.charAt(0)}</span>
                </div>
                <div className="text-[14px] font-bold text-slate-900 group-hover:text-[#4f3bf3] transition-colors leading-tight line-clamp-2 pr-2">{course.title}</div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm shrink-0 border border-white/40 whitespace-nowrap ${getStatusStyles(course.status)}`}>
                {t(`myCourses.status.${course.status}`)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('myCourses.table.level')}</div>
                <div className={`text-[12px] font-bold truncate ${getLevelStyles(course.level)}`}>{t(`myCourses.levels.${course.level}`)}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('myCourses.table.modules')}</div>
                <div className="text-[12px] font-bold text-slate-700 truncate">{course.modules}</div>
              </div>
              <div className="pt-2 mt-2 border-t border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('myCourses.table.duration')}</div>
                <div className="text-[12px] font-bold text-slate-700 truncate">{course.duration}</div>
              </div>
              <div className="pt-2 mt-2 border-t border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('myCourses.table.purchasedOn')}</div>
                <div className="text-[12px] font-bold text-slate-700 truncate">{course.purchasedOn}</div>
              </div>
            </div>
            
            <div className="flex justify-end pt-1">
              <button className="flex items-center justify-center gap-1.5 w-full py-2 text-[12px] font-bold text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors border border-indigo-100 bg-white shadow-sm">
                <Eye className="w-4 h-4" />
                {t('myCourses.actions.viewDetails')}
              </button>
            </div>
          </div>
        ))}
        {filteredCourses.length === 0 && (
          <div className="py-8 text-center text-indigo-400 font-bold">
            No courses found matching "{searchQuery}"
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="p-4 lg:p-6 border-t border-indigo-100/60 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/40 backdrop-blur-md">
        <div className="text-[13px] font-medium text-slate-500 w-full text-center sm:text-left">
          {totalEntries > 0
            ? t('myCourses.table.showing')
                .replace('{{start}}', startIndex + 1)
                .replace('{{end}}', endIndex)
                .replace('{{total}}', totalEntries)
            : 'No entries to show'}
        </div>

        {totalEntries > 0 && (
          <div className="flex items-center justify-between w-full sm:w-auto gap-4 lg:gap-6">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button className="w-8 h-8 rounded-lg bg-[#4f3bf3] text-white font-bold text-[13px] shadow-sm flex items-center justify-center">
                {page}
              </button>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[13px] font-medium text-slate-500 hidden sm:inline-block whitespace-nowrap">{t('myReferrals.table.rowsPerPage')}</span>
              <select
                value={rowsPerPage}
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
                className="border border-slate-200 rounded-lg text-[13px] font-bold text-slate-700 py-1.5 pl-3 pr-8 focus:outline-none focus:border-[#4f3bf3] bg-white cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
