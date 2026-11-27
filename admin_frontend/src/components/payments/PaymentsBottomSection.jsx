import React from 'react';
import {
  Layers, Clock, ArrowRight, Crown, Diamond, Star, Sparkles, Eye,
  Download, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight
} from 'lucide-react';
import CustomSelect from '../common/CustomSelect';

const PACKAGE_ROWS = [
  { name: 'Elite Package', txns: '842', amount: '₹8,41,700', rate: '86.3%', icon: Crown, badgeCls: 'bg-rose-50 text-rose-600 border-rose-200/80' },
  { name: 'Pro Package', txns: '688', amount: '₹6,71,320', rate: '85.2%', icon: Diamond, badgeCls: 'bg-amber-50 text-amber-600 border-amber-200/80' },
  { name: 'Growth Package', txns: '532', amount: '₹4,26,860', rate: '85.0%', icon: Star, badgeCls: 'bg-sky-50 text-sky-600 border-sky-200/80' },
  { name: 'Starter Package', txns: '784', amount: '₹4,77,990', rate: '82.9%', icon: Sparkles, badgeCls: 'bg-indigo-50 text-indigo-600 border-indigo-200/80' },
];

const STATUS_BADGES = {
  Paid: { pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/70', dot: 'bg-emerald-500' },
  Pending: { pill: 'bg-amber-50 text-amber-700 border-amber-200/70', dot: 'bg-amber-500' },
  Failed: { pill: 'bg-rose-50 text-rose-700 border-rose-200/70', dot: 'bg-rose-500' },
  Refunded: { pill: 'bg-sky-50 text-sky-700 border-sky-200/70', dot: 'bg-sky-500' },
};

const renderStatusPill = (status) => {
  const cfg = STATUS_BADGES[status] || STATUS_BADGES.Pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border whitespace-nowrap shadow-2xs ${cfg.pill}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      <span>{status}</span>
    </span>
  );
};

