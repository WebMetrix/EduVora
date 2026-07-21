import React from 'react';
import { ArrowRight, Mail, Phone, User } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import PhoneInputGroup from './PhoneInputGroup';

export default function ContactInfoForm({ t, onBack, onNext, formData, updateFormData }) {
  return (
    <form className="space-y-6" onSubmit={(e) => {
      e.preventDefault();
      onNext();
    }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

        {/* Email Address (Read Only) */}
        <div>
          <div className="group flex flex-col gap-1 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 shadow-sm transition-all duration-300 h-[74px] justify-center mt-[4px]">
            <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
              <Mail className="w-4 h-4" />
              <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.emailAddress')}</label>
            </div>
            <div className="pl-6 pr-2">
              <span className="text-[#1a1446] font-bold text-[14px] block truncate">{formData.emailAddress || '-'}</span>
            </div>
          </div>
        </div>

        {/* Mobile Number */}
        <PhoneInputGroup
          label={t('completeProfile.mobileNumber')}
          placeholder={t('completeProfile.mobileNumberPlaceholder')}
          required={true}
          icon={Phone}
          value={formData.mobileNumber}
          onChange={(val) => updateFormData('mobileNumber', val)}
        />

        {/* Alternate Mobile Number */}
        <PhoneInputGroup
          label={t('completeProfile.altMobileNumber')}
          placeholder={t('completeProfile.altMobileNumberPlaceholder')}
          icon={Phone}
          value={formData.altMobileNumber}
          onChange={(val) => updateFormData('altMobileNumber', val)}
        />

        {/* WhatsApp Number */}
        <PhoneInputGroup
          label={t('completeProfile.whatsappNumber')}
          placeholder={t('completeProfile.whatsappNumberPlaceholder')}
          icon={FaWhatsapp}
          value={formData.whatsAppNumber}
          onChange={(val) => updateFormData('whatsAppNumber', val)}
        />

        {/* Emergency Contact Name */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-slate-500" />
            <label className="text-[13px] font-bold text-[#111]">
              {t('completeProfile.emergencyContactName')}
            </label>
          </div>
          <input
            type="text"
            value={formData.emergencyContactName}
            onChange={(e) => updateFormData('emergencyContactName', e.target.value)}
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.emergencyContactNamePlaceholder')}
          />
        </div>

        {/* Emergency Contact Number */}
        <PhoneInputGroup
          label={t('completeProfile.emergencyContactNumber')}
          placeholder={t('completeProfile.emergencyContactNumberPlaceholder')}
          icon={Phone}
          value={formData.emergencyContactNumber}
          onChange={(val) => updateFormData('emergencyContactNumber', val)}
        />

      </div>

      {/* Submit & Back Buttons */}
      <div className="pt-6 flex flex-col md:flex-row justify-between gap-4 items-center">
        <button
          type="button"
          onClick={onBack}
          className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-white border-2 border-[#4f3bf3]/20 text-[#4f3bf3] font-bold text-[15px] hover:border-[#4f3bf3] hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center"
        >
          {t('completeProfile.backBtn')}
        </button>
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-[#4f3bf3] text-white font-bold text-[15px] hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          {t('completeProfile.saveBtn')}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </form>
  );
}
