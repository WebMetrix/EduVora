import React from 'react';
import { Link2, Copy, Share2, ExternalLink, Lock } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ReferralLinkCard({ t, profile }) {
  const referralCode = profile?.ReferralCode || '';
  const baseUrl = import.meta.env.VITE_REFERRAL_URL;
  const link = referralCode ? `${baseUrl}?ref=${referralCode}` : baseUrl;

  const handleCopy = () => {
    const textToCopy = link;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy);
      toast.success(t('toast.referral.linkCopied'));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        toast.success(t('toast.referral.linkCopied'));
      } catch (error) {
        toast.error('Failed to copy link');
      }
      textArea.remove();
    }
  };


  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl p-5 lg:p-6 border border-indigo-100/60 shadow-sm group/card transition-all duration-300 hover:shadow-none hover:border-indigo-200 flex flex-col justify-center gap-6 h-full hover:-translate-y-1">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />
      
      <div className="relative z-10">
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

      <div className="relative z-10 flex flex-col gap-2 lg:gap-3 mt-auto">
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
      </div>
    </div>
  );
}
