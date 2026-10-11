import React, { useState } from 'react';
import {
  FileText, Headphones, Calendar, ArrowLeft, ChevronRight,
  ChevronDown, BookOpen, ChevronsUpDown, Info, Play, Pause,
  Download, CheckCircle2, Sparkles
} from 'lucide-react';
import financialFreedomImg from '../../assets/images/financial_freedom.jpg';
import successMindsetImg from '../../assets/images/success_mindset.jpg';
import EBookReaderModal from './EBookReaderModal';
import AudioPlayerModal from './AudioPlayerModal';

export const PACKAGES_DATA = [
  {
    id: 1,
    tag: "Package 1",
    title: "Financial Freedom Blueprint",
    description: "Learn the proven strategies to manage money, invest wisely and achieve financial independence.",
    image: financialFreedomImg,
    ebooksCount: 3,
    audioCount: 3,
    purchasedDate: "15 May 2025",
    status: "inProgress",
    statusLabel: "In Progress",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    content: [
      {
        id: "ff-1",
        number: "EBook 1",
        title: "Introduction to Financial Freedom",
        duration: "18m audio",
        pages: "42 pages",
        summary: "Understand the fundamental mindset shifts, budgeting systems, and foundational rules of money to start your journey towards financial independence.",
        chapters: [
          "1. What True Financial Freedom Means",
          "2. Escaping the Debt Cycle & Rat Race",
          "3. The 50/30/20 Wealth Allocation Blueprint"
        ]
      },
      {
        id: "ff-2",
        number: "EBook 2",
        title: "Smart Investing Strategies",
        duration: "24m audio",
        pages: "58 pages",
        summary: "Discover proven asset allocation techniques, compounding growth engines, and smart index investing for resilient long-term capital.",
        chapters: [
          "1. Understanding Risk vs. Reward",
          "2. Compounding: The 8th Wonder of the World",
          "3. Building an Automated Investment Portfolio"
        ]
      },
      {
        id: "ff-3",
        number: "EBook 3",
        title: "Wealth Creation & Passive Income",
        duration: "31m audio",
        pages: "64 pages",
        summary: "Actionable frameworks to generate scalable passive income streams, monetize digital skills, and protect your multi-generational wealth.",
        chapters: [
          "1. Identifying Scalable Income Channels",
          "2. Systems for Hands-Free Revenue",
          "3. Tax Optimization & Asset Protection"
        ]
      }
    ]
  },
  {
    id: 2,
    tag: "Package 2",
    title: "Success Mindset Mastery",
    description: "Rewire your psychology for unwavering resilience, laser focus, high productivity, and elite performance in life and business.",
    image: successMindsetImg,
    ebooksCount: 4,
    audioCount: 4,
    purchasedDate: "02 June 2025",
    status: "notStarted",
    statusLabel: "Not Started",
    statusColor: "bg-slate-100 text-slate-500 border-slate-200/60",
    content: [
      {
        id: "sm-1",
        number: "EBook 1",
        title: "Foundations of a Growth Mindset",
        duration: "22m audio",
        pages: "48 pages",
        summary: "Break through self-limiting beliefs, overcome the fear of failure, and adopt the mental models shared by top 1% performers worldwide.",
        chapters: [
          "1. Fixed vs. Growth Mindset Realities",
          "2. Reprogramming Negative Self-Talk",
          "3. The Science of Neuroplasticity & Habit Formation"
        ]
      },
      {
        id: "sm-2",
        number: "EBook 2",
        title: "Overcoming Fear and Procrastination",
        duration: "28m audio",
        pages: "52 pages",
        summary: "Master the psychology of execution. Eliminate resistance, overcome analysis paralysis, and develop relentless forward momentum.",
        chapters: [
          "1. Deconstructing the Roots of Procrastination",
          "2. The 5-Second Action Trigger",
          "3. Turning Anxiety into Focused Energy"
        ]
      },
      {
        id: "sm-3",
        number: "EBook 3",
        title: "Daily Habits of High Achievers",
        duration: "35m audio",
        pages: "60 pages",
        summary: "Build an invincible daily routine, master time blocking, and systematically eliminate distractions to achieve 10x output.",
        chapters: [
          "1. Morning Routines That Prime the Brain",
          "2. Deep Work Blocks & Flow State Triggers",
          "3. Evening Debrief & Recovery Protocols"
        ]
      },
      {
        id: "sm-4",
        number: "EBook 4",
        title: "Mental Toughness & Peak Focus",
        duration: "40m audio",
        pages: "75 pages",
        summary: "Develop unbreakable discipline under pressure and cultivate the emotional endurance needed for high-stakes achievements.",
        chapters: [
          "1. Performing Under Stress & Uncertainty",
          "2. Stoic Principles for Modern High Performers",
          "3. The Long Game: Sustaining Peak Motivation"
        ]
      }
    ]
  }
];

