import React from 'react';
import { Calendar, ChevronDown, Search, Download, X } from 'lucide-react';

export default function PayoutFilters({
  dateRange,
  setDateRange,
  statusFilter,
  setStatusFilter,
  methodFilter,
  setMethodFilter,
  searchQuery,
  setSearchQuery,
  onExport
}) {
  return (
    <div className="relative z-10 p-4 lg:p-5 bg-linear-to-br from-white/90 to-indigo-50/30 backdrop-blur-xl border border-indigo-100/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-3.5 sm:gap-4 transition-all duration-300 hover:border-indigo-200">
      
      {/* Dropdown Filters (Row 1 on Laptops/Mobiles, Left on 2xl) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full 2xl:flex-1 2xl:max-w-2xl">
        {/* Date Range Dropdown */}
        <div className="relative min-w-[130px]">
          <div className="flex flex-col justify-center h-full px-3 py-1.5 bg-white/80 backdrop-blur-md border border-indigo-100/60 rounded-xl hover:border-indigo-300 transition-all shadow-2xs">
            <span className="text-[10px] font-extrabold text-indigo-900/50 uppercase tracking-wider -mb-0.5">Date Range</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-transparent text-[12.5px] font-bold text-slate-800 appearance-none focus:outline-none cursor-pointer pr-4 truncate"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="last30">Last 30 Days</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-indigo-400">
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="relative min-w-[120px]">
          <div className="flex flex-col justify-center h-full px-3 py-1.5 bg-white/80 backdrop-blur-md border border-indigo-100/60 rounded-xl hover:border-indigo-300 transition-all shadow-2xs">
            <span className="text-[10px] font-extrabold text-indigo-900/50 uppercase tracking-wider -mb-0.5">Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-transparent text-[12.5px] font-bold text-slate-800 appearance-none focus:outline-none cursor-pointer pr-4 truncate"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved / Paid</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-indigo-400">
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Payout Method Dropdown */}
        <div className="relative min-w-[130px]">
          <div className="flex flex-col justify-center h-full px-3 py-1.5 bg-white/80 backdrop-blur-md border border-indigo-100/60 rounded-xl hover:border-indigo-300 transition-all shadow-2xs">
            <span className="text-[10px] font-extrabold text-indigo-900/50 uppercase tracking-wider -mb-0.5">Payout Method</span>
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="w-full bg-transparent text-[12.5px] font-bold text-slate-800 appearance-none focus:outline-none cursor-pointer pr-4 truncate"
            >
              <option value="all">All Methods</option>
              <option value="bank">Bank Transfer</option>
              <option value="upi">UPI</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-indigo-400">
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Search and Export (Row 2 on Laptops/Mobiles, Right on 2xl) */}
      <div className="flex items-center gap-2.5 sm:gap-3 w-full 2xl:w-auto">
        {/* Search Input */}
        <div className="relative flex-1 2xl:w-64 2xl:focus-within:w-72 transition-all duration-300">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 transition-colors" />
          <input
            type="text"
            placeholder="Search by transaction ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 bg-white/80 backdrop-blur-md border border-indigo-100/60 rounded-xl text-[13px] font-medium placeholder:text-indigo-300 focus:outline-none focus:bg-white focus:border-[#4f3bf3] focus:ring-2 focus:ring-[#4f3bf3]/20 focus:shadow-md hover:border-indigo-300 transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-400 hover:text-indigo-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2.5 border border-indigo-200 text-[#4f3bf3] bg-white/80 backdrop-blur-md hover:bg-[#4f3bf3] hover:text-white hover:shadow-md hover:-translate-y-0.5 rounded-xl text-[13px] font-bold transition-all duration-300 shrink-0 group/export"
          title="Export payouts to Excel"
        >
          <Download className="w-4 h-4 group-hover/export:-translate-y-0.5 transition-transform" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

    </div>
  );
}
