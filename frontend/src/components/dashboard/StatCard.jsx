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
      className="relative p-3 sm:p-5 bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/50 rounded-2xl shadow-sm hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 transition-all duration-300 group overflow-hidden hover:-translate-y-1 flex flex-col items-center sm:items-start text-center sm:text-left"
    >
      {/* Decorative hover gradient blur */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none ${iconBgClass.replace('bg-', 'bg-')}`} />

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-2 relative z-10 w-full">
        <div className={`w-10 h-10 rounded-full sm:rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow mx-auto sm:mx-0 ${iconBgClass}`}>
          <Icon className={`w-5 h-5 ${iconColorClass} group-hover:scale-110 transition-transform duration-300`} />
        </div>
        <div className="flex flex-col items-center sm:items-start w-full">
          <div className="flex items-baseline gap-1 justify-center sm:justify-start mt-1 sm:mt-0">
            {isCurrency && <span className="text-sm sm:text-xl font-bold text-slate-800">₹</span>}
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              <AnimatedCounter end={value} duration={2} separator="," />
            </span>
          </div>
          <span className="text-[11px] sm:text-[13px] font-semibold text-slate-500 mt-0.5 leading-tight">{title}</span>
        </div>
      </div>
      
      <div className="hidden sm:flex items-center gap-2 relative z-10">
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
