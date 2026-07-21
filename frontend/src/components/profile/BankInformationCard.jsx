import { Edit2, Landmark, Hash, User, Building, FileText, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BankInformationCard({ t, profileData }) {
    const navigate = useNavigate();
    const [isNavigating, setIsNavigating] = useState(false);

    return (
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50 flex flex-col overflow-hidden group">
            <div className="flex flex-row items-start justify-between gap-3 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                        <Landmark className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-[16px] sm:text-[18px] font-bold text-slate-900 leading-tight truncate">{t('profile.bank.title')}</h2>
                        <p className="text-[12px] sm:text-[13px] text-slate-500 font-medium mt-0.5 truncate">{t('profile.bank.subtitle')}</p>
                    </div>
                </div>

                <button 
                    onClick={() => {
                        setIsNavigating(true);
                        setTimeout(() => navigate('/completeprofile'), 400);
                    }}
                    disabled={isNavigating}
                    className={`shrink-0 flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-lg border border-indigo-200 text-indigo-600 font-bold shadow-sm text-[12px] transition-all ${isNavigating ? 'opacity-50 cursor-not-allowed bg-indigo-50' : 'hover:bg-indigo-50'}`}
                >
                    <Edit2 className={`w-3.5 h-3.5 ${isNavigating ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">{isNavigating ? t('common.editing') : t('profile.bank.edit')}</span>
                    <span className="sm:hidden">{isNavigating ? t('common.loadingDots') : t('profile.bank.edit')}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {/* IFSC Code */}
                <div className="group flex flex-col gap-1.5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 transition-all duration-300 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
                        <Hash className="w-4 h-4" />
                        <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.ifscCode')}</label>
                    </div>
                    <div className="pl-6 text-[14px] text-slate-900 font-bold">
                        {profileData?.IFSCCode || '-'}
                    </div>
                </div>

                {/* Account Holder Name */}
                <div className="group flex flex-col gap-1.5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 transition-all duration-300 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
                        <User className="w-4 h-4" />
                        <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.accountHolderName')}</label>
                    </div>
                    <div className="pl-6 text-[14px] text-slate-900 font-bold">
                        {profileData?.AccountHolderName || '-'}
                    </div>
                </div>

                {/* Bank Name */}
                <div className="group flex flex-col gap-1.5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 transition-all duration-300 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
                        <Landmark className="w-4 h-4" />
                        <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.bankName')}</label>
                    </div>
                    <div className="pl-6 text-[14px] text-slate-900 font-bold">
                        {profileData?.BankName || '-'}
                    </div>
                </div>

                {/* Account Number */}
                <div className="group flex flex-col gap-1.5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 transition-all duration-300 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
                        <Hash className="w-4 h-4" />
                        <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.accountNumber')}</label>
                    </div>
                    <div className="pl-6 text-[14px] text-slate-900 font-bold">
                        {profileData?.AccountNumber || '-'}
                    </div>
                </div>

                {/* Confirm Account Number */}
                <div className="group flex flex-col gap-1.5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 transition-all duration-300 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                        <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.confirmAccountNumber')}</label>
                    </div>
                    <div className="pl-6 text-[14px] text-slate-900 font-bold">
                        {profileData?.AccountNumber || '-'}
                    </div>
                </div>

                {/* Account Type */}
                <div className="group flex flex-col gap-1.5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 transition-all duration-300 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
                        <Building className="w-4 h-4" />
                        <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.accountType')}</label>
                    </div>
                    <div className="pl-6 text-[14px] text-slate-900 font-bold">
                        {profileData?.AccountType || '-'}
                    </div>
                </div>
            </div>

            {/* Additional Bank Notes Textarea */}
            <div className="mt-6 border-t border-slate-100 pt-6">
                <div className="group flex flex-col gap-1.5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 transition-all duration-300 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
                        <FileText className="w-4 h-4" />
                        <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.additionalBankNotes')}</label>
                    </div>
                    <div className="pl-6 text-[14px] text-slate-400 font-bold min-h-[60px] whitespace-pre-wrap">
                        {t('completeProfile.additionalBankNotesPlaceholder')}
                    </div>
                </div>
            </div>
        </div>
    );
}
