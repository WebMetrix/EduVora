import { useState, useRef, useEffect } from 'react';
import LanguageDropdown from '../shared/LanguageDropdown';
import { ArrowLeft, HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp, resendOtp, resetPassword } from '../../../redux/slices/authSlice';
import { toast } from 'react-toastify';

// Import subcomponents
import ForgotStepper from './steps/ForgotStepper';
import ForgotStepEmail from './steps/ForgotStepEmail';
import ForgotStepOTP from './steps/ForgotStepOTP';
import ForgotStepReset from './steps/ForgotStepReset';
import ForgotStepDone from './steps/ForgotStepDone';


export default function ForgotRight() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(45);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
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
    if (!email) {
      setFormErrors({ email: true });
      return toast.error(t('toast.auth.enterEmail'));
    }
    setFormErrors({});
    const result = await dispatch(sendOtp({ emailAddress: email, type: 'forgot_password' }));
    if (sendOtp.fulfilled.match(result)) {
      setStep(2);
      setTimeLeft(300);
      toast.success(result.payload.message);
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) return toast.error(t('toast.auth.enterCompleteOtp'));
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
    
    const newErrors = {};
    if (!newPassword) newErrors.newPassword = true;
    if (!confirmPassword) newErrors.confirmPassword = true;

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return toast.error(t('toast.auth.fillRequiredFields'));
    }
    
    if (newPassword !== confirmPassword) return toast.error(t('toast.auth.passwordsDoNotMatch'));
    setFormErrors({});
    const otpString = otp.join('');

    const result = await dispatch(resetPassword({
      emailAddress: email,
      otp: otpString,
      newPassword
    }));

    if (resetPassword.fulfilled.match(result)) {
      setStep(4);
      toast.success(t('toast.auth.passwordResetSuccess'));
    }
  };


  return (
    <div className="w-[55%] h-full bg-white flex flex-col relative">
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col relative">

        {/* Language Dropdown - scrolls with content */}
        <div className="w-full flex justify-end px-6 lg:px-12 xl:px-16 pt-6 lg:pt-8 pb-4 shrink-0">
          <LanguageDropdown />
        </div>

        {/* Main Content Container */}
        <div className="grow flex flex-col px-6 lg:px-12 xl:px-16 pb-10 w-full animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="max-w-[480px] w-full mx-auto my-auto">
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
                setEmail={(val) => {
                  setEmail(val);
                  if (formErrors.email) setFormErrors({ ...formErrors, email: false });
                }}
                handleSendOtp={handleSendOtp}
                loading={loading}
                formErrors={formErrors}
              />
            ) : step === 2 ? (
              <ForgotStepOTP
                email={email} otp={otp} setOtp={setOtp} inputRefs={inputRefs} timeLeft={timeLeft}
                handleResend={handleResend} handleVerifyOtp={handleVerifyOtp} handleOtpChange={handleOtpChange}
                handleOtpKeyDown={handleOtpKeyDown} loading={loading}
              />
            ) : step === 3 ? (
              <ForgotStepReset
                newPassword={newPassword}
                setNewPassword={(val) => {
                  setNewPassword(val);
                  if (formErrors.newPassword) setFormErrors({ ...formErrors, newPassword: false });
                }}
                confirmPassword={confirmPassword}
                setConfirmPassword={(val) => {
                  setConfirmPassword(val);
                  if (formErrors.confirmPassword) setFormErrors({ ...formErrors, confirmPassword: false });
                }}
                strengthScore={strengthScore}
                strengthConfig={strengthConfig}
                hasLength={hasLength}
                hasMixed={hasMixed}
                hasNumberSpecial={hasNumberSpecial}
                setStep={setStep}
                handleResetPassword={handleResetPassword}
                loading={loading}
                formErrors={formErrors}
              />
            ) : (
              <ForgotStepDone />
            )}
          </div>
        </div>

        {/* Footer Area */}
        {step !== 4 && (
          <div className="w-full px-6 lg:px-12 xl:px-24 pt-8 pb-10 mt-auto flex items-center justify-between animate-fade-in shrink-0" style={{ animationDelay: '300ms' }}>
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
