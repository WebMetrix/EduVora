import LanguageDropdown from '../shared/LanguageDropdown';
import LoginForm from './LoginForm';
import SocialButtons from '../shared/SocialButtons';
import { useTranslation } from '../../../hooks/useTranslation';
import { Link } from 'react-router-dom';

export default function LoginRight() {
  const { t } = useTranslation();

  return (
    <div className="w-[55%] h-full bg-white relative flex flex-col overflow-hidden">


      {/* Main Container */}
      <div className="flex-1 px-8 lg:px-12 xl:px-16 py-4 lg:py-6 flex flex-col relative h-full">

        {/* Language Dropdown */}
        <div className="w-full flex justify-end shrink-0 animate-fade-in z-20">
          <LanguageDropdown />
        </div>

        <div className="grow flex flex-col justify-center max-w-[460px] mx-auto w-full animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="mb-4 lg:mb-6 mt-4 lg:mt-0">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-1.5 tracking-tight">{t('login.title')}</h1>
            <p className="text-indigo-500 text-sm lg:text-[15px] font-medium">{t('login.subtitle')}</p>
          </div>


          <LoginForm />
          <SocialButtons />

          <div className="mt-4 text-center mb-4">
            <p className="text-sm font-medium text-slate-500">
              {t('login.noAccount')}{' '}
              <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors ml-1">{t('login.registerNow')}</Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center animate-fade-in shrink-0 mt-2" style={{ animationDelay: '500ms' }}>
          <p className="text-[12px] font-medium text-slate-400">{t('login.footerText')}</p>
        </div>
      </div>
    </div>
  );
}
