import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const tableData = [
  { id: 1, date: '28 May 2025, 10:45 AM', type: 'Direct Commission', level: 'Direct', from: 'Ravi Verma', amount: '₹ 500.00', status: 'Credited' },
  { id: 2, date: '28 May 2025, 10:30 AM', type: 'Level Commission', level: 'Level 1', from: 'Anita Singh', amount: '₹ 250.00', status: 'Credited' },
  { id: 3, date: '28 May 2025, 09:15 AM', type: 'Level Commission', level: 'Level 2', from: 'Suresh Patel', amount: '₹ 125.00', status: 'Pending' },
  { id: 4, date: '27 May 2025, 06:20 PM', type: 'Direct Commission', level: 'Direct', from: 'Neha Gupta', amount: '₹ 750.00', status: 'Credited' },
  { id: 5, date: '27 May 2025, 04:10 PM', type: 'Level Commission', level: 'Level 1', from: 'Vikram Joshi', amount: '₹ 300.00', status: 'Credited' },
];

export default function RecentCommission({ t, showPagination = false }) {
  return (
    <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col h-full group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />
      <div className="flex justify-between items-center mb-5 relative z-10 p-5 pb-0">
        <h2 className="text-[17px] font-extrabold text-slate-900">{t('earnings.table.recent')}</h2>
        {!showPagination && (
          <button className="flex items-center px-4 py-2 rounded-lg border border-slate-200 text-[12px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            {t('earnings.table.viewAll')}
          </button>
        )}
      </div>

      <div className="hidden lg:block overflow-x-auto w-full relative z-10">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/90 backdrop-blur-md shadow-sm">
            <tr>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.table.date')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.table.type')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.table.level')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.table.from')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.table.amount')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.table.status')}</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="group border-b last:border-b-0 border-indigo-100/30 hover:bg-slate-50/50 hover:shadow-sm hover:-translate-y-0.5 relative transition-all duration-300 cursor-pointer">
                <td className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-[#1a1446] group-hover:text-[#4f3bf3] transition-colors whitespace-nowrap">{row.date}</td>
                <td className="px-3 2xl:px-4 py-4 text-[13px] font-bold text-slate-700 whitespace-nowrap">{row.type}</td>
                <td className="px-3 2xl:px-4 py-4 text-[12px] font-semibold text-slate-600 whitespace-nowrap">{row.level}</td>
                <td className="px-3 2xl:px-4 py-4 text-[12px] font-semibold text-slate-600 whitespace-nowrap">{row.from}</td>
                <td className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-[#1a1446] whitespace-nowrap">{row.amount}</td>
                <td className="px-3 2xl:px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold ${
                    row.status === 'Credited' 
                      ? 'bg-green-100/50 text-green-700 border border-green-200/50' 
                      : 'bg-orange-100/50 text-orange-700 border border-orange-200/50'
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (Hidden on desktop) */}
      <div className="block lg:hidden w-full space-y-4 relative z-10 p-6 pt-0">
        {tableData.map((row) => (
          <div key={row.id} className="group p-4 flex flex-col gap-3 bg-slate-50/50 border border-indigo-100/30 rounded-2xl hover:bg-white hover:shadow-md hover:border-indigo-200 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[14px] font-extrabold text-[#1a1446]">{row.amount}</span>
                <span className="text-[12px] font-bold text-slate-700">{row.type}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-sm ${
                row.status === 'Credited'
                  ? 'bg-green-100/50 text-green-700 border-green-200/50'
                  : 'bg-orange-100/50 text-orange-700 border-orange-200/50'
              }`}>
                {row.status}
              </span>
            </div>
            
            <div className="flex flex-col gap-1.5 mt-2 pt-3 border-t border-slate-200/60">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-slate-500">{t('earnings.table.date')}</span>
                <span className="text-[12px] font-extrabold text-slate-700">{row.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-slate-500">{t('earnings.table.from')}</span>
                <span className="text-[12px] font-semibold text-slate-700">{row.from}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-slate-500">{t('earnings.table.level')}</span>
                <span className="text-[12px] font-semibold text-slate-600">{row.level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showPagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-slate-100 relative z-10 bg-slate-50/50">
          <p className="text-[13px] font-medium text-slate-500">
            {t('earnings.table.showing').replace('{{start}}', '1').replace('{{end}}', '5').replace('{{total}}', '20')}
          </p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors border border-slate-100">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 font-bold text-[13px] transition-colors">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 font-bold text-[13px]">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 font-bold text-[13px]">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 font-bold text-[13px]">
              4
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors border border-slate-100">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
