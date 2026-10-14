import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, FileText, Download, Check, Clock, XCircle, Landmark, CheckSquare, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import { BankTransferIcon, UpiIcon, PaypalIcon } from './PayoutIcons';

export default function PayoutDetailsModal({ isOpen, onClose, payout }) {
  // Prevent scroll when modal is open and handle layout shift
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

  const isPaid = payout.status?.toLowerCase() === 'paid' || payout.status?.toLowerCase() === 'approved';
  const isPending = payout.status?.toLowerCase() === 'pending';
  const isRejected = payout.status?.toLowerCase() === 'rejected';

  // Request ID matching reference mockup PR prefix
  const requestId = payout.transactionId?.startsWith('TRX')
    ? 'PR' + payout.transactionId.slice(3)
    : (payout.transactionId || 'PR202608150001');

  // Transaction reference matching TXN prefix
  const transactionRef = payout.transactionId?.startsWith('TRX')
    ? 'TXN' + payout.transactionId.slice(3)
    : (payout.transactionId ? 'TXN' + payout.transactionId : 'TXN20260818001234');

  // Account display
  const accountDisplay = payout.methodDetail || (
    payout.methodType === 'upi'
      ? 'subham@upi'
      : payout.methodType === 'paypal'
        ? 'subham@gmail.com'
        : '**** 1234'
  );

  // Admin remarks mapping
  const adminRemarks = payout.remarks && payout.remarks !== '-'
    ? payout.remarks
    : isRejected
      ? 'Bank account name mismatch'
      : isPending
        ? 'Under review'
        : 'Transferred sucessfully';

  const renderMethodIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'upi':
        return <UpiIcon className="w-6 h-6 shrink-0" />;
      case 'paypal':
        return <PaypalIcon className="w-6 h-6 shrink-0" />;
      case 'bank':
      default:
        return <BankTransferIcon className="w-6 h-6 text-slate-800 shrink-0" />;
    }
  };

  // Download Receipt Generator
  const handleDownloadReceipt = () => {
    const receiptContent = `=========================================
          EDUVORA PAYOUT RECEIPT          
=========================================
Request ID:           ${requestId}
Transaction Reference:${transactionRef}
Date of Request:      ${payout.requestDate || '15 Aug 2026'}
Processed Date:       ${payout.processedDate && payout.processedDate !== '-' ? payout.processedDate : '18 Aug 2026'}
Status:               ${(payout.status || 'Paid').toUpperCase()}

-----------------------------------------
PAYMENT DETAILS
-----------------------------------------
Payout Method:        ${payout.method || 'Bank Transfer'}
Account Number:       ${accountDisplay}
Account Holder:       Subham Chakraborty
${payout.methodType === 'bank' ? 'IFSC Code:            SBIN0001234\n' : ''}Requested Amount:     ₹ ${payout.amount}
Processing Fee:       ₹ 0.00
Total Amount:         ₹ ${payout.amount}

-----------------------------------------
REMARKS
-----------------------------------------
User Remarks:         ${payout.userRemarks || '-'}
Admin Remarks:        ${adminRemarks}

=========================================
Thank you for partnering with EduVora!
For any queries, please contact support.
=========================================`;

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${requestId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Receipt for ${requestId} downloaded!`);
  };

  // Timeline Step Status Configuration
  const timelineSteps = [
    {
      id: 1,
      title: 'Request Submitted',
      time: `${payout.requestDate || '15 Aug 2026'}, 10:24 AM`,
      desc: 'Your payout request has been submitted successfully.',
      isDone: true,
      isCurrent: false,
      isFailed: false
    },
    {
      id: 2,
      title: 'Under Review',
      time: isPending ? 'In Progress' : '16 Aug 2026, 11:15 AM',
      desc: isPending
        ? 'Your request is currently being verified by our finance team.'
        : 'Your request is being reviewed by our team.',
      isDone: isPaid || isRejected,
      isCurrent: isPending,
      isFailed: false
    },
    {
      id: 3,
      title: isRejected ? 'Rejected' : 'Approved',
      time: isRejected ? '16 Aug 2026, 02:10 PM' : isPaid ? '17 Aug 2026, 04:30 PM' : 'Pending',
      desc: isRejected
        ? 'Your request was rejected. Reason: ' + adminRemarks
        : isPaid
          ? 'Your request has been approved.'
          : 'Awaiting approval from admin.',
      isDone: isPaid || isRejected,
      isCurrent: false,
      isFailed: isRejected
    },
    {
      id: 4,
      title: 'Payment Processed',
      time: isPaid ? '18 Aug 2026, 10:20 AM' : '-',
      desc: isPaid
        ? 'Payment has been transferred to your bank account.'
        : isRejected
          ? 'Payment cancelled due to rejection.'
          : 'Payment will be initiated upon approval.',
      isDone: isPaid,
      isCurrent: false,
      isFailed: false
    },
    {
      id: 5,
      title: 'Paid',
      time: isPaid ? `${payout.processedDate && payout.processedDate !== '-' ? payout.processedDate : '18 Aug 2026'}, 10:25 AM` : '-',
      desc: isPaid
        ? 'Payment completed successfully.'
        : isRejected
          ? 'Payout closed.'
          : 'Funds will reflect in your account within 2-5 days.',
      isDone: isPaid,
      isCurrent: false,
      isFailed: false
    }
  ];

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      {/* Modal Dialog Container */}
      <div className="w-full h-[92vh] md:h-auto md:max-h-[90vh] md:max-w-4xl bg-white rounded-t-3xl md:rounded-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 overflow-hidden animate-slide-up md:animate-fade-in">

        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Modal Header - Identical to RequestPayoutModal */}
        <div className="flex items-start justify-between px-5 md:px-7 pt-3.5 pb-2 md:pt-4 md:pb-2.5 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-[19px] md:text-[21px] font-black text-[#1a1446] tracking-tight leading-tight">
              Payout Request Details
            </h2>
            <p className="text-[12px] md:text-[12.5px] text-slate-500 font-medium mt-0.5">
              View the complete details of your payout request including status, payment information and processing history.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 -mr-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer -mt-0.5"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-5 md:px-7 pt-3 md:pt-3.5 pb-4 md:pb-5 flex flex-col gap-3.5">

          {/* Top Two Summary Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 md:gap-4 items-stretch">

            {/* Card 1: Request ID & Status Badge */}
            <div className="md:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                {renderMethodIcon(payout.methodType)}
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Request ID
                </span>

                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-[17px] sm:text-[19px] font-black text-[#1a1446] font-mono tracking-tight">
                    {requestId}
                  </span>

                  {/* Status Badge */}
                  {isPaid && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/70 inline-flex items-center gap-1 shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span className="capitalize">{payout.status || 'Paid'}</span>
                    </span>
                  )}
                  {isPending && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-50 text-amber-600 border border-amber-200/70 inline-flex items-center gap-1 shadow-2xs">
                      <Clock className="w-3 h-3 stroke-[2.5]" />
                      Pending
                    </span>
                  )}
                  {isRejected && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-rose-50 text-rose-600 border border-rose-200/70 inline-flex items-center gap-1 shadow-2xs">
                      <X className="w-3 h-3 stroke-[2.5]" />
                      Rejected
                    </span>
                  )}
                </div>

                <p className="text-[11px] sm:text-[11.5px] text-slate-400 font-medium mt-0.5">
                  Requested on {payout.requestDate || '15 Aug 2026'}, 10:24 AM
                </p>
              </div>
            </div>

            {/* Card 2: Payout Amount with purple/indigo gradient */}
            <div className="md:col-span-5 bg-linear-to-br from-indigo-50/70 via-purple-50/40 to-white border border-indigo-100/80 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100/80 flex items-center justify-center shrink-0 text-[#4f3bf3] shadow-xs">
                <Landmark className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[12px] font-bold text-slate-600 block">
                  Payout Amount
                </span>
                <span className="text-[22px] sm:text-[24px] font-black text-[#1a1446] tracking-tight block">
                  ₹ {payout.amount}
                </span>
              </div>
            </div>

          </div>

          {/* Two Columns Grid: Left (Payout Info & Remarks), Right (Status Timeline) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 items-stretch">

            {/* Left Column (7 cols): Payout Information & Remarks */}
            <div className="md:col-span-7 flex flex-col gap-4">

              {/* Card A: Payout Information */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs">
                <div className="flex items-center gap-2 text-[#1a1446] font-extrabold text-[13px] mb-3">
                  <FileText className="w-4 h-4 text-[#4f3bf3]" />
                  <span>Payout Information</span>
                </div>

                <div className="space-y-2.5 text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Payout Method</span>
                    <span className="font-bold text-slate-800">{payout.method || 'Bank Transfer'}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Account Number</span>
                    <span className="font-bold text-slate-800 font-mono text-[11.5px]">{accountDisplay}</span>
                  </div>

                  {payout.methodType === 'bank' && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">IFSC Code</span>
                      <span className="font-bold text-slate-800 font-mono text-[11.5px]">SBIN0001234</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Account Holder Name</span>
                    <span className="font-bold text-slate-800">Subham Chakraborty</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Requested Amount</span>
                    <span className="font-bold text-slate-800">₹ {payout.amount}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Processing Fee</span>
                    <span className="font-bold text-slate-800">₹ 0.00</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-slate-700 font-bold">Total Amount</span>
                    <span className="font-black text-slate-900 text-[13.5px]">₹ {payout.amount}</span>
                  </div>
                </div>
              </div>

              {/* Card B: Remarks */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs">
                <div className="flex items-center gap-2 text-[#1a1446] font-extrabold text-[13px] mb-3">
                  <FileText className="w-4 h-4 text-[#4f3bf3]" />
                  <span>Remarks</span>
                </div>

                <div className="space-y-2.5 text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">User Remarks</span>
                    <span className="font-medium text-slate-700">{payout.userRemarks || '-'}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Admin Remarks</span>
                    <span className="font-semibold text-slate-800">{adminRemarks}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Transaction Reference</span>
                    <span className="font-bold text-slate-800 font-mono text-[11.5px]">{transactionRef}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (5 cols): Status Timeline & Download Button */}
            <div className="md:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center gap-2 text-[#1a1446] font-extrabold text-[13px] mb-4">
                  <FileText className="w-4 h-4 text-[#4f3bf3]" />
                  <span>Status Timeline</span>
                </div>

                {/* Vertical Stepper Timeline with connecting lines */}
                <div className="space-y-4 relative pl-7">
                  {/* Connecting line */}
                  <div className="absolute left-[11px] top-2 bottom-3 w-0.5 bg-emerald-500" />

                  {timelineSteps.map((step) => {
                    return (
                      <div key={step.id} className="relative">
                        {/* Circle Indicator on the line */}
                        <div
                          className={`absolute -left-7 top-0 w-6 h-6 rounded-full flex items-center justify-center text-white z-10 shadow-2xs ${step.isFailed
                            ? 'bg-rose-500'
                            : step.isDone
                              ? 'bg-emerald-500'
                              : step.isCurrent
                                ? 'bg-amber-500'
                                : 'bg-slate-300'
                            }`}
                        >
                          {step.isFailed ? (
                            <X className="w-3.5 h-3.5 stroke-[2.5]" />
                          ) : step.isDone ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>

                        {/* Step Content */}
                        <div className="min-w-0">
                          <div className="text-[12.5px] font-extrabold text-[#1a1446] leading-tight">
                            {step.title}
                          </div>
                          <div className="text-[10.5px] font-medium text-slate-400 mt-0.5">
                            {step.time}
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5">
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Download Receipt Button aligned to bottom right */}
              <div className="flex justify-end pt-5 border-t border-slate-100/80 mt-4">
                <button
                  type="button"
                  onClick={handleDownloadReceipt}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-indigo-200/80 bg-white hover:bg-indigo-50/60 text-[#4f3bf3] font-bold text-[12px] transition-all shadow-2xs active:scale-95 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Receipt</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="flex items-center justify-end px-5 md:px-7 py-3 border-t border-slate-100 bg-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[12.5px] transition-all cursor-pointer active:scale-95"
          >
            Close
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
