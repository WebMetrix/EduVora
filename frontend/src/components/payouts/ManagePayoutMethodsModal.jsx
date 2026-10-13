import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Landmark, CheckCircle2, ShieldCheck, ChevronRight, AlertCircle, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { BankTransferIcon, UpiIcon, PaypalIcon } from './PayoutIcons';

export default function ManagePayoutMethodsModal({ isOpen, onClose }) {
  const [methods, setMethods] = useState([
    {
      id: 'bank-1',
      type: 'bank',
      title: 'HDFC Bank Account',
      detail: '•••• 1234',
      isPrimary: true,
      isVerified: true
    },
    {
      id: 'upi-1',
      type: 'upi',
      title: 'UPI Virtual Payment Address',
      detail: 'subham@upi',
      isPrimary: false,
      isVerified: true
    },
    {
      id: 'paypal-1',
      type: 'paypal',
      title: 'PayPal Account',
      detail: 'subham@gmail',
      isPrimary: false,
      isVerified: false
    }
  ]);

  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'add'
  const [newMethodType, setNewMethodType] = useState('upi');
  const [upiInput, setUpiInput] = useState('');
  const [bankAccNumber, setBankAccNumber] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');
  const [bankHolder, setBankHolder] = useState('');

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

  const handleSetPrimary = (id) => {
    setMethods(methods.map(m => ({ ...m, isPrimary: m.id === id })));
    toast.success('Primary payout method updated!');
  };

  const handleVerify = (id) => {
    setMethods(methods.map(m => m.id === id ? { ...m, isVerified: true } : m));
    toast.success('Verification initiated! Method verified.');
  };

  const handleAddNewMethod = (e) => {
    e.preventDefault();
    if (newMethodType === 'upi') {
      if (!upiInput.includes('@')) {
        toast.error('Please enter a valid UPI ID (e.g. yourname@okaxis)');
        return;
      }
      const newMethod = {
        id: `upi-${Date.now()}`,
        type: 'upi',
        title: 'UPI ID',
        detail: upiInput,
        isPrimary: false,
        isVerified: true
      };
      setMethods([...methods, newMethod]);
      toast.success('UPI ID added successfully!');
      setUpiInput('');
      setActiveTab('list');
    } else {
      if (!bankAccNumber || !bankIfsc || !bankHolder) {
        toast.error('Please fill in all bank details');
        return;
      }
      const newMethod = {
        id: `bank-${Date.now()}`,
        type: 'bank',
        title: `${bankHolder} (Bank)`,
        detail: `•••• ${bankAccNumber.slice(-4)}`,
        isPrimary: false,
        isVerified: true
      };
      setMethods([...methods, newMethod]);
      toast.success('Bank Account linked successfully!');
      setBankAccNumber('');
      setBankIfsc('');
      setBankHolder('');
      setActiveTab('list');
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'upi': return <UpiIcon className="w-5 h-5 shrink-0" />;
      case 'paypal': return <PaypalIcon className="w-5 h-5 shrink-0" />;
      default: return <BankTransferIcon className="w-5 h-5 text-slate-800 shrink-0" />;
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="w-full h-auto max-h-[90vh] md:max-w-[560px] bg-white rounded-t-3xl md:rounded-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 overflow-hidden animate-slide-up md:animate-fade-in">
        
        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-[18px] md:text-[20px] font-extrabold text-[#1a1446]">Payout Methods</h2>
            <p className="text-[12.5px] text-slate-500 font-medium mt-0.5">Manage and verify your bank accounts and payment handles</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch inside modal */}
        <div className="px-6 pt-3 shrink-0 flex items-center gap-2 border-b border-slate-100">
          <button
            onClick={() => setActiveTab('list')}
            className={`pb-2.5 text-[13px] font-bold border-b-2 transition-all ${
              activeTab === 'list'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Connected Methods ({methods.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-2.5 text-[13px] font-bold border-b-2 transition-all flex items-center gap-1 ${
              activeTab === 'add'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Method
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
          {activeTab === 'list' ? (
            <div className="space-y-3">
              {methods.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-3 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                        {renderIcon(item.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[13.5px] font-bold text-slate-900">{item.title}</span>
                          {item.isPrimary && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                              Primary
                            </span>
                          )}
                        </div>
                        <span className="text-[12px] font-semibold text-slate-500">{item.detail}</span>
                      </div>
                    </div>

                    <div>
                      {item.isVerified ? (
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                          Verified
                        </span>
                      ) : (
                        <button
                          onClick={() => handleVerify(item.id)}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-sky-50 text-sky-600 border border-sky-200/60 hover:bg-sky-100 transition-colors"
                        >
                          Verify Now
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[12px]">
                    <span className="text-slate-400">
                      {item.isPrimary ? 'Default for withdrawals' : 'Secondary payout method'}
                    </span>
                    {!item.isPrimary && (
                      <button
                        onClick={() => handleSetPrimary(item.id)}
                        className="font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        Set as Primary
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleAddNewMethod} className="space-y-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setNewMethodType('upi')}
                  className={`flex-1 py-2.5 rounded-xl border text-[13px] font-bold flex items-center justify-center gap-2 transition-all ${
                    newMethodType === 'upi'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <UpiIcon className="w-4 h-4" />
                  UPI Handle
                </button>
                <button
                  type="button"
                  onClick={() => setNewMethodType('bank')}
                  className={`flex-1 py-2.5 rounded-xl border text-[13px] font-bold flex items-center justify-center gap-2 transition-all ${
                    newMethodType === 'bank'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <BankTransferIcon className="w-4 h-4 text-slate-700" />
                  Bank Account
                </button>
              </div>

              {newMethodType === 'upi' ? (
                <div className="space-y-1.5">
                  <label className="text-[12.5px] font-bold text-slate-700">UPI ID / VPA</label>
                  <input
                    type="text"
                    placeholder="e.g. mobile@upi or username@okhdfcbank"
                    value={upiInput}
                    onChange={(e) => setUpiInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13.5px] font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                  />
                  <p className="text-[11px] text-slate-400">Instant deposits are supported for all registered UPI handles.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[12.5px] font-bold text-slate-700">Account Holder Name</label>
                    <input
                      type="text"
                      placeholder="Name as per bank records"
                      value={bankHolder}
                      onChange={(e) => setBankHolder(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-[13.5px] font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12.5px] font-bold text-slate-700">Bank Account Number</label>
                    <input
                      type="text"
                      placeholder="Account number"
                      value={bankAccNumber}
                      onChange={(e) => setBankAccNumber(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-[13.5px] font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12.5px] font-bold text-slate-700">IFSC Code</label>
                    <input
                      type="text"
                      placeholder="e.g. HDFC0001234"
                      value={bankIfsc}
                      onChange={(e) => setBankIfsc(e.target.value.toUpperCase())}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-[13.5px] font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#4f3bf3] text-white text-[13.5px] font-bold hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all mt-2"
              >
                Save Payout Method
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 flex justify-end shrink-0 bg-white">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-slate-200 text-slate-700 text-[13px] font-bold hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
