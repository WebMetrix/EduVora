import { Edit2, User as UserIcon } from 'lucide-react';

export default function AboutMeCard({ t }) {
    return (
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50 relative">
            <div className="absolute top-6 right-6">
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors text-[12px] font-bold shadow-sm">
                    <Edit2 className="w-3.5 h-3.5" />
                    {t('profile.personal.edit')}
                </button>
            </div>

            <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/50">
                    <UserIcon className="w-4 h-4" />
                </div>
                <h2 className="text-[16px] font-bold text-slate-900">{t('profile.about.title')}</h2>
            </div>

            <p className="text-[12px] font-medium text-slate-500 mb-4 ml-12">{t('profile.about.subtitle')}</p>

            <div className="bg-white border border-slate-100 rounded-xl p-5 min-h-[100px] shadow-[0_2px_10px_rgb(0,0,0,0.02)] mt-2">
                <p className="text-[13px] text-slate-600 leading-relaxed font-semibold">
                    I am passionate about learning and sharing knowledge. I love exploring new courses and helping others grow in their journey.
                </p>
            </div>
        </div>
    );
}