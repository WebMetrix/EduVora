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
      bg: 'bg-emerald-50/50'
    },
    {
      title: t('myReferrals.referrals25'),
      status: t('myReferrals.inProgress'),
      progress: "11/25",
      type: 'progress',
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-100',
      bg: 'bg-amber-50/50'
    },
    {
      title: t('myReferrals.referrals50'),
      status: t('myReferrals.locked'),
      type: 'locked',
      iconColor: 'text-slate-400',
      iconBg: 'bg-slate-100',
      bg: 'bg-slate-50'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1 group/card h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className="font-bold text-[#1a1446] text-[15px]">{t('myReferrals.referralRewards')}</h3>
        <button className="text-[12px] font-bold text-[#4f3bf3] hover:underline">{t('myReferrals.viewAll')}</button>
      </div>
      
      <div className="flex flex-col gap-3">
        {rewards.map((reward, idx) => (
          <div key={idx} className={`flex items-center justify-between p-3.5 rounded-xl border border-slate-100 transition-all duration-300 hover:border-indigo-200 ${reward.bg}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${reward.iconBg}`}>
                <Award className={`w-5 h-5 ${reward.iconColor}`} />
              </div>
              <span className="text-[13px] font-bold text-slate-700">{reward.title}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`text-[12px] font-bold ${
                reward.type === 'completed' ? 'text-emerald-600' :
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
