import React from 'react';
import { FileText, ArrowLeftRight, AlertTriangle, Users } from 'lucide-react';

export default function AuditHistoryStats() {
  const stats = [
    {
      id: 'total-events',
      value: '1,245',
      title: 'Total Events',
      subtitle: 'Recorded referral events',
      icon: FileText,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      flareColor: 'bg-indigo-400/10',
    },
    {
      id: 'sponsor-changes',
      value: '42',
      title: 'Sponsor Changes',
      subtitle: 'Traceable relationship updates',
      icon: ArrowLeftRight,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      flareColor: 'bg-amber-400/10',
    },
    {
      id: 'exception-related',
      value: '18',
      title: 'Exception Related',
      subtitle: 'Audit events linked to exceptions',
      icon: AlertTriangle,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-500',
      flareColor: 'bg-rose-400/10',
    },
    {
      id: 'admin-actions',
      value: '6',
      title: 'Admin Actions',
      subtitle: 'Manual investigations and changes',
      icon: Users,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      flareColor: 'bg-sky-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 items-stretch">
      {stats.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 p-3.5 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 group flex items-center gap-3 sm:gap-4 h-full min-h-[92px]"
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
              <span className="block text-[11.5px] sm:text-[12.5px] font-semibold text-slate-500 truncate group-hover:text-slate-700 transition-colors">
                {card.title}
              </span>
              <h3 className="text-[20px] sm:text-[24px] font-black text-slate-900 tracking-tight leading-tight mt-0.5 group-hover:text-indigo-950 transition-colors">
                {card.value}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] font-medium text-slate-400 mt-0.5 truncate">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
