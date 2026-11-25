import React from 'react';

const STATUS_STYLE = {
  Active: {
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  },
  Inactive: {
    dot: 'bg-rose-500',
    badge: 'bg-rose-50 text-rose-600 border-rose-200/80',
  },
  'Pending KYC': {
    dot: 'bg-amber-400',
    badge: 'bg-amber-50 text-amber-700 border-amber-200/80',
  },
  Suspended: {
    dot: 'bg-slate-400',
    badge: 'bg-slate-100 text-slate-600 border-slate-200/80',
  },
};

export default function GenealogyNodeCard({
  member,
  variant = 'level1', // 'upline' | 'root' | 'level1' | 'level2'
  isSelected = false,
  isSearchMatch = false,
  onClick,
  uplineBadgeText = 'Sponsor (Upline)',
}) {
  if (!member) return null;

  const statusStyle = STATUS_STYLE[member.status] || STATUS_STYLE.Active;
  const initials = member.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const highlightClasses = isSearchMatch
    ? 'ring-4 ring-amber-400/80 ring-offset-2 border-amber-400 shadow-xl scale-[1.03]'
    : isSelected
    ? 'ring-2 ring-indigo-500 ring-offset-2 border-indigo-500 shadow-[0_8px_25px_rgba(99,102,241,0.18)]'
    : '';

  const renderAvatar = (sizeClass) =>
    member.avatar ? (
      <img
        src={member.avatar}
        alt={member.name}
        className={`${sizeClass} rounded-full object-cover border border-slate-200/80 shadow-2xs shrink-0`}
        draggable={false}
      />
    ) : (
      <div
        className={`${sizeClass} rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-black text-xs flex items-center justify-center shrink-0`}
      >
        {initials}
      </div>
    );

  // 1. Upline Sponsor Dashed Card
  if (variant === 'upline') {
    return (
      <div className="relative pt-2.5">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 z-20 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200/90 text-[10px] font-bold text-slate-600 whitespace-nowrap shadow-2xs">
          {uplineBadgeText}
        </span>
        <button
          type="button"
          onClick={() => onClick?.(member)}
          className={`relative w-[205px] bg-white rounded-2xl border border-dashed border-slate-300 hover:border-indigo-400 hover:-translate-y-0.5 hover:shadow-md px-3 py-2.5 pt-3.5 flex items-center gap-2.5 text-left transition-all duration-200 cursor-pointer ${highlightClasses}`}
        >
          <span className={`absolute top-2 right-2 w-2 h-2 rounded-full ${statusStyle.dot}`} />
          {renderAvatar('w-9 h-9')}
          <div className="min-w-0 flex-1 pr-2">
            <h4 className="text-[12px] font-extrabold text-slate-900 truncate leading-tight">
              {member.name}
            </h4>
            <p className="text-[10px] font-semibold text-slate-500 mt-0.5">{member.id}</p>
            <div className="mt-1">
              <span
                className={`inline-block px-2 py-0.5 rounded-md text-[9.5px] font-bold border ${statusStyle.badge}`}
              >
                {member.status}
              </span>
            </div>
          </div>
        </button>
      </div>
    );
  }

  // 2. Root / Focused Member Card
  if (variant === 'root') {
    return (
      <button
        type="button"
        onClick={() => onClick?.(member)}
        className={`relative w-[220px] bg-white rounded-2xl border-2 border-indigo-500 hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(99,102,241,0.14)] hover:shadow-[0_10px_28px_rgba(99,102,241,0.22)] px-3 py-2.5 flex items-center gap-2.5 text-left transition-all duration-200 cursor-pointer ${
          isSearchMatch
            ? 'ring-4 ring-amber-400/80 ring-offset-2'
            : isSelected
            ? 'ring-2 ring-indigo-300 ring-offset-2'
            : ''
        }`}
      >
        <span className={`absolute top-2 right-2 w-2 h-2 rounded-full ${statusStyle.dot}`} />
        {renderAvatar('w-10 h-10')}
        <div className="min-w-0 flex-1 pr-2">
          <h4 className="text-[12.5px] font-black text-slate-900 truncate leading-tight">
            {member.name}
          </h4>
          <div className="flex items-center justify-between gap-1.5 mt-0.5">
            <p className="text-[10px] font-semibold text-slate-500">{member.id}</p>
            <span
              className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-bold border shrink-0 ${statusStyle.badge}`}
            >
              {member.status}
            </span>
          </div>
          <p className="text-[10px] font-semibold text-slate-600 mt-0.5">
            Package: <span className="font-bold text-slate-800">{member.package}</span>
          </p>
        </div>
      </button>
    );
  }

  // 3. Level 2 Compact Card
  if (variant === 'level2') {
    return (
      <button
        type="button"
        onClick={() => onClick?.(member)}
        className={`relative w-[82px] sm:w-[86px] bg-white rounded-xl border border-slate-200/90 hover:border-indigo-300 hover:-translate-y-1 hover:shadow-md p-1.5 pt-2 flex flex-col items-center text-center transition-all duration-200 cursor-pointer shadow-2xs ${highlightClasses}`}
      >
        <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
        {renderAvatar('w-7 h-7')}
        <h5 className="text-[10px] font-extrabold text-slate-900 truncate w-full mt-1 leading-tight">
          {member.name}
        </h5>
        <p className="text-[8.5px] font-semibold text-slate-500 mt-0.5">{member.id}</p>
        <span
          className={`mt-1 px-1.5 py-0.5 rounded-md text-[8px] font-bold border whitespace-nowrap ${statusStyle.badge}`}
        >
          {member.status}
        </span>
        <p className="text-[9px] font-semibold text-slate-600 mt-0.5 truncate w-full">
          {member.package}
        </p>
      </button>
    );
  }

  // 4. Default: Level 1 Direct Referral Card
  return (
    <button
      type="button"
      onClick={() => onClick?.(member)}
      className={`relative w-[144px] sm:w-[150px] bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 hover:-translate-y-1 hover:shadow-md p-2.5 flex flex-col items-center text-center transition-all duration-200 cursor-pointer shadow-xs ${highlightClasses}`}
    >
      <span className={`absolute top-2 right-2 w-2 h-2 rounded-full ${statusStyle.dot}`} />

      <div className="flex items-center gap-2 w-full text-left pr-2">
        {renderAvatar('w-8 h-8')}
        <div className="min-w-0 flex-1">
          <h4 className="text-[11.5px] font-extrabold text-slate-900 truncate leading-tight">
            {member.name}
          </h4>
          <p className="text-[9.5px] font-semibold text-slate-500 mt-0.5">{member.id}</p>
        </div>
      </div>

      <div className="mt-1.5 flex flex-col items-center gap-0.5 w-full">
        <span
          className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-bold border ${statusStyle.badge}`}
        >
          {member.status}
        </span>
        <p className="text-[10px] font-semibold text-slate-600 mt-0.5">
          Package: <span className="font-bold text-slate-800">{member.package}</span>
        </p>
        <p className="text-[9.5px] font-medium text-slate-500">
          Joined: {member.joinedShort || member.registrationDate?.split(',')[0]}
        </p>
      </div>
    </button>
  );
}
