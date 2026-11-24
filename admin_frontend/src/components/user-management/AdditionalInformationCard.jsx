import React from 'react';
import { FileText } from 'lucide-react';

export default function AdditionalInformationCard({ notes, onChange }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.08)] hover:border-indigo-200 transition-all duration-300 group">
      {/* Glow flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100/90 mb-5">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
          <FileText className="w-4 h-4 text-indigo-600" />
        </div>
        <h3 className="text-[15px] font-extrabold text-slate-900 tracking-tight">
          Additional Information
        </h3>
      </div>

      <div>
        <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
          Notes (Internal)
        </label>
        <textarea
          name="notes"
          value={notes}
          onChange={onChange}
          rows={4}
          placeholder="Enter internal notes about this user..."
          className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3.5 py-2.5 text-[12.5px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all duration-200 resize-y min-h-[96px]"
        />
      </div>
    </div>
  );
}
