import { useTranslation } from '../../hooks/useTranslation';
import { Eye, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WalletCard() {
  const { t } = useTranslation();

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="relative w-full h-full rounded-3xl bg-linear-to-br from-indigo-700 via-indigo-800 to-indigo-900 p-4 shadow-xl shadow-indigo-900/20 overflow-hidden group"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-indigo-400/20 transition-colors duration-700" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4" />
      
      {/* Wave pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-row items-center justify-between gap-4 h-full">
        
        {/* Left Side: Balance Info */}
        <div className="flex flex-col justify-start">
          <div className="flex items-center gap-2 text-indigo-200 mb-2 mt-1">
            <span className="text-[14px] font-medium">{t('dashboard.wallet.title')}</span>
            <Eye className="w-3 h-3 cursor-pointer hover:text-white transition-colors" />
          </div>
          
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[26px] lg:text-[30px] font-extrabold text-white tracking-tight drop-shadow-sm">
              ₹12,450.00
            </span>
          </div>
          
          <p className="text-[12px] text-indigo-300 font-medium">
            {t('dashboard.wallet.subtitle')}
          </p>
        </div>

        {/* Right Side: Withdraw Button */}
        <div className="flex items-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-white text-[12px] sm:text-[13px] font-bold shadow-lg shadow-black/10 transition-colors"
          >
            <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{t('dashboard.wallet.withdraw')}</span>
            <span className="sm:hidden">Withdraw</span>
          </motion.button>
        </div>

      </div>
    </motion.div>
  );
}
