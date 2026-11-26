import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X, ShoppingBag, Check, Clock, Truck, Download,
  CheckCircle2, FileText, ExternalLink,
  RotateCcw, Package, CreditCard, User, Sparkles, BookOpen,
  ShieldCheck, Layers, ArrowUpRight
} from 'lucide-react';

export default function OrderStatusDetailsModal({ order, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('order-info');
  const contentRef = useRef(null);

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

  // Reset tab scroll position whenever activeTab changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  if (!isOpen || !order || typeof document === 'undefined') return null;

  // Resolve order fields with realistic defaults matching Image 2
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
  const txnId = order.txnId || 'UPI312456789012';
  const shippingAddress = order.shippingAddress || 'A-502, Sunrise Apartments\nAndheri West, Mumbai - 400053\nMaharashtra, India';
  const deliveryStatus = order.deliveryStatus || 'Delivered';
  const deliveredOn = order.deliveredOn || '02 Sep 2026, 11:30 AM';
  const trackingId = order.trackingId || 'DTDC1234567890';
  const courierPartner = order.courierPartner || 'DTDC';
  const customerNotes = order.customerNotes || 'Looking forward to start learning. Thanks!';

  const tabs = [
    { id: 'order-info', label: 'Order Information' },
    { id: 'payment-details', label: 'Payment Details' },
    { id: 'package-details', label: 'Package Details' },
    { id: 'product-access', label: 'Product Access' },
    { id: 'invoice', label: 'Invoice' },
  ];

  const getOrderStatusBadge = (st) => {
    switch (st) {
      case 'Completed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 whitespace-nowrap">
            Completed
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60 whitespace-nowrap">
            Processing
          </span>
        );
      case 'Cancelled':
      case 'Failed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60 whitespace-nowrap">
            {st}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200/70 whitespace-nowrap">
            {st}
          </span>
        );
    }
  };

  return createPortal(
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

        {/* Header - Matching Image 2 */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
              <ShoppingBag className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <h2 className="text-[14px] sm:text-[15px] font-bold text-slate-900 truncate">
              Order Details
            </h2>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline truncate">
              • View complete order information, payment details and product access.
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

        {/* Fixed Top User Summary & Tab Navigation Bar */}
        <div className="px-2.5 sm:px-3.5 pt-2 sm:pt-2.5 pb-1 space-y-2 bg-slate-50/40 shrink-0 border-b border-slate-100">
          {/* Top Order & Customer Summary Card matching Image 2 */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* Left: User Avatar + Name + ID + Email + Phone */}
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={avatar}
                  alt={userName}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-indigo-100 shadow-2xs shrink-0 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-900 leading-tight group-hover:text-indigo-950 transition-colors truncate">
                      {userName}
                    </h3>
                  </div>
                  <span className="text-[10px] sm:text-[10.5px] font-semibold text-slate-400">
                    {userId}
                  </span>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10.5px] sm:text-[11px] text-slate-400 mt-0.5">
                    <span className="truncate">{email}</span>
                    <span className="text-slate-300">•</span>
                    <span>{mobile}</span>
                  </div>
                </div>
              </div>

              {/* Middle & Right: Order ID & Date + Package + Amount */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t border-slate-100 sm:border-t-0 text-[11px]">
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Order ID
                  </span>
                  <span className="font-bold text-slate-900 font-mono text-[11px] sm:text-[12px] block mt-0.5">
                    {orderId}
                  </span>
                  <span className="text-[9px] sm:text-[9.5px] uppercase font-bold text-slate-400 block tracking-wider mt-1.5">
                    Order Date
                  </span>
                  <span className="text-[9.5px] text-slate-600 block mt-0.5">
                    {orderDate}
                  </span>
                  <div className="mt-1">
                    {getOrderStatusBadge(status)}
                  </div>
                </div>

                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Package / Product
                  </span>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    {packageName}
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 text-left sm:text-right">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Order Amount
                  </span>
                  <span className="text-[16px] sm:text-[18px] font-extrabold text-indigo-600 leading-none block mt-0.5">
                    ₹ {amount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Bar matching Image 2 */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 text-[11.5px] sm:text-[12px] font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer relative ${isActive
                    ? 'text-indigo-600 bg-indigo-50/80 border border-indigo-100 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Tab Content Body */}
        <div ref={contentRef} className="flex-1 min-h-0 overflow-y-auto p-2.5 sm:p-3.5 space-y-2 sm:space-y-2.5 custom-scrollbar bg-slate-50/30">
          {/* TAB 1: Order Information (Matching Image 2) */}
          {activeTab === 'order-info' && (
            <div className="space-y-2 sm:space-y-2.5">
              {/* Row 1: Order Information (Left) + Payment Details & Shipping Details (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
                {/* Left Card: Order Information */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                  <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100/90">
                    <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <ShoppingBag className="w-3 h-3" />
                    </div>
                    <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                      Order Information
                    </h4>
                  </div>

                  <div className="relative z-10 space-y-1.5 text-[11px] sm:text-[11.5px]">
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Order ID</span>
                      <span className="font-bold text-slate-800 font-mono text-right sm:text-left">{orderId}</span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">User ID</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">{userId}</span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Name</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">{userName}</span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Email</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left truncate">{email}</span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Mobile</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">{mobile}</span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Order Date</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">{orderDate}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Order Status</span>
                      <div>{getOrderStatusBadge(status)}</div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Package</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                        {packageName}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Payment Method</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">{paymentMethod}</span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Transaction ID</span>
                      <span className="font-bold text-slate-800 font-mono text-right sm:text-left">{txnId}</span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3 pt-1 border-t border-slate-100">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Total Amount</span>
                      <span className="font-extrabold text-slate-900 text-[12px] text-right sm:text-left">₹ {amount}</span>
                    </div>
                  </div>
                </div>

                {/* Right Stack: Payment Details Card + Shipping Details Card */}
                <div className="space-y-2 sm:space-y-2.5">
                  {/* Payment Details Card */}
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                    <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100/90">
                      <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <CreditCard className="w-3 h-3" />
                      </div>
                      <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                        Payment Details
                      </h4>
                    </div>

                    <div className="relative z-10 space-y-1.5 text-[11px] sm:text-[11.5px]">
                      <div className="flex items-baseline justify-between sm:justify-start gap-3">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-32 shrink-0">Payment Method</span>
                        <span className="font-bold text-slate-800 text-right sm:text-left">{paymentMethod}</span>
                      </div>
                      <div className="flex items-baseline justify-between sm:justify-start gap-3">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-32 shrink-0">Transaction ID</span>
                        <span className="font-bold text-slate-800 font-mono text-right sm:text-left">{txnId}</span>
                      </div>
                      <div className="flex items-baseline justify-between sm:justify-start gap-3">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-32 shrink-0">Payment Date</span>
                        <span className="font-bold text-slate-800 text-right sm:text-left">{orderDate}</span>
                      </div>
                      <div className="flex items-center justify-between sm:justify-start gap-3">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-32 shrink-0">Payment Status</span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          {paymentStatus}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between sm:justify-start gap-3">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-32 shrink-0">Amount Paid</span>
                        <span className="font-bold text-slate-900 text-[12px] text-right sm:text-left">₹ {amount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping / Delivery Details Card */}
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                    <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100/90">
                      <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Truck className="w-3 h-3" />
                      </div>
                      <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                        Shipping / Delivery Details <span className="text-[10px] text-slate-400 font-normal">(If Applicable)</span>
                      </h4>
                    </div>

                    <div className="relative z-10 space-y-1.5 text-[11px] sm:text-[11.5px]">
                      <div className="flex items-baseline justify-between sm:justify-start gap-3">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Shipping Name</span>
                        <span className="font-bold text-slate-800 text-right sm:text-left">{userName}</span>
                      </div>
                      <div className="flex items-start justify-between sm:justify-start gap-3">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0 pt-0.5">Shipping Address</span>
                        <span className="font-bold text-slate-800 text-right sm:text-left flex-1 leading-snug whitespace-pre-line">{shippingAddress}</span>
                      </div>
                      <div className="flex items-baseline justify-between sm:justify-start gap-3">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Mobile</span>
                        <span className="font-bold text-slate-800 text-right sm:text-left">{mobile}</span>
                      </div>
                      <div className="flex items-center justify-between sm:justify-start gap-3">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Delivery Status</span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          {deliveryStatus}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between sm:justify-start gap-3">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Delivered On</span>
                        <span className="font-bold text-slate-800 text-right sm:text-left">{deliveredOn}</span>
                      </div>
                      <div className="flex items-baseline justify-between sm:justify-start gap-3">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Tracking ID</span>
                        <span className="font-bold text-indigo-600 font-mono text-right sm:text-left">{trackingId}</span>
                      </div>
                      <div className="flex items-baseline justify-between sm:justify-start gap-3">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Courier Partner</span>
                        <span className="font-bold text-slate-800 text-right sm:text-left">{courierPartner}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Order Timeline (Left) + Customer Notes (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
                {/* Order Timeline Card matching Image 2 */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                  <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100/90">
                    <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Clock className="w-3 h-3" />
                    </div>
                    <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                      Order Timeline
                    </h4>
                  </div>

                  <div className="relative z-10 space-y-2 text-[11px]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5 shadow-2xs">
                          ✓
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">Order Placed</div>
                          <div className="text-[10px] text-slate-400">Order has been placed successfully.</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 shrink-0">31 Aug 2026, 10:24 AM</span>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5 shadow-2xs">
                          ✓
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">Payment Received</div>
                          <div className="text-[10px] text-slate-400">Payment of ₹ {amount} received via {paymentMethod}.</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 shrink-0">31 Aug 2026, 10:24 AM</span>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5 shadow-2xs">
                          ✓
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">Order Confirmed</div>
                          <div className="text-[10px] text-slate-400">Your order has been confirmed.</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 shrink-0">31 Aug 2026, 10:26 AM</span>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5 shadow-2xs">
                          ✓
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">Product Delivered</div>
                          <div className="text-[10px] text-slate-400">Digital product access has been activated.</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 shrink-0">31 Aug 2026, 10:28 AM</span>
                    </div>
                  </div>
                </div>

                {/* Customer Notes Card matching Image 2 */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group flex flex-col">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                  <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100/90">
                    <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <FileText className="w-3 h-3" />
                    </div>
                    <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                      Customer Notes
                    </h4>
                  </div>

                  <div className="relative z-10 flex-1 flex flex-col justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-[11px] sm:text-[11.5px] text-slate-700 italic">
                      "{customerNotes}"
                    </div>

                    <div className="mt-2.5 p-2 rounded-xl bg-emerald-50/60 border border-emerald-100/80 text-[10.5px] text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Order fulfilled automatically via Instant Course Provisioning.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Payment Details */}
          {activeTab === 'payment-details' && (
            <div className="space-y-2 sm:space-y-2.5">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
                <div className="flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100">
                  <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0">
                    <CreditCard className="w-3 h-3" />
                  </div>
                  <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900">
                    Payment Gateway & Settlement Status
                  </h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
                    <span className="text-[9.5px] text-slate-400 font-semibold block uppercase">Gateway</span>
                    <span className="font-bold text-slate-800 block mt-0.5">Razorpay India</span>
                  </div>
                  <div className="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
                    <span className="text-[9.5px] text-slate-400 font-semibold block uppercase">Payment ID</span>
                    <span className="font-mono font-bold text-slate-800 block mt-0.5">pay_PZ49104820</span>
                  </div>
                  <div className="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
                    <span className="text-[9.5px] text-slate-400 font-semibold block uppercase">GST / Taxes</span>
                    <span className="font-bold text-slate-800 block mt-0.5">₹ 793.22 (18% GST)</span>
                  </div>
                  <div className="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
                    <span className="text-[9.5px] text-slate-400 font-semibold block uppercase">Settlement</span>
                    <span className="font-bold text-emerald-600 block mt-0.5">Settled</span>
                  </div>
                </div>
              </div>

              {/* Fee Breakdown & Bank Audit Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-indigo-200 transition-all duration-300">
                  <h4 className="text-[12px] font-bold text-slate-900 pb-1.5 mb-2 border-b border-slate-100">
                    Payment Fee Breakdown
                  </h4>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-slate-600">
                      <span>Package Base Price:</span>
                      <span className="font-semibold text-slate-800">₹ 4,406.78</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Central GST (CGST 9%):</span>
                      <span className="font-semibold text-slate-800">₹ 396.61</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>State GST (SGST 9%):</span>
                      <span className="font-semibold text-slate-800">₹ 396.61</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Processing / Gateway Fee:</span>
                      <span className="font-semibold text-emerald-600">₹ 0.00 (Waived)</span>
                    </div>
                    <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-100 text-[11.5px]">
                      <span>Total Amount Paid:</span>
                      <span className="text-indigo-600 font-extrabold">₹ {amount}</span>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-indigo-200 transition-all duration-300">
                  <h4 className="text-[12px] font-bold text-slate-900 pb-1.5 mb-2 border-b border-slate-100">
                    Settlement & Audit Trail
                  </h4>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-slate-600">
                      <span>Bank UTR Number:</span>
                      <span className="font-mono font-semibold text-slate-800">UTR202608318942</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Merchant ID:</span>
                      <span className="font-semibold text-slate-800">EDUVORA_ONLINE_IN</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Settled Bank Account:</span>
                      <span className="font-semibold text-slate-800">HDFC Bank (•••• 4821)</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Guarantee Status:</span>
                      <span className="font-semibold text-emerald-600">7-Day Money-Back Guarantee Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Package Details */}
          {activeTab === 'package-details' && (
            <div className="space-y-2 sm:space-y-2.5">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-900 leading-tight">{packageName} Curriculum & Access</h4>
                      <p className="text-[10.5px] text-slate-500 mt-0.5">Comprehensive video modules & practical assignments</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    Tier 1 Package
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5 text-[11px]">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>12 High-Definition Video Modules</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Downloadable PDF Cheatsheets & Guides</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Lifetime Access to Content Updates</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Direct Mentorship Support Channel</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Certification on Completion</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Eligible for Commission & Affiliate Reselling</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Included Course Curriculum Modules Card */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-indigo-200 transition-all duration-300">
                <div className="flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  <h4 className="text-[12px] font-bold text-slate-900">
                    Included Curriculum Highlights & Modules
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10.5px]">
                  <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 block">Module 1: Introduction to AI & Concepts</span>
                      <span className="text-slate-400 text-[10px]">4 Lessons • 2h 15m</span>
                    </div>
                    <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Unlocked</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 block">Module 2: Automation Workflows</span>
                      <span className="text-slate-400 text-[10px]">6 Lessons • 3h 40m</span>
                    </div>
                    <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Unlocked</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 block">Module 3: Essential AI Toolsets</span>
                      <span className="text-slate-400 text-[10px]">5 Lessons • 2h 50m</span>
                    </div>
                    <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Unlocked</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 block">Module 4: Monetization & Reselling</span>
                      <span className="text-slate-400 text-[10px]">3 Lessons • 1h 30m</span>
                    </div>
                    <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Unlocked</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Product Access */}
          {activeTab === 'product-access' && (
            <div className="space-y-2 sm:space-y-2.5">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
                <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <h4 className="text-[12.5px] font-bold text-slate-900">Student Portal Access</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    Activated
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 mb-2 leading-relaxed">
                  The user has single-sign-on access enabled for the package: <strong>{packageName}</strong>.
                </p>

                <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9.5px] text-slate-400 font-semibold block uppercase">Access Key</span>
                    <span className="font-mono font-bold text-slate-800 text-[11.5px]">EDV-2026-ACT-89240</span>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold shadow-xs cursor-pointer active:scale-95"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Product LMS</span>
                  </button>
                </div>
              </div>

              {/* Direct Learning Resources Card */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-indigo-200 transition-all duration-300">
                <h4 className="text-[12px] font-bold text-slate-900 pb-1.5 mb-2 border-b border-slate-100">
                  Linked Learning Resources & Integrations
                </h4>
                <div className="space-y-1.5 text-[11px]">
                  <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 block">1. Video LMS Dashboard</span>
                      <span className="text-slate-400 text-[10px]">Stream HD videos on web and mobile app</span>
                    </div>
                    <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">Active SSO</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 block">2. Private Mentorship Discord</span>
                      <span className="text-slate-400 text-[10px]">Invite link activated • Weekly Q&A access</span>
                    </div>
                    <span className="text-[9.5px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200/60">Joined</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 block">3. Cloud Resource Library</span>
                      <span className="text-slate-400 text-[10px]">Cheatsheets, guides & project templates</span>
                    </div>
                    <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">Available</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Invoice */}
          {activeTab === 'invoice' && (
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-[12.5px] font-bold text-slate-900">Tax Invoice #{orderId}</h4>
                  <span className="text-[10px] text-slate-400">Date: {orderDate}</span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10.5px] font-bold border border-indigo-200/60 cursor-pointer active:scale-95 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                  <span>Billed To:</span>
                  <span className="font-bold text-slate-800">{userName} ({email})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                  <span>Billing Address:</span>
                  <span className="font-bold text-slate-800">Andheri West, Mumbai, MH - 400053</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                  <span>Product Purchased:</span>
                  <span className="font-bold text-slate-800">{packageName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                  <span>Payment Mode:</span>
                  <span className="font-bold text-slate-800">{paymentMethod}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                  <span>Tax Breakdown (18% IGST):</span>
                  <span className="font-semibold text-slate-800">₹ 793.22</span>
                </div>
                <div className="flex justify-between py-1.5 text-slate-900 font-bold text-[12px]">
                  <span>Total Amount (Incl. Taxes):</span>
                  <span className="text-indigo-600 font-extrabold">₹ {amount}</span>
                </div>
              </div>
              <div className="mt-2 pt-1 border-t border-slate-100 text-[9.5px] text-slate-400 italic text-center">
                This is a digitally generated tax invoice from Eduvora Online. No signature required.
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions matching Image 2: Close & Download Invoice */}
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
            <span>Download Invoice</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
