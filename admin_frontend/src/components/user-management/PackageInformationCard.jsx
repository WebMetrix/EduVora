import React from 'react';
import { Package, ChevronDown, Calendar } from 'lucide-react';

export default function PackageInformationCard({ formData, onChange }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.08)] hover:border-indigo-200 transition-all duration-300 group">
      {/* Glow flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100/90 mb-5">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
          <Package className="w-4 h-4 text-indigo-600" />
        </div>
        <h3 className="text-[15px] font-extrabold text-slate-900 tracking-tight">
          Package Information
        </h3>
      </div>

      {/* 4 Columns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Package */}
        <div>
          <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
            Package
          </label>
          <div className="relative">
            <select
              name="package"
              value={formData.package}
              onChange={onChange}
              className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3.5 py-2.5 text-[12.5px] font-bold text-slate-800 focus:outline-none appearance-none transition-all duration-200 cursor-pointer"
            >
              <option value="Premium">Premium</option>
              <option value="Business Starter">Business Starter</option>
              <option value="Growth Pack">Growth Pack</option>
              <option value="Basic">Basic</option>
              <option value="Advanced">Advanced</option>
              <option value="Pro">Pro</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Package Status */}
        <div>
          <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
            Package Status
          </label>
          <div className="relative">
            <select
              name="packageStatus"
              value={formData.packageStatus}
              onChange={onChange}
              className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3.5 py-2.5 text-[12.5px] font-bold text-slate-800 focus:outline-none appearance-none transition-all duration-200 cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Suspended">Suspended</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Purchase Date */}
        <div>
          <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
            Purchase Date
          </label>
          <div className="flex items-center gap-2 bg-slate-100/70 border border-slate-200/80 rounded-xl px-3 py-2.5 text-[12px] font-semibold text-slate-600 truncate">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">12 Oct 2026 11:15 AM</span>
          </div>
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
            Expiry Date
          </label>
          <div className="flex items-center gap-2 bg-slate-100/70 border border-slate-200/80 rounded-xl px-3 py-2.5 text-[12px] font-semibold text-slate-600 truncate">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">12 Oct 2027 11:15 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
