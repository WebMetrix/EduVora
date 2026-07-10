import { Shield, Send } from 'lucide-react';
import { useTranslation } from '../../../../hooks/useTranslation';

export default function ForgotStepOTP({
  email,
  otp,
  setOtp,
  inputRefs,
  timeLeft,
  handleResend,
  handleOtpChange,
  handleOtpKeyDown,
  setStep
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center text-center animate-fade-in">
      <div className="w-14 h-14 md:w-16 md:h-16 bg-[#f4efff] rounded-full flex items-center justify-center mb-4 md:mb-6">
        <Shield className="w-7 h-7 md:w-8 md:h-8 text-[#4f3bf3]" />
      </div>
      <h1 className="text-[20px] md:text-[26px] font-extrabold text-[#0f172a] mb-1 md:mb-2">{t('forgot.verifyOtpTitle')}</h1>
      <p className="text-[12px] md:text-[14px] text-slate-500 mb-6 md:mb-8">
        {t('forgot.verifyOtpSubtitle')}<br />
        <span className="text-[#4f3bf3] font-medium mt-1 inline-block">{email}</span>
      </p>

      <div className="w-full mb-6 md:mb-8">
        <label className="block text-left text-[12px] md:text-[13px] font-bold text-slate-800 mb-2 md:mb-3">{t('forgot.enterOtpLabel')}</label>
        <div className="flex justify-between gap-1.5 md:gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 border border-slate-200 rounded-lg md:rounded-xl text-center text-lg md:text-xl font-bold text-slate-900 focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all"
            />
          ))}
        </div>
      </div>

      <div className="text-[12px] md:text-[13px] font-medium text-slate-500 mb-6 md:mb-8">
        {t('forgot.didNotReceiveOtp')}{' '}
        {timeLeft > 0 ? (
          <span>{t('forgot.resendIn')} 00:{timeLeft.toString().padStart(2, '0')}</span>
        ) : (
          <button onClick={handleResend} className="text-[#4f3bf3] font-bold hover:underline">
            {t('forgot.resendOtp')}
          </button>
        )}
      </div>

      <button onClick={() => setStep(3)} className="w-full flex items-center justify-center gap-2 px-5 py-2.5 md:py-3.5 text-[14px] md:text-[15px] font-bold text-white bg-[#4f3bf3] hover:bg-indigo-700 rounded-lg shadow-sm transition-colors">
        <Send className="w-4 h-4" />
        {t('forgot.verifyOtpBtn')}
      </button>
    </div>
  );
}
