import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Info, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { BankTransferIcon, UpiIcon, PaypalIcon } from './PayoutIcons';

const PAYOUT_METHODS = [
  {
    id: 'bank',
    name: 'Bank Transfer',
    desc: 'Transfer to your registered bank account',
    detail: '•••• 1234',
    accountDisplay: '**** 1234',
    status: 'Verified',
    isVerified: true,
    iconType: 'bank'
  },
  {
    id: 'upi',
    name: 'UPI',
    desc: 'Transfer to your UPI ID',
    detail: 'subham@upi',
    accountDisplay: 'subham@upi',
    status: 'Verified',
    isVerified: true,
    iconType: 'upi'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    desc: 'Transfer to your PayPal account',
    detail: 'subham@gmail.com',
    accountDisplay: 'subham@gmail.com',
    status: 'Not Verified',
    isVerified: false,
    iconType: 'paypal'
  }
];

export default function RequestPayoutModal({
  isOpen,
  onClose,
  availableBalance = 2630.00,
  minPayout = 500.00,
  onSubmit
}) {
  const [amount, setAmount] = useState('');
  const [selectedMethodId, setSelectedMethodId] = useState('bank');
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize amount with available balance when opened
  useEffect(() => {
    if (isOpen) {
      setAmount(String(availableBalance));
      setRemarks('');
      setSelectedMethodId('bank');
    }
  }, [isOpen, availableBalance]);

  // Prevent scroll when modal is open and handle layout shift
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedMethod = PAYOUT_METHODS.find((m) => m.id === selectedMethodId) || PAYOUT_METHODS[0];
  const numAmount = parseFloat(amount) || 0;

  const handleMaxClick = () => {
    setAmount(String(availableBalance));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!numAmount || isNaN(numAmount)) {
      toast.error('Please enter a valid payout amount');
      return;
    }

    if (numAmount < minPayout) {
      toast.error(`Minimum payout amount is ₹${minPayout.toFixed(2)}`);
      return;
    }

    if (numAmount > availableBalance) {
      toast.error('Amount exceeds your available balance');
      return;
    }

    if (!selectedMethod.isVerified) {
      toast.warning('Selected payout method is not verified. Please select a verified method.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit({
          amount: numAmount,
          method: selectedMethod.id,
          methodName: selectedMethod.name,
          remarks: remarks.trim() || 'Payout request'
        });
      }
      onClose();
    } catch (err) {
      toast.error(err?.message || 'Failed to submit payout request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderMethodIcon = (iconType) => {
    switch (iconType) {
      case 'upi':
        return <UpiIcon className="w-5 h-5 shrink-0" />;
      case 'paypal':
        return <PaypalIcon className="w-5 h-5 shrink-0" />;
      case 'bank':
      default:
        return <BankTransferIcon className="w-5 h-5 text-indigo-700 shrink-0" />;
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      {/* Modal Dialog Container */}
      <div className="w-full h-[92vh] md:h-auto md:max-h-[90vh] md:max-w-4xl bg-white rounded-t-3xl md:rounded-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 overflow-hidden animate-slide-up md:animate-fade-in">

        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="flex items-start justify-between px-5 md:px-7 pt-3.5 pb-2 md:pt-4 md:pb-2.5 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-[19px] md:text-[21px] font-black text-[#1a1446] tracking-tight leading-tight">
              Request Payout
            </h2>
            <p className="text-[12px] md:text-[12.5px] text-slate-500 font-medium mt-0.5">
              Submit a payout request to transfer your available balance to your preferred method.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 -mr-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer -mt-0.5"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content: 2 Columns on Desktop, 1 Column on Mobile */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar px-5 md:px-7 pt-3 md:pt-3.5 pb-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-7">

            {/* Left Column (7 cols): Amount, Method, Remarks */}
            <div className="md:col-span-7 flex flex-col gap-5">

              {/* 1. Payout Amount Section */}
              <div>
                <h3 className="text-[13.5px] font-extrabold text-[#1a1446] mb-2.5">
                  1. Payout Amount
                </h3>

                {/* Available Balance Box */}
                <div className="bg-slate-50/90 border border-slate-100 rounded-xl px-4 py-2.5 flex items-center justify-between shadow-2xs">
                  <span className="text-[12.5px] font-bold text-slate-700">Available Balance</span>
                  <span className="text-[14.5px] font-black text-slate-900 tracking-tight">
                    ₹ {Number(availableBalance).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Amount Input with Max button */}
                <div className="mt-3">
                  <label className="text-[12.5px] font-bold text-slate-700 block mb-1.5">
                    Enter Payout Amount <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600 font-black text-[14px]">
                        ₹
                      </div>
                      <input
                        type="number"
                        step="any"
                        min="1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-8 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-[13.5px] font-bold text-slate-900 focus:outline-none focus:border-[#4f3bf3] focus:ring-2 focus:ring-[#4f3bf3]/15 transition-all shadow-2xs placeholder:text-slate-300"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleMaxClick}
                      className="px-4 py-2.5 bg-indigo-50/70 hover:bg-indigo-100 text-[#4f3bf3] font-bold text-[12.5px] rounded-xl border border-indigo-200/70 transition-all cursor-pointer active:scale-95 shrink-0"
                    >
                      Max
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium mt-1.5">
                    Minimum payout amount is ₹{Number(minPayout).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* 2. Select Payout Method Section */}
              <div>
                <h3 className="text-[13.5px] font-extrabold text-[#1a1446] mb-2.5">
                  2. Select Payout Method
                </h3>

                <div className="space-y-2.5">
                  {PAYOUT_METHODS.map((method) => {
                    const isSelected = selectedMethodId === method.id;

                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedMethodId(method.id)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${isSelected
                          ? 'border-[#4f3bf3] bg-indigo-50/20 shadow-xs ring-1 ring-[#4f3bf3]/30'
                          : 'border-slate-200/80 bg-white hover:border-slate-300'
                          }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Radio Circle Indicator */}
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-[#4f3bf3]' : 'border-slate-300'
                              }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-[#4f3bf3]" />}
                          </div>

                          {/* Method Icon Box */}
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-center shrink-0 shadow-2xs">
                            {renderMethodIcon(method.iconType)}
                          </div>

                          {/* Text info */}
                          <div className="min-w-0">
                            <div className="text-[13px] font-bold text-slate-900 leading-tight">
                              {method.name}
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5 truncate">
                              {method.desc}
                            </div>
                            <div className="text-[11px] font-semibold text-slate-600 mt-0.5 font-mono">
                              {method.accountDisplay}
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="shrink-0 pl-2">
                          {method.isVerified ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/70 shadow-2xs">
                              Verified
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-blue-50 text-blue-600 border border-blue-200/70 shadow-2xs">
                              Not Verified
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Remarks (Optional) Section */}
              <div>
                <h3 className="text-[13.5px] font-extrabold text-[#1a1446] mb-2">
                  3. Remarks (Optional)
                </h3>
                <div className="relative">
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value.slice(0, 200))}
                    placeholder="Add any additional notes for your request..."
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl text-[12.5px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#4f3bf3] focus:ring-2 focus:ring-[#4f3bf3]/15 resize-none h-20 transition-all"
                  />
                  <div className="text-[11px] font-medium text-slate-400 text-right mt-1">
                    {remarks.length}/200
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (5 cols): Payout Summary & Important Information */}
            <div className="md:col-span-5 flex flex-col gap-4">

              {/* Card 1: Payout Summary */}
              <div className="bg-indigo-50/30 border border-indigo-100/70 rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 shadow-2xs">
                {/* Header */}
                <div className="flex items-center gap-2 text-[#1a1446] font-extrabold text-[13.5px]">
                  <div className="w-6 h-6 rounded-lg bg-indigo-100/80 flex items-center justify-center text-[#4f3bf3] shrink-0">
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                  </div>
                  <span>Payout Summary</span>
                </div>

                {/* Summary Key-Value List */}
                <div className="space-y-2.5 text-[12.5px] border-t border-indigo-100/60 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Requested Amount</span>
                    <span className="font-black text-slate-900 text-[13.5px]">
                      ₹ {numAmount > 0 ? numAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Payout Method</span>
                    <span className="font-bold text-slate-800">{selectedMethod.name}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Account</span>
                    <span className="font-bold text-slate-800 font-mono text-[11.5px]">{selectedMethod.accountDisplay}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Processing Time</span>
                    <span className="font-bold text-slate-800 text-[12px]">2 - 5 business days</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Important Information */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col gap-2.5 shadow-2xs">
                <div className="flex items-center gap-2 text-[#1a1446] font-extrabold text-[13.5px]">
                  <Info className="w-4 h-4 text-[#4f3bf3]" />
                  <span>Important Information</span>
                </div>

                <ul className="space-y-2 text-[11.5px] text-slate-600 font-medium pl-0.5">
                  <li className="flex items-start gap-2 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    <span>Minimum payout amount: ₹500.00</span>
                  </li>
                  <li className="flex items-start gap-2 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    <span>Payouts are processed within 2-5 business days.</span>
                  </li>
                  <li className="flex items-start gap-2 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    <span>Ensure your selected payout method is verified.</span>
                  </li>
                  <li className="flex items-start gap-2 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    <span>You will receive an email notification once the payout is processed.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </form>

        {/* Modal Sticky Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-5 md:px-7 py-3.5 border-t border-slate-100 bg-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-[13px] transition-all cursor-pointer active:scale-95"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-[#4f3bf3] hover:bg-indigo-700 text-white font-bold text-[13px] shadow-md shadow-indigo-600/20 hover:shadow-lg transition-all cursor-pointer active:scale-95 flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
