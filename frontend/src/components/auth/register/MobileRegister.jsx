import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import RegisterForm from './RegisterForm';
import SocialButtons from '../shared/SocialButtons';
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


          {/* Social Buttons */}
          <SocialButtons mode="register" />

          {/* Login Link */}
          <div className="text-center mt-4">
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
