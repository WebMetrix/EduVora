import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export default function CommissionHistoryTable({ t }) {
  const [page, setPage] = useState(1);
  const totalPages = 13;

  const tableData = [
    {
      id: 1,
      date: "28 May 2025",
      time: "10:45 AM",
      userName: "Ravi Verma",
      userId: "EV123456",
      level: "Direct",
      type: "Direct Commission",
      desc: "Direct commission for Ravi Verma",
      amount: "₹ 500.00",
      status: "Credited",
      avatarColor: "bg-purple-100 text-purple-600"
    },
    {
      id: 2,
      date: "28 May 2025",
      time: "10:30 AM",
      userName: "Anita Singh",
      userId: "EV123457",
      level: "Level 1",
      type: "Level Commission (L1)",
      desc: "Level 1 commission for Anita Singh",
      amount: "₹ 250.00",
      status: "Credited",
      avatarColor: "bg-green-100 text-green-600"
    },
    {
      id: 3,
      date: "28 May 2025",
      time: "09:15 AM",
      userName: "Suresh Patel",
      userId: "EV123458",
      level: "Level 2",
      type: "Level Commission (L2)",
      desc: "Level 2 commission for Suresh Patel",
      amount: "₹ 125.00",
      status: "Pending",
      avatarColor: "bg-orange-100 text-orange-600"
    },
    {
      id: 4,
      date: "27 May 2025",
      time: "06:20 PM",
      userName: "Vikram Joshi",
      userId: "EV123459",
      level: "Direct",
      type: "Direct Commission",
      desc: "Direct commission for Vikram Joshi",
      amount: "₹ 750.00",
      status: "Credited",
      avatarColor: "bg-purple-100 text-purple-600"
    },
    {
      id: 5,
      date: "27 May 2025",
      time: "04:10 PM",
      userName: "Pooja Sharma",
      userId: "EV123460",
      level: "Level 1",
      type: "Level Commission (L1)",
      desc: "Level 1 commission for Pooja Sharma",
      amount: "₹ 300.00",
      status: "Credited",
      avatarColor: "bg-green-100 text-green-600"
    },
    {
      id: 6,
      date: "26 May 2025",
      time: "11:05 AM",
      userName: "Amit Kumar",
      userId: "EV123461",
      level: "Level 2",
      type: "Level Commission (L2)",
      desc: "Level 2 commission for Amit Kumar",
      amount: "₹ 200.00",
      status: "Pending",
      avatarColor: "bg-orange-100 text-orange-600"
    }
  ];

  const getLevelStyle = (level) => {
    switch(level) {
      case 'Direct': return 'bg-purple-100/80 text-purple-700 border-purple-200/50';
      case 'Level 1': return 'bg-emerald-100/80 text-emerald-700 border-emerald-200/50';
      case 'Level 2': return 'bg-orange-100/80 text-orange-700 border-orange-200/50';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusStyle = (status) => {
    return status === 'Credited' 
      ? 'bg-emerald-100/60 text-emerald-700 border-emerald-200/50'
      : 'bg-orange-100/60 text-orange-700 border-orange-200/50';
  };

  return (
    <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col h-full mt-6 group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />
      
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto w-full relative z-10">
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
            {tableData.map((row) => (
              <tr key={row.id} className="group border-b last:border-b-0 border-indigo-100/30 hover:bg-slate-50/50 hover:shadow-sm hover:-translate-y-0.5 relative transition-all duration-300 cursor-pointer">
                <td className="px-3 2xl:px-4 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-[13px] font-extrabold text-[#1a1446] group-hover:text-[#4f3bf3] transition-colors">{row.date}</span>
                    <span className="text-[12px] font-semibold text-slate-500">{row.time}</span>
                  </div>
                </td>
                <td className="px-3 2xl:px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${row.avatarColor} transition-transform duration-300 group-hover:scale-110`}>
                      <span className="text-[12px] font-bold">{row.userName.charAt(0)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-extrabold text-[#1a1446] group-hover:text-indigo-600 transition-colors">{row.userName}</span>
                      <span className="text-[12px] font-semibold text-slate-500">{t('earnings.history.table.idPrefix')}{row.userId}</span>
                    </div>
                  </div>
                </td>
                <td className="px-3 2xl:px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-extrabold border ${getLevelStyle(row.level)}`}>
                    {row.level}
                  </span>
                </td>
                <td className="px-3 2xl:px-4 py-4 whitespace-nowrap text-[13px] font-bold text-slate-700">
                  {row.type}
                </td>
                <td className="px-3 2xl:px-4 py-4 text-[12px] font-semibold text-slate-600 max-w-[200px] truncate" title={row.desc}>
                  <div className="flex flex-col">
                    <span>{row.desc.split(' for ')[0]} for</span>
                    <span>{row.desc.split(' for ')[1]}</span>
                  </div>
                </td>
                <td className="px-3 2xl:px-4 py-4 whitespace-nowrap text-[14px] font-extrabold text-emerald-600">
                  {row.amount}
                </td>
                <td className="px-3 2xl:px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold border shadow-sm ${getStatusStyle(row.status)}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards */}
      <div className="block lg:hidden w-full space-y-4 relative z-10 p-4 lg:p-6 pt-0">
        {tableData.map((row) => (
          <div key={row.id} className="group p-4 flex flex-col gap-3 bg-slate-50/50 border border-indigo-100/30 rounded-2xl hover:bg-white hover:shadow-md hover:border-indigo-200 transition-all duration-300 cursor-pointer">
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${row.avatarColor}`}>
                  <span className="text-[14px] font-bold">{row.userName.charAt(0)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-extrabold text-[#1a1446]">{row.userName}</span>
                  <span className="text-[12px] font-semibold text-slate-500">{t('earnings.history.table.idPrefix')}{row.userId}</span>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border shadow-sm ${getStatusStyle(row.status)}`}>
                {row.status}
              </span>
            </div>
            
            <div className="flex flex-col gap-2 pt-3 border-t border-slate-200/60">
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-semibold text-slate-500">{t('earnings.history.table.amount')}</span>
                <span className="text-[15px] font-extrabold text-emerald-600">{row.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-semibold text-slate-500">{t('earnings.history.table.type')}</span>
                <span className="text-[13px] font-bold text-slate-700">{row.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-semibold text-slate-500">{t('earnings.history.table.level')}</span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-extrabold border ${getLevelStyle(row.level)}`}>
                  {row.level}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[12px] font-semibold text-slate-500">{t('earnings.history.table.dateTime')}</span>
                <span className="text-[12px] font-extrabold text-[#1a1446]">{row.date}, {row.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 lg:p-6 border-t border-slate-100 relative z-10 bg-slate-50/50">
        <p className="text-[13px] font-medium text-slate-500">
          Showing 1 to 10 of 128 entries
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
            13
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
