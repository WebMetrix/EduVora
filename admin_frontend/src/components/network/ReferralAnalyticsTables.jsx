import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy, AlertTriangle, Eye, ChevronRight, ChevronLeft
} from 'lucide-react';

export default function ReferralAnalyticsTables({
  sponsors = [],
  exceptions = [],
  onViewSponsor,
  onViewException,
}) {
  const [sponsorPage, setSponsorPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(sponsors.length / pageSize));
  const safePage = Math.min(sponsorPage, totalPages);
  const pagedSponsors = sponsors.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
      {/* Left: Top Performing Sponsors */}
      <div className="lg:col-span-8 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full">
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-400/8 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header */}
          <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                <Trophy className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-[14.5px] sm:text-[15.5px] font-black text-slate-900 tracking-tight leading-tight">
                  Top Performing Sponsors
                </h3>
                <p className="text-[11.5px] text-slate-500 font-medium mt-0.5">
                  Members who have brought the most referrals to the platform.
                </p>
              </div>
            </div>

            <Link
              to="/network/referral-details"
              className="inline-flex items-center gap-1 text-[12px] font-bold text-indigo-600 hover:text-indigo-800 shrink-0 transition-colors"
            >
              <span>View Details</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Desktop Table (compact 2-line headers so zero horizontal scroll) */}
          <div className="hidden md:block flex-1">
            <table className="w-full text-left text-[11.5px]">
              <thead>
                <tr className="border-b border-slate-200/60 text-slate-500 font-bold bg-slate-50/50 leading-tight">
                  <th className="py-2.5 pl-4 pr-1.5 font-semibold w-7">#</th>
                  <th className="py-2.5 px-2 font-semibold">Sponsor ID</th>
                  <th className="py-2.5 px-2 font-semibold">Sponsor Name</th>
                  <th className="py-2.5 px-2 font-semibold text-center">
                    Direct Referrals
                    <span className="block text-[10px] font-medium text-slate-400">(Level 1)</span>
                  </th>
                  <th className="py-2.5 px-2 font-semibold text-center">
                    Level 2
                    <span className="block text-[10px] font-medium text-slate-400">Members</span>
                  </th>
                  <th className="py-2.5 px-2 font-semibold text-center">
                    Activated
                    <span className="block text-[10px] font-medium text-slate-400">Referrals</span>
                  </th>
                  <th className="py-2.5 px-2 font-semibold text-center">
                    Activation
                    <span className="block text-[10px] font-medium text-slate-400">Rate</span>
                  </th>
                  <th className="py-2.5 px-2 font-semibold">
                    Registration
                    <span className="block text-[10px] font-medium text-slate-400">Period</span>
                  </th>
                  <th className="py-2.5 pl-2 pr-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-100/30">
                {pagedSponsors.length > 0 ? (
                  pagedSponsors.map((row, idx) => (
                    <tr
                      key={row.id}
                      className="group/row border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300"
                    >
                      <td className="py-2.5 pl-4 pr-1.5 font-semibold text-slate-500">
                        {(safePage - 1) * pageSize + idx + 1}
                      </td>
                      <td className="py-2.5 px-2 font-bold text-slate-700 whitespace-nowrap">
                        {row.id}
                      </td>
                      <td className="py-2.5 px-2 font-extrabold text-slate-900 group-hover/row:text-indigo-600 transition-colors">
                        {row.name}
                      </td>
                      <td className="py-2.5 px-2 font-black text-slate-800 text-center">
                        {row.direct}
                      </td>
                      <td className="py-2.5 px-2 font-bold text-slate-700 text-center">
                        {row.level2}
                      </td>
                      <td className="py-2.5 px-2 font-bold text-slate-800 text-center">
                        {row.activated}
                      </td>
                      <td className="py-2.5 px-2 font-black text-emerald-600 text-center">
                        {row.rate}
                      </td>
                      <td className="py-2.5 px-2 text-slate-600 font-medium whitespace-nowrap">
                        {row.period}
                      </td>
                      <td className="py-2.5 pl-2 pr-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onViewSponsor?.(row)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-indigo-200/80 bg-white hover:bg-indigo-50 text-indigo-700 text-[10.5px] font-bold shadow-2xs transition-all cursor-pointer"
                        >
                          <span>View</span>
                          <Eye className="w-3 h-3 text-indigo-600" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-400 font-semibold">
                      No matching sponsors found for the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards (< md) */}
          <div className="md:hidden p-3.5 space-y-3 flex-1">
            {pagedSponsors.length > 0 ? (
              pagedSponsors.map((row) => (
                <div
                  key={row.id}
                  className="p-3.5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-2.5 hover:border-indigo-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-[13px] font-black text-slate-900">{row.name}</h4>
                      <p className="text-[11px] font-semibold text-slate-500">
                        {row.id} • {row.period}
                      </p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {row.rate} Rate
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center bg-slate-50/80 rounded-xl p-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 text-[10px] font-medium block">Level 1</span>
                      <span className="font-black text-slate-900">{row.direct}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] font-medium block">Level 2</span>
                      <span className="font-black text-slate-900">{row.level2}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] font-medium block">Activated</span>
                      <span className="font-black text-indigo-700">{row.activated}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onViewSponsor?.(row)}
                    className="w-full py-2 rounded-xl border border-indigo-200 bg-indigo-50/40 hover:bg-indigo-100/70 text-indigo-700 text-[11.5px] font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Sponsor Analytics</span>
                  </button>
                </div>
              ))
            ) : (
              <p className="py-6 text-center text-[12px] text-slate-400 font-semibold">
                No matching sponsors found.
              </p>
            )}
          </div>
        </div>

        {/* Footer Pagination */}
        <div className="relative z-10 px-4 sm:px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-3 text-[11.5px] text-slate-500">
          <span className="font-medium">
            Showing {sponsors.length === 0 ? 0 : (safePage - 1) * pageSize + 1} to{' '}
            {Math.min(safePage * pageSize, sponsors.length)} of {sponsors.length} entries
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setSponsorPage((p) => Math.max(1, p - 1))}
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
              <button
                key={pNum}
                type="button"
                onClick={() => setSponsorPage(pNum)}
                className={`w-7 h-7 rounded-lg text-[11.5px] font-bold flex items-center justify-center cursor-pointer transition-colors ${
                  safePage === pNum
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {pNum}
              </button>
            ))}
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setSponsorPage((p) => Math.min(totalPages, p + 1))}
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Referral Exceptions */}
      <div className="lg:col-span-4 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full">
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-400/8 rounded-full blur-[65px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header */}
          <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between gap-2.5">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                <AlertTriangle className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[14.5px] sm:text-[15.5px] font-black text-slate-900 tracking-tight leading-tight">
                  Referral Exceptions
                </h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                  Issues in referral relationships that require review.
                </p>
              </div>
            </div>

            <Link
              to="/network/referral-exceptions"
              className="text-[11.5px] font-bold text-indigo-600 hover:text-indigo-800 shrink-0 transition-colors"
            >
              View All
            </Link>
          </div>

          {/* Desktop Table (no horizontal scroll) */}
          <div className="hidden md:block flex-1">
            <table className="w-full text-left text-[11.5px]">
              <thead>
                <tr className="border-b border-slate-200/60 text-slate-500 font-bold bg-slate-50/50">
                  <th className="py-2.5 pl-4 pr-1.5 font-semibold w-7">#</th>
                  <th className="py-2.5 px-2 font-semibold">Issue Type</th>
                  <th className="py-2.5 px-2 font-semibold text-center">Count</th>
                  <th className="py-2.5 pl-2 pr-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-100/30">
                {exceptions.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="group/row border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300"
                  >
                    <td className="py-2.5 pl-4 pr-1.5 font-semibold text-slate-500">{idx + 1}</td>
                    <td className="py-2.5 px-2 font-bold text-slate-800 group-hover/row:text-indigo-600 transition-colors leading-tight">
                      {item.issueType}
                    </td>
                    <td className="py-2.5 px-2 font-black text-slate-900 text-center">
                      {item.count}
                    </td>
                    <td className="py-2.5 pl-2 pr-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onViewException?.(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-indigo-200/80 bg-white hover:bg-indigo-50 text-indigo-700 text-[10.5px] font-bold shadow-2xs transition-all cursor-pointer"
                      >
                        <span>View</span>
                        <Eye className="w-3 h-3 text-indigo-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards (< md) */}
          <div className="md:hidden p-3.5 space-y-2.5 flex-1">
            {exceptions.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl border border-slate-200/80 bg-white shadow-2xs flex items-center justify-between gap-3 hover:border-indigo-300 transition-all"
              >
                <div className="min-w-0">
                  <p className="text-[12.5px] font-bold text-slate-900 truncate">
                    {item.issueType}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                    {item.count} {item.count === 1 ? 'case' : 'cases'} flagged
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onViewException?.(item)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50/40 text-indigo-700 text-[11px] font-bold shrink-0 cursor-pointer"
                >
                  <span>View</span>
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
