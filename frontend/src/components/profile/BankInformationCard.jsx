import { Edit2, Landmark } from 'lucide-react';

export default function BankInformationCard({ t }) {
    return (
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50 flex flex-col relative overflow-hidden group">
            <div className="absolute top-6 right-6">
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors text-[12px] font-bold shadow-sm">
                    <Edit2 className="w-3.5 h-3.5" />
                    {t('profile.bank.edit')}
                </button>
            </div>

            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <Landmark className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-[18px] font-bold text-slate-900 leading-tight">{t('profile.bank.title')}</h2>
                    <p className="text-[13px] text-slate-500 font-medium mt-0.5">{t('profile.bank.subtitle')}</p>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                {/* Row 1 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col gap-1.5 relative md:after:content-[''] md:after:absolute md:after:right-0 md:after:top-[10%] md:after:h-[80%] md:after:w-px md:after:bg-slate-100 pr-4">
                        <label className="text-[12px] font-bold text-slate-500">{t('profile.bank.accountHolder')}</label>
                        <div className="mt-1">
                            <span className="text-[14px] text-slate-900 font-bold">Priya Sharma</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 relative md:after:content-[''] md:after:absolute md:after:right-0 md:after:top-[10%] md:after:h-[80%] md:after:w-px md:after:bg-slate-100 md:px-4">
                        <label className="text-[12px] font-bold text-slate-500">{t('profile.bank.bankName')}</label>
                        <div className="mt-1">
                            <span className="text-[14px] text-slate-900 font-bold">HDFC Bank</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 relative md:after:content-[''] md:after:absolute md:after:right-0 md:after:top-[10%] md:after:h-[80%] md:after:w-px md:after:bg-slate-100 md:px-4">
                        <label className="text-[12px] font-bold text-slate-500">{t('profile.bank.accountNumber')}</label>
                        <div className="mt-1">
                            <span className="text-[14px] text-slate-900 font-bold">5010 1234 5678 90</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 md:pl-4">
                        <label className="text-[12px] font-bold text-slate-500">{t('profile.bank.ifscCode')}</label>
                        <div className="mt-1">
                            <span className="text-[14px] text-slate-900 font-bold">HDFC0001234</span>
                        </div>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col gap-1.5 relative md:after:content-[''] md:after:absolute md:after:right-0 md:after:top-[10%] md:after:h-[80%] md:after:w-px md:after:bg-slate-100 pr-4">
                        <label className="text-[12px] font-bold text-slate-500">{t('profile.bank.accountType')}</label>
                        <div className="mt-1">
                            <span className="text-[14px] text-slate-900 font-bold">Savings Account</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 md:px-4">
                        <label className="text-[12px] font-bold text-slate-500">{t('profile.bank.branch')}</label>
                        <div className="mt-1">
                            <span className="text-[14px] text-slate-900 font-bold">Jaipur Main Branch</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
