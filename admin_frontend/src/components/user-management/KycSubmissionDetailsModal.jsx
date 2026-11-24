import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X, FileText, User, Search, Check, RotateCw, QrCode
} from 'lucide-react';

export default function KycSubmissionDetailsModal({
  submission,
  isOpen,
  onClose,
  onStatusUpdate,
}) {
  const [internalRemarks, setInternalRemarks] = useState('');
  const [activePreviewDoc, setActivePreviewDoc] = useState(null); // 'front' | 'back' | 'pan' | null

  // ESC key handler and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activePreviewDoc) {
          setActivePreviewDoc(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activePreviewDoc, onClose]);

  // Reset internal remarks when submission changes
  useEffect(() => {
    if (submission) {
      setInternalRemarks(submission.remarks && submission.remarks !== '-' ? submission.remarks : '');
      setActivePreviewDoc(null);
    }
  }, [submission]);

  if (!isOpen || !submission) return null;

  // Resolve user info matching screenshot
  const userName = submission.name || 'Rahul Sharma';
  const userId = submission.userId || submission.id || 'USR000125';
  const userEmail = submission.email || 'rahul.sharma@example.com';
  const userMobile = submission.mobile || '+91 98765 43210';
  const registeredOn = submission.registeredOn || (submission.date && submission.time ? `${submission.date}, ${submission.time}` : '12 Oct 2026, 10:30 AM');
  const submissionDate = submission.submissionDate || (submission.date && submission.time ? `${submission.date}, ${submission.time}` : '12 Oct 2026, 10:30 AM');
  const proofType = submission.proofType || 'Aadhaar Card';
  const kycStatus = submission.status || 'Pending';
  const remarks = submission.remarks || '-';
  const userAvatar = submission.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80';
  const aadharNumber = submission.documentNumber || 'XXXX XXXX 1234';
  const panNumber = submission.panNumber || 'ABCDE1234F';

  const handleAction = (newStatus, actionLabel) => {
    if (onStatusUpdate) {
      onStatusUpdate(submission.id, newStatus, internalRemarks, actionLabel);
    }
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fade-in">
      {/* Click outside backdrop covering entire viewport including sticky Header and BottomNav */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Window Card - Responsive mobile bottom sheet & compact desktop window matching dashboard */}
      <div className="w-full h-[90vh] sm:h-[86vh] sm:max-h-[86vh] sm:max-w-[840px] lg:max-w-[880px] bg-white rounded-t-3xl sm:rounded-[22px] flex flex-col shadow-2xl relative mt-auto sm:mt-0 overflow-hidden z-10 border border-slate-200/90 animate-slide-up sm:animate-fade-in">
        {/* Mobile Drag Handle Bar matching KycDetailsModal */}
        <div
          onClick={onClose}
          className="w-full flex justify-center pt-2.5 pb-1 sm:hidden bg-white shrink-0 cursor-pointer"
        >
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Compact Header matching Dashboard Pop up Windows (KycDetailsModal, PayoutRequestDetailsModal) */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <h2 className="text-[14px] sm:text-[15px] font-bold text-slate-900 truncate">
              KYC Submission Details
            </h2>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline truncate">
              • Review and verify user KYC documents and information
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700 cursor-pointer shrink-0"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body with Dashboard Glassmorphism effects */}
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar overscroll-contain p-2.5 sm:p-3.5 space-y-2.5 sm:space-y-3 bg-slate-50/30">
          {/* ========================================================
              1. User Information Card with Dashboard Effects
             ======================================================== */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
            {/* Decorative hover gradient flare */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            {/* Section Title */}
            <div className="relative z-10 flex items-center gap-2 pb-2 sm:pb-2.5 border-b border-slate-100 mb-3 text-indigo-600">
              <User className="w-3.5 h-3.5 stroke-[2.2]" />
              <h3 className="text-[13px] sm:text-[13.5px] font-extrabold text-slate-900 tracking-tight">
                User Information
              </h3>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* Left Sub-Section (Col 1-7): Avatar + User Meta */}
              <div className="md:col-span-7 flex items-start sm:items-center gap-3 sm:gap-4">
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-13 h-13 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-indigo-100 shadow-2xs shrink-0 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="min-w-0 space-y-1 sm:space-y-1.5 text-[11.5px] sm:text-[12px] flex-1">
                  <h4 className="text-[15px] sm:text-[16px] font-black text-slate-900 tracking-tight leading-tight mb-1 truncate">
                    {userName}
                  </h4>
                  <div className="grid grid-cols-12 gap-1 text-slate-600 leading-tight">
                    <span className="col-span-5 xs:col-span-4 text-slate-500 font-medium">User ID</span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 xs:col-span-7 font-bold text-slate-900 truncate">{userId}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 text-slate-600 leading-tight">
                    <span className="col-span-5 xs:col-span-4 text-slate-500 font-medium">Email</span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 xs:col-span-7 font-medium text-slate-800 truncate">{userEmail}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 text-slate-600 leading-tight">
                    <span className="col-span-5 xs:col-span-4 text-slate-500 font-medium">Mobile</span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 xs:col-span-7 font-semibold text-slate-800">{userMobile}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 text-slate-600 leading-tight">
                    <span className="col-span-5 xs:col-span-4 text-slate-500 font-medium">Registered On</span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 xs:col-span-7 text-slate-700 font-medium truncate">{registeredOn}</span>
                  </div>
                </div>
              </div>

              {/* Right Sub-Section: On mobile, divided with top border; on desktop, divided with left border */}
              <div className="md:col-span-5 pt-2.5 border-t border-slate-100 md:pt-0 md:border-t-0 md:border-l md:border-slate-200 md:pl-5 space-y-1.5 sm:space-y-2 text-[11.5px] sm:text-[12px]">
                <div className="grid grid-cols-12 gap-1 items-center leading-tight">
                  <span className="col-span-5 text-slate-500 font-medium">KYC Status</span>
                  <span className="col-span-1 text-slate-400 text-center">:</span>
                  <div className="col-span-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-bold ${
                        kycStatus === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : kycStatus === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          kycStatus === 'Approved'
                            ? 'bg-emerald-500'
                            : kycStatus === 'Pending'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                      />
                      {kycStatus}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-1 leading-tight">
                  <span className="col-span-5 text-slate-500 font-medium">Submission Date</span>
                  <span className="col-span-1 text-slate-400 text-center">:</span>
                  <span className="col-span-6 font-semibold text-slate-800 truncate">{submissionDate}</span>
                </div>

                <div className="grid grid-cols-12 gap-1 leading-tight">
                  <span className="col-span-5 text-slate-500 font-medium">Identity Proof Type</span>
                  <span className="col-span-1 text-slate-400 text-center">:</span>
                  <span className="col-span-6 font-bold text-slate-900 truncate">{proofType}</span>
                </div>

                <div className="grid grid-cols-12 gap-1 leading-tight">
                  <span className="col-span-5 text-slate-500 font-medium">Remarks</span>
                  <span className="col-span-1 text-slate-400 text-center">:</span>
                  <span className="col-span-6 font-medium text-slate-600 truncate">{remarks}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              2. KYC Documents Section with Dashboard Effects
             ======================================================== */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
            {/* Decorative hover gradient flare */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            {/* Section Title */}
            <div className="relative z-10 flex items-center gap-2 pb-2 sm:pb-2.5 border-b border-slate-100 mb-3 text-indigo-600">
              <FileText className="w-3.5 h-3.5 stroke-[2.2]" />
              <h3 className="text-[13px] sm:text-[13.5px] font-extrabold text-slate-900 tracking-tight">
                KYC Documents
              </h3>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-3.5">
              {/* Left Container: Identity Proof (Aadhaar Card) (7 cols) */}
              <div className="md:col-span-7 rounded-xl border border-indigo-100/80 bg-white/80 p-2.5 sm:p-3 flex flex-col justify-between shadow-2xs">
                <h4 className="text-[12px] sm:text-[12.5px] font-black text-slate-900 mb-2">
                  Identity Proof ({proofType})
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-1">
                  {/* Front Image Mockup */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-700">Front Image</span>
                    <div
                      onClick={() => setActivePreviewDoc('front')}
                      className="aspect-16/10 rounded-xl bg-gradient-to-b from-amber-500/10 via-white to-emerald-500/10 border border-slate-300/80 p-2 flex flex-col justify-between cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all relative overflow-hidden group/img"
                    >
                      {/* Aadhaar Header Banner */}
                      <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-amber-500/80 flex items-center justify-center text-[6px] text-white font-bold">🇮🇳</div>
                          <div className="text-[6.5px] font-black text-slate-800 leading-none">
                            भारत सरकार<br /><span className="text-[6px] font-bold text-slate-600">Govt. of India</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <div className="w-2 h-2 rounded-full bg-rose-500/90" />
                          <span className="text-[7.5px] font-black text-rose-600 tracking-tighter">AADHAAR</span>
                        </div>
                      </div>

                      {/* Aadhaar Body */}
                      <div className="flex items-center gap-2 my-auto">
                        <img
                          src={userAvatar}
                          alt="ID Photo"
                          className="w-7 h-9 sm:w-8 sm:h-10 object-cover rounded border border-slate-300 shrink-0"
                        />
                        <div className="text-[7px] space-y-0.5 leading-tight flex-1 min-w-0">
                          <p className="font-extrabold text-slate-900 truncate">{userName}</p>
                          <p className="text-slate-500">DOB: 15/10/2000</p>
                          <p className="text-slate-500">Male</p>
                          <p className="font-mono font-black text-slate-900 tracking-wider text-[8px] pt-0.5 truncate">{aadharNumber}</p>
                        </div>
                        <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-slate-800 shrink-0 opacity-90" />
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-2xs opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-white text-[10.5px] font-bold gap-1">
                        <Search className="w-3 h-3" />
                        <span>Enlarge</span>
                      </div>
                    </div>

                    {/* View Front Image Button */}
                    <button
                      type="button"
                      onClick={() => setActivePreviewDoc('front')}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-indigo-200 bg-white hover:bg-indigo-50 active:bg-indigo-100 text-indigo-700 font-bold text-[11px] transition-colors cursor-pointer shadow-2xs"
                    >
                      <Search className="w-3 h-3 stroke-[2.2]" />
                      <span>View Front Image</span>
                    </button>
                  </div>

                  {/* Back Image Mockup */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-700">Back Image</span>
                    <div
                      onClick={() => setActivePreviewDoc('back')}
                      className="aspect-16/10 rounded-xl bg-gradient-to-b from-amber-500/10 via-white to-emerald-500/10 border border-slate-300/80 p-2 flex flex-col justify-between cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all relative overflow-hidden group/img"
                    >
                      {/* Aadhaar Header Banner */}
                      <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-amber-500/80 flex items-center justify-center text-[6px] text-white font-bold">🇮🇳</div>
                          <div className="text-[6.5px] font-black text-slate-800 leading-none">
                            भारत सरकार<br /><span className="text-[5.5px] font-bold text-slate-600">UIDAI</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <div className="w-2 h-2 rounded-full bg-rose-500/90" />
                          <span className="text-[7.5px] font-black text-rose-600 tracking-tighter">AADHAAR</span>
                        </div>
                      </div>

                      {/* Aadhaar Back Body */}
                      <div className="flex items-center gap-2 my-auto">
                        <div className="text-[6.5px] space-y-0.5 leading-tight flex-1 min-w-0">
                          <p className="font-bold text-slate-700">Address / पता:</p>
                          <p className="text-slate-500 line-clamp-2">123, MG Road, Bengaluru - 560001</p>
                          <p className="text-slate-400 text-[6px] font-bold pt-0.5">आम आदमी का अधिकार</p>
                        </div>
                        <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-slate-800 shrink-0 opacity-90" />
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-2xs opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-white text-[10.5px] font-bold gap-1">
                        <Search className="w-3 h-3" />
                        <span>Enlarge</span>
                      </div>
                    </div>

                    {/* View Back Image Button */}
                    <button
                      type="button"
                      onClick={() => setActivePreviewDoc('back')}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-indigo-200 bg-white hover:bg-indigo-50 active:bg-indigo-100 text-indigo-700 font-bold text-[11px] transition-colors cursor-pointer shadow-2xs"
                    >
                      <Search className="w-3 h-3 stroke-[2.2]" />
                      <span>View Back Image</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Container: PAN Card (5 cols) */}
              <div className="md:col-span-5 rounded-xl border border-indigo-100/80 bg-white/80 p-2.5 sm:p-3 flex flex-col justify-between shadow-2xs">
                <h4 className="text-[12px] sm:text-[12.5px] font-black text-slate-900 mb-2">
                  PAN Card
                </h4>

                <div className="flex flex-col gap-1.5">
                  <div
                    onClick={() => setActivePreviewDoc('pan')}
                    className="aspect-16/10 rounded-xl bg-gradient-to-br from-sky-100 via-sky-50 to-indigo-100 border border-slate-300/80 p-2 flex flex-col justify-between cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all relative overflow-hidden group/img"
                  >
                    {/* PAN Card Top Bar */}
                    <div className="flex items-center justify-between pb-1 border-b border-slate-300/70">
                      <div className="text-[6.5px] font-black text-slate-800 leading-tight">
                        आयकर विभाग<br />INCOME TAX DEPT
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700 flex items-center justify-center text-[5px] text-white font-bold">🏛️</div>
                      <div className="text-[6.5px] font-black text-slate-800 leading-tight text-right">
                        भारत सरकार<br />GOVT. OF INDIA
                      </div>
                    </div>

                    {/* Middle Info */}
                    <div className="flex items-center justify-between gap-2 my-auto">
                      <div className="text-[7px] space-y-0.5 leading-tight">
                        <p className="font-extrabold text-slate-900 truncate">{userName}</p>
                        <p className="font-mono font-black text-slate-900 tracking-wider text-[8.5px] pt-0.5">{panNumber}</p>
                        <p className="text-[6.5px] font-bold text-slate-600">PAN</p>
                      </div>
                      <img
                        src={userAvatar}
                        alt="PAN Photo"
                        className="w-7 h-9 sm:w-8 sm:h-10 object-cover rounded border border-slate-300 shrink-0"
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-2xs opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-white text-[10.5px] font-bold gap-1">
                      <Search className="w-3 h-3" />
                      <span>Enlarge</span>
                    </div>
                  </div>

                  {/* View Full Image Button */}
                  <button
                    type="button"
                    onClick={() => setActivePreviewDoc('pan')}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-indigo-200 bg-white hover:bg-indigo-50 active:bg-indigo-100 text-indigo-700 font-bold text-[11px] transition-colors cursor-pointer mt-0.5 shadow-2xs"
                  >
                    <Search className="w-3 h-3 stroke-[2.2]" />
                    <span>View Full Image</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              3. Verification Details Card with Dashboard Effects
             ======================================================== */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
            {/* Decorative hover gradient flare */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            {/* Section Title */}
            <div className="relative z-10 flex items-center gap-2 pb-2 sm:pb-2.5 border-b border-slate-100 mb-2 sm:mb-2.5 text-indigo-600">
              <FileText className="w-3.5 h-3.5 stroke-[2.2]" />
              <h3 className="text-[13px] sm:text-[13.5px] font-extrabold text-slate-900 tracking-tight">
                Verification Details
              </h3>
            </div>

            <div className="relative z-10">
              <label className="block text-[11px] sm:text-[11.5px] font-bold text-slate-700 mb-1">
                Internal Remarks (Optional)
              </label>
              <textarea
                value={internalRemarks}
                onChange={(e) => setInternalRemarks(e.target.value.slice(0, 500))}
                rows={2}
                placeholder="Enter remarks about this KYC submission..."
                className="w-full bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3 py-2 text-[11.5px] sm:text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all duration-200 resize-none min-h-[60px]"
              />
              <div className="text-right text-[10px] sm:text-[10.5px] text-slate-400 font-medium mt-0.5">
                {internalRemarks.length}/500
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            Bottom Action Footer (Responsive for Mobile & Desktop)
           ======================================================== */}
        <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 border-t border-slate-100 bg-white shrink-0">
          {/* Mobile View (< 640px): 3 Decision Buttons row + Full-width Close */}
          <div className="sm:hidden flex flex-col gap-2 w-full">
            <div className="grid grid-cols-3 gap-1.5 xs:gap-2 w-full">
              <button
                type="button"
                onClick={() => handleAction('Rejected', 'KYC submission rejected')}
                className="flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl border border-rose-300 bg-white active:bg-rose-50 text-rose-600 font-bold text-[11px] shadow-2xs active:scale-95 transition-all cursor-pointer truncate"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
                <span className="truncate">Reject</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('Pending', 'Resubmission requested')}
                className="flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl border border-indigo-300 bg-white active:bg-indigo-50 text-indigo-700 font-bold text-[11px] shadow-2xs active:scale-95 transition-all cursor-pointer truncate"
              >
                <RotateCw className="w-3.5 h-3.5 stroke-[2.2] shrink-0" />
                <span className="truncate">Resubmit</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('Approved', 'KYC submission approved')}
                className="flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-[11px] shadow-sm shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer truncate"
              >
                <Check className="w-3.5 h-3.5 stroke-[3] shrink-0" />
                <span className="truncate">Approve</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 rounded-xl border border-slate-300 bg-white active:bg-slate-100 text-slate-700 font-bold text-[12px] shadow-2xs transition-all cursor-pointer text-center"
            >
              Close
            </button>
          </div>

          {/* Desktop View (>= 640px): Close on Left, Decisions on Right */}
          <div className="hidden sm:flex items-center justify-between w-full gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-[12px] shadow-2xs transition-all cursor-pointer"
            >
              Close
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleAction('Rejected', 'KYC submission rejected')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-300 bg-white hover:bg-rose-50 text-rose-600 font-bold text-[12px] shadow-2xs active:scale-95 transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Reject</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('Pending', 'Resubmission requested')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-indigo-300 bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-[12px] shadow-2xs active:scale-95 transition-all cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Request Resubmission</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('Approved', 'KYC submission approved')}
                className="flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[12px] shadow-sm shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Approve</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          Enlarged Lightbox Zoom Preview Modal (Mobile & Desktop)
         ======================================================== */}
      {activePreviewDoc && (
        <div className="fixed inset-0 z-[10002] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-xl w-full bg-white rounded-2xl p-3.5 sm:p-4 shadow-2xl flex flex-col gap-3 animate-scale-in">
            {/* Lightbox compact header matching dashboard */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-[13px] sm:text-[14px] truncate">
                Document Preview: {activePreviewDoc === 'front' ? 'Aadhaar Card (Front)' : activePreviewDoc === 'back' ? 'Aadhaar Card (Back)' : 'PAN Card'}
              </h3>
              <button
                type="button"
                onClick={() => setActivePreviewDoc(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document display */}
            <div className="aspect-16/10 rounded-xl bg-slate-50 border border-slate-200 p-3 sm:p-5 flex flex-col justify-between shadow-inner">
              {activePreviewDoc === 'front' && (
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="font-extrabold text-slate-900 text-[11px] sm:text-xs truncate">भारत सरकार | Govt. of India</span>
                    <span className="font-black text-rose-600 text-[11px] sm:text-xs">AADHAAR</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 my-auto">
                    <img src={userAvatar} alt="Photo" className="w-11 h-14 sm:w-14 sm:h-18 object-cover rounded border border-slate-300" />
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <p className="font-black text-[13px] sm:text-sm text-slate-900 truncate">{userName}</p>
                      <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium">DOB: 15/10/2000</p>
                      <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium">Male</p>
                      <p className="font-mono font-black text-slate-900 text-[11px] sm:text-xs tracking-widest pt-1 truncate">{aadharNumber}</p>
                    </div>
                    <QrCode className="w-10 h-10 sm:w-14 sm:h-14 text-slate-800 ml-auto shrink-0" />
                  </div>
                </div>
              )}

              {activePreviewDoc === 'back' && (
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="font-extrabold text-slate-900 text-[11px] sm:text-xs truncate">UIDAI</span>
                    <span className="font-black text-rose-600 text-[11px] sm:text-xs">AADHAAR</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 my-auto">
                    <div className="space-y-0.5 text-[10px] sm:text-[11px] min-w-0 flex-1">
                      <p className="font-bold text-slate-800">Address:</p>
                      <p className="text-slate-600 line-clamp-2">123, MG Road, Bengaluru, Karnataka - 560001, India</p>
                      <p className="text-slate-400 font-semibold pt-1 text-[9px] sm:text-[10px]">आम आदमी का अधिकार</p>
                    </div>
                    <QrCode className="w-10 h-10 sm:w-14 sm:h-14 text-slate-800 ml-auto shrink-0" />
                  </div>
                </div>
              )}

              {activePreviewDoc === 'pan' && (
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="font-black text-slate-800 text-[10px] sm:text-[11px] truncate">आयकर विभाग | INCOME TAX DEPT</span>
                    <span className="font-black text-slate-800 text-[10px] sm:text-[11px]">GOVT. OF INDIA</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:gap-4 my-auto">
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <p className="font-black text-[13px] sm:text-sm text-slate-900 truncate">{userName}</p>
                      <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium">Father: ASHOK SHARMA</p>
                      <p className="font-mono font-black text-[11px] sm:text-sm text-slate-900 tracking-widest pt-1 truncate">{panNumber}</p>
                      <p className="text-[9px] sm:text-[10px] font-bold text-slate-700">Permanent Account Number</p>
                    </div>
                    <img src={userAvatar} alt="Photo" className="w-11 h-14 sm:w-14 sm:h-18 object-cover rounded border border-slate-300 shrink-0" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => setActivePreviewDoc(null)}
                className="w-full sm:w-auto px-4 py-1.5 rounded-lg border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50 cursor-pointer text-center"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
