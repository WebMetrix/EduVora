import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Camera, Edit2, Calendar, ChevronDown, CheckCircle, Lock, Shield, User as UserIcon, MapPin, Building, CreditCard, Key } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MyProfile() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('personalInfo');

  const tabs = [
    { id: 'personalInfo', icon: UserIcon, label: t('profile.tabs.personalInfo') },
    { id: 'contactInfo', icon: MapPin, label: t('profile.tabs.contactInfo') },
    { id: 'addressInfo', icon: Building, label: t('profile.tabs.addressInfo') },
    { id: 'bankInfo', icon: CreditCard, label: t('profile.tabs.bankInfo') },
    { id: 'changePassword', icon: Key, label: t('profile.tabs.changePassword') },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">{t('profile.title')}</h1>
        <p className="text-[13px] font-medium text-slate-500">{t('profile.subtitle')}</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 overflow-x-auto custom-scrollbar pb-[1px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 pb-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-[13px] font-bold">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Personal Information Card */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col relative overflow-hidden group">
            {/* Edit Button */}
            <div className="absolute top-6 right-6">
              <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors text-[12px] font-bold shadow-sm">
                <Edit2 className="w-3.5 h-3.5" />
                {t('profile.personal.edit')}
              </button>
            </div>

            <h2 className="text-[16px] font-bold text-slate-900 mb-8">{t('profile.personal.title')}</h2>

            <div className="flex flex-col xl:flex-row gap-8">
              {/* Avatar Column */}
              <div className="flex flex-col items-center min-w-[140px]">
                <div className="relative mb-4">
                  <div className="w-[100px] h-[100px] rounded-full bg-slate-200 overflow-hidden shadow-md">
                    {/* Placeholder image */}
                    <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-500 font-bold text-3xl">
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

              {/* Form Fields Column */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.fullName')}</label>
                  <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">Priya Sharma</div>
                </div>
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.email')}</label>
                  <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">priya.sharma25@gmail.com</div>
                </div>
                {/* Username */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.username')}</label>
                  <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">priyasharma25</div>
                </div>
                {/* Mobile */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.mobile')}</label>
                  <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)]">+91 98765 43210</div>
                </div>
                {/* DOB */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.dob')}</label>
                  <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center cursor-pointer hover:border-indigo-300 transition-colors">
                    15 Oct 1995 <Calendar className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
                {/* Marital Status */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.maritalStatus')}</label>
                  <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center cursor-pointer hover:border-indigo-300 transition-colors">
                    Single <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
                {/* Gender */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.gender')}</label>
                  <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center cursor-pointer hover:border-indigo-300 transition-colors">
                    Female <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
                {/* Date of Joining */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.dateOfJoining')}</label>
                  <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-500 font-semibold flex justify-between items-center">
                    15 May 2024 <Calendar className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
                {/* Nationality */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[12px] font-bold text-slate-900">{t('profile.personal.nationality')}</label>
                  <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex justify-between items-center w-full md:w-[calc(50%-12px)] cursor-pointer hover:border-indigo-300 transition-colors">
                    Indian <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Me Card */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative">
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

          {/* Safe Info Card */}
          <div className="bg-gradient-to-r from-indigo-50/70 to-purple-50/70 backdrop-blur-xl border border-indigo-100/50 rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-indigo-200/50">
              <Lock className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h4 className="text-[13px] font-bold text-slate-900">{t('profile.safe.title')}</h4>
              <p className="text-[12px] text-slate-500 font-medium">{t('profile.safe.desc')}</p>
            </div>
          </div>

        </div>

        {/* Right Column (Sidebar Cards) */}
        <div className="flex flex-col gap-6">

          {/* Account Overview */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/50">
                <UserIcon className="w-4 h-4" />
              </div>
              <h2 className="text-[16px] font-bold text-slate-900">{t('profile.overview.title')}</h2>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-500">{t('profile.overview.userId')}</span>
                <span className="text-[13px] font-extrabold text-slate-900">LN125487</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-500">{t('profile.overview.sponsor')}</span>
                <span className="text-[13px] font-extrabold text-slate-900">Rahul Verma</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-500">{t('profile.overview.rank')}</span>
                <span className="text-[13px] font-extrabold text-amber-500">Gold</span>
              </div>

              <div className="h-px bg-slate-200/60 my-1" />

              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-500">{t('profile.overview.totalReferrals')}</span>
                <span className="text-[13px] font-extrabold text-slate-900">128</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-500">{t('profile.overview.totalEarnings')}</span>
                <span className="text-[13px] font-extrabold text-slate-900">₹ 1,45,680.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-500">{t('profile.overview.walletBalance')}</span>
                <span className="text-[13px] font-extrabold text-slate-900">₹ 12,450.00</span>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50">
                <Shield className="w-4 h-4" />
              </div>
              <h2 className="text-[16px] font-bold text-slate-900">{t('profile.security.title')}</h2>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-slate-900">{t('profile.security.emailVerified')}</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-md">{t('profile.security.verified')}</span>
                </div>
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed">{t('profile.security.emailVerifiedDesc')}</p>
              </div>

              <div className="h-px bg-slate-200/60" />

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-slate-900">{t('profile.security.kycStatus')}</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-md">{t('profile.security.pending')}</span>
                </div>
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed">{t('profile.security.kycStatusDesc')}</p>
                <button className="mt-3 w-fit px-5 py-2 border border-indigo-200 text-indigo-600 font-bold text-[12px] rounded-lg hover:bg-indigo-50 transition-colors shadow-sm">
                  {t('profile.security.verifyNow')}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
