import React, { useState, useEffect, useRef } from 'react';
import { User, ArrowRight, Calendar, ChevronDown, Flag, Heart } from 'lucide-react';
import CustomDatePicker from '../../common/CustomDatePicker';
import CustomSelect from '../../common/CustomSelect';
import api from '../../../https/axios';

export default function PersonalInfoForm({ t, onNext, formData, updateFormData }) {
  const [genderOptions, setGenderOptions] = useState([]);

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // Optional: Save the file to your form data
      updateFormData('profileImage', file);
    }
  }

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

  const nationalityOptions = [
    { value: 'us', label: t('completeProfile.options.us') || 'American' },
    { value: 'uk', label: t('completeProfile.options.uk') || 'British' },
    { value: 'in', label: t('completeProfile.options.in') || 'Indian' },
    { value: 'ca', label: t('completeProfile.options.ca') || 'Canadian' },
    { value: 'au', label: t('completeProfile.options.au') || 'Australian' },
  ];

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
          <div className="flex items-center gap-2 mb-2">
            <Flag className="w-4 h-4 text-slate-500" />
            <label className="text-[13px] font-bold text-[#111]">
              {t('completeProfile.nationality')}
            </label>
          </div>
          <CustomSelect 
            options={nationalityOptions} 
            placeholder={t('completeProfile.nationalityPlaceholder')} 
            value={formData.nationality}
            onChange={(val) => updateFormData('nationality', val)}
          />
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
          <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".jpg, .jpeg, .png" // Restricts picker to JPG and PNG
              onChange={handleFileChange}
            />
          <button type="button" onClick={handleUploadClick} className="text-[#4f3bf3] border-2 border-[#4f3bf3]/20 bg-white hover:border-[#4f3bf3] hover:bg-indigo-50 shadow-sm px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all ml-auto md:ml-4">
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