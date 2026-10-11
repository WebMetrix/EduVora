import React from 'react';
import { Clock, Search, Download } from 'lucide-react';
import CustomSelect from '../common/CustomSelect';

export default function OrderFilters({
  t,
  searchTerm,
  setSearchTerm,
  timeFilter = '',
  setTimeFilter,
  statusFilter = '',
  setStatusFilter,
  onExport
}) {
  const timeOptions = [
    { label: t('orders.filters.allTime') || 'All Time', value: '' },
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
  ];

  const statusOptions = [
    { label: t('orders.filters.allStatus') || 'All Status', value: '' },
    { label: t('orders.status.completed') || 'Completed', value: 'completed' },
    { label: t('orders.status.pending') || 'Pending', value: 'pending' },
    { label: t('orders.status.failed') || 'Failed', value: 'failed' },
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      <div className="flex flex-row items-center gap-2 sm:gap-3 w-full md:w-auto">
        {/* Time Filter */}
        <div className="flex-1 sm:flex-none">
          <CustomSelect
            options={timeOptions}
            value={timeFilter}
            onChange={(val) => setTimeFilter && setTimeFilter(val)}
            leftIcon={<Clock className="w-4 h-4 text-slate-400" />}
            buttonClassName="w-full sm:w-auto flex items-center justify-between gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm min-w-[130px]"
            textClassName="text-[12px] font-bold text-slate-700"
            iconClassName="w-3.5 h-3.5 text-slate-400"
          />
        </div>

        {/* Status Filter */}
        <div className="flex-1 sm:flex-none">
          <CustomSelect
            options={statusOptions}
            value={statusFilter}
            onChange={(val) => setStatusFilter && setStatusFilter(val)}
            buttonClassName="w-full sm:w-auto flex items-center justify-between gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm min-w-[125px]"
            textClassName="text-[12px] font-bold text-slate-700"
            iconClassName="w-3.5 h-3.5 text-slate-400"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={t('orders.filters.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 placeholder:text-slate-400"
          />
        </div>

        {/* Export Button */}
        <button onClick={onExport} className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#4f3bf3] rounded-lg text-[12px] font-bold text-[#4f3bf3] hover:bg-indigo-50 transition-colors shrink-0">
          <Download className="w-4 h-4" />
          {t('orders.filters.export')}
        </button>
      </div>
    </div>
  );
}
