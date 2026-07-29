import React, { useState, useEffect, useRef } from 'react';
import { User, ArrowRight, Calendar, ChevronDown, Flag, Heart } from 'lucide-react';
import CustomDatePicker from '../../common/CustomDatePicker';
import CustomSelect from '../../common/CustomSelect';
import api from '../../../https/axios';

export default function PersonalInfoForm({ t, onNext, formData, updateFormData }) {
  const [genderOptions, setGenderOptions] = useState([]);


  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const res = await api.get('/profile/dropdowns/genders');
        if (res.data && Array.isArray(res.data)) {
          const options = res.data.map(item => {
            const val = item.GenderName || item.Gender || item.Name || Object.values(item).find(v => typeof v === 'string') || Object.values(item)[0];
            return { value: val, label: val };
          });
          setGenderOptions(options);
        }
      } catch (err) {
        console.error('Error fetching genders:', err);
      }
    };
    fetchGenders();
  }, []);



  return (
    <form className="space-y-6" onSubmit={(e) => {
      e.preventDefault();
      onNext();
    }}>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {/* Full Name */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-slate-500" />
            <label className="text-[13px] font-bold text-[#111]">
              {t('completeProfile.fullName')} <span className="text-red-500">*</span>
            </label>
          </div>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.fullNamePlaceholder')}
          />
        </div>

        {/* Username (Read Only) */}
        <div>
          <div className="group flex flex-col gap-1 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 shadow-sm transition-all duration-300 h-[74px] justify-center mt-[4px]">
            <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
              <User className="w-4 h-4" />
              <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.username')}</label>
            </div>
            <div className="pl-6 pr-2">
              <span className="text-[#1a1446] font-bold text-[14px] block truncate">{formData.username || '-'}</span>
            </div>
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <label className="text-[13px] font-bold text-[#111]">
              {t('completeProfile.dob')} <span className="text-red-500">*</span>
            </label>
          </div>
          <CustomDatePicker
            placeholder={t('completeProfile.dobPlaceholder')}
            value={formData.dateOfBirth}
            onChange={(val) => updateFormData('dateOfBirth', val)}
          />
        </div>

        {/* Gender */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-slate-500" />
            <label className="text-[13px] font-bold text-[#111]">
              {t('completeProfile.gender')} <span className="text-red-500">*</span>
            </label>
          </div>
          <CustomSelect
            options={genderOptions}
            placeholder={t('completeProfile.genderPlaceholder')}
            value={formData.gender}
            onChange={(val) => updateFormData('gender', val)}
          />
        </div>

        {/* Nationality */}
        <div>
          <div className="group flex flex-col gap-1 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 shadow-sm transition-all duration-300 h-[74px] justify-center mt-[4px]">
            <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
              <Flag className="w-4 h-4" />
              <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.nationality')}</label>
            </div>
            <div className="pl-6 pr-2">
              <span className="text-[#1a1446] font-bold text-[14px] block truncate">{formData.nationality || t('completeProfile.options.in')}</span>
            </div>
          </div>
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