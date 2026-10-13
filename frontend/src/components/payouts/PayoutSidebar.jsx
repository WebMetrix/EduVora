import React from 'react';
import { Info, ChevronRight, Settings } from 'lucide-react';
import { BankTransferIcon, UpiIcon, PaypalIcon } from './PayoutIcons';

export default function PayoutSidebar({
  onManageMethods,
  onSelectMethod
}) {
  const payoutMethods = [
    {
      id: 'bank',
      name: 'Bank Transfer',
      detail: '•••• 1234',
      status: 'Verified',
      isVerified: true,
      iconType: 'bank'
    },
    {
      id: 'upi',
      name: 'UPI',
      detail: 'subham@upi',
      status: 'Verified',
      isVerified: true,
      iconType: 'upi'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      detail: 'subham@gmail',
      status: 'Not Verified',
      isVerified: false,
      iconType: 'paypal'
    }
  ];

  const renderIcon = (type) => {
    switch (type) {
      case 'upi':
        return <UpiIcon className="w-5 h-5 shrink-0" />;
      case 'paypal':
        return <PaypalIcon className="w-5 h-5 shrink-0" />;
      case 'bank':
      default:
        return <BankTransferIcon className="w-5 h-5 text-slate-800 shrink-0" />;
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full">
      {/* 1. Payout Methods Card (Matching Reference UI) */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/95 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-3.5 group/card transition-all duration-300 hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#1a1446] font-extrabold text-[14px]">
            <Info className="w-4 h-4 text-indigo-500" />
            <span>Payout Methods</span>
          </div>
        </div>

        {/* Methods List */}
        <div className="space-y-2">
          {payoutMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => onSelectMethod?.(method)}
              className="flex items-center justify-between p-2.5 rounded-2xl border border-indigo-100/50 bg-white/70 hover:bg-white hover:border-indigo-200 hover:shadow-xs transition-all cursor-pointer group/item"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-center shrink-0 shadow-2xs group-hover/item:scale-105 transition-transform">
                  {renderIcon(method.iconType)}
                </div>

                <div className="min-w-0">
                  <div className="text-[12.5px] font-bold text-slate-800 leading-tight truncate group-hover/item:text-[#4f3bf3] transition-colors">
                    {method.name}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 truncate mt-0.5">
                    {method.detail}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {method.isVerified ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-600 border border-white/40 shadow-xs">
                    Verified
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-600 border border-white/40 shadow-xs">
                    Not Verified
                  </span>
                )}
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-slate-700 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Manage Payout Methods Button */}
        <button
          onClick={onManageMethods}
          className="w-full mt-0.5 py-2.5 px-3 bg-white/80 border border-indigo-200 text-[#4f3bf3] hover:bg-[#4f3bf3] hover:text-white rounded-xl text-[12.5px] font-bold transition-all shadow-2xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
        >
          <Settings className="w-3.5 h-3.5 text-inherit" />
          <span>Manage Payout Methods</span>
        </button>
      </div>

      {/* 2. Important Information Card */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/95 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-2.5 transition-all duration-300 hover:border-indigo-200">
        <div className="flex items-center gap-2 text-[#1a1446] font-extrabold text-[14px]">
          <Info className="w-4 h-4 text-indigo-500" />
          <span>Important Information</span>
        </div>

        <ul className="space-y-2 text-[12px] text-slate-600 font-medium pl-0.5">
          <li className="flex items-start gap-2 leading-snug">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
            <span>Minimum payout amount: ₹500.00</span>
          </li>
          <li className="flex items-start gap-2 leading-snug">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
            <span>Payouts are processed within 2-5 business days</span>
          </li>
          <li className="flex items-start gap-2 leading-snug">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
            <span>Ensure your payout method is verified</span>
          </li>
          <li className="flex items-start gap-2 leading-snug">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
            <span>You will receive an email notification once the payout is processed</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
