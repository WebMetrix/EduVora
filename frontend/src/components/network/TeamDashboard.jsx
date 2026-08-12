import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Users, User, UserPlus, UsersRound, TrendingUp, Calendar, ChevronDown } from 'lucide-react';
import AnimatedCounter from '../dashboard/AnimatedCounter';

import { useSelector } from 'react-redux';

export default function TeamDashboard() {
  const { t } = useTranslation();
  const { dashboardStats: allStats } = useSelector((state) => state.network);

  const [trendFilter, setTrendFilter] = useState('monthly');
  const dashboardStats = allStats?.[trendFilter] || null;

  const getVsText = () => {
    if (trendFilter === 'quarterly') return t('network.dashboard.vsLastQuarter');
    if (trendFilter === 'yearly') return t('network.dashboard.vsLastYear');
    return t('network.dashboard.vsLastMonth');
  };

  const getGrowthLabel = () => {
    if (trendFilter === 'quarterly') return 'Quarterly Growth';
    if (trendFilter === 'yearly') return 'Yearly Growth';
    return t('network.dashboard.monthlyGrowth');
  };

  const stats = [
    {
      id: 'direct',
      label: t('network.dashboard.directTeam'),
      value: dashboardStats?.directTeam ?? 0,
      growth: dashboardStats?.directTeamGrowth !== undefined ? `${dashboardStats.directTeamGrowth >= 0 ? '+' : ''}${dashboardStats.directTeamGrowth}% ${getVsText()}` : `+0% ${getVsText()}`,
      isPositive: (dashboardStats?.directTeamGrowth ?? 0) >= 0,
      icon: <UserPlus className="w-5 h-5 text-indigo-600" />,
      bg: "bg-indigo-100",
      borderColor: "border-indigo-200",
      hoverShadow: "hover:shadow-lg hover:border-indigo-300"
    },
    {
      id: 'level1',
      label: t('network.dashboard.level1'),
      value: dashboardStats?.level1 ?? 0,
      growth: dashboardStats?.level1Growth !== undefined ? `${dashboardStats.level1Growth >= 0 ? '+' : ''}${dashboardStats.level1Growth}% ${getVsText()}` : `+0% ${getVsText()}`,
      isPositive: (dashboardStats?.level1Growth ?? 0) >= 0,
      icon: <User className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-100",
      borderColor: "border-blue-200",
      hoverShadow: "hover:shadow-lg hover:border-blue-300"
    },
    {
      id: 'level2',
      label: t('network.dashboard.level2'),
      value: dashboardStats?.level2 ?? 0,
      growth: dashboardStats?.level2Growth !== undefined ? `${dashboardStats.level2Growth >= 0 ? '+' : ''}${dashboardStats.level2Growth}% ${getVsText()}` : `+0% ${getVsText()}`,
      isPositive: (dashboardStats?.level2Growth ?? 0) >= 0,
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-100",
      borderColor: "border-emerald-200",
      hoverShadow: "hover:shadow-lg hover:border-emerald-300"
    },
    {
      id: 'total',
      label: t('network.dashboard.totalTeam'),
      value: dashboardStats?.totalTeam ?? 0,
      growth: dashboardStats?.totalTeamGrowth !== undefined ? `${dashboardStats.totalTeamGrowth >= 0 ? '+' : ''}${dashboardStats.totalTeamGrowth}% ${getVsText()}` : `+0% ${getVsText()}`,
      isPositive: (dashboardStats?.totalTeamGrowth ?? 0) >= 0,
      icon: <UsersRound className="w-5 h-5 text-amber-500" />,
      bg: "bg-amber-100",
      borderColor: "border-amber-200",
      hoverShadow: "hover:shadow-lg hover:border-amber-300"
    },
    {
      id: 'growth',
      label: getGrowthLabel(),
      value: dashboardStats?.periodGrowth ?? 0,
      prefix: dashboardStats?.periodGrowth >= 0 ? "+" : "",
      growth: dashboardStats?.periodGrowthPercentage !== undefined ? `${dashboardStats.periodGrowthPercentage >= 0 ? '+' : ''}${dashboardStats.periodGrowthPercentage}% ${getVsText()}` : `+0% ${getVsText()}`,
      isPositive: (dashboardStats?.periodGrowthPercentage ?? 0) >= 0,
      icon: <TrendingUp className="w-5 h-5 text-rose-500" />,
      bg: "bg-rose-100",
      borderColor: "border-rose-200",
      hoverShadow: "hover:shadow-lg hover:border-rose-300"
    }
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl p-5 lg:p-6 border border-indigo-100/60 shadow-sm group/card transition-all duration-300 hover:shadow-none hover:border-indigo-200">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <h2 className="text-[16px] lg:text-[18px] font-bold text-[#1a1446]">
          {t('network.dashboard.title')}
        </h2>

        {/* Dropdown */}
        <div className="relative inline-flex">
          <select
            value={trendFilter}
            onChange={(e) => setTrendFilter(e.target.value)}
            className="appearance-none flex items-center gap-1.5 px-3 py-1.5 lg:py-2 rounded-lg bg-white border border-slate-200 text-[12px] lg:text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm pr-8 focus:outline-none cursor-pointer"
          >
            <option value="monthly">{t('network.charts.thisMonth')}</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 lg:w-4 lg:h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
        </div>
      </div>

      {/* Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`flex items-center gap-3 lg:gap-4 xl:gap-2 2xl:gap-4 group bg-white p-3 sm:p-4 lg:p-5 xl:p-3 2xl:p-5 rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer ${stat.borderColor} ${stat.hoverShadow}`}
          >
            {/* Icon */}
            <div className={`w-10 h-10 sm:w-12 sm:h-12 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300 ${stat.bg}`}>
              {stat.icon}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-0.5 w-full items-start">
              <div className="min-h-[34px] flex items-center">
                <span className="text-[11px] lg:text-[12px] xl:text-[10px] 2xl:text-[12px] font-bold text-slate-500 uppercase tracking-wide leading-tight">
                  {stat.label}
                </span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                {stat.prefix && <span className="text-[14px] sm:text-[16px] font-extrabold text-slate-900">{stat.prefix}</span>}
                <span className="text-[20px] sm:text-[24px] xl:text-[20px] 2xl:text-[24px] font-extrabold text-slate-900 leading-none">
                  <AnimatedCounter end={stat.value} duration={2} separator="," />
                </span>
              </div>

              <div className="flex items-start mt-1 sm:mt-1.5 min-h-[32px] w-full">
                <span className={`text-[10px] sm:text-[11px] xl:text-[9.5px] 2xl:text-[11px] font-bold leading-tight tracking-tight ${stat.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.isPositive ? '↑' : '↓'} {stat.growth.replace('+', '').replace('-', '')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
