import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import SelectUserRoleCard from '../components/user-management/SelectUserRoleCard';
import PersonalInformationCard from '../components/user-management/PersonalInformationCard';
import AccountReferralCard from '../components/user-management/AccountReferralCard';
import SecurityCard from '../components/user-management/SecurityCard';
import RoleRequirementsSidebar from '../components/user-management/RoleRequirementsSidebar';

export default function AddUser() {
  const navigate = useNavigate();

  // Selected role state: 'user' | 'support'
  const [selectedRole, setSelectedRole] = useState('user');

  // Form input values
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    dob: '',
    gender: '',
    address: '',
    package: '',
    referralId: '',
    tempPassword: '',
    confirmPassword: '',
    sendWelcomeEmail: true,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';

    if (selectedRole === 'user') {
      if (!formData.package) newErrors.package = 'Please select a package';
    }

    if (!formData.tempPassword) {
      newErrors.tempPassword = 'Temporary password is required';
    } else if (formData.tempPassword.length < 6) {
      newErrors.tempPassword = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (formData.tempPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);

      // Reset form after short delay
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          mobile: '',
          dob: '',
          gender: '',
          address: '',
          package: '',
          referralId: '',
          tempPassword: '',
          confirmPassword: '',
          sendWelcomeEmail: true,
        });
      }, 500);

      // Hide toast after 4s
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }, 700);
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
            <p className="text-[13px] font-bold">User created successfully!</p>
            <p className="text-[11.5px] text-emerald-100">
              Welcome email with login instructions has been dispatched.
            </p>
          </div>
        </div>
      )}

      {/* Top Header Row: Page Title + Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div>
          <h1 className="text-[20px] sm:text-[26px] lg:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
            Add User
          </h1>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            Create a new user account on the EduVora platform.
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
          <span className="text-indigo-600 font-bold">Add User</span>
        </nav>
      </div>

      {/* Main Grid: Form Sections (Left) & Role Requirements (Right) */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-5">
          {/* 1. Select User Role Card */}
          <div className="relative z-30">
            <SelectUserRoleCard
              selectedRole={selectedRole}
              onSelectRole={setSelectedRole}
            />
          </div>

          {/* 2. Tabs Row: User Details */}
          <div className="border-b border-slate-200/90 pt-1 relative z-10">
            <div className="inline-flex items-center gap-2 pb-2.5 border-b-2 border-indigo-600 text-indigo-600 font-extrabold text-[13.5px]">
              <div className="w-5 h-5 rounded-full border border-indigo-200 bg-indigo-50 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <span>User Details</span>
            </div>
          </div>

          {/* 3. Personal Information Card */}
          <div className="relative z-10">
            <PersonalInformationCard
              formData={formData}
              onChange={handleInputChange}
              errors={errors}
            />
          </div>

          {/* 4. Account & Referral Information Card */}
          <div className="relative z-10">
            <AccountReferralCard
              formData={formData}
              onChange={handleInputChange}
              selectedRole={selectedRole}
              errors={errors}
            />
          </div>

          {/* 5. Security Card */}
          <div className="relative z-10">
            <SecurityCard
              formData={formData}
              onChange={handleInputChange}
              errors={errors}
            />
          </div>

          {/* 6. Bottom Form Action Buttons */}
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
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>{isSubmitting ? 'Creating User...' : 'Create User'}</span>
            </button>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-4">
            <RoleRequirementsSidebar
              selectedRole={selectedRole}
              onSelectRole={setSelectedRole}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
