import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wallet, History, ExternalLink, Eye, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function ReferralBottomTables({
  commissions = [],
  auditLogs = [],
  onViewCommission,
  onViewAllCommissions,
  focusMode = 'both', // 'both' | 'commission' | 'audit'
}) {
  const [commPage, setCommPage] = useState(1);
  const [auditPage, setAuditPage] = useState(1);

  const splitFromUser = (val = '') => {
    const match = val.match(/^([^\s(]+)\s*\((.+)\)$/);
    if (match) return { id: match[1], name: `(${match[2]})` };
    return { id: val, name: '' };
  };

  const splitDateTime = (val = '') => {
    const parts = val.split(',');
    if (parts.length >= 2) {
      return { date: parts[0].trim(), time: parts.slice(1).join(',').trim() };
    }
    return { date: val, time: '' };
  };

  const showCommission = focusMode === 'both' || focusMode === 'commission';
  const showAudit = focusMode === 'both' || focusMode === 'audit';
  const colClass = focusMode === 'both' ? 'lg:col-span-6' : 'lg:col-span-12';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
      {/* Left Card: Commission Reference */}
      {showCommission && (
      <div className={`${colClass} relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full`}>
        <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-400/8 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header */}
          <div className="px-4 sm:px-5 py-3.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                <Wallet className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-[14.5px] sm:text-[15.5px] font-black text-slate-900 tracking-tight leading-tight">
                  Commission Reference
                </h3>
                <p className="text-[11.5px] text-slate-500 font-medium mt-0.5">
                  View commission records related to this member.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onViewAllCommissions}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-indigo-50/70 hover:border-indigo-300 hover:text-indigo-700 text-slate-700 text-[11.5px] font-bold shadow-2xs transition-all cursor-pointer shrink-0"
            >
              <span>View All Commissions</span>
              <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
            </button>
          </div>

          {/* Desktop Table (2-line compact cells so no horizontal scroll is needed) */}
          <div className="hidden md:block flex-1">
            <table className="w-full text-left text-[11.5px]">
              <thead>
                <tr className="border-b border-slate-200/60 text-slate-400 font-bold bg-slate-50/50">
                  <th className="py-2.5 pl-4 pr-1.5 font-semibold w-7">#</th>
                  <th className="py-2.5 px-2 font-semibold">Date</th>
                  <th className="py-2.5 px-2 font-semibold">Type</th>
                  <th className="py-2.5 px-2 font-semibold">From User</th>
                  <th className="py-2.5 px-2 font-semibold text-center">Level</th>
                  <th className="py-2.5 px-2 font-semibold">Amount</th>
                  <th className="py-2.5 px-2 font-semibold">Status</th>
                  <th className="py-2.5 pl-2 pr-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-100/30">
                {commissions.map((row, idx) => {
                  const fromParts = splitFromUser(row.fromUser);
                  const dateParts = row.date.split(' ');
                  const dateTop = dateParts.slice(0, 2).join(' ');
                  const dateBottom = dateParts.slice(2).join(' ');

                  return (
                    <tr
                      key={row.id}
                      className="group/row border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300"
                    >
                      <td className="py-2.5 pl-4 pr-1.5 font-semibold text-slate-500">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-2 text-slate-600 font-medium leading-tight">
                        <span className="block whitespace-nowrap">{dateTop}</span>
                        {dateBottom && (
                          <span className="block text-[10.5px] text-slate-400">{dateBottom}</span>
                        )}
                      </td>
                      <td className="py-2.5 px-2 font-semibold text-slate-700 leading-tight max-w-[92px]">
                        {row.type}
                      </td>
                      <td className="py-2.5 px-2 leading-tight">
                        <span className="block font-bold text-slate-900 group-hover/row:text-indigo-600 transition-colors">
                          {fromParts.id}
                        </span>
                        {fromParts.name && (
                          <span className="block text-[10.5px] font-medium text-slate-500">
                            {fromParts.name}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-2 font-semibold text-slate-700 text-center">
                        {row.level}
                      </td>
                      <td className="py-2.5 px-2 font-black text-slate-900 whitespace-nowrap">
                        {row.amount}
                      </td>
                      <td className="py-2.5 px-2 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            row.status === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                              : 'bg-amber-50 text-amber-700 border-amber-200/80'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              row.status === 'Paid' ? 'bg-emerald-500' : 'bg-amber-400'
                            }`}
                          />
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2.5 pl-2 pr-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onViewCommission?.(row)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-indigo-200/80 bg-white hover:bg-indigo-50 text-indigo-700 text-[10.5px] font-bold shadow-2xs transition-all cursor-pointer"
                        >
                          <span>View</span>
                          <Eye className="w-3 h-3 text-indigo-600" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards (< md) */}
          <div className="md:hidden p-3.5 space-y-2.5 flex-1">
            {commissions.map((row) => (
              <div
                key={row.id}
                className="p-3 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-2 hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-100">
                  <span className="text-[12px] font-black text-slate-900">{row.fromUser}</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      row.status === 'Paid'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                        : 'bg-amber-50 text-amber-700 border-amber-200/80'
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11.5px]">
                  <span className="text-slate-500 font-medium">
                    {row.date} • Level {row.level}
                  </span>
                  <span className="font-black text-slate-900">{row.amount}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onViewCommission?.(row)}
                  className="w-full py-1.5 rounded-lg border border-indigo-200 bg-indigo-50/40 text-indigo-700 text-[11px] font-bold inline-flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>View Record</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 px-4 sm:px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-3 text-[11.5px] text-slate-500">
          <span className="font-medium">
            Showing 1 to {commissions.length} of {commissions.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCommPage(1)}
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-400 flex items-center justify-center cursor-pointer"
              aria-label="Previous commission page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-[11.5px] font-bold flex items-center justify-center shadow-xs"
            >
              {commPage}
            </button>
            <button
              type="button"
              onClick={() => setCommPage(1)}
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-400 flex items-center justify-center cursor-pointer"
              aria-label="Next commission page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Right Card: Audit History */}
      {showAudit && (
      <div className={`${colClass} relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full`}>
        <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-400/8 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header */}
          <div className="px-4 sm:px-5 py-3.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                <History className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-[14.5px] sm:text-[15.5px] font-black text-slate-900 tracking-tight leading-tight">
                  Audit History
                </h3>
                <p className="text-[11.5px] text-slate-500 font-medium mt-0.5">
                  Referral-related changes and important events.
                </p>
              </div>
            </div>

            <Link
              to="/network/referral-audit-history"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-indigo-50/70 hover:border-indigo-300 hover:text-indigo-700 text-slate-700 text-[11.5px] font-bold shadow-2xs transition-all shrink-0"
            >
              <span>View Full Audit History</span>
              <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
            </Link>
          </div>

          {/* Desktop Table (2-line Date & Time and wrapped details for zero horizontal scroll) */}
          <div className="hidden md:block flex-1">
            <table className="w-full text-left text-[11.5px]">
              <thead>
                <tr className="border-b border-slate-200/60 text-slate-400 font-bold bg-slate-50/50">
                  <th className="py-2.5 pl-4 pr-1.5 font-semibold w-7">#</th>
                  <th className="py-2.5 px-2.5 font-semibold">Date &amp; Time</th>
                  <th className="py-2.5 px-2.5 font-semibold">Action</th>
                  <th className="py-2.5 px-2.5 font-semibold">Performed By</th>
                  <th className="py-2.5 pl-2.5 pr-4 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-100/30">
                {auditLogs.map((row, idx) => {
                  const dt = splitDateTime(row.dateTime);
                  return (
                    <tr
                      key={row.id}
                      className="group/row border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300"
                    >
                      <td className="py-2.5 pl-4 pr-1.5 font-semibold text-slate-500">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-2.5 leading-tight whitespace-nowrap">
                        <span className="block text-slate-700 font-semibold">{dt.date}</span>
                        {dt.time && (
                          <span className="block text-[10.5px] text-slate-400 font-medium">
                            {dt.time}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-2.5 font-bold text-slate-900 group-hover/row:text-indigo-600 transition-colors leading-tight">
                        {row.action}
                      </td>
                      <td className="py-2.5 px-2.5 font-semibold text-slate-700 whitespace-nowrap">
                        {row.by}
                      </td>
                      <td className="py-2.5 pl-2.5 pr-4 text-slate-600 font-medium leading-tight">
                        {row.details}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards (< md) */}
          <div className="md:hidden p-3.5 space-y-2.5 flex-1">
            {auditLogs.map((row) => (
              <div
                key={row.id}
                className="p-3 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-1.5 hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-100">
                  <span className="text-[12px] font-black text-slate-900">{row.action}</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                    {row.by}
                  </span>
                </div>
                <p className="text-[11.5px] font-medium text-slate-700">{row.details}</p>
                <p className="text-[10.5px] font-semibold text-slate-400">{row.dateTime}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 px-4 sm:px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-3 text-[11.5px] text-slate-500">
          <span className="font-medium">
            Showing 1 to {auditLogs.length} of {auditLogs.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setAuditPage(1)}
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-400 flex items-center justify-center cursor-pointer"
              aria-label="Previous audit page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-[11.5px] font-bold flex items-center justify-center shadow-xs"
            >
              {auditPage}
            </button>
            <button
              type="button"
              onClick={() => setAuditPage(1)}
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-400 flex items-center justify-center cursor-pointer"
              aria-label="Next audit page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
