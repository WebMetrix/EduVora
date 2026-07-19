import React from 'react';
import CustomSelect from '../../common/CustomSelect';

export default function PhoneInputGroup({ label, placeholder, required = false, icon: Icon }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon className="w-4 h-4 text-slate-500" />}
        <label className="text-[13px] font-bold text-[#111]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>
      <div className="flex gap-2">
        <div className="w-[100px] shrink-0">
          <CustomSelect options={[{ value: '+91', label: '+91' }]} placeholder="+91" />
        </div>
        <input
          type="tel"
          className="flex-1 w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
