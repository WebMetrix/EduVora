import { Edit2, Phone, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function ContactInformationCard({ t }) {
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Email Address */}
                <div className="flex flex-col gap-1.5 relative md:after:content-[''] md:after:absolute md:after:right-0 md:after:top-[10%] md:after:h-[80%] md:after:w-px md:after:bg-slate-100 pr-4">
                    <label className="text-[12px] font-bold text-slate-500">{t('profile.contact.email')}</label>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-[14px] text-slate-900 font-bold">priya.sharma25@gmail.com</span>
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-bold rounded-full">
                            {t('profile.contact.verified')}
                        </span>
                    </div>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5 relative md:after:content-[''] md:after:absolute md:after:right-0 md:after:top-[10%] md:after:h-[80%] md:after:w-px md:after:bg-slate-100 md:px-4">
                    <label className="text-[12px] font-bold text-slate-500">{t('profile.contact.phone')}</label>
                    <div className="flex items-center mt-1">
                        <span className="text-[14px] text-slate-900 font-bold">+91 98765 43210</span>
                    </div>
                </div>

                {/* WhatsApp Number */}
                <div className="flex flex-col gap-1.5 md:pl-4">
                    <label className="text-[12px] font-bold text-slate-500">{t('profile.contact.whatsapp')}</label>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-[14px] text-slate-900 font-bold">+91 98765 43210</span>
                        <FaWhatsapp className="w-5 h-5 text-emerald-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}
