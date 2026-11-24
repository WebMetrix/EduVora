import React, { useState } from 'react';
import { Users, Copy, Check } from 'lucide-react';

export default function ReferralInformationCard({ referralData }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (referralData?.referralLink) {
      navigator.clipboard.writeText(referralData.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.08)] hover:border-indigo-200 transition-all duration-300 group">
      {/* Glow flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100/90 mb-5">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
          <Users className="w-4 h-4 text-indigo-600" />
        </div>
        <h3 className="text-[15px] font-extrabold text-slate-900 tracking-tight">
          Referral Information
        </h3>
      </div>

      <div className="space-y-3.5">
        {/* Referral ID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
          <label className="text-[11.5px] font-bold text-slate-700">
            Referral ID
          </label>
          <div className="sm:col-span-2 bg-slate-100/70 border border-slate-200/80 rounded-xl px-3.5 py-2 text-[12.5px] font-semibold text-slate-700">
            {referralData.referralId}
          </div>
        </div>

        {/* Referred By */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
          <label className="text-[11.5px] font-bold text-slate-700">
            Referred By
          </label>
          <div className="sm:col-span-2 bg-slate-100/70 border border-slate-200/80 rounded-xl px-3.5 py-2 text-[12.5px] font-semibold text-slate-700 truncate">
            {referralData.referredBy}
          </div>
        </div>

        {/* Referral Link */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
          <label className="text-[11.5px] font-bold text-slate-700">
            Referral Link
          </label>
          <div className="sm:col-span-2 flex items-center justify-between gap-2 bg-slate-100/70 border border-slate-200/80 rounded-xl px-3.5 py-1.5 text-[12px] font-semibold text-slate-700">
            <span className="truncate">{referralData.referralLink}</span>
            <button
              type="button"
              onClick={handleCopyLink}
              title="Copy referral link"
              className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white transition-colors shrink-0 cursor-pointer"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
              ) : (
                <Copy className="w-4 h-4 stroke-[2]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
