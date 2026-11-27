import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X, RotateCcw, Check, Clock, XCircle, Copy, CreditCard, User,
  FileText, AlertCircle, Calendar, Plus
} from 'lucide-react';
import CustomSelect from '../common/CustomSelect';

const STATUS_BADGE = {
  Refunded: { pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/70', Icon: Check },
  'In Progress': { pill: 'bg-sky-50 text-sky-700 border-sky-200/70', Icon: RotateCcw },
  Requested: { pill: 'bg-amber-50 text-amber-700 border-amber-200/70', Icon: Clock },
  Rejected: { pill: 'bg-rose-50 text-rose-700 border-rose-200/70', Icon: XCircle },
};

export function RefundDetailsModal({
  refund,
  isOpen,
  onClose,
  onStatusUpdate,
  onToast,
}) {
  const [remarks, setRemarks] = useState('');
  const [remarksError, setRemarksError] = useState('');
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
    if (refund) {
      setRemarks(refund.adminRemarks || '');
      setRemarksError('');
      setCopiedKey('');
    }
  }, [refund]);

  if (!isOpen || !refund || typeof document === 'undefined') return null;

  const badgeCfg = STATUS_BADGE[refund.status] || STATUS_BADGE.Requested;
  const StatusIcon = badgeCfg.Icon;

  const handleCopy = (key, val, label) => {
    navigator.clipboard?.writeText(String(val));
    setCopiedKey(key);
    onToast?.('info', `Copied ${label}.`);
    setTimeout(() => setCopiedKey(''), 1600);
  };

  const handleAction = (newStatus) => {
    const trimmed = remarks.trim();
    if (newStatus === 'Rejected' && !trimmed) {
      setRemarksError('Internal remarks are required when rejecting a refund request.');
      return;
    }
    setRemarksError('');
    onStatusUpdate?.(refund.refundId, newStatus, trimmed);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="w-full h-[90vh] sm:h-auto sm:max-h-[86vh] sm:max-w-[740px] bg-white rounded-t-3xl sm:rounded-[22px] flex flex-col shadow-2xl relative mt-auto sm:mt-0 overflow-hidden modal-slide-up sm:modal-fade-in z-10 border border-slate-200/90">
        {/* Mobile Drag Handle */}
        <div
          onClick={onClose}
          className="w-full flex justify-center pt-2.5 pb-1 sm:hidden bg-white shrink-0 cursor-pointer"
        >
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-[14.5px] sm:text-[15.5px] font-black text-indigo-700 truncate">
                Refund Request Details
              </h2>
              <p className="text-[10.5px] sm:text-[11px] text-slate-500 font-medium truncate">
                Review refund eligibility, transaction reference and processing status.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-4 space-y-3 custom-scrollbar bg-slate-50/40">
          {/* Overview Strip */}
          <div className="rounded-2xl bg-linear-to-br from-white/95 to-indigo-50/35 border border-slate-200/80 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="min-w-0">
              <span className="text-[10px] font-semibold text-slate-400 block">Refund ID</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[13.5px] font-black text-indigo-700">{refund.refundId}</span>
                <button
                  type="button"
                  onClick={() => handleCopy('rfd', refund.refundId, 'Refund ID')}
                  className="p-1 rounded-md text-slate-400 hover:text-indigo-600 cursor-pointer"
                >
                  {copiedKey === 'rfd' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Requested: {refund.requestDate}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-center">
              <div className="text-left sm:text-right">
                <span className="block text-[10px] font-semibold text-slate-400">Refund Amount</span>
                <span className="text-[17px] font-black text-slate-900">₹{refund.amount}</span>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${badgeCfg.pill}`}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                <span>{refund.status}</span>
              </span>
            </div>
          </div>

          {/* 2-Column Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 space-y-2 text-[11.5px]">
              <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                <User className="w-4 h-4 text-indigo-600" />
                <h3 className="text-[12.5px] font-black text-indigo-700">Customer &amp; Package</h3>
              </div>
              <div className="flex items-center gap-2.5 py-1">
                <img
                  src={refund.avatar}
                  alt={refund.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate">{refund.name}</p>
                  <p className="text-[10.5px] font-semibold text-slate-400">{refund.userId}</p>
                </div>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Email</span>
                <span className="font-semibold text-slate-800 truncate">{refund.email}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Package</span>
                <span className="font-bold text-slate-900">{refund.package}</span>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 space-y-2 text-[11.5px]">
              <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                <h3 className="text-[12.5px] font-black text-indigo-700">Payment &amp; Method</h3>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Order ID</span>
                <span className="font-bold text-slate-800">{refund.orderId}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Transaction ID</span>
                <span className="font-bold text-slate-800">{refund.txnId}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Refund Method</span>
                <span className="font-bold text-indigo-700">{refund.refundMethod}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Reason</span>
                <span className="font-semibold text-slate-700 text-right">
                  {refund.reason || 'Duplicate purchase request'}
                </span>
              </div>
            </div>
          </div>

          {/* Internal Remarks Card */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <h3 className="text-[12.5px] font-black text-indigo-700">Resolution Remarks</h3>
              </div>
              <span className="text-[10px] font-medium text-slate-400">
                Required if rejecting
              </span>
            </div>

            <textarea
              value={remarks}
              onChange={(e) => {
                setRemarks(e.target.value.slice(0, 300));
                if (remarksError && e.target.value.trim()) setRemarksError('');
              }}
              rows={2}
              placeholder="Enter processing notes or rejection reason..."
              className={`w-full rounded-xl px-3 py-2 text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none resize-none border ${
                remarksError
                  ? 'border-rose-400 bg-rose-50/40 focus:ring-4 focus:ring-rose-500/15'
                  : 'border-slate-200/90 bg-slate-50/60 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
              }`}
            />
            {remarksError && (
              <p className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{remarksError}</span>
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-5 py-3 border-t border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12px] font-bold cursor-pointer order-4 sm:order-1"
          >
            Close
          </button>

          <div className="grid grid-cols-3 sm:flex items-center gap-2 order-1 sm:order-2">
            <button
              type="button"
              onClick={() => handleAction('Rejected')}
              className="px-3 py-2 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 text-[11.5px] font-bold cursor-pointer transition-colors"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => handleAction('In Progress')}
              className="px-3 py-2 rounded-xl border border-sky-200 bg-white hover:bg-sky-50 text-sky-700 text-[11.5px] font-bold cursor-pointer transition-colors"
            >
              In Progress
            </button>
            <button
              type="button"
              onClick={() => handleAction('Refunded')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11.5px] font-bold shadow-xs cursor-pointer transition-colors"
            >
              Approve Refund
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function InitiateRefundModal({ isOpen, onClose, onCreateRefund }) {
  const [orderId, setOrderId] = useState('ORD-202610280954');
  const [txnId, setTxnId] = useState('TXN784532109654');
  const [userName, setUserName] = useState('Priya Sharma');
  const [packageName, setPackageName] = useState('Elite Package');
  const [amount, setAmount] = useState('9,999');
  const [refundMethod, setRefundMethod] = useState('Original Method');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

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

  if (!isOpen || typeof document === 'undefined') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderId.trim() || !txnId.trim() || !amount.trim() || !reason.trim()) {
      setError('Please fill Order ID, Transaction ID, Amount, and Refund Reason.');
      return;
    }
    setError('');
    onCreateRefund?.({
      orderId: orderId.trim(),
      txnId: txnId.trim(),
      name: userName.trim() || 'Priya Sharma',
      package: packageName,
      amount: amount.trim(),
      refundMethod,
      reason: reason.trim(),
    });
    setReason('');
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-0" onClick={onClose} />

      <form
        onSubmit={handleSubmit}
        className="w-full max-h-[92vh] sm:max-w-[520px] bg-white rounded-t-3xl sm:rounded-[22px] flex flex-col shadow-2xl relative mt-auto sm:mt-0 overflow-hidden modal-slide-up sm:modal-fade-in z-10 border border-slate-200/90"
      >
        <div
          onClick={onClose}
          className="w-full flex justify-center pt-2.5 pb-1 sm:hidden bg-white shrink-0 cursor-pointer"
        >
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <h2 className="text-[14.5px] sm:text-[15.5px] font-black text-indigo-700">
              Initiate Refund Request
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-slate-50/40 text-[12px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Order ID</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Transaction ID
              </label>
              <input
                type="text"
                value={txnId}
                onChange={(e) => setTxnId(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">User Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Refund Amount (₹)
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Package</label>
              <CustomSelect
                options={[
                  { label: 'Elite Package', value: 'Elite Package' },
                  { label: 'Pro Package', value: 'Pro Package' },
                  { label: 'Growth Package', value: 'Growth Package' },
                  { label: 'Starter Package', value: 'Starter Package' },
                ]}
                value={packageName}
                onChange={setPackageName}
                buttonClassName="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
                textClassName="text-[12px] font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Refund Method
              </label>
              <CustomSelect
                options={[
                  { label: 'Original Method', value: 'Original Method' },
                  { label: 'Credit Card', value: 'Credit Card' },
                  { label: 'UPI', value: 'UPI' },
                  { label: 'Wallet', value: 'Wallet' },
                ]}
                value={refundMethod}
                onChange={setRefundMethod}
                buttonClassName="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
                textClassName="text-[12px] font-bold text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Reason for Refund <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError('');
              }}
              rows={2}
              placeholder="Explain why this refund is being initiated..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          {error && (
            <p className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </p>
          )}
        </div>

        <div className="px-4 sm:px-5 py-3 border-t border-slate-100 bg-white flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12px] font-bold cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-bold shadow-xs cursor-pointer"
          >
            Submit Refund Request
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
}
