import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X, Eye, CreditCard, Calendar, Copy, Check, Layers, User, BookOpen,
  Headphones, ExternalLink, Clock, Settings, RefreshCw, Download, RotateCcw,
  FileText, Smartphone, Landmark, Wallet, Crown, Diamond, Star, Sparkles, CheckCircle2,
  AlertCircle, XCircle
} from 'lucide-react';

const STATUS_BADGE_MAP = {
  Successful: {
    pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    dot: 'bg-emerald-500',
    icon: CheckCircle2,
  },
  Pending: {
    pill: 'bg-amber-50 text-amber-700 border-amber-200/70',
    dot: 'bg-amber-500',
    icon: Clock,
  },
  Failed: {
    pill: 'bg-rose-50 text-rose-700 border-rose-200/70',
    dot: 'bg-rose-500',
    icon: XCircle,
  },
  Refunded: {
    pill: 'bg-sky-50 text-sky-700 border-sky-200/70',
    dot: 'bg-sky-500',
    icon: RotateCcw,
  },
};

const PACKAGE_STYLES = {
  'Elite Package': { icon: Crown, bg: 'bg-rose-50 text-rose-600 border-rose-200/80' },
  'Pro Package': { icon: Diamond, bg: 'bg-amber-50 text-amber-600 border-amber-200/80' },
  'Growth Package': { icon: Star, bg: 'bg-sky-50 text-sky-600 border-sky-200/80' },
  'Starter Package': { icon: Sparkles, bg: 'bg-indigo-50 text-indigo-600 border-indigo-200/80' },
};

const PAYMENT_METHOD_STYLES = {
  UPI: { icon: Smartphone, color: 'text-emerald-600 bg-emerald-50 border-emerald-200/70' },
  'Credit Card': { icon: CreditCard, color: 'text-indigo-600 bg-indigo-50 border-indigo-200/70' },
  'Debit Card': { icon: CreditCard, color: 'text-sky-600 bg-sky-50 border-sky-200/70' },
  'Net Banking': { icon: Landmark, color: 'text-violet-600 bg-violet-50 border-violet-200/70' },
  Wallet: { icon: Wallet, color: 'text-purple-600 bg-purple-50 border-purple-200/70' },
};

