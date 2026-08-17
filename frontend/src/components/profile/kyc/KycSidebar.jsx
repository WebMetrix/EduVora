import React from 'react';
import { ShieldCheck, CheckCircle2, Lightbulb, Info } from 'lucide-react';

export default function KycSidebar() {
  return (
    <div className="space-y-6">
      
      {/* Status Card */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-[15px] font-bold text-slate-800">KYC Status</h3>
        </div>
        
        <div className="mb-3">
          <h4 className="text-[20px] font-extrabold text-[#f97316] tracking-tight">Not Verified</h4>
        </div>
        
        <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
          Complete your KYC to start withdrawals and unlock all features.
        </p>
      </div>

      {/* Why KYC is important */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100">
        <h4 className="text-[15px] font-bold text-slate-800 mb-4">Why KYC is important?</h4>
        <ul className="space-y-3">
          {[
            'Secure your account',
            'Increase withdrawal limit',
            'Build trust in the community',
            'Comply with legal regulations'
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-[13px] font-semibold text-slate-600">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Guidelines */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="text-[15px] font-bold text-slate-800">Guidelines</h3>
        </div>
        <ul className="space-y-3">
          {[
            'All documents must be clear and readable',
            'Document should be original, not expired',
            'Name and DOB should match across all documents',
            'Supported formats: JPG, PNG, PDF',
            'Maximum file size: 5MB per document'
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2" />
              <span className="text-[12px] font-semibold text-slate-600 leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Info Note */}
      <div className="bg-[#f5f3ff] border border-indigo-100 rounded-2xl p-4 flex gap-3">
        <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <p className="text-[12px] font-semibold text-indigo-900/80 leading-relaxed">
          Your information is safe with us and used only for verification purposes.
        </p>
      </div>

    </div>
  );
}
