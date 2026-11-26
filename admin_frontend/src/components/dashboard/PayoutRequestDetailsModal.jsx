import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X, Wallet, Check, Clock, Building, Download,
  CheckCircle2, AlertCircle, FileText, ArrowRight,
  ShieldCheck, IndianRupee, User, CreditCard
} from 'lucide-react';

export default function PayoutRequestDetailsModal({ payout, isOpen, onClose }) {
  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !payout || typeof document === 'undefined') return null;

  // Resolve payout fields with realistic defaults matching Image 2
  const name = payout.name || 'Rajesh Kumar';
  const userId = payout.userId || 'EVU001248';
  const avatar = payout.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80';
  const email = payout.email || 'rajesh@gmail.com';
  const mobile = payout.mobile || '+91 98765 43210';
  const requestId = payout.requestId || 'PR20260831001';
  const requestedOn = payout.requestedOn || '31 Aug 2026, 10:24 AM';
  const amount = payout.amount || '5,200';
  const status = payout.status || 'Approved';
  const requestType = payout.requestType || 'Commission';
  const paymentMethod = payout.paymentMethod || 'Bank Transfer';
  const processedOn = payout.processedOn && payout.processedOn !== '-' ? payout.processedOn : '31 Aug 2026, 04:10 PM';
  const bankAccount = payout.bankAccount || 'XXXX XXXX 4321';
  const ifsc = payout.ifsc && payout.ifsc !== '-' ? payout.ifsc : 'HDFC0001234';
  const bankName = payout.bankName || (paymentMethod === 'UPI' ? 'UPI / VPA' : 'HDFC Bank');
  const accountType = payout.accountType || (paymentMethod === 'UPI' ? 'UPI ID' : 'Savings');
  const branch = payout.branch || 'Andheri West, Mumbai';
  const userNotes = payout.userNotes || 'Please process my commission payout for this month. Thank you.';
  const adminRemarks = payout.adminRemarks || (
    status === 'Approved'
      ? 'Payout request verified and processed successfully. — Neha Sharma (31 Aug 2026, 03:40 PM)'
      : status === 'Rejected'
        ? 'Payout request rejected due to invalid bank account details. — Compliance Team'
        : 'Payout request is currently under review by the finance department.'
  );

  const getStatusBadge = (st) => {
    switch (st) {
      case 'Approved':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 whitespace-nowrap">
            Approved
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60 whitespace-nowrap">
            Under Review
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60 whitespace-nowrap">
            Rejected
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200/70 whitespace-nowrap">
            Pending
          </span>
        );
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Window Card - Responsive mobile bottom sheet & compact desktop squarish window */}
      <div className="w-full h-[90vh] sm:h-[86vh] sm:max-h-[86vh] sm:max-w-[800px] bg-white rounded-t-3xl sm:rounded-[22px] flex flex-col shadow-2xl relative mt-auto sm:mt-0 overflow-hidden modal-slide-up sm:modal-fade-in z-10 border border-slate-200/90">
        {/* Mobile Drag Handle */}
        <div
          onClick={onClose}
          className="w-full flex justify-center pt-2.5 pb-1 sm:hidden bg-white shrink-0 cursor-pointer"
        >
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Compact Header matching KYC Details */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
              <Wallet className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <h2 className="text-[14px] sm:text-[15px] font-bold text-slate-900 truncate">
              Payout Request Details
            </h2>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline truncate">
              • View complete payout request information and processing history
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700 cursor-pointer shrink-0"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-2.5 sm:p-3.5 space-y-2 sm:space-y-2.5 custom-scrollbar bg-slate-50/30">
          {/* Top Summary Card with Dashboard Glassmorphic Effects */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
            {/* Decorative hover gradient flare */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* Left: Avatar + Name + User ID + Status + Email + Phone */}
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={avatar}
                  alt={name}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-indigo-100 shadow-2xs shrink-0 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-900 leading-tight group-hover:text-indigo-950 transition-colors truncate">
                      {name}
                    </h3>
                    {getStatusBadge(status)}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10.5px] sm:text-[11px] text-slate-500 mt-0.5">
                    <span className="font-semibold text-indigo-600">{userId}</span>
                    <span className="text-slate-300">•</span>
                    <span className="truncate">{email}</span>
                    <span className="text-slate-300">•</span>
                    <span>{mobile}</span>
                  </div>
                </div>
              </div>

              {/* Right: Request ID, Date & Amount */}
              <div className="flex items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto pt-2 sm:pt-0 border-t border-slate-100 sm:border-t-0 shrink-0">
                <div className="sm:text-right">
                  <div className="text-[10px] sm:text-[10.5px] font-semibold text-slate-400">
                    Request ID: <span className="font-mono font-bold text-slate-700">{requestId}</span>
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] text-slate-400 mt-0.5">
                    {requestedOn}
                  </div>
                </div>
                <div className="sm:ml-5 text-right">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Payout Amount
                  </span>
                  <span className="text-[16px] sm:text-[18px] font-extrabold text-indigo-600 leading-none block mt-0.5">
                    ₹ {amount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Micro Status Pills Bar (Matching Image 2) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
            <div className="px-2.5 py-1.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs text-[10.5px] sm:text-[11px] flex items-center gap-1.5 truncate">
              <span className="text-slate-400 font-medium">Request Type:</span>
              <span className="font-bold text-slate-800 truncate">{requestType}</span>
            </div>
            <div className="px-2.5 py-1.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs text-[10.5px] sm:text-[11px] flex items-center gap-1.5 truncate">
              <span className="text-slate-400 font-medium">Payment Method:</span>
              <span className="font-bold text-slate-800 truncate">{paymentMethod}</span>
            </div>
            <div className="px-2.5 py-1.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs text-[10.5px] sm:text-[11px] flex items-center gap-1.5 truncate">
              <span className="text-slate-400 font-medium">Request Status:</span>
              <span className="font-bold text-emerald-600 truncate">{status}</span>
            </div>
            <div className="px-2.5 py-1.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs text-[10.5px] sm:text-[11px] flex items-center gap-1.5 truncate">
              <span className="text-slate-400 font-medium">Processed On:</span>
              <span className="font-bold text-slate-800 truncate">{processedOn}</span>
            </div>
          </div>

          {/* Row: Bank Details (Left) + Request Notes (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
            {/* Bank Details Card */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100/90">
                <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Building className="w-3 h-3" />
                </div>
                <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                  Bank Details
                </h4>
              </div>

              <div className="relative z-10 space-y-1.5 text-[11px] sm:text-[11.5px]">
                <div className="flex items-baseline justify-between sm:justify-start gap-3">
                  <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-36 shrink-0">Account Holder Name</span>
                  <span className="font-bold text-slate-800 text-right sm:text-left">{name}</span>
                </div>
                <div className="flex items-baseline justify-between sm:justify-start gap-3">
                  <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-36 shrink-0">Bank Name</span>
                  <span className="font-bold text-slate-800 text-right sm:text-left">{bankName}</span>
                </div>
                <div className="flex items-baseline justify-between sm:justify-start gap-3">
                  <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-36 shrink-0">Account Number</span>
                  <span className="font-bold text-slate-800 font-mono text-right sm:text-left">{bankAccount}</span>
                </div>
                <div className="flex items-baseline justify-between sm:justify-start gap-3">
                  <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-36 shrink-0">IFSC Code</span>
                  <span className="font-bold text-slate-800 font-mono text-right sm:text-left">{ifsc}</span>
                </div>
                <div className="flex items-baseline justify-between sm:justify-start gap-3">
                  <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-36 shrink-0">Account Type</span>
                  <span className="font-bold text-slate-800 text-right sm:text-left">{accountType}</span>
                </div>
                <div className="flex items-baseline justify-between sm:justify-start gap-3">
                  <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-36 shrink-0">Branch</span>
                  <span className="font-bold text-slate-800 text-right sm:text-left">{branch}</span>
                </div>
              </div>
            </div>

            {/* Request Notes Card */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group flex flex-col">
              <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100/90">
                <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <FileText className="w-3 h-3" />
                </div>
                <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                  Request Notes
                </h4>
              </div>

              <div className="relative z-10 flex-1 flex flex-col justify-between">
                <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-[11px] sm:text-[11.5px] text-slate-700 italic">
                  "{userNotes}"
                </div>

                <div className="mt-2.5 p-2 rounded-xl bg-indigo-50/50 border border-indigo-100/60 text-[10.5px] text-slate-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-indigo-900">Requested Payout Mode:</span>
                    <span className="font-bold text-slate-800">{paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-indigo-900">Target Settlement:</span>
                    <span className="font-bold text-slate-800">Direct Account Deposit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Processing History Timeline (Matching Image 2) */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2.5 border-b border-slate-100/90">
              <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Clock className="w-3 h-3" />
              </div>
              <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                Processing History
              </h4>
            </div>

            {/* Stepper with 4 Nodes */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-3">
              {/* Node 1 */}
              <div className="flex sm:flex-col items-center sm:items-start gap-2.5 sm:gap-1.5 bg-slate-50/60 sm:bg-transparent p-2 sm:p-0 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-xs">
                    ✓
                  </div>
                  <span className="font-bold text-[11px] text-slate-900">Request Submitted</span>
                </div>
                <div className="text-[10px] text-slate-500 sm:pl-7">
                  <div>31 Aug 2026, 10:24 AM</div>
                  <div className="text-[9.5px] text-slate-400">By {name}</div>
                </div>
              </div>

              {/* Node 2 */}
              <div className="flex sm:flex-col items-center sm:items-start gap-2.5 sm:gap-1.5 bg-slate-50/60 sm:bg-transparent p-2 sm:p-0 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-xs">
                    ✓
                  </div>
                  <span className="font-bold text-[11px] text-slate-900">Under Review</span>
                </div>
                <div className="text-[10px] text-slate-500 sm:pl-7">
                  <div>31 Aug 2026, 02:15 PM</div>
                  <div className="text-[9.5px] text-slate-400">Accounts Team</div>
                </div>
              </div>

              {/* Node 3 */}
              <div className="flex sm:flex-col items-center sm:items-start gap-2.5 sm:gap-1.5 bg-slate-50/60 sm:bg-transparent p-2 sm:p-0 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-xs">
                    ✓
                  </div>
                  <span className="font-bold text-[11px] text-slate-900">Approved</span>
                </div>
                <div className="text-[10px] text-slate-500 sm:pl-7">
                  <div>31 Aug 2026, 03:40 PM</div>
                  <div className="text-[9.5px] text-slate-400">Neha Sharma</div>
                </div>
              </div>

              {/* Node 4 */}
              <div className="flex sm:flex-col items-center sm:items-start gap-2.5 sm:gap-1.5 bg-slate-50/60 sm:bg-transparent p-2 sm:p-0 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 shadow-xs ${status === 'Approved' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                    {status === 'Approved' ? '✓' : '4'}
                  </div>
                  <span className="font-bold text-[11px] text-slate-900">Payment Processed</span>
                </div>
                <div className="text-[10px] text-slate-500 sm:pl-7">
                  <div>{processedOn}</div>
                  <div className="text-[9.5px] text-slate-400">Via {paymentMethod}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Remarks Card */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
            <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-1.5 border-b border-slate-100/90">
              <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <FileText className="w-3 h-3" />
              </div>
              <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                Admin Remarks
              </h4>
            </div>
            <p className="relative z-10 text-[11px] sm:text-[11.5px] text-slate-700 leading-relaxed">
              {adminRemarks}
            </p>
          </div>
        </div>

        {/* Footer Actions matching Image 2: Close and Download Details */}
        <div className="flex items-center justify-end gap-2.5 px-3.5 sm:px-5 py-2 sm:py-2.5 border-t border-slate-100 bg-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11.5px] font-bold shadow-2xs transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11.5px] font-bold shadow-xs shadow-indigo-200 transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Details</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
