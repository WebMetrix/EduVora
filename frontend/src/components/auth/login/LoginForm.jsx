import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/slices/authSlice';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailAddress || !password) {
      return toast.error("Please enter both email and password.");
    }

    const payload = {
      emailAddress,
      password
    };

    const resultAction = await dispatch(loginUser(payload));

    // Redirect on success
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/dashboard'); // Change this to wherever verified users should land
    }
  };

  return (
    <form className="w-full space-y-3 lg:space-y-5" onSubmit={handleLogin}>
      <div>
        <label className="block text-[14px] md:text-[13px] font-bold text-slate-800 mb-1.5">
          {t('login.emailLabel')}
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type="text"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="w-full pl-11 md:pl-10 lg:pl-12 pr-4 py-3.5 md:py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 transition-all font-medium text-slate-900 placeholder-slate-400 text-base md:text-sm lg:text-base shadow-sm"
            placeholder={t('login.emailPlaceholder')}
          />
        </div>
      </div>

      <div>
        <label className="block text-[14px] md:text-[13px] font-bold text-slate-800 mb-1.5">
          {t('login.passwordLabel')}
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-11 md:pl-10 lg:pl-12 pr-12 py-3.5 md:py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 transition-all font-medium text-slate-900 placeholder-slate-400 text-base md:text-sm lg:text-base shadow-sm"
            placeholder={t('login.passwordPlaceholder')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-0.5 pb-1 lg:pt-2 lg:pb-3">
        <div className="flex items-center group cursor-pointer">
          <div className="relative w-4 h-4 lg:w-4 lg:h-4 shrink-0 flex items-center justify-center">
            <input
              type="checkbox"
              className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full peer"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <div className="w-4 h-4 border border-slate-300 rounded bg-white peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-colors"></div>
            <Check className="absolute inset-0 m-auto w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none z-20" strokeWidth={4} />
          </div>
          <label htmlFor="remember-me" className="ml-2 text-[13px] font-semibold text-slate-600 group-hover:text-slate-900 cursor-pointer transition-colors select-none">
            {t('login.rememberMe')}
          </label>
        </div>
        <div className="text-right">
          <Link to="/forgotpassword" className="text-base md:text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors inline-block pt-1 md:pt-0">
            {t('login.forgotPassword')}
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 md:py-3 lg:py-3.5 px-6 bg-linear-to-r from-[#7C4DFF] to-[#4F46E5] md:bg-none md:bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-[18px] md:text-sm lg:text-[15px] shadow-sm transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
      >
        <LogIn className="w-5 h-5 md:hidden" />
        {loading ? 'Logging in...' : t('login.submit')}
      </button>
    </form>
  );
}