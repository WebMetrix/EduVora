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
      icon: <UserPlus className="w-5 h-5 text-indigo-500" />,
      bg: "bg-indigo-50",
      border: "border-indigo-100"
    },
    {
      id: 'level1',
      label: t('network.dashboard.level1'),
      value: 15,
      growth: "+25%",
      isPositive: true,
      icon: <User className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      id: 'level2',
      label: t('network.dashboard.level2'),
      value: 28,
      growth: "+15%",
      isPositive: true,
      icon: <Users className="w-5 h-5 text-emerald-500" />,
      bg: "bg-emerald-50",
      border: "border-emerald-100"
    },
    {
      id: 'total',
      label: t('network.dashboard.totalTeam'),
      value: 49,
      growth: "+20%",
      isPositive: true,
      icon: <UsersRound className="w-5 h-5 text-amber-500" />,
      bg: "bg-amber-50",
      border: "border-amber-100"
    },
    {
      id: 'growth',
      label: t('network.dashboard.monthlyGrowth'),
      value: 8,
      prefix: "+",
      growth: "+14%",
      isPositive: true,
      icon: <TrendingUp className="w-5 h-5 text-rose-500" />,
      bg: "bg-rose-50",
      border: "border-rose-100"
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-5 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[16px] lg:text-[18px] font-bold text-slate-900">
          {t('network.dashboard.title')}
        </h2>
        
        {/* Dropdown */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
          <span>{t('network.dashboard.thisMonth')}</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
          <Calendar className="w-4 h-4 text-slate-400 ml-1" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            className={`flex items-start gap-4 p-4 rounded-xl border ${stat.border} ${stat.bg}/50 hover:${stat.bg} transition-colors duration-300`}
          >
            {/* Icon */}
            <div className={`p-3 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0`}>
              {stat.icon}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1 mt-0.5">
              <span className="text-[12px] font-bold text-slate-600 uppercase tracking-wider">
                {stat.label}
              </span>
              <div className="flex items-baseline gap-1">
                {stat.prefix && <span className="text-[20px] font-extrabold text-slate-900">{stat.prefix}</span>}
                <span className="text-[24px] font-extrabold text-slate-900">
                  <AnimatedCounter end={stat.value} duration={2} separator="," />
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`text-[12px] font-bold flex items-center gap-0.5 ${stat.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
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
