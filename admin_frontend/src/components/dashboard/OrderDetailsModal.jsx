import React, { useState, useEffect } from 'react';
import {
  X, FileText, ShoppingBag, ShoppingCart, User, Package,
  BookOpen, Clock, Download, RotateCcw, Copy, Check,
  ExternalLink, Bot, CheckCircle2
} from 'lucide-react';

export default function OrderDetailsModal({ order, isOpen, onClose }) {
  const [copiedTxn, setCopiedTxn] = useState(false);

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

  if (!isOpen || !order) return null;

  // Resolve order fields with realistic defaults matching Image 1
  const orderId = order.orderId || 'OR20260831001';
  const userName = order.name || order.userName || 'Rajesh Kumar';
  const userId = order.userId || 'EVU001248';
  const avatar = order.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80';
  const email = order.email || (userName ? `${userName.toLowerCase().replace(/\s+/g, '')}@gmail.com` : 'rajesh@gmail.com');
  const mobile = order.mobile || '+91 98765 43210';
  const orderDate = order.orderDate || order.date || '31 Aug 2026, 10:24 AM';
  const status = order.status || order.orderStatus || 'Completed';
  const packageName = order.package || 'Business Starter';
  const amount = order.amount ? String(order.amount).replace(/[^0-9,]/g, '') : '5,200';
  const paymentMethod = order.paymentMethod || 'UPI';
  const paymentStatus = order.paymentStatus || (status === 'Completed' ? 'Paid' : status === 'Cancelled' ? 'Refunded' : 'Pending');
  const txnId = order.txnId || 'UPI2026083110247865';
  const dob = order.dob || '15 Oct 2000';
  const gender = order.gender || 'Male';
  const address = order.address || 'A-502, Sunrise Apartments\nAndheri West, Mumbai - 400053\nMaharashtra, India';
  const orderSource = order.orderSource || 'Web';
  const activationDate = order.activationDate || '31 Aug 2026, 10:26 AM';
  const accessStatus = order.accessStatus || (status === 'Completed' ? 'Activated' : 'Pending');
  const accessExpiresOn = order.accessExpiresOn || 'Lifetime';

  const handleCopyTxn = () => {
    navigator.clipboard?.writeText(txnId);
    setCopiedTxn(true);
    setTimeout(() => setCopiedTxn(false), 2000);
  };

  const getOrderStatusBadge = (st) => {
    switch (st) {
      case 'Completed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/70 whitespace-nowrap">
            Completed
          </span>
        );
      case 'Processing':
      case 'Pending':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-amber-50 text-amber-700 border border-amber-200/70 whitespace-nowrap">
            {st}
          </span>
        );
      case 'Cancelled':
      case 'Failed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-rose-50 text-rose-700 border border-rose-200/70 whitespace-nowrap">
            {st}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-slate-100 text-slate-700 border border-slate-200/70 whitespace-nowrap">
            {st}
          </span>
        );
    }
  };

  const getPaymentStatusBadge = (st) => {
    switch (st) {
      case 'Paid':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/70 whitespace-nowrap">
            Paid
          </span>
        );
      case 'Refunded':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200/70 whitespace-nowrap">
            Refunded
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/70 whitespace-nowrap">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Window Card - Matching User Details Dimensions */}
      <div className="w-full h-[90vh] sm:h-[86vh] sm:max-h-[86vh] sm:max-w-[800px] bg-white rounded-t-3xl sm:rounded-[22px] flex flex-col shadow-2xl relative mt-auto sm:mt-0 overflow-hidden modal-slide-up sm:modal-fade-in z-10 border border-slate-200/90">
        {/* Mobile Drag Handle */}
        <div
          onClick={onClose}
          className="w-full flex justify-center pt-2.5 pb-1 sm:hidden bg-white shrink-0 cursor-pointer"
        >
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Header - Matching Image 1 */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <h2 className="text-[14px] sm:text-[15px] font-bold text-slate-900 truncate">
              Order Details
            </h2>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline truncate">
              • View complete information about this order, payment, package, and user details.
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
        <div className="flex-1 min-h-0 overflow-y-auto p-2.5 sm:p-3.5 space-y-2.5 custom-scrollbar bg-slate-50/30">
          {/* Top Bar: Order ID Summary + Stacked Action Buttons (Download Invoice & Process Refund) */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Decorative hover gradient flare */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            {/* Left: Bag icon + Order ID + Status badge + Placed date */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[10.5px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Order ID
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[16px] sm:text-[18px] font-extrabold text-slate-900 font-mono tracking-tight">
                    {orderId}
                  </span>
                  {getOrderStatusBadge(status)}
                </div>
                <span className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium block mt-0.5">
                  Placed on: {orderDate}
                </span>
              </div>
            </div>

            {/* Right: Stacked Action Buttons (Download Invoice & Process Refund) */}
            <div className="relative z-10 flex sm:flex-col gap-1.5 w-full sm:w-auto shrink-0 pt-1.5 sm:pt-0 border-t border-slate-100 sm:border-t-0">
              <button
                type="button"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-indigo-400/90 hover:border-indigo-600 bg-white hover:bg-indigo-50/50 text-indigo-700 text-[11px] font-bold shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Download Invoice</span>
              </button>
              <button
                type="button"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-indigo-400/90 hover:border-indigo-600 bg-white hover:bg-indigo-50/50 text-indigo-700 text-[11px] font-bold shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Process Refund</span>
              </button>
            </div>
          </div>

          {/* 2-Column Grid matching Image 1 exactly */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {/* COLUMN 1 (LEFT) */}
            <div className="space-y-2.5">
              {/* Card 1: User Information */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between pb-1.5 mb-2.5 border-b border-slate-100/90">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <User className="w-3 h-3" />
                    </div>
                    <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                      User Information
                    </h4>
                  </div>
                  <a
                    href="#view-profile"
                    onClick={(e) => e.preventDefault()}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                  >
                    View Profile
                  </a>
                </div>

                {/* Avatar + Basic User Info */}
                <div className="relative z-10 flex items-center gap-3 pb-2.5 mb-2.5 border-b border-slate-100/80">
                  <img
                    src={avatar}
                    alt={userName}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="min-w-0">
                    <h5 className="text-[13.5px] font-bold text-slate-900 leading-tight truncate">
                      {userName}
                    </h5>
                    <div className="text-[10.5px] text-slate-500 font-medium mt-0.5">
                      User ID: {userId}
                    </div>
                    <div className="text-[10.5px] text-slate-500 font-medium truncate">
                      {email}
                    </div>
                    <div className="text-[10.5px] text-slate-500 font-medium">
                      {mobile}
                    </div>
                  </div>
                </div>

                {/* Key-Value Details */}
                <div className="relative z-10 space-y-1.5 text-[11px] sm:text-[11.5px]">
                  <div className="flex items-baseline justify-between sm:justify-start gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-24 shrink-0">Date of Birth</span>
                    <span className="font-bold text-slate-800 text-right sm:text-left">{dob}</span>
                  </div>
                  <div className="flex items-baseline justify-between sm:justify-start gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-24 shrink-0">Gender</span>
                    <span className="font-bold text-slate-800 text-right sm:text-left">{gender}</span>
                  </div>
                  <div className="flex items-start justify-between sm:justify-start gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-24 shrink-0 pt-0.5">Address</span>
                    <span className="font-bold text-slate-800 text-right sm:text-left flex-1 whitespace-pre-line leading-relaxed">
                      {address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Package Information */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

                {/* Header */}
                <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2.5 border-b border-slate-100/90">
                  <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Package className="w-3 h-3" />
                  </div>
                  <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                    Package Information
                  </h4>
                </div>

                {/* Top Book / Package Visual Row */}
                <div className="relative z-10 flex items-center gap-3">
                  {/* Stylized eBook Thumbnail Graphic */}
                  <div className="w-[85px] h-[60px] rounded-lg bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 p-1.5 border border-indigo-900/60 shadow-sm relative overflow-hidden flex flex-col justify-between shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <div className="text-[7.5px] font-bold text-cyan-300 tracking-tight leading-none uppercase truncate">
                      EBook: AI for Everyone
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="w-6 h-6 rounded-md bg-indigo-500/20 border border-cyan-400/40 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <div className="w-4 h-4 rounded bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
                        <BookOpen className="w-2.5 h-2.5 text-amber-300" />
                      </div>
                    </div>
                  </div>

                  {/* Package Title & Price */}
                  <div className="min-w-0">
                    <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                      {packageName}
                    </span>
                    <h5 className="text-[12.5px] font-bold text-slate-900 leading-tight mt-0.5 truncate">
                      EBook: AI for Everyone
                    </h5>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Audio Version Included
                    </div>
                    <div className="text-[13px] font-extrabold text-slate-900 mt-0.5">
                      ₹ {amount}
                    </div>
                  </div>
                </div>

                {/* Package Features Box matching Image 1 */}
                <div className="relative z-10 mt-2.5 p-2.5 bg-indigo-50/40 rounded-xl border border-indigo-100/60">
                  <div className="text-[11px] font-bold text-slate-800 mb-1.5">
                    Package Features
                  </div>
                  <div className="space-y-1.5 text-[10.5px] sm:text-[11px] text-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Complete EBook Access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Audio Book (Hindi + English)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Lifetime Access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Downloadable Content</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Certificate of Completion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2 (RIGHT) */}
            <div className="space-y-2.5">
              {/* Card 3: Order Information */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

                {/* Header */}
                <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100/90">
                  <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <ShoppingCart className="w-3 h-3" />
                  </div>
                  <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                    Order Information
                  </h4>
                </div>

                {/* Key-Value Details */}
                <div className="relative z-10 space-y-1.5 text-[11px] sm:text-[11.5px]">
                  <div className="flex items-baseline justify-between sm:justify-start gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Order ID</span>
                    <span className="font-bold text-slate-800 font-mono text-right sm:text-left">{orderId}</span>
                  </div>
                  <div className="flex items-baseline justify-between sm:justify-start gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Order Date</span>
                    <span className="font-bold text-slate-800 text-right sm:text-left">{orderDate}</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Order Status</span>
                    <div>{getOrderStatusBadge(status)}</div>
                  </div>
                  <div className="flex items-baseline justify-between sm:justify-start gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Order Source</span>
                    <span className="font-bold text-slate-800 text-right sm:text-left">{orderSource}</span>
                  </div>
                  <div className="flex items-baseline justify-between sm:justify-start gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Total Amount</span>
                    <span className="font-extrabold text-slate-900 text-[12px] text-right sm:text-left">₹ {amount}</span>
                  </div>
                  <div className="flex items-baseline justify-between sm:justify-start gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Payment Method</span>
                    <span className="font-bold text-slate-800 text-right sm:text-left">{paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Transaction ID</span>
                    <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end sm:justify-start">
                      <span className="font-mono text-[10.5px] sm:text-[11px] font-medium text-slate-800 truncate">
                        {txnId}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyTxn}
                        className="p-1 rounded hover:bg-indigo-50 text-indigo-600 transition-colors cursor-pointer shrink-0"
                        title="Copy Transaction ID"
                      >
                        {copiedTxn ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Payment Status</span>
                    <div>{getPaymentStatusBadge(paymentStatus)}</div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Invoice</span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download Invoice</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 4: Product Access */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

                {/* Header */}
                <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100/90">
                  <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <BookOpen className="w-3 h-3" />
                  </div>
                  <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                    Product Access
                  </h4>
                </div>

                {/* Key-Value Details */}
                <div className="relative z-10 space-y-1.5 text-[11px] sm:text-[11.5px]">
                  <div className="flex items-baseline justify-between sm:justify-start gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Activation Date</span>
                    <span className="font-bold text-slate-800 text-right sm:text-left">{activationDate}</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Access Status</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {accessStatus}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between sm:justify-start gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Access Expires On</span>
                    <span className="font-bold text-slate-800 text-right sm:text-left">{accessExpiresOn}</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start gap-3 pt-0.5">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Download Link</span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold shadow-xs shadow-indigo-200 transition-all cursor-pointer active:scale-95"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Open Product</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 5: Order Timeline */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

                {/* Header */}
                <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100/90">
                  <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Clock className="w-3 h-3" />
                  </div>
                  <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                    Order Timeline
                  </h4>
                </div>

                {/* Timeline Stepper matching Image 1 */}
                <div className="relative z-10 py-1 space-y-3.5">
                  {/* Vertical Track connecting dots */}
                  <div className="absolute left-[7px] top-2 bottom-3 w-[2px] bg-emerald-400 pointer-events-none" />

                  {/* Step 1 */}
                  <div className="relative flex items-start justify-between gap-2 pl-6">
                    <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-2xs" />
                    <div>
                      <div className="font-bold text-[11px] text-slate-900 leading-tight">
                        Order Placed
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {orderDate}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium shrink-0">
                      Payment initiated
                    </span>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex items-start justify-between gap-2 pl-6">
                    <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-2xs" />
                    <div>
                      <div className="font-bold text-[11px] text-slate-900 leading-tight">
                        Payment Successful
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        31 Aug 2026, 10:25 AM
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium shrink-0">
                      UPI Payment confirmed
                    </span>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex items-start justify-between gap-2 pl-6">
                    <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-2xs" />
                    <div>
                      <div className="font-bold text-[11px] text-slate-900 leading-tight">
                        Order Completed
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        31 Aug 2026, 10:26 AM
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium shrink-0">
                      Package activated & access provided
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Footer with Close Button matching User Details */}
        <div className="flex items-center justify-end px-3.5 sm:px-5 py-2 sm:py-2.5 border-t border-slate-100 bg-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11.5px] font-bold shadow-2xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
