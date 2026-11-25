import React, { useState, useMemo } from 'react';
import {
  Users, Search, Download, Eye, CheckCircle2, Clock, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function ReferralConnectionsTable({
  title = 'Direct Referrals (Level 1)',
  subtitle,
  rows = [],
  onViewMember,
}) {
  const [tableSearch, setTableSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    const q = tableSearch.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.package.toLowerCase().includes(q)
    );
  }, [rows, tableSearch]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pagedRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleExportCsv = () => {
    const header = ['#', 'User ID', 'Name', 'Package', 'Registration Date', 'Status', 'KYC Status'];
    const csvRows = [
      header.join(','),
      ...filtered.map((r, i) =>
        [
          i + 1,
          `"${r.id}"`,
          `"${r.name}"`,
          `"${r.package}"`,
          `"${r.date}"`,
          `"${r.status}"`,
          `"${r.kycStatus}"`,
        ].join(',')
      ),
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderStatusDot = (status) => {
    const isPending = status === 'Pending KYC' || status === 'Inactive';
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-[11.5px] font-bold ${
          status === 'Active'
            ? 'text-emerald-700'
            : status === 'Inactive'
            ? 'text-rose-600'
            : 'text-amber-600'
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            status === 'Active'
              ? 'bg-emerald-500'
              : isPending && status === 'Inactive'
              ? 'bg-rose-500'
              : 'bg-amber-400'
          }`}
        />
        {status}
      </span>
    );
  };

  const renderKycBadge = (kycStatus) => {
    const isVerified = kycStatus === 'Verified';
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${
          isVerified
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
            : 'bg-amber-50 text-amber-700 border-amber-200/80'
        }`}
      >
        {isVerified ? (
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
        ) : (
          <Clock className="w-3 h-3 text-amber-500" />
        )}
        {kycStatus}
      </span>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full">
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-400/8 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Card Header */}
        <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <Users className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-[14.5px] sm:text-[15.5px] font-black text-slate-900 tracking-tight leading-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[11.5px] text-slate-500 font-medium mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-52">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={tableSearch}
                onChange={(e) => {
                  setTableSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by name or user ID"
                className="w-full h-9 bg-slate-50/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-indigo-500 rounded-xl pl-8 pr-3 text-[11.5px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs"
              />
            </div>

            <button
              type="button"
              onClick={handleExportCsv}
              className="h-9 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-[11.5px] font-bold inline-flex items-center gap-1.5 shadow-sm shadow-indigo-600/20 transition-all cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block flex-1">
          <table className="w-full text-left text-[11.5px]">
            <thead>
              <tr className="border-b border-slate-200/60 text-slate-400 font-bold bg-slate-50/50">
                <th className="py-3 pl-4 pr-2 font-semibold w-8">#</th>
                <th className="py-3 px-2.5 font-semibold">User ID</th>
                <th className="py-3 px-2.5 font-semibold">Name</th>
                <th className="py-3 px-2.5 font-semibold">Package</th>
                <th className="py-3 px-2.5 font-semibold">Registration Date</th>
                <th className="py-3 px-2.5 font-semibold">Status</th>
                <th className="py-3 px-2.5 font-semibold">KYC Status</th>
                <th className="py-3 pl-2.5 pr-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-100/30">
              {pagedRows.length > 0 ? (
                pagedRows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className="group/row border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300"
                  >
                    <td className="py-3 pl-4 pr-2 font-semibold text-slate-500">
                      {(safePage - 1) * pageSize + idx + 1}
                    </td>
                    <td className="py-3 px-2.5 font-bold text-slate-700 whitespace-nowrap">
                      {row.id}
                    </td>
                    <td className="py-3 px-2.5 font-extrabold text-slate-900 group-hover/row:text-indigo-600 transition-colors leading-tight">
                      {row.name}
                    </td>
                    <td className="py-3 px-2.5 font-semibold text-slate-700">{row.package}</td>
                    <td className="py-3 px-2.5 text-slate-500 font-medium whitespace-nowrap">
                      {row.date}
                    </td>
                    <td className="py-3 px-2.5 whitespace-nowrap">{renderStatusDot(row.status)}</td>
                    <td className="py-3 px-2.5 whitespace-nowrap">{renderKycBadge(row.kycStatus)}</td>
                    <td className="py-3 pl-2.5 pr-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onViewMember?.(row)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-indigo-200/80 bg-white hover:bg-indigo-50 text-indigo-700 text-[11px] font-bold shadow-2xs transition-all cursor-pointer"
                      >
                        <span>View</span>
                        <Eye className="w-3.5 h-3.5 text-indigo-600" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 font-semibold">
                    No matching referral records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Cards (< md) */}
        <div className="md:hidden p-3.5 space-y-3 flex-1">
          {pagedRows.length > 0 ? (
            pagedRows.map((row) => (
              <div
                key={row.id}
                className="p-3.5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-2.5 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <h4 className="text-[13px] font-black text-slate-900">{row.name}</h4>
                    <p className="text-[11px] font-semibold text-slate-500">{row.id}</p>
                  </div>
                  {renderKycBadge(row.kycStatus)}
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11.5px]">
                  <div>
                    <span className="text-slate-400 text-[10px] font-medium block">Package</span>
                    <span className="font-bold text-slate-800">{row.package}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-medium block">Joined</span>
                    <span className="font-semibold text-slate-700">{row.date}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-slate-400 text-[10px] font-medium block">Status</span>
                    {renderStatusDot(row.status)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onViewMember?.(row)}
                  className="w-full py-2 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/70 text-indigo-700 text-[11.5px] font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Member Details</span>
                </button>
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-[12px] text-slate-400 font-semibold">
              No matching referral records found.
            </p>
          )}
        </div>
      </div>

      {/* Footer / Pagination */}
      <div className="relative z-10 px-4 sm:px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-3 text-[11.5px] text-slate-500">
        <span className="font-medium">
          Showing {filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1} to{' '}
          {Math.min(safePage * pageSize, filtered.length)} of {filtered.length} entries
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
            <button
              key={pNum}
              type="button"
              onClick={() => setPage(pNum)}
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
