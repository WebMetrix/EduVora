import { useState, useEffect } from 'react';
import { User, Mail, Shield, Phone, Lock, Eye, EyeOff, Users, UserPlus, Check } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp, resendOtp, registerUser } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RegisterForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  // Form States
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Validation State
  const [formErrors, setFormErrors] = useState({});

  // OTP & Verification States
  const [otpValue, setOtpValue] = useState('');
  const [isOtpBoxVisible, setIsOtpBoxVisible] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailHighlight, setEmailHighlight] = useState('neutral'); // 'neutral', 'red', 'green'
  const [timeLeft, setTimeLeft] = useState(0);

  // Password Strength Logic
  const getStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score++;
    if (pass.length >= 12 && score === 3) score++;
    return score;
  };

  const strengthScore = getStrength(password);

  const getStrengthConfig = () => {
    if (!password) return { color: 'text-slate-300', bg: 'bg-slate-200', border: 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20', shadow: '', label: '' };
    switch (strengthScore) {
      case 0:
      case 1:
        return { color: 'text-red-500', bg: 'bg-red-500', border: 'border-red-500 focus:border-red-500', shadow: 'shadow-[0_0_0_4px_rgba(239,68,68,0.1)]', label: t('forgot.strengthWeak') || 'Weak' };
      case 2:
        return { color: 'text-amber-500', bg: 'bg-amber-500', border: 'border-amber-500 focus:border-amber-500', shadow: 'shadow-[0_0_0_4px_rgba(245,158,11,0.1)]', label: t('forgot.strengthFair') || 'Fair' };
      case 3:
        return { color: 'text-emerald-400', bg: 'bg-emerald-400', border: 'border-emerald-400 focus:border-emerald-400', shadow: 'shadow-[0_0_0_4px_rgba(52,211,153,0.1)]', label: t('forgot.strengthGood') || 'Good' };
      case 4:
      default:
        return { color: 'text-emerald-500', bg: 'bg-emerald-500', border: 'border-emerald-500 focus:border-emerald-500', shadow: 'shadow-[0_0_0_4px_rgba(16,185,129,0.1)]', label: t('forgot.strengthStrong') || 'Strong' };
    }
  };

  const strengthConfig = getStrengthConfig();
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  // Timer Effect (300 seconds = 5 mins matching backend)
  useEffect(() => {
    if (timeLeft > 0 && !isEmailVerified) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isEmailVerified]);

  // Handlers
  const handleVerifyEmailClick = async () => {
    if (!emailAddress) return toast.error("Please enter an email address first.");

    const resultAction = await dispatch(sendOtp({ emailAddress, type: 'register', fullName }));

    if (sendOtp.fulfilled.match(resultAction)) {
      setIsOtpBoxVisible(true);
      setTimeLeft(300); // Start 5 min countdown
      setEmailHighlight('neutral');
      toast.success(resultAction.payload.message);
    }
  };

  const handleVerifyOtpSubmit = async () => {
    if (!otpValue) return toast.error("Please enter the OTP.");

    const resultAction = await dispatch(verifyOtp({ emailAddress, otp: otpValue }));

    if (verifyOtp.fulfilled.match(resultAction)) {
      setIsEmailVerified(true);
      setEmailHighlight('green');
      toast.success(resultAction.payload.message);
    } else {
      setEmailHighlight('red');
    }
  };

  const handleResendOtp = async () => {
    if (timeLeft > 0) return; // Prevent clicking if timer is active

    const resultAction = await dispatch(resendOtp({ emailAddress }));

    if (resendOtp.fulfilled.match(resultAction)) {
      setTimeLeft(300); // Reset timer
      setEmailHighlight('neutral'); // Revert red highlight
      setOtpValue(''); // Clear old OTP
      toast.success(resultAction.payload.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Check for empty required fields
    const newErrors = {};
    if (!fullName) newErrors.fullName = true;
    if (!emailAddress) newErrors.emailAddress = true;
    if (!mobileNumber) newErrors.mobileNumber = true;
    if (!password) newErrors.password = true;
    if (!confirmPassword) newErrors.confirmPassword = true;
    if (!referralCode) newErrors.referralCode = true;

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return toast.error("Please fill in all required fields.");
    }
    
    setFormErrors({}); // Clear errors if all fields are filled

    // Strict form validation
    if (!isEmailVerified) {
      return toast.error("Please verify your email address first.");
    }
    if (!passwordsMatch) {
      return toast.error("Passwords do not match.");
    }
    if (!termsAccepted) {
      return toast.error("Please accept the terms and conditions.");
    }

    const payload = {
      fullName,
      emailAddress,
      mobileNumber,
      password,
      referralCode
    };

    const resultAction = await dispatch(registerUser(payload));

    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/login');
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Determine Email Box Border Color
  let emailBorderColor = 'border-slate-200 focus:border-indigo-500';
  if (emailHighlight === 'green') emailBorderColor = 'border-emerald-500 focus:border-emerald-500 bg-emerald-50';
  if (emailHighlight === 'red') emailBorderColor = 'border-red-500 focus:border-red-500 bg-red-50';
  if (formErrors.emailAddress) emailBorderColor = 'border-red-500 focus:border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]';

  return (
    <form className="w-full space-y-4" onSubmit={handleRegister}>

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
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: false });
            }}
            placeholder={t('register.fullNamePlaceholder')}
            className={`w-full pl-11 pr-4 py-3 md:py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm text-slate-900 placeholder:text-slate-400 ${formErrors.fullName ? 'border-red-500 focus:ring-red-500/20 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'}`}
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
              <Mail className={`h-5 w-5 transition-colors ${emailHighlight === 'green' ? 'text-emerald-500' : emailHighlight === 'red' ? 'text-red-500' : 'text-slate-400 group-focus-within:text-indigo-600'}`} />
            </div>
            <input
              type="email"
              value={emailAddress}
              disabled={isEmailVerified}
              onChange={(e) => {
                setEmailAddress(e.target.value);
                setIsOtpBoxVisible(false); // Hide OTP box if they change email
                setEmailHighlight('neutral');
                if (formErrors.emailAddress) setFormErrors({ ...formErrors, emailAddress: false });
              }}
              placeholder={t('register.emailPlaceholder')}
              className={`w-full pl-11 pr-4 py-3 md:py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm text-slate-900 placeholder:text-slate-400 border ${emailBorderColor} ${isEmailVerified ? 'opacity-80' : 'bg-white'}`}
            />
          </div>
          {!isEmailVerified && (
            <button
              type="button"
              onClick={handleVerifyEmailClick}
              disabled={loading || isOtpBoxVisible}
              className="px-5 py-3 md:py-2.5 whitespace-nowrap text-sm font-bold text-white bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none disabled:pointer-events-none"
            >
              {isOtpBoxVisible ? 'OTP Sent' : (loading ? 'Sending...' : t('register.verifyEmail') || 'Verify Email')}
            </button>
          )}
        </div>
      </div>

      {/* 3. Conditional OTP Box */}
      {isOtpBoxVisible && (
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl animate-fade-in">
          <label className="block text-[14px] md:text-[13px] font-bold text-slate-800 mb-1.5">
            {t('register.otpLabel') || 'Enter OTP'} <span className="text-red-500">*</span>
          </label>
          <div className="relative group flex gap-2 mb-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Shield className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <input
                type="text"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
                disabled={isEmailVerified}
                placeholder={t('register.otpPlaceholder')}
                className="w-full pl-11 pr-16 py-3 md:py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-900 placeholder:text-slate-400 disabled:opacity-70"
              />
              {!isEmailVerified && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-sm font-bold text-indigo-600">{formatTime(timeLeft)}</span>
                </div>
              )}
            </div>

            {!isEmailVerified ? (
              <button
                type="button"
                onClick={handleVerifyOtpSubmit}
                disabled={loading}
                className="px-4 py-3 md:py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                Verify
              </button>
            ) : (
              <div className="px-4 py-3 md:py-2.5 flex items-center gap-1.5 text-sm font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg">
                <Check className="w-4 h-4" /> Verified
              </div>
            )}
          </div>

          {!isEmailVerified && (
            <div className="text-[12px] text-slate-500 flex justify-between items-center px-1">
              <p>{t('register.otpHint') || 'OTP sent to your email.'}</p>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={timeLeft > 0 || loading}
                className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                Resend OTP
              </button>
            </div>
          )}
        </div>
      )}

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
            value={mobileNumber}
            onChange={(e) => {
              setMobileNumber(e.target.value);
              if (formErrors.mobileNumber) setFormErrors({ ...formErrors, mobileNumber: false });
            }}
            placeholder={t('register.mobilePlaceholder')}
            className={`w-full pl-11 pr-4 py-3 md:py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm text-slate-900 placeholder:text-slate-400 ${formErrors.mobileNumber ? 'border-red-500 focus:ring-red-500/20 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'}`}
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
            <Lock className={`h-5 w-5 transition-colors ${password ? strengthConfig.color : 'text-slate-400 group-focus-within:text-indigo-600'}`} />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (formErrors.password) setFormErrors({ ...formErrors, password: false });
            }}
            placeholder={t('register.passwordPlaceholder')}
            className={`w-full pl-11 pr-11 py-3 md:py-2.5 bg-white border rounded-lg focus:outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400 ${formErrors.password ? 'border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.1)] focus:ring-2 focus:ring-red-500/20' : `${strengthConfig.border} ${strengthConfig.shadow}`}`}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        {/* Strength Meter */}
        <div className="flex items-center gap-1.5 md:gap-2 mt-2 mb-1.5">
          <div className="flex-1 flex gap-1 md:gap-1.5 h-1 md:h-1.5">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`flex-1 rounded-full transition-all duration-300 ${level <= (strengthScore === 0 && password ? 1 : strengthScore) ? strengthConfig.bg : 'bg-slate-200'}`}
              />
            ))}
          </div>
          <span className={`text-[10px] md:text-[12px] font-bold min-w-[40px] md:min-w-[45px] text-right ${strengthConfig.color}`}>
            {strengthConfig.label}
          </span>
        </div>

        <p className="mt-1 text-[11px] text-slate-500">
          {t('register.passwordHint')}
        </p>
      </div>

      {/* 6. Confirm Password */}
      <div>
        <label className="block text-[14px] md:text-[13px] font-bold text-slate-800 mb-1.5">
          {t('register.confirmPasswordLabel')} <span className="text-red-500">*</span>
        </label>
        <div className="relative group mb-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Lock className={`h-5 w-5 transition-colors ${confirmPassword ? (passwordsMatch ? 'text-emerald-500' : 'text-red-500') : 'text-slate-400 group-focus-within:text-indigo-600'}`} />
          </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (formErrors.confirmPassword) setFormErrors({ ...formErrors, confirmPassword: false });
            }}
            placeholder={t('register.confirmPasswordPlaceholder')}
            className={`w-full pl-11 pr-11 py-3 md:py-2.5 bg-white border rounded-lg focus:outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400 ${
              formErrors.confirmPassword 
                ? 'border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.1)] focus:ring-2 focus:ring-red-500/20'
                : confirmPassword
                ? (passwordsMatch
                  ? 'border-emerald-500 focus:border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]'
                  : 'border-red-500 focus:border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]')
                : 'border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
          />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {confirmPassword && (
          <p className={`text-[12px] font-bold ${passwordsMatch ? 'text-emerald-500' : 'text-red-500'}`}>
            {passwordsMatch ? t('register.passwordsMatch') || 'Passwords match' : t('register.passwordsDoNotMatch') || 'Passwords do not match'}
          </p>
        )}
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
            value={referralCode}
            onChange={(e) => {
              setReferralCode(e.target.value);
              if (formErrors.referralCode) setFormErrors({ ...formErrors, referralCode: false });
            }}
            placeholder={t('register.referralPlaceholder')}
            className={`w-full pl-11 pr-4 py-3 md:py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm text-slate-900 placeholder:text-slate-400 ${formErrors.referralCode ? 'border-red-500 focus:ring-red-500/20 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'}`}
          />
        </div>
      </div>

      {/* Checkbox */}
      <div className="flex items-center gap-2 pt-2">
        <div className="relative w-4 h-4 shrink-0 flex items-center justify-center">
          <input
            type="checkbox"
            className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full peer"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
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
          disabled={loading}
          className="w-full py-3.5 md:py-3 px-6 bg-linear-to-r from-[#7C4DFF] to-[#4F46E5] hover:bg-indigo-700 text-white rounded-lg font-bold text-[16px] md:text-[15px] shadow-sm transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
        >
          <UserPlus className="w-5 h-5" />
          {loading ? 'Creating...' : t('register.submit') || 'Create Account'}
        </button>
      </div>

    </form>
  );
}