import React from 'react';

export default function StatCard({
  title,
  value,
  trend,
  trendPositive = true,
  subtitle,
  icon: Icon,
  iconBg = 'bg-indigo-50',
  iconColor = 'text-indigo-600',
  flareColor = 'bg-indigo-400/10'
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 p-3.5 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 group flex items-center gap-3 sm:gap-4">
      {/* Decorative hover gradient flare */}
      <div className={`absolute top-0 right-0 w-48 h-48 ${flareColor} rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700`} />

      {/* Icon Circle */}
      <div className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-3" />
      </div>

      {/* Stats Body */}
      <div className="relative z-10 flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1.5 mb-0.5 sm:mb-1">
          <span className="text-[11.5px] sm:text-[12.5px] font-semibold text-slate-500 truncate group-hover:text-slate-700 transition-colors">
            {title}
          </span>
          {trend && (
            <span
              className={`text-[9.5px] sm:text-[10.5px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full inline-flex items-center gap-0.5 shrink-0 ${
                trendPositive
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/60'
                  : 'bg-rose-50 text-rose-600 border border-rose-100/60'
              }`}
            >
              <span>↑</span>
              <span>{trend}</span>
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <h3 className="text-[20px] sm:text-[24px] font-black text-slate-900 tracking-tight leading-tight group-hover:text-indigo-950 transition-colors">
            {value}
          </h3>
        </div>

        {subtitle && (
          <p className="text-[10.5px] sm:text-[11px] font-medium text-slate-400 mt-0.5 truncate">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
