import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';


export default function CommissionHistoryTable({ t, loading, commissions }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  const allCommissions = commissions || [];
  const totalPages = Math.ceil(allCommissions.length / itemsPerPage) || 1;
  const currentData = allCommissions.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getLevelStyle = (level) => {
    switch(level) {
      case 'Direct': return 'bg-purple-100/80 text-purple-700 border-purple-200/50';
      case 'Level 1': return 'bg-emerald-100/80 text-emerald-700 border-emerald-200/50';
      case 'Level 2': return 'bg-orange-100/80 text-orange-700 border-orange-200/50';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusStyle = (status) => {
    return status === 'Completed' || status === 'Credited' 
      ? 'bg-emerald-100/60 text-emerald-700 border-emerald-200/50'
      : 'bg-orange-100/60 text-orange-700 border-orange-200/50';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };

  const getAvatarColor = (name) => {
    const colors = ['bg-purple-100 text-purple-600', 'bg-emerald-100 text-emerald-600', 'bg-orange-100 text-orange-600', 'bg-blue-100 text-blue-600'];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col h-full mt-6 group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />
      
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto w-full relative z-10 min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/90 backdrop-blur-md shadow-sm">
            <tr>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.history.table.dateTime')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.history.table.userDetails')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.history.table.level')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.history.table.type')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.history.table.description')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.history.table.amount')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.history.table.status')}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="border-b border-indigo-100/30">
                  <td colSpan="7" className="px-3 py-4">
                    <div className="h-6 bg-slate-100 rounded animate-pulse w-full" />
                  </td>
                </tr>
              ))
            ) : currentData.length > 0 ? (
              currentData.map((row) => (
                <tr key={row.LedgerId} className="group border-b last:border-b-0 border-indigo-100/30 hover:bg-slate-50/50 hover:shadow-sm hover:-translate-y-0.5 relative transition-all duration-300 cursor-pointer">
                  <td className="px-3 2xl:px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-extrabold text-[#1a1446] group-hover:text-[#4f3bf3] transition-colors">{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(row.Date))}</span>
                      <span className="text-[12px] font-semibold text-slate-500">{new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(row.Date))}</span>
                    </div>
                  </td>
                  <td className="px-3 2xl:px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {row.FromUserProfilePic ? (
                        <img src={row.FromUserProfilePic} alt={row.FromUserName} className="w-8 h-8 rounded-full object-cover shrink-0 transition-transform duration-300 group-hover:scale-110" />
                      ) : (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getAvatarColor(row.FromUserName)} transition-transform duration-300 group-hover:scale-110`}>
                          <span className="text-[12px] font-bold">{(row.FromUserName || 'U').charAt(0)}</span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-[13px] font-extrabold text-[#1a1446] group-hover:text-indigo-600 transition-colors">{row.FromUserName}</span>
                        <span className="text-[12px] font-semibold text-slate-500">{t('earnings.history.table.idPrefix')}{row.FromUserId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 2xl:px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-extrabold border ${getLevelStyle(row.Level)}`}>
                      {row.Level}
                    </span>
                  </td>
                  <td className="px-3 2xl:px-4 py-4 whitespace-nowrap text-[13px] font-bold text-slate-700">
                    {row.Type}
                  </td>
                  <td className="px-3 2xl:px-4 py-4 text-[12px] font-semibold text-slate-600 max-w-[200px] truncate" title={row.Description}>
                    {row.Description}
                  </td>
                  <td className="px-3 2xl:px-4 py-4 whitespace-nowrap text-[14px] font-extrabold text-emerald-600">
                    {formatCurrency(row.Amount)}
                  </td>
                  <td className="px-3 2xl:px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold border shadow-sm ${getStatusStyle(row.Status)}`}>
                      {row.Status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-3 py-10 text-center text-[13px] font-semibold text-slate-400">
                  No commission history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards */}
      <div className="block lg:hidden w-full space-y-4 relative z-10 p-4 lg:p-6 pt-0 mt-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-40 bg-slate-100 rounded-2xl animate-pulse" />
          ))
        ) : currentData.length > 0 ? (
          currentData.map((row) => (
            <div key={row.LedgerId} className="group p-4 flex flex-col gap-3 bg-slate-50/50 border border-indigo-100/30 rounded-2xl hover:bg-white hover:shadow-md hover:border-indigo-200 transition-all duration-300 cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-3">
                  {row.FromUserProfilePic ? (
                    <img src={row.FromUserProfilePic} alt={row.FromUserName} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getAvatarColor(row.FromUserName)}`}>
                      <span className="text-[14px] font-bold">{(row.FromUserName || 'U').charAt(0)}</span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[14px] font-extrabold text-[#1a1446]">{row.FromUserName}</span>
                    <span className="text-[12px] font-semibold text-slate-500">{t('earnings.history.table.idPrefix')}{row.FromUserId}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border shadow-sm ${getStatusStyle(row.Status)}`}>
                  {row.Status}
                </span>
              </div>
              
              <div className="flex flex-col gap-2 pt-3 border-t border-slate-200/60">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-semibold text-slate-500">{t('earnings.history.table.amount')}</span>
                  <span className="text-[15px] font-extrabold text-emerald-600">{formatCurrency(row.Amount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-semibold text-slate-500">{t('earnings.history.table.type')}</span>
                  <span className="text-[13px] font-bold text-slate-700">{row.Type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-semibold text-slate-500">{t('earnings.history.table.level')}</span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-extrabold border ${getLevelStyle(row.Level)}`}>
                    {row.Level}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[12px] font-semibold text-slate-500">{t('earnings.history.table.dateTime')}</span>
                  <span className="text-[12px] font-extrabold text-[#1a1446]">{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(row.Date))}, {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(row.Date))}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-[13px] font-semibold text-slate-400">
            No commission history found.
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && allCommissions.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 lg:p-6 border-t border-slate-100 relative z-10 bg-slate-50/50 mt-auto">
          <p className="text-[13px] font-medium text-slate-500">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, allCommissions.length)} of {allCommissions.length} entries
          </p>
          <div className="flex items-center gap-1.5">
            <button 
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50 transition-all disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button className="w-8 h-8 rounded-lg flex items-center justify-center border-2 border-indigo-600 bg-indigo-50 text-indigo-600 font-bold text-[13px] shadow-sm">
              {page}
            </button>
            
            <button 
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50 transition-all disabled:opacity-50"
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
