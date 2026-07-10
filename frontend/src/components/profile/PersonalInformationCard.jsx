import { Camera, Edit2, Calendar, ChevronDown, CheckCircle, User as UserIcon, Mail, AtSign, Phone, Heart, Flag } from 'lucide-react';

export default function PersonalInformationCard({ t }) {
    return (
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50 flex flex-col relative overflow-hidden group">
            <div className="absolute top-6 right-6">
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors text-[12px] font-bold shadow-sm">
                    <Edit2 className="w-3.5 h-3.5" />
                    {t('profile.personal.edit')}
                </button>
            </div>

            <h2 className="text-[16px] font-bold text-slate-900 mb-8">{t('profile.personal.title')}</h2>

            <div className="flex flex-col xl:flex-row gap-8">
                {/* Avatar */}
                <div className="flex flex-col items-center min-w-[140px]">
                    <div className="relative mb-4">
                        <div className="w-[100px] h-[100px] rounded-full bg-slate-200 overflow-hidden shadow-md">
                            <div className="w-full h-full bg-linear-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-500 font-bold text-3xl">
                                PS
                            </div>
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 text-indigo-600 hover:bg-indigo-50 hover:scale-105 transition-all z-10">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    <h3 className="text-[16px] font-extrabold text-slate-900 flex items-center gap-1.5 leading-tight">
                        Priya Sharma <CheckCircle className="w-4 h-4 text-indigo-600" />
                    </h3>

                    <div className="flex items-center gap-1.5 mt-1.5 text-amber-500 font-bold text-[12.5px]">
                        ★ Gold Rank
                    </div>

                    <div className="mt-4 flex flex-col items-center">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{t('profile.personal.memberSince')}</p>
                        <p className="text-[12px] font-semibold text-slate-700 mt-0.5">15 May 2024</p>
                    </div>
                </div>

                {/* Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.fullName')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">Priya Sharma</div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.email')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">priya.sharma25@gmail.com</div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <AtSign className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.username')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">priyasharma25</div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.mobile')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">+91 98765 43210</div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.dob')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center cursor-pointer hover:border-indigo-300 transition-colors">
                            15 Oct 1995 <Calendar className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.maritalStatus')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center cursor-pointer hover:border-indigo-300 transition-colors">
                            Single <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.gender')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center cursor-pointer hover:border-indigo-300 transition-colors">
                            Female <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.dateOfJoining')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-500 font-semibold flex justify-between items-center">
                            15 May 2024 <Calendar className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                        <div className="flex items-center gap-2">
                            <Flag className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.nationality')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center w-full md:w-[calc(50%-12px)] cursor-pointer hover:border-indigo-300 transition-colors">
                            Indian <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}