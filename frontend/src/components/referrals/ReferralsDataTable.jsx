import React, { useState } from 'react';
import { Search, Download, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export default function ReferralsDataTable({ t }) {
  const [filter, setFilter] = useState('today'); // 'today', 'week', 'month', 'custom'

  // Dummy data matching the mockup
  const data = [
    { id: 'USR10021', name: 'Rohit Verma', package: 'Silver Package', date: '06 May 2025', status: 'Active', level: 'Level 1', img: 'https://ui-avatars.com/api/?name=Rohit+Verma' },
    { id: 'USR10022', name: 'Sneha Patel', package: 'Gold Package', date: '05 May 2025', status: 'Active', level: 'Level 1', img: 'https://ui-avatars.com/api/?name=Sneha+Patel' },
    { id: 'USR10023', name: 'Aman Kumar', package: 'Silver Package', date: '04 May 2025', status: 'Pending', level: 'Level 2', img: 'https://ui-avatars.com/api/?name=Aman+Kumar' },
    { id: 'USR10024', name: 'Neha Singh', package: 'Diamond Package', date: '03 May 2025', status: 'Active', level: 'Level 2', img: 'https://ui-avatars.com/api/?name=Neha+Singh' },
    { id: 'USR10025', name: 'Vikram Sharma', package: 'Silver Package', date: '02 May 2025', status: 'Active', level: 'Level 1', img: 'https://ui-avatars.com/api/?name=Vikram+Sharma' }
  ];

  const getStatusStyle = (status) => {
    return status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600';
  };

  const getLevelStyle = (level) => {
    return level === 'Level 1' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600';
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group/card transition-all duration-300 hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

      {/* Table Header Controls */}
      <div className="relative z-10 p-5 lg:p-6 border-b border-indigo-100/60 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <h3 className="font-bold text-[#1a1446] text-[16px]">{t('myReferrals.title')}</h3>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full xl:w-auto">
          {/* Time Filters */}
          <div className="flex items-center p-1.5 bg-white/60 backdrop-blur-md border border-indigo-100/50 rounded-xl w-full lg:w-auto overflow-x-auto shrink-0 shadow-sm [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {['today', 'week', 'month', 'customDate'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-bold whitespace-nowrap transition-all duration-300 ${filter === f ? 'bg-[#4f3bf3] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5' : 'text-indigo-900/60 hover:text-[#4f3bf3] hover:bg-white hover:shadow-sm hover:-translate-y-0.5'}`}
              >
                {t(`myReferrals.table.${f}`)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto group/controls">
            {/* Search */}
            <div className="relative flex-1 lg:w-[250px] lg:focus-within:w-[300px] transition-all duration-300">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 group-focus-within/controls:text-[#4f3bf3] transition-colors" />
              <input
                type="text"
                placeholder={t('myReferrals.table.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 bg-white/60 backdrop-blur-md border border-indigo-100/60 rounded-xl text-[13px] font-medium placeholder:text-indigo-300 focus:outline-none focus:bg-white focus:border-[#4f3bf3] focus:ring-2 focus:ring-[#4f3bf3]/20 focus:shadow-md hover:border-indigo-300 transition-all duration-300"
              />
            </div>

            {/* Export */}
            <button className="flex items-center gap-2 px-4 py-2 border border-indigo-200 text-[#4f3bf3] bg-white/60 backdrop-blur-md hover:bg-[#4f3bf3] hover:text-white hover:shadow-md hover:-translate-y-0.5 rounded-xl text-[13px] font-bold transition-all duration-300 shrink-0 group/export">
              <Download className="w-4 h-4 group-hover/export:-translate-y-0.5 transition-transform" />
              <span className="hidden sm:block">{t('myReferrals.table.export')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table (Hidden on mobile) */}
      <div className="relative z-10 hidden lg:block w-full overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-indigo-100/60">
              <th className="px-6 py-4 text-[12px] font-extrabold text-indigo-900/50 uppercase tracking-wider">{t('myReferrals.table.profile')}</th>
              <th className="px-6 py-4 text-[12px] font-extrabold text-indigo-900/50 uppercase tracking-wider">{t('myReferrals.table.userId')}</th>
              <th className="px-6 py-4 text-[12px] font-extrabold text-indigo-900/50 uppercase tracking-wider">{t('myReferrals.table.name')}</th>
              <th className="px-6 py-4 text-[12px] font-extrabold text-indigo-900/50 uppercase tracking-wider">{t('myReferrals.table.package')}</th>
              <th className="px-6 py-4 text-[12px] font-extrabold text-indigo-900/50 uppercase tracking-wider">{t('myReferrals.table.registrationDate')}</th>
              <th className="px-6 py-4 text-[12px] font-extrabold text-indigo-900/50 uppercase tracking-wider">{t('myReferrals.table.status')}</th>
              <th className="px-6 py-4 text-[12px] font-extrabold text-indigo-900/50 uppercase tracking-wider">{t('myReferrals.table.referralLevel')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="group border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.01] hover:z-10 relative transition-all duration-300 cursor-pointer">
                <td className="px-6 py-3 rounded-l-xl">
                  <img src={row.img} alt="Avatar" className="w-8 h-8 rounded-full border border-indigo-200 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md" />
                </td>
                <td className="px-6 py-3 text-[13px] font-extrabold text-[#1a1446] group-hover:text-[#4f3bf3] transition-colors">{row.id}</td>
                <td className="px-6 py-3 text-[13px] font-bold text-slate-700">{row.name}</td>
                <td className="px-6 py-3 text-[12px] font-semibold text-slate-600">{row.package}</td>
                <td className="px-6 py-3 text-[12px] font-semibold text-slate-600">{row.date}</td>
                <td className="px-6 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border border-white/40 shadow-sm ${getStatusStyle(row.status)}`}>{row.status}</span>
                </td>
                <td className="px-6 py-3 rounded-r-xl">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border border-white/40 shadow-sm ${getLevelStyle(row.level)}`}>{row.level}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (Hidden on desktop) */}
      <div className="block lg:hidden w-full p-4 space-y-4">
        {data.map((row, idx) => (
          <div key={idx} className="group p-4 flex flex-col gap-3 bg-white/40 border border-indigo-100/50 rounded-2xl hover:bg-white hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={row.img} alt="Avatar" className="w-10 h-10 rounded-full border border-indigo-200 shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <div className="text-[14px] font-bold text-slate-900 group-hover:text-[#4f3bf3] transition-colors">{row.name}</div>
                  <div className="text-[12px] font-extrabold text-indigo-900/60">{row.id}</div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm shrink-0 border border-white/40 ${getStatusStyle(row.status)}`}>{row.status}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('myReferrals.table.package')}</div>
                <div className="text-[12px] font-bold text-slate-700 truncate">{row.package}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('myReferrals.table.registrationDate')}</div>
                <div className="text-[12px] font-bold text-slate-700 truncate">{row.date}</div>
              </div>
              <div className="col-span-2 pt-2 mt-2 border-t border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('myReferrals.table.referralLevel')}</div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-block ${getLevelStyle(row.level)}`}>{row.level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="p-4 lg:p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[13px] font-medium text-slate-500 w-full text-center sm:text-left">
          {t('myReferrals.table.showingEntries').replace('{start}', '1').replace('{end}', '5').replace('{total}', '128')}
        </div>

        <div className="flex items-center gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full sm:w-auto pb-1 sm:pb-0">
          <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors shrink-0">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors shrink-0">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg bg-[#4f3bf3] text-white font-bold text-[13px] shadow-sm flex items-center justify-center shrink-0">1</button>
          <button className="w-8 h-8 rounded-lg bg-transparent text-slate-600 hover:bg-slate-50 font-bold text-[13px] flex items-center justify-center shrink-0">2</button>
          <button className="w-8 h-8 rounded-lg bg-transparent text-slate-600 hover:bg-slate-50 font-bold text-[13px] flex items-center justify-center shrink-0">3</button>
          <div className="w-8 h-8 flex items-center justify-center text-slate-400 shrink-0"><MoreHorizontal className="w-4 h-4" /></div>
          <button className="w-8 h-8 rounded-lg bg-transparent text-slate-600 hover:bg-slate-50 font-bold text-[13px] flex items-center justify-center shrink-0">26</button>
          <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shrink-0">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shrink-0">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <select className="border border-slate-200 rounded-lg text-[13px] font-bold text-slate-700 py-1.5 pl-3 pr-8 focus:outline-none focus:border-[#4f3bf3]">
            <option>5 / page</option>
            <option>10 / page</option>
            <option>20 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
