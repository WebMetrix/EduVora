import { Mail, Lock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';

export default function LoginForm() {
  const { t } = useTranslation();

  return (
    <form className="w-full space-y-4 lg:space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wide">
          {t('login.emailLabel')}
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type="text"
            className="w-full pl-10 lg:pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 transition-all font-medium text-slate-900 placeholder-slate-400 text-sm lg:text-base shadow-sm"
            placeholder={t('login.emailPlaceholder')}
          />
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wide">
          {t('login.passwordLabel')}
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type="password"
            className="w-full pl-10 lg:pl-12 pr-12 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 transition-all font-medium text-slate-900 placeholder-slate-400 text-sm lg:text-base shadow-sm"
            placeholder={t('login.passwordPlaceholder')}
          />
          <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
            <Eye className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 pb-2 lg:pt-2 lg:pb-3">
        <div className="flex items-center group cursor-pointer">
          <div className="relative flex items-center justify-center">
            <input
              id="remember-me"
              type="checkbox"
              className="peer appearance-none w-4 h-4 lg:w-5 lg:h-5 border-2 border-slate-300 rounded-md checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all cursor-pointer"
              defaultChecked
            />
            <svg className="absolute w-2.5 h-2.5 lg:w-3 lg:h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <label htmlFor="remember-me" className="ml-2.5 lg:ml-3 text-xs lg:text-sm font-semibold text-slate-600 group-hover:text-slate-900 cursor-pointer transition-colors">
            {t('login.rememberMe')}
          </label>
        </div>
        <Link to="/forgotpassword" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
          {t('login.forgotPassword')}
        </Link>
      </div>

      <button
        type="submit"
        className="w-full py-3 lg:py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm lg:text-[15px] shadow-sm transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {t('login.submit')}
      </button>
    </form>
  );
}
