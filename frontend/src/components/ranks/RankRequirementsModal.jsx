import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, Users, IndianRupee, UserCheck, Award } from 'lucide-react';
import { getRankTheme, formatCurrency } from '../../utils/rankHelper';

export default function RankRequirementsModal({ isOpen, onClose, rankSummary, ranksCatalog = [] }) {
  // Prevent body scrolling when modal is open
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

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end md:items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal / Bottom Sheet Card */}
      <div className="w-full md:max-w-[500px] bg-white rounded-t-[28px] md:rounded-[24px] shadow-2xl relative z-10 flex flex-col max-h-[90vh] md:max-h-[85vh] overflow-hidden animate-slide-up md:animate-fade-in">
        {/* Mobile Drag Handle */}
        <div 
          onClick={onClose}
          className="w-full flex justify-center pt-3 pb-1 md:hidden bg-white shrink-0 cursor-pointer"
        >
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
              <Sparkles className="w-5 h-5 text-indigo-100" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-[17px] font-extrabold text-[#1a1446] leading-tight">
                {nextRankName} Qualification Guide
              </h3>
              <span className="text-[12px] font-semibold text-slate-500">
                Advancement rules & milestones
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          {/* Overview Banner */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3.5">
            <p className="text-[13px] text-indigo-950 font-medium leading-relaxed">
              To advance from <span className="font-extrabold text-amber-600">{currentRankName}</span> to <span className="font-extrabold text-indigo-600">{nextRankName} Rank</span>, you must fulfill all qualification conditions. Once reached, your rank upgrade is applied automatically!
            </p>
          </div>

          {/* Criteria Breakdown Cards */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
              Current Milestone Status
            </span>

            {/* Requirement 1: Members */}
            <div className="border border-slate-100 bg-slate-50/60 rounded-2xl p-3.5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#1a1446]">Direct Members</span>
                    <span className="text-[11px] text-slate-500">Level 1 team size</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[13px] font-black text-[#1a1446]">{currentMembers} / {requiredMembers}</span>
                  <span className="block text-[11px] font-bold text-indigo-600">
                    {membersNeeded > 0 ? `${membersNeeded} needed` : 'Completed'}
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full transition-all duration-700" style={{ width: `${Math.min(100, memberPct)}%` }} />
              </div>
            </div>

            {/* Requirement 2: Eligible Business */}
            <div className="border border-slate-100 bg-slate-50/60 rounded-2xl p-3.5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#1a1446]">Turnover Volume</span>
                    <span className="text-[11px] text-slate-500">Eligible package sales</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[13px] font-black text-[#1a1446]">{formatCurrency(currentBusiness)} / {formatCurrency(requiredBusiness)}</span>
                  <span className="block text-[11px] font-bold text-emerald-600">
                    {businessNeeded > 0 ? `${formatCurrency(businessNeeded)} needed` : 'Completed'}
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full transition-all duration-700" style={{ width: `${Math.min(100, businessPct)}%` }} />
              </div>
            </div>

            {/* Requirement 3: Qualified Members */}
            <div className="border border-slate-100 bg-slate-50/60 rounded-2xl p-3.5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#1a1446]">Qualified Members</span>
                    <span className="text-[11px] text-slate-500">Active package holders</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[13px] font-black text-[#1a1446]">{currentQualified} / {requiredQualified}</span>
                  <span className="block text-[11px] font-bold text-orange-600">
                    {qualifiedNeeded > 0 ? `${qualifiedNeeded} needed` : 'Completed'}
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 rounded-full transition-all duration-700" style={{ width: `${Math.min(100, qualifiedPct)}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-2 pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#4f3bf3] text-white font-bold text-[13px] hover:bg-[#3f2ee6] transition-all shadow-md shadow-indigo-500/20 cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
