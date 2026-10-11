import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, Users, IndianRupee, UserCheck, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RankRequirementsModal({ isOpen, onClose }) {
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

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end md:items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal / Bottom Sheet Card */}
      <div
        className="w-full md:max-w-[480px] bg-white rounded-t-[28px] md:rounded-[24px] shadow-2xl relative z-10 flex flex-col max-h-[90vh] md:max-h-[85vh] overflow-hidden animate-slide-up md:animate-fade-in"
      >
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
                Platinum Qualification Guide
              </h3>
              <span className="text-[12px] font-semibold text-slate-500">
                Advancement rules & milestones
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
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
              To advance from <span className="font-extrabold text-amber-600">Gold</span> to <span className="font-extrabold text-indigo-600">Platinum Rank</span>, you must fulfill all 3 performance conditions simultaneously. Once reached, your rank upgrade is applied automatically!
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
                  <div>
                    <h4 className="text-[13px] font-extrabold text-slate-900 leading-tight">Level 1 Members</h4>
                    <p className="text-[11px] text-slate-500">Active direct referrals enrolled</p>
                  </div>
                </div>
                <span className="text-[13px] font-extrabold text-indigo-700">8 / 18</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full w-[44%]" />
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500">Target: 18 members</span>
                <span className="font-bold text-indigo-600">10 more required</span>
              </div>
            </div>

            {/* Requirement 2: Business Turnover */}
            <div className="border border-slate-100 bg-slate-50/60 rounded-2xl p-3.5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-extrabold text-slate-900 leading-tight">Eligible Turnover</h4>
                    <p className="text-[11px] text-slate-500">Cumulative direct business volume</p>
                  </div>
                </div>
                <span className="text-[13px] font-extrabold text-emerald-700">₹75,000 / ₹100,000</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full w-[75%]" />
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500">Target: ₹1,00,000</span>
                <span className="font-bold text-emerald-600">₹25,000 more required</span>
              </div>
            </div>

            {/* Requirement 3: Qualified Leaders */}
            <div className="border border-slate-100 bg-slate-50/60 rounded-2xl p-3.5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-extrabold text-slate-900 leading-tight">Qualified Leaders</h4>
                    <p className="text-[11px] text-slate-500">Direct partners reaching Silver+</p>
                  </div>
                </div>
                <span className="text-[13px] font-extrabold text-orange-700">3 / 5</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full w-[60%]" />
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500">Target: 5 Silver+ partners</span>
                <span className="font-bold text-orange-600">2 more required</span>
              </div>
            </div>
          </div>

          {/* Platinum Rewards Perk Callout */}
          <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-extrabold text-amber-950">Platinum Rank Privileges</span>
              <span className="text-[11px] font-medium text-amber-800 leading-snug">
                Unlocks 18% direct reward tier, priority payout processing, and exclusive profile recognition badge.
              </span>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 pb-6 sm:pb-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-[14px] font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all duration-200"
          >
            Got It
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
