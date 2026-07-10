import { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../../../../hooks/useTranslation';

export default function ForgotStepReset({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  strengthScore,
  strengthConfig,
  hasLength,
  hasMixed,
  hasNumberSpecial,
  setStep
}) {
  const { t } = useTranslation();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col animate-fade-in">
      <form className="w-full space-y-4 md:space-y-6" onSubmit={(e) => { e.preventDefault(); }}>

        {/* New Password */}
        <div>
          <label className="block text-[12px] md:text-[13px] font-bold text-slate-800 mb-1 md:mb-1.5">
            {t('forgot.newPasswordLabel')}
          </label>
          <div className="relative group mb-2 md:mb-3">
            <div className="absolute inset-y-0 left-0 pl-3 md:pl-3.5 flex items-center pointer-events-none">
              <Lock className={`h-4 w-4 md:h-5 md:w-5 transition-colors ${newPassword ? strengthConfig.color : 'text-slate-400 group-focus-within:text-[#4f3bf3]'}`} />
            </div>
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full pl-9 pr-9 py-2.5 md:pl-11 md:pr-11 md:py-3 bg-white border rounded-lg focus:outline-none transition-all text-[13px] md:text-[15px] text-slate-900 placeholder:text-slate-400 ${strengthConfig.border} ${strengthConfig.shadow}`}
              placeholder="••••••••••••"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 md:pr-3.5 flex items-center"
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4 md:h-5 md:w-5 text-slate-400 hover:text-slate-600 transition-colors" />
              ) : (
                <Eye className="h-4 w-4 md:h-5 md:w-5 text-slate-400 hover:text-slate-600 transition-colors" />
              )}
            </button>
          </div>

          {/* Strength Meter */}
          <div className="flex items-center gap-1.5 md:gap-2 mb-3 md:mb-4">
            <div className="flex-1 flex gap-1 md:gap-1.5 h-1 md:h-1.5">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`flex-1 rounded-full transition-all duration-300 ${level <= (strengthScore === 0 && newPassword ? 1 : strengthScore) ? strengthConfig.bg : 'bg-slate-200'}`}
                />
              ))}
            </div>
            <span className={`text-[10px] md:text-[12px] font-bold min-w-[40px] md:min-w-[45px] text-right ${strengthConfig.color}`}>
              {strengthConfig.label}
            </span>
          </div>

          {/* Rules */}
          <div className="flex flex-col gap-1.5 md:gap-2">
            <div className="flex items-center gap-1.5 md:gap-2">
              <CheckCircle2 className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${hasLength ? 'text-emerald-500' : 'text-slate-300'}`} />
              <span className={`text-[11px] md:text-[13px] font-medium transition-colors ${hasLength ? 'text-slate-700' : 'text-slate-500'}`}>{t('forgot.rule1')}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <CheckCircle2 className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${hasMixed ? 'text-emerald-500' : 'text-slate-300'}`} />
              <span className={`text-[11px] md:text-[13px] font-medium transition-colors ${hasMixed ? 'text-slate-700' : 'text-slate-500'}`}>{t('forgot.rule2')}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <CheckCircle2 className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${hasNumberSpecial ? 'text-emerald-500' : 'text-slate-300'}`} />
              <span className={`text-[11px] md:text-[13px] font-medium transition-colors ${hasNumberSpecial ? 'text-slate-700' : 'text-slate-500'}`}>{t('forgot.rule3')}</span>
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-[12px] md:text-[13px] font-bold text-slate-800 mb-1 md:mb-1.5">
            {t('forgot.confirmPasswordLabel')}
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 md:pl-3.5 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 md:h-5 md:w-5 text-slate-400 group-focus-within:text-[#4f3bf3] transition-colors" />
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 md:pl-11 md:pr-11 md:py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#4f3bf3] focus:ring-2 focus:ring-indigo-500/20 transition-all text-[13px] md:text-[15px] text-slate-900 placeholder:text-slate-400"
              placeholder="••••••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 md:pr-3.5 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 md:h-5 md:w-5 text-slate-400 hover:text-slate-600 transition-colors" />
              ) : (
                <Eye className="h-4 w-4 md:h-5 md:w-5 text-slate-400 hover:text-slate-600 transition-colors" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          onClick={() => setStep(4)}
          disabled={!newPassword || newPassword !== confirmPassword || strengthScore < 2}
          className="w-full flex items-center justify-center gap-2 px-5 py-2.5 md:py-3.5 text-[14px] md:text-[15px] font-bold text-white bg-[#4f3bf3] hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sm rounded-lg shadow-sm transition-all duration-300"
        >
          <Lock className="w-4 h-4" />
          {t('forgot.resetBtn')}
        </button>

      </form>
    </div>
  );
}
