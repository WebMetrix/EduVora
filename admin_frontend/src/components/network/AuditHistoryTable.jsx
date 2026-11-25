import React, { useState } from 'react';
import {
  Eye, MoreVertical, ChevronLeft, ChevronRight, Copy, GitFork, User
} from 'lucide-react';

const STATUS_STYLE = {
  Recorded: {
    pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    dot: 'bg-emerald-500',
  },
  Review: {
    pill: 'bg-amber-50 text-amber-700 border-amber-200/80',
    dot: 'bg-amber-400',
  },
  Open: {
    pill: 'bg-rose-50 text-rose-600 border-rose-200/80',
    dot: 'bg-rose-500',
  },
  Resolved: {
    pill: 'bg-sky-50 text-sky-700 border-sky-200/80',
    dot: 'bg-sky-500',
  },
};

export default function AuditHistoryTable({
  events = [],
  onViewEvent,
  onNavigateMember,
  onNavigateTree,
}) {
  const [page, setPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(events.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pagedEvents = events.slice((safePage - 1) * pageSize, safePage * pageSize);

  const renderStatusPill = (status) => {
    const s = STATUS_STYLE[status] || STATUS_STYLE.Recorded;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border whitespace-nowrap ${s.pill}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
        {status}
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
              <th className="py-3 px-2 font-semibold">Audit ID</th>
              <th className="py-3 px-2 font-semibold">Event Type</th>
              <th className="py-3 px-2 font-semibold">Member</th>
              <th className="py-3 px-2 font-semibold">
                Sponsor
                <span className="block text-[10px] font-medium text-slate-400">
                  (Previous → New)
                </span>
              </th>
              <th className="py-3 px-2 font-semibold">Event Source</th>
              <th className="py-3 px-2 font-semibold">Date &amp; Time</th>
              <th className="py-3 px-2 font-semibold">Reason / Details</th>
              <th className="py-3 px-2 font-semibold">Status</th>
              <th className="py-3 pl-2 pr-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-100/30">
            {pagedEvents.length > 0 ? (
              pagedEvents.map((row, idx) => (
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
                  <td className="py-2.5 px-2 font-bold text-slate-800 leading-tight max-w-[115px]">
                    {row.eventType}
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
                    <span className="block font-semibold text-slate-800">{row.sponsorPrimary}</span>
                    {row.sponsorSub && (
                      <span className="block text-[10.5px] text-slate-400 font-medium">
                        {row.sponsorSub}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-2 leading-tight">
                    <span className="block font-semibold text-slate-700">{row.sourceShort}</span>
                    {row.sourceSub && (
                      <span className="block text-[10.5px] text-slate-400 font-medium">
                        {row.sourceSub}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-2 leading-tight whitespace-nowrap">
                    <span className="block font-semibold text-slate-700">{row.date}</span>
                    <span className="block text-[10.5px] text-slate-400 font-medium">
                      {row.time}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-slate-600 font-medium leading-tight max-w-[175px]">
                    {row.reason}
                  </td>
                  <td className="py-2.5 px-2">{renderStatusPill(row.status)}</td>
                  <td className="py-2.5 pl-2 pr-4 text-center whitespace-nowrap relative">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onViewEvent?.(row)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-indigo-200/80 bg-white hover:bg-indigo-50 text-indigo-700 text-[10.5px] font-bold shadow-2xs transition-all cursor-pointer"
                      >
                        <span>View</span>
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
                              <span>Copy Audit ID</span>
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
                              <span>Member Details</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null);
                                onNavigateTree?.(row);
                              }}
                              className="w-full px-3 py-1.5 text-[11.5px] font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2 cursor-pointer"
                            >
                              <GitFork className="w-3.5 h-3.5" />
                              <span>View in Tree</span>
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
                  No audit events match your current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (< md) */}
      <div className="relative z-10 md:hidden p-3.5 space-y-3">
        {pagedEvents.length > 0 ? (
          pagedEvents.map((row) => (
            <div
              key={row.id}
              className="p-3.5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-2.5 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-extrabold text-indigo-600">{row.id}</span>
                  <h4 className="text-[13px] font-black text-slate-900 leading-tight mt-0.5">
                    {row.eventType}
                  </h4>
                </div>
                {renderStatusPill(row.status)}
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
                    {row.sponsorPrimary} {row.sponsorSub || ''}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] font-medium block">Source</span>
                  <span className="font-semibold text-slate-700">
                    {row.sourceShort} {row.sourceSub || ''}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] font-medium block">Date &amp; Time</span>
                  <span className="font-semibold text-slate-700">
                    {row.date} {row.time}
                  </span>
                </div>
              </div>

              <p className="text-[11.5px] text-slate-600 bg-slate-50/80 rounded-xl px-3 py-2 border border-slate-100">
                {row.reason}
              </p>

              <button
                type="button"
                onClick={() => onViewEvent?.(row)}
                className="w-full py-2 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/70 text-indigo-700 text-[11.5px] font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Event Details</span>
              </button>
            </div>
          ))
        ) : (
          <p className="py-8 text-center text-[12px] text-slate-400 font-semibold">
            No audit events match your current filters.
          </p>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="relative z-10 px-4 sm:px-5 py-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11.5px] text-slate-500">
        <span className="font-medium">
          Showing {events.length === 0 ? 0 : (safePage - 1) * pageSize + 1} to{' '}
          {Math.min(safePage * pageSize, events.length)} of 1,245 entries
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
          {[1, 2, 3, 4, 5].map((pNum) => (
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
          <span className="px-1 text-slate-400 font-bold">...</span>
          <button
            type="button"
            onClick={() => setPage(totalPages)}
            className="h-7 px-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-[11.5px] font-bold flex items-center justify-center cursor-pointer"
          >
            156
          </button>
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
