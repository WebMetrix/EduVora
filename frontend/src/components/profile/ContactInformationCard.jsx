import { Edit2, Phone, Mail, FileText, User } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContactInformationCard({ t, profileData }) {
    const navigate = useNavigate();
    const [isNavigating, setIsNavigating] = useState(false);

    return (
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50 flex flex-col overflow-hidden group">
            <div className="flex flex-row items-start justify-between gap-3 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-[16px] sm:text-[18px] font-bold text-slate-900 leading-tight truncate">{t('profile.contact.title')}</h2>
                        <p className="text-[12px] sm:text-[13px] text-slate-500 font-medium mt-0.5 truncate">{t('profile.contact.subtitle')}</p>
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
                    <span className="hidden sm:inline">{isNavigating ? t('common.editing') : t('profile.contact.edit')}</span>
                    <span className="sm:hidden">{isNavigating ? t('common.loadingDots') : t('profile.contact.edit')}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <label className="text-[12px] font-bold text-slate-900 truncate">{t('completeProfile.emailAddress')}</label>
                    </div>
                    <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center gap-2">
                        <span className="truncate">{profileData?.EmailAddress || '-'}</span>
                        <span className="shrink-0 px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-bold rounded-full">
                            {t('profile.contact.verified')}
                        </span>
                    </div>
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.mobileNumber')}</label>
                    </div>
                    <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                        {profileData?.MobileNumber || '-'}
                    </div>
                </div>

                {/* Alternate Mobile Number */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.altMobileNumber')}</label>
                    </div>
                    <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-400 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                        -
                    </div>
                </div>

                {/* WhatsApp Number */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <FaWhatsapp className="w-4 h-4 text-slate-500" />
                        <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.whatsappNumber')}</label>
                    </div>
                    <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center gap-2">
                        <span className="truncate">{profileData?.WhatsAppNumber || '-'}</span>
                        <FaWhatsapp className="w-4 h-4 text-emerald-500 shrink-0" />
                    </div>
                </div>

                {/* Emergency Contact Name */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-500" />
                        <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.emergencyContactName')}</label>
                    </div>
                    <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-400 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                        -
                    </div>
                </div>

                {/* Emergency Contact Number */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.emergencyContactNumber')}</label>
                    </div>
                    <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-400 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                        -
                    </div>
                </div>
            </div>

        </div>
    );
}
