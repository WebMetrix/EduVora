import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import UserOverviewBanner from '../components/user-management/UserOverviewBanner';
import BasicInformationCard from '../components/user-management/BasicInformationCard';
import AccountSettingsCard from '../components/user-management/AccountSettingsCard';
import PackageInformationCard from '../components/user-management/PackageInformationCard';
import ProfilePictureCard from '../components/user-management/ProfilePictureCard';
import ReferralInformationCard from '../components/user-management/ReferralInformationCard';
import AdditionalInformationCard from '../components/user-management/AdditionalInformationCard';

export default function EditUser() {
  const navigate = useNavigate();

  // Initial user state matching screenshot
  const [user, setUser] = useState({
    fullName: 'Rahul Sharma',
    userId: 'USR000125',
    joinedDate: '12 Oct 2026, 10:30 AM',
    role: 'User',
    package: 'Premium',
    status: 'Active',
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
  });

  const [formData, setFormData] = useState({
    role: 'User',
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    mobile: '98765 43210',
    dob: '15 Oct 2000',
    gender: 'Male',
    address: '123, MG Road,\nBengaluru, Karnataka - 560001,\nIndia',
    accountStatus: 'Active',
    package: 'Premium',
    packageStatus: 'Active',
    notes: '',
  });

  const [referralData] = useState({
    referralId: 'USR000101',
    referredBy: 'USR000101 (Ankit Gupta)',
    referralLink: 'https://eduvora.com/r/USR000125',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'fullName' || name === 'role' || name === 'package') {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAvatarChange = (newAvatarUrl) => {
    setUser((prev) => ({ ...prev, avatar: newAvatarUrl }));
  };

  const handleAvatarRemove = () => {
    setUser((prev) => ({
      ...prev,
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }, 600);
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5 animate-fade-in relative pb-1 sm:pb-2">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 sm:top-6 left-4 right-4 sm:left-auto sm:right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl shadow-xl shadow-emerald-600/20 border border-emerald-500 animate-slide-in max-w-md mx-auto sm:mx-0">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-white" />
          <div>
            <p className="text-[13px] font-bold">User updated successfully!</p>
            <p className="text-[11.5px] text-emerald-100">
              User details and settings have been saved.
            </p>
          </div>
        </div>
      )}

      {/* Top Header Row: Page Title + Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div>
          <h1 className="text-[20px] sm:text-[26px] lg:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
            Edit User
          </h1>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            Update user information, package and account settings.
          </p>
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-[12.5px] font-medium text-slate-500 flex-wrap">
          <Link
            to="/dashboard"
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Dashboard
          </Link>
          <span className="text-slate-300">/</span>
          <span className="hover:text-indigo-600 transition-colors">User Management</span>
          <span className="text-slate-300">/</span>
          <span className="text-indigo-600 font-bold">Edit User</span>
        </nav>
      </div>

      {/* User Overview Top Banner Card */}
      <UserOverviewBanner user={user} />

      {/* Main Two-Column Layout Grid */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column (7 cols): Basic Info, Account Settings, Package Info */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5">
            <BasicInformationCard
              formData={formData}
              onChange={handleInputChange}
            />

            <AccountSettingsCard
              formData={formData}
              onChange={handleInputChange}
            />

            <PackageInformationCard
              formData={formData}
              onChange={handleInputChange}
            />
          </div>

          {/* Right Column (5 cols): Profile Picture, Referral Info, Additional Info */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
            <ProfilePictureCard
              avatar={user.avatar}
              onAvatarChange={handleAvatarChange}
              onAvatarRemove={handleAvatarRemove}
            />

            <ReferralInformationCard referralData={referralData} />

            <AdditionalInformationCard
              notes={formData.notes}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Bottom Form Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-[13px] shadow-2xs hover:border-slate-400 transition-all cursor-pointer text-center"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-[13px] shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed text-center"
          >
            <span>{isSubmitting ? 'Updating User...' : 'Update User'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
