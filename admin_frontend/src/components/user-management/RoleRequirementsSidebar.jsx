import React from 'react';
import { Info, User, Headphones } from 'lucide-react';

export default function RoleRequirementsSidebar({ selectedRole, onSelectRole }) {
  const isUserSelected = selectedRole === 'user';
  const isSupportSelected = selectedRole === 'support';

  return (
    <div className="space-y-4">
      {/* 1. Field Requirements Card */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.08)] hover:border-indigo-200 transition-all duration-300">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0 shadow-xs">
            <Info className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-[13.5px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Field Requirements
            </h4>
            <p className="text-[11.5px] text-slate-500 font-medium mt-1">
              Fields marked with <span className="text-rose-500 font-bold">*</span> are mandatory.
            </p>
          </div>
        </div>
      </div>

      {/* 2. User Role Card */}
      <div
        onClick={() => onSelectRole && onSelectRole('user')}
        className={`relative overflow-hidden rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.08)] transition-all duration-300 cursor-pointer group ${
          isUserSelected
            ? 'border-indigo-300 ring-2 ring-indigo-500/10'
            : 'border-slate-200/80 hover:border-slate-300'
        }`}
      >
        {/* Glow flare */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        <div className="flex items-start gap-3.5 mb-3.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
              User
            </h4>
            <p className="text-[11.5px] text-slate-500 font-medium mt-0.5 leading-snug">
              End user who can purchase packages and refer others.
            </p>
          </div>
        </div>

        <ul className="space-y-2 pt-2 border-t border-slate-100 text-[12px] text-slate-600 font-medium pl-1">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0" />
            <span>Requires package selection</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0" />
            <span>Requires referral ID</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0" />
            <span>Can access product content</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0" />
            <span>Can earn commissions</span>
          </li>
        </ul>
      </div>

      {/* 3. Support Role Card */}
      <div
        onClick={() => onSelectRole && onSelectRole('support')}
        className={`relative overflow-hidden rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.08)] transition-all duration-300 cursor-pointer group ${
          isSupportSelected
            ? 'border-indigo-300 ring-2 ring-indigo-500/10'
            : 'border-slate-200/80 hover:border-slate-300'
        }`}
      >
        {/* Glow flare */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        <div className="flex items-start gap-3.5 mb-3.5">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Headphones className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
              Support
            </h4>
            <p className="text-[11.5px] text-slate-500 font-medium mt-0.5 leading-snug">
              Internal support staff with platform access.
            </p>
          </div>
        </div>

        <ul className="space-y-2 pt-2 border-t border-slate-100 text-[12px] text-slate-600 font-medium pl-1">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0" />
            <span>No package required</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0" />
            <span>No referral ID required</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0" />
            <span>Can access admin features (as per permissions)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0" />
            <span>Used for customer support and operations</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
