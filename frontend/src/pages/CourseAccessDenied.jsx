import React from 'react';

import { useNavigate } from 'react-router-dom';
import { Home, ShoppingCart, GraduationCap } from 'lucide-react';
import coursesImage from '../assets/accessDenied/courses.webp';
import { useTranslation } from '../hooks/useTranslation';

const CourseAccessDenied = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 md:p-8 font-sans pb-12 -mt-4 md:-mt-8">
      {/* Image container */}
      <div className="w-full max-w-[450px] md:max-w-[750px] -mb-12 md:-mb-24 -mt-4 md:-mt-20 lg:-mt-20">
        <img
          src={coursesImage}
          alt="Course Access Denied"
          className="w-full h-auto object-contain select-none pointer-events-none"
        />
      </div>

      <h1 className="text-[#0B1021] text-[28px] md:text-[36px] font-bold mb-3 md:mb-4 text-center z-10">
        {t('accessDenied.course.title')}
      </h1>

      <p className="text-[#4E5465] text-center text-[15px] md:text-base max-w-[340px] md:max-w-[420px] mb-8 leading-relaxed z-10">
        {t('accessDenied.course.desc1')}<br className="hidden md:block" />
        {t('accessDenied.course.desc2')}
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-[340px] md:max-w-[500px] justify-center mb-10 z-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white border-[1.5px] border-[#4611E1] text-[#4611E1] hover:bg-[#f0edfc] hover:scale-105 transition-all duration-300 ease-in-out rounded-xl px-6 py-3.5 flex items-center justify-center gap-2 font-semibold w-full md:flex-1 text-[15px] md:text-base"
        >
          <Home className="w-[18px] h-[18px]" strokeWidth={2.5} />
          {t('accessDenied.course.goToHome')}
        </button>

        <button
          onClick={() => navigate('/courses')}
          className="bg-[#4611E1] border-[1.5px] border-[#4611E1] hover:bg-[#340bb0] hover:border-[#340bb0] hover:scale-105 hover:shadow-[0_8px_20px_rgba(70,17,225,0.3)] transition-all duration-300 ease-in-out text-white rounded-xl px-6 py-3.5 flex items-center justify-center gap-2 font-semibold w-full md:flex-1 text-[15px] md:text-base"
        >
          <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={2.5} />
          {t('accessDenied.course.purchaseCourse')}
        </button>
      </div>

      {/* Info Card */}
      <div className="bg-linear-to-r from-indigo-50/70 to-purple-50/70 backdrop-blur-xl border border-indigo-100/50 rounded-2xl py-3.5 px-5 md:py-4 md:px-8 w-full max-w-[340px] md:max-w-[800px] flex flex-row items-center gap-4 md:gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50 z-10">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 text-[#4611E1] flex items-center justify-center shrink-0 shadow-sm border border-indigo-200/50">
          <GraduationCap className="w-6 h-6 md:w-7 md:h-7" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-slate-900 font-bold text-[15px] md:text-[17px] mb-0.5">
            {t('accessDenied.course.whyPurchase')}
          </h3>
          <p className="text-slate-500 font-medium text-[13px] md:text-[14.5px] leading-relaxed">
            {t('accessDenied.course.whyPurchaseDesc')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseAccessDenied;
