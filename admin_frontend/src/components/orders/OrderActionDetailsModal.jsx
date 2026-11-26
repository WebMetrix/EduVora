import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X, Eye, ShoppingCart, Calendar, User, Mail, Phone, MapPin,
  Layers, BookOpen, Headphones, ExternalLink, CreditCard, Smartphone,
  Landmark, FileText, Download, ShoppingBag, GitCommitHorizontal, Check
} from 'lucide-react';

const PACKAGE_META = {
  'Elite Package': {
    subtitle: 'Access to all premium eBooks and audio books',
    ebooks: '12 eBooks (PDF / ePub)',
    audio: '12 Audio Books (MP3)',
    badgeBg: 'bg-rose-50 text-rose-600 border-rose-200/80',
  },
  'Pro Package': {
    subtitle: 'Comprehensive courses, eBooks & mentorship resources',
    ebooks: '8 eBooks (PDF / ePub)',
    audio: '8 Audio Books (MP3)',
    badgeBg: 'bg-amber-50 text-amber-600 border-amber-200/80',
  },
  'Growth Package': {
    subtitle: 'Essential skill-building bundle for growing learners',
    ebooks: '5 eBooks (PDF / ePub)',
    audio: '5 Audio Books (MP3)',
    badgeBg: 'bg-sky-50 text-sky-600 border-sky-200/80',
  },
  'Starter Package': {
    subtitle: 'Foundation courses and starter digital study kit',
    ebooks: '3 eBooks (PDF / ePub)',
    audio: '2 Audio Books (MP3)',
    badgeBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/80',
  },
};

