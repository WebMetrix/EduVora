import React from 'react';
import { Eye, UserPlus, Package, Users, ArrowRight, ArrowDown } from 'lucide-react';

export default function ReferralFunnel({ t }) {
  const steps = [
    { label: t('myReferrals.visitedLink'), value: "240", icon: Eye, color: "text-purple-600", bg: "bg-white border-purple-200 shadow-sm", hoverShadow: "hover:shadow-lg hover:border-purple-300" },
    { label: t('myReferrals.registered'), value: "145", icon: UserPlus, color: "text-emerald-600", bg: "bg-white border-emerald-200 shadow-sm", hoverShadow: "hover:shadow-lg hover:border-emerald-300" },
    { label: t('myReferrals.purchasedPackage'), value: "82", icon: Package, color: "text-amber-500", bg: "bg-white border-amber-200 shadow-sm", hoverShadow: "hover:shadow-lg hover:border-amber-300" },
    { label: t('myReferrals.activeMembers'), value: "75", icon: Users, color: "text-blue-600", bg: "bg-white border-blue-200 shadow-sm", hoverShadow: "hover:shadow-lg hover:border-blue-300" }
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl p-4 lg:p-5 border border-indigo-100/60 shadow-sm group/card transition-all duration-300 hover:shadow-lg hover:border-indigo-200 flex flex-col h-full">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

      <h3 className="relative z-10 font-bold text-[#1a1446] text-[14px] lg:text-[15px] mb-3 lg:mb-4">{t('myReferrals.referralFunnel')}</h3>

      <div className="relative z-10 flex flex-col sm:flex-row items-stretch justify-between gap-1.5 lg:gap-2 mt-3 lg:mt-4 w-full h-full">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className={`group flex flex-col items-center justify-center py-3 px-1.5 lg:py-4 lg:px-2 rounded-2xl border w-full sm:w-auto sm:flex-1 shrink transition-all duration-300 hover:-translate-y-1 ${step.bg} ${step.hoverShadow} min-w-[60px] lg:min-w-[65px] cursor-pointer`}>
              <div className={`w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center mb-1.5 lg:mb-2 bg-white shadow-sm ${step.color} transition-transform duration-300 group-hover:scale-110`}>
                <step.icon className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
              </div>
              <div className="text-[9px] lg:text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 text-center leading-tight h-6 flex items-center justify-center">{step.label}</div>
              <div className="text-[18px] lg:text-[20px] font-extrabold text-slate-900 leading-none">{step.value}</div>
            </div>

            {idx < steps.length - 1 && (
              <div className="text-slate-300 shrink-0 flex items-center justify-center py-1 sm:py-0">
                <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 hidden sm:block" />
                <ArrowDown className="w-3.5 h-3.5 sm:hidden" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
