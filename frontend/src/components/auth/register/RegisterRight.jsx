import LanguageDropdown from '../shared/LanguageDropdown';
import RegisterForm from './RegisterForm';
import SocialButtons from '../shared/SocialButtons';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';

export default function RegisterRight() {
  const { t } = useTranslation();

  return (
    <div className="w-[55%] h-full bg-white flex flex-col relative">

      {/* Top right language dropdown - fixed */}
      <div className="absolute top-6 right-6 lg:top-8 lg:right-10 z-20">
        <LanguageDropdown />
      </div>

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-12 xl:px-16 py-8 custom-scrollbar">

        {/* Form wrapper */}
        <div className="max-w-[480px] mx-auto w-full pt-10 pb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>

          <div className="mb-6">
            <h1 className="text-3xl lg:text-[34px] font-extrabold text-slate-900 mb-1 tracking-tight">{t('register.title')}</h1>
            <p className="text-indigo-500 text-[15px] font-medium">{t('register.subtitle')}</p>
          </div>

          <RegisterForm />
          {/* Reusable Social Buttons Component */}
          <SocialButtons mode="register" />

          <div className="text-center mb-8 mt-4">
            <p className="text-[14px] font-medium text-slate-600">
              {t('register.alreadyHaveAccount')} <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700">{t('register.login')}</Link>
            </p>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-slate-500">
            <Shield className="w-4 h-4" />
            <span className="text-[12px] font-medium">{t('register.safeData')}</span>
          </div>

        </div>
      </div>
    </div>
  );
}