const ORDER_STATUS_STYLES = {
  Completed: { pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/70', dot: 'bg-emerald-500' },
  Pending: { pill: 'bg-amber-50 text-amber-700 border-amber-200/70', dot: 'bg-amber-500' },
  Failed: { pill: 'bg-rose-50 text-rose-700 border-rose-200/70', dot: 'bg-rose-500' },
  Refunded: { pill: 'bg-sky-50 text-sky-700 border-sky-200/70', dot: 'bg-sky-500' },
};

const PAYMENT_STATUS_MAP = {
  Completed: 'Paid',
  Pending: 'Pending',
  Failed: 'Failed',
  Refunded: 'Refunded',
};

const PAYMENT_STATUS_STYLES = {
  Paid: { pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/70', dot: 'bg-emerald-500' },
  Pending: { pill: 'bg-amber-50 text-amber-700 border-amber-200/70', dot: 'bg-amber-500' },
  Failed: { pill: 'bg-rose-50 text-rose-700 border-rose-200/70', dot: 'bg-rose-500' },
  Refunded: { pill: 'bg-sky-50 text-sky-700 border-sky-200/70', dot: 'bg-sky-500' },
};

export default function OrderActionDetailsModal({
  order,
  isOpen,
  onClose,
  onViewInvoice,
  onActionToast,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !order || typeof document === 'undefined') return null;

  const pkgMeta = PACKAGE_META[order.package] || PACKAGE_META['Elite Package'];
  const orderStatusCfg = ORDER_STATUS_STYLES[order.status] || ORDER_STATUS_STYLES.Completed;
  const paymentStatus = PAYMENT_STATUS_MAP[order.status] || 'Paid';
  const payStatusCfg = PAYMENT_STATUS_STYLES[paymentStatus] || PAYMENT_STATUS_STYLES.Paid;

  const PaymentIcon =
    order.paymentMethod === 'Net Banking'
      ? Landmark
      : order.paymentMethod === 'UPI'
      ? Smartphone
      : CreditCard;

  const paymentGateway = order.gateway || 'Razorpay';
  const dob = order.dob || '15 Nov 1998';
  const location = order.location || 'Mumbai, Maharashtra, India';
  const amountFormatted = `₹${order.amount}`;

  const getTimelineSteps = () => {
    const dt = order.orderDate || '28 Oct 2026, 09:54 AM';
    if (order.status === 'Pending') {
      return [
        { label: 'Order Placed', time: dt, state: 'done' },
        { label: 'Payment Verification', time: 'In progress', state: 'pending' },
        { label: 'Order Confirmed', time: 'Awaiting payment', state: 'idle' },
        { label: 'Invoice Generated', time: 'Pending', state: 'idle' },
        { label: 'Content Activated', time: 'Pending', state: 'idle' },
      ];
    }
    if (order.status === 'Failed') {
      return [
        { label: 'Order Placed', time: dt, state: 'done' },
        { label: 'Payment Failed', time: dt, state: 'failed' },
        { label: 'Order Cancelled', time: 'Auto-closed', state: 'idle' },
        { label: 'Invoice Skipped', time: '-', state: 'idle' },
        { label: 'Content Locked', time: '-', state: 'idle' },
      ];
    }
    if (order.status === 'Refunded') {
      return [
        { label: 'Order Placed', time: dt, state: 'done' },
        { label: 'Payment Verified', time: dt, state: 'done' },
        { label: 'Order Confirmed', time: dt, state: 'done' },
        { label: 'Credit Note Issued', time: dt, state: 'done' },
        { label: 'Refund Processed', time: dt, state: 'done' },
      ];
    }
    return [
      { label: 'Order Placed', time: dt, state: 'done' },
      { label: 'Payment Verified', time: dt, state: 'done' },
      { label: 'Order Confirmed', time: dt, state: 'done' },
      { label: 'Invoice Generated', time: dt, state: 'done' },
      { label: 'Content Activated', time: dt, state: 'done' },
    ];
  };

  const timelineSteps = getTimelineSteps();

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-0" onClick={onClose} />

      {/* Compact Modal Card matching other detail popups + mobile bottom sheet */}
      <div className="w-full h-[92vh] sm:h-[86vh] sm:max-h-[86vh] sm:max-w-[860px] lg:max-w-[920px] bg-white rounded-t-3xl sm:rounded-[22px] flex flex-col shadow-2xl relative mt-auto sm:mt-0 overflow-hidden modal-slide-up sm:modal-fade-in z-10 border border-slate-200/90">
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
                Order Details
              </h2>
              <p className="text-[10.5px] sm:text-[11px] text-slate-500 font-medium truncate">
                Complete information of the selected order including user, package, payment and invoice.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700 cursor-pointer shrink-0"
            aria-label="Close Order Details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-3 custom-scrollbar bg-slate-50/40">
          {/* Top Overview Strip */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-white/95 to-indigo-50/35 border border-slate-200/80 p-3 sm:p-3.5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 items-center">
              {/* Order ID */}
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 bg-indigo-50/60 border border-indigo-100 rounded-xl px-2.5 py-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-semibold text-slate-500">Order ID</span>
                  <span className="block text-[11.5px] font-black text-indigo-700 truncate">
                    {order.orderId}
                  </span>
                </div>
              </div>

              {/* Order Date */}
              <div className="lg:border-l lg:border-slate-100 lg:pl-3">
                <span className="block text-[10px] font-semibold text-slate-400">Order Date</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11.5px] font-bold text-slate-800">{order.orderDate}</span>
                </div>
              </div>

              {/* Order Status */}
              <div className="lg:border-l lg:border-slate-100 lg:pl-3">
                <span className="block text-[10px] font-semibold text-slate-400 mb-1">Order Status</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${orderStatusCfg.pill}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${orderStatusCfg.dot}`} />
                  {order.status}
                </span>
              </div>

              {/* Payment Status */}
              <div className="lg:border-l lg:border-slate-100 lg:pl-3">
                <span className="block text-[10px] font-semibold text-slate-400 mb-1">Payment Status</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${payStatusCfg.pill}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${payStatusCfg.dot}`} />
                  {paymentStatus}
                </span>
              </div>

              {/* Payment Method */}
              <div className="lg:border-l lg:border-slate-100 lg:pl-3">
                <span className="block text-[10px] font-semibold text-slate-400 mb-1">Payment Method</span>
                <div className="inline-flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-md bg-emerald-50 border border-emerald-200/70 text-emerald-600 flex items-center justify-center shrink-0">
                    <PaymentIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[12px] font-bold text-slate-800">{order.paymentMethod}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 1: User Information + Package Details + Payment Information */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
            {/* User Information */}
            <div className="md:col-span-4 rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-[0_4px_18px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-3">
                  <User className="w-4 h-4 text-indigo-600 shrink-0" />
                  <h3 className="text-[13px] font-black text-indigo-700">User Information</h3>
                </div>

                <div className="flex items-center gap-2.5 mb-3">
                  <img
                    src={order.avatar}
                    alt={order.name}
                    className="w-10 h-10 rounded-full object-cover border border-indigo-100 shrink-0 shadow-2xs"
                  />
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-black text-slate-900 leading-tight truncate">
                      {order.name}
                    </p>
                    <p className="text-[11px] font-bold text-slate-400 mt-0.5">{order.userId}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11.5px] text-slate-600">
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate font-medium">{order.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium">{order.mobile}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium">{dob}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="font-medium leading-snug">{location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="md:col-span-4 rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-[0_4px_18px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-3">
                  <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
                  <h3 className="text-[13px] font-black text-indigo-700">Package Details</h3>
                </div>

                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs ${pkgMeta.badgeBg}`}
                    >
                      <Layers className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-black text-slate-900 leading-tight">
                        {order.package}
                      </p>
                      <p className="text-[10.5px] text-slate-500 font-medium leading-snug mt-0.5">
                        {pkgMeta.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-black text-[12px] shrink-0">
                    {amountFormatted}
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-2.5 space-y-2">
                  <span className="block text-[11px] font-bold text-indigo-700">Package Includes</span>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div className="space-y-1.5 text-[11px] font-semibold text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{pkgMeta.ebooks}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Headphones className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{pkgMeta.audio}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onActionToast?.('info', `Opening ${order.package} curriculum overview...`)
                      }
                      className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-700 text-[10.5px] font-bold transition-colors cursor-pointer shrink-0"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View Package</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="md:col-span-4 rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-[0_4px_18px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-3">
                  <CreditCard className="w-4 h-4 text-indigo-600 shrink-0" />
                  <h3 className="text-[13px] font-black text-indigo-700">Payment Information</h3>
                </div>

                <div className="space-y-2 text-[11.5px]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 font-medium">Transaction ID</span>
                    <span className="font-bold text-slate-800 text-right truncate">{order.txnId}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 font-medium">Payment Gateway</span>
                    <span className="font-bold text-slate-800">{paymentGateway}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 font-medium">Payment Date</span>
                    <span className="font-bold text-slate-800 text-right">{order.orderDate}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 font-medium">Amount</span>
                    <span className="font-black text-slate-900">{amountFormatted}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <span className="text-slate-500 font-medium">Payment Status</span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${payStatusCfg.pill}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${payStatusCfg.dot}`} />
                      {paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Invoice Information + Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
            {/* Invoice Information */}
            <div className="md:col-span-6 rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-[0_4px_18px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-3">
                <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                <h3 className="text-[13px] font-black text-indigo-700">Invoice Information</h3>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-2 text-[11.5px] flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 font-medium">Invoice No.</span>
                    <span className="font-bold text-slate-900">{order.invoiceNo}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 font-medium">Invoice Date</span>
                    <span className="font-semibold text-slate-700">{order.orderDate}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 font-medium">Invoice Amount</span>
                    <span className="font-black text-slate-900">{amountFormatted}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onViewInvoice?.(order)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-700 text-[11.5px] font-bold shadow-2xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Invoice</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onActionToast?.('success', `Invoice ${order.invoiceNo} resent to ${order.email}`)
                    }
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-700 text-[11.5px] font-bold shadow-2xs transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Resend Invoice</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-6 rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-[0_4px_18px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-3">
                <ShoppingBag className="w-4 h-4 text-indigo-600 shrink-0" />
                <h3 className="text-[13px] font-black text-indigo-700">Order Summary</h3>
              </div>

              <div className="space-y-1.5 text-[11.5px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Package Price</span>
                  <span className="font-bold text-slate-800">{amountFormatted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Discount</span>
                  <span className="font-bold text-slate-800">- ₹0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Taxes (GST 18%)</span>
                  <span className="font-bold text-slate-800">₹0</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-indigo-50/70 border border-indigo-100 px-3 py-2 mt-1.5">
                  <span className="text-[12.5px] font-black text-indigo-700">Total Paid</span>
                  <span className="text-[14px] font-black text-indigo-700">{amountFormatted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Order Timeline */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-[0_4px_18px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-3">
              <GitCommitHorizontal className="w-4 h-4 text-indigo-600 shrink-0" />
              <h3 className="text-[13px] font-black text-indigo-700">Order Timeline</h3>
            </div>

            {/* Desktop Horizontal Timeline */}
            <div className="hidden md:block pt-1">
              <div className="relative grid grid-cols-5 gap-2">
                {/* Connecting horizontal line behind circles */}
                <div className="absolute top-3 left-[10%] right-[10%] h-0.5 bg-emerald-500/80" />

                {timelineSteps.map((step, i) => {
                  const circleCls =
                    step.state === 'done'
                      ? 'bg-emerald-500 text-white'
                      : step.state === 'pending'
                      ? 'bg-amber-500 text-white'
                      : step.state === 'failed'
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-200 text-slate-500';
                  return (
                    <div key={i} className="relative z-10 flex flex-col items-center text-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shadow-xs ring-4 ring-white ${circleCls}`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-[11.5px] font-extrabold text-slate-900 mt-1.5 leading-tight">
                        {step.label}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400 mt-0.5 leading-tight">
                        {step.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Vertical Timeline */}
            <div className="md:hidden relative pl-5 space-y-3">
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-emerald-200" />
              {timelineSteps.map((step, i) => {
                const dotCls =
                  step.state === 'done'
                    ? 'bg-emerald-500'
                    : step.state === 'pending'
                    ? 'bg-amber-500'
                    : step.state === 'failed'
                    ? 'bg-rose-500'
                    : 'bg-slate-300';
                return (
                  <div key={i} className="relative flex items-center justify-between gap-2">
                    <span
                      className={`absolute -left-[18px] w-3 h-3 rounded-full ring-4 ring-white ${dotCls}`}
                    />
                    <span className="text-[11.5px] font-bold text-slate-900">{step.label}</span>
                    <span className="text-[10.5px] font-medium text-slate-400">{step.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-5 py-2.5 sm:py-3 border-t border-slate-100 bg-white flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12px] font-bold shadow-2xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
