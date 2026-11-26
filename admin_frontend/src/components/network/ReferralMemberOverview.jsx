import React, { useState } from 'react';
import {
  User, ShieldCheck, BarChart2, Users, GitFork, Copy, Check, ExternalLink, CheckCircle2
} from 'lucide-react';

export default function ReferralMemberOverview({ member, onViewSponsorProfile }) {
  const [copied, setCopied] = useState(false);

  if (!member) return null;

  const handleCopy = () => {
    if (!member.referralLink) return;
    navigator.clipboard.writeText(member.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderAvatar = (person) => {
    const initials = person.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    return person.avatar ? (
      <img
        src={person.avatar}
        alt={person.name}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-indigo-100 shadow-xs shrink-0"
      />
    ) : (
      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-black text-base flex items-center justify-center shrink-0">
        {initials}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
      {/* Column 1: Member Information */}
      <div className="lg:col-span-4 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full">
        <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-400/8 rounded-full blur-[65px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <User className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h3 className="text-[14.5px] sm:text-[15.5px] font-black text-slate-900 tracking-tight">
              Member Information
            </h3>
          </div>

          {/* Identity */}
          <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
            {renderAvatar(member)}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-[15px] sm:text-[16px] font-black text-slate-900 tracking-tight truncate">
                  {member.name}
                </h4>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  {member.accountStatus}
                </span>
              </div>
              <p className="text-[12px] font-bold text-slate-500 mt-0.5">{member.id}</p>
            </div>
          </div>

          {/* Info Rows */}
          <div className="space-y-2.5 pt-3.5 text-[12px] flex-1">
            <div className="flex items-start justify-between gap-3">
              <span className="text-slate-500 font-medium shrink-0">Full Name</span>
              <span className="text-slate-900 font-bold text-right">{member.name}</span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-slate-500 font-medium shrink-0">Email</span>
              <span className="text-slate-900 font-semibold text-right break-all">
                {member.email}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-slate-500 font-medium shrink-0">Mobile</span>
              <span className="text-slate-900 font-semibold text-right">{member.mobile}</span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-slate-500 font-medium shrink-0">Registration Date</span>
              <span className="text-slate-900 font-semibold text-right">
                {member.registrationDate}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-slate-500 font-medium shrink-0">Package</span>
              <span className="text-slate-900 font-bold text-right">{member.package}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium shrink-0">Account Status</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {member.accountStatus}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium shrink-0">KYC Status</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {member.kycStatus}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium shrink-0">Referral Code</span>
              <span className="text-slate-900 font-bold text-right">{member.referralCode}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
              <span className="text-slate-500 font-medium shrink-0">Referral Link</span>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/90 rounded-lg px-2.5 py-1.5 min-w-0 max-w-full sm:max-w-[230px]">
                <span className="text-[11px] font-semibold text-slate-700 truncate">
                  {member.referralLink}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-indigo-600 hover:text-indigo-800 shrink-0 cursor-pointer p-0.5 rounded hover:bg-indigo-50 transition-colors"
                  title="Copy referral link"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Column 2: Sponsor Information */}
      <div className="lg:col-span-4 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full">
        <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-400/8 rounded-full blur-[65px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <User className="w-4 h-4 stroke-[2.2]" />
              </div>
              <h3 className="text-[14.5px] sm:text-[15.5px] font-black text-slate-900 tracking-tight">
                Sponsor Information
              </h3>
            </div>

            {/* Identity */}
            <div className="flex items-center justify-between gap-2.5 flex-wrap pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3 min-w-0">
                {renderAvatar(member.sponsorInfo)}
                <div className="min-w-0">
                  <h4 className="text-[15px] sm:text-[16px] font-black text-slate-900 tracking-tight truncate">
                    {member.sponsorInfo.name}
                  </h4>
                  <p className="text-[12px] font-bold text-slate-500 mt-0.5">
                    {member.sponsorInfo.id}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-[10.5px] font-bold whitespace-nowrap shrink-0">
                Sponsor (Upline)
              </span>
            </div>

            {/* Sponsor Info Rows */}
            <div className="space-y-2.5 pt-3.5 text-[12px]">
              <div className="flex items-start justify-between gap-3">
                <span className="text-slate-500 font-medium shrink-0">Full Name</span>
                <span className="text-slate-900 font-bold text-right">
                  {member.sponsorInfo.name}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-slate-500 font-medium shrink-0">Email</span>
                <span className="text-slate-900 font-semibold text-right break-all">
                  {member.sponsorInfo.email}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-slate-500 font-medium shrink-0">Mobile</span>
                <span className="text-slate-900 font-semibold text-right">
                  {member.sponsorInfo.mobile}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-slate-500 font-medium shrink-0">Package</span>
                <span className="text-slate-900 font-bold text-right">
                  {member.sponsorInfo.package}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-slate-500 font-medium shrink-0">Registration Date</span>
                <span className="text-slate-900 font-semibold text-right">
                  {member.sponsorInfo.registrationDate}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500 font-medium shrink-0">Account Status</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {member.sponsorInfo.accountStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Action Button */}
          <div className="pt-4 mt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onViewSponsorProfile?.(member.sponsorInfo)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200/90 bg-white hover:bg-indigo-50/70 hover:border-indigo-300 hover:text-indigo-700 active:scale-98 text-slate-800 text-[12px] font-bold shadow-2xs transition-all cursor-pointer"
            >
              <span>View Sponsor Profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Column 3: Referral Summary (Top) + Referral Status (Bottom) */}
      <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5 h-full">
        {/* Top Card: Referral Summary */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-400/8 rounded-full blur-[55px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <BarChart2 className="w-4 h-4 stroke-[2.2]" />
              </div>
              <h3 className="text-[14.5px] sm:text-[15.5px] font-black text-slate-900 tracking-tight">
                Referral Summary
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Direct Referrals */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-emerald-50/50 backdrop-blur-xl border border-emerald-100/80 p-2 sm:p-2.5 xl:p-3 shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgb(16,185,129,0.14)] hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-300 group/tile flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 xl:w-9 xl:h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs group-hover/tile:scale-110 group-hover/tile:rotate-3 transition-all duration-300">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-[10.5px] font-semibold text-slate-500 group-hover/tile:text-slate-700 leading-tight transition-colors">
                    Direct Referrals
                    <span className="block text-[9px] sm:text-[9.5px] text-slate-400">(Level 1)</span>
                  </p>
                  <p className="text-[15px] sm:text-[16px] xl:text-[18px] font-black text-slate-900 leading-none mt-1">
                    {member.summary.direct}
                  </p>
                </div>
              </div>

              {/* Indirect Referrals */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-orange-50/50 backdrop-blur-xl border border-orange-100/80 p-2 sm:p-2.5 xl:p-3 shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgb(249,115,22,0.14)] hover:border-orange-300 hover:-translate-y-0.5 transition-all duration-300 group/tile flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 xl:w-9 xl:h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 shadow-2xs group-hover/tile:scale-110 group-hover/tile:rotate-3 transition-all duration-300">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-[10.5px] font-semibold text-slate-500 group-hover/tile:text-slate-700 leading-tight transition-colors">
                    Indirect Referrals
                    <span className="block text-[9px] sm:text-[9.5px] text-slate-400">(Level 2)</span>
                  </p>
                  <p className="text-[15px] sm:text-[16px] xl:text-[18px] font-black text-slate-900 leading-none mt-1">
                    {member.summary.indirect}
                  </p>
                </div>
              </div>

              {/* Total Referrals */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-purple-50/50 backdrop-blur-xl border border-purple-100/80 p-2 sm:p-2.5 xl:p-3 shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgb(139,92,246,0.14)] hover:border-purple-300 hover:-translate-y-0.5 transition-all duration-300 group/tile flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 xl:w-9 xl:h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-2xs group-hover/tile:scale-110 group-hover/tile:rotate-3 transition-all duration-300">
                  <GitFork className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-[10.5px] font-semibold text-slate-500 group-hover/tile:text-slate-700 leading-tight transition-colors">
                    Total Referrals
                  </p>
                  <p className="text-[15px] sm:text-[16px] xl:text-[18px] font-black text-slate-900 leading-none mt-1.5">
                    {member.summary.total}
                  </p>
                </div>
              </div>

              {/* Total Earnings */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-sky-50/50 backdrop-blur-xl border border-sky-100/80 p-2 sm:p-2.5 xl:p-3 shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgb(14,165,233,0.14)] hover:border-sky-300 hover:-translate-y-0.5 transition-all duration-300 group/tile flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 xl:w-9 xl:h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 font-black text-[12px] sm:text-[13px] shadow-2xs group-hover/tile:scale-110 group-hover/tile:rotate-3 transition-all duration-300">
                  ₹
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-[10.5px] font-semibold text-slate-500 group-hover/tile:text-slate-700 leading-tight transition-colors">
                    Total Earnings
                  </p>
                  <p className="text-[13.5px] sm:text-[14.5px] xl:text-[16px] font-black text-slate-900 leading-tight mt-1.5 whitespace-nowrap">
                    {member.summary.earnings}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Card: Referral Status */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex-1 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-400/8 rounded-full blur-[55px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
              </div>
              <h3 className="text-[14.5px] sm:text-[15.5px] font-black text-slate-900 tracking-tight">
                Referral Status
              </h3>
            </div>

            <div className="space-y-2.5 text-[12px]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-500 font-medium">Referral Relationship</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {member.referralStatus.relationship}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-500 font-medium">Has Sponsor</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {member.referralStatus.hasSponsor}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-500 font-medium">Sponsor Active</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {member.referralStatus.sponsorActive}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-500 font-medium">Eligible for Commission</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {member.referralStatus.eligible}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-500 font-medium">Relationship Level</span>
                <span className="inline-flex items-center gap-1.5 text-indigo-700 font-bold">
                  <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" />
                  {member.referralStatus.level}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
