import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, CheckCircle2, ArrowRight, Info, Users, Coins, Crown, Check, Trophy } from 'lucide-react';

export default function RankDetailsModal({ isOpen, onClose }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="w-full h-[90vh] md:h-auto md:max-h-[90vh] md:max-w-[850px] xl:max-w-[1000px] bg-white md:rounded-[24px] rounded-t-3xl md:rounded-t-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 animate-slide-up md:animate-fade-in overflow-hidden">

        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden bg-white shrink-0">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-4 md:px-5 py-2.5 md:py-3 border-b border-slate-100 shrink-0 bg-white">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-[20px] md:text-[22px] font-extrabold text-[#1a1446]">Rank Details</h2>
            <p className="text-[12px] md:text-[13px] font-medium text-slate-500">
              Detailed information about your current rank and progress.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden min-h-0 bg-white custom-scrollbar p-4 md:p-5 gap-4 md:gap-5">

          {/* Left Column (Gold Background Box) */}
          <div className="w-full md:w-[280px] lg:w-[320px] xl:w-[360px] shrink-0 bg-gradient-to-b from-[#FFFDF2] to-[#FFF4C7] rounded-[24px] border border-yellow-200/50 flex flex-col relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full opacity-40 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(circle at 50% 30%, #FDE047 0%, transparent 60%)'
            }} />

            <div className="relative z-10 flex flex-col items-center p-4 xl:p-5 overflow-y-auto custom-scrollbar h-full">
              <div className="flex flex-col items-center">
                {/* Trophy */}
                <div className="w-24 h-24 md:w-28 md:h-28 relative flex items-center justify-center shrink-0 mb-3">
                  <div className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full" />
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-b from-yellow-100 to-yellow-50 border-2 border-white shadow-[0_10px_30px_rgba(234,179,8,0.3)] flex flex-col items-center justify-center">
                    <Trophy className="w-7 h-7 md:w-8 md:h-8 text-yellow-600 mb-0.5" />
                    <div className="px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-yellow-900 text-[8px] md:text-[9px] font-black tracking-widest rounded text-center border border-yellow-200 shadow-sm uppercase">GOLD</div>
                  </div>
                </div>

                <span className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#1a1446]/60 uppercase mb-0.5">Current Rank</span>
                <h3 className="text-[22px] md:text-[26px] font-extrabold text-[#1a1446] mb-5">Gold Rank</h3>
              </div>

              <div className="w-full bg-yellow-600/5 border border-yellow-500/10 rounded-xl p-3 flex items-center gap-3 mb-6">
                <Calendar className="w-4 h-4 text-yellow-700 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium text-yellow-800">Achieved On</span>
                  <span className="text-[12px] md:text-[13px] font-bold text-yellow-900">15 September 2026</span>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2.5">
                <h4 className="text-[13px] md:text-[14px] font-extrabold text-[#1a1446] mb-1">Rank Benefits</h4>

                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="text-[12px] md:text-[13px] font-medium text-[#1a1446]">Higher commission percentage</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="text-[12px] md:text-[13px] font-medium text-[#1a1446]">Access to exclusive offers</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="text-[12px] md:text-[13px] font-medium text-[#1a1446]">Priority support</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="text-[12px] md:text-[13px] font-medium text-[#1a1446]">Special recognition badge</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (Qualification Details) */}
          <div className="flex-1 flex flex-col gap-4 md:gap-5 md:overflow-y-auto custom-scrollbar md:pr-2">

            <h3 className="text-[18px] md:text-[20px] font-extrabold text-[#1a1446]">Rank Qualification Details</h3>

            {/* Next Rank Progress Section (Unified Card) */}
            <div className="bg-white border border-slate-200 rounded-[16px] md:rounded-[20px] p-3 md:p-4 flex flex-col gap-3 md:gap-4 mt-2 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">

              {/* Rank Transition Area (No internal border) */}
              <div className="flex items-center justify-between px-2 md:px-4 pt-2">
                {/* Current Rank */}
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-b from-yellow-50 to-yellow-100/50 border border-yellow-200 flex items-center justify-center shrink-0 shadow-sm">
                    <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 drop-shadow-sm" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] md:text-[13px] font-semibold text-slate-500">Current Rank</span>
                    <span className="text-[18px] md:text-[22px] font-black text-[#1a1446] leading-none">Gold</span>
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-[#1a1446] shrink-0" />

                {/* Next Rank */}
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-b from-slate-50 to-slate-100/50 border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    <Crown className="w-6 h-6 md:w-8 md:h-8 text-slate-400 drop-shadow-sm" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] md:text-[13px] font-semibold text-slate-500">Next Rank</span>
                    <span className="text-[18px] md:text-[22px] font-black text-[#1a1446] leading-none">Platinum</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar Area */}
              <div className="bg-[#f5f4ff] rounded-[12px] md:rounded-[16px] p-4 flex items-center gap-4">

                {/* Icon Wrapper */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#e3dfff] flex items-center justify-center shrink-0">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#4f3ff0] flex items-center justify-center shadow-md">
                    <span className="text-white font-black text-[12px] md:text-[14px] leading-none mb-[1px]">0</span>
                  </div>
                </div>

                {/* Progress Content */}
                <div className="flex-1 flex flex-col gap-2">
                  <span className="text-[13px] md:text-[15px] font-bold text-[#4f3ff0]">
                    You're 80% towards <span className="font-black text-[#1a1446]">Platinum Rank!</span>
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 md:h-2.5 bg-[#e3dfff] rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-[#4f3ff0] rounded-full" style={{ width: '80%' }} />
                    </div>
                    <span className="text-[13px] md:text-[15px] font-black text-[#4f3ff0] w-9">80%</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-1">
              <h4 className="text-[15px] font-extrabold text-[#1a1446]">Qualification Criteria for Platinum</h4>
              <Info className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>

            {/* Criteria List */}
            <div className="flex flex-col gap-3">
              {/* Box 1 */}
              <div className="border border-slate-100 rounded-[16px] p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-indigo-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-extrabold text-[#1a1446]">Direct Members</span>
                    <span className="text-[13px] font-extrabold text-[#1a1446]">8 / 18</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[12px] font-medium text-slate-500">Total Level 1 members</span>
                    <div className="w-[80px] sm:w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: '44%' }} />
                    </div>
                  </div>
                </div>
                <div className="sm:w-[120px] sm:border-l border-slate-100 sm:pl-4 pt-3 sm:pt-0 border-t sm:border-t-0 flex flex-col justify-center">
                  <span className="text-[12px] md:text-[13px] font-medium text-slate-500 leading-tight">
                    <span className="font-extrabold text-slate-700">10 more</span><br />required
                  </span>
                </div>
              </div>

              {/* Box 2 */}
              <div className="border border-slate-100 rounded-[16px] p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-emerald-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Coins className="w-5 h-5" />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-extrabold text-[#1a1446]">Level 1 Business</span>
                    <span className="text-[13px] font-extrabold text-[#1a1446]">₹75,000 / ₹100,000</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[12px] font-medium text-slate-500">Eligible business volume</span>
                    <div className="w-[80px] sm:w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                </div>
                <div className="sm:w-[120px] sm:border-l border-slate-100 sm:pl-4 pt-3 sm:pt-0 border-t sm:border-t-0 flex flex-col justify-center">
                  <span className="text-[12px] md:text-[13px] font-medium text-slate-500 leading-tight">
                    <span className="font-extrabold text-slate-700">₹25,000 more</span><br />required
                  </span>
                </div>
              </div>

              {/* Box 3 */}
              <div className="border border-slate-100 rounded-[16px] p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-orange-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-extrabold text-[#1a1446]">Level 2 Members</span>
                    <span className="text-[13px] font-extrabold text-[#1a1446]">12 / 20</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[12px] font-medium text-slate-500">Total Level 2 members</span>
                    <div className="w-[80px] sm:w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                </div>
                <div className="sm:w-[120px] sm:border-l border-slate-100 sm:pl-4 pt-3 sm:pt-0 border-t sm:border-t-0 flex flex-col justify-center">
                  <span className="text-[12px] md:text-[13px] font-medium text-slate-500 leading-tight">
                    <span className="font-extrabold text-slate-700">8 more</span><br />required
                  </span>
                </div>
              </div>

              {/* Box 4 */}
              <div className="border border-slate-100 rounded-[16px] p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-blue-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-extrabold text-[#1a1446]">Qualified Members</span>
                    <span className="text-[13px] font-extrabold text-[#1a1446]">3 / 5</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[12px] font-medium text-slate-500">Eligible team members</span>
                    <div className="w-[80px] sm:w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                </div>
                <div className="sm:w-[120px] sm:border-l border-slate-100 sm:pl-4 pt-3 sm:pt-0 border-t sm:border-t-0 flex flex-col justify-center">
                  <span className="text-[12px] md:text-[13px] font-medium text-slate-500 leading-tight">
                    <span className="font-extrabold text-slate-700">2 more</span><br />required
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Next Rank info */}
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-[16px] p-4 flex items-start gap-4 mt-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                <Crown className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[14px] font-extrabold text-[#1a1446]">Next Rank: Platinum</h4>
                <p className="text-[13px] font-medium text-slate-600 leading-relaxed">
                  Reach all the qualification criteria to achieve Platinum Rank and unlock more benefits and higher rewards.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
