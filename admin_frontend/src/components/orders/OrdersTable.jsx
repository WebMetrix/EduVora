import React from 'react';
import {
  ShoppingCart, Download, Layers, ChevronDown, Eye, FileText,
  Crown, Diamond, Star, Sparkles, CreditCard, Landmark, Smartphone,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight
} from 'lucide-react';
import CustomSelect from '../common/CustomSelect';

const PACKAGE_STYLES = {
  'Elite Package': {
    icon: Crown,
    bg: 'bg-rose-50 text-rose-600 border-rose-200/80',
  },
  'Pro Package': {
    icon: Diamond,
    bg: 'bg-amber-50 text-amber-600 border-amber-200/80',
  },
  'Growth Package': {
    icon: Star,
    bg: 'bg-sky-50 text-sky-600 border-sky-200/80',
  },
  'Starter Package': {
    icon: Sparkles,
    bg: 'bg-indigo-50 text-indigo-600 border-indigo-200/80',
  },
};

const PAYMENT_STYLES = {
  UPI: { icon: Smartphone, color: 'text-emerald-600 bg-emerald-50 border-emerald-200/70' },
  'Credit Card': { icon: CreditCard, color: 'text-indigo-600 bg-indigo-50 border-indigo-200/70' },
  'Net Banking': { icon: Landmark, color: 'text-violet-600 bg-violet-50 border-violet-200/70' },
  'Debit Card': { icon: CreditCard, color: 'text-sky-600 bg-sky-50 border-sky-200/70' },
};

const STATUS_BADGES = {
  Completed: {
    pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    dot: 'bg-emerald-500',
  },
  Pending: {
    pill: 'bg-amber-50 text-amber-700 border-amber-200/70',
    dot: 'bg-amber-500',
  },
  Failed: {
    pill: 'bg-rose-50 text-rose-700 border-rose-200/70',
    dot: 'bg-rose-500',
  },
  Refunded: {
    pill: 'bg-sky-50 text-sky-700 border-sky-200/70',
    dot: 'bg-sky-500',
  },
};

