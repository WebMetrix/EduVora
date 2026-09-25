import React, { useState } from 'react';
import { Send, Building2, Clock, HelpCircle, ChevronRight, ShieldCheck, FileWarning } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import WithdrawFundsModal from './WithdrawFundsModal';

export default function WalletDetailsSidebar({ t, loading, summary }) {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const kycData = useSelector((state) => state.kyc?.data);
  const isKycVerified = kycData?.KYCStatusId === 2;

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-1 gap-6 2xl:col-span-1 h-fit">
      
      {/* Wallet Details Card */}
      <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />
        
        <h3 className="text-[15px] font-extrabold text-[#1a1446] mb-5 relative z-10">{t('earnings.wallet.details.title')}</h3>
        
        <div className="flex flex-col gap-3 mb-6 relative z-10">
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="h-4 bg-slate-100 rounded animate-pulse w-1/3" />
                <div className="h-4 bg-slate-200 rounded animate-pulse w-1/4" />
              </div>
            ))
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-500">{t('earnings.wallet.details.walletId')}</span>
                {summary?.WalletId ? (
                  <span className="text-[13px] font-bold text-slate-700">{summary.WalletId}</span>
                ) : (
                  <span className="text-[18px] font-extrabold text-slate-400 px-2 leading-none">{t('earnings.notAvailable')}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-500">{t('earnings.wallet.details.memberId')}</span>
                {summary?.MemberId || user?.UserID ? (
                  <span className="text-[13px] font-bold text-slate-700">{summary?.MemberId || user?.UserID}</span>
                ) : (
                  <span className="text-[18px] font-extrabold text-slate-400 px-2 leading-none">{t('earnings.notAvailable')}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-500">{t('earnings.wallet.details.walletStatus')}</span>
                {summary ? (
                  <span className={`text-[13px] font-extrabold ${summary.WalletStatus !== false ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {summary.WalletStatus !== false ? 'Active' : 'Inactive'}
                  </span>
                ) : (
                  <span className="text-[18px] font-extrabold text-slate-400 px-2 leading-none">{t('earnings.notAvailable')}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-500">{t('earnings.wallet.details.dateCreated')}</span>
                {summary?.CreatedDate ? (
                  <span className="text-[13px] font-bold text-slate-700">
                    {new Date(summary.CreatedDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                ) : (
                  <span className="text-[18px] font-extrabold text-slate-400 px-2 leading-none">{t('earnings.notAvailable')}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-500">{t('earnings.wallet.details.lastUpdated')}</span>
                {summary?.ModifiedDate ? (
                  <span className="text-[13px] font-bold text-slate-700">
                    {new Date(summary.ModifiedDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                ) : (
                  <span className="text-[18px] font-extrabold text-slate-400 px-2 leading-none">{t('earnings.notAvailable')}</span>
                )}
              </div>
            </>
          )}
        </div>

        {!isKycVerified ? (
          <div className="flex flex-col gap-2 relative z-10 w-full">
            <div className="flex items-center justify-center gap-2 py-2 text-amber-600 bg-amber-50 rounded-xl text-[12px] font-bold border border-amber-200">
              <FileWarning className="w-4 h-4" />
              {t('earnings.wallet.details.verifyKycFirst')}
            </div>
            <button 
              onClick={() => navigate('/kyc')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 text-white rounded-xl text-[14px] font-bold hover:bg-amber-600 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
            >
              {t('earnings.wallet.details.verifyKycBtn')}
            </button>
          </div>
        ) : (
          <button 
            disabled={loading || (summary?.CurrentBalance || 0) <= 0}
            onClick={() => setIsWithdrawModalOpen(true)}
            className="relative z-10 w-full flex items-center justify-center gap-2 py-3 bg-[#4f3bf3] text-white rounded-xl text-[14px] font-bold hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:-translate-y-0 disabled:hover:shadow-none"
          >
            {t('earnings.wallet.details.withdrawNow')}
            <Send className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>

      {/* Quick Actions Card */}
      <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

        <h3 className="text-[15px] font-extrabold text-[#1a1446] mb-4 relative z-10">{t('earnings.wallet.actions.title')}</h3>
        
        <div className="flex flex-col gap-2 relative z-10">
          {/* Payment Methods */}
          <div 
            onClick={() => {
              toast.info(t('toast.wallet.redirectingToProfile') || 'Redirecting to Profile settings...');
              navigate('/profile');
            }}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-indigo-50/50 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer group border border-transparent hover:border-indigo-100"
          >
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
          <div 
            onClick={() => {
              const el = document.getElementById('recent-transactions');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                toast.info(t('toast.wallet.viewBelow') || 'Please view your withdrawals in the Recent Transactions table below.');
              } else {
                navigate('/earnings', { state: { tab: 'history' } });
              }
            }}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-indigo-50/50 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer group border border-transparent hover:border-indigo-100"
          >
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
          <div 
            onClick={() => {
              window.location.href = 'mailto:support@eduvora.com';
            }}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-indigo-50/50 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer group border border-transparent hover:border-indigo-100"
          >
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
      availableBalance={summary?.CurrentBalance}
    />
    </>
  );
}
