import React, { useState } from 'react';
import { 
  ArrowLeft, Bookmark, Maximize2, Minimize2, BookOpen, 
  Lock, Headphones, ChevronLeft, ChevronRight, ChevronDown, 
  Minus, Plus 
} from 'lucide-react';
import ListenToAudioModal from './ListenToAudioModal';
import chapter1PlantImg from '../../assets/images/chapter1_plant.jpg';

export default function EBookReaderView({ 
  packageData, 
  ebookData, 
  initialShowAudio = false, 
  onBack 
}) {
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(initialShowAudio);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [mobileTab, setMobileTab] = useState('reader'); // 'reader' or 'contents'

  const totalPages = 45;

  const chapters = [
    { id: 1, number: "01", title: "What is Financial Freedom?", pages: "Page 1 - 4", isLocked: false },
    { id: 2, number: "02", title: "Why Financial Freedom Matters", pages: "Page 5 - 9", isLocked: true },
    { id: 3, number: "03", title: "The Foundations of Wealth", pages: "Page 10 - 15", isLocked: true },
    { id: 4, number: "04", title: "Smart Money Habits", pages: "Page 16 - 22", isLocked: true },
    { id: 5, number: "05", title: "Investing for the Future", pages: "Page 23 - 31", isLocked: true },
    { id: 6, number: "06", title: "Multiple Income Streams", pages: "Page 32 - 38", isLocked: true },
    { id: 7, number: "07", title: "Living Your Freedom", pages: "Page 39 - 45", isLocked: true },
  ];

  const currentChapter = chapters[activeChapterIndex] || chapters[0];

  const handleZoom = (delta) => {
    setZoomLevel((prev) => Math.min(150, Math.max(70, prev + delta)));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((p) => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  };

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 pb-2 sm:pb-4">
      
      {/* Mobile Tab Switcher (< 1024px) for focused reading */}
      <div className="flex lg:hidden bg-slate-100 p-1 rounded-2xl w-full border border-slate-200/60 shadow-inner">
        <button
          onClick={() => setMobileTab('reader')}
          className={`flex-1 py-2 text-[12px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'reader'
              ? 'bg-white text-indigo-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Book View</span>
        </button>
        <button
          onClick={() => setMobileTab('contents')}
          className={`flex-1 py-2 text-[12px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'contents'
              ? 'bg-white text-indigo-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>📑 EBook Contents</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-extrabold">
            {chapters.length}
          </span>
        </button>
      </div>

      {/* ================= CONTROLS TOOLBAR (ABOVE BOOK PAGE) ================= */}
      <div className="flex items-center justify-between gap-2 bg-white/90 backdrop-blur-sm p-2 sm:p-2.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        
        {/* Left Toolbar: Quick Actions / Page Selector */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Quick Audio Play Button */}
          <button
            onClick={() => setIsAudioModalOpen(true)}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 bg-indigo-50 border border-indigo-200 text-indigo-600 hover:bg-indigo-100/70 rounded-xl text-[11px] sm:text-[13px] font-bold transition-all shadow-2xs active:scale-95 shrink-0"
          >
            <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Listen Audio</span>
          </button>

          {/* Page Selector Pill */}
          <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-[13px] font-medium text-slate-500 shrink-0">
            <span className="hidden xs:inline">Jump to</span>
            <div className="relative">
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 pr-5.5 sm:pr-7 font-bold text-slate-800 text-[11px] sm:text-[13px] shadow-2xs cursor-pointer focus:outline-none focus:border-indigo-500"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <option key={p} value={p}>
                    Page {p}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right Toolbar: Zoom controls + Bookmark + Fullscreen */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Zoom Controls Pill */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-1.5 sm:px-2.5 py-1 sm:py-1.5 shadow-2xs text-slate-700 text-[11px] sm:text-[12px] font-bold gap-1 sm:gap-2 shrink-0">
            <button
              onClick={() => handleZoom(-10)}
              className="p-0.5 hover:text-indigo-600 transition-colors"
              title="Zoom out"
            >
              <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <span className="min-w-[30px] sm:min-w-[42px] text-center">{zoomLevel}%</span>
            <button
              onClick={() => handleZoom(10)}
              className="p-0.5 hover:text-indigo-600 transition-colors"
              title="Zoom in"
            >
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-[13px] font-bold transition-colors ${
              isBookmarked
                ? 'text-indigo-600 bg-indigo-50 border border-indigo-100'
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200/90 shadow-2xs'
            }`}
            title="Bookmark"
          >
            <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isBookmarked ? 'fill-current text-indigo-600' : ''}`} />
            <span className="hidden md:inline">Bookmark</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-[13px] font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200/90 shadow-2xs transition-colors"
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            <span className="hidden md:inline">Fullscreen</span>
          </button>
        </div>

      </div>

      {/* ================= MAIN TWO-COLUMN CONTENT GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        
        {/* ================= LEFT / CENTER CANVAS: BOOK FOCUSED UI ================= */}
        <div 
          className={`lg:col-span-8 xl:col-span-8 flex flex-col items-center justify-center bg-transparent sm:bg-[#f8fafc] sm:border border-slate-200/70 sm:rounded-[28px] p-0 sm:p-8 lg:p-12 relative sm:shadow-inner ${
            mobileTab === 'contents' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* ================= PRINTED BOOK PAGE (MATCHING BOOK-FOCUSED UI SCREENSHOT) ================= */}
          <div 
            className="w-full max-w-[490px] bg-white rounded-[22px] sm:rounded-[26px] shadow-[0_4px_25px_rgba(0,0,0,0.04)] sm:shadow-[0_12px_45px_rgba(0,0,0,0.06)] border border-slate-200/90 p-6 sm:p-10 lg:p-12 flex flex-col justify-between transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Top Chapter Label & Accent Underline */}
            <div className="flex flex-col items-start pt-1">
              <span className="text-[11px] sm:text-[12px] font-black tracking-widest text-[#1a1446] uppercase">
                CHAPTER {currentChapter.number}
              </span>
              <div className="w-12 h-[2.5px] bg-[#4f3bf3] rounded-full mt-2 mb-6" />

              {/* Chapter Title */}
              <h2 className="text-[28px] sm:text-[34px] font-black text-[#1a1446] leading-[1.18] tracking-tight mb-5">
                What is
                <br />
                <span className="text-[#4f3bf3]">Financial Freedom?</span>
              </h2>

              {/* Italic Lead Paragraph */}
              <p className="text-[13.5px] sm:text-[15px] text-slate-700 italic font-medium leading-[1.7] mb-6">
                Financial freedom is not just about having money, it’s about having options. It means you have enough resources to live life on your own terms, without being controlled by financial stress.
              </p>
            </div>

            {/* Bottom Illustration (Growth Plant on Stacked Coins with City & Arrow) */}
            <div className="w-full flex justify-center my-auto py-2">
              <div className="w-full max-w-[280px] sm:max-w-[340px] rounded-xl overflow-hidden">
                <img
                  src={chapter1PlantImg}
                  alt="Financial Freedom Growth"
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>
            </div>

            {/* Stepper Navigation Row: <  1/45  > */}
            <div className="flex items-center justify-between w-full max-w-[320px] mx-auto mt-6 px-1">
              {/* Prev Button */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-2xs hover:border-indigo-300 hover:bg-indigo-50/50 flex items-center justify-center text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Page Badge: 1 / 45 */}
              <div className="px-5 py-1.5 bg-white border border-slate-200/90 rounded-full shadow-2xs text-[12px] sm:text-[13px] font-bold text-indigo-700 tracking-wider">
                {currentPage} / {totalPages}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-2xs hover:border-indigo-300 hover:bg-indigo-50/50 flex items-center justify-center text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
                aria-label="Next Page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Progress Bar with Circular Dot Indicator */}
            <div className="w-full max-w-[340px] mx-auto mt-5 relative py-2">
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#4f3bf3] rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(2, (currentPage / totalPages) * 100)}%` }}
                />
              </div>
              {/* Circular Dot Indicator */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#4f3bf3] rounded-full border-2 border-white shadow-xs pointer-events-none transition-all duration-300"
                style={{ left: `calc(${Math.min(98, Math.max(2, (currentPage / totalPages) * 100))}% - 6px)` }}
              />
            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDEBAR: EBOOK CONTENTS ================= */}
        <div 
          className={`lg:col-span-4 xl:col-span-4 bg-white border border-slate-200/80 rounded-2xl sm:rounded-[24px] p-4 sm:p-6 shadow-sm flex flex-col gap-4 ${
            mobileTab === 'reader' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          
          {/* Header & Progress */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] sm:text-[16px] font-black text-slate-900 tracking-tight">
                EBook Contents
              </h3>
              <span className="text-[12px] font-bold text-emerald-600">
                10% Completed
              </span>
            </div>
            
            {/* Green Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[10%]" />
            </div>
          </div>

          {/* Chapters List (7 Chapters matching Image 3) */}
          <div className="flex flex-col gap-2.5 my-1">
            {chapters.map((ch, idx) => {
              const isActive = idx === activeChapterIndex;

              return (
                <div
                  key={ch.id}
                  onClick={() => {
                    if (!ch.isLocked) {
                      setActiveChapterIndex(idx);
                      setMobileTab('reader');
                    }
                  }}
                  className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-[#eeedfc] border border-indigo-200/90 shadow-sm'
                      : ch.isLocked
                      ? 'bg-white border border-slate-100 opacity-80 cursor-not-allowed'
                      : 'bg-white border border-slate-100 hover:border-slate-200 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-indigo-50/80 text-indigo-600'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span
                        className={`text-[12px] sm:text-[13px] font-bold truncate leading-tight ${
                          isActive ? 'text-indigo-800 font-extrabold' : 'text-slate-800'
                        }`}
                      >
                        {ch.number}. {ch.title}
                      </span>
                      <span
                        className={`text-[10px] sm:text-[11px] font-medium ${
                          isActive ? 'text-indigo-600' : 'text-slate-400'
                        }`}
                      >
                        {ch.pages}
                      </span>
                    </div>
                  </div>

                  {ch.isLocked && (
                    <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0 ml-2" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Card: Want to listen instead? */}
          <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex flex-col gap-3 mt-2.5 sm:mt-auto">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[12px] sm:text-[13px] font-extrabold text-slate-900 leading-tight">
                  Want to listen instead?
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Listen to the audio version of this eBook.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAudioModalOpen(true)}
              className="w-full py-2.5 bg-white border border-emerald-300 text-emerald-600 hover:bg-emerald-50 rounded-xl text-[12px] font-bold flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-95"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Play Audio</span>
            </button>
          </div>

        </div>

      </div>

      {/* ================= AUDIO PLAYBACK MODAL (BOTTOM-SHEET DRAWER ON MOBILE) ================= */}
      <ListenToAudioModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        chapterNumber={currentChapter.number}
        chapterTitle={currentChapter.title}
      />
    </div>
  );
}
