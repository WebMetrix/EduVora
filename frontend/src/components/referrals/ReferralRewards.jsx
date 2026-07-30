import React from 'react';
import { Award, Check, Lock } from 'lucide-react';

export default function ReferralRewards({ t }) {
  const rewards = [
    {
      title: t('myReferrals.referrals10'),
      status: t('myReferrals.completed'),
      type: 'completed',
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-100',
      bg: 'bg-white border border-emerald-200 shadow-sm',
      hoverShadow: "hover:shadow-lg hover:border-emerald-300"
    },
    {
      title: t('myReferrals.referrals25'),
      status: t('myReferrals.inProgress'),
      progress: "11/25",
      type: 'progress',
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-100',
      bg: 'bg-white border border-amber-200 shadow-sm',
      hoverShadow: "hover:shadow-lg hover:border-amber-300"
    },
    {
      title: t('myReferrals.referrals50'),
      status: t('myReferrals.locked'),
      type: 'locked',
      iconColor: 'text-slate-400',
      iconBg: 'bg-slate-100',
      bg: 'bg-white border border-slate-200 shadow-sm',
      hoverShadow: "hover:shadow-lg hover:border-slate-300"
    }
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl p-4 lg:p-5 border border-indigo-100/60 shadow-sm group/card h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-indigo-200">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none transition-colors duration-700" />

      <div className="relative z-10 flex items-center justify-between mb-3 lg:mb-4">
        <h3 className="font-bold text-[#1a1446] text-[14px] lg:text-[15px]">{t('myReferrals.referralRewards')}</h3>
        <button className="text-[12px] font-bold text-[#4f3bf3] hover:underline">{t('myReferrals.viewAll')}</button>
      </div>

      <div className="relative z-10 flex flex-col justify-between flex-1 gap-2">
        {rewards.map((reward, idx) => (
          <div key={idx} className={`group flex items-center justify-between p-2 lg:p-2.5 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${reward.bg} ${reward.hoverShadow}`}>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${reward.iconBg}`}>
                <Award className={`w-4 h-4 lg:w-4.5 lg:h-4.5 ${reward.iconColor}`} />
              </div>
              <span className="text-[13px] font-bold text-slate-700">{reward.title}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[12px] font-bold ${reward.type === 'completed' ? 'text-emerald-600' :
                  reward.type === 'progress' ? 'text-slate-600' :
                    'text-slate-400'
                }`}>
                {reward.status}
              </span>

              {reward.type === 'completed' && (
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              )}

              {reward.type === 'progress' && (
                <div className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                  {reward.progress}
                </div>
              )}

              {reward.type === 'locked' && (
                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center">
                  <Lock className="w-3 h-3 text-slate-500" strokeWidth={2} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
