import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


export default function RecentCommission({ t, showPagination = false, loading, commissions }) {
  const recentCommissions = (commissions || []).slice(0, 5);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };

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
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="border-b border-indigo-100/30">
                  <td colSpan="6" className="px-3 py-4">
                    <div className="h-4 bg-slate-100 rounded w-full animate-pulse" />
                  </td>
                </tr>
              ))
            ) : recentCommissions.length > 0 ? (
              recentCommissions.map((row) => (
                <tr key={row.LedgerId} className="group border-b last:border-b-0 border-indigo-100/30 hover:bg-slate-50/50 hover:shadow-sm hover:-translate-y-0.5 relative transition-all duration-300 cursor-pointer">
                  <td className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-[#1a1446] group-hover:text-[#4f3bf3] transition-colors whitespace-nowrap">
                    {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(row.Date))}, {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(row.Date))}
                  </td>
                  <td className="px-3 2xl:px-4 py-4 text-[13px] font-bold text-slate-700 whitespace-nowrap">{row.Type}</td>
                  <td className="px-3 2xl:px-4 py-4 text-[12px] font-semibold text-slate-600 whitespace-nowrap">{row.Level}</td>
                  <td className="px-3 2xl:px-4 py-4 text-[12px] font-semibold text-slate-600 whitespace-nowrap">{row.FromUserName}</td>
                  <td className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-[#1a1446] whitespace-nowrap">{formatCurrency(row.Amount)}</td>
                  <td className="px-3 2xl:px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold ${row.Status === 'Completed' || row.Status === 'Credited'
                        ? 'bg-green-100/50 text-green-700 border border-green-200/50'
                        : 'bg-orange-100/50 text-orange-700 border border-orange-200/50'
                      }`}>
                      {row.Status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-3 py-8 text-center text-[13px] font-semibold text-slate-400">
                  {t('earnings.table.noRecentCommissions')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (Hidden on desktop) */}
      <div className="block lg:hidden w-full space-y-4 relative z-10 p-6 pt-0 mt-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-32 bg-slate-100 animate-pulse rounded-2xl" />
          ))
        ) : recentCommissions.length > 0 ? (
          recentCommissions.map((row) => (
            <div key={row.LedgerId} className="group p-4 flex flex-col gap-3 bg-slate-50/50 border border-indigo-100/30 rounded-2xl hover:bg-white hover:shadow-md hover:border-indigo-200 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-[14px] font-extrabold text-[#1a1446]">{formatCurrency(row.Amount)}</span>
                  <span className="text-[12px] font-bold text-slate-700">{row.Type}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-sm ${row.Status === 'Completed' || row.Status === 'Credited'
                    ? 'bg-green-100/50 text-green-700 border-green-200/50'
                    : 'bg-orange-100/50 text-orange-700 border-orange-200/50'
                  }`}>
                  {row.Status}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 mt-2 pt-3 border-t border-slate-200/60">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-slate-500">{t('earnings.table.date')}</span>
                  <span className="text-[12px] font-extrabold text-slate-700">{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(row.Date))}, {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(row.Date))}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-slate-500">{t('earnings.table.from')}</span>
                  <span className="text-[12px] font-semibold text-slate-700">{row.FromUserName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-slate-500">{t('earnings.table.level')}</span>
                  <span className="text-[12px] font-semibold text-slate-600">{row.Level}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-[13px] font-semibold text-slate-400">
            {t('earnings.table.noRecentCommissions')}
          </div>
        )}
      </div>

      {showPagination && !loading && recentCommissions.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-slate-100 relative z-10 bg-slate-50/50 mt-auto">
          <p className="text-[13px] font-medium text-slate-500">
            {t('earnings.table.showing').replace('{{start}}', '1').replace('{{end}}', recentCommissions.length.toString()).replace('{{total}}', commissions?.length?.toString() || '0')}
          </p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors border border-slate-100">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 font-bold text-[13px] transition-colors">
              1
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
