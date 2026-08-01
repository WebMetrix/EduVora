import { useTranslation } from '../../hooks/useTranslation';
import ActivityItem from './ActivityItem';
import { UserPlus, ShoppingCart, User, IndianRupee, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecentActivities() {
  const { t } = useTranslation();

  const activities = [
    {
      id: 1,
      title: "Rahul Verma joined your network",
      time: "2 hours ago",
      icon: UserPlus,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
      badgeText: "New Signup",
      badgeColor: "text-emerald-700",
      badgeBg: "bg-emerald-50"
    },
    {
      id: 2,
      title: "Course \"Social Media Marketing\" sold",
      time: "5 hours ago",
      icon: ShoppingCart,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      badgeText: "Sale",
      badgeColor: "text-blue-700",
      badgeBg: "bg-blue-50",
      amount: "₹1,250"
    },
    {
      id: 3,
      title: "Anita Kumari joined your network",
      time: "1 day ago",
      icon: User,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-100",
      badgeText: "New Signup",
      badgeColor: "text-emerald-700",
      badgeBg: "bg-emerald-50"
    },
    {
      id: 4,
      title: "Commission of ₹750 credited",
      time: "1 day ago",
      icon: IndianRupee,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      badgeText: "Completed",
      badgeColor: "text-emerald-700",
      badgeBg: "bg-emerald-50"
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="relative overflow-hidden flex-1 rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl p-5 lg:p-6 border border-indigo-100/60 shadow-sm group/card transition-all duration-300 hover:shadow-none hover:border-indigo-200 flex flex-col justify-between">
        {/* Decorative background flare */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />
        
        <div className="relative z-10 flex items-center justify-between mb-4">
          <h3 className="text-[14px] lg:text-[16px] font-bold text-slate-900">{t('dashboard.activities.title')}</h3>
          <a href="#" className="text-[13px] lg:text-[14px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-4 transition-all">
            {t('dashboard.activities.viewAll')}
          </a>
        </div>

        <div className="relative z-10 mb-2">
          {activities.map(activity => (
            <ActivityItem key={activity.id} {...activity} />
          ))}
        </div>

        {/* Pagination */}
        <div className="relative z-10 flex items-center justify-center gap-1.5 mt-auto">
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all ${page === 1
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
            >
              {page}
            </button>
          ))}

          <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
