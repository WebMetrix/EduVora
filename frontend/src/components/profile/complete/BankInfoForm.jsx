import React from 'react';
import { ArrowRight } from 'lucide-react';
import CustomSelect from '../../common/CustomSelect';

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
              className="w-full px-4 py-3.5 pr-20 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium uppercase"
              placeholder={t('completeProfile.ifscCodePlaceholder')}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4f3bf3] font-bold text-[13px] hover:text-indigo-700 transition-colors"
            >
              {t('completeProfile.verifyBtn')}
            </button>
          </div>
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
          <CustomSelect options={bankOptions} placeholder={t('completeProfile.bankNamePlaceholder')} />
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
