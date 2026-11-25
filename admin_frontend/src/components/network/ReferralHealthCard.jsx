import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function ReferralHealthCard() {
  const healthMetrics = [
    {
      label: 'Users with Valid Sponsor',
      count: '12,324',
      percentage: '95.9%',
      barWidth: '95.9%',
      color: 'bg-emerald-500',
      trackColor: 'bg-emerald-100/60',
    },
    {
      label: 'Users without Sponsor',
      count: '522',
      percentage: '4.1%',
      barWidth: '8%', // slightly boosted minimum for visibility
      color: 'bg-rose-500',
      trackColor: 'bg-rose-100/60',
    },
    {
      label: 'Duplicate Referral Issues',
      count: '8',
      percentage: '0.06%',
      barWidth: '3%',
      color: 'bg-sky-500',
      trackColor: 'bg-sky-100/60',
    },
    {
      label: 'Suspicious Patterns',
      count: '14',
      percentage: '0.11%',
      barWidth: '4%',
      color: 'bg-amber-500',
      trackColor: 'bg-amber-100/60',
    },
    {
      label: 'Invalid Referral Data',
      count: '6',
      percentage: '0.05%',
      barWidth: '2.5%',
      color: 'bg-purple-600',
      trackColor: 'bg-purple-100/60',
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full w-full">
      {/* Decorative subtle hover flare */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/8 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-[14.5px] sm:text-[15px] font-black text-slate-900 tracking-tight">
            Referral Health
          </h3>
        </div>
      </div>

      {/* Metrics List with flex-1 to fill equal card height */}
      <div className="relative z-10 flex-1 flex flex-col justify-between py-1 my-auto space-y-3">
        {healthMetrics.map((item, idx) => (
          <div key={idx} className="group/metric">
            <div className="flex items-center justify-between text-[12px] mb-1.5 leading-tight">
              <span className="font-bold text-slate-700 group-hover/metric:text-slate-900 transition-colors truncate">
                {item.label}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-black text-slate-900">{item.count}</span>
                <span className="text-slate-400 font-semibold w-10 text-right">{item.percentage}</span>
              </div>
            </div>
            {/* Progress Bar Track */}
            <div className={`w-full h-2 rounded-full overflow-hidden ${item.trackColor || 'bg-slate-100'}`}>
              <div
                className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                style={{ width: item.barWidth }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
