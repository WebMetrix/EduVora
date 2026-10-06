import React, { useState } from 'react';
import { Award, Calendar, ChevronRight } from 'lucide-react';
import RankDetailsModal from './RankDetailsModal';

export default function CurrentRankCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full relative overflow-hidden rounded-[24px] border border-yellow-200/50 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-yellow-300">
      {/* Background gradients and meshes to mimic the golden glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFCF1] to-[#FFF8E1] z-0" />
      <div className="absolute top-0 right-0 w-full h-full opacity-40 z-0" style={{
        backgroundImage: 'radial-gradient(circle at 80% 20%, #FDE047 0%, transparent 40%), radial-gradient(circle at 20% 80%, #FEF08A 0%, transparent 50%)'
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[2px] border-yellow-100 rounded-full opacity-30 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border-[1px] border-yellow-200 rounded-full opacity-20 z-0" />

      {/* Ribbon icon at top left */}
      <div className="absolute top-5 left-5 flex items-center gap-2 z-10">
        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center border border-yellow-200 shadow-sm">
          <Award className="w-4 h-4 text-yellow-600" />
        </div>
        <span className="text-[13px] font-extrabold text-slate-800">Current Rank</span>
      </div>

      {/* Trophy Image/Illustration container */}
      <div className="relative z-10 w-[140px] h-[140px] shrink-0 flex items-center justify-center mt-6 md:mt-0 mx-auto md:mx-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300/30 to-yellow-100/10 rounded-full animate-pulse-slow blur-xl" />

        {/* Placeholder for the large trophy image since we don't have the exact asset */}
        {/* We'll build a CSS-based trophy pedestal to approximate the golden 3D trophy */}
        <div className="relative w-[110px] h-[110px] rounded-full bg-gradient-to-b from-yellow-100 to-yellow-50 border-2 border-white shadow-[0_10px_30px_rgba(234,179,8,0.2)] flex flex-col items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600 fill-yellow-400 mb-1.5">
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="50%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#CA8A04" />
              </linearGradient>
            </defs>
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7c0 3.31 2.69 6 6 6s6-2.69 6-6V2z" />
          </svg>
          <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-yellow-900 text-[10px] font-black tracking-widest rounded-md uppercase border border-yellow-200 shadow-sm">
            GOLD
          </div>

          {/* Laurel wreaths approximation */}
          <svg className="absolute w-[95px] h-[95px] opacity-20 pointer-events-none" viewBox="0 0 100 100">
            <path d="M 50 90 C 10 90 10 30 50 10 C 90 30 90 90 50 90" fill="none" stroke="#CA8A04" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
        <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-1">Current Rank</span>
        <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#1a1446] leading-tight mb-2">
          Gold Rank
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-[13px] font-medium text-slate-600">
            Achieved on <span className="font-bold text-slate-800">15 September 2026</span>
          </span>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-white border-2 border-indigo-100 text-indigo-600 font-bold text-[13px] hover:bg-indigo-50 hover:border-indigo-200 transition-all shadow-sm hover:shadow active:scale-95 group"
        >
          View Rank Details
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <RankDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