export default function PackageCourseView() {
  const [selectedPackageId, setSelectedPackageId] = useState(1);
  const [expandedItems, setExpandedItems] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);
  const [mobileTab, setMobileTab] = useState('detail'); // 'list' or 'detail'

  // Modals state
  const [activeEBook, setActiveEBook] = useState(null);
  const [activeAudio, setActiveAudio] = useState(null);

  const activePackage = PACKAGES_DATA.find((p) => p.id === selectedPackageId) || PACKAGES_DATA[0];

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
      activePackage.content.forEach((item) => {
        allOpen[item.id] = true;
      });
      setExpandedItems(allOpen);
      setAllExpanded(true);
    }
  };

  // Select package handler (on mobile switches to detail view)
  const handleSelectPackage = (pkgId) => {
    setSelectedPackageId(pkgId);
    setExpandedItems({});
    setAllExpanded(false);
    setMobileTab('detail');
  };

  return (
    <div className="w-full flex flex-col gap-6">

      {/* Mobile Tab Switcher (< 1024px) */}
      <div className="flex lg:hidden bg-slate-100 p-1 rounded-2xl w-full border border-slate-200/60 shadow-inner">
        <button
          onClick={() => setMobileTab('list')}
          className={`flex-1 py-2.5 text-[13px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${mobileTab === 'list'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
            }`}
        >
          <span>📦 Packages</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-extrabold">
            {PACKAGES_DATA.length}
          </span>
        </button>
        <button
          onClick={() => setMobileTab('detail')}
          className={`flex-1 py-2.5 text-[13px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${mobileTab === 'detail'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
            }`}
        >
          <span>📖 {activePackage.tag} Content</span>
        </button>
      </div>

      {/* Main Grid: Master (Left) and Detail (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ================= LEFT PANEL: PURCHASED PACKAGES ================= */}
        <div
          className={`lg:col-span-5 xl:col-span-4 flex flex-col gap-4 ${mobileTab === 'detail' ? 'hidden lg:flex' : 'flex'
            }`}
        >
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[20px] font-bold text-slate-900">
              Purchased Packages
            </h2>
            <span className="text-[12px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
              {PACKAGES_DATA.length} Available
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {PACKAGES_DATA.map((pkg) => {
              const isSelected = pkg.id === selectedPackageId;

              return (
                <div
                  key={pkg.id}
                  onClick={() => handleSelectPackage(pkg.id)}
                  className={`bg-white rounded-[22px] p-4 sm:p-5 flex items-center justify-between gap-3.5 sm:gap-4 cursor-pointer relative overflow-hidden transition-all duration-300 group ${isSelected
                      ? 'border-2 border-indigo-400 shadow-md shadow-indigo-100/70 ring-2 ring-indigo-100/50'
                      : 'border border-slate-200/90 shadow-sm hover:border-indigo-200 hover:shadow-md'
                    }`}
                >
                  {/* Subtle active background glow */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/60 rounded-full blur-2xl pointer-events-none -z-0" />
                  )}

                  {/* Left: 3D Book Thumbnail Cover */}
                  <div className="w-[72px] h-[96px] sm:w-[84px] sm:h-[110px] rounded-xl overflow-hidden shadow-md shrink-0 relative bg-slate-900 border border-slate-200/50 group-hover:scale-102 transition-transform duration-300 z-10">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Middle: Details */}
                  <div className="flex-1 flex flex-col min-w-0 z-10">
                    <span
                      className={`text-[12px] font-bold mb-0.5 ${isSelected ? 'text-indigo-600' : 'text-slate-800'
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
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${isSelected
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
          className={`lg:col-span-7 xl:col-span-8 bg-white border border-slate-200/80 rounded-[26px] p-4 sm:p-7 lg:p-8 shadow-sm flex flex-col gap-5 sm:gap-6 relative ${mobileTab === 'list' ? 'hidden lg:flex' : 'flex'
            }`}
        >
          {/* Top Bar: Back to Packages Link & Mobile Package Switcher */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setMobileTab('list')}
              className="flex items-center gap-2 text-[13px] sm:text-[14px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors w-fit group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Packages</span>
            </button>

            {/* Quick Switcher for Mobile */}
            <div className="flex lg:hidden items-center gap-1.5">
              {PACKAGES_DATA.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPackageId(p.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${p.id === selectedPackageId
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
                {activePackage.tag}
              </h2>
              <h3 className="text-[15px] sm:text-[19px] font-bold text-slate-700 mt-0.5">
                {activePackage.title}
              </h3>
              <p className="text-[12px] sm:text-[14px] text-slate-500 font-medium leading-relaxed mt-2 max-w-xl">
                {activePackage.description}
              </p>
            </div>

            {/* Right: 3D Book Artwork Mockup */}
            <div className="w-[84px] h-[118px] sm:w-[130px] sm:h-[185px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl shadow-indigo-950/20 border border-slate-200/60 relative shrink-0 group">
              <img
                src={activePackage.image}
                alt={activePackage.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Overview Stat Badges Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 grid grid-cols-3 divide-x divide-slate-100 shadow-sm">
            {/* eBooks Stat */}
            <div className="flex items-center gap-2 sm:gap-3.5 px-2 sm:px-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[15px] sm:text-[18px] font-black text-slate-900 leading-tight">
                  {activePackage.ebooksCount}
                </span>
                <span className="text-[11px] sm:text-[12px] font-semibold text-slate-500 truncate">
                  EBooks
                </span>
              </div>
            </div>

            {/* Audio Files Stat */}
            <div className="flex items-center gap-2 sm:gap-3.5 px-2 sm:px-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[15px] sm:text-[18px] font-black text-slate-900 leading-tight">
                  {activePackage.audioCount}
                </span>
                <span className="text-[11px] sm:text-[12px] font-semibold text-slate-500 truncate">
                  Audio Files
                </span>
              </div>
            </div>

            {/* Purchased Date Stat */}
            <div className="flex items-center gap-2 sm:gap-3.5 px-2 sm:px-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 truncate">
                  Purchased on
                </span>
                <span className="text-[11px] sm:text-[13px] font-bold text-slate-800 truncate">
                  {activePackage.purchasedDate}
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
              <button
                onClick={handleToggleExpandAll}
                className="border border-indigo-200 text-indigo-600 hover:bg-indigo-50 px-3 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-[12px] font-bold flex items-center gap-1.5 transition-colors shadow-sm active:scale-95"
              >
                <ChevronsUpDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{allExpanded ? 'Collapse All' : 'Expand All'}</span>
              </button>
            </div>

            {/* Accordion List */}
            <div className="flex flex-col gap-3">
              {activePackage.content.map((item) => {
                const isExpanded = !!expandedItems[item.id];

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
                            {item.number}
                          </h4>
                          <p className="text-[12px] sm:text-[13px] font-medium text-slate-500 truncate">
                            {item.title}
                          </p>
                        </div>
                      </div>

                      {/* Right: Action Buttons & Accordion Chevron */}
                      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-2.5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        {/* Read EBook Button */}
                        <button
                          onClick={() => setActiveEBook(item)}
                          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 rounded-xl text-[12px] sm:text-[13px] font-bold transition-all shadow-sm active:scale-95"
                        >
                          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span>Read EBook</span>
                        </button>

                        {/* Play Audio Button */}
                        <button
                          onClick={() => setActiveAudio(item)}
                          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl text-[12px] sm:text-[13px] font-bold transition-all shadow-sm active:scale-95"
                        >
                          <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span>Play Audio</span>
                        </button>

                        {/* Chevron Down toggle */}
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all shrink-0"
                          aria-label="Toggle details"
                        >
                          <ChevronDown
                            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-indigo-600' : ''
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
                          {item.summary}
                        </p>

                        {/* Chapter Breakdown */}
                        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 flex flex-col gap-2">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Curriculum Breakdown
                          </span>
                          <div className="flex flex-col gap-1.5">
                            {item.chapters?.map((chap, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-[12px] font-semibold text-slate-700"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                <span>{chap}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Quick Actions Drawer */}
                        <div className="flex items-center justify-between text-[12px]">
                          <span className="text-slate-500 font-medium">
                            Duration: <span className="font-bold text-slate-700">{item.duration}</span> • Length: <span className="font-bold text-slate-700">{item.pages}</span>
                          </span>
                          <button
                            onClick={() => alert(`Downloading files for "${item.title}"`)}
                            className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download Offline
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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

      {/* Interactive Audio Player Modal */}
      <AudioPlayerModal
        isOpen={!!activeAudio}
        onClose={() => setActiveAudio(null)}
        item={activeAudio}
        packageData={activePackage}
      />

    </div>
  );
}
