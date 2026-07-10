import { ShieldCheck } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';

export default function InfoSection() {
  const { t } = useTranslation();

  return (
    <div className="bg-linear-to-br from-indigo-50/40 to-slate-50/80 border border-indigo-100/50 rounded-2xl overflow-hidden flex flex-col md:flex-row group hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300">
      {/* Left Box - Secure & Safe */}
      <div className="flex-1 p-3 lg:p-4 flex items-start gap-2.5 relative overflow-hidden transition-colors hover:bg-slate-100/50">
        <div className="absolute -left-10 top-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />
        
        <div className="relative w-8 h-8 rounded-xl bg-indigo-100 flex shrink-0 items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
        </div>
        
        <div className="relative z-10 pt-0.5">
          <h4 className="text-[13px] font-bold text-slate-900 mb-0.5">{t('dashboard.info.secureTitle')}</h4>
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
            {t('dashboard.info.secureDesc1')}<br/>
            {t('dashboard.info.secureDesc2')}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px bg-linear-to-b from-transparent via-slate-200 to-transparent"></div>
      <div className="md:hidden h-px bg-linear-to-r from-transparent via-slate-200 to-transparent mx-5"></div>

      {/* Right Box - Quick Tips */}
      <div className="flex-1 p-3 lg:p-4 transition-colors hover:bg-slate-100/50">
        <h4 className="text-[13px] font-bold text-slate-900 mb-1.5">{t('dashboard.info.tipsTitle')}</h4>
        <ul className="space-y-1">
          {[1, 2, 3].map((num) => (
            <motion.li 
              key={num}
              whileHover={{ x: 4 }}
              className="flex items-start gap-2 text-[11px] text-slate-600 font-medium group/item"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1 group-hover/item:bg-indigo-600 transition-colors shrink-0"></span>
              {t(`dashboard.info.tip${num}`)}
            </motion.li>
          ))}
        </ul>
      </div>

    </div>
  );
}
