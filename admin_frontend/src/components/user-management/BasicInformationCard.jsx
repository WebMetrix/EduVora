import React from 'react';
import { User, ChevronDown } from 'lucide-react';
import CustomDatePicker from '../common/CustomDatePicker';

export default function BasicInformationCard({ formData, onChange }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.08)] hover:border-indigo-200 transition-all duration-300 group">
      {/* Glow flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100/90 mb-5">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
          <User className="w-4 h-4 text-indigo-600" />
        </div>
        <h3 className="text-[15px] font-extrabold text-slate-900 tracking-tight">
          Basic Information
        </h3>
      </div>

      <div className="space-y-4">
        {/* Row 1: User Role & Full Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
              User Role <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={onChange}
                className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3.5 py-2.5 text-[12.5px] font-medium text-slate-800 focus:outline-none appearance-none transition-all duration-200 cursor-pointer"
              >
                <option value="User">User</option>
                <option value="Support">Support</option>
                <option value="Admin">Admin</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onChange}
              placeholder="Enter full name"
              className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3.5 py-2.5 text-[12.5px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Row 2: Email Address & Mobile Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Enter email address"
              className="w-full bg-slate-100/70 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-[12.5px] font-medium text-slate-600 focus:outline-none cursor-not-allowed"
              readOnly
            />
          </div>

          <div>
            <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
              Mobile Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="flex items-center gap-1.5 pl-3 pr-2 py-2.5 border-r border-slate-200 bg-slate-100/70 rounded-l-xl text-slate-700 text-[12px] font-bold shrink-0">
                <span>+91</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={onChange}
                placeholder="Enter mobile number"
                className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border rounded-r-xl border-l-0 px-3.5 py-2.5 text-[12.5px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 border-slate-200/90 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Row 3: Date of Birth & Gender Radio Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
              Date of Birth
            </label>
            <CustomDatePicker
              placeholder="dd/mm/yyyy"
              value={formData.dob}
              onChange={(val) => onChange({ target: { name: 'dob', value: val } })}
              separator="/"
              leftIcon
            />
          </div>

          <div>
            <label className="block text-[11.5px] font-bold text-slate-700 mb-2.5">
              Gender
            </label>
            <div className="flex items-center gap-5 pt-0.5">
              {['Male', 'Female', 'Other'].map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer select-none group/radio">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={onChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      formData.gender === g
                        ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/20'
                        : 'border-slate-300 group-hover/radio:border-indigo-400 bg-white'
                    }`}
                  >
                    {formData.gender === g && (
                      <div className="w-2 h-2 rounded-full bg-indigo-600" />
                    )}
                  </div>
                  <span
                    className={`text-[12.5px] font-semibold transition-colors ${
                      formData.gender === g
                        ? 'text-indigo-950 font-bold'
                        : 'text-slate-600 group-hover/radio:text-slate-900'
                    }`}
                  >
                    {g}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Row 4: Address */}
        <div>
          <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={onChange}
            rows={3}
            placeholder="Enter complete address"
            className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3.5 py-2.5 text-[12.5px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all duration-200 resize-y min-h-[76px]"
          />
        </div>
      </div>
    </div>
  );
}
