import { useTranslation } from '../../hooks/useTranslation';
import { Users, User, UserPlus, UsersRound, TrendingUp, Calendar, ChevronDown } from 'lucide-react';
import AnimatedCounter from '../dashboard/AnimatedCounter';

export default function TeamDashboard() {
  const { t } = useTranslation();

  const stats = [
    {
      id: 'direct',
      label: t('network.dashboard.directTeam'),
      value: 6,
      growth: "+20%",
      isPositive: true,
      icon: <UserPlus className="w-5 h-5 text-indigo-600" />,
      bg: "bg-indigo-100",
      borderColor: "border-indigo-200",
      hoverShadow: "hover:shadow-lg hover:border-indigo-300"
    },
    {
      id: 'level1',
      label: t('network.dashboard.level1'),
      value: 15,
      growth: "+25%",
      isPositive: true,
      icon: <User className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-100",
      borderColor: "border-blue-200",
      hoverShadow: "hover:shadow-lg hover:border-blue-300"
    },
    {
      id: 'level2',
      label: t('network.dashboard.level2'),
      value: 28,
      growth: "+15%",
      isPositive: true,
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-100",
      borderColor: "border-emerald-200",
      hoverShadow: "hover:shadow-lg hover:border-emerald-300"
    },
    {
      id: 'total',
      label: t('network.dashboard.totalTeam'),
      value: 49,
      growth: "+20%",
      isPositive: true,
      icon: <UsersRound className="w-5 h-5 text-amber-500" />,
      bg: "bg-amber-100",
      borderColor: "border-amber-200",
      hoverShadow: "hover:shadow-lg hover:border-amber-300"
    },
    {
      id: 'growth',
      label: t('network.dashboard.monthlyGrowth'),
      value: 8,
      prefix: "+",
      growth: "+14%",
      isPositive: true,
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
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
          <span>{t('network.dashboard.thisMonth')}</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
          <Calendar className="w-4 h-4 text-slate-400 ml-1" />
        </button>
      </div>

      {/* Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`flex items-center gap-4 group bg-white p-4 lg:p-5 rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer ${stat.borderColor} ${stat.hoverShadow}`}
          >
            {/* Icon */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300 ${stat.bg}`}>
              {stat.icon}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-0.5 w-full items-start">
              <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                {stat.prefix && <span className="text-[16px] font-extrabold text-slate-900">{stat.prefix}</span>}
                <span className="text-[24px] font-extrabold text-slate-900 leading-none">
                  <AnimatedCounter end={stat.value} duration={2} separator="," />
                </span>
              </div>

              <div className="flex items-center gap-1.5 mt-1.5">
                <span className={`text-[11px] font-bold flex items-center ${stat.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                  ↑ {stat.growth}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {t('network.dashboard.vsLastMonth')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
