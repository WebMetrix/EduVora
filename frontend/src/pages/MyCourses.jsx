import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronRight, Search, Filter, ChevronDown } from 'lucide-react';
import MyCoursesStats from '../components/courses/MyCoursesStats';
import PurchasedCourses from '../components/courses/PurchasedCourses';
import CourseDetailsTable from '../components/courses/CourseDetailsTable';

export default function MyCourses() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col min-h-full">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-[24px] lg:text-[28px] font-bold text-slate-900 mb-2">
            {t('myCourses.title')}
          </h1>
          <div className="hidden md:flex items-center text-[13px] font-medium text-slate-500 gap-1.5">
            <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">{t('myCourses.breadcrumb1')}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900">{t('myCourses.breadcrumb2')}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto mt-4 xl:mt-0">
          <div className="relative w-full sm:w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('myCourses.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-medium placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
            />
          </div>
          <button className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm shrink-0">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              {t('myCourses.allStatus')}
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      <MyCoursesStats t={t} />

      <div className="mt-8 lg:mt-10 mb-6">
        <h2 className="text-[18px] lg:text-[20px] font-bold text-slate-900 mb-6">
          {t('myCourses.purchasedTitle')}
        </h2>
        <PurchasedCourses t={t} searchQuery={searchQuery} />
      </div>

      <div className="mt-4 mb-10">
        <CourseDetailsTable t={t} searchQuery={searchQuery} />
      </div>
    </div>
  );
}
