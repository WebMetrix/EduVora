import React from 'react';
import { Users, UserCheck, Clock, TrendingUp } from 'lucide-react';

export default function ReferralStats({ t }) {
  const stats = [
    {
      title: t('myReferrals.totalReferrals'),
      value: "128",
      trend: "+ 18.6%",
      icon: <Users className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-100",
      trendColor: "text-emerald-500"
    },
    {
      title: t('myReferrals.activeReferrals'),
      value: "96",
      trend: "+ 15.4%",
      icon: <UserCheck className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-100",
      trendColor: "text-emerald-500"
    },
    {
      title: t('myReferrals.pendingRegistrations'),
      value: "32",
      trend: "+ 8.2%",
      icon: <Clock className="w-5 h-5 text-amber-500" />,
      bg: "bg-amber-100",
      trendColor: "text-emerald-500"
    },
    {
      title: t('myReferrals.level1Referrals'),
      value: "102",
      trend: "+ 17.2%",
      icon: <span className="text-blue-600 font-extrabold text-[16px]">L1</span>,
      bg: "bg-blue-100",
      trendColor: "text-emerald-500"
    },
    {
      title: t('myReferrals.level2Referrals'),
      value: "26",
      trend: "+ 12.5%",
      icon: <span className="text-purple-600 font-extrabold text-[16px]">L2</span>,
      bg: "bg-purple-100",
      trendColor: "text-emerald-500"
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1 group/card">
      <h3 className="font-bold text-[#1a1446] text-[16px] mb-6">{t('myReferrals.referralStatistics')}</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center xl:items-start text-center xl:text-left gap-3 group">
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
