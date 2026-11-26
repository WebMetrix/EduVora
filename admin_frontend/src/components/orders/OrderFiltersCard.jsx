import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import CustomSelect from '../common/CustomSelect';
import DateRangePicker from '../common/DateRangePicker';

const PACKAGE_OPTIONS = [
  { label: 'All Packages', value: 'all' },
  { label: 'Elite Package', value: 'Elite Package' },
  { label: 'Pro Package', value: 'Pro Package' },
  { label: 'Growth Package', value: 'Growth Package' },
  { label: 'Starter Package', value: 'Starter Package' },
];

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Failed', value: 'Failed' },
  { label: 'Refunded', value: 'Refunded' },
];

const PAYMENT_METHOD_OPTIONS = [
  { label: 'All Methods', value: 'all' },
  { label: 'UPI', value: 'UPI' },
  { label: 'Credit Card', value: 'Credit Card' },
  { label: 'Net Banking', value: 'Net Banking' },
  { label: 'Debit Card', value: 'Debit Card' },
];

export default function OrderFiltersCard({
  filters,
  onChange,
  onApply,
  onReset,
}) {
  return (
    <form
      onSubmit={onApply}
      className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-3.5 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.08)] hover:border-indigo-300 transition-all duration-300"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 2xl:flex 2xl:items-end gap-3 items-end">
        {/* Search by Order ID / User ID / Email */}
        <div className="sm:col-span-2 lg:col-span-4 2xl:flex-[1.35] 2xl:min-w-[215px]">
          <label className="block text-[11.5px] font-bold text-slate-600 mb-1 whitespace-nowrap">
            Order ID / User ID / Email
          </label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => onChange('search', e.target.value)}
              placeholder="Search by Order ID, User ID or Email..."
              className="w-full h-10 bg-slate-50/75 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-[#4f3bf3] focus:ring-4 focus:ring-indigo-500/10 rounded-xl pl-8.5 pr-3 text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Package */}
        <div className="lg:col-span-4 2xl:flex-1 2xl:min-w-[140px]">
          <label className="block text-[11.5px] font-bold text-slate-600 mb-1 whitespace-nowrap">
            Package
          </label>
          <CustomSelect
            options={PACKAGE_OPTIONS}
            value={filters.packageName}
            onChange={(val) => onChange('packageName', val)}
            buttonClassName="w-full h-10 flex items-center justify-between gap-2 px-3 bg-white/85 hover:bg-white border border-slate-200/90 hover:border-indigo-300 rounded-xl shadow-2xs transition-all"
            textClassName="text-[12px] font-bold text-slate-700"
            iconClassName="w-3.5 h-3.5 text-slate-400"
          />
        </div>

        {/* Order Status */}
        <div className="lg:col-span-4 2xl:flex-1 2xl:min-w-[135px]">
          <label className="block text-[11.5px] font-bold text-slate-600 mb-1 whitespace-nowrap">
            Order Status
          </label>
          <CustomSelect
            options={STATUS_OPTIONS}
            value={filters.status}
            onChange={(val) => onChange('status', val)}
            buttonClassName="w-full h-10 flex items-center justify-between gap-2 px-3 bg-white/85 hover:bg-white border border-slate-200/90 hover:border-indigo-300 rounded-xl shadow-2xs transition-all"
            textClassName="text-[12px] font-bold text-slate-700"
            iconClassName="w-3.5 h-3.5 text-slate-400"
          />
        </div>

        {/* Payment Method */}
        <div className="lg:col-span-4 2xl:flex-1 2xl:min-w-[135px]">
          <label className="block text-[11.5px] font-bold text-slate-600 mb-1 whitespace-nowrap">
            Payment Method
          </label>
          <CustomSelect
            options={PAYMENT_METHOD_OPTIONS}
            value={filters.paymentMethod}
            onChange={(val) => onChange('paymentMethod', val)}
            buttonClassName="w-full h-10 flex items-center justify-between gap-2 px-3 bg-white/85 hover:bg-white border border-slate-200/90 hover:border-indigo-300 rounded-xl shadow-2xs transition-all"
            textClassName="text-[12px] font-bold text-slate-700"
            iconClassName="w-3.5 h-3.5 text-slate-400"
          />
        </div>

        {/* Date Range Picker matching frontend calendar UI */}
        <div className="sm:col-span-2 lg:col-span-4 2xl:w-[215px] 2xl:shrink-0">
          <label className="block text-[11.5px] font-bold text-slate-600 mb-1 whitespace-nowrap">
            Date Range
          </label>
          <DateRangePicker
            variant="modal"
            value={filters.dateRange}
            onChange={(val) => onChange('dateRange', val)}
            placeholder="01 Oct 2026 - 31 Oct 2026"
            initialMonth={new Date(2026, 9, 1)}
            className="w-full"
          />
        </div>

        {/* Search & Reset Buttons */}
        <div className="sm:col-span-2 lg:col-span-4 2xl:w-[190px] 2xl:shrink-0 flex items-center gap-2">
          <button
            type="submit"
            className="flex-1 h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-[12px] font-bold shadow-sm shadow-indigo-600/20 hover:shadow-md hover:shadow-indigo-600/30 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
          <button
            type="button"
            onClick={onReset}
            className="flex-1 h-10 px-3.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 active:scale-98 text-slate-700 text-[12px] font-bold shadow-2xs transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </form>
  );
}
