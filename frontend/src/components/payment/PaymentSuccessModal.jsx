import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Receipt, Clock, Infinity, PlayCircle, Award, Shield } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function PaymentSuccessModal({ paymentData, onClose, onDashboard, onViewCourses }) {
  const { t } = useTranslation();
  const isOpen = !!paymentData;

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

  if (!paymentData) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div className="w-full md:max-w-[480px] bg-white rounded-t-3xl md:rounded-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 overflow-hidden animate-slide-up md:animate-fade-in">
        
        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden shrink-0">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center px-4 md:px-6 pt-8 pb-6 w-full">
          
          {/* Success Icon with Confetti */}
          <div className="relative mb-3 shrink-0">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)]">
              <CheckCircle2Icon className="text-white w-10 h-10" />
            </div>
            {/* Confetti pieces */}
            <div className="absolute top-0 left-[-20px] w-2 h-2 bg-blue-400 rounded-sm rotate-45 animate-pulse" />
            <div className="absolute top-[-10px] left-[10px] w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" />
            <div className="absolute top-10 left-[-30px] w-1 h-1 bg-green-400 rounded-full" />
            <div className="absolute top-[-5px] right-[-15px] w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <div className="absolute top-10 right-[-25px] w-1.5 h-1.5 bg-red-400 rounded-sm rotate-12" />
            <div className="absolute bottom-0 right-[-10px] w-2 h-2 bg-yellow-500 rounded-full" />
          </div>

          <h2 className="text-[22px] md:text-[24px] font-extrabold text-slate-900 mb-1.5">{t('payment.success.title')}</h2>
          
          <p className="text-slate-600 text-[12px] md:text-[13px] font-bold text-center mb-4 w-full max-w-[400px]">
            {t('payment.success.message').replace('{{amount}}', paymentData.amount || '₹5,898')}
          </p>

          {/* Order ID */}
          <div className="bg-green-50 border border-green-100 px-4 py-2 rounded-lg flex items-center justify-center gap-2 mb-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(34,197,94,0.15)] hover:border-green-200/50">
             <Receipt className="w-4 h-4 text-green-600" />
             <span className="text-[13px] font-bold text-slate-800">
               {t('payment.success.orderId')}: <span className="text-green-600">#{paymentData.orderId || 'ORD123456789'}</span>
             </span>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-slate-100 mb-4" />

          {/* Package Details */}
          <div className="w-full flex flex-col gap-3">
             <div className="flex flex-col">
               <span className="text-[11px] font-semibold text-slate-500 mb-2">{t('payment.success.packagePurchased')}</span>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center">
                   <Shield className="w-5 h-5 text-orange-500" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[14px] font-extrabold text-slate-900">{paymentData.packageName || 'Gold Package'}</span>
                   <span className="text-[13px] font-bold text-slate-700">{paymentData.packagePrice || '₹4,999'}</span>
                 </div>
               </div>
             </div>

             {/* Features Grid */}
             <div className="bg-green-50/50 border border-green-100 rounded-xl p-3 grid grid-cols-4 gap-2 text-center mt-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(34,197,94,0.1)] hover:border-green-200/50">
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                     <Clock className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-700 leading-tight">{t('payment.success.immediateAccess')}</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                     <Infinity className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-700 leading-tight">{t('payment.success.lifetimeAccess')}</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                     <PlayCircle className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-700 leading-tight">{t('payment.success.premiumContent')}</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                     <Award className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-700 leading-tight">{t('payment.success.certificateIncluded')}</span>
                </div>
             </div>

             {/* Activation Note */}
             <div className="text-center mt-4">
                <p className="text-[12px] font-bold text-slate-800 mb-1">{t('payment.success.activationNote')}</p>
                <p className="text-[11px] text-slate-500">{t('payment.success.startLearning')}</p>
             </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row w-full gap-3 mt-auto pt-6">
            <button
              onClick={onViewCourses}
              className="flex-1 py-3 px-4 rounded-xl border border-indigo-600 text-indigo-600 font-bold text-[13px] hover:bg-indigo-50 transition-colors"
            >
              {t('payment.success.viewCourses')}
            </button>
            <button
              onClick={onDashboard}
              className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold text-[13px] hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-colors"
            >
              {t('payment.success.dashboard')}
            </button>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}

const CheckCircle2Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
