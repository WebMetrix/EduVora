import React from 'react';
import { Eye, UserPlus, Package, Users, ArrowRight, ArrowDown } from 'lucide-react';

export default function ReferralFunnel({ t }) {
  const steps = [
    { label: t('myReferrals.visitedLink'), value: "240", icon: Eye, color: "text-purple-600", bg: "bg-purple-50 border-purple-100" },
    { label: t('myReferrals.registered'), value: "145", icon: UserPlus, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
    { label: t('myReferrals.purchasedPackage'), value: "82", icon: Package, color: "text-amber-500", bg: "bg-amber-50 border-amber-100" },
    { label: t('myReferrals.activeMembers'), value: "75", icon: Users, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1 group/card h-full flex flex-col">
      <h3 className="font-bold text-[#1a1446] text-[15px] mb-4 lg:mb-6">{t('myReferrals.referralFunnel')}</h3>
      
      <div className="flex flex-col xl:flex-row items-center justify-between gap-3 mt-auto w-full">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className={`flex flex-col items-center justify-center py-5 px-3 rounded-2xl border w-full xl:w-auto xl:flex-1 shrink-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${step.bg}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-white shadow-sm ${step.color}`}>
                <step.icon className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center leading-tight h-8 flex items-center justify-center">{step.label}</div>
              <div className="text-[24px] font-extrabold text-slate-900 leading-none">{step.value}</div>
            </div>
            
            {idx < steps.length - 1 && (
              <div className="text-slate-300 shrink-0 py-1 xl:py-0">
                <ArrowRight className="w-5 h-5 hidden xl:block" />
                <ArrowDown className="w-5 h-5 xl:hidden" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
