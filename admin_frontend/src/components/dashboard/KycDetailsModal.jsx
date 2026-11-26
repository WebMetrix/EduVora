import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X, FileText, Check, Clock, Eye, CheckCircle2,
  AlertCircle, XCircle, Download, ZoomIn, ShieldCheck,
  Calendar, User, MapPin, Building
} from 'lucide-react';

export default function KycDetailsModal({ user, isOpen, onClose }) {
  const [selectedDocPreview, setSelectedDocPreview] = useState(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedDocPreview) {
          setSelectedDocPreview(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedDocPreview, onClose]);

  if (!isOpen || !user || typeof document === 'undefined') return null;

  // Resolve user fields with realistic defaults matching the provided design
  const userName = user.name || 'Rajesh Kumar';
  const userId = user.userId || 'EVU001248';
  const userAvatar = user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80';
  const userEmail = user.email || 'rajesh@gmail.com';
  const userMobile = user.mobile || '+91 98765 43210';
  const registeredOn = user.registeredOn || user.submissionDate || '31 Aug 2026, 10:24 AM';
  const kycSubmittedOn = user.submissionDate || '31 Aug 2026, 10:24 AM';
  const reviewedBy = user.reviewedBy && user.reviewedBy !== '-' ? user.reviewedBy : 'Neha Sharma';
  const reviewedOn = user.reviewedDate && user.reviewedDate !== '-' ? user.reviewedDate : '01 Sep 2026, 11:30 AM';
  const kycType = user.kycType || 'Aadhar Card';
  const aadharNumber = user.aadharNumber || user.documentNumber || 'XXXX XXXX 1234';
  const panNumber = user.panNumber || 'ABCDE1234F';
  const nameOnDoc = user.nameOnDocument || userName;
  const dob = user.dob || '15 Oct 2000';
  const gender = user.gender || 'Male';
  const address = user.address || '123, MG Road,\nAndheri West, Mumbai,\nMaharashtra - 400053';
  const status = user.status || 'Approved';

  // Remarks
  const remarksText = user.remarks || (
    status === 'Approved'
      ? 'Documents verified successfully. All details are valid.'
      : status === 'Rejected'
      ? user.rejectReason || 'Document verification rejected due to blurry submission.'
      : 'Documents are currently under review by compliance team.'
  );

  const remarkAuthor = user.remarkAuthor || (
    status === 'Approved'
      ? `${reviewedBy} (${reviewedOn})`
      : status === 'Rejected'
      ? `${reviewedBy} (${reviewedOn})`
      : 'Automated System (31 Aug 2026, 09:15 AM)'
  );

  // Status badge styling
  const renderStatusBadge = (st) => {
    switch (st) {
      case 'Approved':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60 whitespace-nowrap">
            Approved
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-bold bg-amber-50 text-amber-600 border border-amber-200/60 whitespace-nowrap">
            Under Review
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60 whitespace-nowrap">
            Rejected
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-bold bg-slate-100 text-slate-600 border border-slate-200/70 whitespace-nowrap">
            Pending
          </span>
        );
    }
  };

  // Document verification badge
  const renderDocVerifiedBadge = (isVerified) => (
    <span className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[9.5px] font-bold border whitespace-nowrap ${
      isVerified
        ? 'bg-emerald-50 text-emerald-600 border-emerald-200/60'
        : 'bg-amber-50 text-amber-600 border-amber-200/60'
    }`}>
      {isVerified ? '✓ Verified' : 'Pending'}
    </span>
  );

  return createPortal(
    <>
      {/* Modal Backdrop & Container */}
      <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Window Card - Responsive mobile bottom sheet & compact desktop window */}
        <div className="w-full h-[90vh] sm:h-[86vh] sm:max-h-[86vh] sm:max-w-[800px] bg-white rounded-t-3xl sm:rounded-[22px] flex flex-col shadow-2xl relative mt-auto sm:mt-0 overflow-hidden modal-slide-up sm:modal-fade-in z-10 border border-slate-200/90">
          {/* Mobile Drag Handle Bar */}
          <div
            onClick={onClose}
            className="w-full flex justify-center pt-2.5 pb-1 sm:hidden bg-white shrink-0 cursor-pointer"
          >
            <div className="w-10 h-1 bg-slate-200 rounded-full" />
          </div>

          {/* Compact Header - Matched with KycStatusModal dimensions, height & styling */}
          <div className="flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 border-b border-slate-100 bg-white shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <h2 className="text-[14px] sm:text-[15px] font-bold text-slate-900 truncate">
                KYC Details
              </h2>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline truncate">
                • View complete KYC information and documents of the user
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700 cursor-pointer shrink-0"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content Body with Compact Spacing to Minimize Vertical Scroll */}
          <div className="flex-1 min-h-0 overflow-y-auto p-2.5 sm:p-3.5 space-y-2 sm:space-y-2.5 custom-scrollbar bg-slate-50/30">
            {/* Top User Profile Box with Dashboard Glassmorphism Effects */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3">
              {/* Decorative hover gradient flare */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

              {/* User Avatar + Name + ID + Status */}
              <div className="relative z-10 flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-indigo-100 shadow-2xs shrink-0 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex flex-col min-w-0 flex-1 sm:flex-initial">
                  <div className="flex items-center justify-between sm:justify-start gap-2">
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-900 leading-tight group-hover:text-indigo-950 transition-colors truncate">
                      {userName}
                    </h3>
                    <div className="sm:hidden">{renderStatusBadge(status)}</div>
                  </div>
                  <span className="text-[10.5px] sm:text-[11px] text-slate-400 font-medium">
                    {userId}
                  </span>
                  <div className="hidden sm:block mt-1">
                    {renderStatusBadge(status)}
                  </div>
                </div>
              </div>

              {/* Meta Details: 3 neat items (Contact, Dates, Reviewer) on Mobile & Desktop */}
              <div className="relative z-10 w-full sm:w-auto grid grid-cols-3 gap-1.5 sm:gap-4 pt-1.5 sm:pt-0 border-t border-slate-100 sm:border-t-0 text-[11px]">
                <div className="bg-slate-50/70 sm:bg-transparent rounded-lg p-1.5 sm:p-0 min-w-0">
                  <span className="text-[8.5px] sm:text-[9.5px] font-semibold text-slate-400 block uppercase tracking-wider">Contact</span>
                  <span className="font-bold text-slate-800 text-[10px] sm:text-[11.5px] block truncate" title={userEmail}>{userEmail}</span>
                  <span className="text-[9.5px] sm:text-[11px] font-medium text-slate-600 block mt-0.5 truncate">{userMobile}</span>
                </div>
                <div className="bg-slate-50/70 sm:bg-transparent rounded-lg p-1.5 sm:p-0 min-w-0">
                  <span className="text-[8.5px] sm:text-[9.5px] font-semibold text-slate-400 block uppercase tracking-wider">Registered</span>
                  <span className="font-bold text-slate-800 text-[10px] sm:text-[11.5px] block truncate">{registeredOn}</span>
                  <span className="text-[9px] sm:text-[10.5px] text-slate-500 block mt-0.5 truncate">Sub: {kycSubmittedOn}</span>
                </div>
                <div className="bg-slate-50/70 sm:bg-transparent rounded-lg p-1.5 sm:p-0 min-w-0">
                  <span className="text-[8.5px] sm:text-[9.5px] font-semibold text-slate-400 block uppercase tracking-wider">Reviewed</span>
                  <span className="font-bold text-slate-800 text-[10px] sm:text-[11.5px] block truncate">{reviewedBy}</span>
                  <span className="text-[9px] sm:text-[10.5px] text-slate-500 block mt-0.5 truncate">{reviewedOn}</span>
                </div>
              </div>
            </div>

            {/* KYC Information Card with Dashboard Effects */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
              {/* Decorative hover gradient flare */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

              {/* Section Header */}
              <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-2 border-b border-slate-100/90">
                <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <FileText className="w-3 h-3" />
                </div>
                <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                  KYC Information
                </h4>
              </div>

              {/* 2-Column Info Grid */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-6 text-[11px] sm:text-[11.5px]">
                {/* Left Column */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between sm:justify-start gap-2 sm:gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 sm:w-32 shrink-0">KYC Type</span>
                    <span className="font-bold text-slate-800 text-right sm:text-left">{kycType}</span>
                  </div>
                  <div className="flex items-baseline justify-between sm:justify-start gap-2 sm:gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 sm:w-32 shrink-0">Aadhar Number</span>
                    <span className="font-bold text-slate-800 text-right sm:text-left">{aadharNumber}</span>
                  </div>
                  <div className="flex items-baseline justify-between sm:justify-start gap-2 sm:gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-28 sm:w-32 shrink-0">Name on Document</span>
                    <span className="font-bold text-slate-800 text-right sm:text-left">{nameOnDoc}</span>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between sm:justify-start gap-2 sm:gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-24 shrink-0">Date of Birth</span>
                    <span className="font-bold text-slate-800 text-right sm:text-left">{dob}</span>
                  </div>
                  <div className="flex items-baseline justify-between sm:justify-start gap-2 sm:gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-24 shrink-0">Gender</span>
                    <span className="font-bold text-slate-800 text-right sm:text-left">{gender}</span>
                  </div>
                  <div className="flex items-start justify-between sm:justify-start gap-2 sm:gap-3">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-[11px] w-24 shrink-0 pt-0.5">Address</span>
                    <span className="font-bold text-slate-800 leading-snug whitespace-pre-line text-right sm:text-left flex-1">
                      {address}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Uploaded Documents Card (Swipeable on Mobile, 3 Cols on Desktop) */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
              {/* Decorative hover gradient flare */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

              {/* Section Header with swipe hint on mobile */}
              <div className="relative z-10 flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100/90">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <FileText className="w-3 h-3" />
                  </div>
                  <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                    Uploaded Documents
                  </h4>
                </div>
                <span className="text-[9px] font-medium text-slate-400 sm:hidden">
                  Swipe horizontally (3)
                </span>
              </div>

              {/* 3 Documents Grid on Desktop / Smooth Swipeable Carousel on Mobile */}
              <div className="relative z-10 flex sm:grid sm:grid-cols-3 gap-2 sm:gap-2.5 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 snap-x snap-mandatory custom-scrollbar -mx-0.5 px-0.5">
                {/* 1. Aadhar Card (Front) */}
                <div className="w-[78vw] max-w-[250px] sm:w-auto shrink-0 snap-center border border-slate-200/90 rounded-xl p-2 bg-white flex flex-col gap-1.5 shadow-2xs hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group/doc">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] font-bold text-slate-800 truncate">
                      Aadhar Card (Front)
                    </span>
                    {renderDocVerifiedBadge(status === 'Approved')}
                  </div>

                  {/* Card Visual Graphic */}
                  <div className="relative aspect-[1.58/1] w-full rounded-md bg-white border border-slate-200 overflow-hidden shadow-2xs p-1.5 flex flex-col justify-between select-none">
                    {/* Tricolor top header */}
                    <div className="flex items-center justify-between border-b border-slate-200/70 pb-0.5">
                      <div className="flex items-center gap-1">
                        <div className="w-2.5 h-3 bg-slate-700 rounded-xs flex items-center justify-center text-[6px] text-white">
                          🏛
                        </div>
                        <div className="leading-none text-[5.5px] font-bold text-slate-800">
                          <div>भारत सरकार</div>
                          <div className="text-[4.5px] text-slate-500 font-semibold">Government of India</div>
                        </div>
                      </div>
                      <div className="h-1 w-6 rounded-xs bg-linear-to-r from-orange-500 via-white to-emerald-600 border border-slate-200" />
                    </div>

                    {/* Middle: Photo + Info + QR */}
                    <div className="flex items-center justify-between gap-1 my-0.5">
                      <img
                        src={userAvatar}
                        alt="Aadhaar Photo"
                        className="w-7 h-9 rounded-xs object-cover border border-slate-300 shrink-0"
                      />
                      <div className="flex-1 min-w-0 pl-1 leading-tight text-[6px] text-slate-700">
                        <div className="font-extrabold text-slate-900 text-[6.5px] truncate">{userName}</div>
                        <div className="mt-0.5 text-[5px]">DOB: {dob}</div>
                        <div className="text-[5px]">{gender}</div>
                      </div>
                      <div className="w-7 h-7 border border-slate-400 p-0.5 bg-white shrink-0 flex flex-col justify-between">
                        <div className="flex justify-between">
                          <div className="w-1.5 h-1.5 bg-slate-900 border border-white" />
                          <div className="w-1.5 h-1.5 bg-slate-900 border border-white" />
                        </div>
                        <div className="w-1 h-1 bg-slate-900 self-center" />
                        <div className="flex justify-between">
                          <div className="w-1.5 h-1.5 bg-slate-900 border border-white" />
                          <div className="w-1.5 h-1.5 bg-slate-900 self-end" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Red bar + Aadhaar number */}
                    <div className="border-t-2 border-red-600 pt-0.5 text-center leading-none">
                      <div className="font-mono font-extrabold text-[7.5px] tracking-wider text-slate-900">
                        {aadharNumber}
                      </div>
                      <div className="text-[5px] font-bold text-red-600 mt-0.5">
                        मेरा <span className="text-slate-800">आधार</span>, मेरी पहचान
                      </div>
                    </div>
                  </div>

                  {/* View Full Image Action */}
                  <button
                    type="button"
                    onClick={() => setSelectedDocPreview({
                      title: 'Aadhar Card (Front)',
                      type: 'aadhar-front',
                      user: userName,
                      number: aadharNumber
                    })}
                    className="flex items-center justify-center gap-1 text-indigo-600 hover:text-indigo-800 text-[10px] sm:text-[10.5px] font-bold py-0.5 hover:bg-indigo-50/60 rounded-md transition-colors cursor-pointer mt-auto"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View Full Image</span>
                  </button>
                </div>

                {/* 2. Aadhar Card (Back) */}
                <div className="w-[78vw] max-w-[250px] sm:w-auto shrink-0 snap-center border border-slate-200/90 rounded-xl p-2 bg-white flex flex-col gap-1.5 shadow-2xs hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group/doc">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] font-bold text-slate-800 truncate">
                      Aadhar Card (Back)
                    </span>
                    {renderDocVerifiedBadge(status === 'Approved')}
                  </div>

                  {/* Card Visual Graphic */}
                  <div className="relative aspect-[1.58/1] w-full rounded-md bg-white border border-slate-200 overflow-hidden shadow-2xs p-1.5 flex flex-col justify-between select-none">
                    {/* UIDAI Header + Sun Logo */}
                    <div className="flex items-center justify-between border-b border-slate-200/70 pb-0.5">
                      <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-600 flex items-center justify-center text-[6px] text-white">
                          ☀
                        </div>
                        <div className="leading-none text-[5.5px] font-bold text-slate-800">
                          <div>भारतीय विशिष्ट पहचान प्राधिकरण</div>
                          <div className="text-[4px] text-slate-500 font-semibold">UIDAI</div>
                        </div>
                      </div>
                      <div className="text-red-600 font-black text-[7.5px] tracking-tight">AADHAAR</div>
                    </div>

                    {/* Middle: Address + Large QR */}
                    <div className="flex items-center justify-between gap-1.5 my-0.5">
                      <div className="flex-1 leading-tight text-[5px] text-slate-700">
                        <span className="font-bold text-slate-900 block text-[5.5px]">Address:</span>
                        <div className="text-slate-600 leading-tight">
                          123, MG Road,<br />
                          Andheri West, Mumbai
                        </div>
                      </div>
                      <div className="w-8 h-8 border border-slate-400 p-0.5 bg-white shrink-0 flex flex-col justify-between">
                        <div className="flex justify-between">
                          <div className="w-2 h-2 bg-slate-900 border border-white" />
                          <div className="w-2 h-2 bg-slate-900 border border-white" />
                        </div>
                        <div className="w-1.5 h-1.5 bg-slate-900 self-center" />
                        <div className="flex justify-between">
                          <div className="w-2 h-2 bg-slate-900 border border-white" />
                          <div className="w-1.5 h-1.5 bg-slate-900 self-end" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Red line + Aadhaar number */}
                    <div className="border-t border-slate-300 pt-0.5 text-center leading-none">
                      <div className="font-mono font-extrabold text-[7.5px] tracking-wider text-slate-900">
                        {aadharNumber}
                      </div>
                    </div>
                  </div>

                  {/* View Full Image Action */}
                  <button
                    type="button"
                    onClick={() => setSelectedDocPreview({
                      title: 'Aadhar Card (Back)',
                      type: 'aadhar-back',
                      user: userName,
                      number: aadharNumber
                    })}
                    className="flex items-center justify-center gap-1 text-indigo-600 hover:text-indigo-800 text-[10px] sm:text-[10.5px] font-bold py-0.5 hover:bg-indigo-50/60 rounded-md transition-colors cursor-pointer mt-auto"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View Full Image</span>
                  </button>
                </div>

                {/* 3. PAN Card */}
                <div className="w-[78vw] max-w-[250px] sm:w-auto shrink-0 snap-center border border-slate-200/90 rounded-xl p-2 bg-white flex flex-col gap-1.5 shadow-2xs hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group/doc">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] font-bold text-slate-800 truncate">
                      PAN Card
                    </span>
                    {renderDocVerifiedBadge(status === 'Approved')}
                  </div>

                  {/* Card Visual Graphic */}
                  <div className="relative aspect-[1.58/1] w-full rounded-md bg-linear-to-br from-sky-200 via-sky-100 to-sky-200 border border-sky-300 overflow-hidden shadow-2xs p-1.5 flex flex-col justify-between select-none">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-sky-300/80 pb-0.5">
                      <div className="leading-tight text-[5px] font-bold text-slate-900">
                        <div>आयकर विभाग</div>
                        <div className="text-[4px] text-slate-600">INCOME TAX DEPT</div>
                      </div>
                      <div className="w-2.5 h-2.5 bg-slate-800 rounded-full flex items-center justify-center text-[5px] text-white">
                        🏛
                      </div>
                      <div className="leading-tight text-[5px] font-bold text-slate-900 text-right">
                        <div>भारत सरकार</div>
                        <div className="text-[4px] text-slate-600">GOVT OF INDIA</div>
                      </div>
                    </div>

                    {/* Middle: Details + Photo */}
                    <div className="flex items-center justify-between gap-1 my-0.5">
                      <div className="flex-1 min-w-0 leading-tight">
                        <div className="font-mono font-extrabold text-slate-950 text-[7px] tracking-wider">
                          {panNumber}
                        </div>
                        <div className="font-bold text-slate-900 text-[6.5px] mt-0.5 truncate uppercase">
                          {userName}
                        </div>
                        <div className="text-[4.5px] text-slate-600">
                          Permanent Account Number
                        </div>
                      </div>
                      <img
                        src={userAvatar}
                        alt="PAN Photo"
                        className="w-7 h-9 rounded-xs object-cover border border-sky-400 shrink-0"
                      />
                    </div>

                    {/* Bottom: Bar */}
                    <div className="text-[4px] text-slate-500 font-mono tracking-widest text-center border-t border-sky-300/70 pt-0.5">
                      •••• •••• ••••
                    </div>
                  </div>

                  {/* View Full Image Action */}
                  <button
                    type="button"
                    onClick={() => setSelectedDocPreview({
                      title: 'PAN Card',
                      type: 'pan-card',
                      user: userName,
                      number: panNumber
                    })}
                    className="flex items-center justify-center gap-1 text-indigo-600 hover:text-indigo-800 text-[10px] sm:text-[10.5px] font-bold py-0.5 hover:bg-indigo-50/60 rounded-md transition-colors cursor-pointer mt-auto"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View Full Image</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row: Verification Timeline (Left) & Remarks (Right) with Dashboard Effects */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-2.5">
              {/* Verification Timeline (7 Cols on desktop, full width on mobile) */}
              <div className="relative overflow-hidden sm:col-span-7 rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(16,185,129,0.10)] hover:border-emerald-200 transition-all duration-300 group flex flex-col justify-between">
                {/* Decorative flare */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

                <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-1 border-b border-slate-100/90">
                  <div className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Clock className="w-3 h-3" />
                  </div>
                  <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-emerald-950 transition-colors">
                    Verification Timeline
                  </h4>
                </div>

                {/* Horizontal Stepper Timeline */}
                <div className="relative z-10 pt-1 pb-1 px-2 sm:px-3">
                  <div className="flex items-center justify-between relative">
                    {/* Connecting Green Line */}
                    <div className="absolute top-[5px] sm:top-[6px] left-4 sm:left-6 right-4 sm:right-6 h-[2px] bg-emerald-500 -z-0" />

                    {/* Step 1: Submitted */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 ring-2 sm:ring-3 ring-emerald-100 shadow-xs" />
                      <span className="font-bold text-[10px] sm:text-[11px] text-slate-800 mt-1 block">
                        Submitted
                      </span>
                      <span className="text-[8.5px] sm:text-[9.5px] text-slate-400 font-medium leading-tight block">
                        31 Aug, 10:24 AM
                      </span>
                    </div>

                    {/* Step 2: Under Review */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 ring-2 sm:ring-3 ring-emerald-100 shadow-xs" />
                      <span className="font-bold text-[10px] sm:text-[11px] text-slate-800 mt-1 block">
                        Under Review
                      </span>
                      <span className="text-[8.5px] sm:text-[9.5px] text-slate-400 font-medium leading-tight block">
                        31 Aug, 02:15 PM
                      </span>
                    </div>

                    {/* Step 3: Approved */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 ring-2 sm:ring-3 ring-emerald-100 shadow-xs" />
                      <span className="font-bold text-[10px] sm:text-[11px] text-slate-800 mt-1 block">
                        Approved
                      </span>
                      <span className="text-[8.5px] sm:text-[9.5px] text-slate-400 font-medium leading-tight block">
                        01 Sep, 11:30 AM
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remarks (5 Cols on desktop, full width on mobile) */}
              <div className="relative overflow-hidden sm:col-span-5 rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group flex flex-col justify-between">
                {/* Decorative flare */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

                <div>
                  <div className="relative z-10 flex items-center gap-1.5 pb-1.5 mb-1 border-b border-slate-100/90">
                    <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <FileText className="w-3 h-3" />
                    </div>
                    <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                      Remarks
                    </h4>
                  </div>

                  <p className="relative z-10 text-[10.5px] sm:text-[11.5px] text-slate-700 leading-snug font-normal">
                    {remarksText}
                  </p>
                </div>

                <div className="relative z-10 text-[9px] sm:text-[10px] text-slate-400 font-medium pt-1.5 mt-1.5 border-t border-slate-100/80">
                  — {remarkAuthor}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Image Preview Lightbox */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-[20000] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="fixed inset-0" onClick={() => setSelectedDocPreview(null)} />
          <div className="relative z-10 max-w-lg w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden modal-slide-up">
            <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="min-w-0 pr-2">
                <h4 className="font-bold text-slate-900 text-[12.5px] sm:text-[13px] truncate">
                  {selectedDocPreview.title}
                </h4>
                <p className="text-[10px] sm:text-[10.5px] text-slate-500 truncate">
                  {userName} ({userId}) • {selectedDocPreview.number}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDocPreview(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 sm:p-5 bg-slate-100/70 flex flex-col items-center justify-center">
              {/* Enlarged Card Rendering */}
              {selectedDocPreview.type === 'aadhar-front' && (
                <div className="w-full max-w-sm aspect-[1.58/1] rounded-xl bg-white border border-slate-300 shadow-lg p-3 sm:p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-5 bg-slate-800 rounded-xs flex items-center justify-center text-[10px] text-white">
                        🏛
                      </div>
                      <div className="leading-tight text-[8px] sm:text-[8.5px] font-bold text-slate-800">
                        <div>भारत सरकार</div>
                        <div className="text-[6.5px] sm:text-[7px] text-slate-500 font-medium">Government of India</div>
                      </div>
                    </div>
                    <div className="h-1.5 w-10 rounded-xs bg-linear-to-r from-orange-500 via-white to-emerald-600 border border-slate-200" />
                  </div>

                  <div className="flex items-center justify-between gap-2.5 my-1.5">
                    <img
                      src={userAvatar}
                      alt="Aadhaar Front Large"
                      className="w-12 h-16 sm:w-14 sm:h-18 rounded-xs object-cover border-2 border-slate-300 shrink-0"
                    />
                    <div className="flex-1 text-[9.5px] sm:text-[10px] text-slate-800">
                      <div className="font-extrabold text-[11px] sm:text-[11.5px] text-slate-900 truncate">{userName}</div>
                      <div className="mt-0.5 sm:mt-1">DOB: {dob}</div>
                      <div>Gender: {gender}</div>
                    </div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 border border-slate-400 p-0.5 bg-white shrink-0 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-slate-900 border border-white" />
                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-slate-900 border border-white" />
                      </div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-900 self-center" />
                      <div className="flex justify-between">
                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-slate-900 border border-white" />
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-900 self-end" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-red-600 pt-1 text-center">
                    <div className="font-mono font-extrabold text-[11.5px] sm:text-[12.5px] tracking-widest text-slate-900">
                      {aadharNumber}
                    </div>
                    <div className="text-[7.5px] sm:text-[8px] font-bold text-red-600 mt-0.5">
                      मेरा आधार, मेरी पहचान
                    </div>
                  </div>
                </div>
              )}

              {selectedDocPreview.type === 'aadhar-back' && (
                <div className="w-full max-w-sm aspect-[1.58/1] rounded-xl bg-white border border-slate-300 shadow-lg p-3 sm:p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-[8px] text-white">
                        ☀
                      </div>
                      <div className="leading-tight text-[8px] sm:text-[8.5px] font-bold text-slate-800">
                        <div>भारतीय विशिष्ट पहचान प्राधिकरण</div>
                        <div className="text-[6px] sm:text-[6.5px] text-slate-500 font-medium">UIDAI</div>
                      </div>
                    </div>
                    <div className="text-red-600 font-black text-[10px] sm:text-[11px] tracking-tight">AADHAAR</div>
                  </div>

                  <div className="flex items-center justify-between gap-2.5 my-1.5">
                    <div className="flex-1 text-[8.5px] sm:text-[9px] text-slate-800 leading-snug">
                      <span className="font-bold text-[9px] sm:text-[9.5px] block mb-0.5">Address:</span>
                      {address}
                    </div>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 border border-slate-400 p-0.5 bg-white shrink-0 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-slate-900 border border-white" />
                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-slate-900 border border-white" />
                      </div>
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-slate-900 self-center" />
                      <div className="flex justify-between">
                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-slate-900 border border-white" />
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-slate-900 self-end" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-300 pt-1 text-center">
                    <div className="font-mono font-extrabold text-[11.5px] sm:text-[12.5px] tracking-widest text-slate-900">
                      {aadharNumber}
                    </div>
                  </div>
                </div>
              )}

              {selectedDocPreview.type === 'pan-card' && (
                <div className="w-full max-w-sm aspect-[1.58/1] rounded-xl bg-linear-to-br from-sky-200 via-sky-100 to-sky-200 border border-sky-300 shadow-lg p-3 sm:p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-sky-300 pb-1">
                    <div className="leading-tight text-[7px] sm:text-[7.5px] font-bold text-slate-900">
                      <div>आयकर विभाग</div>
                      <div className="text-[5.5px] sm:text-[6px] text-slate-600">INCOME TAX DEPARTMENT</div>
                    </div>
                    <div className="w-3.5 h-3.5 bg-slate-800 rounded-full flex items-center justify-center text-[7px] text-white">
                      🏛
                    </div>
                    <div className="leading-tight text-[7px] sm:text-[7.5px] font-bold text-slate-900 text-right">
                      <div>भारत सरकार</div>
                      <div className="text-[5.5px] sm:text-[6px] text-slate-600">GOVT. OF INDIA</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2.5 my-1.5">
                    <div className="flex-1 leading-tight min-w-0">
                      <div className="font-mono font-extrabold text-slate-950 text-[10.5px] sm:text-[11.5px] tracking-wider truncate">
                        {panNumber}
                      </div>
                      <div className="font-bold text-slate-900 text-[9px] sm:text-[10px] mt-0.5 sm:mt-1 uppercase truncate">
                        {userName}
                      </div>
                      <div className="text-[7px] sm:text-[7.5px] text-slate-600 mt-0.5">
                        Permanent Account Number
                      </div>
                      <div className="mt-1 sm:mt-1.5 font-serif italic text-[8.5px] sm:text-[9px] text-slate-800 border-b border-slate-400 w-16 sm:w-20 truncate">
                        {userName}
                      </div>
                    </div>
                    <img
                      src={userAvatar}
                      alt="PAN Card Large"
                      className="w-12 h-16 sm:w-14 sm:h-18 rounded-xs object-cover border-2 border-sky-400 shrink-0"
                    />
                  </div>

                  <div className="text-[6.5px] sm:text-[7px] text-slate-500 font-mono tracking-widest text-center border-t border-sky-300/80 pt-1">
                    •••• •••• •••• ••••
                  </div>
                </div>
              )}
            </div>

            <div className="px-3.5 sm:px-4 py-2 border-t border-slate-100 flex items-center justify-between bg-white text-[10.5px] sm:text-[11px]">
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> High-Resolution Verified Copy
              </span>
              <button
                type="button"
                onClick={() => setSelectedDocPreview(null)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
