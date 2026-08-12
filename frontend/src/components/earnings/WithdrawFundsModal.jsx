import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Wallet, ChevronDown, Landmark, Info } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function WithdrawFundsModal({ isOpen, onClose, availableBalance = "5,230.00" }) {
  const { t } = useTranslation();

  // Prevent scrolling when modal is open and fix layout shift
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

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div className="w-full h-[90vh] md:h-auto md:max-h-[90vh] md:max-w-[560px] bg-white rounded-t-3xl md:rounded-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 overflow-hidden animate-slide-up md:animate-fade-in">
        
        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-transparent shrink-0">
          <div>
            <h2 className="text-[18px] md:text-[20px] font-extrabold text-[#1a1446]">{t('earnings.withdraw.title')}</h2>
            <p className="text-[13px] text-slate-500 font-medium mt-1">{t('earnings.withdraw.subtitle')}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700 mt-0.5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-4">
          <div className="flex flex-col gap-4">
            
            {/* Available Balance Box */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-[16px] px-4 py-3.5 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[13px] font-bold text-[#1a1446]">{t('earnings.withdraw.availableBalance')}</span>
                <span className="text-[22px] md:text-[24px] font-extrabold text-[#4f3bf3]">₹ {availableBalance}</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-indigo-100/80 flex items-center justify-center border border-indigo-200/50 shadow-sm shrink-0">
                <Wallet className="w-6 h-6 text-[#4f3bf3]" />
              </div>
            </div>

            {/* Inputs Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Withdraw Amount */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-[#1a1446]">{t('earnings.withdraw.withdrawAmount')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-500 font-bold text-[14px]">₹</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter amount" 
                    className="w-full pl-8 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-semibold focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm"
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-500 mt-0.5">Minimum withdrawal amount: ₹ 500.00</span>
              </div>

              {/* Withdrawal Method */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-[#1a1446]">{t('earnings.withdraw.withdrawalMethod')}</label>
                <div className="relative">
                  <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] font-bold text-slate-900 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm cursor-pointer">
                    <option value="bank">{t('earnings.withdraw.bankTransfer')}</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Select Bank Account */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#1a1446]">{t('earnings.withdraw.selectBankAccount')}</label>
              <div className="relative group cursor-pointer">
                <div className="w-full pl-3.5 pr-10 py-3 bg-white border border-slate-200 rounded-xl flex items-center gap-3 group-hover:border-indigo-300 transition-colors shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                    <Landmark className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-extrabold text-[#1a1446]">HDFC Bank - 1234</span>
                    <span className="text-[12px] font-semibold text-slate-500 mt-0.5">A/c No. **** **** 1234 | IFSC: HDFC0001234</span>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                </div>
              </div>
            </div>

            <div className="bg-orange-50/80 border border-orange-100/80 rounded-[12px] px-4 py-3 flex items-start gap-3 mt-1">
              <Info className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <p className="text-[13px] font-semibold text-[#1a1446]/80 leading-snug">
                Withdrawals are processed within 24-48 working hours on business days.
              </p>
            </div>
            
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 border-t border-slate-100 flex gap-3 shrink-0 bg-white">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            className="flex-[2] py-3 bg-[#4f3bf3] text-white rounded-xl text-[14px] font-bold hover:bg-indigo-700 shadow-md shadow-indigo-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Confirm Withdrawal
          </button>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (min-width: 768px) {
          .md\\:animate-fade-in {
            animation: fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
        }
      `}} />
    </div>,
    document.body
  );
}
