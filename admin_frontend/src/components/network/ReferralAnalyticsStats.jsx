import React from 'react';
import {
  Users, UserPlus, Layers, UserCheck, Link2, TrendingUp, UserMinus, AlertTriangle, Info
} from 'lucide-react';

export default function ReferralAnalyticsStats() {
  const kpiCards = [
    {
      id: 'total-referred',
      label: 'Total Referred Members',
      value: '12,450',
      trend: '+12.5%',
      subtext: 'Across the platform',
      icon: Users,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      flareColor: 'bg-purple-400/10',
    },
    {
      id: 'new-referrals',
      label: 'New Referrals',
      value: '846',
      trend: '+18.3%',
      subtext: 'In selected period',
      icon: UserPlus,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      flareColor: 'bg-sky-400/10',
    },
    {
      id: 'package-activated',
      label: 'Package Activated',
      value: '72%',
      trend: '+6.2%',
      subtext: 'Of referred registrations',
      icon: Layers,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      flareColor: 'bg-emerald-400/10',
    },
    {
      id: 'active-sponsors',
      label: 'Active Sponsors',
      value: '1,280',
      trend: '+10.4%',
      subtext: 'Members with direct referrals',
      icon: UserCheck,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
      flareColor: 'bg-orange-400/10',
    },
    {
      id: 'unattributed',
      label: 'Unattributed Registrations',
      value: '12',
      infoTip: 'Registrations without a valid referral attribution',
      subtext: '0.2% of total',
      icon: Link2,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-500',
      flareColor: 'bg-rose-400/10',
    },
    {
      id: 'avg-referrals',
      label: 'Average Referrals per Sponsor',
      value: '9.7',
      trend: '+8.1%',
      subtext: 'Active referral depth',
      icon: TrendingUp,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      flareColor: 'bg-amber-400/10',
    },
    {
      id: 'inactive-members',
      label: 'Inactive Referral Members',
      value: '624',
      subtext: '5.0% of total',
      icon: UserMinus,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      flareColor: 'bg-indigo-400/10',
    },
    {
      id: 'referral-exceptions',
      label: 'Referral Exceptions',
      value: '18',
      subtext: 'Require review',
      icon: AlertTriangle,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      flareColor: 'bg-sky-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 items-stretch">
      {kpiCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 p-3.5 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 group flex items-center gap-3 sm:gap-4 h-full min-h-[96px]"
          >
            {/* Decorative hover gradient flare */}
            <div
              className={`absolute top-0 right-0 w-48 h-48 ${card.flareColor} rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700`}
            />

            {/* Icon Circle */}
            <div
              className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-3" />
            </div>

            {/* Stats Body */}
            <div className="relative z-10 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1.5 mb-0.5 sm:mb-1">
                <span className="text-[11.5px] sm:text-[12.5px] font-semibold text-slate-500 truncate group-hover:text-slate-700 transition-colors">
                  {card.label}
                </span>
                {card.trend && (
                  <span className="text-[9.5px] sm:text-[10.5px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full inline-flex items-center gap-0.5 shrink-0 bg-emerald-50 text-emerald-600 border border-emerald-100/60">
                    <span>↑</span>
                    <span>{card.trend}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] font-black text-slate-900 tracking-tight leading-tight group-hover:text-indigo-950 transition-colors">
                  {card.value}
                </h3>
                {card.infoTip && (
                  <span
                    title={card.infoTip}
                    className="text-slate-400 hover:text-indigo-600 inline-flex items-center cursor-help"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              {card.subtext && (
                <p className="text-[10.5px] sm:text-[11px] font-medium text-slate-400 mt-0.5 truncate">
                  {card.subtext}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
