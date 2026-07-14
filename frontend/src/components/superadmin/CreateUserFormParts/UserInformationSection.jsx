import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import CustomDatePicker from '../../common/CustomDatePicker';
import CustomSelect from '../../common/CustomSelect';

export default function UserInformationSection() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password strength logic
  const getStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score++;
    if (pass.length >= 12 && score === 3) score++;
    return score;
  };

  const strengthScore = getStrength(password);

  const getStrengthConfig = () => {
    if (!password) return { color: 'text-slate-300', bg: 'bg-slate-200', border: 'border-slate-200 focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3]', shadow: '', label: '' };
    switch (strengthScore) {
      case 0:
      case 1:
        return { color: 'text-red-500', bg: 'bg-red-500', border: 'border-red-500 focus:border-red-500', shadow: 'shadow-[0_0_0_3px_rgba(239,68,68,0.1)]', label: 'Weak' };
      case 2:
        return { color: 'text-amber-500', bg: 'bg-amber-500', border: 'border-amber-500 focus:border-amber-500', shadow: 'shadow-[0_0_0_3px_rgba(245,158,11,0.1)]', label: 'Fair' };
      case 3:
        return { color: 'text-emerald-400', bg: 'bg-emerald-400', border: 'border-emerald-400 focus:border-emerald-400', shadow: 'shadow-[0_0_0_3px_rgba(52,211,153,0.1)]', label: 'Good' };
      case 4:
      default:
        return { color: 'text-emerald-500', bg: 'bg-emerald-500', border: 'border-emerald-500 focus:border-emerald-500', shadow: 'shadow-[0_0_0_3px_rgba(16,185,129,0.1)]', label: 'Strong' };
    }
  };

  const strengthConfig = getStrengthConfig();

  // Confirm matching logic
  const passwordsMatch = password === confirmPassword;
  const showMatchStatus = confirmPassword.length > 0;
  
  const confirmBorderColor = showMatchStatus 
    ? (passwordsMatch ? 'border-emerald-500 focus:border-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.1)]' : 'border-red-500 focus:border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]') 
    : 'border-slate-200 focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3]';

  const roleOptions = [
    { value: 'superadmin', label: 'Super Admin' },
    { value: 'admin', label: 'Admin' },
    { value: 'instructor', label: 'Instructor' },
    { value: 'member', label: 'Member' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      <div className="p-5 lg:p-6 border-b border-slate-100">
        <h2 className="text-[16px] font-bold text-[#1a1446]">User Information</h2>
      </div>

      <div className="p-5 lg:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">Full Name <span className="text-red-500">*</span></label>
          <input type="text" placeholder="Enter full name" className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium" />
        </div>

        {/* User Role */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">User Role <span className="text-red-500">*</span></label>
          <CustomSelect options={roleOptions} placeholder="Select role" />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">Email Address <span className="text-red-500">*</span></label>
          <input type="email" placeholder="Enter email address" className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium" />
        </div>

        {/* Username */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">Username <span className="text-red-500">*</span></label>
          <input type="text" placeholder="Enter username" className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium" />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">Mobile Number <span className="text-red-500">*</span></label>
          <div className="flex rounded-xl border border-slate-200 bg-white overflow-hidden focus-within:border-[#4f3bf3] focus-within:ring-1 focus-within:ring-[#4f3bf3] transition-all">
            <select className="px-3 py-3.5 bg-slate-50 border-r border-slate-200 text-[14px] font-medium text-slate-900 outline-none cursor-pointer">
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input type="tel" placeholder="Enter mobile number" className="flex-1 px-4 py-3.5 bg-transparent text-[14px] font-medium text-slate-900 outline-none placeholder:text-slate-400" />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">Date of Birth</label>
          <CustomDatePicker placeholder="Select date" />
        </div>

        {/* Password */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">Password <span className="text-red-500">*</span></label>
          <div className="relative group">
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password" 
              className={`w-full px-4 py-3.5 pr-10 bg-white border rounded-xl focus:outline-none transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium ${strengthConfig.border} ${strengthConfig.shadow}`} 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          
          {/* Strength Meter */}
          <div className="flex items-center gap-1.5 md:gap-2 mt-2">
            <div className="flex-1 flex gap-1 h-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`flex-1 rounded-full transition-all duration-300 ${level <= (strengthScore === 0 && password ? 1 : strengthScore) ? strengthConfig.bg : 'bg-slate-200'}`}
                />
              ))}
            </div>
            <span className={`text-[10px] font-bold min-w-[35px] text-right ${strengthConfig.color}`}>
              {strengthConfig.label}
            </span>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">Status <span className="text-red-500">*</span></label>
          <CustomSelect options={statusOptions} placeholder="Select status" />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">Confirm Password <span className="text-red-500">*</span></label>
          <div className="relative">
            <input 
              type={showConfirmPassword ? 'text' : 'password'} 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password" 
              className={`w-full px-4 py-3.5 pr-10 bg-white border rounded-xl focus:outline-none transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium ${confirmBorderColor}`} 
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors">
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
