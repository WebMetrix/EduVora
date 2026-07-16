import { useTranslation } from '../../../hooks/useTranslation';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { googleAuthUser } from '../../../redux/slices/authSlice';

export default function SocialButtons({ mode = 'login' }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleGoogleSuccess = (credentialResponse) => {
    // Dispatch the Google credential to the Redux thunk
    dispatch(googleAuthUser(credentialResponse.credential));
  };

  // Dynamically set text based on the mode prop
  const dividerText = mode === 'register' ? t('register.orSignUpWith') : t('login.orContinueWith');
  const googleBtnText = mode === 'register' ? 'signup_with' : 'continue_with';


  return (
    <div className="w-full animate-fade-in" style={{ animationDelay: '300ms' }}>
      {/* Dynamic Divider */}
      <div className="relative flex items-center py-3 md:py-5 lg:py-6">
        <div className="grow border-t border-slate-200/80"></div>
        <span className="shrink-0 mx-5 text-slate-400 text-[14px] md:text-xs lg:text-[13px] font-medium md:font-semibold md:uppercase md:tracking-wider">{dividerText}</span>
        <div className="grow border-t border-slate-200/80"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-2.5 md:gap-3 lg:gap-4 justify-center"> {/* flex flex-col md:flex-row gap-2.5 md:gap-3 lg:gap-4 */}
        {/* OFFICIAL GOOGLE COMPONENT */}
        <div className="flex-1 w-full flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => { console.error('Google Login Failed'); }}
            useOneTap={mode === 'login'} // Only trigger OneTap pop-up on login screens
            theme="outline"
            size="large"
            text={googleBtnText}
            shape="rectangular"
          />
        </div>

        {/* MICROSOFT PART */}
        {/* <button type="button" className="flex-1 flex items-center justify-center gap-2 lg:gap-3 py-3 md:py-2.5 lg:py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-200">
          <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 21 21">
            <path d="M10 0H0v10h10V0z" fill="#f25022" />
            <path d="M21 0H11v10h10V0z" fill="#7fba00" />
            <path d="M10 11H0v10h10V11z" fill="#00a4ef" />
            <path d="M21 11H11v10h10V11z" fill="#ffb900" />
          </svg>
          <span className="text-xs lg:text-[14px] font-bold text-slate-700">{t('login.continueWithMicrosoft')}</span>
        </button> */}
      </div>
    </div>
  );
}
