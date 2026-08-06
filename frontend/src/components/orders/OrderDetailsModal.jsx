import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Copy, Calendar, Download, CheckCircle2, BookOpen } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

// Razorpay Icon Fallback
const RazorpayIcon = () => (
  <svg width="60" height="15" viewBox="0 0 100 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.5 0l-5 18.5h-4.5L18 0h4.5zm10.5 8c0-4.5-3.5-8-8-8h-7.5l-5 18.5h4.5l1.5-6h2c5.5 0 8.5-3.5 8.5-8zm-4.5.5c0 2-1.5 3.5-3.5 3.5h-1l1.5-5.5h1c2 0 3 1.5 3 2z" fill="#02042B"/>
    <path d="M43 18.5l-2-7-1.5 7h-4.5l5.5-18.5h4.5l4.5 18.5H43zm-1-11.5l-1 4.5h2.5l-1.5-4.5z" fill="#02042B"/>
  </svg>
);

export default function OrderDetailsModal({ order, onClose }) {
  const { t } = useTranslation();
  const isOpen = !!order;

  // Prevent scrolling when modal is open
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

  if (!order) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      {/* Modal Container - Matches PackageDetailsModal exactly */}
      <div className="w-full h-[90vh] md:h-[580px] md:max-w-3xl bg-white rounded-t-3xl md:rounded-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 overflow-hidden animate-slide-up md:animate-fade-in">
        
        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-5 shrink-0">
          <h2 className="text-[16px] md:text-[20px] font-extrabold text-slate-900">Order Details</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-6 pb-4 space-y-3">
          
          {/* Top Info Section with Divider */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-0">
            {/* Left Side */}
            <div className="flex items-start gap-3 md:w-1/2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100">
                <Calendar className="w-5 h-5 text-[#4f3bf3]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold text-slate-500">Order ID</span>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-extrabold text-slate-900">{order.id}</span>
                  <button className="text-slate-400 hover:text-[#4f3bf3] transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="mt-2">
                  <span className="text-[12px] font-semibold text-slate-500 block">Order Date</span>
                  <span className="text-[13px] font-bold text-slate-800">{order.date}, {order.time}</span>
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-px bg-slate-200 mx-6 self-stretch"></div>

            {/* Right Side */}
            <div className="flex flex-col items-start pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 md:w-1/2 relative mt-2 md:mt-0">
              {/* Completed Badge Floating Right */}
              <div className="absolute top-0 right-0 mt-3 md:mt-0">
                <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] md:text-[11px] font-bold rounded-full">Completed</span>
              </div>
              
              <div className="flex flex-col items-start">
                <span className="text-[12px] font-semibold text-slate-500">Payment Method</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <RazorpayIcon /> <span className="text-[13px] font-bold text-slate-800">UPI</span>
                </div>
              </div>
              <div className="mt-2 flex flex-col items-start">
                <span className="text-[12px] font-semibold text-slate-500">Transaction ID</span>
                <span className="text-[13px] font-bold text-slate-800">pay_QwErTy123456</span>
              </div>
            </div>
          </div>

          {/* Package Details Section */}
          <div className="border border-slate-100 rounded-[14px] p-3 md:p-4 shadow-sm shrink-0">
            <h3 className="text-[13px] font-extrabold text-slate-900 mb-2">Package Details</h3>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`w-14 h-14 rounded-xl shrink-0 shadow-md ${order.iconBg || 'bg-[#0B1221]'} flex items-center justify-center relative overflow-hidden bg-cover bg-center border border-indigo-900/50`}>
                   <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                   <div className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-lg border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                     <span className="text-white text-[14px] font-bold">{order.name ? order.name.charAt(0) : 'D'}</span>
                   </div>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[14px] font-extrabold text-slate-900 leading-tight">{order.name}</h4>
                  <span className={`w-max px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mt-0.5 ${order.levelColor || 'bg-purple-100 text-purple-600'}`}>
                    {order.level}
                  </span>
                  <p className="text-[11px] font-medium text-slate-600 mt-1 max-w-sm leading-snug">
                    Learn the essential strategies of digital marketing and grow your online business.
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> 12 Modules</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="flex items-center gap-1.5"><BookOpen className="w-3 h-3" /> 8h 45m</span>
                  </div>
                </div>
              </div>
              <div className="text-[18px] font-black text-slate-900 mt-2 md:mt-0">
                {order.amount}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border border-slate-100 rounded-[14px] p-3 md:p-4 shadow-sm shrink-0">
            <h3 className="text-[13px] font-extrabold text-slate-900 mb-1.5">Order Summary</h3>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[12px] font-semibold text-slate-600">
                <span>Subtotal</span>
                <span className="text-slate-900">{order.amount}</span>
              </div>
              <div className="flex justify-between items-center text-[12px] font-semibold text-slate-600">
                <span>Discount</span>
                <span className="text-slate-900">- ₹0</span>
              </div>
              <div className="flex justify-between items-center text-[12px] font-semibold text-slate-600">
                <span>Tax (GST 0%)</span>
                <span className="text-slate-900">₹0</span>
              </div>
              <div className="w-full h-px border-t border-dashed border-slate-200 my-1" />
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-extrabold text-slate-900">Total Amount</span>
                <span className="text-[15px] font-black text-[#4f3bf3]">{order.amount}</span>
              </div>
            </div>
          </div>

          {/* Payment Status (Banner Style) */}
          <div className="bg-linear-to-r from-green-50/70 to-emerald-50/70 backdrop-blur-xl border border-green-100/50 rounded-[12px] p-2.5 flex items-center gap-3 shadow-sm shrink-0">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0 shadow-sm border border-green-200/50 hidden sm:flex">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-0.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 sm:hidden" />
                <h5 className="text-[12px] md:text-[13px] font-bold text-slate-900">Payment Completed</h5>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight max-w-[90%]">
                Your payment was successful and your package is now active.
              </p>
            </div>
            <div className="shrink-0">
              <button className="flex items-center justify-center gap-1.5 bg-white px-2.5 md:px-3 py-1.5 border border-[#4f3bf3] rounded-[6px] text-[9px] md:text-[10px] font-bold text-[#4f3bf3] hover:bg-indigo-50 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">
                <Download className="w-3 h-3" /> Invoice
              </button>
            </div>
          </div>

          {/* Inline Footer Actions (Mobile Only) matches PackageDetailsModal */}
          <div className="flex md:hidden items-center justify-center gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-white border border-[#4f3bf3] rounded-[6px] text-[11px] font-bold text-[#4f3bf3] hover:bg-indigo-50 transition-colors flex-1 text-center"
            >
              Close
            </button>
            <button
              className="px-5 py-2.5 bg-[#4f3bf3] border border-[#4f3bf3] rounded-[6px] text-[11px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-[#3f2ee6] transition-colors flex items-center justify-center gap-1.5 flex-1"
            >
              <BookOpen className="w-3.5 h-3.5" /> Go to My Courses
            </button>
          </div>
        </div>

        {/* Fixed Footer Actions (Desktop Only) */}
        <div className="hidden md:flex p-3 md:py-3 md:px-5 border-t border-slate-100 bg-slate-50/50 items-center justify-end gap-3 mt-auto shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-center"
          >
            Close
          </button>
          <button
            className="px-5 py-2 bg-[#4f3bf3] border border-[#4f3bf3] rounded-xl text-[12px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-[#3f2ee6] transition-colors flex items-center justify-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" /> Go to My Courses
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
