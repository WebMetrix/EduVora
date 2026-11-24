import React, { useState } from 'react';
import { Eye, ChevronDown, ChevronLeft, ChevronRight, ArrowUpDown, Download, Check } from 'lucide-react';

export default function KycSubmissionsTable({
  submissions,
  onViewKyc,
  pageSize = 10,
  onPageSizeChange,
  currentPage = 1,
  onPageChange,
  totalSubmissions = 1248,
}) {
  const [selectedIds, setSelectedIds] = useState([]);

  const isAllSelected =
    submissions.length > 0 && selectedIds.length === submissions.length;

  const handleToggleAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(submissions.map((s) => s.id));
    }
  };

  const handleToggleRow = (id, e) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group">
      {/* Decorative hover gradient flare */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-indigo-400/20 group-hover:scale-125 transition-all duration-700" />

      {/* Table Header Bar */}
      <div className="relative z-10 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <h3 className="text-[15px] sm:text-[16px] font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>KYC Submissions</span>
          <span className="text-[13px] sm:text-[14px] text-slate-400 font-bold">({totalSubmissions})</span>
        </h3>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          {/* Per Page */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange && onPageSizeChange(Number(e.target.value))}
                className="bg-white border border-slate-200/90 rounded-xl pl-2.5 pr-6 py-1 text-[11.5px] font-bold text-slate-700 appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer shadow-2xs"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <span className="text-[11.5px] text-slate-500 font-medium">per page</span>
          </div>

          {/* Export Button */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200/90 bg-white hover:bg-indigo-50/80 text-indigo-700 font-bold text-[12px] shadow-2xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Desktop View Table (hidden on mobile, visible from md up) */}
      <div className="relative z-10 hidden md:block overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[980px]">
          <thead>
            <tr className="border-b border-slate-100/90 bg-slate-50/50 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              {/* Checkbox */}
              <th className="py-3 px-3 pl-5 w-10">
                <label className="flex items-center justify-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleToggleAll}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      isAllSelected
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-slate-300 bg-white hover:border-indigo-400'
                    }`}
                  >
                    {isAllSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </label>
              </th>
              <th className="py-3 px-3">User ID</th>
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>Name</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3">Email</th>
              <th className="py-3 px-3">Mobile Number</th>
              <th className="py-3 px-3">Identity Proof Type</th>
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>Submission Date</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span>KYC Status</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3">Remarks</th>
              <th className="py-3 px-3.5 pr-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80 text-[12px]">
            {submissions.map((s) => {
              const isChecked = selectedIds.includes(s.id);
              const isApproved = s.status === 'Approved';
              const isPending = s.status === 'Pending';
              const isRejected = s.status === 'Rejected';

              return (
                <tr
                  key={s.id}
                  onClick={() => onViewKyc(s)}
                  className={`group border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300 cursor-pointer ${
                    isChecked ? 'bg-indigo-50/50' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <td className="py-2.5 px-3 pl-5" onClick={(e) => e.stopPropagation()}>
                    <label className="flex items-center justify-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleToggleRow(s.id, e)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-slate-300 bg-white hover:border-indigo-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </label>
                  </td>

                  {/* User ID */}
                  <td className="py-2.5 px-3 font-bold text-slate-800 group-hover:text-indigo-600 tracking-tight whitespace-nowrap transition-colors">
                    {s.userId || s.id}
                  </td>

                  {/* Name + Avatar */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {s.avatar ? (
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0 group-hover:scale-110 group-hover:shadow-xs transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-extrabold text-[10px] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-xs transition-transform duration-300">
                          {s.initials || s.name?.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{s.name}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap font-medium">
                    {s.email}
                  </td>

                  {/* Mobile Number */}
                  <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap font-semibold">
                    {s.mobile}
                  </td>

                  {/* Proof Type */}
                  <td className="py-2.5 px-3 text-slate-800 whitespace-nowrap font-semibold">
                    {s.proofType}
                  </td>

                  {/* Submission Date */}
                  <td className="py-2.5 px-3 whitespace-nowrap text-slate-600 leading-tight">
                    <div className="font-semibold text-slate-800">{s.date}</div>
                    <div className="text-[10.5px] text-slate-400 font-medium">{s.time}</div>
                  </td>

                  {/* KYC Status */}
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isApproved
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : isPending
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isApproved
                            ? 'bg-emerald-500'
                            : isPending
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                      />
                      {s.status}
                    </span>
                  </td>

                  {/* Remarks */}
                  <td className="py-2.5 px-3 whitespace-nowrap text-slate-600 font-medium">
                    {s.remarks || '-'}
                  </td>

                  {/* Action Button */}
                  <td className="py-2.5 px-3.5 pr-5 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewKyc(s);
                      }}
                      className="p-1.5 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-600 hover:text-indigo-800 shadow-2xs transition-all cursor-pointer inline-flex items-center justify-center"
                      title="View KYC details"
                    >
                      <Eye className="w-4 h-4 stroke-[2]" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View (Visible only on mobile < md) */}
      <div className="relative z-10 md:hidden p-3 space-y-2.5">
        {submissions.map((s) => {
          const isChecked = selectedIds.includes(s.id);
          const isApproved = s.status === 'Approved';
          const isPending = s.status === 'Pending';

          return (
            <div
              key={s.id}
              onClick={() => onViewKyc(s)}
              className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-y-0.5 group ${
                isChecked
                  ? 'bg-indigo-50/70 border-indigo-300 shadow-xs'
                  : 'bg-white/90 border-slate-200/80 hover:border-indigo-300 hover:bg-white'
              }`}
            >
              {/* Top: Avatar + Name + ID + Action */}
              <div className="flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  {s.avatar ? (
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0 group-hover:scale-105 group-hover:shadow-xs transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-extrabold text-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-xs transition-transform duration-300">
                      {s.initials || s.name?.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-[13.5px] font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight truncate">
                      {s.name}
                    </h4>
                    <p className="text-[11px] font-bold text-slate-400 mt-0.5">
                      {s.userId || s.id}
                    </p>
                  </div>
                </div>

                {/* Eye Action button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewKyc(s);
                  }}
                  className="p-2 rounded-xl border border-indigo-200 bg-indigo-50/80 text-indigo-600 hover:bg-indigo-100 group-hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer shadow-2xs"
                  title="View KYC details"
                >
                  <Eye className="w-4 h-4 stroke-[2]" />
                </button>
              </div>

              {/* Middle: Proof Type + Status */}
              <div className="mt-2.5 pt-2 border-t border-slate-100/90 flex items-center justify-between gap-2">
                <span className="text-[12px] font-bold text-slate-800">
                  {s.proofType}
                </span>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                    isApproved
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : isPending
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isApproved
                        ? 'bg-emerald-500'
                        : isPending
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                  />
                  {s.status}
                </span>
              </div>

              {/* Email & Mobile */}
              <div className="mt-2 pt-2 border-t border-slate-100/90 flex flex-col gap-1 text-[11.5px]">
                <div className="flex items-center justify-between gap-2 text-slate-600">
                  <span className="text-slate-400 font-medium shrink-0">Email</span>
                  <span className="font-semibold text-slate-800 truncate text-right">{s.email}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-slate-600">
                  <span className="text-slate-400 font-medium shrink-0">Mobile</span>
                  <span className="font-semibold text-slate-800">{s.mobile}</span>
                </div>
                {s.remarks && s.remarks !== '-' && (
                  <div className="flex items-center justify-between gap-2 text-slate-600">
                    <span className="text-slate-400 font-medium shrink-0">Remarks</span>
                    <span className="font-bold text-rose-600">{s.remarks}</span>
                  </div>
                )}
              </div>

              {/* Submission Date */}
              <div className="mt-2 pt-1.5 border-t border-slate-100/90 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Submitted</span>
                <span>{s.date} {s.time}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Pagination Footer */}
      <div className="relative z-10 px-4 sm:px-5 py-3 sm:py-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 bg-slate-50/40">
        <div className="flex items-center gap-2">
          <span className="text-[11.5px] sm:text-[12px] text-slate-500 font-medium">Show</span>
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange && onPageSizeChange(Number(e.target.value))}
              className="bg-white border border-slate-200/90 rounded-xl pl-2.5 pr-6 py-1 text-[11px] sm:text-[11.5px] font-bold text-slate-700 appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer shadow-2xs"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <span className="text-[11.5px] sm:text-[12px] text-slate-500 font-medium">entries</span>
        </div>

        {/* Pagination buttons */}
        <div className="flex items-center gap-1 self-center sm:self-auto flex-wrap justify-center">
          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {[1, 2, 3, 4, 5].map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange && onPageChange(pageNum)}
              className={`w-7 h-7 rounded-lg text-[11.5px] sm:text-[12px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                currentPage === pageNum
                  ? 'bg-indigo-600 text-white shadow-2xs font-black'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <span className="px-1 text-slate-400 text-xs">...</span>

          <button
            type="button"
            onClick={() => onPageChange && onPageChange(125)}
            className="w-8 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11.5px] sm:text-[12px] font-bold flex items-center justify-center transition-colors cursor-pointer"
          >
            125
          </button>

          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
