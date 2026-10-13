import React, { useState } from 'react';
import { Wallet, CircleDollarSign, Clock, CreditCard, Info, FileText, CheckCircle2, XCircle } from 'lucide-react';

export default function PayoutStats({ stats, type = 'history', requestStats }) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Default stats for Payout History view
  const defaultHistoryStats = {
    totalEarnings: 25480.00,
    totalPaidOut: 18200.00,
    pendingPayouts: 4650.00,
    availableBalance: 2630.00,
    ...stats
  };

  // Default stats for Payout Requests view (matching the reference screenshot: 12 Total, 8 Approved, 2 Pending, 2 Rejected)
  const defaultRequestStats = {
    totalRequests: 12,
    approved: 8,
    pending: 2,
    rejected: 2,
    ...requestStats
  };

  const historyCards = [
    {
      id: 'earnings',
      title: 'Total Earnings',
      value: `₹ ${Number(defaultHistoryStats.totalEarnings).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: 'All-time commission earned',
      icon: <Wallet className="w-6 h-6 sm:w-7 sm:h-7 text-[#4f3bf3]" />,
      bg: 'bg-indigo-50 border border-indigo-100',
      tooltip: 'Total cumulative commission and affiliate earnings earned to date.'
    },
    {
      id: 'paidOut',
      title: 'Total Paid Out',
      value: `₹ ${Number(defaultHistoryStats.totalPaidOut).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: 'Successfully transferred',
      icon: <CircleDollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />,
      bg: 'bg-emerald-50 border border-emerald-100',
      tooltip: 'Total amount successfully credited to your bank or payout accounts.'
    },
    {
      id: 'pending',
      title: 'Pending Payouts',
      value: `₹ ${Number(defaultHistoryStats.pendingPayouts).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: 'Under verification / processing',
      icon: <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500" />,
      bg: 'bg-amber-50 border border-amber-100',
      tooltip: 'Payout requests currently under verification or bank processing.'
    },
    {
      id: 'available',
      title: 'Available Balance',
      value: `₹ ${Number(defaultHistoryStats.availableBalance).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: 'Eligible for instant withdrawal',
      icon: <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-sky-600" />,
      bg: 'bg-sky-50 border border-sky-100',
      tooltip: 'Current eligible balance ready to be withdrawn anytime (min ₹500.00).'
    }
  ];

  const requestCards = [
    {
      id: 'totalRequests',
      title: 'Total Requests',
      value: String(defaultRequestStats.totalRequests),
      subtitle: 'Submitted payout requests',
      icon: <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-[#4f3bf3]" />,
      bg: 'bg-indigo-50 border border-indigo-100',
      tooltip: 'Total withdrawal requests submitted across all payout methods.'
    },
    {
      id: 'approvedRequests',
      title: 'Approved',
      value: String(defaultRequestStats.approved),
      subtitle: 'Successfully approved & paid',
      icon: <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />,
      bg: 'bg-emerald-50 border border-emerald-100',
      tooltip: 'Requests successfully approved, processed, and disbursed to your account.'
    },
    {
      id: 'pendingRequests',
      title: 'Pending',
      value: String(defaultRequestStats.pending),
      subtitle: 'Under verification / review',
      icon: <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500" />,
      bg: 'bg-amber-50 border border-amber-100',
      tooltip: 'Requests currently pending bank clearance or compliance verification.'
    },
    {
      id: 'rejectedRequests',
      title: 'Rejected',
      value: String(defaultRequestStats.rejected),
      subtitle: 'Declined with remarks',
      icon: <XCircle className="w-6 h-6 sm:w-7 sm:h-7 text-rose-500" />,
      bg: 'bg-rose-50 border border-rose-100',
      tooltip: 'Requests declined due to KYC issues, incorrect details, or bank returns.'
    }
  ];

  const statCards = type === 'requests' ? requestCards : historyCards;

  return (
    <div className="relative rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl p-4 sm:p-5 lg:p-6 border border-indigo-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group/card transition-all duration-300 hover:border-indigo-200">
      {/* Decorative background flare matching EduVora master card design */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

      {/* 4 Cards Grid - 1 col on xs, 2 col on sm, 4 col on xl */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
        {statCards.map((card) => {
          const isTooltipOpen = activeTooltip === card.id;

          return (
            <div
              key={card.id}
              className="relative flex items-center gap-3.5 sm:gap-4 bg-white p-4 sm:p-4.5 rounded-2xl border border-indigo-100/80 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-300 group/stat"
            >
              {/* Icon Box */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/stat:scale-110 shadow-2xs ${card.bg}`}>
                {card.icon}
              </div>

              {/* Info Content */}
              <div className="flex flex-col min-w-0 flex-1 pr-6">
                {/* Title */}
                <div className="text-[12.5px] sm:text-[13px] font-bold text-slate-700 leading-snug truncate">
                  {card.title}
                </div>

                {/* Value */}
                <div className="text-[20px] sm:text-[24px] 2xl:text-[26px] font-black text-slate-900 tracking-tight leading-tight mt-0.5 truncate">
                  {card.value}
                </div>

                {/* Subtitle description */}
                <div className="text-[11px] font-medium text-slate-400 leading-snug mt-0.5 truncate">
                  {card.subtitle}
                </div>
              </div>

              {/* Interactive Info Button & Floating Tooltip */}
              <div
                className="absolute top-3 right-3 z-30"
                onMouseEnter={() => setActiveTooltip(card.id)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTooltip(isTooltipOpen ? null : card.id);
                  }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isTooltipOpen
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-indigo-600 hover:bg-indigo-50/80'
                  }`}
                  aria-label={`About ${card.title}`}
                  title={card.tooltip}
                >
                  <Info className="w-3.5 h-3.5" />
                </button>

                {/* Floating Tooltip Popover */}
                {isTooltipOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 z-50 w-56 sm:w-60 p-3 bg-slate-900/95 backdrop-blur-md text-white text-[11.5px] rounded-xl shadow-2xl border border-slate-700/60 leading-relaxed font-medium pointer-events-none animate-in fade-in zoom-in-95 duration-150 text-left"
                    style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.35))' }}
                  >
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-300 mb-1">
                      {card.title}
                    </div>
                    <div className="text-slate-200 leading-snug">
                      {card.tooltip}
                    </div>
                    {/* Triangle pointer */}
                    <div className="absolute -top-1.5 right-2 w-3 h-3 bg-slate-900/95 rotate-45 border-t border-l border-slate-700/60" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
