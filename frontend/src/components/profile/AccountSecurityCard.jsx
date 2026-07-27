import { Shield } from 'lucide-react';

export default function AccountSecurityCard({ t, profileData }) {
    const isEmailVerified = profileData?.IsEmailVerified;

    return (
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50">
                    <Shield className="w-4 h-4" />
                </div>
                <h2 className="text-[16px] font-bold text-slate-900">{t('profile.security.title')}</h2>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-slate-900">{t('profile.security.emailVerified')}</span>
                        {isEmailVerified ? (
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-md">{t('profile.security.verified')}</span>
                        ) : (
                            <span className="px-3 py-1 bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider rounded-md">{t('profile.security.notVerified')}</span>
                        )}
                    </div>
                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                        {isEmailVerified ? t('profile.security.emailVerifiedDesc') : t('profile.security.emailNotVerifiedDesc')}
                    </p>
                </div>

                <div className="h-px bg-slate-200/60" />

                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-slate-900">{t('profile.security.kycStatus')}</span>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-md">{t('profile.security.pending')}</span>
                    </div>
                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed">{t('profile.security.kycStatusDesc')}</p>
                    <button className="mt-3 w-fit px-5 py-2 border border-indigo-200 text-indigo-600 font-bold text-[12px] rounded-lg hover:bg-indigo-50 transition-colors shadow-sm">
                        {t('profile.security.verifyNow')}
                    </button>
                </div>
            </div>
        </div>
    );
}