import React, { useState } from 'react';
import { FileText, ArrowLeft, ChevronRight, UploadCloud, File, Info, CreditCard, ChevronDown } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import CustomSelect from '../../common/CustomSelect';

export default function KycDocumentUploadForm({ formData, updateFormData, onNext, onPrev }) {
  const { t } = useTranslation();
  const handleFileChange = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      updateFormData(field, file);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col w-full relative z-20">

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex shrink-0 items-center justify-center text-[#4f3bf3]">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-[17px] font-bold text-[#1a1446] mb-0.5">
            {t('kyc.documentUpload.title')}
          </h3>
          <p className="text-[13px] text-slate-500 font-medium">
            {t('kyc.documentUpload.subtitle')}
          </p>
        </div>
      </div>

      {/* Main Grid for Two Boxes */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 mb-4">

        {/* Left Box: Identity Proof */}
        <div className="border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50/50 flex shrink-0 items-center justify-center text-[#4f3bf3] border border-indigo-100/50">
              <File className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-slate-900">{t('kyc.documentUpload.identityProof')}</h4>
              <p className="text-[12px] text-slate-500 font-medium">{t('kyc.documentUpload.identityProofDesc')}</p>
            </div>
          </div>

          <div className="mb-5">
            <label className="text-[13px] font-bold text-slate-800 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              {t('kyc.documentUpload.selectIdentityProof')}
            </label>
            <div className="relative">
              <CustomSelect
                options={[
                  { value: 'Aadhar Card', label: t('kyc.documentUpload.identityProofTypes.aadhar') },
                  { value: 'Passport', label: t('kyc.documentUpload.identityProofTypes.passport') },
                  { value: 'Driving License', label: t('kyc.documentUpload.identityProofTypes.drivingLicense') },
                  { value: 'Voter ID', label: t('kyc.documentUpload.identityProofTypes.voterId') }
                ]}
                placeholder={t('kyc.documentUpload.selectIdentityProof')}
                value={formData.identityProofType}
                onChange={(val) => updateFormData('identityProofType', val)}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-[13px] font-bold text-slate-800 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              {formData.identityProofType ? `${formData.identityProofType} Number` : 'Identity Proof Number'}
            </label>
            <input
              type="text"
              placeholder={`E.G. ENTER ${formData.identityProofType ? formData.identityProofType.toUpperCase() : 'DOCUMENT'} NUMBER`}
              value={formData.identityProofNumber || ''}
              onChange={(e) => updateFormData('identityProofNumber', e.target.value.toUpperCase())}
              disabled={!formData.identityProofType}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[14px] text-slate-900 font-medium focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-[13px] font-bold text-slate-800 mb-2 block">{t('kyc.documentUpload.frontSide')}</label>
              <div className="border border-dashed border-indigo-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center bg-white hover:bg-[#f8f9fe] transition-colors cursor-pointer min-h-[140px]">
                <UploadCloud className="w-6 h-6 text-[#4f3bf3] mb-3 shrink-0" />
                <div className="h-9 flex items-center justify-center mb-3 w-full px-2">
                  <p className="text-[12px] text-slate-500 font-medium line-clamp-2 break-words">
                    {formData.identityProofFrontPath ? formData.identityProofFrontPath.name : t('kyc.documentUpload.uploadFrontImage')}
                  </p>
                </div>
                <div className="relative mt-auto">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileChange('identityProofFrontPath', e)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button type="button" className="px-5 py-2 border border-indigo-200 text-[#4f3bf3] rounded-xl text-[13px] font-bold bg-white hover:bg-indigo-50 transition-colors pointer-events-none whitespace-nowrap">
                    {formData.identityProofFrontPath ? t('kyc.documentUpload.changeFile') : t('kyc.documentUpload.chooseFile')}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="text-[13px] font-bold text-slate-800 mb-2 block">{t('kyc.documentUpload.backSide')}</label>
              <div className="border border-dashed border-indigo-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center bg-white hover:bg-[#f8f9fe] transition-colors cursor-pointer min-h-[140px]">
                <UploadCloud className="w-6 h-6 text-[#4f3bf3] mb-3 shrink-0" />
                <div className="h-9 flex items-center justify-center mb-3 w-full px-2">
                  <p className="text-[12px] text-slate-500 font-medium line-clamp-2 break-words">
                    {formData.identityProofBackPath ? formData.identityProofBackPath.name : t('kyc.documentUpload.uploadBackImage')}
                  </p>
                </div>
                <div className="relative mt-auto">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileChange('identityProofBackPath', e)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button type="button" className="px-5 py-2 border border-indigo-200 text-[#4f3bf3] rounded-xl text-[13px] font-bold bg-white hover:bg-indigo-50 transition-colors pointer-events-none whitespace-nowrap">
                    {formData.identityProofBackPath ? t('kyc.documentUpload.changeFile') : t('kyc.documentUpload.chooseFile')}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Box: PAN Card */}
        <div className="border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50/50 flex shrink-0 items-center justify-center text-[#4f3bf3] border border-indigo-100/50">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-slate-900">{t('kyc.documentUpload.panCard')}</h4>
              <p className="text-[12px] text-slate-500 font-medium">{t('kyc.documentUpload.panCardDesc')}</p>
            </div>
          </div>

          <div className="mb-5">
            <label className="text-[13px] font-bold text-slate-800 mb-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-slate-500" />
              PAN Number (Optional)
            </label>
            <input
              type="text"
              placeholder="E.G. ABCDE1234F"
              value={formData.panNumber || ''}
              onChange={(e) => updateFormData('panNumber', e.target.value.toUpperCase())}
              maxLength={10}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[14px] text-slate-900 font-medium focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="mb-6 mt-auto">
            <label className="text-[13px] font-bold text-slate-800 mb-2 block">{t('kyc.documentUpload.frontSide')}</label>
            <div className="border border-dashed border-indigo-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-white hover:bg-[#f8f9fe] transition-colors cursor-pointer min-h-[160px]">
              <UploadCloud className="w-7 h-7 text-[#4f3bf3] mb-4 shrink-0" />
              <div className="h-9 flex items-center justify-center mb-4 w-full px-2">
                <p className="text-[13px] text-slate-500 font-medium line-clamp-2 break-words">
                  {formData.panCardPath ? formData.panCardPath.name : t('kyc.documentUpload.uploadPanImage')}
                </p>
              </div>
              <div className="relative mt-auto">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileChange('panCardPath', e)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button type="button" className="px-5 py-2 border border-indigo-200 text-[#4f3bf3] rounded-xl text-[13px] font-bold bg-white hover:bg-indigo-50 transition-colors pointer-events-none whitespace-nowrap">
                  {formData.panCardPath ? t('kyc.documentUpload.changeFile') : t('kyc.documentUpload.chooseFile')}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Unified Format & Size Info */}
      <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/50 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-2">
        <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-700">
          <FileText className="w-4 h-4 text-[#4f3bf3]" />
          <span>{t('kyc.documentUpload.acceptedFormats')} <span className="text-indigo-600">{t('kyc.documentUpload.formatsList')}</span></span>
        </div>
        <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></div>
        <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-700">
          <Info className="w-4 h-4 text-[#4f3bf3]" />
          <span>{t('kyc.documentUpload.maxFileSize')} <span className="text-indigo-600">5MB per document</span></span>
        </div>
      </div>

      {/* Footer / Buttons */}
      <div className="mt-4 flex flex-col-reverse md:flex-row items-center justify-between border-t border-slate-100 pt-6 gap-4">
        <button
          onClick={onPrev}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl text-[14px] font-bold hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('kyc.documentUpload.back')}
        </button>
        <button
          onClick={onNext}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#4f3bf3] text-white px-8 py-3.5 rounded-xl font-bold text-[14px] hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-[0.98]"
        >
          {t('kyc.documentUpload.saveContinue')}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
