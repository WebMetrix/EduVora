import React from 'react';
import { ArrowRight } from 'lucide-react';
import PhoneInputGroup from './PhoneInputGroup';

export default function ContactInfoForm({ t, onBack, onNext }) {
  return (
    <form className="space-y-6" onSubmit={(e) => { 
      e.preventDefault(); 
      onNext();
    }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        
        {/* Email Address */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.emailAddress')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.emailAddressPlaceholder')}
          />
        </div>

        {/* Mobile Number */}
        <PhoneInputGroup 
          label={t('completeProfile.mobileNumber')}
          placeholder={t('completeProfile.mobileNumberPlaceholder')}
          required={true}
        />

        {/* Alternate Mobile Number */}
        <PhoneInputGroup 
          label={t('completeProfile.altMobileNumber')}
          placeholder={t('completeProfile.altMobileNumberPlaceholder')}
        />

        {/* WhatsApp Number */}
        <PhoneInputGroup 
          label={t('completeProfile.whatsappNumber')}
          placeholder={t('completeProfile.whatsappNumberPlaceholder')}
        />

        {/* Emergency Contact Name */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.emergencyContactName')}
          </label>
          <input
            type="text"
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.emergencyContactNamePlaceholder')}
          />
        </div>

        {/* Emergency Contact Number */}
        <PhoneInputGroup 
          label={t('completeProfile.emergencyContactNumber')}
          placeholder={t('completeProfile.emergencyContactNumberPlaceholder')}
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
