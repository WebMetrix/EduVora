import React from 'react';
import { Search, ChevronDown, ArrowRight, RotateCcw } from 'lucide-react';
import CustomDatePicker from '../common/CustomDatePicker';

export default function UserFiltersCard({
  filters,
  onFilterChange,
  onReset,
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 p-3.5 sm:p-4 lg:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.10)] hover:border-indigo-300 transition-all duration-300 group">
      {/* Decorative hover gradient flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      <div className="relative z-10 space-y-3">
        {/* Row 1: Search, Role, Status, Package */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
          {/* Search */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Search
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={onFilterChange}
                placeholder="Search by name, email, user ID..."
                className="w-full bg-white/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl pl-9 pr-3 py-2 text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all duration-200 shadow-2xs"
              />
            </div>
          </div>

          {/* User Role */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              User Role
            </label>
            <div className="relative">
              <select
                name="role"
                value={filters.role}
                onChange={onFilterChange}
                className="w-full bg-white/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3 py-2 text-[12px] font-bold text-slate-800 focus:outline-none appearance-none transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <option value="all">All Roles</option>
                <option value="User">User</option>
                <option value="Support">Support</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Account Status */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Account Status
            </label>
            <div className="relative">
              <select
                name="status"
                value={filters.status}
                onChange={onFilterChange}
                className="w-full bg-white/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3 py-2 text-[12px] font-bold text-slate-800 focus:outline-none appearance-none transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Package */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Package
            </label>
            <div className="relative">
              <select
                name="package"
                value={filters.package}
                onChange={onFilterChange}
                className="w-full bg-white/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3 py-2 text-[12px] font-bold text-slate-800 focus:outline-none appearance-none transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <option value="all">All Packages</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 2: Registration Date Range & Reset Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1 border-t border-slate-100/80">
          <div className="w-full sm:max-w-md">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Registration Date
            </label>
            <div className="flex items-center gap-1.5">
              <CustomDatePicker
                size="sm"
                separator="/"
                placeholder="From date"
                value={filters.fromDate}
                onChange={(val) => onFilterChange({ target: { name: 'fromDate', value: val } })}
                className="flex-1 min-w-0"
              />
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <CustomDatePicker
                size="sm"
                separator="/"
                placeholder="To date"
                value={filters.toDate}
                onChange={(val) => onFilterChange({ target: { name: 'toDate', value: val } })}
                className="flex-1 min-w-0"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-slate-600 hover:text-slate-900 font-bold text-[12px] shadow-2xs transition-all cursor-pointer w-full sm:w-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
