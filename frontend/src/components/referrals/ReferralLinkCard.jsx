import React from 'react';
import { Link2, Copy, Share2, ExternalLink, Lock } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ReferralLinkCard({ t }) {
  const link = "https://learnnet.com/register?ref=U2FsdGVkX1+7q9JkLmN8pQ==";

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    toast.success("Referral link copied!");
  };

  return (
    <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between h-full hover:-translate-y-1 group/card">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            <Link2 className="w-4 h-4 text-[#4f3bf3]" />
          </div>
          <h3 className="font-bold text-[#1a1446] text-[15px]">{t('myReferrals.yourReferralLink')}</h3>
        </div>

        <div className="flex items-center justify-between border border-slate-200 rounded-xl bg-slate-50 overflow-hidden mb-3">
          <div className="px-4 py-3 text-[13px] text-slate-600 font-medium truncate flex-1 select-all">
            {link}
          </div>
          <button onClick={handleCopy} className="p-3 text-[#4f3bf3] hover:bg-indigo-100 transition-colors border-l border-slate-200 shrink-0">
            <Copy className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 mb-6">
          <Lock className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{t('myReferrals.linkEncryptedMsg')}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
        <button onClick={handleCopy} className="flex-1 bg-[#4f3bf3] hover:bg-indigo-700 text-white py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 transition-colors">
          <Copy className="w-4 h-4" />
          {t('myReferrals.copyLink')}
        </button>
        <button className="flex-1 bg-white border border-indigo-200 text-[#4f3bf3] hover:bg-indigo-50 py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 transition-colors">
          <Share2 className="w-4 h-4" />
          {t('myReferrals.share')}
        </button>
        <button className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 transition-colors">
          <ExternalLink className="w-4 h-4" />
          {t('myReferrals.openLink')}
        </button>
      </div>
    </div>
  );
}
