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
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] hover:border-indigo-300 transition-all duration-300 overflow-hidden group/card">
      
      {/* Table Header Controls */}
      <div className="p-5 lg:p-6 border-b border-slate-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <h3 className="font-bold text-[#1a1446] text-[16px]">{t('myReferrals.title')}</h3>
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full xl:w-auto">
          {/* Time Filters */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl w-full lg:w-auto overflow-x-auto custom-scrollbar shrink-0">
            {['today', 'week', 'month', 'customDate'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-[13px] font-bold whitespace-nowrap transition-all ${filter === f ? 'bg-[#4f3bf3] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
              >
                {t(`myReferrals.table.${f}`)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 lg:w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={t('myReferrals.table.searchPlaceholder')}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all"
              />
            </div>
            
            {/* Export */}
            <button className="flex items-center gap-2 px-4 py-2.5 border border-indigo-200 text-[#4f3bf3] bg-indigo-50 hover:bg-[#4f3bf3] hover:text-white rounded-xl text-[13px] font-bold transition-colors shrink-0">
              <Download className="w-4 h-4" />
              <span className="hidden sm:block">{t('myReferrals.table.export')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table (Hidden on mobile) */}
      <div className="hidden lg:block w-full overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">{t('myReferrals.table.profile')}</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">{t('myReferrals.table.userId')}</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">{t('myReferrals.table.name')}</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">{t('myReferrals.table.package')}</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">{t('myReferrals.table.registrationDate')}</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">{t('myReferrals.table.status')}</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">{t('myReferrals.table.referralLevel')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <img src={row.img} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-200" />
                </td>
                <td className="px-6 py-4 text-[13px] font-extrabold text-slate-900">{row.id}</td>
                <td className="px-6 py-4 text-[13px] font-bold text-slate-700">{row.name}</td>
                <td className="px-6 py-4 text-[13px] font-semibold text-slate-500">{row.package}</td>
                <td className="px-6 py-4 text-[13px] font-semibold text-slate-500">{row.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${getStatusStyle(row.status)}`}>{row.status}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${getLevelStyle(row.level)}`}>{row.level}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (Hidden on desktop) */}
      <div className="block lg:hidden w-full divide-y divide-slate-100">
        {data.map((row, idx) => (
          <div key={idx} className="p-4 flex flex-col gap-3 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={row.img} alt="Avatar" className="w-10 h-10 rounded-full border border-slate-200 shrink-0" />
                <div>
                  <div className="text-[14px] font-bold text-slate-900">{row.name}</div>
                  <div className="text-[12px] font-extrabold text-slate-500">{row.id}</div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 ${getStatusStyle(row.status)}`}>{row.status}</span>
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
        
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg bg-[#4f3bf3] text-white font-bold text-[13px] shadow-sm flex items-center justify-center">1</button>
          <button className="w-8 h-8 rounded-lg bg-transparent text-slate-600 hover:bg-slate-50 font-bold text-[13px] flex items-center justify-center">2</button>
          <button className="w-8 h-8 rounded-lg bg-transparent text-slate-600 hover:bg-slate-50 font-bold text-[13px] flex items-center justify-center">3</button>
          <div className="w-8 h-8 flex items-center justify-center text-slate-400"><MoreHorizontal className="w-4 h-4" /></div>
          <button className="w-8 h-8 rounded-lg bg-transparent text-slate-600 hover:bg-slate-50 font-bold text-[13px] flex items-center justify-center">26</button>
          <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
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
