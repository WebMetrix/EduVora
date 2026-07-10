import { Check } from 'lucide-react';
import { useTranslation } from '../../../../hooks/useTranslation';

export default function ForgotStepper({ step }) {
  const { t } = useTranslation();

  return (
    <div className={`flex items-center justify-between px-2 ${step === 4 ? 'mb-8 md:mb-16' : 'mb-6 md:mb-10'}`}>
      {/* Step 1 */}
      <div className="flex items-center gap-1.5 md:gap-2.5">
        <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-[1.5px] md:border-2 flex items-center justify-center font-bold text-[11px] md:text-sm transition-colors ${step >= 3 ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-indigo-600 text-indigo-600'}`}>
          {step >= 3 ? <Check className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[3]" /> : '1'}
        </div>
        <span className={`text-[11px] md:text-sm font-bold transition-colors ${step >= 3 ? 'text-indigo-600' : 'text-slate-900'} hidden sm:inline-block`}>
          {t('forgot.step1')}
        </span>
      </div>
      
      <div className={`flex-1 border-t-[1.5px] md:border-t-2 border-dashed mx-2 md:mx-4 transition-colors ${step >= 3 ? 'border-indigo-600' : 'border-slate-200'}`}></div>
      
      {/* Step 2 */}
      <div className="flex items-center gap-1.5 md:gap-2.5">
        <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-[1.5px] md:border-2 flex items-center justify-center font-bold text-[11px] md:text-sm transition-colors ${step === 4 ? 'border-indigo-600 bg-indigo-600 text-white' : step === 3 ? 'border-indigo-600 text-indigo-600' : 'border-slate-200 text-slate-400'}`}>
          {step === 4 ? <Check className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[3]" /> : '2'}
        </div>
        <span className={`text-[11px] md:text-sm transition-colors ${step >= 3 ? 'font-bold text-slate-900' : 'font-medium text-slate-400'} hidden sm:inline-block`}>
          {t('forgot.step2')}
        </span>
      </div>
      
      <div className={`flex-1 border-t-[1.5px] md:border-t-2 border-dashed mx-2 md:mx-4 transition-colors ${step === 4 ? 'border-indigo-600' : 'border-slate-200'}`}></div>
      
      {/* Step 3 */}
      <div className="flex items-center gap-1.5 md:gap-2.5">
        <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-[1.5px] md:border-2 flex items-center justify-center font-bold text-[11px] md:text-sm transition-colors ${step === 4 ? 'border-indigo-600 text-indigo-600' : 'border-slate-200 text-slate-400'}`}>
          3
        </div>
        <span className={`text-[11px] md:text-sm transition-colors ${step === 4 ? 'font-bold text-slate-900' : 'font-medium text-slate-400'} hidden sm:inline-block`}>
          {t('forgot.step3')}
        </span>
      </div>
    </div>
  );
}
