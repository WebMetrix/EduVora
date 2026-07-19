import { Edit2, Landmark, Hash, User, Building, FileText, CheckCircle2 } from 'lucide-react';

export default function BankInformationCard({ t, profileData }) {
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* IFSC Code */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-slate-500" />
                        <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.ifscCode')}</label>
                    </div>
                    <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                        {profileData?.IFSCCode || '-'}
                    </div>
                </div>

                {/* Account Holder Name */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-500" />
                        <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.accountHolderName')}</label>
                    </div>
                    <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                        {profileData?.AccountHolderName || '-'}
                    </div>
                </div>

                {/* Bank Name */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-slate-500" />
                        <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.bankName')}</label>
                    </div>
                    <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                        {profileData?.BankName || '-'}
                    </div>
                </div>

                {/* Account Number */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-slate-500" />
                        <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.accountNumber')}</label>
                    </div>
                    <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                        {profileData?.AccountNumber || '-'}
                    </div>
                </div>

                {/* Confirm Account Number */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-slate-500" />
                        <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.confirmAccountNumber')}</label>
                    </div>
                    <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                        {profileData?.AccountNumber || '-'}
                    </div>
                </div>

                {/* Account Type */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-slate-500" />
                        <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.accountType')}</label>
                    </div>
                    <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                        {profileData?.AccountType || '-'}
                    </div>
                </div>
            </div>

            {/* Additional Bank Notes Textarea */}
            <div className="mt-6 border-t border-slate-100 pt-6">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-500" />
                        <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.additionalBankNotes')}</label>
                    </div>
                    <div className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-400 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] min-h-[100px]">
                        {t('completeProfile.additionalBankNotesPlaceholder')}
                    </div>
                </div>
            </div>
        </div>
    );
}
