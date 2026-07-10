import { GraduationCap, Network, BarChart2 } from 'lucide-react';
import illustration from '../../../assets/Auth.png';
import { useTranslation } from '../../../hooks/useTranslation';

export default function LoginLeft() {
  const { t } = useTranslation();

  return (
    <div className="w-[45%] h-full bg-[#0B1120] relative overflow-hidden flex flex-col border-r border-slate-800/80">

      {/* Decorative Dots Pattern */}
      <div className="absolute top-0 right-0 p-8 opacity-25 pointer-events-none z-10">
        <div className="grid grid-cols-6 gap-3">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
          ))}
        </div>
      </div>

      {/* Content area — sits on top of illustration */}
      <div className="relative z-10 flex flex-col h-full p-8 lg:p-10 xl:p-12">

        {/* Logo Container */}
        <div className="flex items-center gap-3 mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
          {/* ========================================== */}
          {/* TODO: ADD YOUR CUSTOM LOGO IMAGE/SVG HERE */}
          {/* ========================================== */}
          <div className="w-10 h-10 rounded-xl border-2 border-dashed border-slate-600 flex items-center justify-center shrink-0">
            <span className="text-slate-500 text-[10px] font-bold">Logo</span>
          </div>
          <div>
            <h2 className="text-white text-lg lg:text-xl font-bold tracking-tight leading-tight">{t('login.logoTitle')}</h2>
            <p className="text-blue-400 text-[10px] font-semibold tracking-widest uppercase mt-0.5">{t('login.logoSubtitle')}</p>
          </div>
        </div>

        {/* Hero Text */}
        <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-[1.2] tracking-tight drop-shadow-lg">
            {t('login.heroTitle1')}<br />
            {t('login.heroTitle2')} <span className="text-indigo-400">{t('login.heroTitleHighlight')}</span>
          </h1>
          <p className="text-slate-300 text-xs lg:text-sm mb-6 leading-relaxed font-normal max-w-[340px] drop-shadow">
            {t('login.heroSubtitle')}
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-3.5 animate-fade-in max-w-[380px]" style={{ animationDelay: '300ms' }}>

          <div className="flex items-center gap-5 px-5 py-4 rounded-xl bg-slate-900/20 backdrop-blur-md border border-slate-600/20 hover:bg-slate-800/60 hover:border-indigo-500/40 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-900/20 transition-all duration-300 cursor-default">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-900/40">
              <GraduationCap className="text-white w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-[15px] leading-tight">{t('login.feature1Title')}</h3>
              <p className="text-slate-300 text-xs leading-snug mt-1">{t('login.feature1Desc')}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 px-5 py-4 rounded-xl bg-slate-900/20 backdrop-blur-md border border-slate-600/20 hover:bg-slate-800/60 hover:border-blue-500/40 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300 cursor-default">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/40">
              <Network className="text-white w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-[15px] leading-tight">{t('login.feature2Title')}</h3>
              <p className="text-slate-300 text-xs leading-snug mt-1">{t('login.feature2Desc')}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 px-5 py-4 rounded-xl bg-slate-900/20 backdrop-blur-md border border-slate-600/20 hover:bg-slate-800/60 hover:border-emerald-500/40 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-900/20 transition-all duration-300 cursor-default">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/40">
              <BarChart2 className="text-white w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-[15px] leading-tight">{t('login.feature3Title')}</h3>
              <p className="text-slate-300 text-xs leading-snug mt-1">{t('login.feature3Desc')}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Illustration — absolute, shifted right to prevent overlap */}
      <img
        src={illustration}
        alt="Illustration"
        className="absolute bottom-0 right-[5%] w-[70%] h-auto max-h-[80%] object-contain pointer-events-none z-0"
        style={{ opacity: 0.95 }}
      />
    </div>
  );
}
