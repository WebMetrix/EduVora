import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, GitFork, User, BarChart2, AlertTriangle, RotateCw, ChevronRight } from 'lucide-react';

export default function ReferralQuickActionsCard() {
  const actions = [
    {
      label: 'View Genealogy Tree',
      to: '/network/genealogy-tree',
      icon: GitFork,
    },
    {
      label: 'View Referral Details',
      to: '/network/referral-details',
      icon: User,
    },
    {
      label: 'View Referral Analytics',
      to: '/network/referral-analytics',
      icon: BarChart2,
    },
    {
      label: 'View Referral Exceptions',
      to: '/network/referral-exceptions',
      icon: AlertTriangle,
    },
    {
      label: 'View Audit History',
      to: '/network/referral-audit-history',
      icon: RotateCw,
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full w-full">
      {/* Decorative subtle hover flare */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/8 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-[14.5px] sm:text-[15px] font-black text-slate-900 tracking-tight">
            Quick Actions
          </h3>
        </div>
      </div>

      {/* Action Links List with flex-1 to fill equal card height */}
      <div className="relative z-10 flex-1 flex flex-col justify-between py-1 my-auto space-y-2">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <Link
              key={idx}
              to={act.to}
              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/70 bg-slate-50/50 hover:bg-white hover:border-indigo-300 hover:shadow-xs active:scale-98 transition-all duration-200 group/link cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className="w-4 h-4 text-indigo-600 shrink-0 group-hover/link:scale-110 transition-transform" />
                <span className="text-[12px] font-bold text-slate-800 group-hover/link:text-indigo-600 transition-colors truncate">
                  {act.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover/link:text-indigo-600 group-hover/link:translate-x-1 transition-all shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
