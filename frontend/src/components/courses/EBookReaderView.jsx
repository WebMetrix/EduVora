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
    <div className="w-full flex flex-col gap-5 pb-10">
      
      {/* ================= CONTROLS TOOLBAR (ABOVE BOOK PAGE) ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/70 backdrop-blur-sm p-1 rounded-2xl">
        
        {/* Left Toolbar: Previous button, Page selector, Zoom controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Previous Button */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-[12px] sm:text-[13px] font-bold transition-all shadow-sm active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Page Selector Pill */}
          <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] font-medium text-slate-500">
            <span>Page</span>
            <div className="relative">
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-1.5 pr-7 font-bold text-slate-800 text-[12px] sm:text-[13px] shadow-sm cursor-pointer focus:outline-none focus:border-indigo-500"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <span>of {totalPages}</span>
          </div>

          {/* Zoom Controls Pill */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-sm text-slate-700 text-[12px] font-bold gap-2">
            <button
              onClick={() => handleZoom(-10)}
              className="p-0.5 hover:text-indigo-600 transition-colors"
              title="Zoom out"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="min-w-[42px] text-center">{zoomLevel}%</span>
            <button
              onClick={() => handleZoom(10)}
              className="p-0.5 hover:text-indigo-600 transition-colors"
              title="Zoom in"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Toolbar: Bookmark & Fullscreen */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold transition-colors ${
              isBookmarked
                ? 'text-indigo-600 bg-indigo-50 border border-indigo-100'
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200/90 shadow-sm'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-indigo-600' : ''}`} />
            <span>Bookmark</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200/90 shadow-sm transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        </div>

      </div>

      {/* ================= MAIN TWO-COLUMN CONTENT GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= LEFT / CENTER CANVAS: PRINTED BOOK PAGE ================= */}
        <div className="lg:col-span-8 xl:col-span-8 flex items-center justify-center bg-[#f8fafc] border border-slate-200/70 rounded-[28px] p-4 sm:p-8 lg:p-12 relative overflow-hidden min-h-[700px] shadow-inner">
          
          {/* Navigation Arrow Left */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all mr-2 sm:mr-6 shrink-0 active:scale-95 z-10"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Printed Book Page (Exact design from Image 3) */}
          <div 
            className="w-full max-w-[480px] sm:max-w-[500px] bg-white rounded-[20px] shadow-[0_12px_45px_rgba(0,0,0,0.06)] border border-slate-200/80 p-8 sm:p-12 relative flex flex-col justify-between overflow-hidden min-h-[660px] transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
          >
            {/* Top Right Hanging Purple Ribbon Bookmark (01) */}
            <div className="absolute top-0 right-8 w-11 pt-2.5 pb-3.5 bg-[#4f3bf3] text-white rounded-b-xl flex flex-col items-center justify-center shadow-md">
              <span className="text-[17px] font-black leading-none">01</span>
            </div>

            {/* Page Header and Intro */}
            <div className="flex flex-col pt-2">
              <span className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase mb-3">
                CHAPTER
              </span>

              <h2 className="text-[28px] sm:text-[34px] font-black text-slate-900 leading-[1.15] mb-2 tracking-tight">
                What is
                <br />
                <span className="text-[#4f3bf3]">Financial Freedom?</span>
              </h2>

              {/* Purple Accent Underline */}
              <div className="w-12 h-1 bg-[#4f3bf3] rounded-full mt-1 mb-6" />

              {/* Italic Chapter Lead Text */}
              <p className="text-[13px] sm:text-[14px] text-slate-600 italic font-medium leading-relaxed max-w-sm mb-4">
                Financial freedom is not just about having money, it's about having options. It means you have enough resources to live life on your own terms, without being controlled by financial stress.
              </p>
            </div>

            {/* Page Bottom Illustration (Plant on gold coins with arrow & city) */}
            <div className="w-full flex justify-center mt-auto pt-4 relative">
              <div className="w-full max-w-[320px] rounded-xl overflow-hidden relative">
                <img
                  src={chapter1PlantImg}
                  alt="Financial Freedom Growth"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Purple Stripe at the very bottom edge of page */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#4f3bf3]" />
          </div>

          {/* Navigation Arrow Right */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all ml-2 sm:mr-0 ml-2 sm:ml-6 shrink-0 active:scale-95 z-10"
            aria-label="Next Page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* ================= RIGHT SIDEBAR: EBOOK CONTENTS ================= */}
        <div className="lg:col-span-4 xl:col-span-4 bg-white border border-slate-200/80 rounded-[24px] p-5 sm:p-6 shadow-sm flex flex-col gap-4">
          
          {/* Header & Progress */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-black text-slate-900 tracking-tight">
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
                  onClick={() => !ch.isLocked && setActiveChapterIndex(idx)}
                  className={`p-3.5 rounded-2xl flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-[#eeedfc] border border-indigo-200/90 shadow-sm'
                      : ch.isLocked
                      ? 'bg-white border border-slate-100 opacity-80 cursor-not-allowed'
                      : 'bg-white border border-slate-100 hover:border-slate-200 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-indigo-50/80 text-indigo-600'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span
                        className={`text-[13px] font-bold truncate leading-tight ${
                          isActive ? 'text-indigo-800 font-extrabold' : 'text-slate-800'
                        }`}
                      >
                        {ch.number}. {ch.title}
                      </span>
                      <span
                        className={`text-[11px] font-medium ${
                          isActive ? 'text-indigo-600' : 'text-slate-400'
                        }`}
                      >
                        {ch.pages}
                      </span>
                    </div>
                  </div>

                  {ch.isLocked && (
                    <Lock className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Card: Want to listen instead? */}
          <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-4 flex flex-col gap-3 mt-auto">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[13px] font-extrabold text-slate-900 leading-tight">
                  Want to listen instead?
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Listen to the audio version of this eBook.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAudioModalOpen(true)}
              className="w-full py-2.5 bg-white border border-emerald-300 text-emerald-600 hover:bg-emerald-50 rounded-xl text-[12px] font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <Headphones className="w-4 h-4" />
              <span>Play Audio</span>
            </button>
          </div>

        </div>

      </div>

      {/* ================= AUDIO PLAYBACK MODAL (IMAGE 1) ================= */}
      <ListenToAudioModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        chapterNumber={currentChapter.number}
        chapterTitle={currentChapter.title}
      />
    </div>
  );
}
