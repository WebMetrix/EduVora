import React from 'react';
import { ShoppingBag, CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function OrderStats({ t }) {
  const stats = [
    {
      title: t('orders.stats.total'),
      desc: t('orders.stats.totalDesc'),
      value: "6",
      icon: <ShoppingBag className="w-7 h-7 text-indigo-600" />,
      bg: "bg-indigo-100",
      borderColor: "border-indigo-100",
      hoverShadow: "hover:shadow-lg hover:border-indigo-300"
    },
    {
      title: t('orders.stats.completed'),
      desc: t('orders.stats.completedDesc'),
      value: "4",
      icon: <CheckCircle2 className="w-7 h-7 text-emerald-600" />,
      bg: "bg-emerald-100",
      borderColor: "border-emerald-100",
      hoverShadow: "hover:shadow-lg hover:border-emerald-300"
    },
    {
      title: t('orders.stats.pending'),
      desc: t('orders.stats.pendingDesc'),
      value: "1",
      icon: <Clock className="w-7 h-7 text-amber-500" />,
      bg: "bg-amber-100",
      borderColor: "border-amber-100",
      hoverShadow: "hover:shadow-lg hover:border-amber-300"
    },
    {
      title: t('orders.stats.failed'),
      desc: t('orders.stats.failedDesc'),
      value: "1",
      icon: <XCircle className="w-7 h-7 text-rose-500" />,
      bg: "bg-rose-100",
      borderColor: "border-rose-100",
      hoverShadow: "hover:shadow-lg hover:border-rose-300"
    }
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl p-5 lg:p-6 border border-indigo-100/60 shadow-sm group/card transition-all duration-300">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`flex items-center gap-4 group bg-white p-4 lg:p-5 rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer ${stat.borderColor} ${stat.hoverShadow}`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300 ${stat.bg}`}>
              {stat.icon}
            </div>
            <div className="flex flex-col">
              <div className="text-[24px] font-extrabold text-slate-900 leading-none mb-1">{stat.value}</div>
              <div className="text-[14px] font-bold text-slate-800 leading-tight mb-0.5">{stat.title}</div>
              <div className="text-[12px] font-medium text-slate-500 leading-tight">{stat.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
