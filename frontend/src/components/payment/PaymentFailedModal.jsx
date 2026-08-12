import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Receipt, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function PaymentFailedModal({ paymentData, onClose, onDashboard, onRetry }) {
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
          
          {/* Failed Icon with Confetti */}
          <div className="relative mb-3 shrink-0">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.4)]">
              <XIcon className="text-white w-10 h-10" />
            </div>
            {/* Confetti pieces */}
            <div className="absolute top-0 left-[-20px] w-2 h-2 bg-blue-400 rounded-sm rotate-45 animate-pulse" />
            <div className="absolute top-[-10px] left-[10px] w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" />
            <div className="absolute top-10 left-[-30px] w-1 h-1 bg-red-400 rounded-full" />
            <div className="absolute top-[-5px] right-[-15px] w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <div className="absolute top-10 right-[-25px] w-1.5 h-1.5 bg-pink-400 rounded-sm rotate-12" />
            <div className="absolute bottom-0 right-[-10px] w-2 h-2 bg-red-500 rounded-full" />
          </div>

          <h2 className="text-[22px] md:text-[24px] font-extrabold text-slate-900 mb-1.5">{t('payment.failed.title')}</h2>
          
          <div className="flex flex-col items-center mb-4 w-full">
            <p className="text-slate-600 text-[12px] md:text-[13px] font-bold text-center leading-relaxed">
              {t('payment.failed.message1')}
            </p>
            <p className="text-slate-600 text-[13px] font-bold text-center leading-relaxed">
              {t('payment.failed.message2')}
            </p>
          </div>

          {/* Order ID */}
          <div className="bg-red-50 border border-red-100 px-4 py-2 rounded-lg flex items-center justify-center gap-2 mb-4 w-full max-w-[280px]">
             <Receipt className="w-4 h-4 text-red-600" />
             <span className="text-[13px] font-bold text-slate-800">
               {t('payment.failed.orderId')}: <span className="text-red-600">#{paymentData.orderId}</span>
             </span>
          </div>

          {/* Possible Reasons */}
          <div className="w-full bg-slate-50/50 border border-slate-100 rounded-xl p-3 mt-1 mb-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(239,68,68,0.1)] hover:border-red-200/50">
             <div className="flex items-center gap-2 mb-2">
               <AlertTriangle className="w-4 h-4 text-red-600" />
               <span className="text-[12px] font-extrabold text-red-600">{t('payment.failed.possibleReasons')}</span>
             </div>
             <ul className="flex flex-col gap-1.5 pl-2">
                 {(t('payment.failed.reasons', { returnObjects: true }) || []).map((reason, i) => (
                   <li key={i} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-red-400 shrink-0 mt-1.5" />
                      <span className="text-[12px] text-slate-700 font-medium">{reason}</span>
                   </li>
                 ))}
             </ul>
          </div>

          {/* Info Box */}
          <div className="w-full bg-linear-to-r from-indigo-50/70 to-purple-50/70 backdrop-blur-xl border border-indigo-100/50 rounded-xl p-3 flex items-start gap-3 mt-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50">
             <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
               <ShieldAlert className="w-4 h-4 text-indigo-500" />
             </div>
             <div className="flex flex-col">
                <span className="text-[11px] font-bold text-slate-700 leading-snug">{t('payment.failed.noDeduction')}</span>
                <span className="text-[11px] font-medium text-slate-500 leading-snug mt-0.5">{t('payment.failed.tryAgain')}</span>
             </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row w-full gap-3 mt-auto pt-6">
            <button
              onClick={onDashboard}
              className="flex-1 py-3 px-4 rounded-xl border border-indigo-600 text-indigo-600 font-bold text-[13px] hover:bg-indigo-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(79,70,229,0.15)]"
            >
              {t('payment.failed.dashboard')}
            </button>
            <button
              onClick={onRetry}
              className="flex-1 py-3 px-4 rounded-xl bg-red-600 text-white font-bold text-[13px] hover:bg-red-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(220,38,38,0.3)]"
            >
              {t('payment.failed.retry')}
            </button>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}

const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
