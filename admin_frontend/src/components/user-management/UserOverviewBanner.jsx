import React from 'react';

export default function UserOverviewBanner({ user }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.08)] hover:border-indigo-200 transition-all duration-300 group">
      {/* Decorative hover gradient flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: User Avatar & Basic Identity */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-indigo-100 shadow-sm"
            />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-[18px] sm:text-[20px] font-black text-slate-900 tracking-tight leading-tight">
                {user.fullName}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
            <p className="text-[12px] sm:text-[12.5px] text-slate-500 font-medium mt-1">
              <span className="font-bold text-slate-700">{user.userId}</span>
              <span className="mx-2 text-slate-300">|</span>
              <span>Joined on {user.joinedDate}</span>
            </p>
          </div>
        </div>

        {/* Right: Role & Package Badge Pills */}
        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <span className="px-3 py-1 rounded-xl text-[12px] font-bold bg-purple-100/70 text-purple-700 border border-purple-200/60 shadow-2xs">
            {user.role}
          </span>
          <span className="px-3.5 py-1 rounded-xl text-[12px] font-bold bg-indigo-100/70 text-indigo-700 border border-indigo-200/60 shadow-2xs">
            {user.package}
          </span>
        </div>
      </div>
    </div>
  );
}
