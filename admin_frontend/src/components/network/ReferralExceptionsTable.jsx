import React, { useState } from 'react';
import {
  Eye, MoreVertical, ChevronLeft, ChevronRight, Copy, CheckCircle2, User
} from 'lucide-react';

const SEVERITY_STYLE = {
  Critical: {
    pill: 'bg-rose-100/80 text-rose-700 border-rose-200',
    dot: 'bg-rose-600',
  },
  High: {
    pill: 'bg-rose-50 text-rose-600 border-rose-200/80',
    dot: 'bg-rose-500',
  },
  Medium: {
    pill: 'bg-amber-50 text-amber-700 border-amber-200/80',
    dot: 'bg-amber-400',
  },
  Low: {
    pill: 'bg-sky-50 text-sky-700 border-sky-200/80',
    dot: 'bg-sky-500',
  },
};

const STATUS_STYLE = {
  Open: {
    pill: 'bg-rose-50 text-rose-600 border-rose-200/80',
    dot: 'bg-rose-500',
  },
  'Under Investigation': {
    pill: 'bg-amber-50 text-amber-700 border-amber-200/80',
    dot: 'bg-amber-400',
  },
  Resolved: {
    pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    dot: 'bg-emerald-500',
  },
  Dismissed: {
    pill: 'bg-slate-100 text-slate-600 border-slate-200',
    dot: 'bg-slate-400',
  },
};

