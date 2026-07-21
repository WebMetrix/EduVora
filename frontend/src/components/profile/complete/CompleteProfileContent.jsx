import React, { useState, useRef, useEffect } from 'react';
import { Check, Phone, User, MapPin, Landmark, ClipboardCheck } from 'lucide-react';
import SafeInfoCard from '../SafeInfoCard';
import { useTranslation } from '../../../hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import api from '../../../https/axios';

import PersonalInfoForm from './PersonalInfoForm';
import ContactInfoForm from './ContactInfoForm';
import AddressInfoForm from './AddressInfoForm';
import BankInfoForm from './BankInfoForm';
import ReviewConfirmForm from './ReviewConfirmForm';

export default function CompleteProfileContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const topRef = useRef(null);

  // Centralized form state
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    username: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    nationality: '',

    // Contact Info
    emailAddress: '',
    mobileNumber: '',
    altMobileNumber: '',
    whatsAppNumber: '',
    emergencyContactName: '',
    emergencyContactNumber: '',

    // Address Info
    addressLine1: '',
    addressLine2: '',
    country: '',
    state: '',
    city: '',
    pincode: '',

    // Bank Info
    accountHolderName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    bankName: '',
    branchName: '',
    ifscCode: '',
    accountType: '',
    additionalBankNotes: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        const data = response.data;
        
        let dob = '';
        if (data.DateOfBirth) {
            const d = new Date(data.DateOfBirth);
            if (!isNaN(d.getTime())) {
                dob = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
            }
        }

        setFormData({
            fullName: data.FullName || '',
            username: data.Username || '',
            dateOfBirth: dob,
            gender: data.Gender || '',
            maritalStatus: data.MaritalStatus || '',
            nationality: data.Nationality || '',
            emailAddress: data.EmailAddress || '',
            mobileNumber: data.MobileNumber || data.PrimaryMobile || data.ContactMobile || '',
            altMobileNumber: data.AltMobileNumber || '',
            whatsAppNumber: data.WhatsAppNumber || '',
            emergencyContactName: data.EmergencyContactName || '',
            emergencyContactNumber: data.EmergencyContactNumber || '',
            addressLine1: data.AddressLine1 || '',
            addressLine2: data.AddressLine2 || '',
            country: data.Country || '',
            state: data.State || '',
            city: data.City || '',
            pincode: data.Pincode || '',
            accountHolderName: data.AccountHolderName || '',
            accountNumber: data.AccountNumber || '',
            confirmAccountNumber: data.AccountNumber || '',
            bankName: data.BankName || '',
            branchName: data.BranchName || '',
            ifscCode: data.IFSCCode || '',
            accountType: data.AccountType || '',
            additionalBankNotes: ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

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
    { num: 1, title: t('completeProfile.personalInfo'), subtitle: 'Add your personal details' },
    { num: 2, title: 'Contact Info', subtitle: 'Add contact details' },
    { num: 3, title: 'Address Info', subtitle: 'Add address details' },
    { num: 4, title: 'Bank Info', subtitle: 'Add bank details' },
    { num: 5, title: t('completeProfile.reviewConfirmTitle'), subtitle: 'Review your details' }
  ];

  return (
    <div ref={topRef} className="w-full max-w-[600px] lg:max-w-[1024px] mx-auto mt-4 mb-8 pt-4">

      {/* Header */}
      <div className="mb-6 px-2 text-center md:text-left">
        <h2 className="text-[24px] md:text-[28px] font-extrabold text-[#1a1446] mb-2 tracking-tight">{t('completeProfile.title')}</h2>
        <p className="text-[14px] text-slate-500 leading-relaxed font-medium">{t('completeProfile.subtitle')}</p>
      </div>

      {/* Stepper with precise in-between SVG Lines */}
      <div className="flex w-full justify-center mt-6 px-2 lg:px-0">
        <div className="flex w-full max-w-[480px] lg:max-w-full items-center justify-between">
          {stepsList.map((stepItem, index) => {
            const isCompleted = step > stepItem.num;
            const isActive = step === stepItem.num;

            return (
              <React.Fragment key={stepItem.num}>
                {/* Step Item (Circle + Optional Text on Desktop) */}
                <div className="relative z-10 shrink-0 flex items-center gap-3">
                  <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[14px] font-bold transition-all relative ${isCompleted ? 'bg-[#4f3bf3] text-white shadow-[0_4px_12px_rgba(79,59,243,0.3)] border-2 border-[#4f3bf3]' :
                    isActive ? 'bg-white text-[#4f3bf3] border-2 border-[#4f3bf3] shadow-sm ring-4 ring-indigo-50/80' :
                      'bg-white text-slate-400 border-2 border-slate-200 shadow-sm'
                    }`}>
                    {isCompleted ? <Check className="w-5 h-5" strokeWidth={3} /> : stepItem.num}
                  </div>

                  {/* Desktop Text */}
                  <div className="hidden lg:flex flex-col">
                    <span className={`text-[13px] xl:text-[14px] font-bold ${isCompleted ? 'text-[#4f3bf3]' : isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                      {stepItem.title}
                    </span>
                    <span className="text-[12px] text-slate-500 font-medium">
                      {stepItem.subtitle}
                    </span>
                  </div>
                </div>

                {/* SVG Dashed Line (only between items) */}
                {index < 4 && (
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

      {/* Guaranteed Spacer */}
      <div className="h-10 md:h-12 w-full"></div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col w-full relative z-20">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-[#4f3bf3]">
            {step === 1 && <User className="w-4 h-4" />}
            {step === 2 && <Phone className="w-4 h-4" />}
            {step === 3 && <MapPin className="w-4 h-4" />}
            {step === 4 && <Landmark className="w-4 h-4" />}
            {step === 5 && <ClipboardCheck className="w-4 h-4" />}
          </div>
          <h3 className="text-[17px] font-bold text-[#1a1446]">
            {step === 1 && t('completeProfile.personalInfo')}
            {step === 2 && t('completeProfile.contactInfoTitle')}
            {step === 3 && t('completeProfile.addressInfoTitle')}
            {step === 4 && t('completeProfile.bankInfoTitle')}
            {step === 5 && t('completeProfile.reviewConfirmTitle')}
          </h3>
        </div>

        {/* STEP 1: Personal Information */}
        {step === 1 && (
          <PersonalInfoForm
            t={t}
            formData={formData}
            updateFormData={updateFormData}
            onNext={() => {
              setStep(2);
              scrollToTop();
            }}
          />
        )}

        {/* STEP 2: Contact Information */}
        {step === 2 && (
          <ContactInfoForm
            t={t}
            formData={formData}
            updateFormData={updateFormData}
            onBack={() => {
              setStep(1);
              scrollToTop();
            }}
            onNext={() => {
              setStep(3);
              scrollToTop();
            }}
          />
        )}

        {/* STEP 3: Address Information */}
        {step === 3 && (
          <AddressInfoForm
            t={t}
            formData={formData}
            updateFormData={updateFormData}
            onBack={() => {
              setStep(2);
              scrollToTop();
            }}
            onNext={() => {
              setStep(4);
              scrollToTop();
            }}
          />
        )}

        {/* STEP 4: Bank Information */}
        {step === 4 && (
          <BankInfoForm
            t={t}
            formData={formData}
            updateFormData={updateFormData}
            onBack={() => {
              setStep(3);
              scrollToTop();
            }}
            onNext={() => {
              setStep(5);
              scrollToTop();
            }}
          />
        )}

        {/* STEP 5: Review & Confirm */}
        {step === 5 && (
          <ReviewConfirmForm
            t={t}
            formData={formData}
            onEditStep={(stepNum) => {
              setStep(stepNum);
              scrollToTop();
            }}
            onSubmit={() => {
              navigate('/profile');
            }}
          />
        )}
      </div>

      {/* Safe Info Card OUTSIDE the form */}
      <div className="mt-8">
        <SafeInfoCard t={t} className="flex" />
      </div>

    </div>
  );
}
