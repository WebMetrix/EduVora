import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import genericImage from '../assets/accessDenied/generic.webp';
import { useTranslation } from '../hooks/useTranslation';

const AccessDenied = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[420px] md:max-w-[650px] -mb-8 md:-mb-16 mt-[-5vh] md:mt-[-10vh]">
        <img 
          src={genericImage} 
          alt="403 Access Denied" 
          className="w-full h-auto object-contain"
        />
      </div>

      <h1 className="text-[#0B1021] text-3xl md:text-[38px] font-bold mb-2 text-center">
        {t('accessDenied.generic.title')}
      </h1>
      
      <p className="text-[#4E5465] text-center text-[15px] md:text-base max-w-[340px] md:max-w-[400px] mb-6 leading-relaxed">
        {t('accessDenied.generic.desc')}
      </p>

      <button
        onClick={() => navigate('/login')}
        className="bg-[#4611E1] hover:bg-[#340bb0] hover:scale-105 hover:shadow-[0_8px_20px_rgba(70,17,225,0.3)] transition-all duration-300 ease-in-out text-white rounded-xl px-8 py-3.5 flex items-center justify-center gap-2 font-medium w-full max-w-[320px] text-[15px] md:text-base md:max-w-[280px]"
      >
        <Lock className="w-[18px] h-[18px]" strokeWidth={2.5} />
        {t('accessDenied.generic.goToLogin')}
      </button>
    </div>
  );
};

export default AccessDenied;
