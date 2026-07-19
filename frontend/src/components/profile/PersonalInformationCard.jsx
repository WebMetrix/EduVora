import { Camera, Edit2, Calendar, ChevronDown, CheckCircle, User as UserIcon, Heart, Flag } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PersonalInformationCard({ t, profileData }) {
    const navigate = useNavigate();
    const [isNavigating, setIsNavigating] = useState(false);

    return (
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50 flex flex-col overflow-hidden group">
            <div className="flex flex-row items-start justify-between gap-3 mb-6 sm:mb-8">
                <h2 className="text-[16px] sm:text-[18px] font-bold text-slate-900 min-w-0 truncate pr-2 mt-1">{t('profile.personal.title')}</h2>
                <button 
                    onClick={() => {
                        setIsNavigating(true);
                        setTimeout(() => navigate('/completeprofile'), 400);
                    }}
                    disabled={isNavigating}
                    className={`shrink-0 flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-lg border border-indigo-200 text-indigo-600 font-bold shadow-sm text-[12px] transition-all ${isNavigating ? 'opacity-50 cursor-not-allowed bg-indigo-50' : 'hover:bg-indigo-50'}`}
                >
                    <Edit2 className={`w-3.5 h-3.5 ${isNavigating ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">{isNavigating ? t('common.editing') : t('profile.personal.edit')}</span>
                    <span className="sm:hidden">{isNavigating ? t('common.loadingDots') : t('profile.personal.edit')}</span>
                </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-8">
                {/* Avatar */}
                <div className="flex flex-col items-center min-w-[140px]">
                    <div className="relative mb-4">
                        <div className="w-[100px] h-[100px] rounded-full bg-slate-200 overflow-hidden shadow-md">
                            <div className="w-full h-full bg-linear-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-500 font-bold text-3xl">
                                {profileData?.FullName ? profileData.FullName.substring(0, 2).toUpperCase() : 'U'}
                            </div>
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 text-indigo-600 hover:bg-indigo-50 hover:scale-105 transition-all z-10">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    <h3 className="text-[16px] font-extrabold text-slate-900 flex items-center gap-1.5 leading-tight">
                        {profileData?.FullName || '-'} {profileData?.RoleID === 2 && <CheckCircle className="w-4 h-4 text-indigo-600" />}
                    </h3>

                    <div className="flex items-center gap-1.5 mt-1.5 text-amber-500 font-bold text-[12.5px]">
                        {t('profile.personal.goldRank')}
                    </div>

                    <div className="mt-4 flex flex-col items-center">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{t('profile.personal.memberSince')}</p>
                        <p className="text-[12px] font-semibold text-slate-700 mt-0.5">
                            {profileData?.CreatedDate ? new Date(profileData.CreatedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                        </p>
                    </div>
                </div>

                {/* Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.fullName')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                            {profileData?.FullName || '-'}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.username')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                            {profileData?.Username || '-'}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.dob')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center cursor-pointer hover:border-indigo-300 transition-colors">
                            {profileData?.DateOfBirth ? new Date(profileData.DateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'} <Calendar className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.gender')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center cursor-pointer hover:border-indigo-300 transition-colors">
                            {profileData?.Gender || '-'} <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.maritalStatus')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center cursor-pointer hover:border-indigo-300 transition-colors">
                            {profileData?.MaritalStatus || '-'} <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <Flag className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('completeProfile.nationality')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center cursor-pointer hover:border-indigo-300 transition-colors">
                            {profileData?.Nationality || '-'} <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.dateOfJoining')}</label>
                        </div>
                        <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-500 font-semibold flex justify-between items-center w-full md:w-[calc(50%-12px)]">
                            {profileData?.CreatedDate ? new Date(profileData.CreatedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'} <Calendar className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}