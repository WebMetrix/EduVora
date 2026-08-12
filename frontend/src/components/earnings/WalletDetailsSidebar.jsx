import React, { useState } from 'react';
import { Send, Building2, Clock, HelpCircle, ChevronRight, ShieldCheck } from 'lucide-react';
import WithdrawFundsModal from './WithdrawFundsModal';

export default function WalletDetailsSidebar({ t }) {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-1 gap-6 2xl:col-span-1 h-fit">
      
      {/* Wallet Details Card */}
      <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />
        
        <h3 className="text-[15px] font-extrabold text-[#1a1446] mb-5 relative z-10">{t('earnings.wallet.details.title')}</h3>
        
        <div className="flex flex-col gap-3 mb-6 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-500">{t('earnings.wallet.details.walletId')}</span>
            <span className="text-[13px] font-bold text-slate-700">WALLET1254</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-500">{t('earnings.wallet.details.memberId')}</span>
            <span className="text-[13px] font-bold text-slate-700">EV123456</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-500">{t('earnings.wallet.details.walletStatus')}</span>
            <span className="text-[13px] font-extrabold text-emerald-600">Active</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-500">{t('earnings.wallet.details.dateCreated')}</span>
            <span className="text-[13px] font-bold text-slate-700">15 Jan 2025</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-500">{t('earnings.wallet.details.lastUpdated')}</span>
            <span className="text-[13px] font-bold text-slate-700">31 May 2025, 07:45 PM</span>
          </div>
        </div>

        <button 
          onClick={() => setIsWithdrawModalOpen(true)}
          className="relative z-10 w-full flex items-center justify-center gap-2 py-3 bg-[#4f3bf3] text-white rounded-xl text-[14px] font-bold hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
        >
          {t('earnings.wallet.details.withdrawNow')}
          <Send className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Quick Actions Card */}
      <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

        <h3 className="text-[15px] font-extrabold text-[#1a1446] mb-4 relative z-10">{t('earnings.wallet.actions.title')}</h3>
        
        <div className="flex flex-col gap-2 relative z-10">
          {/* Payment Methods */}
          <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-indigo-50/50 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer group border border-transparent hover:border-indigo-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors">{t('earnings.wallet.actions.paymentMethods')}</span>
                <span className="text-[12px] font-medium text-slate-500">{t('earnings.wallet.actions.paymentMethodsDesc')}</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
          </div>

          {/* Withdrawal History */}
          <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-indigo-50/50 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer group border border-transparent hover:border-indigo-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors">{t('earnings.wallet.actions.withdrawalHistory')}</span>
                <span className="text-[12px] font-medium text-slate-500">{t('earnings.wallet.actions.withdrawalHistoryDesc')}</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
          </div>

          {/* Help Center */}
          <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-indigo-50/50 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer group border border-transparent hover:border-indigo-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <HelpCircle className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors">{t('earnings.wallet.actions.helpCenter')}</span>
                <span className="text-[12px] font-medium text-slate-500">{t('earnings.wallet.actions.helpCenterDesc')}</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
          </div>
        </div>
      </div>

      {/* Secure Transactions Card */}
      <div className="bg-emerald-50/70 border border-emerald-100/60 rounded-3xl p-5 flex items-start gap-4 lg:col-span-2 2xl:col-span-1">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-[14px] font-extrabold text-emerald-800">{t('earnings.wallet.secure.title')}</h4>
          <p className="text-[12px] font-semibold text-emerald-700/80 leading-relaxed">
            {t('earnings.wallet.secure.desc')}
          </p>
        </div>
      </div>

    </div>
    
    <WithdrawFundsModal 
      isOpen={isWithdrawModalOpen} 
      onClose={() => setIsWithdrawModalOpen(false)} 
    />
    </>
  );
}
