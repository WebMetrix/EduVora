import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2, CheckCircle2, QrCode, User, Landmark, Building, Hash, FileText } from 'lucide-react';
import CustomSelect from '../../common/CustomSelect';
import { toast } from 'react-toastify';
import api from '../../../https/axios';

export default function BankInfoForm({ t, onBack, onNext, formData, updateFormData }) {
  const [accountTypeOptions, setAccountTypeOptions] = useState([]);

  useEffect(() => {
    const fetchAccountTypes = async () => {
      try {
        const res = await api.get('/profile/dropdowns/banktypes');
        if (res.data && Array.isArray(res.data)) {
          const types = res.data.map(item => {
            // Grab the ID and Name explicitly or fallback
            const idVal = item.BankAccountTypeID || item.AccountTypeID || item.AccountTypeId || item.Id || item.ID || item.id;
            const textVal = item.BankAccountTypeDesc || item.AccountType || item.AccountTypeName || item.BankAccountType || Object.values(item).find(v => typeof v === 'string') || Object.values(item)[0];
            return { value: String(idVal || textVal), label: textVal };
          });
          setAccountTypeOptions(types);
        }
      } catch (err) {
        console.error('Error fetching account types:', err);
      }
    };
    fetchAccountTypes();
  }, []);

  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedDetails, setVerifiedDetails] = useState(null);

  const handleVerify = async () => {
    if (!formData.ifscCode?.trim()) {
      toast.error('Please enter an IFSC code first');
      return;
    }

    setIsVerifying(true);
    setVerifiedDetails(null);
    try {
      const response = await api.get(`/profile/verifyifsc/${formData.ifscCode.trim()}`);
      if (response.data && response.data.bankDetails) {
        setVerifiedDetails(response.data.bankDetails);
        updateFormData('bankName', response.data.bankDetails.bankName);
        updateFormData('branchName', response.data.bankDetails.branchName);
        toast.success(response.data.message || 'IFSC verified successfully');
      }
    } catch (error) {
      console.error('IFSC verification error:', error);
      toast.error(error.response?.data?.message || 'Failed to verify IFSC code');
    } finally {
      setIsVerifying(false);
    }
  };

  const isMatch = formData.accountNumber && formData.confirmAccountNumber && formData.accountNumber === formData.confirmAccountNumber;
  const isMismatch = formData.confirmAccountNumber && formData.accountNumber !== formData.confirmAccountNumber;

  return (
    <form className="space-y-6" onSubmit={(e) => {
      e.preventDefault();
      if (formData.accountNumber !== formData.confirmAccountNumber) {
        toast.error('Account numbers do not match!');
        return;
      }
      onNext();
    }}>
      <div className="grid grid-cols-1 gap-y-5">

        {/* IFSC Code with Verify Button */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <QrCode className="w-4 h-4 text-slate-500" />
            <label className="text-[13px] font-bold text-[#111]">
              {t('completeProfile.ifscCode')} <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              required
              value={formData.ifscCode}
              onChange={(e) => {
                updateFormData('ifscCode', e.target.value);
                setVerifiedDetails(null); // Reset verification if they type again
                updateFormData('bankName', '');
                updateFormData('branchName', '');
              }}
              className={`w-full px-4 py-3.5 pr-[100px] bg-white border ${(verifiedDetails || formData.bankName) ? 'border-emerald-300 ring-1 ring-emerald-300' : 'border-slate-200'} rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium uppercase`}
              placeholder={t('completeProfile.ifscCodePlaceholder')}
            />
            <button
              type="button"
              onClick={handleVerify}
              disabled={isVerifying || !formData.ifscCode?.trim() || (verifiedDetails !== null || !!formData.bankName)}
              className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg font-bold text-[12px] transition-all flex items-center gap-1.5 
                ${(verifiedDetails || formData.bankName)
                  ? 'bg-emerald-50 text-emerald-600 cursor-default'
                  : isVerifying
                    ? 'bg-indigo-50 text-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white cursor-pointer shadow-sm hover:shadow-md'
                }`}
            >
              {isVerifying && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {(verifiedDetails || formData.bankName) && <CheckCircle2 className="w-3.5 h-3.5" />}
              {(verifiedDetails || formData.bankName) ? t('profile.contact.verified') : isVerifying ? t('common.verifying') : t('completeProfile.verifyBtn')}
            </button>
          </div>

          {(verifiedDetails || formData.bankName) && (
            <div className="mt-3 p-3.5 bg-emerald-50/80 border border-emerald-100 rounded-xl flex items-start gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[13px] font-extrabold text-emerald-900">{verifiedDetails?.bankName || formData.bankName}</p>
                {(verifiedDetails?.branchName || formData.branchName) && (
                  <p className="text-[12px] font-bold text-emerald-600/80">
                    {verifiedDetails ? `${verifiedDetails.branchName}, ${verifiedDetails.city}, ${verifiedDetails.state}` : formData.branchName}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Account Holder Name */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-slate-500" />
            <label className="text-[13px] font-bold text-[#111]">
              {t('completeProfile.accountHolderName')} <span className="text-red-500">*</span>
            </label>
          </div>
            <input
              type="text"
              placeholder={t('completeProfile.accountHolderNamePlaceholder')}
              value={formData.accountHolderName}
              onChange={(e) => updateFormData('accountHolderName', e.target.value.replace(/[^A-Za-z\s]/g, ''))}
              className="w-full h-[48px] pl-4 pr-4 bg-white/50 backdrop-blur-sm border border-indigo-100 rounded-2xl text-[14px] text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all shadow-[0_2px_10px_rgba(79,70,229,0.02)]"
            />
        </div>

        {/* Bank Name (Read Only) */}
        <div>
          <div className="group flex flex-col gap-1 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 shadow-sm transition-all duration-300 h-18.5 justify-center mt-1">
            <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
              <Landmark className="w-4 h-4" />
              <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.bankName')}</label>
            </div>
            <div className="pl-6 pr-2">
              <span className={`font-bold text-[14px] block truncate ${formData.bankName ? 'text-[#1a1446]' : 'text-slate-400 font-medium'}`}>
                {formData.bankName || 'Verify IFSC code first'}
              </span>
            </div>
          </div>
        </div>

        {/* Account Number */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-4 h-4 text-slate-500" />
            <label className="text-[13px] font-bold text-[#111]">
              {t('completeProfile.accountNumber')} <span className="text-red-500">*</span>
            </label>
          </div>
            <input
              type="text"
              placeholder={t('completeProfile.accountNumberPlaceholder')}
              value={formData.accountNumber}
              onChange={(e) => updateFormData('accountNumber', e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            />
        </div>

        {/* Confirm Account Number */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-4 h-4 ${isMatch ? 'text-emerald-500' : isMismatch ? 'text-rose-500' : 'text-slate-500'}`} />
              <label className="text-[13px] font-bold text-[#111]">
                {t('completeProfile.confirmAccountNumber')} <span className="text-red-500">*</span>
              </label>
            </div>
            {isMatch && <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">Matched</span>}
            {isMismatch && <span className="text-[11px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">Mismatch</span>}
          </div>
          <input
            type="text"
            required
            value={formData.confirmAccountNumber}
            onChange={(e) => updateFormData('confirmAccountNumber', e.target.value)}
            className={`w-full px-4 py-3.5 bg-white border ${isMatch ? 'border-emerald-400 ring-1 ring-emerald-400 bg-emerald-50/10' :
              isMismatch ? 'border-rose-400 ring-1 ring-rose-400 bg-rose-50/10' :
                'border-slate-200 focus:border-[#4f3bf3] focus:ring-[#4f3bf3]'
              } rounded-xl focus:outline-none focus:ring-1 transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium`}
            placeholder={t('completeProfile.confirmAccountNumberPlaceholder')}
          />
        </div>

        {/* Account Type */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Building className="w-4 h-4 text-slate-500" />
            <label className="text-[13px] font-bold text-[#111]">
              {t('completeProfile.accountType')} <span className="text-red-500">*</span>
            </label>
          </div>
          <CustomSelect
            options={accountTypeOptions}
            placeholder={t('completeProfile.accountTypePlaceholder')}
            value={formData.accountType}
            onChange={(val, opt) => {
              updateFormData('accountType', val);
              if (opt) updateFormData('accountTypeName', opt.label);
            }}
          />
        </div>

      </div>

      {/* Additional Notes */}
      <div className="md:col-span-2 pt-2">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-slate-500" />
          <label className="text-[13px] font-bold text-[#111]">
            {t('completeProfile.additionalBankNotes')}
          </label>
        </div>
        <textarea
          value={formData.additionalBankNotes}
          onChange={(e) => updateFormData('additionalBankNotes', e.target.value)}
          maxLength={200}
          className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium min-h-[100px] resize-y"
          placeholder={t('completeProfile.additionalBankNotesPlaceholder')}
        />
      </div>

      {/* Submit & Back Buttons */}
      <div className="pt-6 flex flex-col md:flex-row justify-between gap-4 items-center">
        <button
          type="button"
          onClick={onBack}
          className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-white border-2 border-[#4f3bf3]/20 text-[#4f3bf3] font-bold text-[15px] hover:border-[#4f3bf3] hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center"
        >
          {t('completeProfile.backBtn')}
        </button>
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-[#4f3bf3] text-white font-bold text-[15px] hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          {t('completeProfile.saveBtn')}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </form>
  );
}
