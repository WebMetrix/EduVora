import React from 'react';
import { Users, GitFork, User } from 'lucide-react';

export default function ReferralOverviewStats() {
  const stats = [
    {
      id: 'total-users',
      label: 'Total Users',
      value: '12,846',
      trend: '12%',
      trendLabel: 'vs last month',
      icon: Users,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      flareColor: 'bg-indigo-400/10',
    },
    {
      id: 'total-referrals',
      label: 'Total Referrals',
      value: '24,312',
      trend: '14%',
      trendLabel: 'vs last month',
      icon: GitFork,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      flareColor: 'bg-sky-400/10',
    },
    {
      id: 'direct-referrals',
      label: 'Direct Referrals (Level 1)',
      value: '16,420',
      trend: '11%',
      trendLabel: 'vs last month',
      icon: User,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      flareColor: 'bg-emerald-400/10',
    },
    {
      id: 'indirect-referrals',
      label: 'Indirect Referrals (Level 2)',
      value: '7,892',
      trend: '21%',
      trendLabel: 'vs last month',
      icon: Users,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
      flareColor: 'bg-orange-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 items-stretch">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.id}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 p-3.5 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 group flex items-center gap-3 sm:gap-4 h-full min-h-[96px] sm:min-h-[104px]"
          >
            {/* Decorative hover gradient flare */}
            <div
              className={`absolute top-0 right-0 w-48 h-48 ${s.flareColor} rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700`}
            />

            {/* Icon Circle */}
            <div
              className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${s.iconBg} ${s.iconColor} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-3" />
            </div>

            {/* Stats Body */}
            <div className="relative z-10 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1.5 mb-0.5 sm:mb-1">
                <span className="text-[11.5px] sm:text-[12.5px] font-semibold text-slate-500 truncate group-hover:text-slate-700 transition-colors">
                  {s.label}
                </span>
                <span className="text-[9.5px] sm:text-[10.5px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full inline-flex items-center gap-0.5 shrink-0 bg-emerald-50 text-emerald-600 border border-emerald-100/60">
                  <span>↑</span>
                  <span>{s.trend}</span>
                </span>
              </div>

              <h3 className="text-[20px] sm:text-[24px] font-black text-slate-900 tracking-tight leading-tight group-hover:text-indigo-950 transition-colors truncate">
                {s.value}
              </h3>

              <p className="text-[10.5px] sm:text-[11px] font-medium text-slate-400 mt-0.5 truncate">
                {s.trendLabel}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
