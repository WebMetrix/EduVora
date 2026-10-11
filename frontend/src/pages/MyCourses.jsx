import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronRight } from 'lucide-react';
import PackageCourseView from '../components/courses/PackageCourseView';

export default function MyCourses() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-full pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-1 mb-6 lg:mb-8">
        <h1 className="text-[24px] lg:text-[28px] font-bold text-slate-900 mb-1">
          {t('myCourses.title') || 'My Courses'}
        </h1>
        <div className="hidden md:flex items-center text-[13px] font-medium text-slate-500 gap-1.5">
          <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">
            {t('myCourses.breadcrumb1') || 'Home'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">
            {t('myCourses.breadcrumb2') || 'My Courses'}
          </span>
        </div>
      </div>

      {/* New Course & Packages UI (Image 1) */}
      <PackageCourseView />
    </div>
  );
}
