import { Edit2, Phone, Mail, FileText, User } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function ContactInformationCard({ t, profileData }) {
    return (
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50 flex flex-col relative overflow-hidden group">
            <div className="absolute top-6 right-6">
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors text-[12px] font-bold shadow-sm">
                    <Edit2 className="w-3.5 h-3.5" />
                    {t('profile.contact.edit')}
                </button>
            </div>

            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <Phone className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-[18px] font-bold text-slate-900 leading-tight">{t('profile.contact.title')}</h2>
                    <p className="text-[13px] text-slate-500 font-medium mt-0.5">{t('profile.contact.subtitle')}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.emailAddress')}</label>
                    </div>
                    <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center">
                        <span>{profileData?.EmailAddress || '-'}</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-bold rounded-full">
                            {t('profile.contact.verified') || 'Verified'}
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
                    <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center">
                        <span>{profileData?.WhatsAppNumber || '-'}</span>
                        <FaWhatsapp className="w-4 h-4 text-emerald-500" />
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
