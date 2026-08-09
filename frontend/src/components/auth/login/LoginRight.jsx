import LanguageDropdown from '../shared/LanguageDropdown';
import LoginForm from './LoginForm';
import SocialButtons from '../shared/SocialButtons';
import { useTranslation } from '../../../hooks/useTranslation';
import { Link } from 'react-router-dom';

export default function LoginRight() {
  const { t } = useTranslation();

  return (
    <div className="w-[55%] h-full bg-white relative flex flex-col overflow-hidden">
      <div className="flex-1 px-8 lg:px-12 xl:px-16 py-[clamp(0.75rem,2.5dvh,1rem)] lg:py-[clamp(1rem,3dvh,1.5rem)] flex flex-col relative h-full min-h-0">

        <div className="w-full flex justify-end shrink-0 animate-fade-in z-20">
          <LanguageDropdown />
        </div>

        {/* KEY FIX: min-h-0 lets this block shrink on short/wide windows instead of clipping the sign-up link */}
        <div
          className="grow min-h-0 flex flex-col justify-center max-w-[460px] mx-auto w-full animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <div className="mb-[clamp(0.75rem,2.5dvh,1.5rem)] lg:mb-[clamp(1rem,3dvh,1.5rem)] mt-[clamp(0.5rem,2dvh,1rem)] lg:mt-0 shrink-0">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-1.5 tracking-tight">{t('login.title')}</h1>
            <p className="text-indigo-500 text-sm lg:text-[15px] font-medium">{t('login.subtitle')}</p>
          </div>

          <div className="shrink-0">
            <LoginForm />
          </div>
          <div className="shrink-0">
            <SocialButtons />
          </div>

          <div className="mt-[clamp(0.5rem,2dvh,1rem)] text-center mb-[clamp(0.5rem,2dvh,1rem)] shrink-0">
            <p className="text-sm font-medium text-slate-500">
              {t('login.noAccount')}{' '}
              <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors ml-1">
                {t('login.registerNow')}
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center animate-fade-in shrink-0 mt-2" style={{ animationDelay: '500ms' }}>
          <p className="text-[12px] font-medium text-slate-400">{t('login.footerText')}</p>
        </div>
      </div>
    </div>
  );
}
