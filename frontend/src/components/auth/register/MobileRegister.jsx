import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import RegisterForm from './RegisterForm';
import { Link } from 'react-router-dom';
import authMobileBg from '../../../assets/images/authMobile.png';
import logoImg from '../../../assets/images/Eduvora.png';

export default function MobileRegister() {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen flex flex-col relative pb-safe pt-safe bg-white md:hidden overflow-x-hidden">
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 z-10 w-full pb-10">
        {/* Header with Logo */}
        <div className="flex items-start w-full mb-6 relative mt-6">
          <div className="flex flex-col items-center flex-1">
            {/* Logo Container - will provide custom logo here */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
              <img src={logoImg} alt="Eduvora Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-[24px] font-bold text-slate-900 leading-tight tracking-tight">{t('login.logoTitle')}</h2>
            <p className="text-slate-500 text-[10px] font-semibold tracking-[0.2em] uppercase mt-0.5">{t('login.logoSubtitle')}</p>
          </div>
        </div>

        <div className="w-full max-w-[360px] mx-auto grow flex flex-col justify-center">
          {/* Create Your Account & Subtitle */}
          <div className="mb-6 text-center">
            <h1 className="text-[28px] font-extrabold text-slate-900 leading-tight mb-1 tracking-tight">{t('register.title')}</h1>
            <p className="text-[14px] text-indigo-500 font-medium">{t('register.subtitle')}</p>
          </div>

          {/* Register Form */}
          <div className="mb-6">
            <RegisterForm />
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-4 mb-4">
            <div className="grow border-t border-slate-200/80"></div>
            <span className="shrink-0 mx-4 text-slate-400 text-[13px] font-medium">{t('register.orSignUpWith')}</span>
            <div className="grow border-t border-slate-200/80"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            {/* GOOGLE PART */}
            <button type="button" className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200 bg-white">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-[14px] font-bold text-slate-700">{t('register.signUpWithGoogle')}</span>
            </button>

            {/* MICROSOFT PART */}
            {/* <button type="button" className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200 bg-white">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 21 21">
                <path d="M10 0H0v10h10V0z" fill="#f25022" />
                <path d="M21 0H11v10h10V0z" fill="#7fba00" />
                <path d="M10 11H0v10h10V11z" fill="#00a4ef" />
                <path d="M21 11H11v10h10V11z" fill="#ffb900" />
              </svg>
              <span className="text-[14px] font-bold text-slate-700">{t('register.signUpWithMicrosoft')}</span>
            </button> */}
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-[14px] font-medium text-slate-500">
              {t('register.alreadyHaveAccount')}{' '}
              <Link to="/login" className="font-bold text-[#7C4DFF] hover:text-indigo-700 transition-colors ml-1">{t('register.login')}</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Beautiful Bottom Wave Illustration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden z-0 flex items-end justify-center">
        <img src={authMobileBg} alt="Background Pattern" className="w-full h-auto object-cover object-bottom opacity-80" />
      </div>
    </div>
  );
}
