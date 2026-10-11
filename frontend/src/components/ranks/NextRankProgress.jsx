import React, { useState } from 'react';
import { ChevronRight, Users, IndianRupee, UserCheck, Info } from 'lucide-react';
import RankRequirementsModal from './RankRequirementsModal';

export default function NextRankProgress() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full bg-white border border-slate-200 rounded-[24px] shadow-sm p-4 sm:p-6 flex flex-col relative overflow-hidden group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700 z-0" />
      
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Top Section: Rank Transition & Percentage */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        
        {/* Ranks Transition */}
        <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-6">
          {/* Current Rank Mini */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-50 border border-yellow-200 flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600 fill-yellow-400"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7c0 3.31 2.69 6 6 6s6-2.69 6-6V2z"/></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-[12px] font-bold text-slate-500 uppercase tracking-wide">Current Rank</span>
              <span className="text-[15px] sm:text-[16px] font-extrabold text-[#1a1446]">Gold</span>
            </div>
          </div>
          
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 shrink-0" />
          
          {/* Next Rank Mini */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 via-slate-100 to-white opacity-50" />
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 fill-slate-300 relative z-10"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7c0 3.31 2.69 6 6 6s6-2.69 6-6V2z"/></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-[12px] font-bold text-slate-500 uppercase tracking-wide">Next Rank</span>
              <span className="text-[15px] sm:text-[16px] font-extrabold text-[#1a1446]">Platinum</span>
            </div>
          </div>
        </div>

        {/* Header Right */}
        <div className="flex items-center justify-end sm:items-end w-full sm:w-auto">
           <div className="bg-indigo-50/80 border border-indigo-100 rounded-xl px-3.5 py-1.5 sm:px-4 sm:py-2 flex items-center sm:flex-col gap-2 sm:gap-0 sm:min-w-[100px]">
             <span className="text-[16px] sm:text-[18px] font-black text-indigo-700 leading-tight">80%</span>
             <span className="text-[11px] font-bold text-indigo-500/80">Complete</span>
           </div>
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="w-full h-3.5 bg-slate-100 rounded-full mb-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full bg-[#4f3bf3] rounded-full w-[80%] transition-all duration-1000" />
      </div>

      {/* Requirements section */}
      <div className="flex flex-col gap-4 flex-1">
        {/* Requirements Header with Clean Info Button */}
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] sm:text-[14px] font-bold text-[#1a1446]">Requirements to reach Platinum</span>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label="View Platinum requirements help"
            className="w-5 h-5 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-2">
            
            {/* Req 1 */}
            <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-3 flex flex-col">
                <div className="flex items-start gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex flex-col pt-0.5">
                        <span className="text-[13px] font-extrabold text-[#1a1446] leading-tight mb-0.5">10 more</span>
                        <span className="text-[11px] font-medium text-slate-500 leading-tight">Level 1 members</span>
                    </div>
                </div>
                <div className="mt-auto flex flex-col gap-1.5">
                    <span className="text-[12px] font-bold text-[#1a1446]">8 / 18</span>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full w-[44%]" />
                    </div>
                </div>
            </div>

            {/* Req 2 */}
            <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-3 flex flex-col">
                <div className="flex items-start gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                        <IndianRupee className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex flex-col pt-0.5">
                        <span className="text-[13px] font-extrabold text-[#1a1446] leading-tight mb-0.5">₹25,000 more</span>
                        <span className="text-[11px] font-medium text-slate-500 leading-tight">eligible business</span>
                    </div>
                </div>
                <div className="mt-auto flex flex-col gap-1.5">
                    <span className="text-[12px] font-bold text-[#1a1446]">₹75,000 / ₹100,000</span>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[75%]" />
                    </div>
                </div>
            </div>

            {/* Req 3 */}
            <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-3 flex flex-col">
                <div className="flex items-start gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                        <UserCheck className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex flex-col pt-0.5">
                        <span className="text-[13px] font-extrabold text-[#1a1446] leading-tight mb-0.5">2 more</span>
                        <span className="text-[11px] font-medium text-slate-500 leading-tight">qualified members</span>
                    </div>
                </div>
                <div className="mt-auto flex flex-col gap-1.5">
                    <span className="text-[12px] font-bold text-[#1a1446]">3 / 5</span>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full w-[60%]" />
                    </div>
                </div>
            </div>

        </div>
      </div>
      </div>

      <RankRequirementsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
