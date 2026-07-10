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
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[14px] lg:text-[16px] font-bold text-slate-900">{t('dashboard.activities.title')}</h3>
        <a href="#" className="text-[13px] lg:text-[14px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-4 transition-all">
          {t('dashboard.activities.viewAll')}
        </a>
      </div>

      <div className="flex-1 bg-gradient-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/50 rounded-2xl p-4 lg:p-5 shadow-sm hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">

        <div className="mb-2">
          {activities.map(activity => (
            <ActivityItem key={activity.id} {...activity} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1.5 mt-auto">
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
