import { User, Mail, Shield, Phone, Lock, Eye, Users, UserPlus, Check } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

export default function RegisterForm() {
  const { t } = useTranslation();

  return (
    <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
      
      {/* 1. Full Name */}
      <div>
        <label className="block text-[14px] md:text-[13px] font-bold text-slate-800 mb-1.5">
          {t('register.fullNameLabel')} <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder={t('register.fullNamePlaceholder')}
            className="w-full pl-11 pr-4 py-3 md:py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* 2. Email Address */}
      <div>
        <label className="block text-[14px] md:text-[13px] font-bold text-slate-800 mb-1.5">
          {t('register.emailLabel')} <span className="text-red-500">*</span>
        </label>
        <div className="relative flex gap-2">
          <div className="relative group flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <input
              type="email"
              placeholder={t('register.emailPlaceholder')}
              className="w-full pl-11 pr-4 py-3 md:py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <button type="button" className="px-4 py-3 md:py-2.5 whitespace-nowrap text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
            {t('register.verifyEmail')}
          </button>
        </div>
      </div>

      {/* 3. OTP */}
      <div>
        <label className="block text-[14px] md:text-[13px] font-bold text-slate-800 mb-1.5">
          {t('register.otpLabel')} <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Shield className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder={t('register.otpPlaceholder')}
            className="w-full pl-11 pr-16 py-3 md:py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-900 placeholder:text-slate-400"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-sm font-bold text-indigo-600">00:59</span>
          </div>
        </div>
        <p className="mt-1.5 text-[11px] text-slate-500">
          {t('register.otpHint')}
        </p>
      </div>

      {/* 4. Mobile Number */}
      <div>
        <label className="block text-[14px] md:text-[13px] font-bold text-slate-800 mb-1.5">
          {t('register.mobileLabel')} <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type="tel"
            placeholder={t('register.mobilePlaceholder')}
            className="w-full pl-11 pr-4 py-3 md:py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* 5. Password */}
      <div>
        <label className="block text-[14px] md:text-[13px] font-bold text-slate-800 mb-1.5">
          {t('register.passwordLabel')} <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type="password"
            placeholder={t('register.passwordPlaceholder')}
            className="w-full pl-11 pr-11 py-3 md:py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-900 placeholder:text-slate-400"
          />
          <button type="button" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
            <Eye className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-1.5 text-[11px] text-slate-500">
          {t('register.passwordHint')}
        </p>
      </div>

      {/* 6. Confirm Password */}
      <div>
        <label className="block text-[14px] md:text-[13px] font-bold text-slate-800 mb-1.5">
          {t('register.confirmPasswordLabel')} <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type="password"
            placeholder={t('register.confirmPasswordPlaceholder')}
            className="w-full pl-11 pr-11 py-3 md:py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-900 placeholder:text-slate-400"
          />
          <button type="button" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
            <Eye className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 7. Referral Code */}
      <div>
        <label className="block text-[14px] md:text-[13px] font-bold text-slate-800 mb-1.5">
          {t('register.referralLabel')} <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Users className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder={t('register.referralPlaceholder')}
            className="w-full pl-11 pr-4 py-3 md:py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Checkbox */}
      <div className="flex items-center gap-2 pt-2">
        <div className="relative w-4 h-4 shrink-0 flex items-center justify-center">
          <input type="checkbox" className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full peer" id="terms" defaultChecked />
          <div className="w-4 h-4 border border-slate-300 rounded bg-white peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-colors"></div>
          <Check className="absolute inset-0 m-auto w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none z-20" strokeWidth={4} />
        </div>
        <label htmlFor="terms" className="text-[11.5px] md:text-[12px] font-medium text-slate-700 leading-none select-none cursor-pointer flex-1 pt-0.5">
          {t('register.agreeText')} <a href="#" className="text-indigo-600 hover:underline">{t('register.terms')}</a> {t('register.and')} <a href="#" className="text-indigo-600 hover:underline">{t('register.privacy')}</a>
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3.5 md:py-3 px-6 bg-linear-to-r from-[#7C4DFF] to-[#4F46E5] md:bg-none md:bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-[16px] md:text-[15px] shadow-sm transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          {t('register.submit')}
        </button>
      </div>

    </form>
  );
}
