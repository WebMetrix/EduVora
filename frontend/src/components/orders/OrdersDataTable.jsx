import React from 'react';
import { Copy, Eye, Play, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

// Fallback if Razorpay logo isn't available
const RazorpayIcon = () => (
  <svg width="60" height="15" viewBox="0 0 100 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.5 0l-5 18.5h-4.5L18 0h4.5zm10.5 8c0-4.5-3.5-8-8-8h-7.5l-5 18.5h4.5l1.5-6h2c5.5 0 8.5-3.5 8.5-8zm-4.5.5c0 2-1.5 3.5-3.5 3.5h-1l1.5-5.5h1c2 0 3 1.5 3 2z" fill="#02042B"/>
    <path d="M43 18.5l-2-7-1.5 7h-4.5l5.5-18.5h4.5l4.5 18.5H43zm-1-11.5l-1 4.5h2.5l-1.5-4.5z" fill="#02042B"/>
  </svg>
);

export default function OrdersDataTable({ t, orders }) {
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

  const getActionButton = (status) => {
    if (status === 'completed') {
      return (
        <button className="flex items-center justify-center gap-1.5 w-[120px] py-1.5 border border-[#4f3bf3] rounded-md text-[11px] font-bold text-[#4f3bf3] hover:bg-indigo-50 transition-colors">
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

  let formattedTotalString = t('orders.table.showing');
  formattedTotalString = formattedTotalString.replace('{start}', '1');
  formattedTotalString = formattedTotalString.replace('{end}', '6');
  formattedTotalString = formattedTotalString.replace('{total}', '6');

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="py-4 px-6 text-[12px] font-bold text-slate-600">{t('orders.table.orderId')}</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-600">{t('orders.table.package')}</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-600">{t('orders.table.amount')}</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-600">{t('orders.table.paymentMethod')}</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-600">{t('orders.table.orderDate')}</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-600">{t('orders.table.status')}</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-600 text-center">{t('orders.table.action')}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-6 align-middle">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-slate-800">{order.id}</span>
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
                <td className="py-4 px-6 align-middle">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${order.iconBg}`}>
                      <div className="w-5 h-5 bg-white/20 rounded-sm" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-bold text-slate-800 leading-none">{order.name}</span>
                      <span className={`w-max px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${order.levelColor}`}>
                        {order.level}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 align-middle">
                  <span className="text-[13px] font-bold text-slate-800">{order.amount}</span>
                </td>
                <td className="py-4 px-6 align-middle">
                  <div className="flex flex-col gap-1">
                    <RazorpayIcon />
                    <span className="text-[11px] font-medium text-slate-500">{order.paymentMethod}</span>
                  </div>
                </td>
                <td className="py-4 px-6 align-middle">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-bold text-slate-800">{order.date}</span>
                    <span className="text-[11px] font-medium text-slate-500">{order.time}</span>
                  </div>
                </td>
                <td className="py-4 px-6 align-middle">
                  {getStatusBadge(order.status)}
                </td>
                <td className="py-4 px-6 align-middle flex justify-center">
                  {getActionButton(order.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[12px] font-medium text-slate-500">
          {formattedTotalString}
        </span>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#4f3bf3] text-white text-[13px] font-bold shadow-sm shadow-indigo-500/20">
            1
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
