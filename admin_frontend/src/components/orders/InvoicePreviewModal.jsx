import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, FileText, Download, CheckCircle2, RotateCcw } from 'lucide-react';

export default function InvoicePreviewModal({ order, isOpen, onClose, onDownloadToast }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !order || typeof document === 'undefined') return null;

  const numericTotal = Number(String(order.amount || '0').replace(/[^0-9.]/g, '')) || 0;
  const subtotal = Math.round(numericTotal / 1.18);
  const gst = numericTotal - subtotal;
  const isRefunded = order.status === 'Refunded';

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="w-full max-h-[90vh] sm:max-w-[660px] bg-white rounded-t-3xl sm:rounded-[22px] flex flex-col shadow-2xl relative z-10 overflow-hidden modal-slide-up sm:modal-fade-in border border-slate-200/90">
        {/* Mobile Drag Handle */}
        <div
          onClick={onClose}
          className="w-full flex justify-center pt-2.5 pb-1 sm:hidden bg-white shrink-0 cursor-pointer"
        >
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-[14px] sm:text-[15px] font-bold text-slate-900 truncate">
                Tax Invoice • {order.invoiceNo}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 cursor-pointer"
            aria-label="Close invoice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar bg-slate-50/40">
          {/* Top Invoice Summary */}
          <div className="rounded-2xl bg-linear-to-br from-white/95 to-indigo-50/40 border border-slate-200/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-indigo-600">
                EduVora Learning Pvt. Ltd.
              </p>
              <h3 className="text-[16px] font-black text-slate-900 mt-0.5">{order.invoiceNo}</h3>
              <p className="text-[11.5px] text-slate-500 font-medium mt-0.5">
                Order ID: <span className="font-bold text-slate-700">{order.orderId}</span> • {order.orderDate}
              </p>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border self-start sm:self-center ${
                isRefunded
                  ? 'bg-sky-50 text-sky-700 border-sky-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              {isRefunded ? <RotateCcw className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              <span>{isRefunded ? 'Credit Note Issued (Refunded)' : 'Paid Invoice'}</span>
            </span>
          </div>

          {/* Billed To / Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 space-y-1">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                Billed To
              </span>
              <p className="text-[13px] font-black text-slate-900">{order.name}</p>
              <p className="text-[11.5px] text-slate-500 font-medium">User ID: {order.userId}</p>
              <p className="text-[11.5px] text-slate-500 font-medium">{order.email}</p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 space-y-1">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                Payment Reference
              </span>
              <p className="text-[13px] font-black text-slate-900">{order.paymentMethod}</p>
              <p className="text-[11.5px] text-slate-500 font-medium">Txn ID: {order.txnId}</p>
              <p className="text-[11.5px] text-slate-500 font-medium">
                Status: {isRefunded ? 'Refunded' : 'Paid'}
              </p>
            </div>
          </div>

          {/* Itemized Breakdown */}
          <div className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Item Description</span>
              <span>Amount</span>
            </div>
            <div className="p-4 space-y-2.5 text-[12px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">{order.package}</p>
                  <p className="text-[11px] text-slate-400">Digital Learning &amp; Access License</p>
                </div>
                <span className="font-bold text-slate-800">₹ {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-100">
                <span>GST (18%)</span>
                <span className="font-semibold text-slate-700">₹ {gst.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[13.5px] font-black text-slate-900">
                <span>Total Amount</span>
                <span className="text-indigo-700">₹ {order.amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-4 sm:px-5 py-3 border-t border-slate-100 bg-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12px] font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onDownloadToast?.(`Invoice ${order.invoiceNo} downloaded`);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-bold shadow-xs shadow-indigo-200 transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
