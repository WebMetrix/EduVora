import React from 'react';
import LoginLeft from '../components/auth/shared/LoginLeft';
import RegisterRight from '../components/auth/register/RegisterRight';
import MobileRegister from '../components/auth/register/MobileRegister';

export default function Register() {
  return (
    <div className="w-full relative bg-white flex flex-col md:flex-row min-h-screen md:h-screen md:overflow-hidden">
      {/* Desktop Container */}
      <div className="hidden md:flex w-full h-full font-sans bg-slate-50">
        <LoginLeft />
        <RegisterRight />
      </div>

      {/* Mobile Container */}
      <div className="md:hidden w-full">
        <MobileRegister />
      </div>
    </div>
  );
}