export default function OrdersTable({
  sectionTitle = 'Orders',
  totalLabelCount = '2,846',
  rows = [],
  totalFilteredCount = 0,
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
  onExport,
  onBulkAction,
  onViewOrder,
  onViewInvoice,
  page = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  activeTab = 'orders',
}) {
  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / pageSize));
  const allCurrentSelected =
    rows.length > 0 && rows.every((r) => selectedIds.includes(r.orderId));

  const renderPackageBadge = (pkg) => {
    const cfg = PACKAGE_STYLES[pkg] || PACKAGE_STYLES['Starter Package'];
    const PkgIcon = cfg.icon;
    return (
      <div className="flex items-center gap-1.5 min-w-0">
        <span
          className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs ${cfg.bg}`}
        >
          <PkgIcon className="w-3.5 h-3.5" />
        </span>
        <span className="font-semibold text-slate-800 leading-tight">{pkg}</span>
      </div>
    );
  };

  const renderPaymentBadge = (method) => {
    const cfg = PAYMENT_STYLES[method] || PAYMENT_STYLES.UPI;
    const PayIcon = cfg.icon;
    return (
      <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
        <span
          className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${cfg.color}`}
        >
          <PayIcon className="w-3.5 h-3.5" />
        </span>
        <span className="font-semibold text-slate-700">{method}</span>
      </div>
    );
  };

  const renderStatusBadge = (status) => {
    const cfg = STATUS_BADGES[status] || STATUS_BADGES.Pending;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border whitespace-nowrap shadow-2xs transition-transform duration-300 group-hover/row:scale-105 ${cfg.pill}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        <span>{status}</span>
      </span>
    );
  };

  const splitDateTime = (val = '') => {
    const parts = val.split(',');
    if (parts.length >= 2) {
      return { date: `${parts[0].trim()},`, time: parts.slice(1).join(',').trim() };
    }
    return { date: val, time: '' };
  };

  const bulkOptions = [
    { label: 'Bulk Actions', value: '' },
    { label: 'Mark Completed', value: 'mark_completed' },
    { label: 'Generate Invoices', value: 'generate_invoices' },
    { label: 'Export Selected', value: 'export_selected' },
  ];

  const rowSizeOptions = [
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '25', value: '25' },
  ];

  const showingFrom = rows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingTo = (page - 1) * pageSize + rows.length;

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.10)] hover:border-indigo-300 transition-all duration-300 group">
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-400/8 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Header Bar */}
      <div className="relative z-10 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
            <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[15px] sm:text-[17px] font-black text-indigo-700 tracking-tight">
              {sectionTitle} ({totalLabelCount})
            </h3>
            {selectedIds.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10.5px] font-bold">
                {selectedIds.length} selected
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onExport}
            className="flex-1 sm:flex-none h-9 px-3.5 rounded-xl border border-slate-200/90 bg-white hover:bg-indigo-50/70 hover:border-indigo-300 hover:text-indigo-700 text-slate-700 text-[12px] font-bold shadow-2xs transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <CustomSelect
            options={bulkOptions}
            value=""
            placeholder="Bulk Actions"
            leftIcon={<Layers className="w-3.5 h-3.5 text-slate-500" />}
            align="right"
            onChange={(val) => {
              if (val) onBulkAction?.(val);
            }}
            buttonClassName="h-9 px-3.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-indigo-300 text-slate-700 shadow-2xs transition-all flex items-center justify-between gap-2 min-w-[138px]"
            textClassName="text-[12px] font-bold text-slate-700"
            iconClassName="w-3.5 h-3.5 text-slate-400"
          />
        </div>
      </div>

      {/* Desktop Table View (>= md) - compact 2-line cells so no horizontal scroll is needed */}
      <div className="relative z-10 hidden md:block">
        <table className="w-full text-left text-[11.5px] xl:text-[12px]">
          <thead>
            <tr className="border-b border-slate-200/70 text-slate-700 font-extrabold bg-slate-50/60">
              <th className="py-3 pl-4 pr-2 w-9 text-center">
                <input
                  type="checkbox"
                  checked={allCurrentSelected}
                  onChange={onToggleSelectAll}
                  className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                  aria-label="Select all orders on page"
                />
              </th>
              <th className="py-3 px-2 font-bold">
                {activeTab === 'invoices' ? 'Invoice / Order ID' : 'Order ID'}
              </th>
              <th className="py-3 px-2 font-bold">User</th>
              <th className="py-3 px-2 font-bold">Package</th>
              <th className="py-3 px-2 font-bold whitespace-nowrap">Amount (₹)</th>
              <th className="py-3 px-2 font-bold">Payment Method</th>
              <th className="py-3 px-2 font-bold">Order Date</th>
              <th className="py-3 px-2 font-bold text-center">Status</th>
              <th className="py-3 pl-2 pr-4 font-bold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-100/35">
            {rows.length > 0 ? (
              rows.map((row) => {
                const isSelected = selectedIds.includes(row.orderId);
                const dt = splitDateTime(row.orderDate);
                const hasInvoice = row.status === 'Completed' || row.status === 'Refunded';

                return (
                  <tr
                    key={row.orderId}
                    className={`group/row border-b border-indigo-100/35 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300 ${
                      isSelected ? 'bg-indigo-50/40' : ''
                    }`}
                  >
                    <td className="py-3 pl-4 pr-2 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(row.orderId)}
                        className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                        aria-label={`Select order ${row.orderId}`}
                      />
                    </td>

                    <td className="py-3 px-2 leading-tight">
                      <button
                        type="button"
                        onClick={() => onViewOrder?.(row)}
                        className="font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-2 decoration-indigo-300 hover:decoration-indigo-600 transition-colors cursor-pointer text-left"
                      >
                        {row.orderId}
                      </button>
                      {activeTab === 'invoices' && (
                        <span className="block text-[10px] font-semibold text-slate-400 mt-0.5">
                          {row.invoiceNo}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={row.avatar}
                          alt={row.name}
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200/90 shadow-2xs transition-transform duration-300 group-hover/row:scale-110"
                        />
                        <div className="min-w-0 leading-tight">
                          <span className="block font-bold text-slate-900 group-hover/row:text-indigo-950 truncate">
                            {row.name}
                          </span>
                          <span className="block text-[10.5px] font-semibold text-slate-400">
                            {row.userId}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-2">{renderPackageBadge(row.package)}</td>

                    <td className="py-3 px-2 font-black text-slate-900 whitespace-nowrap tabular-nums">
                      {row.amount}
                    </td>

                    <td className="py-3 px-2">{renderPaymentBadge(row.paymentMethod)}</td>

                    <td className="py-3 px-2 text-slate-600 font-medium leading-tight">
                      <span className="block font-semibold text-slate-700 whitespace-nowrap">{dt.date}</span>
                      <span className="block text-[10.5px] text-slate-400 whitespace-nowrap">{dt.time}</span>
                    </td>

                    <td className="py-3 px-2 text-center">{renderStatusBadge(row.status)}</td>

                    <td className="py-3 pl-2 pr-4 text-center whitespace-nowrap">
                      <div className="inline-flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onViewOrder?.(row)}
                          className="w-7 h-7 rounded-lg border border-indigo-200/80 bg-white hover:bg-indigo-50 text-indigo-600 hover:text-indigo-800 inline-flex items-center justify-center shadow-2xs transition-all group-hover/row:scale-105 cursor-pointer"
                          title="View Order Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {hasInvoice && (
                          <button
                            type="button"
                            onClick={() => onViewInvoice?.(row)}
                            className="w-7 h-7 rounded-lg border border-indigo-200/80 bg-white hover:bg-indigo-50 text-indigo-600 hover:text-indigo-800 inline-flex items-center justify-center shadow-2xs transition-all group-hover/row:scale-105 cursor-pointer"
                            title="View / Download Invoice"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-400 font-semibold">
                  No orders match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (< md) */}
      <div className="relative z-10 md:hidden p-3.5 space-y-3">
        {rows.length > 0 && (
          <div className="flex items-center justify-between px-1 pb-1">
            <label className="inline-flex items-center gap-2 text-[11.5px] font-bold text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={allCurrentSelected}
                onChange={onToggleSelectAll}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
              <span>Select all on page ({rows.length})</span>
            </label>
          </div>
        )}
        {rows.length > 0 ? (
          rows.map((row) => {
            const isSelected = selectedIds.includes(row.orderId);
            const hasInvoice = row.status === 'Completed' || row.status === 'Refunded';
            return (
              <div
                key={row.orderId}
                className={`p-3.5 rounded-2xl border bg-white shadow-2xs space-y-2.5 transition-all ${
                  isSelected
                    ? 'border-indigo-400 ring-2 ring-indigo-500/15'
                    : 'border-slate-200/80 hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(row.orderId)}
                      className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600 shrink-0"
                    />
                    <div className="min-w-0">
                      <button
                        type="button"
                        onClick={() => onViewOrder?.(row)}
                        className="text-[12.5px] font-extrabold text-indigo-600 underline underline-offset-2 text-left truncate block"
                      >
                        {row.orderId}
                      </button>
                      <span className="text-[11px] font-medium text-slate-400">
                        {row.orderDate}
                      </span>
                    </div>
                  </div>
                  {renderStatusBadge(row.status)}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={row.avatar}
                      alt={row.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-bold text-slate-900 truncate">{row.name}</p>
                      <p className="text-[11px] font-semibold text-slate-400">{row.userId}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block text-[10px] font-semibold text-slate-400">Amount</span>
                    <span className="text-[14px] font-black text-slate-900">₹ {row.amount}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-[11.5px]">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block mb-1">Package</span>
                    {renderPackageBadge(row.package)}
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block mb-1">Payment Method</span>
                    {renderPaymentBadge(row.paymentMethod)}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onViewOrder?.(row)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/70 text-indigo-700 text-[11.5px] font-bold cursor-pointer transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Order</span>
                  </button>
                  {hasInvoice && (
                    <button
                      type="button"
                      onClick={() => onViewInvoice?.(row)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11.5px] font-bold cursor-pointer transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Invoice</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-10 text-center text-slate-400 font-semibold text-[12.5px]">
            No orders match the selected filters.
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="relative z-10 px-4 sm:px-5 py-3 border-t border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-[11.5px] text-slate-500 font-medium">
          Showing {showingFrom} to {showingTo} of {totalLabelCount} orders
        </span>

        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11.5px] text-slate-500 font-medium">Rows per page:</span>
            <CustomSelect
              options={rowSizeOptions}
              value={String(pageSize)}
              onChange={(val) => onPageSizeChange?.(Number(val))}
              align="right"
              buttonClassName="h-7.5 px-2.5 rounded-lg border border-slate-200 bg-white hover:border-indigo-300 flex items-center justify-between gap-1.5 min-w-[54px]"
              textClassName="text-[11.5px] font-bold text-slate-700"
              iconClassName="w-3 h-3 text-slate-400"
            />
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange?.(1)}
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer disabled:cursor-not-allowed"
              aria-label="First page"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange?.(Math.max(1, page - 1))}
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Previous page"
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
                  className={`w-7 h-7 rounded-lg text-[11.5px] font-bold transition-all cursor-pointer ${
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
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(totalPages)}
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Last page"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
