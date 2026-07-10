import { UserPlus, ShoppingCart, User, IndianRupee, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ActivityItem({
  title,
  time,
  icon: Icon,
  iconColor,
  iconBg,
  badgeText,
  badgeColor,
  badgeBg,
  amount
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
      className="flex items-center justify-between py-1.5 px-2 rounded-xl transition-all duration-300 cursor-default group"
    >
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${iconBg}`}>
          <Icon className={`w-4 h-4 ${iconColor} group-hover:scale-110 transition-transform`} />
        </div>
        <div>
          <h4 className="text-[13px] font-bold text-slate-800 leading-tight mb-0.5 group-hover:text-indigo-600 transition-colors">
            {title}
          </h4>
          <p className="text-[15px] font-medium text-slate-500">
            {time}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {badgeText && (
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${badgeColor} ${badgeBg}`}>
            {badgeText}
          </span>
        )}
        {amount && (
          <span className="text-[14px] font-extrabold text-slate-800">
            {amount}
          </span>
        )}
      </div>
    </motion.div>
  );
}
