import { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, CheckCircle2, Shield, Info } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function ChangePasswordCard({ setActiveTab }) {
  const { t } = useTranslation();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength logic
  const getStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score++;
    if (pass.length >= 12 && score === 3) score++;
    return score;
  };

  const strengthScore = getStrength(newPassword);

  const getStrengthConfig = () => {
    if (!newPassword) return { color: 'text-slate-300', border: 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20', shadow: '' };
    switch (strengthScore) {
      case 0:
      case 1:
        return { color: 'text-red-500', border: 'border-red-500 focus:border-red-500', shadow: 'shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' };
      case 2:
        return { color: 'text-amber-500', border: 'border-amber-500 focus:border-amber-500', shadow: 'shadow-[0_0_0_4px_rgba(245,158,11,0.1)]' };
      case 3:
        return { color: 'text-emerald-400', border: 'border-emerald-400 focus:border-emerald-400', shadow: 'shadow-[0_0_0_4px_rgba(52,211,153,0.1)]' };
      case 4:
      default:
        return { color: 'text-emerald-500', border: 'border-emerald-500 focus:border-emerald-500', shadow: 'shadow-[0_0_0_4px_rgba(16,185,129,0.1)]' };
    }
  };

  const strengthConfig = getStrengthConfig();
  const hasLength = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
  
  const isPasswordValid = hasLength && hasUpper && hasLower && hasNumber && hasSpecial;

  // Confirm matching logic
  const passwordsMatch = newPassword === confirmPassword;
  const showMatchStatus = confirmPassword.length > 0;
  
  const confirmBorderColor = showMatchStatus 
    ? (passwordsMatch ? 'border-emerald-500 focus:border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]' : 'border-red-500 focus:border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]') 
    : 'border-slate-200 focus:border-[#4f3bf3] focus:ring-2 focus:ring-indigo-500/20';
    
  const confirmIconColor = showMatchStatus 
    ? (passwordsMatch ? 'text-emerald-500' : 'text-red-500') 
    : 'text-slate-400 group-focus-within:text-[#4f3bf3]';

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-6 lg:p-10 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col md:flex-row gap-8 lg:gap-16">
        
        {/* Left Column: Info & Illustration */}
      <div className="w-full md:w-1/3 flex flex-col items-center text-center">
        {/* Custom Lock Illustration */}
        <div className="relative w-40 h-40 mb-8 mt-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#f4efff] rounded-full flex items-center justify-center">
            {/* Main Lock */}
            <Lock className="w-20 h-20 text-[#603af0] fill-[#603af0]" strokeWidth={1} />
            {/* Shield overlay */}
            <div className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-10 h-10 bg-[#603af0] rounded-full flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-[20px] font-bold text-slate-900 mb-3">Keep Your Account Secure</h3>
        <p className="text-[14px] text-slate-500 leading-relaxed max-w-[280px]">
          A strong password protects your account and personal information from unauthorized access.
        </p>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px bg-slate-200"></div>

      {/* Right Column: Form */}
      <div className="w-full md:w-2/3 flex flex-col justify-center max-w-[500px]">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Current Password - Tinted Glass Effect */}
          <div>
            <label className="block text-[13px] font-bold text-slate-900 mb-2">
              Current Password <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Lock className="h-5 w-5 text-indigo-400/80 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 bg-[#f8f6ff]/80 backdrop-blur-sm border border-indigo-100/50 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-[14px] text-slate-900 placeholder:text-indigo-900/30 font-medium"
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center z-10"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-5 w-5 text-indigo-400/80 hover:text-indigo-600 transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-indigo-400/80 hover:text-indigo-600 transition-colors" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-[13px] font-bold text-slate-900 mb-2">
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative group mb-4">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 transition-colors ${newPassword ? strengthConfig.color : 'text-slate-400 group-focus-within:text-[#4f3bf3]'}`} />
              </div>
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full pl-12 pr-12 py-3 bg-white border rounded-xl focus:outline-none transition-all text-[14px] text-slate-900 placeholder:text-slate-400 ${strengthConfig.border} ${strengthConfig.shadow}`}
                placeholder="Enter your new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                )}
              </button>
            </div>

            {/* Rules Checklist */}
            <div className="mb-2">
              <p className="text-[13px] font-bold text-slate-900 mb-2">Password must contain:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 transition-colors ${hasLength ? 'text-emerald-500' : 'text-slate-300'}`} />
                  <span className={`text-[13px] font-medium transition-colors ${hasLength ? 'text-slate-900' : 'text-slate-500'}`}>At least 8 characters</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 transition-colors ${hasUpper ? 'text-emerald-500' : 'text-slate-300'}`} />
                  <span className={`text-[13px] font-medium transition-colors ${hasUpper ? 'text-slate-900' : 'text-slate-500'}`}>One uppercase letter (A-Z)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 transition-colors ${hasLower ? 'text-emerald-500' : 'text-slate-300'}`} />
                  <span className={`text-[13px] font-medium transition-colors ${hasLower ? 'text-slate-900' : 'text-slate-500'}`}>One lowercase letter (a-z)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 transition-colors ${hasNumber ? 'text-emerald-500' : 'text-slate-300'}`} />
                  <span className={`text-[13px] font-medium transition-colors ${hasNumber ? 'text-slate-900' : 'text-slate-500'}`}>One number (0-9)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 transition-colors ${hasSpecial ? 'text-emerald-500' : 'text-slate-300'}`} />
                  <span className={`text-[13px] font-medium transition-colors ${hasSpecial ? 'text-slate-900' : 'text-slate-500'}`}>One special character (!@#$%^&*)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[13px] font-bold text-slate-900 mb-2">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 transition-colors ${confirmIconColor}`} />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full pl-12 pr-12 py-3 bg-white border rounded-xl focus:outline-none transition-all text-[14px] text-slate-900 placeholder:text-slate-400 ${confirmBorderColor}`}
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                )}
              </button>
            </div>
            {showMatchStatus && (
              <p className={`mt-2 text-[12px] font-bold ${passwordsMatch ? 'text-emerald-500' : 'text-red-500'}`}>
                {passwordsMatch ? "Passwords match" : "Passwords don't match"}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center gap-3 mt-8 pt-4">
            <button
              type="button"
              onClick={() => setActiveTab('personalInfo')}
              className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-bold text-[14px] hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!passwordsMatch || !currentPassword || !isPasswordValid}
              onClick={() => {
                alert('Password updated successfully!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
              }}
              className="px-6 py-2.5 rounded-lg bg-[#4f3bf3] text-white font-bold text-[14px] hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-300"
            >
              Update Password
            </button>
          </div>

        </form>
      </div>

      </div>

      {/* Tip Banner */}
      <div className="bg-[#f8f6ff] rounded-2xl p-4 md:p-5 border border-indigo-50 flex items-center gap-3 shadow-sm">
        <Info className="w-5 h-5 text-[#603af0] shrink-0" />
        <p className="text-[13px] md:text-[14px] text-slate-700">
          <span className="font-bold text-slate-900">Tip:</span> Avoid using easily guessable information like your name, birthdate, or common words.
        </p>
      </div>
    </div>
  );
}
