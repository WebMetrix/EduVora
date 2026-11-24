import React, { useState } from 'react';
import { X, User, Shield, Package, Users, Copy, Check } from 'lucide-react';

export default function UserDetailsSidePanel({ user, onClose, isDrawer = false }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const handleCopy = () => {
    if (user.referralLink) {
      navigator.clipboard.writeText(user.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tabs = ['Overview', 'Account', 'Package', 'Referrals'];

  return (
    <div
      className={`relative bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl transition-all duration-300 group flex flex-col ${
        isDrawer
          ? 'w-full h-full overflow-hidden'
          : 'rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.08)] hover:border-indigo-200 overflow-hidden'
      }`}
    >
      {/* Decorative hover gradient flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Compact Header matching Dashboard Pop up Windows */}
      <div className="relative z-10 px-3.5 sm:px-5 py-2 sm:py-2.5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white/90 backdrop-blur-md">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
            <User className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <h2 className="text-[14px] sm:text-[15px] font-bold text-slate-900 truncate">
            User Details
          </h2>
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline truncate">
            • View complete user information and account settings
          </span>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700 cursor-pointer shrink-0"
            title="Close details"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Scrollable Content Container */}
      <div
        className={`relative z-10 p-4 sm:p-5 space-y-4 ${
          isDrawer ? 'flex-1 min-h-0 overflow-y-auto custom-scrollbar overscroll-contain' : ''
        }`}
      >
        {/* User Identity Header Card */}
        <div className="flex items-start gap-3 sm:gap-3.5">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-indigo-100 shadow-sm shrink-0"
            />
          ) : (
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-extrabold text-base flex items-center justify-center shrink-0">
              {user.initials || user.name?.slice(0, 2).toUpperCase()}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-[15px] sm:text-[16px] font-black text-slate-900 tracking-tight truncate">
                {user.name}
              </h4>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {user.status || 'Active'}
              </span>
            </div>
            <p className="text-[11px] sm:text-[11.5px] text-slate-500 font-medium mt-0.5">
              {user.id}
            </p>
            <p className="text-[11px] sm:text-[11.5px] text-slate-500 font-medium truncate">
              {user.email}
            </p>
            <p className="text-[11px] sm:text-[11.5px] text-slate-500 font-medium">
              {user.mobile}
            </p>

            {/* Role & Package Pills */}
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10.5px] sm:text-[11px] font-bold bg-purple-100/80 text-purple-700">
                {user.role}
              </span>
              {user.package && user.package !== '-' && (
                <span className="px-2.5 py-0.5 rounded-md text-[10.5px] sm:text-[11px] font-bold bg-indigo-100/80 text-indigo-700">
                  {user.package}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs (scrollable horizontally on mobile) */}
        <div className="border-b border-slate-200/80 flex items-center gap-4 sm:gap-6 pt-1 overflow-x-auto custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-[12px] sm:text-[12.5px] font-extrabold transition-colors cursor-pointer whitespace-nowrap shrink-0 relative ${
                activeTab === tab
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Details Content */}
        <div className="space-y-4 pt-1">
          {/* 1. Personal Information */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-600">
              <User className="w-4 h-4 stroke-[2.2]" />
              <h5 className="text-[12.5px] sm:text-[13px] font-extrabold text-slate-900 tracking-tight">
                Personal Information
              </h5>
            </div>

            <div className="space-y-1.5 text-[11px] sm:text-[11.5px]">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">Full Name</span>
                <span className="col-span-2 font-bold text-slate-900">{user.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">Email Address</span>
                <span className="col-span-2 font-semibold text-slate-800 truncate">{user.email}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">Mobile Number</span>
                <span className="col-span-2 font-semibold text-slate-800">{user.mobile}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">Date of Birth</span>
                <span className="col-span-2 font-semibold text-slate-800">{user.dob || '15 Oct 2000'}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">Gender</span>
                <span className="col-span-2 font-semibold text-slate-800">{user.gender || 'Male'}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">Address</span>
                <span className="col-span-2 font-semibold text-slate-800 leading-snug">
                  {user.address || '123, MG Road, Bengaluru, Karnataka - 560001, India'}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Account Information */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 text-indigo-600">
              <Shield className="w-4 h-4 stroke-[2.2]" />
              <h5 className="text-[12.5px] sm:text-[13px] font-extrabold text-slate-900 tracking-tight">
                Account Information
              </h5>
            </div>

            <div className="space-y-1.5 text-[11px] sm:text-[11.5px]">
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-slate-500 font-medium">User Role</span>
                <span className="col-span-2">
                  <span className="px-2 py-0.5 rounded text-[10px] sm:text-[10.5px] font-bold bg-purple-100/80 text-purple-700">
                    {user.role}
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">User ID</span>
                <span className="col-span-2 font-bold text-slate-900">{user.id}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">Referral ID</span>
                <span className="col-span-2 font-semibold text-slate-800">{user.referralId || 'USR000101'}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-slate-500 font-medium">Account Status</span>
                <span className="col-span-2 inline-flex items-center gap-1 font-bold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {user.status || 'Active'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">Registration Date</span>
                <span className="col-span-2 font-semibold text-slate-800">{user.date} {user.time}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-slate-500 font-medium">Email Verified</span>
                <span className="col-span-2 inline-flex items-center gap-1 font-bold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Yes
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-slate-500 font-medium">Mobile Verified</span>
                <span className="col-span-2 inline-flex items-center gap-1 font-bold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Yes
                </span>
              </div>
            </div>
          </div>

          {/* 3. Package Information */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 text-indigo-600">
              <Package className="w-4 h-4 stroke-[2.2]" />
              <h5 className="text-[12.5px] sm:text-[13px] font-extrabold text-slate-900 tracking-tight">
                Package Information
              </h5>
            </div>

            <div className="space-y-1.5 text-[11px] sm:text-[11.5px]">
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-slate-500 font-medium">Package</span>
                <span className="col-span-2">
                  <span className="px-2 py-0.5 rounded text-[10px] sm:text-[10.5px] font-bold bg-indigo-100/80 text-indigo-700">
                    {user.package || 'Premium'}
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">Purchase Date</span>
                <span className="col-span-2 font-semibold text-slate-800">12 Oct 2026 11:15 AM</span>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-slate-500 font-medium">Package Status</span>
                <span className="col-span-2 inline-flex items-center gap-1 font-bold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">Expiry Date</span>
                <span className="col-span-2 font-semibold text-slate-800">12 Oct 2027 11:15 AM</span>
              </div>
            </div>
          </div>

          {/* 4. Referral Information */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 text-indigo-600">
              <Users className="w-4 h-4 stroke-[2.2]" />
              <h5 className="text-[12.5px] sm:text-[13px] font-extrabold text-slate-900 tracking-tight">
                Referral Information
              </h5>
            </div>

            <div className="space-y-1.5 text-[11px] sm:text-[11.5px]">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">Referred By</span>
                <span className="col-span-2 font-semibold text-slate-800 truncate">
                  {user.referredBy || 'USR000101 (Ankit Gupta)'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-slate-500 font-medium">Referral Link</span>
                <div className="col-span-2 flex items-center justify-between gap-1 bg-slate-100/80 rounded-lg px-2 py-1 font-semibold text-slate-700">
                  <span className="truncate text-[10.5px]">
                    {user.referralLink || `https://eduvora.com/r/${user.id}`}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1 text-slate-400 hover:text-indigo-600 transition-colors shrink-0 cursor-pointer"
                    title="Copy Link"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
