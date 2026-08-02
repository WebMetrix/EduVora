import { useState, useEffect } from 'react';
import LoginLeft from '../components/auth/shared/LoginLeft';
import LoginRight from '../components/auth/login/LoginRight';
import MobileLogin from '../components/auth/login/MobileLogin';

export default function Login() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-[100dvh] md:h-screen relative bg-white flex flex-col md:flex-row overflow-hidden">
      {isMobile ? (
        <div className="md:hidden w-full h-full">
          <MobileLogin />
        </div>
      ) : (
        <div className="hidden md:flex w-full h-full z-10 animate-slide-up">
          <LoginLeft />
          <LoginRight />
        </div>
      )}
    </div>
  );
}
