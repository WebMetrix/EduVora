import React, { useState } from 'react';
import {
  FileText, Headphones, Calendar, ArrowLeft, ChevronRight,
  ChevronDown, BookOpen, ChevronsUpDown, Info, Play, Pause,
  Download, CheckCircle2, Sparkles, Loader2, AlertCircle, Image as ImageIcon
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
    const packageEBooks = p.content && p.content.length > 0 
      ? p.content 
      : ebooks.filter(eb => eb.packageId === p.id || eb.packageId === p.packageId);

    // Dynamic cover image: strictly use coverImagePath from DB, null if not present in DB
    const coverImage = (p.coverImagePath && typeof p.coverImagePath === 'string' && p.coverImagePath.trim() !== '') 
      ? p.coverImagePath 
      : null;

    return {
      ...p,
      tag: p.tag || p.name || `Package ${p.id || p.packageId || 'N/A'}`,
      title: p.title || p.name || 'N/A',
      description: stripHtml(p.description) || 'N/A',
      coverImagePath: coverImage,
      ebooksCount: p.ebooksCount ?? packageEBooks.length,
      audioCount: p.audioCount ?? 0,
      purchasedDate: p.purchasedDate || 'N/A',
      statusLabel: p.statusLabel || 'N/A',
      statusColor: p.statusColor || 'bg-slate-100 text-slate-500 border-slate-200/60',
      content: packageEBooks
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
      activePackage?.content?.forEach((item) => {
        allOpen[item.id] = true;
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
      <div className="w-full bg-white border border-slate-200/90 rounded-[26px] p-8 sm:p-12 flex flex-col items-center justify-center text-center shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="text-[20px] font-black text-slate-900 mb-1">
          No Course Packages Found
        </h3>
        <p className="text-[13.5px] text-slate-500 font-medium max-w-md mb-6 leading-relaxed">
          No course packages have been unlocked for your account yet. Once you purchase or activate a course package, its eBooks, chapters, and audio lessons will appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">

      {/* Mobile Tab Switcher (< 1024px) */}
      <div className="flex lg:hidden bg-slate-100 p-1 rounded-2xl w-full border border-slate-200/60 shadow-inner">
        <button
          onClick={() => setMobileTab('list')}
          className={`flex-1 py-2.5 text-[13px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'list'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>📦 Packages</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-extrabold">
            {displayPackages.length}
          </span>
        </button>
        <button
          onClick={() => setMobileTab('detail')}
          className={`flex-1 py-2.5 text-[13px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'detail'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>📖 {activePackage?.tag || 'Package'} Content</span>
        </button>
      </div>

      {/* Main Grid: Master (Left) and Detail (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ================= LEFT PANEL: PURCHASED PACKAGES ================= */}
        <div
          className={`lg:col-span-5 xl:col-span-4 flex flex-col gap-4 ${
            mobileTab === 'detail' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[20px] font-bold text-slate-900">
              Purchased Packages
            </h2>
            <span className="text-[12px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
              {displayPackages.length} Available
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {displayPackages.map((pkg) => {
              const isSelected = pkg.id === selectedPackageId || pkg.packageId === selectedPackageId;

              return (
                <div
                  key={pkg.id || pkg.packageId}
                  onClick={() => handleSelectPackage(pkg.id || pkg.packageId)}
                  className={`bg-white rounded-[22px] p-4 sm:p-5 flex items-center justify-between gap-3.5 sm:gap-4 cursor-pointer relative overflow-hidden transition-all duration-300 group ${
                    isSelected
                      ? 'border-2 border-indigo-400 shadow-md shadow-indigo-100/70 ring-2 ring-indigo-100/50'
                      : 'border border-slate-200/90 shadow-sm hover:border-indigo-200 hover:shadow-md'
                  }`}
                >
                  {/* Subtle active background glow */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/60 rounded-full blur-2xl pointer-events-none -z-0" />
                  )}

                  {/* Left: Dynamic 3D Book Thumbnail Cover / Placeholder */}
                  <div className="w-[72px] h-[96px] sm:w-[84px] sm:h-[110px] rounded-xl overflow-hidden shadow-xs shrink-0 relative bg-linear-to-br from-slate-50 to-indigo-50/40 border border-slate-200/70 flex flex-col items-center justify-center p-2 text-center group-hover:scale-102 transition-transform duration-300 z-10">
                    {pkg.coverImagePath ? (
                      <img
                        src={pkg.coverImagePath}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1 text-slate-400">
                        <BookOpen className="w-5 h-5 text-indigo-400" />
                        <span className="text-[10px] font-extrabold text-slate-700 line-clamp-2 leading-tight">
                          {pkg.title}
                        </span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                          Cover: N/A
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Middle: Details */}
                  <div className="flex-1 flex flex-col min-w-0 z-10">
                    <span
                      className={`text-[12px] font-bold mb-0.5 ${
                        isSelected ? 'text-indigo-600' : 'text-slate-800'
                      }`}
                    >
                      {pkg.tag}
                    </span>
                    <h3 className="text-[14px] sm:text-[16px] font-extrabold text-slate-900 leading-snug truncate mb-2">
                      {pkg.title}
                    </h3>

                    {/* Stats Icons */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3.5 text-[11px] sm:text-[12px] font-semibold text-slate-500 mb-2">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{pkg.ebooksCount} EBooks</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Headphones className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{pkg.audioCount} Audio Files</span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div>
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold border inline-flex items-center ${pkg.statusColor}`}
                      >
                        {pkg.statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Right: Circular Arrow Action */}
                  <div className="shrink-0 z-10">
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-400'
                          : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT PANEL: PACKAGE CONTENT & DETAIL ================= */}
        <div
          className={`lg:col-span-7 xl:col-span-8 bg-white border border-slate-200/80 rounded-[26px] p-4 sm:p-7 lg:p-8 shadow-sm flex flex-col gap-5 sm:gap-6 relative ${
            mobileTab === 'list' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Top Bar: Back to Packages Link & Mobile Package Switcher */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setMobileTab('list')}
              className="flex items-center gap-2 text-[13px] sm:text-[14px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors w-fit group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Packages</span>
            </button>

            {/* Quick Switcher for Mobile */}
            <div className="flex lg:hidden items-center gap-1.5">
              {displayPackages.map((p) => (
                <button
                  key={p.id || p.packageId}
                  onClick={() => setSelectedPackageId(p.id || p.packageId)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    (p.id || p.packageId) === selectedPackageId
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p.tag}
                </button>
              ))}
            </div>
          </div>

          {/* Package Header Row */}
          <div className="flex flex-row items-start justify-between gap-4 sm:gap-6">
            {/* Left Header info */}
            <div className="flex flex-col flex-1 min-w-0">
              <h2 className="text-[22px] sm:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
                {activePackage?.tag || 'N/A'}
              </h2>
              <h3 className="text-[15px] sm:text-[19px] font-bold text-slate-700 mt-0.5">
                {activePackage?.title || 'N/A'}
              </h3>
              <p className="text-[12px] sm:text-[14px] text-slate-500 font-medium leading-relaxed mt-2 max-w-xl">
                {activePackage?.description || 'N/A'}
              </p>
            </div>

            {/* Right: Dynamic Book Artwork Mockup / Placeholder */}
            <div className="w-[84px] h-[118px] sm:w-[130px] sm:h-[185px] rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-slate-200/80 relative shrink-0 group bg-linear-to-br from-slate-50 to-indigo-50/40 flex items-center justify-center p-3 text-center">
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
                <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-bold text-slate-700 leading-tight">
                    {activePackage?.title || 'Package'}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                    Cover: N/A
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Overview Stat Badges Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-4 grid grid-cols-3 divide-x divide-slate-100 shadow-2xs">
            {/* eBooks Stat */}
            <div className="flex items-center gap-1.5 sm:gap-3.5 px-1.5 sm:px-3">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <FileText className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] sm:text-[18px] font-black text-slate-900 leading-tight">
                  {activePackage?.ebooksCount ?? 0}
                </span>
                <span className="text-[10px] sm:text-[12px] font-semibold text-slate-500 truncate">
                  EBooks
                </span>
              </div>
            </div>

            {/* Audio Files Stat */}
            <div className="flex items-center gap-1.5 sm:gap-3.5 px-1.5 sm:px-3">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Headphones className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] sm:text-[18px] font-black text-slate-900 leading-tight">
                  {activePackage?.audioCount ?? 0}
                </span>
                <span className="text-[10px] sm:text-[12px] font-semibold text-slate-500 truncate">
                  Audio Files
                </span>
              </div>
            </div>

            {/* Purchased Date Stat */}
            <div className="flex items-center gap-1.5 sm:gap-3.5 px-1.5 sm:px-3">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                <Calendar className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] sm:text-[11px] font-semibold text-slate-400 truncate">
                  Purchased
                </span>
                <span className="text-[10px] sm:text-[13px] font-bold text-slate-800 truncate">
                  {activePackage?.purchasedDate || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Course Content Accordions Section */}
          <div className="flex flex-col gap-3.5 sm:gap-4 mt-1">
            {/* Header: Course Content and Expand All */}
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] sm:text-[20px] font-black text-slate-900">
                Course Content
              </h3>
              {activePackage?.content?.length > 0 && (
                <button
                  onClick={handleToggleExpandAll}
                  className="border border-indigo-200 text-indigo-600 hover:bg-indigo-50 px-3 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-[12px] font-bold flex items-center gap-1.5 transition-colors shadow-sm active:scale-95 cursor-pointer"
                >
                  <ChevronsUpDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{allExpanded ? 'Collapse All' : 'Expand All'}</span>
                </button>
              )}
            </div>

            {/* If package has NO eBooks in DB */}
            {(!activePackage?.content || activePackage.content.length === 0) ? (
              <div className="p-8 border border-slate-200/80 rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center text-center gap-2">
                <FileText className="w-8 h-8 text-slate-300" />
                <span className="text-[14px] font-bold text-slate-700">
                  No EBooks Available (N/A)
                </span>
                <p className="text-[12px] text-slate-400 max-w-sm">
                  There are currently no eBooks or learning modules configured for this package in the database.
                </p>
              </div>
            ) : (
              /* Accordion List */
              <div className="flex flex-col gap-3">
                {activePackage.content.map((item) => {
                  const isExpanded = !!expandedItems[item.id];
                  const hasChapters = item.chapters && item.chapters.length > 0;

                  return (
                    <div
                      key={item.id}
                      className="border border-slate-200/90 rounded-2xl bg-white transition-all duration-200 shadow-sm hover:border-indigo-200 overflow-hidden"
                    >
                      {/* Collapsed Header / Action Row */}
                      <div className="p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">

                        {/* Left: Icon & Title */}
                        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <h4 className="text-[13px] sm:text-[15px] font-extrabold text-slate-900 leading-tight">
                              {item.number || 'N/A'}
                            </h4>
                            <p className="text-[12px] sm:text-[13px] font-medium text-slate-500 truncate">
                              {item.title || 'N/A'}
                            </p>
                          </div>
                        </div>

                        {/* Right: Action Buttons & Accordion Chevron */}
                        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-2.5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                          {/* Read EBook Button */}
                          <button
                            onClick={() => {
                              if (onOpenReader) {
                                onOpenReader(item, false);
                              } else {
                                setActiveEBook(item);
                              }
                            }}
                            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 rounded-xl text-[12px] sm:text-[13px] font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>Read EBook</span>
                          </button>

                          {/* Play Audio Button */}
                          <button
                            onClick={() => setActiveAudioModalItem(item)}
                            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl text-[12px] sm:text-[13px] font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                          >
                            <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>Play Audio</span>
                          </button>

                          {/* Chevron Down toggle */}
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all shrink-0 cursor-pointer"
                            aria-label="Toggle details"
                          >
                            <ChevronDown
                              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-indigo-600' : ''
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Accordion Drawer */}
                      {isExpanded && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl flex flex-col gap-4 animate-fade-in">
                          {/* Summary & Details */}
                          <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                            {item.summary || 'N/A'}
                          </p>

                          {/* Chapter Breakdown */}
                          <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 flex flex-col gap-2">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              Curriculum Breakdown
                            </span>
                            {hasChapters ? (
                              <div className="flex flex-col gap-1.5">
                                {item.chapters.map((chap, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-2 text-[12px] font-semibold text-slate-700"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                    <span>{chap}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-[12px] text-slate-400 italic font-medium">
                                Curriculum breakdown: N/A - No chapters added yet.
                              </span>
                            )}
                          </div>

                          {/* Quick Actions Drawer */}
                          <div className="flex items-center justify-between text-[12px]">
                            <span className="text-slate-500 font-medium">
                              Duration: <span className="font-bold text-slate-700">{item.duration || 'N/A'}</span> • Length: <span className="font-bold text-slate-700">{item.pages || 'N/A'}</span>
                            </span>
                            <button
                              onClick={() => {
                                if (item.pdfFilePath) {
                                  window.open(item.pdfFilePath, '_blank');
                                } else {
                                  alert(`Offline PDF: N/A for "${item.title || 'this eBook'}".`);
                                }
                              }}
                              className="text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download Offline</span>
                            </button>
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
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 flex items-center gap-3 text-indigo-900 shadow-sm mt-2">
            <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <p className="text-[13px] font-semibold text-indigo-950">
              You can download the eBooks and listen to audio anytime, anywhere.
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