export default function ReferralExceptionsTable({
  exceptions = [],
  onViewDetails,
  onQuickResolve,
  onNavigateMember,
}) {
  const [page, setPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(exceptions.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pagedRows = exceptions.slice((safePage - 1) * pageSize, safePage * pageSize);

  const renderBadge = (map, val) => {
    const s = map[val] || { pill: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' };
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border whitespace-nowrap ${s.pill}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
        {val}
      </span>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group">
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-400/8 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Desktop Table View (compact 2-line cells so zero horizontal scroll) */}
      <div className="relative z-10 hidden md:block">
        <table className="w-full text-left text-[11.5px]">
          <thead>
            <tr className="border-b border-slate-200/60 text-slate-500 font-bold bg-slate-50/50 leading-tight">
              <th className="py-3 pl-4 pr-1.5 font-semibold w-7">#</th>
              <th className="py-3 px-2 font-semibold">Exception ID</th>
              <th className="py-3 px-2 font-semibold">Exception Type</th>
              <th className="py-3 px-2 font-semibold">Member</th>
              <th className="py-3 px-2 font-semibold">Sponsor</th>
              <th className="py-3 px-2 font-semibold">Severity</th>
              <th className="py-3 px-2 font-semibold">Status</th>
              <th className="py-3 px-2 font-semibold">Detected Date</th>
              <th className="py-3 px-2 font-semibold">Assigned Admin</th>
              <th className="py-3 pl-2 pr-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-100/30">
            {pagedRows.length > 0 ? (
              pagedRows.map((row, idx) => (
                <tr
                  key={row.id}
                  className="group/row border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300"
                >
                  <td className="py-2.5 pl-4 pr-1.5 font-semibold text-slate-500">
                    {(safePage - 1) * pageSize + idx + 1}
                  </td>
                  <td className="py-2.5 px-2 font-bold text-indigo-600 whitespace-nowrap">
                    {row.id}
                  </td>
                  <td className="py-2.5 px-2 font-bold text-slate-800 leading-tight max-w-[145px]">
                    {row.exceptionType}
                  </td>
                  <td className="py-2.5 px-2 leading-tight">
                    <span className="block font-bold text-slate-900 group-hover/row:text-indigo-600 transition-colors">
                      {row.memberId}
                    </span>
                    <span className="block text-[10.5px] font-medium text-slate-500">
                      {row.memberName}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 leading-tight">
                    <span className="block font-semibold text-slate-800">{row.sponsorId}</span>
                    {row.sponsorSub && (
                      <span className="block text-[10.5px] text-slate-400 font-medium">
                        {row.sponsorSub}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-2">{renderBadge(SEVERITY_STYLE, row.severity)}</td>
                  <td className="py-2.5 px-2">{renderBadge(STATUS_STYLE, row.status)}</td>
                  <td className="py-2.5 px-2 leading-tight whitespace-nowrap">
                    <span className="block font-semibold text-slate-700">{row.detectedDate}</span>
                    <span className="block text-[10.5px] text-slate-400 font-medium">
                      {row.detectedTime}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 font-semibold text-slate-700 whitespace-nowrap">
                    {row.assignedAdmin}
                  </td>
                  <td className="py-2.5 pl-2 pr-4 text-center whitespace-nowrap relative">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onViewDetails?.(row)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-indigo-200/80 bg-white hover:bg-indigo-50 text-indigo-700 text-[10.5px] font-bold shadow-2xs transition-all cursor-pointer"
                      >
                        <span>View Details</span>
                        <Eye className="w-3 h-3 text-indigo-600" />
                      </button>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId((prev) => (prev === row.id ? null : row.id))
                          }
                          className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
                          aria-label="More actions"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>

                        {openMenuId === row.id && (
                          <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-30 text-left animate-fade-in">
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard?.writeText(row.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full px-3 py-1.5 text-[11.5px] font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2 cursor-pointer"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Exception ID</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null);
                                onQuickResolve?.(row.id);
                              }}
                              className="w-full px-3 py-1.5 text-[11.5px] font-semibold text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Mark as Resolved</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null);
                                onNavigateMember?.(row);
                              }}
                              className="w-full px-3 py-1.5 text-[11.5px] font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2 cursor-pointer"
                            >
                              <User className="w-3.5 h-3.5" />
                              <span>Inspect Member</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="py-10 text-center text-slate-400 font-semibold">
                  No referral exceptions match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (< md) */}
      <div className="relative z-10 md:hidden p-3.5 space-y-3">
        {pagedRows.length > 0 ? (
          pagedRows.map((row) => (
            <div
              key={row.id}
              className="p-3.5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-2.5 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-extrabold text-indigo-600">{row.id}</span>
                  <h4 className="text-[13px] font-black text-slate-900 leading-tight mt-0.5">
                    {row.exceptionType}
                  </h4>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {renderBadge(SEVERITY_STYLE, row.severity)}
                  {renderBadge(STATUS_STYLE, row.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11.5px]">
                <div>
                  <span className="text-slate-400 text-[10px] font-medium block">Member</span>
                  <span className="font-bold text-slate-900">
                    {row.memberId} ({row.memberName})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] font-medium block">Sponsor</span>
                  <span className="font-semibold text-slate-800">
                    {row.sponsorId} {row.sponsorSub || ''}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] font-medium block">
                    Assigned Admin
                  </span>
                  <span className="font-semibold text-slate-700">{row.assignedAdmin}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] font-medium block">Detected</span>
                  <span className="font-semibold text-slate-700">
                    {row.detectedDate} • {row.detectedTime}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onViewDetails?.(row)}
                className="w-full py-2 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/70 text-indigo-700 text-[11.5px] font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Details</span>
              </button>
            </div>
          ))
        ) : (
          <p className="py-8 text-center text-[12px] text-slate-400 font-semibold">
            No referral exceptions match the selected filters.
          </p>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="relative z-10 px-4 sm:px-5 py-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11.5px] text-slate-500">
        <span className="font-medium">
          Showing {exceptions.length === 0 ? 0 : (safePage - 1) * pageSize + 1} to{' '}
          {Math.min(safePage * pageSize, exceptions.length)} of 24 entries
        </span>

        <div className="flex items-center gap-1 self-end sm:self-auto">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          {[1, 2, 3, 4].map((pNum) => (
            <button
              key={pNum}
              type="button"
              onClick={() => setPage(pNum <= totalPages ? pNum : 1)}
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
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
