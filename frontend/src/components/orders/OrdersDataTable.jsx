import React, { useState } from 'react';
import { Copy, Eye, Play, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import OrderDetailsModal from './OrderDetailsModal';

// Fallback if Razorpay logo isn't available
const RazorpayIcon = () => (
  <svg width="60" height="15" viewBox="0 0 100 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.5 0l-5 18.5h-4.5L18 0h4.5zm10.5 8c0-4.5-3.5-8-8-8h-7.5l-5 18.5h4.5l1.5-6h2c5.5 0 8.5-3.5 8.5-8zm-4.5.5c0 2-1.5 3.5-3.5 3.5h-1l1.5-5.5h1c2 0 3 1.5 3 2z" fill="#02042B" />
    <path d="M43 18.5l-2-7-1.5 7h-4.5l5.5-18.5h4.5l4.5 18.5H43zm-1-11.5l-1 4.5h2.5l-1.5-4.5z" fill="#02042B" />
  </svg>
);

export default function OrdersDataTable({ t, orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalEntries = orders?.length || 0;
  const totalPages = Math.ceil(totalEntries / rowsPerPage) || 1;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalEntries);
  const paginatedData = (orders || []).slice(startIndex, endIndex);

  const getStatusBadge = (status) => {
    if (status === 'completed') {
      return <span className="px-3 py-1 bg-green-100 text-green-600 text-[11px] font-bold rounded-full">{t('orders.status.completed')}</span>;
    }
    if (status === 'pending') {
      return <span className="px-3 py-1 bg-orange-100 text-orange-500 text-[11px] font-bold rounded-full">{t('orders.status.pending')}</span>;
    }
    if (status === 'failed') {
      return <span className="px-3 py-1 bg-red-100 text-red-500 text-[11px] font-bold rounded-full">{t('orders.status.failed')}</span>;
    }
  };

  const getActionButton = (status, order) => {
    if (status === 'completed') {
      return (
        <button 
          onClick={() => setSelectedOrder(order)}
          className="flex items-center justify-center gap-1.5 w-[120px] py-1.5 border border-[#4f3bf3] rounded-md text-[11px] font-bold text-[#4f3bf3] hover:bg-indigo-50 transition-colors"
        >
          {t('orders.actions.viewDetails')} <Eye className="w-3.5 h-3.5" />
        </button>
      );
    }
    if (status === 'pending') {
      return (
        <button className="flex items-center justify-center gap-1.5 w-[120px] py-1.5 bg-[#4f3bf3] rounded-md text-[11px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-[#3f2ee6] transition-colors">
          {t('orders.actions.payNow')} <Play className="w-3.5 h-3.5 fill-current" />
        </button>
      );
    }
    if (status === 'failed') {
      return (
        <button className="flex items-center justify-center gap-1.5 w-[120px] py-1.5 border border-[#4f3bf3] rounded-md text-[11px] font-bold text-[#4f3bf3] hover:bg-indigo-50 transition-colors">
          <RotateCcw className="w-3.5 h-3.5" /> {t('orders.actions.retryPayment')}
        </button>
      );
    }
  };

  let formattedTotalString = t('orders.table.showing') || 'Showing {start} to {end} of {total} entries';
  formattedTotalString = formattedTotalString.replace('{start}', startIndex + 1);
  formattedTotalString = formattedTotalString.replace('{end}', endIndex);
  formattedTotalString = formattedTotalString.replace('{total}', totalEntries);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group/card transition-all duration-300 hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 flex flex-col">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

      <div className="relative z-10 overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="sticky top-0 z-20 bg-slate-50/90 backdrop-blur-md shadow-sm">
            <tr>
              <th className="px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('orders.table.orderId')}</th>
              <th className="px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('orders.table.package')}</th>
              <th className="px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('orders.table.amount')}</th>
              <th className="px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('orders.table.paymentMethod')}</th>
              <th className="px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('orders.table.orderDate')}</th>
              <th className="px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap">{t('orders.table.status')}</th>
              <th className="px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider whitespace-nowrap text-center">{t('orders.table.action')}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((order, index) => (
              <tr key={index} className="group border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300 cursor-pointer">
                <td className="px-6 py-3 rounded-l-xl align-middle">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-slate-800 group-hover:text-[#4f3bf3] transition-colors">{order.id}</span>
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-3 align-middle">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 ${order.iconBg}`}>
                      <div className="w-5 h-5 bg-white/20 rounded-sm" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-bold text-slate-800 leading-none group-hover:text-[#4f3bf3] transition-colors">{order.name}</span>
                      <span className={`w-max px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${order.levelColor}`}>
                        {order.level}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 align-middle">
                  <span className="text-[13px] font-bold text-slate-800">{order.amount}</span>
                </td>
                <td className="px-6 py-3 align-middle">
                  <div className="flex flex-col gap-1">
                    <RazorpayIcon />
                    <span className="text-[11px] font-medium text-slate-500">{order.paymentMethod}</span>
                  </div>
                </td>
                <td className="px-6 py-3 align-middle">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-bold text-slate-800">{order.date}</span>
                    <span className="text-[11px] font-medium text-slate-500">{order.time}</span>
                  </div>
                </td>
                <td className="px-6 py-3 align-middle">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-3 align-middle flex justify-center rounded-r-xl">
                  {getActionButton(order.status, order)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 lg:p-6 border-t border-indigo-100/60 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/40 backdrop-blur-md">
        <div className="text-[13px] font-medium text-slate-500 w-full text-center sm:text-left">
          {totalEntries > 0 ? formattedTotalString : 'No entries to show'}
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
              <span className="text-[13px] font-medium text-slate-500 hidden sm:inline-block whitespace-nowrap">{t('orders.table.rowsPerPage') || 'Rows per page:'}</span>
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
      
      {/* Order Details Modal */}
      <OrderDetailsModal 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />
    </div>
  );
}
