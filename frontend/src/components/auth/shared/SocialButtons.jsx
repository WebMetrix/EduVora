import { useTranslation } from '../../../hooks/useTranslation';

export default function SocialButtons() {
  const { t } = useTranslation();

  return (
    <div className="w-full animate-fade-in" style={{ animationDelay: '300ms' }}>
      <div className="relative flex items-center py-3 md:py-5 lg:py-6">
        <div className="grow border-t border-slate-200/80"></div>
        <span className="shrink-0 mx-5 text-slate-400 text-[14px] md:text-xs lg:text-[13px] font-medium md:font-semibold md:uppercase md:tracking-wider">{t('login.orContinueWith')}</span>
        <div className="grow border-t border-slate-200/80"></div>
      </div>
      <div className="flex flex-col md:flex-row gap-2.5 md:gap-3 lg:gap-4">
        {/* GOOGLE PART */}
        <button type="button" className="flex-1 flex items-center justify-center gap-2 lg:gap-3 py-3 md:py-2.5 lg:py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-200">
          <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span className="text-xs lg:text-[14px] font-bold text-slate-700">{t('login.continueWithGoogle')}</span>
        </button>

        {/* MICROSOFT PART */}
        {/* <button type="button" className="flex-1 flex items-center justify-center gap-2 lg:gap-3 py-3 md:py-2.5 lg:py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-200">
          <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 21 21">
            <path d="M10 0H0v10h10V0z" fill="#f25022" />
            <path d="M21 0H11v10h10V0z" fill="#7fba00" />
            <path d="M10 11H0v10h10V11z" fill="#00a4ef" />
            <path d="M21 11H11v10h10V11z" fill="#ffb900" />
          </svg>
          <span className="text-xs lg:text-[14px] font-bold text-slate-700">{t('login.continueWithMicrosoft')}</span>
        </button> */}
      </div>
    </div>
  );
}
