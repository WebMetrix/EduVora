import React from 'react';
import { Wallet, AlertCircle, DollarSign, Award } from 'lucide-react';


export default function WalletSummary({ t, loading, summary }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };

  return (
    <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col h-full group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h2 className="text-[17px] font-extrabold text-slate-900">{t('earnings.wallet.summary')}</h2>
        <button className="flex items-center px-4 py-2 rounded-lg border border-indigo-200 text-[12px] font-bold text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm">
          {t('earnings.wallet.view')}
        </button>
      </div>

      <div className="flex flex-col gap-4 flex-1 relative z-10">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200/60">
              <Wallet className="w-4 h-4 text-slate-500" />
            </div>
            <span className="text-[13px] font-bold text-slate-700">{t('earnings.wallet.available')}</span>
          </div>
          {loading ? (
            <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
          ) : (
            <span className="text-[14px] font-extrabold text-green-600">{formatCurrency(summary?.CurrentBalance)}</span>
          )}
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200/60">
              <AlertCircle className="w-4 h-4 text-slate-500" />
            </div>
            <span className="text-[13px] font-bold text-slate-700">{t('earnings.wallet.pending')}</span>
          </div>
          {loading ? (
            <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
          ) : (
            <span className="text-[14px] font-extrabold text-orange-500">{formatCurrency(summary?.PendingWithdrawal)}</span>
          )}
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200/60">
              <DollarSign className="w-4 h-4 text-slate-500" />
            </div>
            <span className="text-[13px] font-bold text-slate-700">{t('earnings.wallet.totalPayouts')}</span>
          </div>
          {loading ? (
            <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
          ) : (
            <span className="text-[14px] font-extrabold text-indigo-700">{formatCurrency(summary?.TotalWithdrawn)}</span>
          )}
        </div>

        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200/60">
              <Award className="w-4 h-4 text-slate-500" />
            </div>
            <span className="text-[13px] font-bold text-slate-700">{t('earnings.wallet.lastPayout')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            {loading ? (
              <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
            ) : (
              <span className="text-[13px] font-semibold">
                {summary?.LastPayoutDate ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(summary.LastPayoutDate)) : 'N/A'}
              </span>
            )}
          </div>
        </div>
      </div>

      <button className="relative z-10 w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-indigo-600 text-indigo-600 font-bold text-[13px] hover:bg-indigo-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <Wallet className="w-4 h-4" />
        {t('earnings.wallet.goToWallet')}
      </button>
    </div>
  );
}
