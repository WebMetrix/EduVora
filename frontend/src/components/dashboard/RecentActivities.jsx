import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecentActivities } from '../../redux/slices/dashboardSlice';
import { useTranslation } from '../../hooks/useTranslation';
import ActivityItem from './ActivityItem';
import { UserPlus, ShoppingCart, User, IndianRupee, ChevronLeft, ChevronRight, Clock, Award, Package, CheckCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecentActivities() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { activities, loading } = useSelector((state) => state.dashboard || { activities: [] });
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    dispatch(fetchRecentActivities({ page, limit }));
  }, [dispatch, page]);

  const getActivityConfig = (activity) => {
    switch (activity.ActivityCode) {
      case 'NETWORK_JOIN':
        return {
          title: `${activity.Param1} joined your network`,
          icon: UserPlus,
          iconColor: "text-indigo-600",
          iconBg: "bg-indigo-100",
          badgeText: "New Signup",
          badgeColor: "text-indigo-700",
          badgeBg: "bg-indigo-50"
        };
      case 'SALE':
        return {
          title: `Package "${activity.Param1}" sold`,
          icon: ShoppingCart,
          iconColor: "text-blue-600",
          iconBg: "bg-blue-100",
          badgeText: "Sale",
          badgeColor: "text-blue-700",
          badgeBg: "bg-blue-50"
        };
      case 'COMM_CREDIT':
        return {
          title: `Commission of ₹${activity.Param1} credited`,
          icon: IndianRupee,
          iconColor: "text-emerald-600",
          iconBg: "bg-emerald-100",
          badgeText: "Credited",
          badgeColor: "text-emerald-700",
          badgeBg: "bg-emerald-50"
        };
      case 'RANK_UPGRADE':
        return {
          title: `Rank upgraded to ${activity.Param1}`,
          icon: Award,
          iconColor: "text-amber-600",
          iconBg: "bg-amber-100",
          badgeText: "Achievement",
          badgeColor: "text-amber-700",
          badgeBg: "bg-amber-50"
        };
      case 'PACKAGE_UPGRADE':
        return {
          title: `Upgraded to ${activity.Param1}`,
          icon: Package,
          iconColor: "text-purple-600",
          iconBg: "bg-purple-100",
          badgeText: "Upgrade",
          badgeColor: "text-purple-700",
          badgeBg: "bg-purple-50"
        };
      case 'WITHDRAWAL_SUCCESS':
        return {
          title: `Withdrawal of ₹${activity.Param1} successful`,
          icon: ArrowUpRight,
          iconColor: "text-orange-600",
          iconBg: "bg-orange-100",
          badgeText: "Payout",
          badgeColor: "text-orange-700",
          badgeBg: "bg-orange-50"
        };
      case 'KYC_APPROVED':
        return {
          title: `KYC Application Approved`,
          icon: CheckCircle,
          iconColor: "text-emerald-600",
          iconBg: "bg-emerald-100",
          badgeText: "Verified",
          badgeColor: "text-emerald-700",
          badgeBg: "bg-emerald-50"
        };
      default:
        return {
          title: activity.Param1 || 'Activity',
          icon: Clock,
          iconColor: "text-slate-600",
          iconBg: "bg-slate-100",
          badgeText: "Info",
          badgeColor: "text-slate-700",
          badgeBg: "bg-slate-50"
        };
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="relative overflow-hidden flex-1 rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl p-4 lg:p-5 border border-indigo-100/60 shadow-sm group/card transition-all duration-300 hover:shadow-none hover:border-indigo-200 flex flex-col justify-between">
        {/* Decorative background flare */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />
        
        <div className="relative z-10 flex items-center justify-between mb-3">
          <h3 className="text-[14px] lg:text-[16px] font-bold text-slate-900">{t('dashboard.activities.title')}</h3>
          {/* <a href="#" className="text-[13px] lg:text-[14px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-4 transition-all">
            {t('dashboard.activities.viewAll')}
          </a> */}
        </div>

        <div className="relative z-10 mb-2">
          {loading ? (
            <div className="flex justify-center items-center py-6">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            </div>
          ) : activities?.length > 0 ? (
            activities.map((activity, index) => {
              const config = getActivityConfig(activity);
              return (
                <ActivityItem
                  key={index}
                  title={config.title}
                  time={activity.TimeAgoText}
                  icon={config.icon}
                  iconColor={config.iconColor}
                  iconBg={config.iconBg}
                  badgeText={config.badgeText}
                  badgeColor={config.badgeColor}
                  badgeBg={config.badgeBg}
                />
              );
            })
          ) : (
            <div className="text-center py-6 text-sm text-slate-500">
              {t('dashboard.activities.noActivities') || 'No recent activities'}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="relative z-10 flex items-center justify-center gap-1.5 mt-auto">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
          >
            {page}
          </button>

          <button 
            onClick={() => setPage(p => p + 1)}
            disabled={activities?.length < limit}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
