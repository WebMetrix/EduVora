import { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';
import authMobileBg from '../../../assets/images/authMobile.png';
import logoImg from '../../../assets/images/Eduvora.png';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp, resendOtp, resetPassword } from '../../../redux/slices/authSlice';
import { toast } from 'react-toastify';

// Import subcomponents
import ForgotStepper from './steps/ForgotStepper';
import ForgotStepEmail from './steps/ForgotStepEmail';
import ForgotStepOTP from './steps/ForgotStepOTP';
import ForgotStepReset from './steps/ForgotStepReset';
import ForgotStepDone from './steps/ForgotStepDone';

export default function MobileForgot() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

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

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');
    const result = await dispatch(sendOtp({ emailAddress: email }));
    if (sendOtp.fulfilled.match(result)) {
      setStep(2);
      setTimeLeft(300);
      toast.success(result.payload.message);
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) return toast.error('Please enter the complete 6-digit OTP');
    const result = await dispatch(verifyOtp({ emailAddress: email, otp: otpString }));
    if (verifyOtp.fulfilled.match(result)) {
      setStep(3);
      toast.success(result.payload.message);
    }
  };

  const handleResend = async () => {
    const result = await dispatch(resendOtp({ emailAddress: email }));
    if (resendOtp.fulfilled.match(result)) {
      setTimeLeft(300);
      setOtp(['', '', '', '', '', '']);
      toast.success(result.payload.message);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match');
    const otpString = otp.join('');

    const result = await dispatch(resetPassword({
      emailAddress: email,
      otp: otpString,
      newPassword
    }));

    if (resetPassword.fulfilled.match(result)) {
      setStep(4);
      toast.success('Password successfully reset');
    }
  };

  return (
    <div className="w-full h-dvh flex flex-col relative pb-safe pt-safe bg-white px-5 py-4 md:hidden overflow-hidden">
      {/* Header with Logo */}
      <div className="flex justify-between items-start w-full mb-3 relative z-10">
        <div className="flex flex-col items-center flex-1 mt-2">
          {/* Logo Container */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <img src={logoImg} alt="Eduvora Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-[24px] font-bold text-slate-900 leading-tight tracking-tight">{t('login.logoTitle')}</h2>
          <p className="text-slate-500 text-[10px] font-semibold tracking-[0.2em] uppercase mt-0.5">{t('login.logoSubtitle')}</p>

          {/* Empty space where title used to be, now moved down */}
          {step === 4 && (
            <h2 className="text-[20px] font-bold text-slate-900 leading-tight tracking-tight text-center">{t('forgot.doneTitle')}</h2>
          )}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-[360px] mx-auto grow flex flex-col justify-start pt-8 relative z-10">
        {(step === 1 || step === 3 || step === 4) && (
          <>
            {step !== 4 && (
              <div className="mb-4 text-center">
                <h1 className="text-[28px] md:hidden font-extrabold text-slate-900 leading-tight mb-2 tracking-tight">{t('forgot.title')}</h1>
                <p className="text-[13px] text-indigo-600 font-medium px-4">{step === 1 ? t('forgot.subtitle') : t('forgot.resetSubtitle')}</p>
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
            loading={loading}
          />
        ) : step === 2 ? (
          <ForgotStepOTP
            email={email}
            otp={otp}
            setOtp={setOtp}
            inputRefs={inputRefs}
            timeLeft={timeLeft}
            handleResend={handleResend}
            handleVerifyOtp={handleVerifyOtp}
            handleOtpChange={handleOtpChange}
            handleOtpKeyDown={handleOtpKeyDown}
            loading={loading}
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
            handleResetPassword={handleResetPassword}
            loading={loading}
          />
        ) : (
          <ForgotStepDone />
        )}

        {/* Back to Login Footer */}
        {step !== 4 && (
          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors group">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              {t('forgot.backToLogin')}
            </Link>
          </div>
        )}
      </div>

      {/* Background Pattern */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden z-0 flex items-end justify-center">
        <img src={authMobileBg} alt="Background Pattern" className="w-full h-auto object-cover object-bottom opacity-80" />
      </div>
    </div>
  );
}
