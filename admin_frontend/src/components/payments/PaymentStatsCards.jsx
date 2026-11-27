import React from 'react';
import { Wallet, Coins, CheckCircle2, Clock, XCircle, RotateCcw } from 'lucide-react';

export default function PaymentStatsCards() {
  const cards = [
    {
      id: 'total-txns',
      title: 'Total Transactions',
      value: '2,846',
      delta: '↑ +12.6% vs last period',
      deltaPositive: true,
      icon: Wallet,
      cardBg: 'from-white/95 to-indigo-50/50',
      borderColor: 'border-indigo-100/70',
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      flareColor: 'bg-indigo-400/12',
    },
    {
      id: 'total-amount',
      title: 'Total Payment Amount',
      value: '₹28,46,870',
      delta: '↑ +14.2% vs last period',
      deltaPositive: true,
      icon: Coins,
      cardBg: 'from-white/95 to-emerald-50/55',
      borderColor: 'border-emerald-100/80',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      flareColor: 'bg-emerald-400/12',
    },
    {
      id: 'success',
      title: 'Successful Payments',
      value: '2,412',
      subPct: '(84.8%)',
      delta: '↑ +13.9% vs last period',
      deltaPositive: true,
      icon: CheckCircle2,
      cardBg: 'from-white/95 to-emerald-50/55',
      borderColor: 'border-emerald-100/80',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      flareColor: 'bg-emerald-400/12',
    },
    {
      id: 'pending',
      title: 'Pending Payments',
      value: '68',
      subPct: '(2.4%)',
      delta: '↓ -8.1% vs last period',
      deltaPositive: false,
      icon: Clock,
      cardBg: 'from-white/95 to-amber-50/55',
      borderColor: 'border-amber-100/80',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      flareColor: 'bg-amber-400/12',
    },
    {
      id: 'failed',
      title: 'Failed Payments',
      value: '142',
      subPct: '(5.0%)',
      delta: '↓ -18.7% vs last period',
      deltaPositive: false,
      icon: XCircle,
      cardBg: 'from-white/95 to-rose-50/55',
      borderColor: 'border-rose-100/80',
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-500',
      flareColor: 'bg-rose-400/12',
    },
    {
      id: 'refunded',
      title: 'Refunded Amount',
      value: '₹1,42,360',
      subtitle: '(48 Transactions)',
      icon: RotateCcw,
      cardBg: 'from-white/95 to-sky-50/55',
      borderColor: 'border-sky-100/80',
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      flareColor: 'bg-sky-400/12',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-3 items-stretch">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br ${card.cardBg} backdrop-blur-xl border ${card.borderColor} p-3.5 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 group flex items-start gap-3 h-full`}
          >
            <div
              className={`absolute top-0 right-0 w-36 h-36 ${card.flareColor} rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700`}
            />

            <div
              className={`relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:shadow-md transition-all duration-300 mt-0.5`}
            >
              <Icon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:rotate-3" />
            </div>

            <div className="relative z-10 flex-1 min-w-0">
              <span className="block text-[11px] sm:text-[11.5px] font-semibold text-slate-500 truncate group-hover:text-slate-700 transition-colors">
                {card.title}
              </span>

              <div className="flex items-baseline gap-1 mt-0.5 flex-wrap">
                <h3 className="text-[17px] sm:text-[19px] font-black text-slate-900 tracking-tight leading-tight whitespace-nowrap group-hover:text-indigo-950 transition-colors">
                  {card.value}
                </h3>
                {card.subPct && (
                  <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">
                    {card.subPct}
                  </span>
                )}
              </div>

              {card.delta ? (
                <p
                  className={`text-[10.5px] font-bold mt-1 leading-tight ${
                    card.deltaPositive ? 'text-emerald-600' : 'text-rose-500'
                  }`}
                >
                  {card.delta}
                </p>
              ) : (
                <p className="text-[10.5px] font-medium text-slate-400 mt-1 leading-tight">
                  {card.subtitle}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