export function PaymentsOverviewBottom({
  recentPayments = [],
  onViewAll,
  onSelectPayment,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
      {/* Left: Payments by Package */}
      <div className="lg:col-span-5 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.10)] hover:border-indigo-300 transition-all duration-300 group flex flex-col">
        <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-400/8 rounded-full blur-[65px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        <div className="relative z-10 px-4 sm:px-5 py-3.5 border-b border-slate-100 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
            <Layers className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-[15px] font-black text-indigo-700 tracking-tight">
            Payments by Package
          </h3>
        </div>

        {/* Desktop Table */}
        <div className="relative z-10 hidden sm:block flex-1">
          <table className="w-full text-left text-[11.5px]">
            <thead>
              <tr className="border-b border-slate-200/60 text-slate-600 font-bold bg-slate-50/50">
                <th className="py-2.5 pl-4 pr-2">Package</th>
                <th className="py-2.5 px-2 text-center">Transactions</th>
                <th className="py-2.5 px-2">Amount (₹)</th>
                <th className="py-2.5 pl-2 pr-4 text-right whitespace-nowrap">Success Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-100/35">
              {PACKAGE_ROWS.map((pkg) => {
                const PkgIcon = pkg.icon;
                return (
                  <tr
                    key={pkg.name}
                    className="group/row hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300"
                  >
                    <td className="py-2.5 pl-4 pr-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${pkg.badgeCls}`}
                        >
                          <PkgIcon className="w-3.5 h-3.5" />
                        </span>
                        <span className="font-bold text-slate-800 whitespace-nowrap">{pkg.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold text-slate-700">{pkg.txns}</td>
                    <td className="py-2.5 px-2 font-black text-slate-900 whitespace-nowrap">{pkg.amount}</td>
                    <td className="py-2.5 pl-2 pr-4 text-right">
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-[10.5px] font-bold">
                        {pkg.rate}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile List */}
        <div className="relative z-10 sm:hidden p-3 space-y-2">
          {PACKAGE_ROWS.map((pkg) => {
            const PkgIcon = pkg.icon;
            return (
              <div
                key={pkg.name}
                className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${pkg.badgeCls}`}
                  >
                    <PkgIcon className="w-3.5 h-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold text-slate-900 truncate">{pkg.name}</p>
                    <p className="text-[10.5px] text-slate-500 font-medium">{pkg.txns} txns</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[12.5px] font-black text-slate-900">{pkg.amount}</p>
                  <span className="inline-flex px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold mt-0.5">
                    {pkg.rate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Recent Payments */}
      <div className="lg:col-span-7 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.10)] hover:border-indigo-300 transition-all duration-300 group flex flex-col">
        <div className="absolute top-0 right-0 w-52 h-52 bg-indigo-400/8 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        <div className="relative z-10 px-4 sm:px-5 py-3.5 border-b border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
              <Clock className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h3 className="text-[15px] font-black text-indigo-700 tracking-tight">
              Recent Payments
            </h3>
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex items-center gap-1 text-[12px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Desktop Table */}
        <div className="relative z-10 hidden md:block overflow-x-auto custom-scrollbar flex-1">
          <table className="w-full text-left text-[11px] xl:text-[11.5px]">
            <thead>
              <tr className="border-b border-slate-200/60 text-slate-600 font-bold bg-slate-50/50">
                <th className="py-2.5 pl-4 pr-2">Txn ID</th>
                <th className="py-2.5 px-2">Order ID</th>
                <th className="py-2.5 px-2">User</th>
                <th className="py-2.5 px-2 whitespace-nowrap">Amount (₹)</th>
                <th className="py-2.5 px-2 text-center">Status</th>
                <th className="py-2.5 pl-2 pr-4">Date &amp; Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-100/35">
              {recentPayments.slice(0, 4).map((row) => (
                <tr
                  key={row.txnId}
                  onClick={() => onSelectPayment?.(row)}
                  className="group/row hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300 cursor-pointer"
                >
                  <td className="py-2.5 pl-4 pr-2 font-bold text-indigo-600 group-hover/row:text-indigo-800 underline underline-offset-2 decoration-indigo-300">
                    {row.txnId}
                  </td>
                  <td className="py-2.5 px-2 font-semibold text-slate-700 whitespace-nowrap">
                    {row.orderId}
                  </td>
                  <td className="py-2.5 px-2 font-bold text-slate-900 whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="py-2.5 px-2 font-black text-slate-900 whitespace-nowrap tabular-nums">
                    {row.amount}
                  </td>
                  <td className="py-2.5 px-2 text-center">{renderStatusPill(row.paymentStatus)}</td>
                  <td className="py-2.5 pl-2 pr-4 text-slate-500 font-medium whitespace-nowrap">
                    {row.orderDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="relative z-10 md:hidden p-3 space-y-2.5">
          {recentPayments.slice(0, 4).map((row) => (
            <div
              key={row.txnId}
              onClick={() => onSelectPayment?.(row)}
              className="p-3 rounded-xl border border-slate-200/80 bg-white hover:border-indigo-300 transition-all space-y-2 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[12px] font-extrabold text-indigo-600 underline underline-offset-2 truncate">
                    {row.txnId}
                  </p>
                  <p className="text-[10.5px] font-semibold text-slate-400">{row.orderId}</p>
                </div>
                {renderStatusPill(row.paymentStatus)}
              </div>
              <div className="flex items-center justify-between text-[11.5px]">
                <span className="font-bold text-slate-800">{row.name}</span>
                <span className="font-black text-slate-900">₹{row.amount}</span>
              </div>
              <p className="text-[10.5px] text-slate-400 font-medium">{row.orderDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PaymentsTransactionsTable({
  title = 'All Transactions',
  rows = [],
  totalCount = 0,
  page = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  onSelectPayment,
  onExport,
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const showingFrom = rows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingTo = (page - 1) * pageSize + rows.length;

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.10)] hover:border-indigo-300 transition-all duration-300">
      <div className="px-4 sm:px-5 py-3.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-[15px] sm:text-[16px] font-black text-indigo-700 tracking-tight">
            {title} ({totalCount})
          </h3>
        </div>

        <button
          type="button"
          onClick={onExport}
          className="h-9 px-3.5 rounded-xl border border-slate-200/90 bg-white hover:bg-indigo-50/70 hover:border-indigo-300 hover:text-indigo-700 text-slate-700 text-[12px] font-bold shadow-2xs transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full text-left text-[11.5px]">
          <thead>
            <tr className="border-b border-slate-200/70 text-slate-600 font-bold bg-slate-50/60">
              <th className="py-3 pl-4 pr-2">Txn ID</th>
              <th className="py-3 px-2">Order ID</th>
              <th className="py-3 px-2">User</th>
              <th className="py-3 px-2">Package</th>
              <th className="py-3 px-2">Method</th>
              <th className="py-3 px-2 whitespace-nowrap">Amount (₹)</th>
              <th className="py-3 px-2 text-center">Status</th>
              <th className="py-3 px-2">Date &amp; Time</th>
              <th className="py-3 pl-2 pr-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-100/35">
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr
                  key={row.txnId}
                  onClick={() => onSelectPayment?.(row)}
                  className="group/row hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300 cursor-pointer"
                >
                  <td className="py-3 pl-4 pr-2 font-bold text-indigo-600 underline underline-offset-2 decoration-indigo-300">
                    {row.txnId}
                  </td>
                  <td className="py-3 px-2 font-semibold text-slate-700">{row.orderId}</td>
                  <td className="py-3 px-2">
                    <span className="block font-bold text-slate-900 leading-tight">{row.name}</span>
                    <span className="block text-[10px] font-semibold text-slate-400">{row.userId}</span>
                  </td>
                  <td className="py-3 px-2 font-semibold text-slate-700">{row.package}</td>
                  <td className="py-3 px-2 font-semibold text-slate-700">{row.paymentMethod}</td>
                  <td className="py-3 px-2 font-black text-slate-900 whitespace-nowrap">{row.amount}</td>
                  <td className="py-3 px-2 text-center">{renderStatusPill(row.paymentStatus)}</td>
                  <td className="py-3 px-2 text-slate-500 font-medium leading-tight">
                    <span className="block text-slate-700">{row.orderDate.split(',')[0]}</span>
                    <span className="block text-[10px] text-slate-400">{row.orderDate.split(',')[1]?.trim()}</span>
                  </td>
                  <td className="py-3 pl-2 pr-4 text-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPayment?.(row);
                      }}
                      className="w-7 h-7 rounded-lg border border-indigo-200/80 bg-white hover:bg-indigo-50 text-indigo-600 inline-flex items-center justify-center cursor-pointer"
                      title="View Payment Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-10 text-center text-slate-400 font-semibold">
                  No payment records match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden p-3.5 space-y-2.5">
        {rows.length > 0 ? (
          rows.map((row) => (
            <div
              key={row.txnId}
              onClick={() => onSelectPayment?.(row)}
              className="p-3.5 rounded-2xl border border-slate-200/80 bg-white space-y-2 hover:border-indigo-300 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                <div className="min-w-0">
                  <p className="text-[12px] font-extrabold text-indigo-600 underline truncate">{row.txnId}</p>
                  <p className="text-[10.5px] font-semibold text-slate-400">{row.orderId}</p>
                </div>
                {renderStatusPill(row.paymentStatus)}
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-bold text-slate-900">{row.name}</span>
                <span className="font-black text-slate-900">₹{row.amount}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{row.package} • {row.paymentMethod}</span>
                <span>{row.orderDate}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-slate-400 font-semibold text-[12px]">
            No payment records match the selected filters.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="px-4 sm:px-5 py-3 border-t border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-[11.5px] text-slate-500 font-medium">
          Showing {showingFrom} to {showingTo} of {totalCount} records
        </span>

        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11.5px] text-slate-500 font-medium">Rows:</span>
            <CustomSelect
              options={[
                { label: '5', value: '5' },
                { label: '10', value: '10' },
                { label: '25', value: '25' },
              ]}
              value={String(pageSize)}
              onChange={(val) => onPageSizeChange?.(Number(val))}
              align="right"
              buttonClassName="h-7.5 px-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between gap-1.5 min-w-[52px]"
              textClassName="text-[11.5px] font-bold text-slate-700"
              iconClassName="w-3 h-3 text-slate-400"
            />
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange?.(1)}
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange?.(Math.max(1, page - 1))}
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPageChange?.(p)}
                  className={`w-7 h-7 rounded-lg text-[11.5px] font-bold cursor-pointer ${
                    page === p
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(totalPages)}
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
