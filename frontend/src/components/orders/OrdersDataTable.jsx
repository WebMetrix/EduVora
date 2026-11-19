import React from 'react';
import { Copy, Eye, Play, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { getPackageUI, formatCurrency, formatOrderDateTime } from '../../utils/orderHelper';

export default function OrdersDataTable({
  t,
  orders = [],
  loading = false,
  pagination = { page: 1, limit: 10, total: 0, totalPages: 1 },
  onPageChange,
  onRowsPerPageChange,
  onViewDetails,
  onPayNow,
  onRetryPayment
}) {
  const page = pagination.page || 1;
  const rowsPerPage = pagination.limit || 10;
  const totalEntries = pagination.total || 0;
  const totalPages = pagination.totalPages || 1;

  const startIndex = totalEntries === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const endIndex = Math.min(page * rowsPerPage, totalEntries);

  const handleCopy = (orderId) => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      toast.success(t('orders.details.copied'));
    }
  };

  const getStatusBadge = (statusCode) => {
    const status = (statusCode || '').toLowerCase();
    if (status === 'completed') {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-600 text-[11px] font-bold rounded-full">
          {t('orders.status.completed')}
        </span>
      );
    }
    if (status === 'pending') {
      return (
        <span className="px-3 py-1 bg-orange-100 text-orange-500 text-[11px] font-bold rounded-full">
          {t('orders.status.pending')}
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-red-100 text-red-500 text-[11px] font-bold rounded-full">
        {t('orders.status.failed')}
      </span>
    );
  };

  const getActionButton = (order) => {
    const status = (order.statusCode || order.StatusCode || order.orderStatus || order.OrderStatus || (order.orderStatusId === '2' || order.OrderStatusId === '2' ? 'completed' : 'pending')).toLowerCase();

    if (status === 'completed') {
      return (
        <button
          onClick={() => onViewDetails(order)}
          className="flex items-center justify-center gap-1.5 p-1.5 xl:px-3 xl:py-1.5 border border-[#4f3bf3] rounded-md text-[11px] font-bold text-[#4f3bf3] hover:bg-indigo-50 transition-colors whitespace-nowrap cursor-pointer"
        >
          <span className="hidden xl:block">{t('orders.actions.viewDetails')}</span>
          <Eye className="w-4 h-4 xl:w-3.5 xl:h-3.5" />
        </button>
      );
    }

    if (status === 'pending') {
      return (
        <button
          onClick={() => (onPayNow ? onPayNow(order) : onViewDetails(order))}
          className="flex items-center justify-center gap-1.5 p-1.5 xl:px-3 xl:py-1.5 bg-[#4f3bf3] rounded-md text-[11px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-[#3f2ee6] transition-colors whitespace-nowrap cursor-pointer"
        >
          <span className="hidden xl:block">{t('orders.actions.payNow')}</span>
          <Play className="w-4 h-4 xl:w-3.5 xl:h-3.5 fill-current" />
        </button>
      );
    }

    return (
      <button
        onClick={() => (onRetryPayment ? onRetryPayment(order) : onViewDetails(order))}
        className="flex items-center justify-center gap-1.5 p-1.5 xl:px-3 xl:py-1.5 border border-[#4f3bf3] rounded-md text-[11px] font-bold text-[#4f3bf3] hover:bg-indigo-50 transition-colors whitespace-nowrap cursor-pointer"
      >
        <RotateCcw className="w-4 h-4 xl:w-3.5 xl:h-3.5" />
        <span className="hidden xl:block">{t('orders.actions.retryPayment')}</span>
      </button>
    );
  };

  let formattedTotalString = t('orders.table.showing');
  formattedTotalString = formattedTotalString.replace('{start}', startIndex);
  formattedTotalString = formattedTotalString.replace('{end}', endIndex);
  formattedTotalString = formattedTotalString.replace('{total}', totalEntries);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group/card transition-all duration-300 hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 flex flex-col">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

      {/* Desktop Table View */}
      <div className="relative z-10 hidden lg:block w-full overflow-x-hidden custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-20 bg-slate-50/90 backdrop-blur-md shadow-sm">
            <tr>
              <th className="px-3 xl:px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider">{t('orders.table.orderId')}</th>
              <th className="px-3 xl:px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider">{t('orders.table.package')}</th>
              <th className="px-3 xl:px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider">{t('orders.table.amount')}</th>
              <th className="px-3 xl:px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider">{t('orders.table.paymentMethod')}</th>
              <th className="px-3 xl:px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider">{t('orders.table.orderDate')}</th>
              <th className="px-3 xl:px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider">{t('orders.table.status')}</th>
              <th className="px-3 xl:px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider text-center">{t('orders.table.action')}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500 font-bold text-[14px]">
                  {t('orders.table.loading')}
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400 font-bold text-[14px]">
                  {t('orders.table.noOrders')}
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const orderId = order.orderNumber || order.OrderNumber;
                const packageUI = getPackageUI(order.packageId || order.PackageId, t);
                const packageName = order.packageName || order.PackageName;
                const paymentMethod = order.paymentMethod || order.PaymentMethod;
                const amount = formatCurrency(order.totalAmount ?? order.TotalAmount);
                const { date, time } = formatOrderDateTime(order.orderDate || order.OrderDate || order.orderDateIST || order.OrderDateIST || order.date);
                const statusCode = order.statusCode || order.StatusCode || order.orderStatus || order.OrderStatus || (order.orderStatusId === '2' || order.OrderStatusId === '2' ? 'completed' : 'pending');

                return (
                  <tr key={order.orderId || order.OrderId || orderId} className="group border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300">
                    <td className="px-3 xl:px-6 py-3 rounded-l-xl align-middle">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-bold text-slate-800 group-hover:text-[#4f3bf3] transition-colors">{orderId}</span>
                        <button onClick={() => handleCopy(orderId)} className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-3 xl:px-6 py-3 align-middle">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 ${packageUI.iconBg}`}>
                          <div className="w-5 h-5 bg-white/20 rounded-sm" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[13px] font-bold text-slate-800 leading-snug group-hover:text-[#4f3bf3] transition-colors">{packageName}</span>
                          <span className={`w-max px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${packageUI.levelColor}`}>
                            {packageUI.level}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 xl:px-6 py-3 align-middle">
                      <span className="text-[13px] font-bold text-slate-800">{amount}</span>
                    </td>
                    <td className="px-3 xl:px-6 py-3 align-middle">
                      <span className="text-[12px] font-bold text-slate-800 whitespace-nowrap uppercase">{paymentMethod}</span>
                    </td>
                    <td className="px-3 xl:px-6 py-3 align-middle">
                      {date && date !== '-' ? (
                        <div className="flex flex-col gap-0.5 whitespace-nowrap">
                          <span className="text-[12px] font-bold text-slate-800">{date}</span>
                          <span className="text-[11px] font-medium text-slate-500">{time}</span>
                        </div>
                      ) : (
                        <span className="text-[12px] font-bold text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-3 xl:px-6 py-3 align-middle whitespace-nowrap">
                      {getStatusBadge(statusCode)}
                    </td>
                    <td className="px-3 xl:px-6 py-3 align-middle flex justify-center rounded-r-xl">
                      {getActionButton(order)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (Hidden on desktop) */}
      <div className="block lg:hidden w-full p-4 space-y-4">
        {loading ? (
          <div className="py-8 text-center text-slate-500 font-bold text-[14px]">
            {t('orders.table.loading')}
          </div>
        ) : orders.length === 0 ? (
          <div className="py-8 text-center text-slate-400 font-bold text-[14px]">
            {t('orders.table.noOrders')}
          </div>
        ) : (
          orders.map((order) => {
            const orderId = order.orderNumber || order.OrderNumber;
            const packageUI = getPackageUI(order.packageId || order.PackageId, t);
            const packageName = order.packageName || order.PackageName;
            const paymentMethod = order.paymentMethod || order.PaymentMethod;
            const amount = formatCurrency(order.totalAmount ?? order.TotalAmount);
            const { date, time } = formatOrderDateTime(order.orderDate || order.OrderDate || order.orderDateIST || order.OrderDateIST || order.date);
            const statusCode = order.statusCode || order.StatusCode || order.orderStatus || order.OrderStatus || (order.orderStatusId === '2' || order.OrderStatusId === '2' ? 'completed' : 'pending');

            return (
              <div key={order.orderId || order.OrderId || orderId} className="group p-4 flex flex-col gap-3 bg-white/40 border border-indigo-100/50 rounded-2xl hover:bg-white hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 relative z-10">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 ${packageUI.iconBg}`}>
                      <div className="w-5 h-5 bg-white/20 rounded-sm" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] font-bold text-slate-900 group-hover:text-[#4f3bf3] transition-colors leading-tight line-clamp-2 pr-2">{packageName}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-extrabold text-indigo-900/60">{orderId}</span>
                        <button onClick={() => handleCopy(orderId)} className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {getStatusBadge(statusCode)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('orders.table.amount')}</div>
                    <div className="text-[13px] font-bold text-slate-800">{amount}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('orders.table.paymentMethod')}</div>
                    <span className="text-[12px] font-bold text-slate-800 uppercase">{paymentMethod}</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-slate-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('orders.table.orderDate')}</div>
                    {date && date !== '-' ? (
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] font-bold text-slate-800">{date}</span>
                        <span className="text-[11px] font-medium text-slate-500">{time}</span>
                      </div>
                    ) : (
                      <span className="text-[12px] font-bold text-slate-400">-</span>
                    )}
                  </div>
                  <div className="pt-2 mt-2 border-t border-slate-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('orders.table.package')}</div>
                    <span className={`w-max px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${packageUI.levelColor}`}>
                      {packageUI.level}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end pt-1 w-full">
                  {getActionButton(order)}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Footer */}
      <div className="p-4 lg:p-6 border-t border-indigo-100/60 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/40 backdrop-blur-md">
        <div className="text-[13px] font-medium text-slate-500 w-full text-center sm:text-left">
          {totalEntries > 0 ? formattedTotalString : t('orders.table.noEntries')}
        </div>

        {totalEntries > 0 && (
          <div className="flex items-center justify-between w-full sm:w-auto gap-4 lg:gap-6">
            <div className="flex items-center gap-1">
              <button
                onClick={() => onPageChange(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button className="w-8 h-8 rounded-lg bg-[#4f3bf3] text-white font-bold text-[13px] shadow-sm flex items-center justify-center">
                {page}
              </button>

              <button
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[13px] font-medium text-slate-500 hidden sm:inline-block whitespace-nowrap">{t('orders.table.rowsPerPage')}</span>
              <select
                value={rowsPerPage}
                onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
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
    </div>
  );
}
