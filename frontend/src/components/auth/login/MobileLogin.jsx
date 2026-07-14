import { useTranslation } from '../../../hooks/useTranslation';
import LoginForm from './LoginForm';
import SocialButtons from '../shared/SocialButtons';
import LanguageDropdown from '../shared/LanguageDropdown';
import { Link } from 'react-router-dom';
import authMobileBg from '../../../assets/images/authMobile.png';

export default function MobileLogin() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-dvh flex flex-col relative pb-safe pt-safe bg-white px-5 py-4 md:hidden overflow-hidden">
      {/* Header with Language Dropdown and Logo */}
      <div className="flex justify-between items-start w-full mb-3 relative z-10">
        <div className="flex flex-col items-center flex-1 mt-2">
          {/* Logo Container - will provide custom logo here */}
          <div className="w-16 h-16 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex items-center justify-center mb-2">
            {/* TODO: Insert Custom Logo Here */}
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Logo</span>
          </div>
          <h2 className="text-[24px] font-bold text-slate-900 leading-tight tracking-tight">{t('login.logoTitle')}</h2>
          <p className="text-slate-500 text-[10px] font-semibold tracking-[0.2em] uppercase mt-0.5">{t('login.logoSubtitle')}</p>
        </div>
        {/* Language Dropdown removed to match the 2nd mockup */}
      </div>

      <div className="w-full max-w-[360px] mx-auto grow flex flex-col justify-center relative z-10">
        {/* Welcome Back & Subtitle */}
        <div className="mb-5 text-center">
          <h1 className="text-[32px] font-extrabold text-slate-900 leading-tight mb-1 tracking-tight">{t('login.title')}</h1>
          <p className="text-[14px] text-indigo-600 font-medium">{t('login.subtitle')}</p>
        </div>

        {/* Login Form */}
        <div className="mb-2">
          <LoginForm />
        </div>

        {/* Social Buttons */}
        <SocialButtons />

        {/* Sign Up */}
        <div className="mt-4 text-center pb-2">
          <p className="text-[14px] font-medium text-slate-500">
            {t('login.noAccount')}{' '}
            <Link to="/register" className="font-bold text-[#7C4DFF] hover:text-indigo-700 transition-colors ml-1">{t('login.registerNow')}</Link>
          </p>
        </div>
      </div>

      {/* Beautiful Bottom Wave Illustration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden z-0 flex items-end justify-center">
        <img src={authMobileBg} alt="Background Pattern" className="w-full h-auto object-cover object-bottom opacity-80" />
      </div>
    </div>
  );
}
