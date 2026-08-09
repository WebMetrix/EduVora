import { useTranslation } from '../../../hooks/useTranslation';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { googleAuthUser } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function SocialButtons({ mode = 'login' }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    const resultAction = await dispatch(googleAuthUser(credentialResponse.credential));
    if (googleAuthUser.fulfilled.match(resultAction)) {
      navigate(mode === 'register' ? '/login' : '/dashboard');
    }
  };

  const dividerText = mode === 'register' ? t('register.orSignUpWith') : t('login.orContinueWith');
  const googleBtnText = mode === 'register' ? 'signup_with' : 'continue_with';

  return (
    <div className="w-full animate-fade-in" style={{ animationDelay: '300ms' }}>
      <div className="relative flex items-center py-[clamp(0.5rem,2dvh,0.75rem)] md:py-[clamp(0.75rem,2.5dvh,1.25rem)] lg:py-[clamp(1rem,3dvh,1.5rem)]">
        <div className="grow border-t border-slate-200/80"></div>
        <span className="shrink-0 mx-5 text-slate-400 text-[14px] md:text-xs lg:text-[13px] font-medium md:font-semibold md:uppercase md:tracking-wider">
          {dividerText}
        </span>
        <div className="grow border-t border-slate-200/80"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-2.5 md:gap-3 lg:gap-4 justify-center">
        <div className="flex-1 w-full flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.error('Google Login Failed')}
            useOneTap={mode === 'login'}
            theme="outline"
            size="large"
            text={googleBtnText}
            shape="rectangular"
          />
        </div>
      </div>
    </div>
  );
}
