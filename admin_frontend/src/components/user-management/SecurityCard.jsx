import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Check } from 'lucide-react';

export default function SecurityCard({ formData, onChange, errors = {} }) {
  const [showTempPassword, setShowTempPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.08)] hover:border-indigo-200 transition-all duration-300 group">
      {/* Glow flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Card Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100/90 mb-5">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
          <Lock className="w-4 h-4 text-indigo-600" />
        </div>
        <h3 className="text-[15px] font-extrabold text-slate-900 tracking-tight">
          Security
        </h3>
      </div>

      <div className="space-y-4">
        {/* Passwords Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
              Temporary Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showTempPassword ? 'text' : 'password'}
                name="tempPassword"
                value={formData.tempPassword}
                onChange={onChange}
                placeholder="Enter temporary password"
                className={`w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border rounded-xl pl-9.5 pr-10 py-2.5 text-[12.5px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all duration-200 ${
                  errors.tempPassword
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
                    : 'border-slate-200/90 focus:border-indigo-500 focus:ring-indigo-500/10'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowTempPassword(!showTempPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showTempPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.tempPassword && (
              <p className="text-[11px] font-semibold text-rose-500 mt-1">{errors.tempPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
              Confirm Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={onChange}
                placeholder="Confirm temporary password"
                className={`w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border rounded-xl pl-9.5 pr-10 py-2.5 text-[12.5px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all duration-200 ${
                  errors.confirmPassword
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
                    : 'border-slate-200/90 focus:border-indigo-500 focus:ring-indigo-500/10'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] font-semibold text-rose-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Checkbox: Send welcome email */}
        <label className="flex items-start gap-3 pt-2 cursor-pointer select-none group/checkbox">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              type="checkbox"
              name="sendWelcomeEmail"
              checked={formData.sendWelcomeEmail}
              onChange={onChange}
              className="sr-only"
            />
            <div
              className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                formData.sendWelcomeEmail
                  ? 'bg-indigo-600 border-indigo-600 shadow-xs'
                  : 'bg-white border-slate-300 group-hover/checkbox:border-indigo-400'
              }`}
            >
              {formData.sendWelcomeEmail && (
                <Check className="w-3 h-3 text-white stroke-[3]" />
              )}
            </div>
          </div>
          <div>
            <span className="text-[12.5px] font-bold text-slate-800 group-hover/checkbox:text-indigo-950 transition-colors">
              Send welcome email with login instructions
            </span>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">
              An email with login instructions and temporary password will be sent to the user.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
