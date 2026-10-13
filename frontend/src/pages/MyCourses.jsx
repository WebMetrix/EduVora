import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import PackageCourseView, { PACKAGES_DATA } from '../components/courses/PackageCourseView';
import EBookReaderView from '../components/courses/EBookReaderView';

export default function MyCourses() {
  const { t } = useTranslation();
  const [selectedPackageId, setSelectedPackageId] = useState(1);
  const [readerState, setReaderState] = useState(null); // { ebook: item, initialShowAudio: boolean }

  const activePackage = PACKAGES_DATA.find((p) => p.id === selectedPackageId) || PACKAGES_DATA[0];

  return (
    <div className="flex flex-col min-h-full pb-0 lg:pb-6">
      {/* Header & Breadcrumbs Section */}
      <div className="flex flex-col gap-1 mb-6">
        {readerState ? (
          <div>
            {/* Standard EduVora Breadcrumbs */}
            <div className="flex items-center text-[12px] sm:text-[13px] font-medium text-slate-500 gap-1.5 mb-2 overflow-x-auto no-scrollbar whitespace-nowrap">
              <Link to="/dashboard" className="hover:text-indigo-600 transition-colors shrink-0">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
              <button
                onClick={() => setReaderState(null)}
                className="hover:text-indigo-600 transition-colors shrink-0"
              >
                My Courses
              </button>
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
              <button
                onClick={() => setReaderState(null)}
                className="hover:text-indigo-600 transition-colors shrink-0"
              >
                {activePackage?.tag || 'Package 1'}
              </button>
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
              <span className="text-slate-900 font-semibold shrink-0">
                {readerState.ebook?.number || 'EBook 1'}
              </span>
            </div>

            {/* Title & Back to Package button (Image 3) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1">
              <h1 className="text-[20px] sm:text-[24px] lg:text-[26px] font-black text-[#1a1446] tracking-tight">
                {readerState.ebook?.number || 'EBook 1'}: {readerState.ebook?.title || 'Introduction to Financial Freedom'}
              </h1>
              <button
                onClick={() => setReaderState(null)}
                className="flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50 rounded-xl text-[12px] sm:text-[13px] font-bold shadow-xs transition-all active:scale-95 shrink-0 w-full sm:w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Package</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center text-[13px] font-medium text-slate-500 gap-1.5 mb-2">
              <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-semibold">
                My Courses
              </span>
            </div>
            <h1 className="text-[24px] lg:text-[28px] font-bold text-[#1a1446] mb-1">
              My Courses
            </h1>
            <p className="text-[14px] text-slate-500 font-medium">
              Track your packages, read eBooks, and listen to audio masterclasses.
            </p>
          </div>
        )}
      </div>

      {/* Main Views */}
      {readerState ? (
        <EBookReaderView
          packageData={activePackage}
          ebookData={readerState.ebook}
          initialShowAudio={readerState.initialShowAudio}
          onBack={() => setReaderState(null)}
        />
      ) : (
        <PackageCourseView
          selectedPackageId={selectedPackageId}
          onSelectPackage={setSelectedPackageId}
          onOpenReader={(ebook, initialShowAudio) => {
            setReaderState({ ebook, initialShowAudio });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
}
