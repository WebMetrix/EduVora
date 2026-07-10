import { useTranslation } from '../../hooks/useTranslation';
import { ArrowRight, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WelcomeCard() {
  const { t } = useTranslation();

  return (
    <div 
      className="relative w-full h-full rounded-3xl bg-linear-to-br from-indigo-50/70 to-indigo-100/40 backdrop-blur-xl border border-indigo-100/60 p-4 flex flex-row items-center justify-between gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group transition-all duration-300 hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 hover:-translate-y-1"
    >
      {/* Background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-indigo-400/20 transition-colors duration-700" />
      
      {/* Left Content */}
      <div className="relative z-10 w-[60%] sm:w-auto">
        <p className="text-[13px] text-slate-500 font-medium mb-1">
          {t('dashboard.welcome.greeting')}
        </p>
        <h2 className="text-[26px] lg:text-[28px] leading-[1.1] font-extrabold text-slate-900 mb-2 tracking-tight flex flex-wrap items-center gap-x-2">
          Priya Sharma
          <motion.span 
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 5 }}
            className="inline-block origin-bottom-right"
          >
            👋
          </motion.span>
        </h2>
        <p className="text-[13px] text-slate-600 leading-snug pr-4">
          {t('dashboard.welcome.subtitle')}
        </p>
      </div>

      {/* Right Content - Rank Badge */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative z-10 shrink-0 bg-linear-to-br from-indigo-600 to-indigo-700 rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-lg shadow-indigo-600/20 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner shrink-0">
            <Award className="w-5 h-5 text-yellow-300" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-[15px] leading-tight">Gold</h3>
            <p className="text-indigo-200 text-[11px] font-medium">{t('dashboard.welcome.rank')}</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1 border-l border-white/20 pl-4 ml-1">
          <span className="text-white text-[12px] font-medium">{t('dashboard.welcome.viewDetails')}</span>
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </div>
      </motion.div>
    </div>
  );
}
