import React, { useState } from 'react';
import { 
  FileText, User, Edit2, CheckCircle2, 
  IdCard, CreditCard, ArrowLeft, ArrowRight, Loader2
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKycDetails, fetchIdentityProofTypes } from '../../../redux/slices/kycSlice';
import { toast } from 'react-toastify';
import api from '../../../https/axios';
import { useTranslation } from '../../../hooks/useTranslation';

export default function KycReviewSubmitForm({ formData, onPrev, onEditStep, onSubmit }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { identityProofTypes } = useSelector((state) => state.kyc);
  const { t } = useTranslation();

  const staticMask = (val) => {
    if (!val) return '';
    let unformatted = val.replace(/[^A-Z0-9]/ig, '').toUpperCase();
    let masked = '';
    for (let i = 0; i < unformatted.length; i++) {
      if (i >= unformatted.length - 4) {
        masked += unformatted[i];
      } else {
        masked += 'X';
      }
    }
    return masked;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('panNumber', formData.panNumber);
      payload.append('identityTypeId', formData.identityTypeId);
      payload.append('identityProofNumber', formData.identityProofNumber);
      
      if (formData.identityProofFrontPath) payload.append('IdentityProofFrontPath', formData.identityProofFrontPath);
      if (formData.identityProofBackPath) payload.append('IdentityProofBackPath', formData.identityProofBackPath);
      if (formData.panCardPath) payload.append('PanCardPath', formData.panCardPath);

      const response = await api.post('/kyc/submit', payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success(response.data.message || t('kyc.reviewSubmit.successMsg'));
      dispatch(fetchKycDetails()); // Refresh KYC data from backend
      onSubmit(); // Proceed to step 4
    } catch (error) {
      console.error('Submit KYC Error:', error);
      toast.error(error.response?.data?.message || t('kyc.reviewSubmit.errorMsg'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col w-full relative z-20">
      
      {/* Main Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex shrink-0 items-center justify-center text-[#4f3bf3]">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-[17px] font-bold text-[#1a1446] mb-0.5">
            {t('kyc.reviewSubmit.title')}
          </h3>
          <p className="text-[13px] text-slate-500 font-medium">
            {t('kyc.reviewSubmit.subtitle')}
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
              <h4 className="text-[15px] font-bold text-[#1a1446]">{t('kyc.reviewSubmit.section1')}</h4>
            </div>
            <button 
              onClick={() => onEditStep(1)}
              className="shrink-0 flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-lg border border-indigo-200 text-indigo-600 font-bold shadow-sm text-[12px] transition-all hover:bg-indigo-50"
            >
              <Edit2 className="w-3.5 h-3.5" />
              {t('kyc.reviewSubmit.edit')}
            </button>
          </div>
          
          <div className="flex flex-col px-2 md:px-14">
            <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100">
              <span className="text-[14px] text-slate-500 font-medium w-full sm:w-[250px] shrink-0 mb-1 sm:mb-0">{t('kyc.personalInfo.fullName')}</span>
              <span className="text-[14px] font-bold text-slate-900">{formData.fullName || t('kyc.reviewSubmit.emptyFallback')}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100">
              <span className="text-[14px] text-slate-500 font-medium w-full sm:w-[250px] shrink-0 mb-1 sm:mb-0">{t('kyc.personalInfo.dob')}</span>
              <span className="text-[14px] font-bold text-slate-900">{formData.dateOfBirth || t('kyc.reviewSubmit.emptyFallback')}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100">
              <span className="text-[14px] text-slate-500 font-medium w-full sm:w-[250px] shrink-0 mb-1 sm:mb-0">{t('kyc.personalInfo.gender')}</span>
              <span className="text-[14px] font-bold text-slate-900">{formData.gender || t('kyc.reviewSubmit.emptyFallback')}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100">
              <span className="text-[14px] text-slate-500 font-medium w-full sm:w-[250px] shrink-0 mb-1 sm:mb-0">{t('kyc.personalInfo.mobileNumber')}</span>
              <span className="text-[14px] font-bold text-slate-900">{formData.mobileNumber || t('kyc.reviewSubmit.emptyFallback')}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100">
              <span className="text-[14px] text-slate-500 font-medium w-full sm:w-[250px] shrink-0 mb-1 sm:mb-0">{t('kyc.personalInfo.emailAddress')}</span>
              <span className="text-[14px] font-bold text-slate-900">{formData.emailAddress || t('kyc.reviewSubmit.emptyFallback')}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100">
              <span className="text-[14px] text-slate-500 font-medium w-full sm:w-[250px] shrink-0 mb-1 sm:mb-0">
                {identityProofTypes?.find(o => o.value == formData.identityTypeId)?.label ? `${identityProofTypes.find(o => o.value == formData.identityTypeId).label} Number` : 'Identity Proof Number'}
              </span>
              <span className="text-[14px] font-bold text-slate-900">{formData.identityProofNumber ? staticMask(formData.identityProofNumber) : t('kyc.reviewSubmit.emptyFallback')}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100">
              <span className="text-[14px] text-slate-500 font-medium w-full sm:w-[250px] shrink-0 mb-1 sm:mb-0">PAN Number</span>
              <span className="text-[14px] font-bold text-slate-900">{formData.panNumber || t('kyc.reviewSubmit.emptyFallback')}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start py-4">
              <span className="text-[14px] text-slate-500 font-medium w-full sm:w-[250px] shrink-0 mb-1 sm:mb-0 mt-0.5">{t('kyc.personalInfo.address')}</span>
              <span className="text-[14px] font-bold text-slate-900 leading-relaxed">{formData.address || t('kyc.reviewSubmit.emptyFallback')}</span>
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
              <h4 className="text-[15px] font-bold text-[#1a1446]">{t('kyc.reviewSubmit.section2')}</h4>
            </div>
            <button 
              onClick={() => onEditStep(2)}
              className="shrink-0 flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-lg border border-indigo-200 text-indigo-600 font-bold shadow-sm text-[12px] transition-all hover:bg-indigo-50"
            >
              <Edit2 className="w-3.5 h-3.5" />
              {t('kyc.reviewSubmit.edit')}
            </button>
          </div>

          <div className="flex flex-col gap-4 px-2 md:px-14">
            
            {/* Identity Proof */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-[#f8fafc]/50 border border-slate-100 rounded-2xl gap-4 sm:gap-8">
              <div className="flex items-center gap-4 w-full sm:w-[220px] shrink-0">
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                  <IdCard className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-[14px] font-bold text-[#1a1446] truncate">{t('kyc.documentUpload.identityProof')}</h5>
                  <p className="text-[12px] text-slate-500 font-medium mt-0.5 truncate">
                    {identityProofTypes?.find(o => o.value == formData.identityTypeId)?.label || 'Document Provided'}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-12 min-w-0 w-full">
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-slate-900 block mb-1.5">{t('kyc.documentUpload.frontSide')}</span>
                  <div className="flex items-center gap-2">
                    {formData.identityProofFrontPath ? (
                        <>
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            <span className="text-[13px] font-medium text-slate-600 truncate">{formData.identityProofFrontPath.name}</span>
                        </>
                    ) : (
                        <span className="text-[13px] font-medium text-red-500 truncate">{t('kyc.reviewSubmit.notUploaded')}</span>
                    )}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-slate-900 block mb-1.5">{t('kyc.documentUpload.backSide')}</span>
                  <div className="flex items-center gap-2">
                    {formData.identityProofBackPath ? (
                        <>
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            <span className="text-[13px] font-medium text-slate-600 truncate">{formData.identityProofBackPath.name}</span>
                        </>
                    ) : (
                        <span className="text-[13px] font-medium text-slate-400 truncate">{t('kyc.reviewSubmit.notUploaded')}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* PAN Card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-[#f8fafc]/50 border border-slate-100 rounded-2xl gap-4 mt-4 sm:gap-8">
              <div className="flex items-center gap-4 w-full sm:w-[220px] shrink-0">
                <div className="w-11 h-11 rounded-xl bg-[#e0f2fe]/60 flex items-center justify-center text-[#0ea5e9] shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-[14px] font-bold text-[#1a1446] truncate">{t('kyc.documentUpload.panCard')}</h5>
                  <p className="text-[12px] text-slate-500 font-medium mt-0.5 truncate">{t('kyc.documentUpload.panCard')}</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-12 min-w-0 w-full">
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-slate-900 block mb-1.5">{t('kyc.documentUpload.frontSide')}</span>
                  <div className="flex items-center gap-2">
                    {formData.panCardPath ? (
                        <>
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            <span className="text-[13px] font-medium text-slate-600 truncate">{formData.panCardPath.name}</span>
                        </>
                    ) : (
                        <span className="text-[13px] font-medium text-red-500 truncate">{t('kyc.reviewSubmit.notUploaded')}</span>
                    )}
                  </div>
                </div>
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
              {t('kyc.reviewSubmit.declarationText1')}
            </p>
            <p className="text-[12px] text-[#1a1446] font-medium leading-relaxed">
              {t('kyc.reviewSubmit.declarationText2')}
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
          {t('kyc.reviewSubmit.back')}
        </button>
        <button 
          onClick={handleSubmit}
          disabled={!isChecked || isSubmitting}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#4f3bf3] text-white px-8 py-3.5 rounded-xl font-bold text-[14px] hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"
        >
          {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('kyc.reviewSubmit.submitting')}
              </>
          ) : (
              <>
                {t('kyc.reviewSubmit.submit')}
                <ArrowRight className="w-4 h-4" />
              </>
          )}
        </button>
      </div>

    </div>
  );
}
