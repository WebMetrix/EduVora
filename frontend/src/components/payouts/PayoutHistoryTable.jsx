import React from 'react';
import { ChevronLeft, ChevronRight, ArrowDownLeft, Clock, XCircle, ArrowUpRight } from 'lucide-react';
import { BankTransferIcon, UpiIcon, PaypalIcon } from './PayoutIcons';

export default function PayoutHistoryTable({
  payouts,
  totalCount = 28,
  currentPage,
  setCurrentPage,
  pageSize = 10,
  setPageSize,
  onViewDetails
}) {
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const startIdx = totalCount > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endIdx = Math.min(currentPage * pageSize, totalCount);

  // Method Icon helper
  const renderMethodIcon = (methodType) => {
    switch (methodType?.toLowerCase()) {
      case 'upi':
        return <UpiIcon className="w-4 h-4 shrink-0" />;
      case 'paypal':
        return <PaypalIcon className="w-4 h-4 shrink-0" />;
      case 'bank':
      default:
        return <BankTransferIcon className="w-4 h-4 text-slate-700 shrink-0" />;
    }
  };

  // Status style matching ReferralsDataTable
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
      case 'approved':
        return 'bg-emerald-100 text-emerald-600';
      case 'rejected':
        return 'bg-rose-100 text-rose-600';
      case 'pending':
      default:
        return 'bg-amber-100 text-amber-600';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group/card transition-all duration-300 hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 flex flex-col w-full">
      {/* Decorative background flare matching referrals table */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

      {/* Desktop Table (Visible on lg and up: >= 1024px) - Clean responsive table matching ReferralsDataTable */}
      <div className="relative z-10 hidden lg:block w-full overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/90 backdrop-blur-md shadow-2xs">
            <tr className="border-b border-indigo-100/40">
              <th className="py-3.5 px-3 text-[11.5px] font-extrabold text-slate-500 uppercase tracking-wider text-center whitespace-nowrap">#</th>
              <th className="py-3.5 px-3.5 text-[11.5px] font-extrabold text-slate-500 uppercase tracking-wider whitespace-nowrap">Transaction ID</th>
              <th className="py-3.5 px-3 text-[11.5px] font-extrabold text-slate-500 uppercase tracking-wider whitespace-nowrap">Request Date</th>
              <th className="py-3.5 px-3 text-[11.5px] font-extrabold text-slate-500 uppercase tracking-wider whitespace-nowrap">Processed Date</th>
              <th className="py-3.5 px-3 text-[11.5px] font-extrabold text-slate-500 uppercase tracking-wider whitespace-nowrap">Amount (₹)</th>
              <th className="py-3.5 px-3.5 text-[11.5px] font-extrabold text-slate-500 uppercase tracking-wider whitespace-nowrap">Payout Method</th>
              <th className="py-3.5 px-3 text-[11.5px] font-extrabold text-slate-500 uppercase tracking-wider whitespace-nowrap text-center">Status</th>
              <th className="py-3.5 px-3 text-[11.5px] font-extrabold text-slate-500 uppercase tracking-wider whitespace-nowrap text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payouts.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-10 text-center text-indigo-400 font-bold text-[13px]">
                  No payouts found matching your criteria.
                </td>
              </tr>
            ) : (
              payouts.map((row, idx) => {
                const serialNum = startIdx + idx;
                return (
                  <tr
                    key={row.transactionId || idx}
                    onClick={() => onViewDetails(row)}
                    className="group border-b border-indigo-100/30 hover:bg-white hover:shadow-xs transition-all duration-200 cursor-pointer"
                  >
                    {/* Index */}
                    <td className="py-3.5 px-3 text-[12px] font-bold text-slate-400 text-center whitespace-nowrap">
                      {serialNum}
                    </td>

                    {/* Transaction ID */}
                    <td className="py-3.5 px-3.5 text-[12.5px] font-bold text-[#1a1446] group-hover:text-[#4f3bf3] transition-colors font-mono tracking-tight whitespace-nowrap" title={row.transactionId}>
                      {row.transactionId}
                    </td>

                    {/* Request Date */}
                    <td className="py-3.5 px-3 text-[12px] font-medium text-slate-600 whitespace-nowrap">
                      {row.requestDate}
                    </td>

                    {/* Processed Date */}
                    <td className="py-3.5 px-3 text-[12px] font-medium text-slate-600 whitespace-nowrap">
                      {row.processedDate}
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-3 text-[13px] font-black text-slate-900 whitespace-nowrap">
                      ₹ {row.amount}
                    </td>

                    {/* Payout Method */}
                    <td className="py-3.5 px-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {renderMethodIcon(row.methodType)}
                        <span className="text-[12px] font-semibold text-slate-700 whitespace-nowrap">{row.method}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border border-white/40 shadow-2xs inline-flex items-center gap-1 ${getStatusStyle(row.status)}`}>
                        {(row.status?.toLowerCase() === 'paid' || row.status?.toLowerCase() === 'approved') && <ArrowDownLeft className="w-2.5 h-2.5" />}
                        {row.status?.toLowerCase() === 'pending' && <Clock className="w-2.5 h-2.5" />}
                        {row.status?.toLowerCase() === 'rejected' && <XCircle className="w-2.5 h-2.5" />}
                        <span className="capitalize">{row.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(row);
                        }}
                        className="inline-flex items-center justify-center py-1.5 px-3 rounded-xl text-[11.5px] font-bold text-[#4f3bf3] bg-indigo-50/80 border border-indigo-200/80 hover:bg-[#4f3bf3] hover:text-white transition-all text-center whitespace-nowrap active:scale-95 shadow-2xs cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile & Tablet Stacked Cards (Visible below lg: < 1024px) */}
      <div className="block lg:hidden w-full p-4 space-y-3.5 relative z-10">
        {payouts.length === 0 ? (
          <div className="py-10 text-center text-indigo-400 font-bold text-[13px]">
            No payouts found
          </div>
        ) : (
          payouts.map((row, idx) => {
            const serialNum = startIdx + idx;
            return (
              <div
                key={row.transactionId || idx}
                onClick={() => onViewDetails(row)}
                className="group p-4 flex flex-col gap-3 bg-white/70 border border-indigo-100/60 rounded-2xl hover:bg-white hover:shadow-lg hover:border-indigo-300 transition-all duration-300 cursor-pointer relative z-10"
              >
                {/* Header: Method Avatar + Transaction ID + Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl border border-indigo-200/70 shadow-2xs shrink-0 transition-transform duration-300 group-hover:scale-105 bg-white flex items-center justify-center">
                      {renderMethodIcon(row.methodType)}
                    </div>
                    <div>
                      <div className="text-[12.5px] font-bold text-[#1a1446] font-mono tracking-tight group-hover:text-[#4f3bf3] transition-colors">
                        {row.transactionId}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        #{serialNum} • {row.method}
                      </div>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border border-white/40 shadow-2xs inline-flex items-center gap-1 ${getStatusStyle(row.status)}`}>
                    {(row.status?.toLowerCase() === 'paid' || row.status?.toLowerCase() === 'approved') && <ArrowDownLeft className="w-2.5 h-2.5" />}
                    {row.status?.toLowerCase() === 'pending' && <Clock className="w-2.5 h-2.5" />}
                    {row.status?.toLowerCase() === 'rejected' && <XCircle className="w-2.5 h-2.5" />}
                    <span className="capitalize">{row.status}</span>
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50/70 rounded-xl border border-slate-100 text-[11px]">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Amount</span>
                    <span className="text-[13px] font-black text-slate-900">₹ {row.amount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Requested</span>
                    <span className="text-slate-700 font-bold">{row.requestDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Processed</span>
                    <span className="text-slate-700 font-bold">{row.processedDate}</span>
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100/70">
                  <span className="text-[11px] text-slate-500 truncate">{row.remarks}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(row);
                    }}
                    className="flex items-center gap-1 text-[11.5px] font-bold text-[#4f3bf3] hover:text-indigo-800"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Footer matching ReferralsDataTable */}
      <div className="relative z-10 p-3.5 sm:p-4 lg:p-5 border-t border-indigo-100/40 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/60 backdrop-blur-md">
        <div className="text-[12.5px] font-semibold text-slate-500 w-full text-center sm:text-left">
          {totalCount > 0
            ? `Showing ${startIdx} to ${endIdx} of ${totalCount} payouts`
            : 'No entries to show'}
        </div>

        {totalCount > 0 && (
          <div className="flex items-center justify-between w-full sm:w-auto gap-3 sm:gap-4 lg:gap-6">
            <div className="flex items-center gap-1">
              {/* Prev Button */}
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Number Buttons */}
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg font-bold text-[12.5px] transition-all flex items-center justify-center cursor-pointer ${
                      isActive
                        ? 'bg-[#4f3bf3] text-white shadow-sm'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Rows Per Page dropdown matching ReferralsDataTable */}
            {setPageSize && (
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[12px] font-semibold text-slate-500 hidden sm:inline-block whitespace-nowrap">
                  Rows per page
                </span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-slate-200 rounded-lg text-[12.5px] font-bold text-slate-700 py-1 pl-2.5 pr-7 focus:outline-none focus:border-[#4f3bf3] bg-white cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
