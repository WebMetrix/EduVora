import React from 'react';
import { ShieldCheck, CheckCircle2, Headset } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useTranslation } from '../../../hooks/useTranslation';

export default function KycVerificationSidebar() {
  const { data: kycData } = useSelector((state) => state.kyc || {});
  const { t } = useTranslation();
  
  // Determine Status Text & Color
  let statusText = t('kyc.verificationSidebar.inProgress');
  let statusColorClass = 'bg-amber-50 text-amber-600';
  
  if (kycData?.KYCStatusId === 2) {
      statusText = t('kyc.verificationSidebar.verified');
      statusColorClass = 'bg-green-50 text-green-600';
  } else if (kycData?.KYCStatusId === 3) {
      statusText = t('kyc.verificationSidebar.rejected');
      statusColorClass = 'bg-red-50 text-red-600';
  }
  return (
    <div className="w-full shrink-0 flex flex-col gap-6 relative z-20">
      
      {/* KYC Status Box */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col w-full">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-[15px] font-bold text-[#1a1446]">{t('kyc.verificationSidebar.status')}</h4>
        </div>
        
        <div className={`inline-flex px-3.5 py-1.5 rounded-lg text-[13px] font-bold w-fit mb-5 ${statusColorClass}`}>
          {statusText}
        </div>
        
        <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-6">
          {kycData?.KYCStatusId === 2 
            ? t('kyc.verificationSidebar.verifiedDesc')
            : kycData?.KYCStatusId === 3
            ? t('kyc.verificationSidebar.rejectedDesc', { reason: kycData?.RejectionReason || t('kyc.verificationSidebar.rejectedFallbackReason') })
            : t('kyc.verificationSidebar.inProgressDesc')}
        </p>

        <div className="h-px w-full bg-slate-100 mb-6" />

        <div>
          <span className="text-[12px] font-bold text-slate-900 block mb-1.5">{t('kyc.verificationSidebar.appId')}</span>
          <span className="text-[13px] font-bold text-[#4f3bf3]">KYC-2025-0514-7842</span>
        </div>
      </div>

      {/* Why KYC is important Box */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col w-full">
        <h4 className="text-[15px] font-bold text-[#1a1446] mb-5">{t('kyc.verificationSidebar.whyImportant')}</h4>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span className="text-[13px] text-slate-700 font-medium">{t('kyc.verificationSidebar.reasons.secureAccount')}</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span className="text-[13px] text-slate-700 font-medium">{t('kyc.verificationSidebar.reasons.withdrawEarnings')}</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span className="text-[13px] text-slate-700 font-medium">{t('kyc.verificationSidebar.reasons.buildTrust')}</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span className="text-[13px] text-slate-700 font-medium">{t('kyc.verificationSidebar.reasons.complyRegulations')}</span>
          </div>
        </div>
      </div>

      {/* Need Help Box */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4f3bf3]">
            <Headset className="w-5 h-5" />
          </div>
          <h4 className="text-[15px] font-bold text-[#1a1446]">{t('kyc.verificationSidebar.needHelp')}</h4>
        </div>
        <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-6">
          {t('kyc.verificationSidebar.supportDesc')}
        </p>
        <button className="w-fit px-6 py-2.5 border border-[#4f3bf3] text-[#4f3bf3] rounded-xl text-[13px] font-bold hover:bg-indigo-50 transition-colors self-start md:self-auto text-center">
          {t('kyc.verificationSidebar.contactSupport')}
        </button>
      </div>

    </div>
  );
}
