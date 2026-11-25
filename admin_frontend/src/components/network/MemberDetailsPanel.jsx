import React from 'react';
import { X, User, ExternalLink, GitFork } from 'lucide-react';

const STATUS_STYLE = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  Inactive: 'bg-rose-50 text-rose-600 border-rose-200/80',
  'Pending KYC': 'bg-amber-50 text-amber-700 border-amber-200/80',
  Suspended: 'bg-slate-100 text-slate-600 border-slate-200/80',
};

export default function MemberDetailsPanel({
  member,
  onClose,
  onViewFullProfile,
  onViewMemberTree,
  isCurrentRoot = false,
  isDrawer = false,
}) {
  if (!member) return null;

  const badgeClass = STATUS_STYLE[member.status] || STATUS_STYLE.Active;
  const initials = member.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const directCount =
    member.directReferrals !== undefined
      ? member.directReferrals
      : (member.children || []).length;

  const indirectCount =
    member.indirectReferrals !== undefined
      ? member.indirectReferrals
      : (member.children || []).reduce((acc, c) => acc + (c.children?.length || 0), 0);

  return (
    <div
      className={`relative bg-white transition-all duration-300 group flex flex-col ${
        isDrawer
          ? 'w-full h-full overflow-hidden'
          : 'rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.10)] hover:border-indigo-300 overflow-hidden'
      }`}
    >
      {/* Subtle ambient hover flare */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/8 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Compact Header matching Dashboard / User Management Pop-up & Side Panels */}
      <div className="relative z-10 px-4 sm:px-5 py-2.5 sm:py-3 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white/95 backdrop-blur-md">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
            <User className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <h2 className="text-[14px] sm:text-[15px] font-black text-slate-900 tracking-tight truncate">
            Member Details
          </h2>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700 cursor-pointer shrink-0"
            title="Close details"
            aria-label="Close member details"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Scrollable Body */}
      <div
        className={`relative z-10 p-3.5 sm:p-4 space-y-3 ${
          isDrawer ? 'flex-1 min-h-0 overflow-y-auto custom-scrollbar overscroll-contain' : ''
        }`}
      >
        {/* Identity Header */}
        <div className="flex items-center gap-3">
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100 shadow-xs shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-black text-sm flex items-center justify-center shrink-0">
              {initials}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[14.5px] sm:text-[15.5px] font-black text-slate-900 tracking-tight truncate">
                {member.name}
              </h3>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${badgeClass}`}
              >
                {member.status}
              </span>
            </div>
            <p className="text-[11.5px] font-bold text-slate-500 mt-0.5">{member.id}</p>
          </div>
        </div>

        {/* Key-Value Details */}
        <div className="space-y-2 pt-0.5 text-[11.5px]">
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
            <span className="text-slate-500 font-medium shrink-0">Package</span>
            <span className="text-slate-900 font-bold text-right">{member.package}</span>
          </div>
          <div className="flex items-start justify-between gap-3">
            <span className="text-slate-500 font-medium shrink-0">Registration Date</span>
            <span className="text-slate-900 font-semibold text-right">
              {member.registrationDate}
            </span>
          </div>
          <div className="flex items-start justify-between gap-3">
            <span className="text-slate-500 font-medium shrink-0">Sponsor</span>
            <span className="text-slate-900 font-semibold text-right">{member.sponsor}</span>
          </div>
          <div className="flex items-start justify-between gap-3">
            <span className="text-slate-500 font-medium shrink-0">Referral Code</span>
            <span className="text-slate-900 font-bold text-right">
              {member.referralCode || member.id}
            </span>
          </div>
        </div>

        {/* Referral Counts */}
        <div className="pt-2.5 border-t border-slate-100 space-y-2 text-[11.5px]">
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500 font-medium">Total Referrals</span>
            <span className="text-slate-900 font-black">
              {member.totalReferrals ?? directCount + indirectCount}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500 font-medium">Direct Referrals (Level 1)</span>
            <span className="text-slate-900 font-black">{directCount}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500 font-medium">Indirect Referrals (Level 2)</span>
            <span className="text-slate-900 font-black">{indirectCount}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-2.5 border-t border-slate-100 space-y-2">
          <h4 className="text-[12px] font-black text-slate-900 tracking-tight">
            Quick Actions
          </h4>

          <button
            type="button"
            onClick={() => onViewFullProfile?.(member)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200/90 bg-white hover:bg-indigo-50/60 hover:border-indigo-300 hover:text-indigo-700 active:scale-98 text-slate-800 text-[11.5px] font-bold shadow-2xs transition-all cursor-pointer"
          >
            <span>View Full Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
          </button>

          <button
            type="button"
            onClick={() => onViewMemberTree?.(member)}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-[11.5px] font-bold shadow-2xs transition-all cursor-pointer active:scale-98 ${
              isCurrentRoot
                ? 'border-indigo-200 bg-indigo-50/70 text-indigo-700 hover:bg-indigo-100/70'
                : 'border-slate-200/90 bg-white hover:bg-indigo-50/60 hover:border-indigo-300 hover:text-indigo-700 text-slate-800'
            }`}
          >
            <GitFork className="w-3.5 h-3.5 text-indigo-600" />
            <span>
              {isCurrentRoot ? "Viewing This Member's Tree" : "View This Member's Tree"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
