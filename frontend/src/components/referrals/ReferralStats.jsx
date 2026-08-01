import React from 'react';
import { Users, UserCheck, Package, TrendingUp } from 'lucide-react';

export default function ReferralStats({ t }) {
  const stats = [
    {
      title: t('myReferrals.totalReferrals'),
      value: "128",
      trend: "+ 18.6%",
      icon: <Users className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-100",
      borderColor: "border-purple-200",
      trendColor: "text-emerald-500",
      hoverShadow: "hover:shadow-lg hover:border-purple-300"
    },
    {
      title: t('myReferrals.activeReferrals'),
      value: "96",
      trend: "+ 15.4%",
      icon: <UserCheck className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-100",
      borderColor: "border-emerald-200",
      trendColor: "text-emerald-500",
      hoverShadow: "hover:shadow-lg hover:border-emerald-300"
    },
    {
      title: t('myReferrals.purchasedPackage'),
      value: "32",
      trend: "+ 8.2%",
      icon: <Package className="w-5 h-5 text-amber-500" />,
      bg: "bg-amber-100",
      borderColor: "border-amber-200",
      trendColor: "text-emerald-500",
      hoverShadow: "hover:shadow-lg hover:border-amber-300"
    },
    {
      title: t('myReferrals.level1Referrals'),
      value: "102",
      trend: "+ 17.2%",
      icon: <span className="text-blue-600 font-extrabold text-[16px]">L1</span>,
      bg: "bg-blue-100",
      borderColor: "border-blue-200",
      trendColor: "text-emerald-500",
      hoverShadow: "hover:shadow-lg hover:border-blue-300"
    },
    {
      title: t('myReferrals.level2Referrals'),
      value: "26",
      trend: "+ 12.5%",
      icon: <span className="text-purple-600 font-extrabold text-[16px]">L2</span>,
      bg: "bg-purple-100",
      borderColor: "border-purple-200",
      trendColor: "text-emerald-500",
      hoverShadow: "hover:shadow-lg hover:border-purple-300"
    }
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl p-5 lg:p-6 border border-indigo-100/60 shadow-sm group/card transition-all duration-300 hover:shadow-none hover:border-indigo-200">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

      <h3 className="relative z-10 font-bold text-[#1a1446] text-[16px] mb-6">{t('myReferrals.referralStatistics')}</h3>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`flex flex-col items-center xl:items-start text-center xl:text-left gap-3 group bg-white p-4 lg:p-5 rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer ${stat.borderColor} ${stat.hoverShadow}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300 ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.title}</div>
              <div className="text-[28px] font-extrabold text-slate-900 leading-none mb-2">{stat.value}</div>
              <div className="flex items-center justify-center xl:justify-start gap-1 text-[11px] font-bold">
                <TrendingUp className={`w-3.5 h-3.5 ${stat.trendColor}`} />
                <span className={stat.trendColor}>{stat.trend}</span>
                <span className="text-slate-400 font-medium ml-1">{t('myReferrals.vsLastMonth')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
