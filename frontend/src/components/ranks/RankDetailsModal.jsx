import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, ArrowRight, Info, Users, Coins, Crown, Check, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRankTheme, formatRankDate, formatCurrency } from '../../utils/rankHelper';

export default function RankDetailsModal({ isOpen, onClose, rankSummary, ranksCatalog = [] }) {
  const [showCriteriaHelp, setShowCriteriaHelp] = useState(false);
  const helpRef = useRef(null);

  // Click outside to close criteria popover
  useEffect(() => {
    function handleClickOutside(event) {
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setShowCriteriaHelp(false);
      }
    }
    if (showCriteriaHelp) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showCriteriaHelp]);

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

  const currentRankName = rankSummary?.currentRankName || 'Bronze';
  const getFallbackNextRank = (curr) => {
    const c = (curr || '').toLowerCase();
    if (c === 'bronze') return 'Silver';
    if (c === 'silver') return 'Gold';
    if (c === 'gold') return 'Diamond';
    return 'Diamond';
  };
  const nextRankName = (rankSummary?.nextRankName && rankSummary?.currentRankId !== rankSummary?.nextRankId)
    ? rankSummary.nextRankName 
    : (rankSummary?.currentRankId === 4 ? currentRankName : getFallbackNextRank(currentRankName));
  const currentTheme = getRankTheme(currentRankName);
  const nextTheme = getRankTheme(nextRankName);

  const achievedDateStr = formatRankDate(rankSummary?.achievedDate);
  const benefits = rankSummary?.currentRankBenefits?.length > 0 
    ? rankSummary.currentRankBenefits 
    : ['Standard affiliate commissions', 'Access to member dashboard', 'Email support', 'Recognition badge'];

  const overallProgress = rankSummary?.overallProgressPercentage ?? 0;

  const currentMembers = rankSummary?.currentLevel1Members ?? 0;
  const requiredMembers = rankSummary?.requiredLevel1Members ?? 0;
  const membersNeeded = Math.max(0, requiredMembers - currentMembers);
  const memberPct = rankSummary?.level1Percentage ?? 0;

  const currentBusiness = rankSummary?.currentBusiness ?? 0;
  const requiredBusiness = rankSummary?.requiredBusiness ?? 0;
  const businessNeeded = Math.max(0, requiredBusiness - currentBusiness);
  const businessPct = rankSummary?.businessPercentage ?? 0;

  const currentQualified = rankSummary?.currentQualifiedMembers ?? 0;
  const requiredQualified = rankSummary?.requiredQualifiedMembers ?? 0;
  const qualifiedNeeded = Math.max(0, requiredQualified - currentQualified);
  const qualifiedPct = rankSummary?.qualifiedPercentage ?? 0;

  const isMaxRank = currentRankName.toLowerCase() === 'diamond' || (rankSummary?.currentRankId === 4 && rankSummary?.nextRankId === 4);

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
            className="p-2 -mr-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden min-h-0 bg-white custom-scrollbar p-4 md:p-5 gap-4 md:gap-5">

          {/* Left Column (Current Rank Theme Box) */}
          <div className={`w-full md:w-[280px] lg:w-[320px] xl:w-[360px] shrink-0 bg-gradient-to-b ${currentTheme.bgGradient} rounded-[24px] border ${currentTheme.borderColor} flex flex-col relative overflow-hidden`}>
            <div className="relative z-10 flex flex-col items-center p-4 xl:p-5 overflow-y-auto custom-scrollbar h-full">
              <div className="flex flex-col items-center">
                {/* Trophy */}
                <div className="w-24 h-24 md:w-28 md:h-28 relative flex items-center justify-center shrink-0 mb-3">
                  <div className="absolute inset-0 blur-2xl rounded-full" style={{ backgroundColor: currentTheme.glowColor }} />
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 border-2 border-white shadow-lg flex flex-col items-center justify-center">
                    <Trophy className={`w-7 h-7 md:w-8 md:h-8 ${currentTheme.textClass} mb-0.5`} />
                    <div className={`px-2 py-0.5 ${currentTheme.badgeBg} text-[8px] md:text-[9px] font-black tracking-widest rounded text-center border border-white/40 shadow-sm uppercase`}>
                      {currentRankName}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#1a1446]/60 uppercase mb-0.5">Current Rank</span>
                <h3 className="text-[22px] md:text-[26px] font-extrabold text-[#1a1446] mb-4">{currentRankName} Rank</h3>
              </div>

              {/* Achieved Date */}
              <div className="w-full bg-slate-900/5 border border-slate-900/10 rounded-xl p-3 flex items-center gap-3 mb-5">
                <Calendar className="w-4 h-4 text-slate-700 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium text-slate-600">Achieved On</span>
                  <span className="text-[12px] md:text-[13px] font-bold text-slate-900">{achievedDateStr}</span>
                </div>
              </div>

              {/* Dynamic Benefits List */}
              <div className="w-full flex flex-col gap-2.5">
                <h4 className="text-[13px] md:text-[14px] font-extrabold text-[#1a1446] mb-1">Rank Benefits</h4>
                {benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-[12px] md:text-[13px] font-medium text-[#1a1446]">{b}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column (Qualification Details) */}
          <div className="flex-1 flex flex-col gap-4 md:gap-5 md:overflow-y-auto custom-scrollbar md:pr-2">

            <h3 className="text-[18px] md:text-[20px] font-extrabold text-[#1a1446]">Rank Qualification Details</h3>

            {/* Next Rank Progress Section */}
            <div className="bg-white border border-slate-200 rounded-[16px] md:rounded-[20px] p-3 md:p-4 flex flex-col gap-3 md:gap-4 mt-2 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">

              <div className="flex items-center justify-between px-2 md:px-4 pt-2">
                {/* Current Rank */}
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-slate-200 flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: `${currentTheme.color}20` }}>
                    <Trophy className="w-6 h-6 md:w-8 md:h-8" stroke={currentTheme.color} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] md:text-[13px] font-semibold text-slate-500">Current Rank</span>
                    <span className="text-[18px] md:text-[22px] font-black text-[#1a1446] leading-none">{currentRankName}</span>
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-[#1a1446] shrink-0" />

                {/* Next Rank */}
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-slate-200 flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: `${nextTheme.color}20` }}>
                    <Crown className="w-6 h-6 md:w-8 md:h-8" stroke={nextTheme.color} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] md:text-[13px] font-semibold text-slate-500">Next Rank</span>
                    <span className="text-[18px] md:text-[22px] font-black text-[#1a1446] leading-none">{nextRankName}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar Area */}
              <div className="bg-[#f5f4ff] rounded-[12px] md:rounded-[16px] p-4 flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#e3dfff] flex items-center justify-center shrink-0">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#4f3ff0] flex items-center justify-center shadow-md">
                    <span className="text-white font-black text-[12px] md:text-[14px] leading-none mb-[1px]">★</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <span className="text-[13px] md:text-[15px] font-bold text-[#4f3ff0]">
                    {isMaxRank ? (
                      `You've attained the peak rank of ${currentRankName}!`
                    ) : (
                      <>You're {overallProgress}% towards <span className="font-black text-[#1a1446]">{nextRankName} Rank!</span></>
                    )}
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 md:h-2.5 bg-[#e3dfff] rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-[#4f3ff0] rounded-full transition-all duration-700" style={{ width: `${Math.min(100, overallProgress)}%` }} />
                    </div>
                    <span className="text-[13px] md:text-[15px] font-black text-[#4f3ff0] shrink-0 min-w-[60px] text-right tabular-nums whitespace-nowrap">{overallProgress}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Criteria Header */}
            <div className="relative flex items-center gap-1.5 mt-1" ref={helpRef}>
              <h4 className="text-[15px] font-extrabold text-[#1a1446]">Qualification Criteria for {nextRankName}</h4>
              <button
                type="button"
                onClick={() => setShowCriteriaHelp((prev) => !prev)}
                aria-label="View criteria guide"
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer ${
                  showCriteriaHelp
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-200'
                    : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <Info className="w-3.5 h-3.5 transition-transform hover:scale-110" />
              </button>

              <AnimatePresence>
                {showCriteriaHelp && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full mb-2.5 left-0 z-50 w-[275px] bg-slate-900/95 backdrop-blur-md text-white rounded-xl p-3 shadow-xl border border-slate-700/60 text-left pointer-events-auto"
                  >
                    <div className="absolute -bottom-1 left-6 w-2.5 h-2.5 bg-slate-900 rotate-45 border-r border-b border-slate-700/60" />
                    <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                      <div className="flex items-center gap-1.5 text-[12px] font-bold text-white">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Advancement Rules</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowCriteriaHelp(false);
                        }}
                        className="p-0.5 rounded text-slate-400 hover:text-white"
                        aria-label="Close"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-normal pt-0.5">
                      All criteria milestones must be maintained concurrently. Once targets are completed, your {nextRankName} rank and privileges upgrade automatically.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Criteria List */}
            <div className="flex flex-col gap-3">
              {/* Criterion 1: Direct Level 1 Members */}
              <div className="border border-slate-100 rounded-[16px] p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-indigo-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-extrabold text-[#1a1446]">Direct Members</span>
                    <span className="text-[13px] font-extrabold text-[#1a1446]">{currentMembers} / {requiredMembers}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[12px] font-medium text-slate-500">Total Level 1 members</span>
                    <div className="w-[80px] sm:w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full transition-all duration-700" style={{ width: `${Math.min(100, memberPct)}%` }} />
                    </div>
                  </div>
                </div>
                <div className="sm:w-[120px] sm:border-l border-slate-100 sm:pl-4 pt-3 sm:pt-0 border-t sm:border-t-0 flex flex-col justify-center">
                  <span className="text-[12px] md:text-[13px] font-medium text-slate-500 leading-tight">
                    <span className="font-extrabold text-slate-700">{membersNeeded > 0 ? `${membersNeeded} more` : 'Completed'}</span><br />required
                  </span>
                </div>
              </div>

              {/* Criterion 2: Eligible Business */}
              <div className="border border-slate-100 rounded-[16px] p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-emerald-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Coins className="w-5 h-5" />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-extrabold text-[#1a1446]">Eligible Business Volume</span>
                    <span className="text-[13px] font-extrabold text-[#1a1446]">{formatCurrency(currentBusiness)} / {formatCurrency(requiredBusiness)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[12px] font-medium text-slate-500">Total turnover volume</span>
                    <div className="w-[80px] sm:w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${Math.min(100, businessPct)}%` }} />
                    </div>
                  </div>
                </div>
                <div className="sm:w-[120px] sm:border-l border-slate-100 sm:pl-4 pt-3 sm:pt-0 border-t sm:border-t-0 flex flex-col justify-center">
                  <span className="text-[12px] md:text-[13px] font-medium text-slate-500 leading-tight">
                    <span className="font-extrabold text-slate-700">{businessNeeded > 0 ? `${formatCurrency(businessNeeded)} more` : 'Completed'}</span><br />required
                  </span>
                </div>
              </div>

              {/* Criterion 3: Qualified Leaders */}
              <div className="border border-slate-100 rounded-[16px] p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-orange-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-extrabold text-[#1a1446]">Qualified Members</span>
                    <span className="text-[13px] font-extrabold text-[#1a1446]">{currentQualified} / {requiredQualified}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[12px] font-medium text-slate-500">Active package downlines</span>
                    <div className="w-[80px] sm:w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full transition-all duration-700" style={{ width: `${Math.min(100, qualifiedPct)}%` }} />
                    </div>
                  </div>
                </div>
                <div className="sm:w-[120px] sm:border-l border-slate-100 sm:pl-4 pt-3 sm:pt-0 border-t sm:border-t-0 flex flex-col justify-center">
                  <span className="text-[12px] md:text-[13px] font-medium text-slate-500 leading-tight">
                    <span className="font-extrabold text-slate-700">{qualifiedNeeded > 0 ? `${qualifiedNeeded} more` : 'Completed'}</span><br />required
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
                <h4 className="text-[14px] font-extrabold text-[#1a1446]">Next Rank: {nextRankName}</h4>
                <p className="text-[13px] font-medium text-slate-600 leading-relaxed">
                  Reach all qualification criteria to achieve {nextRankName} Rank and unlock higher commissions and exclusive tier rewards.
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
