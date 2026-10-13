import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Copy, CheckCircle2, Clock, XCircle, ArrowDownLeft, Download, ShieldCheck, Landmark } from 'lucide-react';
import { toast } from 'react-toastify';
import { BankTransferIcon, UpiIcon, PaypalIcon } from './PayoutIcons';

export default function PayoutDetailsModal({ isOpen, onClose, payout }) {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !payout) return null;

  const copyTransactionId = () => {
    navigator.clipboard.writeText(payout.transactionId);
    toast.success('Transaction ID copied to clipboard!');
  };

  const renderMethodIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'upi': return <UpiIcon className="w-5 h-5 shrink-0" />;
      case 'paypal': return <PaypalIcon className="w-5 h-5 shrink-0" />;
      default: return <BankTransferIcon className="w-5 h-5 text-slate-800 shrink-0" />;
    }
  };

  const isPaid = payout.status?.toLowerCase() === 'paid' || payout.status?.toLowerCase() === 'approved';
  const isPending = payout.status?.toLowerCase() === 'pending';
  const isRejected = payout.status?.toLowerCase() === 'rejected';

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div className="w-full h-auto max-h-[90vh] md:max-w-[520px] bg-white rounded-t-3xl md:rounded-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 overflow-hidden animate-slide-up md:animate-fade-in">
        
        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-[18px] md:text-[20px] font-extrabold text-[#1a1446]">Payout Details</h2>
            <p className="text-[12.5px] text-slate-500 font-medium mt-0.5">Reference information and transaction receipt</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4 flex flex-col gap-4">
          
          {/* Top Amount & Status Card */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Amount</span>
              <span className="text-[24px] md:text-[26px] font-black text-slate-900">
                ₹ {payout.amount}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</span>
              {isPaid && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/80">
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  <span className="capitalize">{payout.status || 'Paid'}</span>
                </span>
              )}
              {isPending && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-bold bg-amber-50 text-amber-600 border border-amber-200/80">
                  <Clock className="w-3.5 h-3.5" />
                  Pending
                </span>
              )}
              {isRejected && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-bold bg-rose-50 text-rose-600 border border-rose-200/80">
                  <XCircle className="w-3.5 h-3.5" />
                  Rejected
                </span>
              )}
            </div>
          </div>

          {/* Transaction Metadata Box */}
          <div className="bg-white border border-slate-200/80 rounded-xl divide-y divide-slate-100 text-[13px]">
            {/* Transaction ID */}
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Transaction ID</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 font-mono text-[12px]">{payout.transactionId}</span>
                <button
                  onClick={copyTransactionId}
                  className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                  title="Copy ID"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Payout Method */}
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Payout Method</span>
              <div className="flex items-center gap-2">
                {renderMethodIcon(payout.methodType)}
                <span className="font-bold text-slate-800">{payout.method}</span>
                {payout.methodDetail && (
                  <span className="text-slate-500 text-[12px]">({payout.methodDetail})</span>
                )}
              </div>
            </div>

            {/* Request Date */}
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Request Date</span>
              <span className="font-bold text-slate-800">{payout.requestDate}</span>
            </div>

            {/* Processed Date */}
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Processed Date</span>
              <span className="font-bold text-slate-800">{payout.processedDate || '-'}</span>
            </div>

            {/* Remarks */}
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Remarks</span>
              <span className={`font-semibold ${isRejected ? 'text-rose-600' : 'text-slate-800'}`}>
                {payout.remarks}
              </span>
            </div>
          </div>

          {/* Timeline Tracking Stepper */}
          <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">Timeline</span>
            
            <div className="space-y-3 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                  ✓
                </div>
                <div className="text-[12.5px] font-bold text-slate-800">Request Created</div>
                <div className="text-[11px] text-slate-400">{payout.requestDate}</div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full ${
                  isPaid ? 'bg-emerald-500 text-white' : isPending ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                } flex items-center justify-center text-[10px]`}>
                  {isPaid ? '✓' : isPending ? '•' : '✕'}
                </div>
                <div className="text-[12.5px] font-bold text-slate-800">
                  {isPaid ? 'Payment Processed' : isPending ? 'Bank Verification In Progress' : 'Request Rejected'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {payout.processedDate !== '-' ? payout.processedDate : 'Pending'}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-3 shrink-0 bg-white">
          <button
            onClick={() => {
              toast.info('Downloading payout receipt...');
            }}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-[13px] font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Receipt
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-[#4f3bf3] text-white text-[13px] font-bold hover:bg-indigo-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
