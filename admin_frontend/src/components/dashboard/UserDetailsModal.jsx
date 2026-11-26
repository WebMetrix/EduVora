import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X, User, Mail, Phone, Calendar, ShieldCheck, CheckCircle2,
  Copy, Check, ExternalLink, Package, ArrowUpRight,
  TrendingUp, ShoppingCart, IndianRupee, KeyRound, Edit3,
  Award, Clock, AlertCircle
} from 'lucide-react';

export default function UserDetailsModal({ user, isOpen, onClose, onViewKyc }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [copiedLink, setCopiedLink] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !user || typeof document === 'undefined') return null;

  // Resolve user fields with realistic defaults matching Image 4
  const userName = user.name || 'Rajesh Kumar';
  const userId = user.userId || 'EVU001248';
  const userAvatar = user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80';
  const userEmail = user.email || 'rajesh@gmail.com';
  const userMobile = user.mobile || '+91 98765 43210';
  const registrationDate = user.registrationDate || '31 Aug 2026, 10:24 AM';
  const accountStatus = user.accountStatus || user.status || 'Active';
  const kycStatus = user.kycStatus || 'Verified';
  const packageName = user.package || 'Business Starter';
  const dob = user.dob || '15 Oct 2000';
  const gender = user.gender || 'Male';
  const address = user.address || '123, MG Road, Andheri West, Mumbai, Maharashtra - 400053';
  const referralId = user.referralId || userId;
  const referralLink = `https://eduvora.com/r/${referralId}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile Information' },
    { id: 'kyc', label: 'KYC Details' },
    { id: 'package', label: 'Package & Products' },
    { id: 'referrals', label: 'Referrals' },
    { id: 'activity', label: 'Activity Logs' },
  ];

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Window Card - Responsive mobile bottom sheet & compact desktop squarish window */}
      <div className="w-full h-[90vh] sm:h-[86vh] sm:max-h-[86vh] sm:max-w-[800px] bg-white rounded-t-3xl sm:rounded-[22px] flex flex-col shadow-2xl relative mt-auto sm:mt-0 overflow-hidden modal-slide-up sm:modal-fade-in z-10 border border-slate-200/90">
        {/* Mobile Drag Handle */}
        <div
          onClick={onClose}
          className="w-full flex justify-center pt-2.5 pb-1 sm:hidden bg-white shrink-0 cursor-pointer"
        >
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Compact Header matching KYC Details height & styling */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
              <User className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <h2 className="text-[14px] sm:text-[15px] font-bold text-slate-900 truncate">
              User Details
            </h2>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline truncate">
              • View complete information about the user, their KYC status, package, referrals and activity
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700 cursor-pointer shrink-0"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-2.5 sm:p-3.5 space-y-2 sm:space-y-2.5 custom-scrollbar bg-slate-50/30">
          {/* Top User Profile Summary Card with Dashboard Glassmorphism Effects */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
            {/* Decorative hover gradient flare */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* User Avatar + Name + ID + Email + Mobile */}
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-indigo-100 shadow-2xs shrink-0 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-900 leading-tight group-hover:text-indigo-950 transition-colors truncate">
                      {userName}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60 whitespace-nowrap">
                      {accountStatus}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10.5px] sm:text-[11px] text-slate-500 mt-0.5">
                    <span className="font-semibold text-indigo-600">{userId}</span>
                    <span className="text-slate-300">•</span>
                    <span className="truncate">{userEmail}</span>
                    <span className="text-slate-300">•</span>
                    <span>{userMobile}</span>
                  </div>
                  <span className="text-[9.5px] sm:text-[10px] text-slate-400 mt-0.5">
                    Joined on {registrationDate}
                  </span>
                </div>
              </div>

              {/* Top Right Action Buttons: Edit User & Reset Password */}
              <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0 pt-1 sm:pt-0 border-t border-slate-100 sm:border-t-0">
                <button
                  type="button"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-indigo-200 bg-white hover:bg-indigo-50/50 text-slate-700 hover:text-indigo-600 text-[11px] font-bold shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit User</span>
                </button>
                <button
                  type="button"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold shadow-xs shadow-indigo-200 transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Reset Password</span>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-1 border-b border-slate-200/80 overflow-x-auto no-scrollbar pb-0.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 text-[11.5px] sm:text-[12px] font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer relative ${isActive
                    ? 'text-indigo-600 bg-indigo-50/80 border border-indigo-100 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB 1: Profile Information (Matching Image 4) */}
          {activeTab === 'profile' && (
            <div className="space-y-2 sm:space-y-2.5">
              {/* Row 1: Personal Information (Left) + Package Information (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
                {/* Personal Information Card */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                  <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100/90">
                    <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <User className="w-3 h-3" />
                    </div>
                    <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                      Personal Information
                    </h4>
                  </div>

                  <div className="relative z-10 space-y-1.5 text-[11px] sm:text-[11.5px]">
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Full Name</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">{userName}</span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Email Address</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left truncate">{userEmail}</span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Mobile Number</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">{userMobile}</span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Date of Birth</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">{dob}</span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Gender</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">{gender}</span>
                    </div>
                    <div className="flex items-start justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0 pt-0.5">Address</span>
                      <span className="font-bold text-slate-800 leading-snug text-right sm:text-left flex-1">{address}</span>
                    </div>
                  </div>
                </div>

                {/* Package Information Card */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                  <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100/90">
                    <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Package className="w-3 h-3" />
                    </div>
                    <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                      Package Information
                    </h4>
                  </div>

                  <div className="relative z-10 space-y-1.5 text-[11px] sm:text-[11.5px]">
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Package Name</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                        {packageName}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Purchase Date</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">{registrationDate}</span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Amount Paid</span>
                      <span className="font-bold text-slate-900 text-[12px] text-right sm:text-left">₹ 5,200</span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Payment Method</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">UPI</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Payment Status</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        Paid
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Order ID</span>
                      <span className="font-bold text-indigo-600 font-mono text-right sm:text-left">OR20260831001</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 shrink-0">Product Access</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <Check className="w-2.5 h-2.5" /> Activated
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Account Information (Left) + KYC Status & Quick Stats (Right Stack) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
                {/* Account Information Card */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                  <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100/90">
                    <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Award className="w-3 h-3" />
                    </div>
                    <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                      Account Information
                    </h4>
                  </div>

                  <div className="relative z-10 space-y-1.5 text-[11px] sm:text-[11.5px]">
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-32 shrink-0">User ID</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">{userId}</span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-32 shrink-0">Registration Date</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">{registrationDate}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-32 shrink-0">Account Status</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        {accountStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-32 shrink-0">Email Verified</span>
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                      </span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-32 shrink-0">Mobile Verified</span>
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-32 shrink-0">Referral ID</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">{referralId}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-32 shrink-0">Referral Link</span>
                      <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end sm:justify-start">
                        <span className="font-mono text-[10px] sm:text-[10.5px] text-slate-700 truncate max-w-[140px] sm:max-w-[170px]">
                          {referralLink}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyLink}
                          className="p-1 rounded-md hover:bg-indigo-50 text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                          title="Copy Link"
                        >
                          {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-32 shrink-0">Last Login</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">01 Sep 2026, 10:15 AM</span>
                    </div>
                    <div className="flex items-baseline justify-between sm:justify-start gap-3">
                      <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-32 shrink-0">Account Created By</span>
                      <span className="font-bold text-slate-800 text-right sm:text-left">Self Registered</span>
                    </div>
                  </div>
                </div>

                {/* Right Stack: KYC Status Card + Quick Stats Card */}
                <div className="space-y-2 sm:space-y-2.5">
                  {/* KYC Status Card */}
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                    <div className="relative z-10 flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100/90">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                          <ShieldCheck className="w-3 h-3" />
                        </div>
                        <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                          KYC Status
                        </h4>
                      </div>
                    </div>

                    <div className="relative z-10 space-y-1.5 text-[11px] sm:text-[11.5px]">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px]">Aadhar Card</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            Verified
                          </span>
                          <button
                            type="button"
                            onClick={onViewKyc}
                            className="text-[10.5px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                          >
                            View
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px]">PAN Card</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            Verified
                          </span>
                          <button
                            type="button"
                            onClick={onViewKyc}
                            className="text-[10.5px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                          >
                            View
                          </button>
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between pt-1 border-t border-slate-100">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px]">Submission Date</span>
                        <span className="font-bold text-slate-800 text-[10.5px]">31 Aug 2026, 10:24 AM</span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px]">Verified Date</span>
                        <span className="font-bold text-slate-800 text-[10.5px]">01 Sep 2026, 11:30 AM</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats Card */}
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                    <div className="relative z-10 flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100/90">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                          <TrendingUp className="w-3 h-3" />
                        </div>
                        <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                          Quick Stats
                        </h4>
                      </div>
                    </div>

                    <div className="relative z-10 space-y-1.5 text-[11px] sm:text-[11.5px]">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium text-[10.5px] sm:text-[11px]">Total Referrals (Level 1)</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">24</span>
                          <button type="button" onClick={() => setActiveTab('referrals')} className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer">
                            View All
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium text-[10.5px] sm:text-[11px]">Total Referrals (Level 2)</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">86</span>
                          <button type="button" onClick={() => setActiveTab('referrals')} className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer">
                            View All
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium text-[10.5px] sm:text-[11px]">Total Orders</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">6</span>
                          <button type="button" onClick={() => setActiveTab('package')} className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer">
                            View All
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium text-[10.5px] sm:text-[11px]">Total Commission Earned</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-indigo-600 text-[12px]">₹ 4,850</span>
                          <button type="button" onClick={() => setActiveTab('referrals')} className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer">
                            View All
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KYC Details Tab View */}
          {activeTab === 'kyc' && (
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-[13px] font-bold text-slate-900">KYC Verification Summary</h4>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  {kycStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11.5px] mb-4">
                <div className="space-y-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">Aadhaar Card (Front & Back)</p>
                  <p className="font-bold text-slate-800">XXXX XXXX 4821</p>
                  <span className="inline-block text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    Verified by Neha Sharma
                  </span>
                </div>
                <div className="space-y-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">PAN Card</p>
                  <p className="font-bold text-slate-800">ABCDE1234F</p>
                  <span className="inline-block text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    Verified on 01 Sep 2026
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onViewKyc}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold shadow-xs cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Open Full KYC Document Viewer</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Package & Products Tab View */}
          {activeTab === 'package' && (
            <div className="space-y-2.5">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-[13px] font-bold text-slate-900">Current Enrolled Package</h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    {packageName}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Amount</span>
                    <span className="font-bold text-slate-900 text-[13px] block mt-0.5">₹ 5,200</span>
                  </div>
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Status</span>
                    <span className="font-bold text-emerald-600 block mt-0.5">Active</span>
                  </div>
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Order ID</span>
                    <span className="font-bold text-slate-800 block mt-0.5">OR20260831001</span>
                  </div>
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Validity</span>
                    <span className="font-bold text-slate-800 block mt-0.5">Lifetime</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Referrals Tab View */}
          {activeTab === 'referrals' && (
            <div className="space-y-2.5">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-[13px] font-bold text-slate-900">Referral Network Overview</h4>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-600">Total Network: 110 Users</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[11px]">
                  <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/70">
                    <span className="text-indigo-600 font-semibold text-[10.5px]">Direct Referrals (Level 1)</span>
                    <p className="text-xl font-bold text-slate-900 mt-1">24</p>
                  </div>
                  <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100/70">
                    <span className="text-purple-600 font-semibold text-[10.5px]">Indirect Referrals (Level 2)</span>
                    <p className="text-xl font-bold text-slate-900 mt-1">86</p>
                  </div>
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100/70 col-span-2 sm:col-span-1">
                    <span className="text-emerald-600 font-semibold text-[10.5px]">Commission Earned</span>
                    <p className="text-xl font-bold text-emerald-700 mt-1">₹ 4,850</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Activity Logs Tab View */}
          {activeTab === 'activity' && (
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300">
              <h4 className="text-[13px] font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
                Recent Security & Activity Logs
              </h4>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-start justify-between p-2 rounded-lg bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="font-semibold text-slate-800">User logged in from Chrome (Windows)</span>
                  </div>
                  <span className="text-slate-400 text-[10px]">01 Sep 2026, 10:15 AM</span>
                </div>
                <div className="flex items-start justify-between p-2 rounded-lg bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="font-semibold text-slate-800">KYC verification approved by admin</span>
                  </div>
                  <span className="text-slate-400 text-[10px]">01 Sep 2026, 11:30 AM</span>
                </div>
                <div className="flex items-start justify-between p-2 rounded-lg bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="font-semibold text-slate-800">Purchased Business Starter package</span>
                  </div>
                  <span className="text-slate-400 text-[10px]">31 Aug 2026, 10:24 AM</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Compact Footer with Close Button */}
        <div className="flex items-center justify-end px-3.5 sm:px-5 py-2 sm:py-2.5 border-t border-slate-100 bg-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11.5px] font-bold shadow-2xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
