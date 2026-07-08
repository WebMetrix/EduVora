import LanguageDropdown from '../shared/LanguageDropdown';
import { Mail, Info, ArrowLeft, HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';

export default function ForgotRight() {
  const { t } = useTranslation();

  return (
    <div className="w-[55%] h-full bg-white flex flex-col relative">
      
      {/* Top right language dropdown */}
      <div className="absolute top-6 right-6 lg:top-8 lg:right-10 z-20">
        <LanguageDropdown />
      </div>

      {/* Main Content Container */}
      <div className="flex-grow flex flex-col justify-center px-6 lg:px-12 xl:px-16 w-full animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="max-w-[480px] w-full mx-auto">
          
          <div className="mb-8">
            <h1 className="text-3xl lg:text-[34px] font-extrabold text-slate-900 mb-2 tracking-tight">{t('forgot.title')}</h1>
            <p className="text-slate-600 text-[15px] leading-relaxed pr-8">{t('forgot.subtitle')}</p>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border-2 border-indigo-600 text-indigo-600 flex items-center justify-center font-bold text-sm">1</div>
              <span className="text-sm font-bold text-slate-900">{t('forgot.step1')}</span>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-4"></div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold text-sm">2</div>
              <span className="text-sm font-medium text-slate-400">{t('forgot.step2')}</span>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-4"></div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold text-sm">3</div>
              <span className="text-sm font-medium text-slate-400">{t('forgot.step3')}</span>
            </div>
          </div>

          <form className="w-full space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1.5">
                {t('forgot.emailLabel')} <span className="text-red-500">*</span>
              </label>
              <div className="relative flex gap-3">
                <div className="relative group flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  </div>
                  <input
                    type="email"
                    placeholder={t('forgot.emailPlaceholder')}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-[15px] text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <button type="submit" className="px-5 py-3 whitespace-nowrap text-[15px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors">
                  {t('forgot.sendLink')}
                </button>
              </div>
              <p className="mt-2 text-[13px] text-slate-500 font-medium">
                {t('forgot.emailHint')}
              </p>
            </div>

          </form>

          {/* Info Box */}
          <div className="mt-8 bg-[#f8f6ff] border border-indigo-100 rounded-xl p-5 flex gap-4">
            <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-slate-900 mb-1">{t('forgot.infoTitle')}</h4>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                {t('forgot.infoDesc')}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Area */}
      <div className="w-full px-12 xl:px-24 pb-8 flex items-center justify-between animate-fade-in" style={{ animationDelay: '300ms' }}>
        <Link to="/login" className="flex items-center gap-2 text-[14px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t('forgot.backToLogin')}
        </Link>
        <div className="h-5 w-px bg-slate-300"></div>
        <div className="flex items-center gap-2 text-[14px] font-medium text-slate-600">
          <HeadphonesIcon className="w-4 h-4 text-slate-700" />
          {t('forgot.needHelp')} <a href="#" className="font-bold text-indigo-600 hover:text-indigo-700">{t('forgot.contactSupport')}</a>
        </div>
      </div>

    </div>
  );
}