export default function TransactionDetailsModal({
  transaction,
  isOpen,
  onClose,
  onViewOrder,
  onViewInvoice,
  onInitiateRefund,
  onToast,
}) {
  const [copiedKey, setCopiedKey] = useState('');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setCopiedKey('');
  }, [transaction]);

  if (!isOpen || !transaction || typeof document === 'undefined') return null;

  const statusLabel =
    transaction.paymentStatus === 'Paid' ? 'Successful' : transaction.paymentStatus || 'Successful';
  const statusCfg = STATUS_BADGE_MAP[statusLabel] || STATUS_BADGE_MAP.Successful;
  const StatusTopIcon = statusCfg.icon;

  const pkgCfg = PACKAGE_STYLES[transaction.package] || PACKAGE_STYLES['Elite Package'];
  const PkgIcon = pkgCfg.icon;

  const methodCfg = PAYMENT_METHOD_STYLES[transaction.paymentMethod] || PAYMENT_METHOD_STYLES.UPI;
  const MethodIcon = methodCfg.icon;

  const gateway = transaction.gateway || 'Razorpay';
  const gatewayTxnId =
    transaction.gatewayTxnId || `pay_${transaction.txnId?.slice(-10) || 'O9Xk3D8f2T'}`;
  const gatewayRefNo =
    transaction.gatewayRefNo || `RPY${transaction.txnId?.slice(-10) || '7894561230'}`;
  const registeredOn = transaction.registeredOn || '15 Oct 2026, 11:20 AM';
  const verifiedAt =
    statusLabel === 'Successful' || statusLabel === 'Refunded'
      ? transaction.orderDate
      : 'Pending verification';
  const amountFormatted = `₹${transaction.amount}`;

  const handleCopy = (key, value, label) => {
    navigator.clipboard?.writeText(String(value));
    setCopiedKey(key);
    onToast?.('info', `Copied ${label} to clipboard.`);
    setTimeout(() => setCopiedKey(''), 1800);
  };

  const CopyBtn = ({ fieldKey, value, label }) => {
    const copied = copiedKey === fieldKey;
    return (
      <button
        type="button"
        onClick={() => handleCopy(fieldKey, value, label)}
        className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer shrink-0"
        title={`Copy ${label}`}
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-600" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
    );
  };

  const timelineSteps = (() => {
    const dt = transaction.orderDate || '28 Oct 2026, 09:54 AM';
    if (statusLabel === 'Pending') {
      return [
        { label: 'Payment Initiated', time: dt, state: 'done' },
        { label: 'Awaiting Gateway Callback', time: 'In progress', state: 'pending' },
        { label: 'Payment Verified', time: 'Pending', state: 'idle' },
        { label: 'Order Confirmed', time: 'Pending', state: 'idle' },
        { label: 'Package Activated', time: 'Pending', state: 'idle' },
      ];
    }
    if (statusLabel === 'Failed') {
      return [
        { label: 'Payment Initiated', time: dt, state: 'done' },
        { label: 'Gateway Declined', time: dt, state: 'failed' },
        { label: 'Verification Failed', time: dt, state: 'failed' },
        { label: 'Order Not Confirmed', time: '-', state: 'idle' },
        { label: 'Package Inactive', time: '-', state: 'idle' },
      ];
    }
    if (statusLabel === 'Refunded') {
      return [
        { label: 'Payment Initiated', time: dt, state: 'done' },
        { label: 'Payment Received (Gateway)', time: dt, state: 'done' },
        { label: 'Payment Verified', time: dt, state: 'done' },
        { label: 'Refund Approved', time: dt, state: 'refunded' },
        { label: 'Amount Refunded', time: dt, state: 'refunded' },
      ];
    }
    return [
      { label: 'Payment Initiated', time: dt.replace('09:54', '09:53'), state: 'done' },
      { label: 'Payment Received (Gateway)', time: dt, state: 'done' },
      { label: 'Payment Verified', time: dt, state: 'done' },
      { label: 'Order Confirmed', time: dt, state: 'done' },
      { label: 'Package Activated', time: dt, state: 'done' },
    ];
  })();

  const accessBanner =
    statusLabel === 'Successful'
      ? {
          cls: 'bg-emerald-50/90 border-emerald-200/70 text-emerald-800',
          iconCls: 'bg-emerald-500 text-white',
          Icon: Check,
          title: 'Access Activated',
          desc: "EBooks and audio content are available in the user's library.",
        }
      : statusLabel === 'Refunded'
      ? {
          cls: 'bg-sky-50/90 border-sky-200/70 text-sky-800',
          iconCls: 'bg-sky-500 text-white',
          Icon: RotateCcw,
          title: 'Access Revoked (Refunded)',
          desc: 'Package access disabled following refund completion.',
        }
      : statusLabel === 'Failed'
      ? {
          cls: 'bg-rose-50/90 border-rose-200/70 text-rose-800',
          iconCls: 'bg-rose-500 text-white',
          Icon: XCircle,
          title: 'Access Not Granted',
          desc: 'Transaction failed before content provisioning.',
        }
      : {
          cls: 'bg-amber-50/90 border-amber-200/70 text-amber-800',
          iconCls: 'bg-amber-500 text-white',
          Icon: AlertCircle,
          title: 'Awaiting Payment Verification',
          desc: 'Content will activate once gateway settlement confirms.',
        };

  const AccessIcon = accessBanner.Icon;

  const remarksNote =
    statusLabel === 'Successful'
      ? 'Payment successful and order confirmed. Package activated automatically.'
      : statusLabel === 'Pending'
      ? 'Payment is currently awaiting confirmation from the payment gateway.'
      : statusLabel === 'Failed'
      ? 'Transaction declined by the payment provider. User has not been charged.'
      : 'Full refund issued to original payment source and credit note generated.';

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-0" onClick={onClose} />

      {/* Compact Modal Card matching other popup windows + responsive mobile bottom sheet */}
      <div className="w-full h-[92vh] sm:h-[86vh] sm:max-h-[86vh] sm:max-w-[880px] lg:max-w-[940px] bg-white rounded-t-3xl sm:rounded-[22px] flex flex-col shadow-2xl relative mt-auto sm:mt-0 overflow-hidden modal-slide-up sm:modal-fade-in z-10 border border-slate-200/90">
        {/* Mobile Drag Handle */}
        <div
          onClick={onClose}
          className="w-full flex justify-center pt-2.5 pb-1 sm:hidden bg-white shrink-0 cursor-pointer"
        >
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-[14.5px] sm:text-[16px] font-black text-indigo-700 leading-tight truncate">
                Transaction Details
              </h2>
              <p className="text-[10.5px] sm:text-[11px] text-slate-500 font-medium truncate">
                Complete information about this payment transaction.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700 cursor-pointer shrink-0"
            aria-label="Close Transaction Details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-3 custom-scrollbar bg-slate-50/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
            {/* Left Main Grid (8 cols) */}
            <div className="lg:col-span-8 space-y-3">
              {/* Top Transaction Overview Banner */}
              <div className="rounded-2xl bg-linear-to-br from-white/95 to-indigo-50/35 border border-slate-200/80 p-3 shadow-[0_4px_18px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  {/* Txn ID + Copy */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-semibold text-slate-400">
                        Transaction ID
                      </span>
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="text-[12.5px] sm:text-[13.5px] font-black text-indigo-700 truncate">
                          {transaction.txnId}
                        </span>
                        <CopyBtn
                          fieldKey="txnId"
                          value={transaction.txnId}
                          label="Transaction ID"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status + Date */}
                  <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusCfg.pill}`}
                    >
                      <StatusTopIcon className="w-3.5 h-3.5" />
                      <span>{statusLabel}</span>
                    </span>

                    <div className="flex items-center gap-1.5 sm:border-l sm:border-slate-200/80 sm:pl-3">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <div className="leading-tight">
                        <span className="block text-[9.5px] font-semibold text-slate-400">
                          Transaction Date &amp; Time
                        </span>
                        <span className="block text-[11px] font-bold text-slate-800">
                          {transaction.orderDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 1: Payment & Order Details + Payment Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
                {/* Payment & Order Details */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-[0_4px_18px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-2.5">
                    <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
                    <h3 className="text-[12.5px] font-black text-indigo-700">
                      Payment &amp; Order Details
                    </h3>
                  </div>

                  <div className="space-y-2 text-[11.5px]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Order ID</span>
                      <div className="flex items-center gap-1 min-w-0">
                        <button
                          type="button"
                          onClick={() => onViewOrder?.(transaction)}
                          className="font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-2 truncate cursor-pointer"
                        >
                          {transaction.orderId}
                        </button>
                        <CopyBtn
                          fieldKey="orderId"
                          value={transaction.orderId}
                          label="Order ID"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">User</span>
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={transaction.avatar}
                          alt={transaction.name}
                          className="w-6 h-6 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div className="text-right leading-tight min-w-0">
                          <span className="block font-bold text-slate-900 truncate">
                            {transaction.name}
                          </span>
                          <span className="block text-[10px] font-semibold text-slate-400">
                            {transaction.userId}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Package</span>
                      <div className="inline-flex items-center gap-1.5">
                        <span
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${pkgCfg.bg}`}
                        >
                          <PkgIcon className="w-3 h-3" />
                        </span>
                        <span className="font-bold text-slate-800">{transaction.package}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Package Amount</span>
                      <span className="font-bold text-slate-800">{amountFormatted}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Discount</span>
                      <span className="font-bold text-emerald-600">- ₹0</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-100">
                      <span className="font-bold text-slate-700">Paid Amount</span>
                      <span className="text-[13.5px] font-black text-slate-900">
                        {amountFormatted}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-[0_4px_18px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-2.5">
                    <CreditCard className="w-4 h-4 text-indigo-600 shrink-0" />
                    <h3 className="text-[12.5px] font-black text-indigo-700">
                      Payment Information
                    </h3>
                  </div>

                  <div className="space-y-2 text-[11.5px]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Payment Method</span>
                      <div className="inline-flex items-center gap-1.5">
                        <span
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${methodCfg.color}`}
                        >
                          <MethodIcon className="w-3 h-3" />
                        </span>
                        <span className="font-bold text-slate-800">{transaction.paymentMethod}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Payment Gateway</span>
                      <span className="font-bold text-slate-800">{gateway}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium shrink-0">Gateway Txn ID</span>
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="font-bold text-slate-800 truncate">{gatewayTxnId}</span>
                        <CopyBtn
                          fieldKey="gatewayTxnId"
                          value={gatewayTxnId}
                          label="Gateway Txn ID"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium shrink-0">Gateway Ref No.</span>
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="font-bold text-slate-800 truncate">{gatewayRefNo}</span>
                        <CopyBtn
                          fieldKey="gatewayRefNo"
                          value={gatewayRefNo}
                          label="Gateway Ref No."
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Payment Status</span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold border ${statusCfg.pill}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                        {statusLabel}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Payment Verified At</span>
                      <span className="font-bold text-slate-800 text-right">{verifiedAt}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Customer Details + Product Access */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
                {/* Customer Details */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-[0_4px_18px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-2.5">
                    <User className="w-4 h-4 text-indigo-600 shrink-0" />
                    <h3 className="text-[12.5px] font-black text-indigo-700">Customer Details</h3>
                  </div>

                  <div className="space-y-2 text-[11.5px]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Full Name</span>
                      <span className="font-bold text-slate-900">{transaction.name}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Email</span>
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="font-semibold text-slate-800 truncate">
                          {transaction.email}
                        </span>
                        <CopyBtn fieldKey="email" value={transaction.email} label="Email" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Mobile</span>
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="font-semibold text-slate-800">{transaction.mobile}</span>
                        <CopyBtn fieldKey="mobile" value={transaction.mobile} label="Mobile" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Registered On</span>
                      <span className="font-bold text-slate-800">{registeredOn}</span>
                    </div>
                  </div>
                </div>

                {/* Product Access */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-[0_4px_18px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 space-y-2.5">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
                    <h3 className="text-[12.5px] font-black text-indigo-700">Product Access</h3>
                  </div>

                  <div className={`rounded-xl border p-2.5 flex items-start gap-2.5 ${accessBanner.cls}`}>
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${accessBanner.iconCls}`}
                    >
                      <AccessIcon className="w-3 h-3 stroke-[3]" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11.5px] font-black leading-tight">{accessBanner.title}</p>
                      <p className="text-[10px] font-medium opacity-85 leading-snug mt-0.5">
                        {accessBanner.desc}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl border border-slate-100 bg-slate-50/70">
                      <div className="flex items-center gap-2 min-w-0 text-[11.5px] font-bold text-slate-800">
                        <BookOpen className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{transaction.package} – EBook</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          onToast?.('info', `Opening ${transaction.package} EBook library...`)
                        }
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-700 text-[10.5px] font-bold cursor-pointer shrink-0"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>View</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl border border-slate-100 bg-slate-50/70">
                      <div className="flex items-center gap-2 min-w-0 text-[11.5px] font-bold text-slate-800">
                        <Headphones className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{transaction.package} – Audio</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          onToast?.('info', `Opening ${transaction.package} Audio library...`)
                        }
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-700 text-[10.5px] font-bold cursor-pointer shrink-0"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar Column (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              {/* Transaction Timeline */}
              <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-[0_4px_18px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-3">
                  <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                  <h3 className="text-[12.5px] font-black text-indigo-700">
                    Transaction Timeline
                  </h3>
                </div>

                <div className="relative pl-5 space-y-3">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-emerald-200" />
                  {timelineSteps.map((step, idx) => {
                    const dotCls =
                      step.state === 'done'
                        ? 'bg-emerald-500 text-white'
                        : step.state === 'pending'
                        ? 'bg-amber-500 text-white'
                        : step.state === 'failed'
                        ? 'bg-rose-500 text-white'
                        : step.state === 'refunded'
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-200 text-slate-400';
                    return (
                      <div key={idx} className="relative flex items-start gap-2">
                        <span
                          className={`absolute -left-[20px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white ${dotCls}`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <div className="min-w-0 leading-tight">
                          <p className="text-[11.5px] font-bold text-slate-900">{step.label}</p>
                          <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                            {step.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions Card */}
              <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-[0_4px_18px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 space-y-2">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-1">
                  <Settings className="w-4 h-4 text-indigo-600 shrink-0" />
                  <h3 className="text-[12.5px] font-black text-indigo-700">Actions</h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onToast?.(
                      'success',
                      `Invoice ${transaction.invoiceNo} resent to ${transaction.email}`
                    )
                  }
                  className="w-full py-2 px-3 rounded-xl border border-indigo-200/80 bg-white hover:bg-indigo-50 text-indigo-700 text-[11.5px] font-bold shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Resend Invoice</span>
                </button>

                <button
                  type="button"
                  onClick={() => onViewInvoice?.(transaction)}
                  className="w-full py-2 px-3 rounded-xl border border-indigo-200/80 bg-white hover:bg-indigo-50 text-indigo-700 text-[11.5px] font-bold shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Invoice</span>
                </button>

                <button
                  type="button"
                  disabled={statusLabel === 'Refunded' || statusLabel === 'Failed'}
                  onClick={() => onInitiateRefund?.(transaction)}
                  className="w-full py-2 px-3 rounded-xl border border-indigo-200/80 bg-white hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 disabled:opacity-45 disabled:hover:bg-white disabled:hover:text-indigo-700 disabled:cursor-not-allowed text-indigo-700 text-[11.5px] font-bold shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{statusLabel === 'Refunded' ? 'Refund Processed' : 'Initiate Refund'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Full-Width Notes / Remarks Strip */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-[0_4px_18px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
            <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100 mb-2">
              <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
              <h3 className="text-[12.5px] font-black text-indigo-700">Notes / Remarks</h3>
            </div>
            <p className="text-[11.5px] font-medium text-slate-600 leading-relaxed">
              {remarksNote}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-5 py-2.5 sm:py-3 border-t border-slate-100 bg-white flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-[12px] font-bold shadow-xs shadow-indigo-600/20 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
