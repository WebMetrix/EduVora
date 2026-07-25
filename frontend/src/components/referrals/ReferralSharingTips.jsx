import React from 'react';
import { Lightbulb, ChevronRight } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaTelegram, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function ReferralSharingTips({ t }) {
  const tips = [
    { label: t('myReferrals.shareOnWhatsApp'), icon: FaWhatsapp, color: "text-[#25D366]", bg: "bg-[#25D366]/10" },
    { label: t('myReferrals.shareOnFacebook'), icon: FaFacebook, color: "text-[#1877F2]", bg: "bg-[#1877F2]/10" },
    { label: t('myReferrals.shareOnTelegram'), icon: FaTelegram, color: "text-[#0088cc]", bg: "bg-[#0088cc]/10" },
    { label: t('myReferrals.shareOnInstagram'), icon: FaInstagram, color: "text-[#E4405F]", bg: "bg-[#E4405F]/10" },
    { label: t('myReferrals.shareOnLinkedIn'), icon: FaLinkedin, color: "text-[#0A66C2]", bg: "bg-[#0A66C2]/10" }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1 group/card h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 lg:mb-6">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
          <Lightbulb className="w-4 h-4 text-[#4f3bf3]" />
        </div>
        <h3 className="font-bold text-[#1a1446] text-[15px]">{t('myReferrals.sharingTips')}</h3>
      </div>
      
      <div className="flex flex-col gap-2.5 mt-auto">
        {tips.map((tip, idx) => (
          <button key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-slate-50 hover:border-indigo-100 transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${tip.bg}`}>
                <tip.icon className={`w-4 h-4 ${tip.color}`} />
              </div>
              <span className="text-[13px] font-bold text-slate-700 group-hover:text-[#4f3bf3] transition-colors">{tip.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#4f3bf3] group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}
