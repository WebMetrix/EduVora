import React from 'react';
import { ShoppingCart, CheckCircle2, Clock, XCircle, RotateCcw } from 'lucide-react';

export default function OrderStatsCards({ stats }) {
  const cards = [
    {
      id: 'total',
      title: 'Total Orders',
      value: stats?.total ?? '2,846',
      icon: ShoppingCart,
      cardBg: 'from-white/95 to-indigo-50/50',
      borderColor: 'border-indigo-100/70',
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      flareColor: 'bg-indigo-400/12',
    },
    {
      id: 'completed',
      title: 'Successful Orders',
      value: stats?.completed ?? '2,538',
      icon: CheckCircle2,
      cardBg: 'from-white/95 to-emerald-50/55',
      borderColor: 'border-emerald-100/80',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      flareColor: 'bg-emerald-400/12',
    },
    {
      id: 'pending',
      title: 'Pending Orders',
      value: stats?.pending ?? '68',
      icon: Clock,
      cardBg: 'from-white/95 to-amber-50/55',
      borderColor: 'border-amber-100/80',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      flareColor: 'bg-amber-400/12',
    },
    {
      id: 'failed',
      title: 'Failed Orders',
      value: stats?.failed ?? '142',
      icon: XCircle,
      cardBg: 'from-white/95 to-rose-50/55',
      borderColor: 'border-rose-100/80',
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-500',
      flareColor: 'bg-rose-400/12',
    },
    {
      id: 'refunded',
      title: 'Refunded Orders',
      value: stats?.refunded ?? '48',
      icon: RotateCcw,
      cardBg: 'from-white/95 to-sky-50/55',
      borderColor: 'border-sky-100/80',
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      flareColor: 'bg-sky-400/12',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-3.5 items-stretch">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br ${card.cardBg} backdrop-blur-xl border ${card.borderColor} p-3.5 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 group flex items-center gap-3 sm:gap-3.5 h-full`}
          >
            {/* Decorative hover gradient flare */}
            <div
              className={`absolute top-0 right-0 w-40 h-40 ${card.flareColor} rounded-full blur-[65px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700`}
            />

            {/* Icon Circle */}
            <div
              className={`relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}
            >
              <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-3" />
            </div>

            {/* Value + Label */}
            <div className="relative z-10 flex-1 min-w-0">
              <span className="block text-[11.5px] sm:text-[12px] font-semibold text-slate-500 truncate group-hover:text-slate-700 transition-colors">
                {card.title}
              </span>
              <h3 className="text-[20px] sm:text-[23px] font-black text-slate-900 tracking-tight leading-tight mt-0.5 group-hover:text-indigo-950 transition-colors">
                {card.value}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
