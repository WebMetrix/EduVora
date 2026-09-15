import React, { useState } from 'react';
import { Calendar, ChevronDown, Download, Filter, ChevronLeft, ChevronRight, MoreHorizontal, ArrowDownToLine, ArrowUpFromLine, Clock, Eye } from 'lucide-react';


export default function WalletTransactions({ t, loading, transactions }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;
  
  const allTransactions = transactions || [];
  const totalPages = Math.ceil(allTransactions.length / itemsPerPage) || 1;
  const currentData = allTransactions.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getTypeRender = (type) => {
    const lowerType = type?.toLowerCase() || '';
    if (lowerType.includes('commission') || lowerType.includes('received') || lowerType.includes('credit')) {
      return (
        <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
          <div className="w-6 h-6 rounded-full bg-emerald-100/50 flex items-center justify-center">
            <ArrowDownToLine className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          Received
        </div>
      );
    } else if (lowerType.includes('withdraw') || lowerType.includes('debit') || lowerType.includes('payout')) {
      return (
        <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
          <div className="w-6 h-6 rounded-full bg-red-100/50 flex items-center justify-center">
            <ArrowUpFromLine className="w-3.5 h-3.5 text-red-500" />
          </div>
          Withdrawal
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
          <div className="w-6 h-6 rounded-full bg-slate-100/50 flex items-center justify-center">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
          </div>
          {type || 'Pending'}
        </div>
      );
    }
  };

  const getAmountStyle = (type) => {
    const lowerType = type?.toLowerCase() || '';
    if (lowerType.includes('commission') || lowerType.includes('received') || lowerType.includes('credit')) {
      return 'text-emerald-600';
    } else if (lowerType.includes('withdraw') || lowerType.includes('debit') || lowerType.includes('payout')) {
      return 'text-red-500';
    }
    return 'text-slate-700';
  };

  const getAmountPrefix = (type) => {
    const lowerType = type?.toLowerCase() || '';
    if (lowerType.includes('commission') || lowerType.includes('received') || lowerType.includes('credit')) {
      return '+';
    } else if (lowerType.includes('withdraw') || lowerType.includes('debit') || lowerType.includes('payout')) {
      return '-';
    }
    return '';
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

  return (
    <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col h-full 2xl:col-span-2 group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />
      
      <div className="p-5 pb-0 mb-5">
        <h2 className="text-[18px] font-extrabold text-[#1a1446] mb-5 relative z-10">{t('earnings.wallet.transactions.title')}</h2>

        {/* Filters */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          {/* Date Range */}
          <div className="relative w-full sm:w-auto">
            <div className={`flex items-center justify-between gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-xl transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-indigo-300'}`}>
              <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
                <Calendar className="w-4 h-4 text-slate-500" />
                01 May 2025 - 31 May 2025
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>
          </div>

          {/* Type Dropdown */}
          <div className="relative w-full sm:w-auto">
            <div className={`flex items-center justify-between gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-xl transition-colors sm:min-w-[140px] ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-indigo-300'}`}>
              <span className="text-[13px] font-bold text-slate-700">{t('earnings.history.filters.allTypes')}</span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full xl:w-auto">
          <button disabled={loading} className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 hover:shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:-translate-y-0">
            <Download className="w-4 h-4" />
            {t('earnings.history.filters.export')}
          </button>
          <button disabled={loading} className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-white bg-[#4f3bf3] rounded-lg hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:-translate-y-0">
            <Filter className="w-4 h-4" />
            {t('earnings.history.filters.filter')}
          </button>
        </div>
      </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto w-full relative z-10 min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/90 backdrop-blur-md shadow-sm">
            <tr>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.wallet.transactions.table.dateTime')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.wallet.transactions.table.type')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.wallet.transactions.table.description')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.wallet.transactions.table.amount')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.wallet.transactions.table.status')}</th>
              <th className="px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap text-center">{t('earnings.transactions.action')}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="border-b border-indigo-100/30">
                  <td colSpan="6" className="px-3 py-4">
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
                    {getTypeRender(row.Type)}
                  </td>
                  <td className="px-3 2xl:px-4 py-4">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#1a1446] leading-tight">{row.Description}</span>
                      {row.Remark && <span className="text-[12px] font-semibold text-slate-500 mt-0.5">{row.Remark}</span>}
                    </div>
                  </td>
                  <td className="px-3 2xl:px-4 py-4 whitespace-nowrap">
                    <span className={`text-[14px] font-extrabold ${getAmountStyle(row.Type)}`}>
                      {getAmountPrefix(row.Type)} {formatCurrency(row.Amount)}
                    </span>
                  </td>
                  <td className="px-3 2xl:px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold border shadow-sm ${getStatusStyle(row.Status)}`}>
                      {row.Status}
                    </span>
                  </td>
                  <td className="px-3 2xl:px-4 py-4 align-middle whitespace-nowrap">
                    <div className="flex justify-center">
                      <button className="flex items-center justify-center p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50 transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-3 py-10 text-center text-[13px] font-semibold text-slate-400">
                  No transactions found.
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
                <div className="flex flex-col">
                  <span className={`text-[15px] font-extrabold ${getAmountStyle(row.Type)}`}>{getAmountPrefix(row.Type)} {formatCurrency(row.Amount)}</span>
                  <span className="text-[13px] font-bold text-[#1a1446] mt-1">{row.Description}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border shadow-sm ${getStatusStyle(row.Status)}`}>
                  {row.Status}
                </span>
              </div>

              <div className="flex flex-col gap-2 pt-3 border-t border-slate-200/60">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-semibold text-slate-500">{t('earnings.wallet.transactions.table.type')}</span>
                  {getTypeRender(row.Type)}
                </div>
                {row.Remark && (
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-semibold text-slate-500">{t('earnings.transactions.details')}</span>
                    <span className="text-[12px] font-semibold text-slate-600">{row.Remark}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-semibold text-slate-500">{t('earnings.wallet.transactions.table.dateTime')}</span>
                  <span className="text-[12px] font-extrabold text-[#1a1446]">{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(row.Date))}, {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(row.Date))}</span>
                </div>
                <div className="flex justify-center mt-2">
                  <button className="flex items-center justify-center gap-1.5 w-full py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                    <Eye className="w-3.5 h-3.5" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-[13px] font-semibold text-slate-400">
            No transactions found.
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && allTransactions.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 lg:p-6 border-t border-slate-100 relative z-10 bg-slate-50/50 mt-auto">
          <p className="text-[13px] font-medium text-slate-500">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, allTransactions.length)} of {allTransactions.length} entries
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
