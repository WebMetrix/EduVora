import React, { useState } from 'react';
import { FileText, ArrowLeft, ChevronRight, UploadCloud, File, Info, CreditCard, ChevronDown } from 'lucide-react';

export default function KycDocumentUploadForm({ formData, updateFormData, onNext, onPrev }) {
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
            Document Upload
          </h3>
          <p className="text-[13px] text-slate-500 font-medium">
            Upload clear and valid documents. All documents are mandatory.
          </p>
        </div>
      </div>

      {/* Main Grid for Two Boxes */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 mb-8">
        
        {/* Left Box: Identity Proof */}
        <div className="border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50/50 flex shrink-0 items-center justify-center text-[#4f3bf3] border border-indigo-100/50">
              <File className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-slate-900">Identity Proof</h4>
              <p className="text-[12px] text-slate-500 font-medium">Aadhar / Passport / Driving License / Voter ID</p>
            </div>
          </div>

          <div className="space-y-1.5 mb-5">
            <label className="text-[12px] font-semibold text-slate-700 ml-1">Select Identity Proof Type</label>
            <div className="relative">
              <select 
                value={formData.identityProofType}
                onChange={(e) => updateFormData('identityProofType', e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[14px] text-slate-900 font-medium focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all appearance-none pr-10"
              >
                <option value="Aadhar Card">Aadhar Card</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
                <option value="Voter ID">Voter ID</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="bg-[#f8f9fe] rounded-xl p-4 flex gap-3 items-start mb-6">
            <Info className="w-4 h-4 text-[#4f3bf3] shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] text-slate-800 font-medium mb-1">Please upload clear front and back side of your {formData.identityProofType}.</p>
              <p className="text-[12px] text-slate-500 font-medium">All details must be visible.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-[13px] font-bold text-slate-800 mb-2 block">Front Side</label>
              <div className="border border-dashed border-indigo-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center bg-white hover:bg-[#f8f9fe] transition-colors cursor-pointer min-h-[160px]">
                <UploadCloud className="w-6 h-6 text-[#4f3bf3] mb-3" />
                <p className="text-[12px] text-slate-500 font-medium mb-3">
                  {formData.identityProofFrontPath ? formData.identityProofFrontPath.name : 'Upload front side image'}
                </p>
                <div className="relative">
                  <input 
                    type="file" 
                    accept=".jpg,.jpeg,.png,.pdf" 
                    onChange={(e) => handleFileChange('identityProofFrontPath', e)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button type="button" className="px-5 py-2 border border-indigo-200 text-[#4f3bf3] rounded-xl text-[13px] font-bold bg-white hover:bg-indigo-50 transition-colors pointer-events-none">
                    {formData.identityProofFrontPath ? 'Change File' : 'Choose File'}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="text-[13px] font-bold text-slate-800 mb-2 block">Back Side</label>
              <div className="border border-dashed border-indigo-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center bg-white hover:bg-[#f8f9fe] transition-colors cursor-pointer min-h-[160px]">
                <UploadCloud className="w-6 h-6 text-[#4f3bf3] mb-3" />
                <p className="text-[12px] text-slate-500 font-medium mb-3">
                  {formData.identityProofBackPath ? formData.identityProofBackPath.name : 'Upload back side image (Optional)'}
                </p>
                <div className="relative">
                  <input 
                    type="file" 
                    accept=".jpg,.jpeg,.png,.pdf" 
                    onChange={(e) => handleFileChange('identityProofBackPath', e)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button type="button" className="px-5 py-2 border border-indigo-200 text-[#4f3bf3] rounded-xl text-[13px] font-bold bg-white hover:bg-indigo-50 transition-colors pointer-events-none">
                    {formData.identityProofBackPath ? 'Change File' : 'Choose File'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border border-slate-100 mt-auto">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#4f3bf3]" />
              <span className="text-[12px] font-bold text-slate-700">Accepted formats: <span className="font-medium text-slate-500">JPG, PNG, PDF</span></span>
            </div>
            <span className="text-[12px] font-bold text-slate-700">Max file size: <span className="font-medium text-slate-500">5MB per file</span></span>
          </div>
        </div>

        {/* Right Box: PAN Card */}
        <div className="border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50/50 flex shrink-0 items-center justify-center text-[#4f3bf3] border border-indigo-100/50">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-slate-900">PAN Card</h4>
              <p className="text-[12px] text-slate-500 font-medium">Upload your PAN card for verification</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-[13px] font-bold text-slate-800 mb-2 block">Front Side</label>
            <div className="border border-dashed border-indigo-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-white hover:bg-[#f8f9fe] transition-colors cursor-pointer min-h-[220px]">
              <UploadCloud className="w-7 h-7 text-[#4f3bf3] mb-4" />
              <p className="text-[13px] text-slate-500 font-medium mb-4">
                {formData.panCardPath ? formData.panCardPath.name : 'Upload PAN card image'}
              </p>
              <div className="relative">
                <input 
                  type="file" 
                  accept=".jpg,.jpeg,.png,.pdf" 
                  onChange={(e) => handleFileChange('panCardPath', e)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button type="button" className="px-5 py-2 border border-indigo-200 text-[#4f3bf3] rounded-xl text-[13px] font-bold bg-white hover:bg-indigo-50 transition-colors pointer-events-none">
                  {formData.panCardPath ? 'Change File' : 'Choose File'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mt-auto">
            <div className="flex items-start gap-3">
              <FileText className="w-4 h-4 text-[#4f3bf3] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1.5">
                <p className="text-[12px] font-bold text-slate-700">Accepted formats: <span className="font-medium text-slate-500">JPG, PNG, PDF</span></p>
                <p className="text-[12px] font-bold text-slate-700">Max file size: <span className="font-medium text-slate-500">5MB</span></p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer / Buttons */}
      <div className="mt-4 flex flex-col-reverse md:flex-row items-center justify-between border-t border-slate-100 pt-6 gap-4">
        <button 
          onClick={onPrev}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl text-[14px] font-bold hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button 
          onClick={onNext}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#4f3bf3] text-white px-8 py-3.5 rounded-xl font-bold text-[14px] hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-[0.98]"
        >
          Save & Continue
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
