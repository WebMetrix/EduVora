import React from 'react';
import { Wallet, Clock, TrendingUp, Receipt } from 'lucide-react';

export default function WalletStats({ t, loading, summary, transactions }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };

  const stats = [
    {
      title: t('earnings.wallet.stats.availableBalance'),
      value: formatCurrency(summary?.CurrentBalance),
      subtitle: t('earnings.wallet.stats.inWallet'),
      icon: <Wallet className="w-7 h-7 text-blue-500" />,
      bg: "bg-blue-100",
      borderColor: "border-blue-100",
      hoverShadow: "hover:shadow-lg hover:border-blue-300"
    },
    {
      title: t('earnings.wallet.stats.pendingWithdrawal'),
      value: formatCurrency(summary?.PendingWithdrawal),
      subtitle: t('earnings.wallet.stats.underProcess'),
      icon: <Clock className="w-7 h-7 text-orange-500" />,
      bg: "bg-orange-100",
      borderColor: "border-orange-100",
      hoverShadow: "hover:shadow-lg hover:border-orange-300"
    },
    {
      title: t('earnings.wallet.stats.totalWithdrawn'),
      value: formatCurrency(summary?.TotalWithdrawn),
      subtitle: t('earnings.wallet.stats.allTime'),
      icon: <TrendingUp className="w-7 h-7 text-green-600" />,
      bg: "bg-green-100",
      borderColor: "border-green-100",
      hoverShadow: "hover:shadow-lg hover:border-green-300"
    },
    {
      title: t('earnings.wallet.stats.totalTransactions'),
      value: (transactions?.length || 0).toString(),
      subtitle: t('earnings.wallet.stats.allTime'),
      icon: <Receipt className="w-7 h-7 text-purple-600" />,
      bg: "bg-purple-100",
      borderColor: "border-purple-100",
      hoverShadow: "hover:shadow-lg hover:border-purple-300"
    }
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white p-5 lg:p-6 border border-slate-100 shadow-sm group/card transition-all duration-300">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`flex items-center gap-4 group bg-white p-4 lg:p-5 rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer ${stat.borderColor} ${stat.hoverShadow}`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300 ${stat.bg}`}>
              {stat.icon}
            </div>
            <div className="flex flex-col w-full">
              {loading ? (
                <>
                  <div className="h-6 lg:h-7 bg-slate-200 rounded-md w-3/4 mb-1 animate-pulse" />
                  <div className="h-4 bg-slate-100 rounded-md w-1/2 mb-1 animate-pulse" />
                  <div className="h-3 bg-slate-50 rounded-md w-2/3 animate-pulse" />
                </>
              ) : (
                <>
                  <div className="text-[20px] xl:text-[24px] font-extrabold text-slate-900 leading-none mb-1 whitespace-nowrap">{stat.value}</div>
                  <div className="text-[13px] xl:text-[14px] font-bold text-slate-800 leading-tight mb-0.5 whitespace-nowrap">{stat.title}</div>
                  <div className="text-[11px] xl:text-[12px] font-medium text-slate-500 leading-tight whitespace-nowrap">
                    {stat.subtitle}
                  </div>
                  {stat.trend && (
                    <div className="text-[12px] text-emerald-500 font-extrabold mt-0.5">{stat.trend}</div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
