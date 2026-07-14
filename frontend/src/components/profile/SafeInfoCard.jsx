import { Shield } from 'lucide-react';

export default function SafeInfoCard({ t, className = '' }) {
    return (
        <div className={`bg-linear-to-r from-indigo-50/70 to-purple-50/70 backdrop-blur-xl border border-indigo-100/50 rounded-2xl p-5 items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50 ${className}`}>
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm border border-indigo-200/50">
                <Shield className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
                <h4 className="text-[13px] font-bold text-slate-900">{t('profile.safe.title')}</h4>
                <p className="text-[12px] text-slate-500 font-medium">{t('profile.safe.desc')}</p>
            </div>
        </div>
    );
}