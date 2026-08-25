import React, { useState, useRef, useEffect } from 'react';
import { Check, User, FileText, ShieldCheck, Eye, Headset, Shield } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKycDetails } from '../../../redux/slices/kycSlice';
import { useNavigate, Link } from 'react-router-dom';

import KycPersonalInfoForm from './KycPersonalInfoForm';
import KycSidebar from './KycSidebar';
import KycDocumentUploadForm from './KycDocumentUploadForm';
import KycReviewSubmitForm from './KycReviewSubmitForm';
import KycVerificationStatus from './KycVerificationStatus';
import KycVerificationSidebar from './KycVerificationSidebar';

export default function KycVerificationContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const topRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    emailAddress: '',
    address: '',
    panNumber: '',
    identityProofType: 'Aadhar Card',
    identityProofNumber: '',
    identityProofFrontPath: null,
    identityProofBackPath: null,
    panCardPath: null
  });

  const { data: profileData } = useSelector((state) => state.profile || {});
  const { data: kycData, status: kycStatus } = useSelector((state) => state.kyc || {});

  useEffect(() => {
    if (kycStatus === 'idle') {
      dispatch(fetchKycDetails());
    }
  }, [dispatch, kycStatus]);

  useEffect(() => {
    if (profileData) {
      let dob = '';
      if (profileData.DateOfBirth) {
        const d = new Date(profileData.DateOfBirth);
        if (!isNaN(d.getTime())) {
          dob = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
        }
      }
      
      const addressStr = [
        profileData.AddressLine1, 
        profileData.CityName || profileData.City, 
        profileData.StateName || profileData.State, 
        profileData.Country
      ].filter(Boolean).join(', ');

      setFormData(prev => ({
        ...prev,
        fullName: profileData.FullName || '',
        dateOfBirth: dob,
        gender: profileData.Gender || '',
        mobileNumber: profileData.MobileNumber || profileData.PrimaryMobile || '',
        emailAddress: profileData.EmailAddress || '',
        address: addressStr
      }));
    }

    if (kycData) {
      setFormData(prev => ({
        ...prev,
        panNumber: kycData.PanNumber || '',
        identityProofType: kycData.IdentityProofType || 'Aadhar Card',
        identityProofNumber: kycData.IdentityProofNumber || '',
      }));
      
      // Auto redirect to step 4 if KYC is already submitted and not rejected
      if (kycData.KYCStatusId && kycData.KYCStatusId !== 3 && step === 1) {
          setStep(4);
      }
    }
  }, [profileData, kycData]);

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

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
        <div className="flex-1 min-w-0 flex flex-col gap-6">
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
            <KycPersonalInfoForm 
              formData={formData} 
              updateFormData={updateFormData}
              onNext={() => { setStep(2); scrollToTop(); }} 
            />
          )}
          {step === 2 && (
            <KycDocumentUploadForm 
              formData={formData} 
              updateFormData={updateFormData}
              onNext={() => { setStep(3); scrollToTop(); }}
              onPrev={() => { setStep(1); scrollToTop(); }}
            />
          )}
          {step === 3 && (
            <KycReviewSubmitForm 
              formData={formData}
              onPrev={() => { setStep(2); scrollToTop(); }}
              onEditStep={(s) => { setStep(s); scrollToTop(); }}
              onSubmit={() => { setStep(4); scrollToTop(); }}
            />
          )}
          {step === 4 && <KycVerificationStatus kycData={kycData} onEdit={() => { setStep(1); scrollToTop(); }} />}

          {/* Safe Info Card (Desktop) */}
          {step !== 4 && (
            <div className="hidden xl:flex bg-linear-to-r from-indigo-50/70 to-purple-50/70 backdrop-blur-xl border border-indigo-100/50 rounded-2xl p-5 items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm border border-indigo-200/50">
                  <Shield className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                  <h4 className="text-[13px] font-bold text-slate-900 leading-tight mb-1">Your information is safe with us.</h4>
                  <p className="text-[12px] text-slate-500 font-medium break-words whitespace-normal">It is used securely and strictly for verification purposes only.</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
           {step !== 4 ? <KycSidebar /> : <KycVerificationSidebar />}
           
           {/* Safe Info Card (Mobile) */}
           {step !== 4 && (
             <div className="flex xl:hidden bg-linear-to-r from-indigo-50/70 to-purple-50/70 backdrop-blur-xl border border-indigo-100/50 rounded-2xl p-5 items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50">
               <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm border border-indigo-200/50">
                   <Shield className="w-5 h-5" />
               </div>
               <div className="flex flex-col min-w-0">
                   <h4 className="text-[13px] font-bold text-slate-900 leading-tight mb-1">Your information is safe with us.</h4>
                   <p className="text-[12px] text-slate-500 font-medium break-words whitespace-normal">It is used securely and strictly for verification purposes only.</p>
               </div>
             </div>
           )}
        </div>

      </div>

    </div>
  );
}
