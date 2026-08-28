import React from 'react';
import { User, Edit2, Calendar, ChevronDown, ChevronRight, CreditCard, Users, Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

export default function KycPersonalInfoForm({ formData, updateFormData, onNext }) {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col w-full relative z-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex shrink-0 items-center justify-center text-[#4f3bf3]">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-[#1a1446] mb-0.5">
              {t('kyc.personalInfo.title')}
            </h3>
            <p className="text-[13px] text-slate-500 font-medium">
              {t('kyc.personalInfo.subtitle')}
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#4f3bf3] text-[#4f3bf3] rounded-xl text-[13px] font-semibold hover:bg-indigo-50 transition-colors shrink-0">
          <Edit2 className="w-3.5 h-3.5" />
          {t('kyc.personalInfo.edit')}
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* Full Name */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-slate-500" />
              <label className="text-[13px] font-bold text-[#111]">
                {t('kyc.personalInfo.fullName')} <span className="text-red-500">*</span>
              </label>
            </div>
            <input 
              type="text" 
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none transition-all text-[14px] text-slate-900 font-medium cursor-not-allowed"
              placeholder={t('kyc.personalInfo.fullNamePlaceholder')}
              value={formData.fullName}
              readOnly
            />
          </div>

          {/* Date of Birth */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <label className="text-[13px] font-bold text-[#111]">
                {t('kyc.personalInfo.dob')} <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="relative">
              <input 
                type="text" 
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none transition-all text-[14px] text-slate-900 font-medium cursor-not-allowed"
                value={formData.dateOfBirth}
                readOnly
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* PAN Number */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-slate-500" />
              <label className="text-[13px] font-bold text-[#111]">
                {t('kyc.personalInfo.panNumber')}
              </label>
            </div>
            <input 
              type="text" 
              className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium uppercase"
              placeholder={t('kyc.personalInfo.panPlaceholder')}
              value={formData.panNumber}
              onChange={(e) => updateFormData('panNumber', e.target.value.toUpperCase())}
            />
          </div>

          {/* Gender */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-slate-500" />
              <label className="text-[13px] font-bold text-[#111]">
                {t('kyc.personalInfo.gender')} <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="relative">
              <select 
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none transition-all text-[14px] text-slate-900 font-medium appearance-none pr-10 cursor-not-allowed"
                value={formData.gender}
                disabled
              >
                <option value="Male">{t('completeProfile.options.male')}</option>
                <option value="Female">{t('completeProfile.options.female')}</option>
                <option value="Other">{t('completeProfile.options.other')}</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* Mobile Number */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-slate-500" />
              <label className="text-[13px] font-bold text-[#111]">
                {t('kyc.personalInfo.mobileNumber')} <span className="text-red-500">*</span>
              </label>
            </div>
            <input 
              type="text" 
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none transition-all text-[14px] text-slate-900 font-medium cursor-not-allowed"
              value={formData.mobileNumber}
              readOnly
            />
          </div>

          {/* Email Address */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-slate-500" />
              <label className="text-[13px] font-bold text-[#111]">
                {t('kyc.personalInfo.emailAddress')} <span className="text-red-500">*</span>
              </label>
            </div>
            <input 
              type="email" 
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none transition-all text-[14px] text-slate-900 font-medium cursor-not-allowed"
              value={formData.emailAddress}
              readOnly
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-slate-500" />
            <label className="text-[13px] font-bold text-[#111]">
              {t('kyc.personalInfo.address')} <span className="text-red-500">*</span>
            </label>
          </div>
          <textarea 
            rows={3}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none transition-all text-[14px] text-slate-900 font-medium resize-none cursor-not-allowed"
            value={formData.address}
            readOnly
          />
        </div>
      </div>

      {/* Footer / Button */}
      <div className="mt-8 border-t border-slate-100 pt-6 flex justify-end">
        <button 
          onClick={onNext}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#4f3bf3] text-white px-8 py-3.5 rounded-xl font-bold text-[14px] hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-[0.98]"
        >
          {t('kyc.personalInfo.saveContinue')}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
