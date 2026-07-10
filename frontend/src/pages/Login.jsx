import LoginLeft from '../components/auth/shared/LoginLeft';
import LoginRight from '../components/auth/login/LoginRight';
import MobileLogin from '../components/auth/login/MobileLogin';

export default function Login() {
  return (
    <div className="w-full relative bg-white flex flex-col md:flex-row min-h-screen md:h-screen md:overflow-hidden">
      {/* Desktop Container */}
      <div className="hidden md:flex w-full h-full z-10 animate-slide-up">
        <LoginLeft />
        <LoginRight />
      </div>

      {/* Mobile Container */}
      <div className="md:hidden w-full">
        <MobileLogin />
      </div>
    </div>
  );
}
