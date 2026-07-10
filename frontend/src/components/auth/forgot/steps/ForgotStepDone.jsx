import { Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../../../hooks/useTranslation';

export default function ForgotStepDone() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center text-center animate-fade-in">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 md:mb-8">
        <Check className="w-8 h-8 md:w-10 md:h-10 text-emerald-500 stroke-[3]" />
      </div>
      
      {/* Title is hidden on mobile because MobileForgot places it in the top header */}
      <h1 className="hidden md:block text-2xl font-extrabold text-slate-900 mb-3">{t('forgot.doneTitle')}</h1>
      
      <p className="text-[12.5px] md:text-[14.5px] text-slate-500 mb-8 md:mb-10 max-w-sm leading-relaxed">
        {t('forgot.doneSubtitle')}
      </p>

      <Link 
        to="/login"
        className="w-full flex items-center justify-center gap-2 px-5 py-2.5 md:py-3.5 text-[14px] md:text-[15px] font-bold text-white bg-[#4f3bf3] hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 rounded-lg shadow-sm transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4 rotate-180" />
        {t('forgot.goToLogin')}
      </Link>
    </div>
  );
}
