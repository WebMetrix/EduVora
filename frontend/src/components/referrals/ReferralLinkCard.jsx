import React from 'react';
import { Link2, Copy, Share2, ExternalLink, Lock } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ReferralLinkCard({ t, profile }) {
  const referralCode = profile?.ReferralCode || '';
  const link = referralCode ? `${window.location.origin}/register?ref=${referralCode}` : `${window.location.origin}/register`;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    toast.success(t('toast.referral.linkCopied'));
  };

  return (
    <div className="bg-white rounded-2xl p-4 lg:p-5 border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between h-full hover:-translate-y-1 group/card">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            <Link2 className="w-4 h-4 text-[#4f3bf3]" />
          </div>
          <h3 className="font-bold text-[#1a1446] text-[15px]">{t('myReferrals.yourReferralLink')}</h3>
        </div>

        <div className="flex items-center justify-between border border-slate-200 rounded-xl bg-slate-50 overflow-hidden mb-2.5">
          <div className="px-3 py-2 lg:px-4 lg:py-2.5 text-[13px] text-slate-600 font-medium truncate flex-1 select-none pointer-events-none">
            {link}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 mb-4">
          <Lock className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{t('myReferrals.linkEncryptedMsg')}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 lg:gap-3 mt-auto">
        <div className="flex justify-center gap-2 lg:gap-3 w-full">
          <button onClick={handleCopy} className="flex-1 bg-[#4f3bf3] hover:bg-indigo-700 text-white py-2 rounded-xl text-[12px] lg:text-[13px] font-bold flex items-center justify-center gap-1.5 lg:gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-indigo-500/30 active:scale-95 group">
            <Copy className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            {t('myReferrals.copyLink')}
          </button>
          <button className="flex-1 bg-white border border-indigo-200 text-[#4f3bf3] hover:bg-indigo-50 py-2 rounded-xl text-[12px] lg:text-[13px] font-bold flex items-center justify-center gap-1.5 lg:gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 group">
            <Share2 className="w-4 h-4 group-hover:-rotate-12 transition-transform duration-300" />
            {t('myReferrals.share')}
          </button>
        </div>
        <button className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 py-2 rounded-xl text-[12px] lg:text-[13px] font-bold flex items-center justify-center gap-1.5 lg:gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 group">
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          {t('myReferrals.openLink')}
        </button>
      </div>
    </div>
  );
}
