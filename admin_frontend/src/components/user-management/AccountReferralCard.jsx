import React from 'react';
import { Package, Users, Info, ChevronDown } from 'lucide-react';

export default function AccountReferralCard({
  formData,
  onChange,
  selectedRole,
  errors = {},
}) {
  const packages = [
    { id: 'starter', label: 'Business Starter (₹ 5,200)' },
    { id: 'growth', label: 'Growth Pack (₹ 2,500)' },
    { id: 'premium', label: 'Premium Pack (₹ 7,800)' },
    { id: 'basic', label: 'Basic (₹ 999)' },
    { id: 'advanced', label: 'Advanced (₹ 2,999)' },
  ];

  const isSupport = selectedRole === 'support';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.08)] hover:border-indigo-200 transition-all duration-300 group">
      {/* Glow flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Card Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100/90 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <h3 className="text-[15px] font-extrabold text-slate-900 tracking-tight">
            Account &amp; Referral Information
          </h3>
        </div>

        {isSupport && (
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            Optional for Support Staff
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left: Package Selection */}
        <div>
          <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
            Package {!isSupport && <span className="text-rose-500">*</span>}
          </label>
          <div className="relative">
            <Package className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              name="package"
              value={formData.package}
              onChange={onChange}
              className={`w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border rounded-xl pl-9.5 pr-9.5 py-2.5 text-[12.5px] font-medium text-slate-800 focus:outline-none appearance-none transition-all duration-200 cursor-pointer ${
                errors.package
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                  : 'border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
              }`}
            >
              <option value="">Select package</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {errors.package && (
            <p className="text-[11px] font-semibold text-rose-500 mt-1">{errors.package}</p>
          )}
        </div>

        {/* Right: Referral ID / Referral Code */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <label className="text-[11.5px] font-bold text-slate-700">
              Referral ID / Referral Code
            </label>
            <div className="group/tooltip relative inline-flex items-center cursor-help">
              <Info className="w-3.5 h-3.5 text-indigo-400 hover:text-indigo-600 transition-colors" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-48 p-2 bg-slate-900 text-white text-[10.5px] font-medium rounded-lg shadow-xl z-50 text-center">
                User ID of the sponsor or referrer who invited this account.
              </div>
            </div>
          </div>

          <div className="relative">
            <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              name="referralId"
              value={formData.referralId}
              onChange={onChange}
              placeholder="Enter referral ID"
              className={`w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border rounded-xl pl-9.5 pr-3.5 py-2.5 text-[12.5px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all duration-200 ${
                errors.referralId
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
                  : 'border-slate-200/90 focus:border-indigo-500 focus:ring-indigo-500/10'
              }`}
            />
          </div>
          <p className="text-[11px] font-medium text-slate-400 mt-1.5">
            A valid referral ID is required for user registration.
          </p>
        </div>
      </div>
    </div>
  );
}
