import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Globe, Map, Building, MapPinned } from 'lucide-react';
import CustomSelect from '../../common/CustomSelect';
import api from '../../../https/axios';

export default function AddressInfoForm({ t, onBack, onNext, formData, updateFormData }) {
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);



  // Fetch States on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await api.get('/profile/dropdowns/states');
        if (res.data && Array.isArray(res.data)) {
          const formattedStates = res.data
            .map(s => ({
              value: s.StateName,
              label: s.StateName
            }));
          setStateOptions(formattedStates);
        }
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };
    fetchStates();
  }, []);

  // Fetch Cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.state) {
        setCityOptions([]);
        return;
      }
      try {
        const res = await api.get(`/profile/dropdowns/cities?stateName=${formData.state}`);
        if (res.data && Array.isArray(res.data)) {
          const formattedCities = res.data.map(c => ({
            value: c.CityName,
            label: c.CityName
          }));
          setCityOptions(formattedCities);
        }
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };
    fetchCities();
  }, [formData.state]);

  const handleStateChange = (val) => {
    updateFormData('state', val);
    // Only clear city if the state actually changed to a different one
    if (formData.state && formData.state !== val) {
      updateFormData('city', '');
    }
  };


  // Ensure India is set for the database
  useEffect(() => {
    if (!formData.country || formData.country !== 'India') {
      updateFormData('country', 'India');
    }
  }, [formData.country, updateFormData]);

  return (
    <form className="space-y-6" onSubmit={(e) => {
      e.preventDefault();
      onNext();
    }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

        {/* Address Line 1 (Full Width) */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-slate-500" />
            <label className="text-[13px] font-bold text-[#111]">
              {t('completeProfile.addressLine1')} <span className="text-red-500">*</span>
            </label>
          </div>
          <input
            type="text"
            required
            value={formData.addressLine1}
            onChange={(e) => updateFormData('addressLine1', e.target.value)}
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.addressLine1Placeholder')}
          />
        </div>

        {/* Address Line 2 (Full Width) */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-slate-500" />
            <label className="text-[13px] font-bold text-[#111]">
              {t('completeProfile.addressLine2')}
            </label>
          </div>
          <input
            type="text"
            value={formData.addressLine2}
            onChange={(e) => updateFormData('addressLine2', e.target.value)}
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.addressLine2Placeholder')}
          />
        </div>

        {/* Country (Read Only) */}
        <div>
          <div className="group flex flex-col gap-1 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 shadow-sm transition-all duration-300 h-[74px] justify-center mt-[4px]">
            <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
              <Globe className="w-4 h-4" />
              <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.country')}</label>
            </div>
            <div className="pl-6 pr-2">
              <span className="text-[#1a1446] font-bold text-[14px] block truncate">
                India
              </span>
            </div>
          </div>
        </div>

        {/* State */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Map className="w-4 h-4 text-slate-500" />
            <label className="text-[13px] font-bold text-[#111]">
              {t('completeProfile.state')} <span className="text-red-500">*</span>
            </label>
          </div>
          <CustomSelect 
            options={stateOptions} 
            placeholder={t('completeProfile.statePlaceholder')} 
            value={formData.state}
            onChange={handleStateChange}
          />
        </div>

        {/* City */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Building className="w-4 h-4 text-slate-500" />
            <label className="text-[13px] font-bold text-[#111]">
              {t('completeProfile.city')} <span className="text-red-500">*</span>
            </label>
          </div>
          <CustomSelect 
            options={cityOptions} 
            placeholder={t('completeProfile.cityPlaceholder')} 
            value={formData.city}
            onChange={(val) => updateFormData('city', val)}
            disabled={!formData.state}
          />
        </div>

        {/* Pincode */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPinned className="w-4 h-4 text-slate-500" />
            <label className="text-[13px] font-bold text-[#111]">
              {t('completeProfile.pincode')} <span className="text-red-500">*</span>
            </label>
          </div>
          <input
            type="text"
            required
            value={formData.pincode}
            onChange={(e) => updateFormData('pincode', e.target.value)}
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
