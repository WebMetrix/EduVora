import React from 'react';
import LoginLeft from '../components/auth/shared/LoginLeft';
import RegisterRight from '../components/auth/register/RegisterRight';

export default function Register() {
  return (
    <div className="flex w-full h-screen font-sans bg-slate-50">
      <LoginLeft />
      <RegisterRight />
    </div>
  );
}
