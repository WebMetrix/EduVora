import React, { useState } from 'react';
import { User, Phone, MapPin, Landmark, Check, ChevronDown, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../../redux/slices/profileSlice';
import api from '../../../https/axios';

export default function ReviewConfirmForm({ t, onEditStep, onSubmit, formData }) {
  const [isChecked, setIsChecked] = useState(false);
  const [expandedSection, setExpandedSection] = useState('personal'); // 'personal', 'contact', 'address', 'bank'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleComplete = async () => {
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      toast.error(t('toast.bank.accountNumbersMismatch'));
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Format the date for SQL Date if it exists
      let dateOfBirth = null;
      if (formData.dateOfBirth) {
        const parts = formData.dateOfBirth.split('-');
        if (parts.length === 3) {
          dateOfBirth = `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD
        }
      }

      // 2. Create a FormData instance instead of a JSON object
      const payload = new FormData();

      // Append all text fields from formData
      Object.keys(formData).forEach(key => {
        // Skip specific fields that we handle manually
        if (key !== 'dateOfBirth' && key !== 'profileImage') {
           // Ensure undefined/null values are passed as empty strings
           payload.append(key, formData[key] || '');
        }
      });

      // Append manually formatted date
      if (dateOfBirth) {
        payload.append('dateOfBirth', dateOfBirth);
      }

      // 3. Append the file (Assuming you saved the file as 'profileImage' in your state)
      if (formData.profileImage) {
        payload.append('profileImage', formData.profileImage);
      }

      // 4. Send the request (Axios automatically handles multipart/form-data headers when given FormData)
      const response = await api.put('/profile/edit', payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success(response.data.message || t('toast.profile.updateSuccess'));
      dispatch(fetchUserProfile());
      if (onSubmit) onSubmit();
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.response?.data?.message || t('toast.profile.updateFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const personalData = [
    { label: t('completeProfile.fullName'), value: formData.fullName || '-' },
    { label: t('completeProfile.username'), value: formData.username || '-' },
    { label: t('completeProfile.dob'), value: formData.dateOfBirth || '-' },
    { label: t('completeProfile.gender'), value: formData.gender || '-' },
    { label: t('completeProfile.nationality'), value: formData.nationality || '-' },
  ];

  const contactData = [
    { label: t('completeProfile.emailAddress'), value: formData.emailAddress || '-' },
    { label: t('completeProfile.mobileNumber'), value: formData.mobileNumber ? `${t('completeProfile.countryCode')} ${formData.mobileNumber}` : '-' },
    { label: t('completeProfile.whatsappNumber'), value: formData.whatsAppNumber ? `${t('completeProfile.countryCode')} ${formData.whatsAppNumber}` : '-' },
  ];

  const addressData = [
    { label: t('completeProfile.addressLine1'), value: formData.addressLine1 || '-' },
    { label: t('completeProfile.addressLine2'), value: formData.addressLine2 || '-' },
    { label: t('completeProfile.country'), value: formData.country || '-' },
    { label: t('completeProfile.state'), value: formData.stateName || formData.state || '-' },
    { label: t('completeProfile.city'), value: formData.cityName || formData.city || '-' },
    { label: t('completeProfile.pincode'), value: formData.pincode || '-' },
  ];

  const bankData = [
    { label: t('completeProfile.accountHolderName'), value: formData.accountHolderName || '-' },
    { label: t('completeProfile.bankName'), value: formData.bankName || '-' },
    { label: t('completeProfile.accountNumber'), value: formData.accountNumber || '-' },
    { label: t('completeProfile.ifscCode'), value: formData.ifscCode || '-' },
    { label: t('completeProfile.accountType'), value: formData.accountTypeName || formData.accountType || '-' },
  ];

  return (
    <div className="space-y-6">

      {/* Sections Container */}
      <div className="bg-[#f8fafd] rounded-2xl p-2 space-y-2">

        {/* Personal Information */}
        <div
          className={`transition-colors rounded-xl p-5 cursor-pointer ${expandedSection === 'personal' ? 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]' : 'bg-transparent hover:bg-white'}`}
          onClick={() => toggleSection('personal')}
        >
          <div className={`flex items-center justify-between ${expandedSection === 'personal' ? 'mb-5' : ''}`}>
            <div className="flex items-center gap-3 text-[#1a1446]">
              <User className="w-5 h-5 text-slate-400" />
              <h4 className="font-bold text-[14px]">{t('completeProfile.personalInfo')}</h4>
            </div>
            {expandedSection === 'personal' ? (
              <button
                onClick={(e) => { e.stopPropagation(); onEditStep(1); }}
                className="text-[#4f3bf3] font-bold text-[13px] hover:underline"
              >
                {t('completeProfile.editBtn')}
              </button>
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>

          {expandedSection === 'personal' && (
            <div className="space-y-4">
              {personalData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-[13px]">
                  <span className="text-slate-500 font-medium">{item.label}</span>
                  <span className="text-[#1a1446] font-bold text-right">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div
          className={`transition-colors rounded-xl p-5 cursor-pointer ${expandedSection === 'contact' ? 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]' : 'bg-transparent hover:bg-white'}`}
          onClick={() => toggleSection('contact')}
        >
          <div className={`flex items-center justify-between ${expandedSection === 'contact' ? 'mb-5' : ''}`}>
            <div className="flex items-center gap-3 text-[#1a1446]">
              <Phone className="w-5 h-5 text-slate-400" />
              <h4 className="font-bold text-[14px]">{t('completeProfile.contactInfoTitle')}</h4>
            </div>
            {expandedSection === 'contact' ? (
              <button
                onClick={(e) => { e.stopPropagation(); onEditStep(2); }}
                className="text-[#4f3bf3] font-bold text-[13px] hover:underline"
              >
                {t('completeProfile.editBtn')}
              </button>
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>

          {expandedSection === 'contact' && (
            <div className="space-y-4">
              {contactData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-[13px]">
                  <span className="text-slate-500 font-medium">{item.label}</span>
                  <span className="text-[#1a1446] font-bold text-right">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Address Information */}
        <div
          className={`transition-colors rounded-xl p-5 cursor-pointer ${expandedSection === 'address' ? 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]' : 'bg-transparent hover:bg-white'}`}
          onClick={() => toggleSection('address')}
        >
          <div className={`flex items-center justify-between ${expandedSection === 'address' ? 'mb-5' : ''}`}>
            <div className="flex items-center gap-3 text-[#1a1446]">
              <MapPin className="w-5 h-5 text-slate-400" />
              <h4 className="font-bold text-[14px]">{t('completeProfile.addressInfoTitle')}</h4>
            </div>
            {expandedSection === 'address' ? (
              <button
                onClick={(e) => { e.stopPropagation(); onEditStep(3); }}
                className="text-[#4f3bf3] font-bold text-[13px] hover:underline"
              >
                {t('completeProfile.editBtn')}
              </button>
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>

          {expandedSection === 'address' && (
            <div className="space-y-4">
              {addressData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-[13px]">
                  <span className="text-slate-500 font-medium">{item.label}</span>
                  <span className="text-[#1a1446] font-bold text-right">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bank Information */}
        <div
          className={`transition-colors rounded-xl p-5 cursor-pointer ${expandedSection === 'bank' ? 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]' : 'bg-transparent hover:bg-white'}`}
          onClick={() => toggleSection('bank')}
        >
          <div className={`flex items-center justify-between ${expandedSection === 'bank' ? 'mb-5' : ''}`}>
            <div className="flex items-center gap-3 text-[#1a1446]">
              <Landmark className="w-5 h-5 text-slate-400" />
              <h4 className="font-bold text-[14px]">{t('completeProfile.bankInfoTitle')}</h4>
            </div>
            {expandedSection === 'bank' ? (
              <button
                onClick={(e) => { e.stopPropagation(); onEditStep(4); }}
                className="text-[#4f3bf3] font-bold text-[13px] hover:underline"
              >
                {t('completeProfile.editBtn')}
              </button>
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>

          {expandedSection === 'bank' && (
            <div className="space-y-4">
              {bankData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-[13px]">
                  <span className="text-slate-500 font-medium">{item.label}</span>
                  <span className="text-[#1a1446] font-bold text-right">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Checkbox */}
      <div
        className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${isChecked
            ? 'bg-indigo-50 border-indigo-50 shadow-none'
            : 'bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] border-slate-100'
          }`}
        onClick={() => setIsChecked(!isChecked)}
      >
        <div className={`shrink-0 w-6 h-6 rounded-[8px] flex items-center justify-center transition-all duration-200 ${isChecked
            ? 'bg-[#4f3bf3]'
            : 'bg-white border-2 border-slate-300'
          }`}>
          {isChecked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
        </div>
        <p className="text-[14px] text-[#1a1446] font-bold select-none">
          {t('completeProfile.confirmCheckbox')}
        </p>
      </div>

      {/* Complete Button */}
      <div className="pt-2">
        <button
          onClick={handleComplete}
          disabled={!isChecked || isSubmitting}
          className={`w-full py-4 rounded-xl text-white font-bold text-[15px] transition-all duration-300 flex items-center justify-center gap-2 ${isChecked && !isSubmitting
              ? 'bg-[#4f3bf3] hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30'
              : 'bg-indigo-300 cursor-not-allowed'
            }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t('common.processing')}
            </>
          ) : (
            t('completeProfile.completeProfileBtn')
          )}
        </button>
      </div>
    </div>
  );
}
