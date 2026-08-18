import React, { useState } from 'react';
import { 
  FileText, User, Edit2, CheckCircle2, 
  IdCard, CreditCard, ArrowLeft, ArrowRight
} from 'lucide-react';

export default function KycReviewSubmitForm({ onPrev, onEditStep, onSubmit }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col w-full relative z-20">
      
      {/* Main Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex shrink-0 items-center justify-center text-[#4f3bf3]">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-[17px] font-bold text-[#1a1446] mb-0.5">
            Review Your Information
          </h3>
          <p className="text-[13px] text-slate-500 font-medium">
            Please review all your details below before submitting. Make sure all information is correct.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        
        {/* Section 1: Personal Details */}
        <div className="border-t border-slate-100 pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50/80 flex items-center justify-center text-[#4f3bf3]">
                <User className="w-4 h-4" />
              </div>
              <h4 className="text-[15px] font-bold text-[#1a1446]">1. Personal Details</h4>
            </div>
            <button 
              onClick={() => onEditStep(1)}
              className="flex items-center gap-1.5 px-4 py-2 border border-[#4f3bf3] text-[#4f3bf3] rounded-xl text-[12px] font-bold hover:bg-indigo-50 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>
          
          <div className="flex flex-col px-2 md:px-14">
            <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100">
              <span className="text-[14px] text-slate-500 font-medium w-full sm:w-[250px] shrink-0 mb-1 sm:mb-0">Full Name</span>
              <span className="text-[14px] font-bold text-slate-900">Subham Chakraborty</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100">
              <span className="text-[14px] text-slate-500 font-medium w-full sm:w-[250px] shrink-0 mb-1 sm:mb-0">Date of Birth</span>
              <span className="text-[14px] font-bold text-slate-900">15/10/2000</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100">
              <span className="text-[14px] text-slate-500 font-medium w-full sm:w-[250px] shrink-0 mb-1 sm:mb-0">Gender</span>
              <span className="text-[14px] font-bold text-slate-900">Male</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100">
              <span className="text-[14px] text-slate-500 font-medium w-full sm:w-[250px] shrink-0 mb-1 sm:mb-0">Mobile Number</span>
              <span className="text-[14px] font-bold text-slate-900">+91 98765 43210</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100">
              <span className="text-[14px] text-slate-500 font-medium w-full sm:w-[250px] shrink-0 mb-1 sm:mb-0">Email Address</span>
              <span className="text-[14px] font-bold text-slate-900">subham@email.com</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100">
              <span className="text-[14px] text-slate-500 font-medium w-full sm:w-[250px] shrink-0 mb-1 sm:mb-0">PAN Number</span>
              <span className="text-[14px] font-bold text-slate-900">ABCDE1234F</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start py-4">
              <span className="text-[14px] text-slate-500 font-medium w-full sm:w-[250px] shrink-0 mb-1 sm:mb-0 mt-0.5">Address</span>
              <span className="text-[14px] font-bold text-slate-900 leading-relaxed">Kolkata, West Bengal, India</span>
            </div>
          </div>
        </div>

        {/* Section 2: Uploaded Documents */}
        <div className="border-t border-slate-100 pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50/80 flex items-center justify-center text-[#4f3bf3]">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="text-[15px] font-bold text-[#1a1446]">2. Uploaded Documents</h4>
            </div>
            <button 
              onClick={() => onEditStep(2)}
              className="flex items-center gap-1.5 px-4 py-2 border border-[#4f3bf3] text-[#4f3bf3] rounded-xl text-[12px] font-bold hover:bg-indigo-50 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>

          <div className="flex flex-col gap-4 px-2 md:px-14">
            
            {/* Identity Proof */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#f8fafc]/50 border border-slate-100 rounded-2xl gap-4">
              <div className="flex items-center gap-4 w-full sm:w-[220px] shrink-0">
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                  <IdCard className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-[14px] font-bold text-[#1a1446]">Identity Proof</h5>
                  <p className="text-[12px] text-slate-500 font-medium mt-0.5">Aadhar Card</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-16 w-full">
                <div>
                  <span className="text-[11px] font-bold text-slate-900 block mb-1.5">Front Side</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-[13px] font-medium text-slate-600">Aadhaar_Front.jpg</span>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-900 block mb-1.5">Back Side</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-[13px] font-medium text-slate-600">Aadhaar_Back.jpg</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full sm:w-auto flex justify-end">
                <button onClick={() => onEditStep(2)} className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-indigo-600 rounded-xl text-[12px] font-bold hover:bg-slate-50 transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
              </div>
            </div>

            {/* PAN Card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#f8fafc]/50 border border-slate-100 rounded-2xl gap-4">
              <div className="flex items-center gap-4 w-full sm:w-[220px] shrink-0">
                <div className="w-11 h-11 rounded-xl bg-[#e0f2fe]/60 flex items-center justify-center text-[#0ea5e9] shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-[14px] font-bold text-[#1a1446]">PAN Card</h5>
                  <p className="text-[12px] text-slate-500 font-medium mt-0.5">PAN Card</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-16 w-full">
                <div>
                  <span className="text-[11px] font-bold text-slate-900 block mb-1.5">Front Side</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-[13px] font-medium text-slate-600">PAN_Card.jpg</span>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-auto flex justify-end">
                <button onClick={() => onEditStep(2)} className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-indigo-600 rounded-xl text-[12px] font-bold hover:bg-slate-50 transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Declaration Checkbox */}
        <div className="bg-[#f5f3ff]/60 rounded-2xl p-4 md:p-5 flex items-start gap-3 mt-6">
          <div className="pt-0.5 shrink-0">
            <input 
              type="checkbox" 
              id="declaration" 
              className="w-4 h-4 rounded text-[#4f3bf3] focus:ring-[#4f3bf3] border-indigo-200 cursor-pointer"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
          </div>
          <label htmlFor="declaration" className="cursor-pointer select-none">
            <p className="text-[13px] font-bold text-[#1a1446] mb-1">
              I hereby declare that the information provided above is true and correct to the best of my knowledge.
            </p>
            <p className="text-[12px] text-[#1a1446] font-medium leading-relaxed">
              I understand that any false information may lead to rejection of my KYC and restriction of my account.
            </p>
          </label>
        </div>

      </div>

      {/* Footer / Buttons */}
      <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <button 
          onClick={onPrev}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-600 border border-slate-200 px-6 py-3.5 rounded-xl font-bold text-[14px] hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button 
          onClick={onSubmit}
          disabled={!isChecked}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#4f3bf3] text-white px-8 py-3.5 rounded-xl font-bold text-[14px] hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"
        >
          Submit for Verification
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
