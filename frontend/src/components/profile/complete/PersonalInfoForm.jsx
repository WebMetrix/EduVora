import React from 'react';
import { User, ArrowRight } from 'lucide-react';
import CustomDatePicker from '../../common/CustomDatePicker';
import CustomSelect from '../../common/CustomSelect';

export default function PersonalInfoForm({ t, onNext }) {
  const genderOptions = [
    { value: 'male', label: t('completeProfile.options.male') },
    { value: 'female', label: t('completeProfile.options.female') },
    { value: 'other', label: t('completeProfile.options.other') },
  ];

  const maritalOptions = [
    { value: 'single', label: t('completeProfile.options.single') },
    { value: 'married', label: t('completeProfile.options.married') },
  ];

  const nationalityOptions = [
    { value: 'us', label: t('completeProfile.options.us') },
    { value: 'uk', label: t('completeProfile.options.uk') },
    { value: 'in', label: t('completeProfile.options.in') },
    { value: 'ca', label: t('completeProfile.options.ca') },
    { value: 'au', label: t('completeProfile.options.au') },
  ];

  return (
    <form className="space-y-6" onSubmit={(e) => { 
      e.preventDefault(); 
      onNext();
    }}>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.fullName')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.fullNamePlaceholder')}
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.username')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.usernamePlaceholder')}
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.dob')} <span className="text-red-500">*</span>
          </label>
          <CustomDatePicker placeholder={t('completeProfile.dobPlaceholder')} />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.gender')} <span className="text-red-500">*</span>
          </label>
          <CustomSelect options={genderOptions} placeholder={t('completeProfile.genderPlaceholder')} />
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.maritalStatus')}
          </label>
          <CustomSelect options={maritalOptions} placeholder={t('completeProfile.maritalStatusPlaceholder')} />
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.nationality')}
          </label>
          <CustomSelect options={nationalityOptions} placeholder={t('completeProfile.nationalityPlaceholder')} />
        </div>
      </div>

      <div className="border-t border-slate-100 my-8"></div>

      {/* Profile Picture Upload Section */}
      <div className="mb-2">
        <label className="block text-[13px] font-bold text-[#111] mb-4">
          {t('completeProfile.profilePicture')}
        </label>
        <div className="flex items-center gap-4 md:gap-6 w-full justify-between md:justify-start">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full bg-[#f8f9fc] flex items-center justify-center shrink-0 border border-slate-200">
              <User className="w-7 h-7 md:w-8 md:h-8 text-slate-300" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[13px] md:text-[14px] font-bold text-[#1a1446]">{t('completeProfile.uploadPicture')}</p>
              <p className="text-[10px] md:text-[12px] font-bold text-slate-400 uppercase tracking-wide">{t('completeProfile.uploadFormats')}</p>
            </div>
          </div>
          <button type="button" className="text-[#4f3bf3] border-2 border-[#4f3bf3]/20 bg-white hover:border-[#4f3bf3] hover:bg-indigo-50 shadow-sm px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all ml-auto md:ml-4">
            {t('completeProfile.uploadBtn')}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex justify-end">
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
