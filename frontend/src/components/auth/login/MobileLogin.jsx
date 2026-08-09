import { useTranslation } from '../../../hooks/useTranslation';
import LoginForm from './LoginForm';
import SocialButtons from '../shared/SocialButtons';
import { Link } from 'react-router-dom';
import authMobileBg from '../../../assets/images/authMobile.png';
import logoImg from '../../../assets/images/Eduvora.png';

export default function MobileLogin() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col relative bg-white px-5 py-[clamp(0.75rem,3dvh,1rem)] overflow-hidden">
      {/* Header — never shrinks below its content, but is small so it rarely needs to */}
      <div className="flex justify-between items-start w-full mb-[clamp(0.5rem,2dvh,0.75rem)] relative z-10 shrink-0">
        <div className="flex flex-col items-center flex-1 mt-[clamp(0.25rem,1dvh,0.5rem)]">
          <div className="w-[clamp(3rem,9dvh,4rem)] h-[clamp(3rem,9dvh,4rem)] rounded-2xl flex items-center justify-center mb-[clamp(0.25rem,1dvh,0.5rem)] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <img src={logoImg} alt="Eduvora Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-[clamp(1.125rem,4dvh,1.5rem)] font-bold text-slate-900 leading-tight tracking-tight">{t('login.logoTitle')}</h2>
          <p className="text-slate-500 text-[10px] font-semibold tracking-[0.2em] uppercase mt-0.5">{t('login.logoSubtitle')}</p>
        </div>
      </div>

      {/* KEY FIX: min-h-0 lets this block actually shrink to fit instead of overflowing */}
      <div className="w-full max-w-[360px] mx-auto grow min-h-0 flex flex-col justify-center relative z-10">
        <div className="mb-[clamp(0.75rem,3dvh,1.25rem)] text-center shrink-0">
          <h1 className="text-[clamp(1.5rem,6dvh,2rem)] font-extrabold text-slate-900 leading-tight mb-1 tracking-tight">{t('login.title')}</h1>
          <p className="text-[14px] text-indigo-600 font-medium">{t('login.subtitle')}</p>
        </div>

        <div className="mb-[clamp(0.375rem,1.5dvh,0.5rem)] shrink-0">
          <LoginForm />
        </div>

        <div className="shrink-0">
          <SocialButtons />
        </div>

        <div className="mt-[clamp(0.5rem,2dvh,1rem)] text-center pb-[clamp(0.25rem,1dvh,0.5rem)] shrink-0">
          <p className="text-[14px] font-medium text-slate-500">
            {t('login.noAccount')}{' '}
            <Link to="/register" className="font-bold text-[#7C4DFF] hover:text-indigo-700 transition-colors ml-1">
              {t('login.registerNow')}
            </Link>
          </p>
        </div>
      </div>

      {/* Decorative only — absolute, so it never affects layout height */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0">
        <img
          src={authMobileBg}
          alt="Background Pattern"
          className="w-full h-auto max-h-[18dvh] object-cover object-bottom opacity-80 translate-y-[1px]"
        />
      </div>
    </div>
  );
}
