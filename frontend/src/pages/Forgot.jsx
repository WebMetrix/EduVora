import ForgotLeft from '../components/auth/shared/ForgotLeft';
import ForgotRight from '../components/auth/forgot/ForgotRight';
import MobileForgot from '../components/auth/forgot/MobileForgot';

export default function Forgot() {
  return (
    <div className="w-full relative bg-white flex flex-col md:flex-row min-h-screen md:h-screen md:overflow-hidden font-sans">
      {/* Desktop Container */}
      <div className="hidden md:flex w-full h-full z-10 animate-slide-up">
        <ForgotLeft />
        <ForgotRight />
      </div>
    
      {/* Mobile Container */}
      <div className="md:hidden w-full">
        <MobileForgot />
      </div>
    </div>
  );
}
