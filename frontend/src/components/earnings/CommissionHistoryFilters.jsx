import React, { useState } from 'react';
import { Calendar, ChevronDown, Download, Filter } from 'lucide-react';
import CustomSelect from '../common/CustomSelect';

export default function CommissionHistoryFilters({ t, loading }) {
  const [levelFilter, setLevelFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mt-6">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
        {/* Date Range Picker Placeholder */}
        <div className="relative w-full sm:w-auto">
          <div className={`flex items-center justify-between gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-xl transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-indigo-300'}`}>
            <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
              <Calendar className="w-4 h-4 text-slate-500" />
              01 May 2025 - 31 May 2025
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>
        </div>

        <div className="flex flex-row items-center gap-4 w-full sm:w-auto">
          {/* Level Dropdown */}
          <div className="flex-1 sm:flex-none">
            <CustomSelect
              options={[
                { label: t('earnings.history.filters.allLevels'), value: '' },
                { label: 'Level 1', value: 'Level 1' },
                { label: 'Level 2', value: 'Level 2' },
              ]}
              value={levelFilter}
              onChange={(val) => setLevelFilter(val)}
              disabled={loading}
              buttonClassName="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors sm:min-w-[140px]"
              textClassName="text-[12px] sm:text-[13px] font-bold text-slate-700"
              iconClassName="w-4 h-4 text-slate-500"
            />
          </div>

          {/* Type Dropdown */}
          <div className="flex-1 sm:flex-none">
            <CustomSelect
              options={[
                { label: t('earnings.history.filters.allTypes'), value: '' },
                { label: 'Package Purchase', value: 'Package Purchase' },
                { label: 'Package Upgrade', value: 'Package Upgrade' },
              ]}
              value={typeFilter}
              onChange={(val) => setTypeFilter(val)}
              disabled={loading}
              buttonClassName="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors sm:min-w-[140px]"
              textClassName="text-[12px] sm:text-[13px] font-bold text-slate-700"
              iconClassName="w-4 h-4 text-slate-500"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full xl:w-auto">
        {/* Export Button */}
        <button 
          disabled={loading}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-indigo-200 text-indigo-600 rounded-xl text-[13px] font-bold hover:bg-indigo-50 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          {t('earnings.history.filters.export')}
        </button>

        {/* Filter Button */}
        <button 
          disabled={loading}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#4f3bf3] text-white rounded-xl text-[13px] font-bold hover:bg-indigo-700 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Filter className="w-4 h-4" />
          {t('earnings.history.filters.filter')}
        </button>
      </div>
    </div>
  );
}
