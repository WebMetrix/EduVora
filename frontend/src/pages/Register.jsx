import React, { useState, useEffect } from 'react';
import LoginLeft from '../components/auth/shared/LoginLeft';
import RegisterRight from '../components/auth/register/RegisterRight';
import MobileRegister from '../components/auth/register/MobileRegister';

export default function Register() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full relative bg-white flex flex-col md:flex-row min-h-screen md:h-screen md:overflow-hidden">
      {isMobile ? (
        <div className="md:hidden w-full">
          <MobileRegister />
        </div>
      ) : (
        <div className="hidden md:flex w-full h-full font-sans bg-slate-50">
          <LoginLeft />
          <RegisterRight />
        </div>
      )}
    </div>
  );
}
