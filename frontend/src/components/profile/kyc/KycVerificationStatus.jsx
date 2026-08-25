import React from 'react';
import { 
  ShieldCheck, CheckCircle2, Clock, Hourglass, 
  Info, CheckCircle, Edit2, User, XCircle
} from 'lucide-react';

export default function KycVerificationStatus({ kycData, onEdit }) {
  const statusId = kycData?.KYCStatusId || 1;
  const submittedDate = kycData?.SubmittedDate 
    ? new Date(kycData.SubmittedDate).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' }) 
    : 'Recently';
  return (
    <div className="flex flex-col gap-6 w-full relative z-20">
      
      {/* Main Status Container */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col w-full">
        
        {/* Header */}
        <div className="flex items-start gap-4 mb-10">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex shrink-0 items-center justify-center text-[#4f3bf3]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-[#1a1446] mb-1">
              {statusId === 1 ? 'Verification in Progress' : statusId === 2 ? 'Verification Completed' : 'Verification Rejected'}
            </h3>
            <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
              {statusId === 1 
                ? <>We are currently reviewing your documents and information.<br className="hidden sm:block"/>This usually takes 24-48 hours.</>
                : statusId === 2
                ? 'Your KYC has been successfully verified.'
                : 'Your KYC application was rejected. Please review the reasons and resubmit.'
              }
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="pl-2 mb-10 relative">
          {/* Vertical Line */}
          <div className="absolute left-[21px] top-6 bottom-6 w-0.5 bg-slate-100">
            {/* Active portion of the line */}
            <div className={`w-full bg-[#4f3bf3] ${statusId === 1 ? 'h-[50%]' : 'h-full'}`} />
          </div>

          <div className="space-y-8 relative z-10">
            {/* Step 1: Submitted */}
            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-green-50 border-[3px] border-white ring-[3px] ring-green-50 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div>
                  <h4 className="text-[14px] font-bold text-[#1a1446] mb-0.5">Submitted Successfully</h4>
                  <p className="text-[13px] text-slate-500 font-medium">Your KYC application has been submitted.</p>
                </div>
                <span className="text-[12px] font-bold text-slate-500">{submittedDate}</span>
              </div>
            </div>

            {/* Step 2: Under Review */}
            <div className="flex items-start gap-4">
              <div className={`w-7 h-7 rounded-full border-[3px] border-white ring-[3px] flex items-center justify-center shrink-0 mt-0.5 ${statusId > 1 ? 'bg-green-50 ring-green-50' : 'bg-indigo-50 ring-indigo-50'}`}>
                {statusId > 1 ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Clock className="w-4 h-4 text-[#4f3bf3]" />}
              </div>
              <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div>
                  <h4 className="text-[14px] font-bold text-[#1a1446] mb-0.5">Under Review</h4>
                  <p className="text-[13px] text-slate-500 font-medium">Our team is verifying your documents and details.</p>
                </div>
                <span className={`text-[12.5px] font-bold ${statusId > 1 ? 'text-green-500' : 'text-[#4f3bf3]'}`}>
                  {statusId > 1 ? 'Completed' : 'In Progress'}
                </span>
              </div>
            </div>

            {/* Step 3: Decision */}
            <div className="flex items-start gap-4">
              <div className={`w-7 h-7 rounded-full border-[3px] border-white ring-[3px] flex items-center justify-center shrink-0 mt-0.5 ${statusId === 2 ? 'bg-green-50 ring-green-50' : statusId === 3 ? 'bg-red-50 ring-red-50' : 'bg-slate-50 ring-slate-50'}`}>
                {statusId === 2 ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : statusId === 3 ? <XCircle className="w-4 h-4 text-red-500" /> : <Hourglass className="w-3.5 h-3.5 text-slate-400" />}
              </div>
              <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div>
                  <h4 className="text-[14px] font-bold text-[#1a1446] mb-0.5">Verification Decision</h4>
                  <p className="text-[13px] text-slate-500 font-medium">
                    {statusId === 1 ? 'You will be notified once the verification is done.' : statusId === 2 ? 'Your application is approved.' : 'Your application was rejected.'}
                  </p>
                </div>
                <span className={`text-[12.5px] font-bold ${statusId === 2 ? 'text-green-500' : statusId === 3 ? 'text-red-500' : 'text-slate-400'}`}>
                  {statusId === 1 ? 'Pending' : statusId === 2 ? 'Verified' : 'Rejected'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* What happens next box */}
        <div className="bg-[#f5f3ff]/60 rounded-2xl p-6 border border-indigo-50 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative overflow-hidden">
          
          <div className="flex-1 z-10">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-[#4f3bf3]" />
              <h4 className="text-[15px] font-bold text-[#1a1446]">What happens next?</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#4f3bf3] shrink-0 mt-0.5" />
                <span className="text-[13.5px] text-slate-700 font-medium">We will verify your documents and information.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#4f3bf3] shrink-0 mt-0.5" />
                <span className="text-[13.5px] text-slate-700 font-medium">You will receive an email notification with the result.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#4f3bf3] shrink-0 mt-0.5" />
                <span className="text-[13.5px] text-slate-700 font-medium">Once verified, you can start withdrawing your commissions.</span>
              </div>
            </div>
          </div>

          {/* Illustration approximation */}
          <div className="w-32 h-24 shrink-0 relative z-10 hidden sm:flex items-center justify-center mr-4">
             <div className="absolute inset-0 bg-white rounded-lg shadow-sm border border-slate-200 p-2.5 flex flex-col gap-2.5">
               <div className="w-8 h-2 bg-indigo-200 rounded-full absolute -top-1 left-1/2 -translate-x-1/2" />
               <div className="flex gap-2 items-center mt-2">
                 <div className="w-8 h-8 bg-indigo-50 rounded-full flex shrink-0 items-center justify-center text-indigo-300">
                    <User className="w-5 h-5" />
                 </div>
                 <div className="flex-1 flex flex-col gap-1.5">
                   <div className="w-full h-1.5 bg-slate-200 rounded-full" />
                   <div className="w-3/4 h-1.5 bg-slate-200 rounded-full" />
                 </div>
               </div>
               <div className="w-full h-1.5 bg-slate-100 rounded-full" />
               <div className="w-4/5 h-1.5 bg-slate-100 rounded-full" />
             </div>
             <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-xl p-1.5 border-[3px] border-white shadow-md">
               <ShieldCheck className="w-6 h-6 text-white" />
             </div>
             {/* Decorative stars */}
             <div className="absolute top-2 -left-4 text-indigo-400 opacity-60 text-lg">✦</div>
             <div className="absolute -top-1 right-2 text-green-400 opacity-60 text-sm">✦</div>
             <div className="absolute bottom-2 -left-6 text-green-400 opacity-60 text-sm">✦</div>
             <div className="absolute bottom-1 right-16 text-indigo-400 opacity-60 text-xs">✦</div>
          </div>
        </div>

      </div>

      {/* Edit Container */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-[15px] font-bold text-[#1a1446] mb-1">Need to update something?</h4>
          <p className="text-[13px] text-slate-500 font-medium">If you want to update any information or documents, you can edit your information at any time.</p>
        </div>
        <button 
          onClick={onEdit}
          className="flex items-center gap-1.5 px-4 py-2 border border-[#4f3bf3] text-[#4f3bf3] rounded-xl text-[12px] font-bold hover:bg-indigo-50 transition-colors shrink-0 w-full sm:w-auto justify-center"
        >
          <Edit2 className="w-3.5 h-3.5" />
          Edit Information
        </button>
      </div>

    </div>
  );
}
