import React from 'react';
import { Lightbulb, ChevronRight } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaTelegram, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ReferralSharingTips({ t, profile }) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const referralCode = profile?.ReferralCode || '';
  const baseUrl = import.meta.env.VITE_REFERRAL_URL;
  const url = referralCode ? `${baseUrl}?ref=${referralCode}` : baseUrl;
  const text = "Join EduVora using my referral!";

  const handleShare = async (platform) => {
    switch (platform) {
      case 'whatsapp': {
        const whatsappMsg = `${text} ${url}`;
        window.open(
          isMobile
            ? `https://wa.me/?text=${encodeURIComponent(whatsappMsg)}`
            : `https://web.whatsapp.com/send?text=${encodeURIComponent(whatsappMsg)}`,
          '_blank'
        );
        break;
      }
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'instagram':
        if (isMobile && navigator.share) {
          try {
            await navigator.share({ title: "EduVora", text, url });
          } catch (err) {
            if (err.name !== 'AbortError') console.error('Share failed', err);
          }
        } else {
          navigator.clipboard.writeText(url);
          toast.info("Link copied! Paste it in your Instagram messages.");
          window.open('https://www.instagram.com/direct/inbox/', '_blank');
        }
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        break;
    }
  };

  const tips = [
    { id: 'whatsapp', label: t('myReferrals.shareOnWhatsApp'), icon: FaWhatsapp, color: "text-[#25D366]", bg: "bg-[#25D366]/10", borderColor: "border-[#25D366]/30", hoverShadow: "hover:shadow-lg hover:border-[#25D366]/50" },
    { id: 'facebook', label: t('myReferrals.shareOnFacebook'), icon: FaFacebook, color: "text-[#1877F2]", bg: "bg-[#1877F2]/10", borderColor: "border-[#1877F2]/30", hoverShadow: "hover:shadow-lg hover:border-[#1877F2]/50" },
    { id: 'telegram', label: t('myReferrals.shareOnTelegram'), icon: FaTelegram, color: "text-[#0088cc]", bg: "bg-[#0088cc]/10", borderColor: "border-[#0088cc]/30", hoverShadow: "hover:shadow-lg hover:border-[#0088cc]/50" },
    { id: 'instagram', label: t('myReferrals.shareOnInstagram'), icon: FaInstagram, color: "text-[#E4405F]", bg: "bg-[#E4405F]/10", borderColor: "border-[#E4405F]/30", hoverShadow: "hover:shadow-lg hover:border-[#E4405F]/50" },
    { id: 'linkedin', label: t('myReferrals.shareOnLinkedIn'), icon: FaLinkedin, color: "text-[#0A66C2]", bg: "bg-[#0A66C2]/10", borderColor: "border-[#0A66C2]/30", hoverShadow: "hover:shadow-lg hover:border-[#0A66C2]/50" }
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl p-3 lg:p-3 border border-indigo-100/60 shadow-sm group/card h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-indigo-200">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none transition-colors duration-700" />

      <div className="relative z-10 flex items-center mb-2 lg:mb-3">
        <h3 className="font-bold text-[#1a1446] text-[14px] lg:text-[15px]">{t('myReferrals.sharingTips')}</h3>
      </div>

      <div className="relative z-10 flex flex-col justify-center gap-1.5 lg:gap-1.5">
        {tips.map((tip, idx) => (
          <button onClick={() => handleShare(tip.id)} key={idx} className={`flex items-center justify-between py-1 px-3 lg:py-1.5 lg:px-3 rounded-xl border bg-white hover:-translate-y-1 transition-all duration-300 group shadow-sm ${tip.borderColor} ${tip.hoverShadow}`}>
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${tip.bg}`}>
                <tip.icon className={`w-3 h-3 lg:w-3.5 lg:h-3.5 ${tip.color}`} />
              </div>
              <span className="text-[11px] lg:text-[12px] font-bold text-slate-700 group-hover:text-[#4f3bf3] transition-colors">{tip.label}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#4f3bf3] group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}
