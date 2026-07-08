import { useTranslation } from '../../hooks/useTranslation';
import { ArrowRight, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WelcomeCard() {
  const { t } = useTranslation();

  return (
    <div 
      className="relative w-full rounded-3xl bg-gradient-to-br from-white/80 to-indigo-50/60 backdrop-blur-xl border border-indigo-100/60 p-4 lg:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-indigo-400/20 transition-colors duration-700" />
      
      {/* Left Content */}
      <div className="relative z-10">
        <p className="text-[14px] text-slate-500 font-medium mb-0.5">
          {t('dashboard.welcome.greeting')}
        </p>
        <h2 className="text-2xl lg:text-[28px] font-extrabold text-slate-900 mb-1 tracking-tight flex items-center gap-2">
          Priya Sharma
          <motion.span 
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 5 }}
            className="inline-block origin-bottom-right"
          >
            👋
          </motion.span>
        </h2>
        <p className="text-[14px] text-slate-600">
          {t('dashboard.welcome.subtitle')}
        </p>
      </div>

      {/* Right Content - Rank Badge */}
      <motion.div 
        whileHover={{ scale: 1.03 }}
        className="relative z-10 shrink-0 w-full md:w-auto bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-4 flex items-center gap-4 shadow-lg shadow-indigo-600/20 cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
          <Award className="w-6 h-6 text-yellow-300" />
        </div>
        <div className="pr-2">
          <h3 className="text-white font-bold text-[18px] leading-tight mb-0.5">Gold</h3>
          <p className="text-indigo-200 text-[12px] font-medium">{t('dashboard.welcome.rank')}</p>
        </div>
        
        {/* Animated View Details Link */}
        <div className="ml-2 pl-4 border-l border-indigo-500/50 flex flex-col items-end">
          <span className="flex items-center gap-1 text-[12px] text-indigo-100 font-medium group-hover:text-white transition-colors">
            {t('dashboard.welcome.viewDetails')}
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="h-px w-0 bg-white mt-0.5 group-hover:w-full transition-all duration-300"></div>
        </div>
      </motion.div>
    </div>
  );
}
