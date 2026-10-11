import React, { useState } from 'react';
import { Users, UserPlus, ShoppingCart, IndianRupee } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import StatCard from './StatCard';
import { motion } from 'framer-motion';
import CustomSelect from '../common/CustomSelect';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

export default function StatsGrid() {
  const { t } = useTranslation();
  const [period, setPeriod] = useState('monthly');

  const stats = [
    {
      id: 1,
      title: t('dashboard.stats.totalReferrals'),
      value: 36,
      trend: 12,
      trendLabel: t('dashboard.stats.vsLastMonth'),
      icon: Users,
      iconColorClass: "text-purple-600",
      iconBgClass: "bg-purple-100/80"
    },
    {
      id: 2,
      title: t('dashboard.stats.activeReferrals'),
      value: 12,
      trend: 9,
      trendLabel: t('dashboard.stats.vsLastMonth'),
      icon: UserPlus,
      iconColorClass: "text-emerald-600",
      iconBgClass: "bg-emerald-100/80"
    },
    {
      id: 3,
      title: t('dashboard.stats.coursesSold'),
      value: 18,
      trend: 18,
      trendLabel: t('dashboard.stats.vsLastMonth'),
      icon: ShoppingCart,
      iconColorClass: "text-blue-600",
      iconBgClass: "bg-blue-100/80"
    },
    {
      id: 4,
      title: t('dashboard.stats.totalCommission'),
      value: 8750,
      isCurrency: true,
      trend: 15,
      trendLabel: t('dashboard.stats.vsLastMonth'),
      icon: IndianRupee,
      iconColorClass: "text-orange-600",
      iconBgClass: "bg-orange-100/80"
    }
  ];

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[16px] font-bold text-slate-900">{t('dashboard.stats.title')}</h3>

        {/* Dropdown styling */}
        <CustomSelect
          options={[
            { label: t('dashboard.stats.thisMonth') || 'This Month', value: 'monthly' },
            { label: 'This Quarter', value: 'quarterly' },
            { label: 'This Year', value: 'yearly' },
          ]}
          value={period}
          onChange={(val) => setPeriod(val)}
          buttonClassName="flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm w-auto min-w-[125px]"
          textClassName="text-[12px] font-bold text-slate-600"
          iconClassName="w-3.5 h-3.5 text-slate-500"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {stats.map((stat) => (
          <div key={stat.id}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>
    </div>
  );
}
