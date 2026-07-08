import { ShieldCheck } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';

export default function InfoSection() {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-indigo-50/40 to-slate-50/80 border border-indigo-100/50 rounded-2xl overflow-hidden flex flex-col md:flex-row group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      {/* Left Box - Secure & Safe */}
      <div className="flex-1 p-3 lg:p-4 flex items-start gap-3 relative overflow-hidden transition-colors hover:bg-slate-100/50">
        <div className="absolute -left-10 top-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />
        
        <div className="relative w-10 h-10 rounded-2xl bg-indigo-100 flex flex-shrink-0 items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
          <ShieldCheck className="w-7 h-7 text-indigo-600" />
        </div>
        
        <div className="relative z-10 pt-1">
          <h4 className="text-[15px] font-bold text-slate-900 mb-1">{t('dashboard.info.secureTitle')}</h4>
          <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
            {t('dashboard.info.secureDesc1')}<br/>
            {t('dashboard.info.secureDesc2')}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>
      <div className="md:hidden h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-5"></div>

      {/* Right Box - Quick Tips */}
      <div className="flex-1 p-5 lg:p-6 transition-colors hover:bg-slate-100/50">
        <h4 className="text-[15px] font-bold text-slate-900 mb-2">{t('dashboard.info.tipsTitle')}</h4>
        <ul className="space-y-2">
          {[1, 2, 3].map((num) => (
            <motion.li 
              key={num}
              whileHover={{ x: 4 }}
              className="flex items-start gap-2.5 text-[13px] text-slate-600 font-medium group/item"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 group-hover/item:bg-indigo-600 transition-colors flex-shrink-0"></span>
              {t(`dashboard.info.tip${num}`)}
            </motion.li>
          ))}
        </ul>
      </div>

    </div>
  );
}
