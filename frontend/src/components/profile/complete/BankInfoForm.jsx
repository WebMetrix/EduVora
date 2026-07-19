import React, { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import CustomSelect from '../../common/CustomSelect';
import { toast } from 'react-toastify';
import api from '../../../https/axios';

export default function BankInfoForm({ t, onBack, onNext }) {
  const bankOptions = [
    { value: 'sbi', label: 'State Bank of India' },
    { value: 'hdfc', label: 'HDFC Bank' },
    { value: 'icici', label: 'ICICI Bank' },
    { value: 'axis', label: 'Axis Bank' },
    { value: 'pnb', label: 'Punjab National Bank' },
  ];

  const accountTypeOptions = [
    { value: 'savings', label: 'Savings Account' },
    { value: 'current', label: 'Current Account' },
  ];

  const [ifsc, setIfsc] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedDetails, setVerifiedDetails] = useState(null);
  const [bankName, setBankName] = useState('');

  const handleVerify = async () => {
    if (!ifsc.trim()) {
      toast.error('Please enter an IFSC code first');
      return;
    }

    setIsVerifying(true);
    setVerifiedDetails(null);
    try {
      const response = await api.get(`/profile/verifyifsc/${ifsc.trim()}`);
      if (response.data && response.data.bankDetails) {
        setVerifiedDetails(response.data.bankDetails);
        setBankName(response.data.bankDetails.bankName);
        toast.success(response.data.message || 'IFSC verified successfully');
      }
    } catch (error) {
      console.error('IFSC verification error:', error);
      toast.error(error.response?.data?.message || 'Failed to verify IFSC code');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={(e) => { 
      e.preventDefault(); 
      onNext();
    }}>
      <div className="grid grid-cols-1 gap-y-5">
        
        {/* IFSC Code with Verify Button */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.ifscCode')} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={ifsc}
              onChange={(e) => {
                setIfsc(e.target.value);
                setVerifiedDetails(null); // Reset verification if they type again
              }}
              className={`w-full px-4 py-3.5 pr-[100px] bg-white border ${verifiedDetails ? 'border-emerald-300 ring-1 ring-emerald-300' : 'border-slate-200'} rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium uppercase`}
              placeholder={t('completeProfile.ifscCodePlaceholder')}
            />
            <button
              type="button"
              onClick={handleVerify}
              disabled={isVerifying || !ifsc.trim() || verifiedDetails !== null}
              className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg font-bold text-[12px] transition-all flex items-center gap-1.5 
                ${verifiedDetails 
                  ? 'bg-emerald-50 text-emerald-600 cursor-default' 
                  : isVerifying 
                    ? 'bg-indigo-50 text-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white cursor-pointer shadow-sm hover:shadow-md'
                }`}
            >
              {isVerifying && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {verifiedDetails && <CheckCircle2 className="w-3.5 h-3.5" />}
              {verifiedDetails ? 'Verified' : isVerifying ? 'Verifying...' : t('completeProfile.verifyBtn')}
            </button>
          </div>
          
          {verifiedDetails && (
            <div className="mt-3 p-3.5 bg-emerald-50/80 border border-emerald-100 rounded-xl flex items-start gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[13px] font-extrabold text-emerald-900">{verifiedDetails.bankName}</p>
                <p className="text-[12px] font-bold text-emerald-600/80">{verifiedDetails.branchName}, {verifiedDetails.city}, {verifiedDetails.state}</p>
              </div>
            </div>
          )}
        </div>

        {/* Account Holder Name */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.accountHolderName')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.accountHolderNamePlaceholder')}
          />
        </div>

        {/* Bank Name */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.bankName')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.bankNamePlaceholder')}
          />
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.accountNumber')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.accountNumberPlaceholder')}
          />
        </div>

        {/* Confirm Account Number */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.confirmAccountNumber')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder={t('completeProfile.confirmAccountNumberPlaceholder')}
          />
        </div>

        {/* Account Type */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">
            {t('completeProfile.accountType')} <span className="text-red-500">*</span>
          </label>
          <CustomSelect options={accountTypeOptions} placeholder={t('completeProfile.accountTypePlaceholder')} />
        </div>

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
