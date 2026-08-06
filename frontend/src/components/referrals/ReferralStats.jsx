import React from 'react';
import { Users, UserCheck, Package, TrendingUp } from 'lucide-react';

export default function ReferralStats({ t }) {
  const stats = [
    /*
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
    */
    {
      title: t('myReferrals.activeReferrals'),
      value: "96",
      trend: "+ 15.4%",
      icon: <UserCheck className="w-7 h-7 text-emerald-600" />,
      bg: "bg-emerald-100",
      borderColor: "border-emerald-200",
      trendColor: "text-emerald-500",
      hoverShadow: "hover:shadow-lg hover:border-emerald-300"
    },
    {
      title: t('myReferrals.purchasedPackage'),
      value: "32",
      trend: "+ 8.2%",
      icon: <Package className="w-7 h-7 text-amber-500" />,
      bg: "bg-amber-100",
      borderColor: "border-amber-200",
      trendColor: "text-emerald-500",
      hoverShadow: "hover:shadow-lg hover:border-amber-300"
    },
    {
      title: t('myReferrals.level1Referrals'),
      value: "102",
      trend: "+ 17.2%",
      icon: <span className="text-blue-600 font-extrabold text-[20px]">L1</span>,
      bg: "bg-blue-100",
      borderColor: "border-blue-200",
      trendColor: "text-emerald-500",
      hoverShadow: "hover:shadow-lg hover:border-blue-300"
    },
    {
      title: t('myReferrals.level2Referrals'),
      value: "26",
      trend: "+ 12.5%",
      icon: <span className="text-purple-600 font-extrabold text-[20px]">L2</span>,
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

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`flex items-center gap-4 group bg-white p-4 lg:p-5 rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer ${stat.borderColor} ${stat.hoverShadow}`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300 ${stat.bg}`}>
              {stat.icon}
            </div>
            <div className="flex flex-col">
              <div className="text-[24px] font-extrabold text-slate-900 leading-none mb-1">{stat.value}</div>
              <div className="text-[14px] font-bold text-slate-800 leading-tight mb-0.5">{stat.title}</div>
              <div className="flex items-center gap-1 text-[11px] font-bold mt-1">
                <TrendingUp className={`w-3.5 h-3.5 ${stat.trendColor}`} />
                <span className={stat.trendColor}>{stat.trend}</span>
                <span className="text-slate-500 font-medium ml-0.5">{t('myReferrals.vsLastMonth')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
