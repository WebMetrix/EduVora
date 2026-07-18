import { Mail, Send, Info } from 'lucide-react';
import { useTranslation } from '../../../../hooks/useTranslation';

export default function ForgotStepEmail({ email, setEmail, handleSendOtp, loading, formErrors }) {
  const { t } = useTranslation();

  return (
    <>
      <form className="w-full space-y-4 md:space-y-5" onSubmit={handleSendOtp}>
        <div>
          <label className="block text-[12px] md:text-[13px] font-bold text-slate-800 mb-1 md:mb-1.5">
            {t('forgot.emailLabel')} <span className="text-red-500">*</span>
          </label>
          <div className="relative flex flex-col md:flex-row gap-3 md:gap-3">
            <div className="relative group flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 md:pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('forgot.emailPlaceholder')}
                className={`w-full pl-9 pr-3 py-2.5 md:pl-11 md:pr-4 md:py-3 bg-white border rounded-lg focus:outline-none transition-all text-[13px] md:text-[15px] text-slate-900 placeholder:text-slate-400 ${formErrors?.email ? 'border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.1)] focus:ring-2 focus:ring-red-500/20' : 'border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'}`}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto mt-3 md:mt-0 flex items-center justify-center gap-2 px-5 py-2.5 md:py-3 whitespace-nowrap text-[14px] md:text-[15px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 rounded-lg shadow-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
            >
              <Send className="w-4 h-4" />
              {loading ? t('common.sending') : t('forgot.sendOTP')}
            </button>
          </div>
          <p className="mt-2 text-[11px] md:text-[13px] text-slate-500 font-medium text-center md:text-left">
            {t('forgot.emailHint')}
          </p>
        </div>
      </form>

      {/* Info Box */}
      <div className="mt-6 md:mt-8 bg-[#f8f6ff] border border-indigo-100 rounded-xl p-4 md:p-5 flex gap-3 md:gap-4">
        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-3 h-3 md:w-4 md:h-4 text-white" />
        </div>
        <div>
          <h4 className="text-[12px] md:text-[14px] font-bold text-slate-900 mb-0.5 md:mb-1">{t('forgot.infoTitle')}</h4>
          <p className="text-[11px] md:text-[13px] text-slate-600 leading-relaxed">
            {t('forgot.infoDesc')}
          </p>
        </div>
      </div>
    </>
  );
}
