import React from 'react';
import { Copy, Crown } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ReferralProfileCard({ t, profile }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(profile?.ReferralCode || t('common.loading'));
    toast.success(t('toast.referral.codeCopied'));
  };

  const fullName = profile?.FullName || t('common.loading');
  const avatarUrl = profile?.ProfilePicturePath 
    ? `${import.meta.env.VITE_API_URL}/${profile.ProfilePicturePath.replace(/\\/g, '/')}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`;

  const memberSince = profile?.CreatedDate 
    ? new Date(profile.CreatedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '...';

  return (
    <div className="relative overflow-hidden rounded-2xl p-5 lg:p-6 bg-gradient-to-br from-[#1a1446] to-[#2c1d8c] text-white flex flex-col justify-between shadow-[0_8px_30px_rgba(79,59,243,0.15)] hover:shadow-[0_8px_30px_rgba(79,59,243,0.3)] hover:-translate-y-1 transition-all duration-300 h-full group/card">
      {/* Background Decor */}
      <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 200C110.457 200 200 110.457 200 0V200H0Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="w-14 h-14 rounded-full border-2 border-indigo-400 overflow-hidden shrink-0 bg-indigo-900">
            <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-[18px] font-bold">{fullName}</h2>
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-amber-400 mt-1">
              <Crown className="w-3.5 h-3.5 fill-amber-400" />
              {t('myReferrals.goldRank')}
            </div>
          </div>
        </div>

        {/* Crown Hexagon Icon */}
        <div className="w-14 h-14 bg-gradient-to-b from-amber-300 to-amber-500 rounded-xl flex items-center justify-center transform rotate-12 shadow-lg group-hover/card:rotate-0 transition-transform duration-500">
          <Crown className="w-8 h-8 text-amber-900 -rotate-12 group-hover/card:rotate-0 transition-transform duration-500" />
        </div>
      </div>

      <div className="relative z-10 mt-4 lg:mt-5">
        <div className="text-[12px] text-indigo-200 mb-1.5">{t('myReferrals.referralCode')}</div>
        <div className="flex items-center gap-0 w-fit group cursor-pointer max-w-full" onClick={handleCopy}>
          <div className="border border-indigo-400/30 bg-[#1a1446]/60 backdrop-blur-md px-4 py-2 lg:py-2.5 rounded-l-xl text-[14px] lg:text-[15px] font-bold tracking-wider group-hover:bg-[#1a1446]/80 transition-all duration-300 truncate max-w-50">
            {profile?.ReferralCode || t('common.loading')}
          </div>
          <button className="border border-l-0 border-indigo-400/30 bg-[#1a1446]/60 group-hover:bg-[#4f3bf3] transition-all duration-300 px-3 lg:px-4 py-2 lg:py-2.5 rounded-r-xl flex items-center justify-center">
            <Copy className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-200 group-hover:text-white group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-3 text-[11px] lg:text-[12px] font-medium text-indigo-200">
        {t('myReferrals.memberSince')} {memberSince}
      </div>
    </div>
  );
}
