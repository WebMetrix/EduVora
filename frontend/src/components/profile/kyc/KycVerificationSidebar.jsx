import React from 'react';
import { ShieldCheck, CheckCircle2, Headset } from 'lucide-react';

export default function KycVerificationSidebar() {
  return (
    <div className="w-full shrink-0 flex flex-col gap-6 relative z-20">
      
      {/* KYC Status Box */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col w-full">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-[15px] font-bold text-[#1a1446]">KYC Status</h4>
        </div>
        
        <div className="inline-flex px-3.5 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-[13px] font-bold w-fit mb-5">
          In Progress
        </div>
        
        <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-6">
          Your KYC is under review.<br/>
          We will notify you once it's done.
        </p>

        <div className="h-px w-full bg-slate-100 mb-6" />

        <div>
          <span className="text-[12px] font-bold text-slate-900 block mb-1.5">Application ID</span>
          <span className="text-[13px] font-bold text-[#4f3bf3]">KYC-2025-0514-7842</span>
        </div>
      </div>

      {/* Why KYC is important Box */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col w-full">
        <h4 className="text-[15px] font-bold text-[#1a1446] mb-5">Why KYC is important?</h4>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span className="text-[13px] text-slate-700 font-medium">Secure your account</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span className="text-[13px] text-slate-700 font-medium">Increase withdrawal limit</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span className="text-[13px] text-slate-700 font-medium">Build trust in the community</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span className="text-[13px] text-slate-700 font-medium">Comply with legal regulations</span>
          </div>
        </div>
      </div>

      {/* Need Help Box */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4f3bf3]">
            <Headset className="w-5 h-5" />
          </div>
          <h4 className="text-[15px] font-bold text-[#1a1446]">Need Help?</h4>
        </div>
        <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-6">
          If you have any questions, our support team is here to help you.
        </p>
        <button className="w-fit px-6 py-2.5 border border-[#4f3bf3] text-[#4f3bf3] rounded-xl text-[13px] font-bold hover:bg-indigo-50 transition-colors self-start md:self-auto text-center">
          Contact Support
        </button>
      </div>

    </div>
  );
}
