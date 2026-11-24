import React from 'react';
import { Search, ChevronDown, Calendar, ArrowRight } from 'lucide-react';

export default function KycFiltersCard({
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 p-3.5 sm:p-4 lg:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.10)] hover:border-indigo-300 transition-all duration-300 group">
      {/* Decorative hover gradient flare matching dashboard */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-3.5">
        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 flex-1">
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
                placeholder="Search by name, email, user ID or mobile number"
                className="w-full bg-white/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl pl-9 pr-3 py-2 text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all duration-200 shadow-2xs"
              />
            </div>
          </div>

          {/* KYC Status */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              KYC Status
            </label>
            <div className="relative">
              <select
                name="status"
                value={filters.status}
                onChange={onFilterChange}
                className="w-full bg-white/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3 py-2 text-[12px] font-bold text-slate-800 focus:outline-none appearance-none transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Identity Proof Type */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Identity Proof Type
            </label>
            <div className="relative">
              <select
                name="proofType"
                value={filters.proofType}
                onChange={onFilterChange}
                className="w-full bg-white/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3 py-2 text-[12px] font-bold text-slate-800 focus:outline-none appearance-none transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <option value="all">All Types</option>
                <option value="Aadhaar Card">Aadhaar Card</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Driving License">Driving License</option>
                <option value="Passport">Passport</option>
                <option value="Voter ID">Voter ID</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Submission Date Range */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Submission Date
            </label>
            <div className="flex items-center gap-1.5 bg-white/80 border border-slate-200/90 rounded-xl px-2.5 py-1.5 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all shadow-2xs">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                name="fromDate"
                value={filters.fromDate}
                onChange={onFilterChange}
                placeholder="From date"
                className="w-full bg-transparent text-[11.5px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <input
                type="text"
                name="toDate"
                value={filters.toDate}
                onChange={onFilterChange}
                placeholder="To date"
                className="w-full bg-transparent text-[11.5px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0 pt-1 lg:pt-0">
          <button
            type="button"
            onClick={onApplyFilters}
            className="flex-1 lg:flex-none px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-[12.5px] shadow-sm shadow-indigo-600/20 transition-all cursor-pointer text-center"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={onClearFilters}
            className="flex-1 lg:flex-none px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-slate-600 hover:text-slate-900 font-bold text-[12.5px] shadow-2xs transition-all cursor-pointer text-center"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
