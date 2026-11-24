import React from 'react';
import { Users, User, Headphones, Ban } from 'lucide-react';

export default function UserStatsCards({ stats }) {
  const cards = [
    {
      id: 'total',
      label: 'Total Users',
      value: stats?.total ?? '1,248',
      icon: Users,
      iconBg: 'bg-purple-100 text-purple-600 border-purple-200/80',
      flareColor: 'bg-purple-400/10',
    },
    {
      id: 'endUsers',
      label: 'End Users',
      value: stats?.endUsers ?? '1,120',
      icon: User,
      iconBg: 'bg-blue-100 text-blue-600 border-blue-200/80',
      flareColor: 'bg-blue-400/10',
    },
    {
      id: 'supportUsers',
      label: 'Support Users',
      value: stats?.supportUsers ?? '128',
      icon: Headphones,
      iconBg: 'bg-sky-100 text-sky-600 border-sky-200/80',
      flareColor: 'bg-sky-400/10',
    },
    {
      id: 'inactiveUsers',
      label: 'Inactive Users',
      value: stats?.inactiveUsers ?? '36',
      icon: Ban,
      iconBg: 'bg-rose-100 text-rose-600 border-rose-200/80',
      flareColor: 'bg-rose-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 p-3.5 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 group flex items-center gap-3 sm:gap-4"
          >
            {/* Ambient hover flare */}
            <div
              className={`absolute top-0 right-0 w-48 h-48 ${card.flareColor} rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700`}
            />

            {/* Icon Circle */}
            <div
              className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md transition-all duration-300 ${card.iconBg}`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
            </div>

            {/* Stats Body */}
            <div className="relative z-10 min-w-0 flex-1">
              <p className="text-[11.5px] sm:text-[12.5px] font-semibold text-slate-500 group-hover:text-slate-700 transition-colors tracking-tight truncate">
                {card.label}
              </p>
              <h3 className="text-[18px] sm:text-[22px] lg:text-[26px] font-black text-slate-900 tracking-tight leading-none mt-0.5 sm:mt-1 truncate">
                {card.value}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
