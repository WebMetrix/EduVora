import React from 'react';
import { ArrowRight } from 'lucide-react';
import CustomSelect from '../../common/CustomSelect';

export default function AddressInfoForm({ t, onBack, onNext }) {
  const countryOptions = [
    { value: 'us', label: t('completeProfile.options.us') },
    { value: 'uk', label: t('completeProfile.options.uk') },
    { value: 'in', label: t('completeProfile.options.in') },
    { value: 'ca', label: t('completeProfile.options.ca') },
    { value: 'au', label: t('completeProfile.options.au') },
  ];

  // Dummy state options for now
  const stateOptions = [
    { value: 'ny', label: 'New York' },
    { value: 'ca', label: 'California' },
    { value: 'ldn', label: 'London' },
    { value: 'dl', label: 'Delhi' },
    { value: 'mh', label: 'Maharashtra' },
  ];

  return (
    <form className="space-y-6" onSubmit={(e) => { 
      e.preventDefault(); 
      onNext();
    }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        
        {/* Address Line 1 (Full Width) */}
        <div className="md:col-span-2">
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.addressLine1')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.addressLine1Placeholder')}
          />
        </div>

        {/* Address Line 2 (Full Width) */}
        <div className="md:col-span-2">
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.addressLine2')}
          </label>
          <input
            type="text"
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.addressLine2Placeholder')}
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.country')} <span className="text-red-500">*</span>
          </label>
          <CustomSelect options={countryOptions} placeholder={t('completeProfile.countryPlaceholder')} />
        </div>

        {/* State */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.state')} <span className="text-red-500">*</span>
          </label>
          <CustomSelect options={stateOptions} placeholder={t('completeProfile.statePlaceholder')} />
        </div>

        {/* City */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.city')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.cityPlaceholder')}
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.pincode')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.pincodePlaceholder')}
          />
        </div>

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
