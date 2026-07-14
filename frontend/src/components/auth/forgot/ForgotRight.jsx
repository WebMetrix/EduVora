import { useState, useRef, useEffect } from 'react';
import LanguageDropdown from '../shared/LanguageDropdown';
import { ArrowLeft, HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';

// Import subcomponents
import ForgotStepper from './steps/ForgotStepper';
import ForgotStepEmail from './steps/ForgotStepEmail';
import ForgotStepOTP from './steps/ForgotStepOTP';
import ForgotStepReset from './steps/ForgotStepReset';
import ForgotStepDone from './steps/ForgotStepDone';

export default function ForgotRight() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(45);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const inputRefs = useRef([]);

  const getStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score++;
    if (pass.length >= 12 && score === 3) score++;
    return score;
  };

  const strengthScore = getStrength(newPassword);

  const getStrengthConfig = () => {
    if (!newPassword) return { color: 'text-slate-300', bg: 'bg-slate-200', border: 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20', shadow: '', label: '' };
    switch (strengthScore) {
      case 0:
      case 1:
        return { color: 'text-red-500', bg: 'bg-red-500', border: 'border-red-500 focus:border-red-500', shadow: 'shadow-[0_0_0_4px_rgba(239,68,68,0.1)]', label: t('forgot.strengthWeak') };
      case 2:
        return { color: 'text-amber-500', bg: 'bg-amber-500', border: 'border-amber-500 focus:border-amber-500', shadow: 'shadow-[0_0_0_4px_rgba(245,158,11,0.1)]', label: t('forgot.strengthFair') };
      case 3:
        return { color: 'text-emerald-400', bg: 'bg-emerald-400', border: 'border-emerald-400 focus:border-emerald-400', shadow: 'shadow-[0_0_0_4px_rgba(52,211,153,0.1)]', label: t('forgot.strengthGood') };
      case 4:
      default:
        return { color: 'text-emerald-500', bg: 'bg-emerald-500', border: 'border-emerald-500 focus:border-emerald-500', shadow: 'shadow-[0_0_0_4px_rgba(16,185,129,0.1)]', label: t('forgot.strengthStrong') };
    }
  };

  const strengthConfig = getStrengthConfig();
  const hasLength = newPassword.length >= 8;
  const hasMixed = /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword);
  const hasNumberSpecial = /[0-9]/.test(newPassword) && /[^A-Za-z0-9]/.test(newPassword);

  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, timeLeft]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (email) {
      setStep(2);
      setTimeLeft(45);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(45);
    // Add logic to resend OTP here
  };

  return (
    <div className="w-[55%] h-full bg-white flex flex-col relative">
      {/* Top right language dropdown */}
      <div className="absolute top-6 right-6 lg:top-8 lg:right-10 z-20">
        <LanguageDropdown />
      </div>

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-12 xl:px-16 py-10 custom-scrollbar flex flex-col">
        {/* Main Content Container */}
        <div className="grow flex flex-col justify-center w-full animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="max-w-[480px] w-full mx-auto">
          {(step === 1 || step === 3 || step === 4) && (
            <>
              {step !== 4 && (
                <div className="mb-8 hidden md:block">
                  <h1 className="text-3xl lg:text-[34px] font-extrabold text-slate-900 mb-2 tracking-tight">{t('forgot.title')}</h1>
                  <p className="text-slate-600 text-[15px] leading-relaxed pr-8">{step === 1 ? t('forgot.subtitle') : t('forgot.resetSubtitle')}</p>
                </div>
              )}
              
              <ForgotStepper step={step} />
            </>
          )}

          {step === 1 ? (
            <ForgotStepEmail 
              email={email} 
              setEmail={setEmail} 
              handleSendOtp={handleSendOtp} 
            />
          ) : step === 2 ? (
            <ForgotStepOTP 
              email={email}
              otp={otp}
              setOtp={setOtp}
              inputRefs={inputRefs}
              timeLeft={timeLeft}
              handleResend={handleResend}
              handleOtpChange={handleOtpChange}
              handleOtpKeyDown={handleOtpKeyDown}
              setStep={setStep}
            />
          ) : step === 3 ? (
            <ForgotStepReset 
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              strengthScore={strengthScore}
              strengthConfig={strengthConfig}
              hasLength={hasLength}
              hasMixed={hasMixed}
              hasNumberSpecial={hasNumberSpecial}
              setStep={setStep}
            />
          ) : (
            <ForgotStepDone />
          )}
        </div>
      </div>

      {/* Footer Area */}
      {step !== 4 && (
        <div className="w-full px-6 lg:px-12 xl:px-24 pt-8 mt-auto flex items-center justify-between animate-fade-in shrink-0" style={{ animationDelay: '300ms' }}>
          <Link to="/login" className="flex items-center gap-2 text-[14px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t('forgot.backToLogin')}
          </Link>
          <div className="h-5 w-px bg-slate-300"></div>
          <div className="flex items-center gap-2 text-[14px] font-medium text-slate-600">
            <HeadphonesIcon className="w-4 h-4 text-slate-700" />
            {t('forgot.needHelp')} <a href="#" className="font-bold text-indigo-600 hover:text-indigo-700">{t('forgot.contactSupport')}</a>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
