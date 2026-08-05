import React from 'react';
import { Clock, ChevronDown, Search, Download } from 'lucide-react';

export default function OrderFilters({ t, searchTerm, setSearchTerm }) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Time Filter */}
        <div className="relative">
          <select className="appearance-none pl-10 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 min-w-[140px] cursor-pointer">
            <option>{t('orders.filters.allTime')}</option>
          </select>
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select className="appearance-none px-4 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 min-w-[130px] cursor-pointer">
            <option>{t('orders.filters.allStatus')}</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
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
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#4f3bf3] rounded-lg text-[12px] font-bold text-[#4f3bf3] hover:bg-indigo-50 transition-colors shrink-0">
          <Download className="w-4 h-4" />
          {t('orders.filters.export')}
        </button>
      </div>
    </div>
  );
}
