import { useTranslation } from '../../hooks/useTranslation';
import { Megaphone, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CourseCard() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[14px] font-bold text-slate-900">{t('dashboard.courses.title')}</h3>
        <a href="#" className="text-[13px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-4 transition-all">
          {t('dashboard.courses.viewAll')}
        </a>
      </div>

      <div 
        className="flex-1 bg-gradient-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/50 rounded-2xl p-3 lg:p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-3 group hover:-translate-y-1"
      >
        {/* Course Thumbnail */}
        <div className="relative w-full md:w-[160px] h-[110px] md:h-full rounded-xl bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#1E1B4B] overflow-hidden flex-shrink-0 shadow-inner group-hover:shadow-indigo-900/30 transition-shadow">
          {/* Decorative shapes */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/40 transition-colors duration-500" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-500/20 rounded-full blur-xl" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
            <h4 className="text-white font-black text-[15px] uppercase tracking-wider leading-tight drop-shadow-md mb-2">
              Digital<br/>Marketing<br/>Mastery
            </h4>
            <motion.div 
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Megaphone className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]" />
            </motion.div>
          </div>
        </div>

        {/* Course Info */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <h3 className="text-[16px] font-bold text-slate-900 tracking-tight mb-1 group-hover:text-indigo-700 transition-colors">
              Digital Marketing Mastery
            </h3>
            <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500 mb-3">
              <span>{t('dashboard.courses.beginner')}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>12 {t('dashboard.courses.modules')}</span>
            </div>

            {/* Progress */}
            <div className="mb-3">
              <div className="flex justify-end mb-1">
                <span className="text-[11px] font-bold text-indigo-600">60% {t('dashboard.courses.complete')}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '60%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-indigo-600 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                </motion.div>
              </div>
            </div>

            <p className="text-[12px] text-slate-600 leading-relaxed mb-2">
              Learn the essential strategies of digital marketing and grow your online business.
            </p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-1.5 px-4 bg-white border border-indigo-200 hover:border-indigo-600 rounded-xl text-[13px] font-bold text-indigo-600 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:bg-indigo-50 transition-all duration-300 group/btn"
          >
            {t('dashboard.courses.continue')}
            <Play className="w-4 h-4 fill-indigo-600 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
