import React, { useState } from 'react';
import {
  FileText, Headphones, Calendar, ChevronRight,
  ChevronDown, BookOpen, ChevronsUpDown, Info, Play, Pause,
  Download, CheckCircle2, Sparkles, Loader2, AlertCircle, Image as ImageIcon,
  GraduationCap
} from 'lucide-react';
import EBookReaderModal from './EBookReaderModal';
import ListenToAudioModal from './ListenToAudioModal';

// Helper to remove raw HTML tags from DB description
const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
};

export default function PackageCourseView({
  packages = [],
  ebooks = [],
  selectedPackageId: propPackageId,
  onSelectPackage: propOnSelectPackage,
  onOpenReader,
  loading = false
}) {
  const [internalSelectedPackageId, setInternalSelectedPackageId] = useState(1);
  const selectedPackageId = propPackageId !== undefined ? propPackageId : internalSelectedPackageId;
  const setSelectedPackageId = propOnSelectPackage || setInternalSelectedPackageId;

  const [expandedItems, setExpandedItems] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);
  const [mobileTab, setMobileTab] = useState('detail'); // 'list' or 'detail'

  // Modals state
  const [activeEBook, setActiveEBook] = useState(null);
  const [activeAudioModalItem, setActiveAudioModalItem] = useState(null);

  // Directly map packages strictly from DB
  const displayPackages = (packages || []).map(p => {
    const packageCourses = (p.courses && p.courses.length > 0)
      ? p.courses
      : (p.content && p.content.length > 0 ? p.content : []);

    const coverImage = (p.coverImagePath && typeof p.coverImagePath === 'string' && p.coverImagePath.trim() !== '') 
      ? p.coverImagePath 
      : null;

    return {
      ...p,
      tag: p.tag || p.name || `Package ${p.id || p.packageId || 'N/A'}`,
      title: p.title || p.name || 'N/A',
      description: stripHtml(p.description) || 'N/A',
      coverImagePath: coverImage,
      coursesCount: p.coursesCount ?? packageCourses.length,
      ebooksCount: p.ebooksCount ?? 0,
      audioCount: p.audioCount ?? 0,
      purchasedDate: p.purchasedDate || 'N/A',
      statusLabel: p.statusLabel || 'N/A',
      statusColor: p.statusColor || 'bg-slate-100 text-slate-500 border-slate-200/60',
      courses: packageCourses,
      content: packageCourses
    };
  });

  const activePackage = displayPackages.find(
    (p) => p.id === selectedPackageId || p.packageId === selectedPackageId
  ) || displayPackages[0];

  // Toggle individual item
  const toggleItem = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Toggle expand / collapse all
  const handleToggleExpandAll = () => {
    if (allExpanded) {
      setExpandedItems({});
      setAllExpanded(false);
    } else {
      const allOpen = {};
      activePackage?.courses?.forEach((item) => {
        allOpen[item.id || item.courseId] = true;
      });
      setExpandedItems(allOpen);
      setAllExpanded(true);
    }
  };

  // Select package handler
  const handleSelectPackage = (pkgId) => {
    setSelectedPackageId(pkgId);
    setExpandedItems({});
    setAllExpanded(false);
    setMobileTab('detail');
  };

  if (loading && displayPackages.length === 0) {
    return (
      <div className="w-full flex items-center justify-center min-h-[350px]">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <span className="text-[13px] font-semibold">Loading courses from database...</span>
        </div>
      </div>
    );
  }

  // If no packages are unlocked for the user
  if (!loading && displayPackages.length === 0) {
    return (
      <div className="w-full bg-white border border-slate-200/90 rounded-[22px] sm:rounded-[26px] p-6 sm:p-12 flex flex-col items-center justify-center text-center shadow-xs">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-4">
          <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <h3 className="text-[18px] sm:text-[20px] font-black text-slate-900 mb-1">
          No Course Packages Found
        </h3>
        <p className="text-[13px] sm:text-[13.5px] text-slate-500 font-medium max-w-md mb-6 leading-relaxed">
          No course packages have been unlocked for your account yet. Once you purchase or activate a course package, its courses, eBooks, and audio lessons will appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6 pb-2 sm:pb-4 max-w-full overflow-hidden">

      {/* Mobile Tab Switcher (< 1024px) */}
      <div className="flex lg:hidden bg-slate-100 p-1 rounded-2xl w-full border border-slate-200/60 shadow-inner">
        <button
          onClick={() => setMobileTab('list')}
          className={`flex-1 py-2 sm:py-2.5 text-[12px] sm:text-[13px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 min-w-0 ${
            mobileTab === 'list'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>📦 Packages</span>
          <span className="text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-extrabold shrink-0">
            {displayPackages.length}
          </span>
        </button>
        <button
          onClick={() => setMobileTab('detail')}
          className={`flex-1 py-2 sm:py-2.5 text-[12px] sm:text-[13px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 min-w-0 ${
            mobileTab === 'detail'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="truncate">🎓 {activePackage?.tag || 'Course Details'}</span>
        </button>
      </div>

      {/* Main Grid: Master (Left) and Detail (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start max-w-full">

        {/* ================= LEFT PANEL: PURCHASED PACKAGES ================= */}
        <div
          className={`lg:col-span-5 xl:col-span-4 flex flex-col gap-3.5 sm:gap-4 max-w-full ${
            mobileTab === 'detail' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <div className="flex items-center justify-between px-1 mb-0.5">
            <h2 className="text-[18px] sm:text-[20px] font-bold text-slate-900">
              Purchased Packages
            </h2>
            <span className="text-[11px] sm:text-[12px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              {displayPackages.length} Available
            </span>
          </div>

          <div className="flex flex-col gap-3.5">
            {displayPackages.map((pkg) => {
              const isSelected = pkg.id === selectedPackageId || pkg.packageId === selectedPackageId;

              return (
                <div
                  key={pkg.id || pkg.packageId}
                  onClick={() => handleSelectPackage(pkg.id || pkg.packageId)}
                  className={`bg-white rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer relative overflow-hidden transition-all duration-300 group ${
                    isSelected
                      ? 'border-2 border-indigo-400 shadow-md shadow-indigo-100/70 ring-2 ring-indigo-100/50'
                      : 'border border-slate-200/90 shadow-xs hover:border-indigo-200 hover:shadow-md'
                  }`}
                >
                  {/* Subtle active background glow */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/60 rounded-full blur-2xl pointer-events-none -z-0" />
                  )}

                  {/* Left: Dynamic 3D Book Thumbnail Cover / Placeholder */}
                  <div className="w-[64px] h-[86px] sm:w-[84px] sm:h-[110px] rounded-xl overflow-hidden shadow-xs shrink-0 relative bg-linear-to-br from-slate-50 to-indigo-50/40 border border-slate-200/70 flex flex-col items-center justify-center p-2 text-center group-hover:scale-102 transition-transform duration-300 z-10">
                    {pkg.coverImagePath ? (
                      <img
                        src={pkg.coverImagePath}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1 text-slate-400">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                        <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-700 line-clamp-2 leading-tight">
                          {pkg.title}
                        </span>
                        <span className="text-[7.5px] sm:text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                          Cover: N/A
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Middle: Details */}
                  <div className="flex-1 flex flex-col min-w-0 z-10">
                    <span
                      className={`text-[11px] sm:text-[12px] font-bold mb-0.5 ${
                        isSelected ? 'text-indigo-600' : 'text-slate-800'
                      }`}
                    >
                      {pkg.tag}
                    </span>
                    <h3 className="text-[13.5px] sm:text-[16px] font-extrabold text-slate-900 leading-snug truncate mb-1.5 sm:mb-2">
                      {pkg.title}
                    </h3>

                    {/* Stats Icons: Courses, EBooks, Audio */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10.5px] sm:text-[12px] font-semibold text-slate-500 mb-2">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{pkg.coursesCount} Courses</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{pkg.ebooksCount} EBooks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Headphones className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                        <span>{pkg.audioCount} Audio</span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[9.5px] sm:text-[11px] font-bold border inline-flex items-center ${pkg.statusColor}`}
                      >
                        {pkg.statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Right: Circular Arrow Action */}
                  <div className="shrink-0 z-10">
                    <div
                      className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs sm:shadow-sm shadow-indigo-400'
                          : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                      }`}
                    >
                      <ChevronRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT PANEL: PACKAGE CONTENT & DETAIL ================= */}
        <div
          className={`lg:col-span-7 xl:col-span-8 bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] p-4 sm:p-7 lg:p-8 shadow-sm flex flex-col gap-4 sm:gap-6 relative max-w-full overflow-hidden ${
            mobileTab === 'list' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Package Header Row */}
          <div className="flex flex-row items-start justify-between gap-3 sm:gap-6">
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[11px] sm:text-[12px] font-bold text-indigo-600 uppercase tracking-wider mb-0.5">
                {activePackage?.tag || 'Package'}
              </span>
              <h2 className="text-[18px] sm:text-[26px] font-black text-slate-900 tracking-tight leading-snug">
                {activePackage?.title || 'N/A'}
              </h2>
              <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-medium leading-relaxed mt-1.5 max-w-xl line-clamp-3 sm:line-clamp-none">
                {activePackage?.description || 'N/A'}
              </p>
            </div>

            {/* Right: Dynamic Book Artwork Mockup / Placeholder */}
            <div className="w-[68px] h-[92px] sm:w-[130px] sm:h-[185px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xs sm:shadow-md border border-slate-200/80 relative shrink-0 group bg-linear-to-br from-slate-50 to-indigo-50/40 flex items-center justify-center p-2 sm:p-3 text-center">
              {activePackage?.coverImagePath ? (
                <>
                  <img
                    src={activePackage.coverImagePath}
                    alt={activePackage.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 text-slate-400">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[9px] sm:text-[12px] font-bold text-slate-700 leading-tight line-clamp-1">
                    {activePackage?.title || 'Package'}
                  </span>
                  <span className="text-[7.5px] sm:text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                    Cover: N/A
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Overview Stat Badges Card: 4 Responsive Individual Cards (No Divide Bugs) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-2 sm:p-3 bg-slate-50/80 border border-slate-200/80 rounded-2xl">
            {/* Courses Stat */}
            <div className="bg-white border border-slate-200/60 rounded-xl p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 shadow-2xs min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] sm:text-[17px] font-black text-slate-900 leading-tight">
                  {activePackage?.coursesCount ?? activePackage?.courses?.length ?? 0}
                </span>
                <span className="text-[10px] sm:text-[11.5px] font-semibold text-slate-500 truncate">
                  Courses
                </span>
              </div>
            </div>

            {/* eBooks Stat */}
            <div className="bg-white border border-slate-200/60 rounded-xl p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 shadow-2xs min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] sm:text-[17px] font-black text-slate-900 leading-tight">
                  {activePackage?.ebooksCount ?? 0}
                </span>
                <span className="text-[10px] sm:text-[11.5px] font-semibold text-slate-500 truncate">
                  EBooks
                </span>
              </div>
            </div>

            {/* Audio Files Stat */}
            <div className="bg-white border border-slate-200/60 rounded-xl p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 shadow-2xs min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] sm:text-[17px] font-black text-slate-900 leading-tight">
                  {activePackage?.audioCount ?? 0}
                </span>
                <span className="text-[10px] sm:text-[11.5px] font-semibold text-slate-500 truncate">
                  Audio Files
                </span>
              </div>
            </div>

            {/* Purchased Date Stat */}
            <div className="bg-white border border-slate-200/60 rounded-xl p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 shadow-2xs min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] sm:text-[10.5px] font-semibold text-slate-400 truncate">
                  Purchased
                </span>
                <span className="text-[11px] sm:text-[13px] font-bold text-slate-800 truncate">
                  {activePackage?.purchasedDate || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Course Content Accordions Section */}
          <div className="flex flex-col gap-3 sm:gap-4 mt-1">
            {/* Header: Course Content and Expand All */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <h3 className="text-[16px] sm:text-[19px] font-black text-slate-900">
                  Courses & Study Materials
                </h3>
                <p className="text-[11.5px] sm:text-[12.5px] text-slate-500 font-medium">
                  Select a course to view its curriculum and study materials.
                </p>
              </div>
              {activePackage?.courses?.length > 0 && (
                <button
                  onClick={handleToggleExpandAll}
                  className="self-start sm:self-auto border border-indigo-200 text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-xl text-[11px] sm:text-[12px] font-bold flex items-center gap-1.5 transition-colors shadow-2xs active:scale-95 cursor-pointer shrink-0"
                >
                  <ChevronsUpDown className="w-3.5 h-3.5" />
                  <span>{allExpanded ? 'Collapse All' : 'Expand All'}</span>
                </button>
              )}
            </div>

            {/* If package has NO courses in DB */}
            {(!activePackage?.courses || activePackage.courses.length === 0) ? (
              <div className="p-6 sm:p-8 border border-slate-200/80 rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center text-center gap-2">
                <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-slate-300" />
                <span className="text-[13px] sm:text-[14px] font-bold text-slate-700">
                  No Courses Configured (N/A)
                </span>
                <p className="text-[11.5px] sm:text-[12px] text-slate-400 max-w-sm">
                  There are currently no courses configured for this package in the database.
                </p>
              </div>
            ) : (
              /* Courses List */
              <div className="flex flex-col gap-2.5 sm:gap-3.5">
                {activePackage.courses.map((course) => {
                  const courseKey = course.id || course.courseId;
                  const isExpanded = !!expandedItems[courseKey];
                  const hasEBooks = course.ebooks && course.ebooks.length > 0;

                  return (
                    <div
                      key={courseKey}
                      className="border border-slate-200/90 rounded-2xl bg-white transition-all duration-200 shadow-xs hover:border-indigo-200 overflow-hidden"
                    >
                      {/* Course Header Row */}
                      <div 
                        onClick={() => toggleItem(courseKey)}
                        className="p-3 sm:p-4.5 flex items-center justify-between gap-2.5 sm:gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                      >
                        {/* Left: Icon & Course Details */}
                        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10.5px] sm:text-[11.5px] font-bold text-indigo-600 mb-0.5">
                              {course.number || `Course ${course.courseId}`}
                            </span>
                            <h4 className="text-[13.5px] sm:text-[15.5px] font-extrabold text-slate-900 leading-tight truncate">
                              {course.title || course.name || 'N/A'}
                            </h4>
                            <p className="text-[11px] sm:text-[12.5px] font-medium text-slate-500 line-clamp-1 mt-0.5">
                              {course.description || course.summary || 'N/A'}
                            </p>
                          </div>
                        </div>

                        {/* Right: EBooks count badge & expand chevron */}
                        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                          <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold border ${
                            hasEBooks 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70' 
                              : 'bg-slate-100 text-slate-500 border-slate-200/60'
                          }`}>
                            {course.ebooks?.length ?? 0} {course.ebooks?.length === 1 ? 'EBook' : 'EBooks'}
                          </span>
                          <div className="p-1 text-slate-400">
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-indigo-600' : ''
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Course Expandable Drawer: Shows Course EBooks */}
                      {isExpanded && (
                        <div className="px-3.5 sm:px-6 pb-4 sm:pb-5 pt-2 border-t border-slate-100 bg-slate-50/40 flex flex-col gap-3 animate-fade-in">
                          {/* Course Description */}
                          <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200/70 text-[11.5px] sm:text-[12.5px] text-slate-600 leading-relaxed font-medium">
                            <span className="font-bold text-slate-800">Course Overview: </span>
                            {course.description || course.summary || 'N/A'}
                          </div>

                          {/* EBooks List under this Course */}
                          <div className="flex flex-col gap-2 sm:gap-2.5">
                            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              Course EBooks & Modules ({course.ebooks?.length ?? 0})
                            </span>

                            {!hasEBooks ? (
                              <div className="p-4 border border-dashed border-slate-200 rounded-xl bg-white text-center flex flex-col items-center justify-center gap-1.5 text-slate-400">
                                <FileText className="w-5 h-5 text-slate-300" />
                                <span className="text-[11.5px] sm:text-[12px] font-bold text-slate-600">
                                  No EBooks Published for this Course (N/A)
                                </span>
                                <p className="text-[10.5px] sm:text-[11px] text-slate-400 max-w-sm">
                                  There are currently no eBooks or study materials published under "{course.title}" in the database.
                                </p>
                              </div>
                            ) : (
                              course.ebooks.map((ebook) => {
                                return (
                                  <div
                                    key={ebook.id || ebook.ebookId}
                                    className="border border-slate-200/80 rounded-xl bg-white p-3 sm:p-4 flex flex-col gap-2.5 shadow-2xs hover:border-indigo-200 transition-all"
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                      {/* Left: EBook Title */}
                                      <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                          <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                          <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700">
                                            {ebook.number || 'EBook 1'}
                                          </span>
                                          <h5 className="text-[12.5px] sm:text-[13.5px] font-bold text-slate-900 leading-tight truncate">
                                            {ebook.title || 'N/A'}
                                          </h5>
                                        </div>
                                      </div>

                                      {/* Right: Actions */}
                                      <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <button
                                          onClick={() => {
                                            if (onOpenReader) {
                                              onOpenReader(ebook, false);
                                            } else {
                                              setActiveEBook(ebook);
                                            }
                                          }}
                                          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 rounded-xl text-[11.5px] sm:text-[12px] font-bold transition-all active:scale-95 cursor-pointer"
                                        >
                                          <BookOpen className="w-3.5 h-3.5" />
                                          <span>Read EBook</span>
                                        </button>

                                        <button
                                          onClick={() => setActiveAudioModalItem(ebook)}
                                          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 border border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-xl text-[11.5px] sm:text-[12px] font-bold transition-all active:scale-95 cursor-pointer"
                                        >
                                          <Headphones className="w-3.5 h-3.5" />
                                          <span>Play Audio</span>
                                        </button>
                                      </div>
                                    </div>

                                    {/* EBook Metadata: Duration, Length, Download */}
                                    <div className="flex flex-wrap items-center justify-between text-[10.5px] sm:text-[11.5px] pt-2 border-t border-slate-100 text-slate-500 gap-1.5">
                                      <span>
                                        Duration: <strong className="text-slate-700">{ebook.duration || 'N/A'}</strong> • Length: <strong className="text-slate-700">{ebook.pages || 'N/A'}</strong>
                                      </span>
                                      <button
                                        onClick={() => {
                                          if (ebook.pdfFilePath) {
                                            window.open(ebook.pdfFilePath, '_blank');
                                          } else {
                                            alert(`Offline PDF: N/A for "${ebook.title || 'this eBook'}".`);
                                          }
                                        }}
                                        className="text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                                      >
                                        <Download className="w-3 h-3" />
                                        <span>Download PDF</span>
                                      </button>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Help Notice Banner */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3 text-indigo-900 shadow-2xs mt-1">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <p className="text-[11.5px] sm:text-[13px] font-semibold text-indigo-950">
              Each course in your package contains dedicated study materials and interactive eBooks you can read and listen to anytime.
            </p>
          </div>

        </div>

      </div>

      {/* Interactive EBook Reader Modal */}
      <EBookReaderModal
        isOpen={!!activeEBook}
        onClose={() => setActiveEBook(null)}
        item={activeEBook}
        packageData={activePackage}
      />

      {/* Interactive Listen to Audio Modal */}
      <ListenToAudioModal
        isOpen={!!activeAudioModalItem}
        onClose={() => setActiveAudioModalItem(null)}
        chapterNumber={activeAudioModalItem?.number ? activeAudioModalItem.number.replace(/\D/g, '').padStart(2, '0') : "N/A"}
        chapterTitle={activeAudioModalItem?.chapters?.[0]?.replace(/^\d+\.\s*/, '') || activeAudioModalItem?.title || "N/A"}
        chapterDesc={activeAudioModalItem?.summary || "N/A"}
        audioUrlPath={activeAudioModalItem?.audioUrlPath || null}
        audioDurationSeconds={activeAudioModalItem?.audioDurationSeconds || 0}
      />

    </div>
  );
}
