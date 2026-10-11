import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, BookOpen, Download, ChevronLeft, ChevronRight, Bookmark, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';

export default function EBookReaderModal({ isOpen, onClose, item, packageData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = item?.pages ? parseInt(item.pages) : 42;

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentPage(1);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentPage((p) => Math.min(p + 1, totalPages));
      if (e.key === 'ArrowLeft') setCurrentPage((p) => Math.max(p - 1, 1));
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, totalPages]);

  if (!isOpen || !item) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Reader Container */}
      <div className="relative z-10 w-full h-full sm:h-[90vh] sm:max-h-[850px] sm:max-w-4xl bg-white sm:rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        
        {/* Top Navigation Bar */}
        <div className="px-5 py-3.5 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                {item.number} • {packageData?.title}
              </span>
              <h3 className="text-[15px] sm:text-[17px] font-extrabold text-slate-900 truncate">
                {item.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => alert(`Starting download for "${item.title}.pdf"`)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* EBook Reader Canvas */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10 bg-slate-50 flex justify-center">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 flex flex-col gap-6 text-slate-800 leading-relaxed min-h-[500px]">
            {/* Header info */}
            <div className="border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between text-[12px] font-bold text-slate-400 mb-2">
                <span>CHAPTER {currentPage} OF {item.chapters?.length || 3}</span>
                <span>PAGE {currentPage} / {totalPages}</span>
              </div>
              <h2 className="text-[22px] sm:text-[26px] font-black text-slate-900 tracking-tight">
                {item.chapters?.[currentPage - 1] || item.title}
              </h2>
            </div>

            {/* Simulated Content Reading */}
            <div className="flex flex-col gap-4 text-[14px] sm:text-[15px] text-slate-600 font-normal leading-relaxed">
              <p className="first-letter:text-4xl first-letter:font-black first-letter:text-indigo-600 first-letter:mr-2 first-letter:float-left">
                {item.summary}
              </p>
              <p>
                In this module, we examine the practical applications and strategic mindset required to excel. Mastery is not merely about accumulating information; it is about deliberate execution, disciplined habit formation, and continuous iteration.
              </p>
              <div className="bg-indigo-50/70 border-l-4 border-indigo-600 p-4 rounded-r-xl my-2">
                <span className="text-[12px] font-bold uppercase tracking-wider text-indigo-700 block mb-1">
                  Key Takeaway
                </span>
                <p className="text-[13px] font-semibold text-indigo-950 italic">
                  "Consistency compounds faster than intensity. The small adjustments you commit to every single day produce exponential results over time."
                </p>
              </div>
              <p>
                As you study this material, make sure to take reflective notes and pair your theoretical insights with immediate action. Every chapter is structured to build upon the previous milestone, giving you a comprehensive roadmap toward sustainable growth.
              </p>
            </div>

            {/* Bottom Page Marker */}
            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-400">
              <span>{packageData?.title}</span>
              <span>— {currentPage} —</span>
            </div>
          </div>
        </div>

        {/* Bottom Pagination & Control Footer */}
        <div className="px-5 py-3 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-[12px] sm:text-[13px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous Chapter</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[12px] sm:text-[13px] font-bold text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-[12px] sm:text-[13px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors shadow-sm shadow-indigo-600/20"
          >
            <span className="hidden sm:inline">Next Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
