import React, { useState } from 'react';
import { Calendar, ChevronDown, Download, Filter, ChevronLeft, ChevronRight, MoreHorizontal, ArrowDownToLine, ArrowUpFromLine, Clock } from 'lucide-react';

export default function WalletTransactions({ t }) {
  const [page, setPage] = useState(1);
  const totalPages = 22;

  const transactions = [
    {
      id: 1,
      date: "31 May 2025",
      time: "07:45 PM",
      type: "Received",
      desc1: "Level 1 Commission",
      desc2: "From Anita Singh",
      amount: "+ ₹ 250.00",
      status: "Completed",
      refId: "TXN125689"
    },
    {
      id: 2,
      date: "31 May 2025",
      time: "07:30 PM",
      type: "Received",
      desc1: "Direct Commission",
      desc2: "From Ravi Verma",
      amount: "+ ₹ 500.00",
      status: "Completed",
      refId: "TXN125688"
    },
    {
      id: 3,
      date: "31 May 2025",
      time: "03:20 PM",
      type: "Withdrawal",
      desc1: "Withdraw to Bank A/c",
      desc2: "**** **** 1234",
      amount: "- ₹ 2,000.00",
      status: "Completed",
      refId: "WDR1254"
    },
    {
      id: 4,
      date: "30 May 2025",
      time: "10:15 AM",
      type: "Received",
      desc1: "Level 2 Commission",
      desc2: "From Suresh Patel",
      amount: "+ ₹ 125.00",
      status: "Completed",
      refId: "TXN125687"
    },
    {
      id: 5,
      date: "30 May 2025",
      time: "09:05 AM",
      type: "Pending",
      desc1: "Level 1 Commission",
      desc2: "From Pooja Sharma",
      amount: "+ ₹ 300.00",
      status: "Pending",
      refId: "TXN125686"
    },
    {
      id: 6,
      date: "29 May 2025",
      time: "06:40 PM",
      type: "Withdrawal",
      desc1: "Withdraw to Bank A/c",
      desc2: "**** **** 1234",
      amount: "- ₹ 1,500.00",
      status: "Pending",
      refId: "WDR1253"
    },
    {
      id: 7,
      date: "29 May 2025",
      time: "02:10 PM",
      type: "Received",
      desc1: "Direct Commission",
      desc2: "From Vikram Joshi",
      amount: "+ ₹ 750.00",
      status: "Completed",
      refId: "TXN125685"
    }
  ];

  const getTypeRender = (type) => {
    switch (type) {
      case 'Received':
        return (
          <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
            <div className="w-6 h-6 rounded-full bg-emerald-100/50 flex items-center justify-center">
              <ArrowDownToLine className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            Received
          </div>
        );
      case 'Withdrawal':
        return (
          <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
            <div className="w-6 h-6 rounded-full bg-red-100/50 flex items-center justify-center">
              <ArrowUpFromLine className="w-3.5 h-3.5 text-red-500" />
            </div>
            Withdrawal
          </div>
        );
      case 'Pending':
        return (
          <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
            <div className="w-6 h-6 rounded-full bg-orange-100/50 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
            </div>
            Pending
          </div>
        );
      default: return type;
    }
  };

  const getAmountStyle = (amount) => {
    if (amount.startsWith('+')) return 'text-emerald-600';
    if (amount.startsWith('-')) return 'text-red-500';
    return 'text-slate-700';
  };

  const getStatusStyle = (status) => {
    return status === 'Completed'
      ? 'bg-emerald-100/60 text-emerald-700 border-emerald-200/50'
      : 'bg-orange-100/60 text-orange-700 border-orange-200/50';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 lg:p-6 shadow-sm flex flex-col h-full 2xl:col-span-2 relative overflow-hidden">
      
      <h2 className="text-[18px] font-extrabold text-[#1a1446] mb-5">{t('earnings.wallet.transactions.title')}</h2>

      {/* Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          {/* Date Range */}
          <div className="relative w-full sm:w-auto">
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-colors">
              <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
                <Calendar className="w-4 h-4 text-slate-500" />
                01 May 2025 - 31 May 2025
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>
          </div>

          {/* Type Dropdown */}
          <div className="relative w-full sm:w-auto">
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-colors sm:min-w-[140px]">
              <span className="text-[13px] font-bold text-slate-700">{t('earnings.history.filters.allTypes')}</span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full xl:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <Download className="w-4 h-4" />
            {t('earnings.history.filters.export')}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-white bg-[#4f3bf3] rounded-lg hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <Filter className="w-4 h-4" />
            {t('earnings.history.filters.filter')}
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto w-full relative z-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-2 xl:px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap rounded-tl-xl">{t('earnings.wallet.transactions.table.dateTime')}</th>
              <th className="px-2 xl:px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.wallet.transactions.table.type')}</th>
              <th className="px-2 xl:px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.wallet.transactions.table.description')}</th>
              <th className="px-2 xl:px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.wallet.transactions.table.amount')}</th>
              <th className="px-2 xl:px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('earnings.wallet.transactions.table.status')}</th>
              <th className="px-2 xl:px-3 2xl:px-4 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap rounded-tr-xl">{t('earnings.wallet.transactions.table.referenceId')}</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((row) => (
              <tr key={row.id} className="group border-b last:border-b-0 border-indigo-100/30 hover:bg-slate-50/50 hover:shadow-sm hover:-translate-y-0.5 relative transition-all duration-300 cursor-pointer">
                <td className="px-2 xl:px-3 2xl:px-4 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-[13px] font-extrabold text-[#1a1446] group-hover:text-[#4f3bf3] transition-colors">{row.date}</span>
                    <span className="text-[12px] font-semibold text-slate-500">{row.time}</span>
                  </div>
                </td>
                <td className="px-2 xl:px-3 2xl:px-4 py-4 whitespace-nowrap">
                  {getTypeRender(row.type)}
                </td>
                <td className="px-2 xl:px-3 2xl:px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#1a1446] leading-tight">{row.desc1}</span>
                    <span className="text-[12px] font-semibold text-slate-500 mt-0.5">{row.desc2}</span>
                  </div>
                </td>
                <td className="px-2 xl:px-3 2xl:px-4 py-4 whitespace-nowrap">
                  <span className={`text-[14px] font-extrabold ${getAmountStyle(row.amount)}`}>
                    {row.amount}
                  </span>
                </td>
                <td className="px-2 xl:px-3 2xl:px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold border shadow-sm ${getStatusStyle(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-2 xl:px-3 2xl:px-4 py-4 whitespace-nowrap">
                  <span className="text-[13px] font-semibold text-slate-500">{row.refId}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards */}
      <div className="block lg:hidden w-full space-y-4 relative z-10 mt-4">
        {transactions.map((row) => (
          <div key={row.id} className="group p-4 flex flex-col gap-3 bg-slate-50/50 border border-indigo-100/30 rounded-2xl hover:bg-white hover:shadow-md hover:border-indigo-200 transition-all duration-300 cursor-pointer">
            <div className="flex justify-between items-start mb-1">
              <div className="flex flex-col">
                <span className={`text-[15px] font-extrabold ${getAmountStyle(row.amount)}`}>{row.amount}</span>
                <span className="text-[13px] font-bold text-[#1a1446] mt-1">{row.desc1}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border shadow-sm ${getStatusStyle(row.status)}`}>
                {row.status}
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-slate-200/60">
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-semibold text-slate-500">{t('earnings.wallet.transactions.table.type')}</span>
                {getTypeRender(row.type)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-semibold text-slate-500">Details</span>
                <span className="text-[12px] font-semibold text-slate-600">{row.desc2}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-semibold text-slate-500">{t('earnings.wallet.transactions.table.dateTime')}</span>
                <span className="text-[12px] font-extrabold text-[#1a1446]">{row.date}, {row.time}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[12px] font-semibold text-slate-500">{t('earnings.wallet.transactions.table.referenceId')}</span>
                <span className="text-[12px] font-bold text-slate-500">{row.refId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100 relative z-10">
        <p className="text-[13px] font-medium text-slate-500">
          Showing 1 to 7 of 156 entries
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
            1
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 font-medium text-[13px] hover:bg-slate-100 transition-colors">
            2
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 font-medium text-[13px] hover:bg-slate-100 transition-colors">
            3
          </button>

          <div className="w-8 h-8 flex items-center justify-center">
            <MoreHorizontal className="w-4 h-4 text-slate-400" />
          </div>

          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 font-medium text-[13px] hover:bg-slate-100 transition-colors">
            22
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

    </div>
  );
}
