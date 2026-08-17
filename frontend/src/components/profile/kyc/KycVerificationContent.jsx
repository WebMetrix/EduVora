import React, { useState, useRef } from 'react';
import { Check, User, FileText, ShieldCheck, Eye, Headset } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { useNavigate, Link } from 'react-router-dom';

import KycPersonalInfoForm from './KycPersonalInfoForm';
import KycSidebar from './KycSidebar';

// Placeholders for steps 2-4
const KycDocumentUploadForm = () => <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-center text-slate-500 font-medium h-[400px] flex items-center justify-center">Document Upload Form (Coming Soon)</div>;
const KycReviewSubmitForm = () => <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-center text-slate-500 font-medium h-[400px] flex items-center justify-center">Review & Submit Form (Coming Soon)</div>;
const KycVerificationStatus = () => <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-center text-slate-500 font-medium h-[400px] flex items-center justify-center">Verification Status (Coming Soon)</div>;

export default function KycVerificationContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const topRef = useRef(null);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const stepsList = [
    { num: 1, title: 'Personal Details', subtitle: 'Add your basic information', icon: User },
    { num: 2, title: 'Document Upload', subtitle: 'Upload required documents', icon: FileText },
    { num: 3, title: 'Review & Submit', subtitle: 'Review and confirm details', icon: ShieldCheck },
    { num: 4, title: 'Verification', subtitle: 'Get verified and start earning', icon: Eye }
  ];

  return (
    <div ref={topRef} className="w-full max-w-[1400px] mx-auto pb-10">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-[13px] font-semibold text-slate-500 mb-6 gap-2 px-2">
        <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
        <span>›</span>
        <Link to="/profile" className="hover:text-indigo-600 transition-colors">Profile</Link>
        <span>›</span>
        <span className="text-slate-900">KYC Verification</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 mb-6 px-2 lg:px-0 text-center md:text-left">
        <div>
          <h2 className="text-[24px] md:text-[28px] font-extrabold text-[#1a1446] mb-2 tracking-tight">KYC Verification</h2>
          <p className="text-[14px] text-slate-500 leading-relaxed font-medium">Complete your KYC verification to enable withdrawals and access all platform features.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-[13px] font-bold text-indigo-600 hover:bg-indigo-50 transition-all shrink-0 mt-2 md:mt-0">
          <Headset className="w-4 h-4" />
          Need Help?
        </button>
      </div>

      {/* Main Grid: Form on Left, Sidebar on Right */}
      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* Left Column (Main Form Area) */}
        <div className="flex-1 min-w-0">
          {/* Stepper Wrapper */}
          <div className="flex w-full mt-2 mb-8">
            <div className="w-full mx-auto relative z-10 flex items-center justify-between">
              {stepsList.map((stepItem, index) => {
                const isCompleted = step > stepItem.num;
                const isActive = step === stepItem.num;
                
                return (
                  <React.Fragment key={stepItem.num}>
                    <div className="relative z-10 flex items-center gap-2">
                      <div className={`w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center text-[14px] font-bold transition-all relative ${isCompleted ? 'bg-[#4f3bf3] text-white shadow-[0_4px_12px_rgba(79,59,243,0.3)] border-2 border-[#4f3bf3]' :
                        isActive ? 'bg-white text-[#4f3bf3] border-2 border-[#4f3bf3] shadow-sm ring-4 ring-indigo-50/80' :
                          'bg-white text-slate-400 border-2 border-slate-200 shadow-sm'
                        }`}>
                        {isCompleted ? <Check className="w-5 h-5" strokeWidth={3} /> : stepItem.num}
                      </div>

                      {/* Desktop Text */}
                      <div className="hidden lg:flex flex-col min-w-0 max-w-[110px] xl:max-w-[130px]">
                        <span className={`text-[13px] 2xl:text-[14px] font-bold leading-snug truncate ${isCompleted ? 'text-[#4f3bf3]' : isActive ? 'text-slate-900' : 'text-slate-400'}`} style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                          {stepItem.title}
                        </span>
                        <span className={`text-[11px] xl:text-[12px] 2xl:text-[12px] text-slate-500 font-medium leading-snug mt-0.5 truncate`} style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                          {stepItem.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* SVG Dashed Line (only between items) */}
                    {index < 3 && (
                      <div className="flex-1 h-[2px] mx-1 md:mx-3 lg:mx-4 flex items-center min-w-[12px] md:min-w-[24px]">
                        <svg width="100%" height="2" preserveAspectRatio="none">
                          <line x1="0" y1="1" x2="100%" y2="1" stroke={isCompleted ? "#4f3bf3" : "#cbd5e1"} strokeWidth="2" strokeDasharray="6 4" opacity={isCompleted ? "1" : "0.5"} />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          {step === 1 && (
            <KycPersonalInfoForm onNext={() => {
              setStep(2);
              scrollToTop();
            }} />
          )}
          {step === 2 && <KycDocumentUploadForm />}
          {step === 3 && <KycReviewSubmitForm />}
          {step === 4 && <KycVerificationStatus />}
        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-full xl:w-[320px] shrink-0">
           <KycSidebar />
        </div>

      </div>

    </div>
  );
}
