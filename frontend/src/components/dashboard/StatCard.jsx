import { ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export default function StatCard({ 
  title, 
  value, 
  isCurrency = false, 
  trend, 
  trendLabel, 
  icon: Icon, 
  iconColorClass, 
  iconBgClass 
}) {
  return (
    <div 
      className="relative p-3 lg:p-4 bg-gradient-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden hover:-translate-y-1"
    >
      {/* Decorative hover gradient blur */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none ${iconBgClass.replace('bg-', 'bg-')}`} />

      <div className="flex items-center gap-3 mb-2 relative z-10">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow ${iconBgClass}`}>
          <Icon className={`w-5 h-5 ${iconColorClass} group-hover:scale-110 transition-transform duration-300`} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            {isCurrency && <span className="text-lg font-bold text-slate-800">₹</span>}
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              <AnimatedCounter end={value} duration={2} separator="," />
            </span>
          </div>
          <span className="text-[13px] font-semibold text-slate-500">{title}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[11px] font-bold"
        >
          <ArrowUp className="w-3 h-3" strokeWidth={3} />
          {trend}%
        </motion.div>
        <span className="text-[11px] text-slate-400 font-medium">{trendLabel}</span>
      </div>
    </div>
  );
}
