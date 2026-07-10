import { User as UserIcon } from 'lucide-react';

export default function AccountOverviewCard({ t }) {
    return (
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/50">
                    <UserIcon className="w-4 h-4" />
                </div>
                <h2 className="text-[16px] font-bold text-slate-900">{t('profile.overview.title')}</h2>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-slate-500">{t('profile.overview.userId')}</span>
                    <span className="text-[13px] font-extrabold text-slate-900">LN125487</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-slate-500">{t('profile.overview.sponsor')}</span>
                    <span className="text-[13px] font-extrabold text-slate-900">Rahul Verma</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-slate-500">{t('profile.overview.rank')}</span>
                    <span className="text-[13px] font-extrabold text-amber-500">Gold</span>
                </div>
                <div className="h-px bg-slate-200/60 my-1" />
                <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-slate-500">{t('profile.overview.totalReferrals')}</span>
                    <span className="text-[13px] font-extrabold text-slate-900">128</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-slate-500">{t('profile.overview.totalEarnings')}</span>
                    <span className="text-[13px] font-extrabold text-slate-900">₹ 1,45,680.00</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-slate-500">{t('profile.overview.walletBalance')}</span>
                    <span className="text-[13px] font-extrabold text-slate-900">₹ 12,450.00</span>
                </div>
            </div>
        </div>
    );
}