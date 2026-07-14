import LanguageDropdown from '../shared/LanguageDropdown';
import LoginForm from './LoginForm';
import SocialButtons from '../shared/SocialButtons';
import { useTranslation } from '../../../hooks/useTranslation';
import { Link } from 'react-router-dom';

export default function LoginRight() {
  const { t } = useTranslation();

  return (
    <div className="w-[55%] h-full bg-white relative flex flex-col">
      <div className="absolute top-8 right-8 lg:top-10 lg:right-12 animate-fade-in z-20">
        <LanguageDropdown />
      </div>

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto px-8 lg:px-12 xl:px-16 py-10 custom-scrollbar flex flex-col">
        <div className="grow flex flex-col justify-center max-w-[460px] mx-auto w-full animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="mb-6 lg:mb-8 mt-12 lg:mt-0">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">{t('login.title')}</h1>
          <p className="text-indigo-500 text-sm lg:text-[15px] font-medium">{t('login.subtitle')}</p>
        </div>

        <LoginForm />
        <SocialButtons />

        <div className="mt-5 text-center mb-8">
          <p className="text-sm font-medium text-slate-500">
            {t('login.noAccount')}{' '}
            <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors ml-1">{t('login.registerNow')}</Link>
          </p>
        </div>
        </div>

        {/* Footer */}
        <div className="text-center animate-fade-in mt-auto pb-2 shrink-0" style={{ animationDelay: '500ms' }}>
          <p className="text-[12px] font-medium text-slate-400">{t('login.footerText')}</p>
        </div>
      </div>
    </div>
  );
}
