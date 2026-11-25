import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  X, AlertTriangle, ShieldAlert, ClipboardCheck, ChevronDown,
  ShoppingBag, FileText, User, Users, CheckCircle2, Clock, Plus
} from 'lucide-react';

const SEVERITY_STYLE = {
  Critical: { pill: 'bg-rose-100/80 text-rose-700 border-rose-200', dot: 'bg-rose-600' },
  High: { pill: 'bg-rose-50 text-rose-600 border-rose-200/80', dot: 'bg-rose-500' },
  Medium: { pill: 'bg-amber-50 text-amber-700 border-amber-200/80', dot: 'bg-amber-400' },
  Low: { pill: 'bg-sky-50 text-sky-700 border-sky-200/80', dot: 'bg-sky-500' },
};

const STATUS_STYLE = {
  Open: { pill: 'bg-rose-50 text-rose-600 border-rose-200/80', dot: 'bg-rose-500' },
  'Under Investigation': {
    pill: 'bg-amber-50 text-amber-700 border-amber-200/80',
    dot: 'bg-amber-400',
  },
  Resolved: {
    pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    dot: 'bg-emerald-500',
  },
  Dismissed: {
    pill: 'bg-slate-100 text-slate-600 border-slate-200',
    dot: 'bg-slate-400',
  },
};

export default function ExceptionDetailsModal({
  exceptionItem,
  isOpen,
  onClose,
  onUpdateException,
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [noteInput, setNoteInput] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (exceptionItem) {
      setActiveTab('Overview');
      setNoteInput('');
      setNotes(exceptionItem.notes || []);
    }
  }, [exceptionItem]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !exceptionItem || typeof document === 'undefined') return null;

  const sevStyle = SEVERITY_STYLE[exceptionItem.severity] || SEVERITY_STYLE.High;
  const stStyle = STATUS_STYLE[exceptionItem.status] || STATUS_STYLE.Open;

  const tabs = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Member', label: 'Member Details' },
    { id: 'Sponsor', label: 'Sponsor Details' },
    { id: 'Evidence', label: 'Evidence' },
    { id: 'Notes', label: 'Notes' },
    { id: 'Audit', label: 'Audit' },
  ];

  const handleAddNote = (e) => {
    e.preventDefault();
    const trimmed = noteInput.trim();
    if (!trimmed) return;
    const newNote = {
      id: Date.now(),
      author: 'Admin User',
      text: trimmed,
      time: 'Just now',
    };
    setNotes((prev) => [newNote, ...prev]);
    setNoteInput('');
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fade-in">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Window matching Dashboard & KYC Popup Windows (sm:max-w-[800px], sm:h-[86vh]) */}
      <div className="w-full h-[90vh] sm:h-[86vh] sm:max-h-[86vh] sm:max-w-[800px] bg-white rounded-t-3xl sm:rounded-[22px] flex flex-col shadow-2xl relative mt-auto sm:mt-0 overflow-hidden animate-slide-up sm:animate-fade-in z-10 border border-slate-200/90 pb-safe">
        {/* Mobile Drag Handle */}
        <div
          onClick={onClose}
          className="w-full flex justify-center pt-2.5 pb-1 sm:hidden bg-white shrink-0 cursor-pointer"
        >
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Compact Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-[14px] sm:text-[15px] font-bold text-slate-900 truncate">
              Exception Details
            </h2>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline truncate">
              • Investigate referral exception details, evidence events, and resolution status
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700 cursor-pointer shrink-0"
            title="Close"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-2.5 sm:p-4 space-y-2.5 sm:space-y-3 custom-scrollbar overscroll-contain bg-slate-50/30">
          {/* Top Alert Summary Banner + Status/Admin Selectors */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 space-y-3">
            {/* Soft rose/amber alert banner matching Image 2 */}
            <div
              className={`rounded-xl border p-3 flex items-start gap-3 ${
                exceptionItem.status === 'Resolved'
                  ? 'bg-emerald-50/60 border-emerald-200/70'
                  : 'bg-rose-50/70 border-rose-200/70'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  exceptionItem.status === 'Resolved'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-rose-100 text-rose-500'
                }`}
              >
                {exceptionItem.status === 'Resolved' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[13px] font-black text-slate-900">{exceptionItem.id}</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${sevStyle.pill}`}
                  >
                    {exceptionItem.severity}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${stStyle.pill}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${stStyle.dot}`} />
                    {exceptionItem.status}
                  </span>
                </div>
                <h3 className="text-[13.5px] sm:text-[14.5px] font-black text-slate-900 mt-0.5">
                  {exceptionItem.exceptionType}
                </h3>
                <p className="text-[11.5px] font-medium text-slate-600 mt-0.5 leading-snug">
                  {exceptionItem.shortSummary}
                </p>
              </div>
            </div>

            {/* Interactive Status & Assigned Admin Dropdowns matching Image 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Status</label>
                <div className="relative">
                  <select
                    value={exceptionItem.status}
                    onChange={(e) =>
                      onUpdateException?.(exceptionItem.id, { status: e.target.value })
                    }
                    className="w-full h-9.5 bg-white border border-slate-200/90 hover:border-indigo-300 focus:border-indigo-500 rounded-xl pl-3 pr-8 text-[12px] font-bold text-slate-800 appearance-none focus:outline-none cursor-pointer shadow-2xs"
                  >
                    <option value="Open">Open</option>
                    <option value="Under Investigation">Under Investigation</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Dismissed">Dismissed</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  Assigned Admin
                </label>
                <div className="relative">
                  <select
                    value={exceptionItem.assignedAdmin}
                    onChange={(e) =>
                      onUpdateException?.(exceptionItem.id, { assignedAdmin: e.target.value })
                    }
                    className="w-full h-9.5 bg-white border border-slate-200/90 hover:border-indigo-300 focus:border-indigo-500 rounded-xl pl-3 pr-8 text-[12px] font-bold text-slate-800 appearance-none focus:outline-none cursor-pointer shadow-2xs"
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Admin User">Admin User</option>
                    <option value="System">System</option>
                    <option value="Compliance Team">Compliance Team</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* 6 Tabs Navigation Bar */}
          <div className="flex items-center gap-1 border-b border-slate-200/80 overflow-x-auto no-scrollbar pb-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 text-[11.5px] sm:text-[12px] font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/80 border border-indigo-100 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB 1: Overview (Image 2 content arranged for wide modal) */}
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3 items-stretch">
              {/* Exception Summary Card */}
              <div className="md:col-span-7 relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                <div className="relative z-10 flex items-center gap-1.5 pb-2 mb-2.5 border-b border-slate-100/90">
                  <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-3 h-3" />
                  </div>
                  <h4 className="text-[12.5px] font-bold text-slate-900">Exception Summary</h4>
                </div>

                <div className="relative z-10 space-y-2.5 text-[11.5px]">
                  <div className="grid grid-cols-12 gap-2">
                    <span className="col-span-4 text-slate-500 font-medium">Detected Date</span>
                    <span className="col-span-8 font-bold text-slate-800">
                      {exceptionItem.detectedDate}, {exceptionItem.detectedTime}
                    </span>
                  </div>
                  <div className="grid grid-cols-12 gap-2">
                    <span className="col-span-4 text-slate-500 font-medium">Exception Type</span>
                    <span className="col-span-8 font-bold text-slate-900">
                      {exceptionItem.exceptionType}
                    </span>
                  </div>
                  <div className="grid grid-cols-12 gap-2">
                    <span className="col-span-4 text-slate-500 font-medium">Description</span>
                    <span className="col-span-8 font-medium text-slate-700 leading-relaxed">
                      {exceptionItem.description}
                    </span>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <span className="col-span-4 text-slate-500 font-medium">Severity</span>
                    <div className="col-span-8">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${sevStyle.pill}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${sevStyle.dot}`} />
                        {exceptionItem.severity}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <span className="col-span-4 text-slate-500 font-medium">Current Status</span>
                    <div className="col-span-8">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${stStyle.pill}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${stStyle.dot}`} />
                        {exceptionItem.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Action Card */}
              <div className="md:col-span-5 relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 pb-2 mb-2.5 border-b border-slate-100/90">
                    <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0">
                      <ClipboardCheck className="w-3 h-3" />
                    </div>
                    <h4 className="text-[12.5px] font-bold text-slate-900">Recommended Action</h4>
                  </div>
                  <p className="text-[11.5px] font-medium text-slate-600 leading-relaxed">
                    {exceptionItem.recommendedAction}
                  </p>
                </div>

                <div className="relative z-10 pt-3 mt-3 border-t border-slate-100 flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('Evidence')}
                    className="w-full py-1.5 px-3 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/70 text-indigo-700 text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    Inspect Evidence Timeline
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose?.();
                      navigate('/network/genealogy-tree');
                    }}
                    className="w-full py-1.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    Open in Genealogy Tree
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Member Details */}
          {activeTab === 'Member' && (
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] space-y-3 text-[12px]">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <User className="w-4 h-4 text-indigo-600" />
                <h4 className="text-[13px] font-black text-slate-900">Affected Member Details</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Member ID</span>
                  <span className="font-bold text-indigo-700">{exceptionItem.memberId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Full Name</span>
                  <span className="font-bold text-slate-900">{exceptionItem.memberName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Detected Date</span>
                  <span className="font-semibold text-slate-800">{exceptionItem.detectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Account Status</span>
                  <span className="font-bold text-emerald-700">Active</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Sponsor Details */}
          {activeTab === 'Sponsor' && (
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] space-y-3 text-[12px]">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Users className="w-4 h-4 text-indigo-600" />
                <h4 className="text-[13px] font-black text-slate-900">Sponsor Reference</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Sponsor ID</span>
                  <span className="font-bold text-slate-900">{exceptionItem.sponsorId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sponsor Name / State</span>
                  <span className="font-semibold text-rose-600">
                    {exceptionItem.sponsorSub || 'Valid'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Evidence (Exact match to Image 3: Referral Events timeline + Related Records) */}
          {activeTab === 'Evidence' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3 items-stretch">
              {/* Left: Referral Events Vertical Timeline */}
              <div className="md:col-span-7 relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] space-y-3">
                <h4 className="text-[13px] font-black text-indigo-950 pb-2 border-b border-slate-100">
                  Referral Events
                </h4>

                <div className="relative pl-5 space-y-4">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200" />

                  {(exceptionItem.evidenceEvents || []).map((ev, i) => (
                    <div key={i} className="relative">
                      <span
                        className={`absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white ${
                          ev.dotColor || 'bg-emerald-500'
                        }`}
                      />
                      <h5
                        className={`text-[12.5px] font-extrabold leading-tight ${
                          ev.isError ? 'text-rose-600' : 'text-slate-900'
                        }`}
                      >
                        {ev.title}
                      </h5>
                      {ev.detail && (
                        <p className="text-[11.5px] font-medium text-slate-600 mt-0.5 break-all">
                          {ev.detail}
                        </p>
                      )}
                      <p className="text-[10.5px] font-semibold text-slate-400 mt-0.5">
                        {ev.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Related Records (Order Records & Commission Records) */}
              <div className="md:col-span-5 relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] space-y-3">
                <h4 className="text-[13px] font-black text-indigo-950 pb-2 border-b border-slate-100">
                  Related Records
                </h4>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-[12px] font-extrabold text-slate-900">Order Records</h5>
                      <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                        {exceptionItem.orderRecordNote || 'No orders found for this member.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-[12px] font-extrabold text-slate-900">
                        Commission Records
                      </h5>
                      <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                        {exceptionItem.commissionRecordNote ||
                          'No commission records found.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Notes */}
          {activeTab === 'Notes' && (
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] space-y-3">
              <h4 className="text-[13px] font-black text-slate-900">Investigation Notes</h4>
              <form onSubmit={handleAddNote} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Add an internal investigation note..."
                  className="flex-1 h-9.5 bg-white border border-slate-200/90 focus:border-indigo-500 rounded-xl px-3 text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-9.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-bold inline-flex items-center justify-center gap-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Note</span>
                </button>
              </form>

              <div className="space-y-2">
                {notes.length > 0 ? (
                  notes.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl bg-white border border-slate-200/70 text-[11.5px]"
                    >
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>{n.author}</span>
                        <span className="text-[10.5px] text-slate-400 font-medium">{n.time}</span>
                      </div>
                      <p className="text-slate-600 mt-1">{n.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[11.5px] text-slate-400 font-medium">
                    No internal notes added yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: Audit */}
          {activeTab === 'Audit' && (
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] space-y-2.5 text-[11.5px]">
              <h4 className="text-[13px] font-black text-slate-900 pb-2 border-b border-slate-100">
                Exception Audit Trail
              </h4>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">
                    Exception Detected ({exceptionItem.severity} Severity)
                  </p>
                  <p className="text-slate-500">
                    {exceptionItem.detectedDate}, {exceptionItem.detectedTime} • System Guard
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Pinned Footer matching Image 2 Actions (Assign, Mark as Resolved, Dismiss) + Close */}
        <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 border-t border-slate-100 bg-white shrink-0 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[12px] font-bold shadow-2xs transition-all cursor-pointer"
          >
            Close
          </button>

          <div className="grid grid-cols-3 sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onUpdateException?.(exceptionItem.id, {
                  assignedAdmin: 'Admin User',
                  status:
                    exceptionItem.status === 'Open' ? 'Under Investigation' : exceptionItem.status,
                })
              }
              className="px-3 sm:px-4 py-2 rounded-xl border border-slate-200/90 bg-white hover:bg-indigo-50 hover:border-indigo-300 text-indigo-700 text-[11.5px] sm:text-[12px] font-bold shadow-2xs transition-all cursor-pointer"
            >
              Assign
            </button>

            <button
              type="button"
              onClick={() => {
                onUpdateException?.(exceptionItem.id, { status: 'Resolved' });
                onClose?.();
              }}
              className="px-3 sm:px-4 py-2 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-600 hover:text-white text-emerald-700 text-[11.5px] sm:text-[12px] font-bold shadow-2xs transition-all cursor-pointer whitespace-nowrap"
            >
              Mark as Resolved
            </button>

            <button
              type="button"
              onClick={() => {
                onUpdateException?.(exceptionItem.id, { status: 'Dismissed' });
                onClose?.();
              }}
              className="px-3 sm:px-4 py-2 rounded-xl border border-slate-200/90 bg-white hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 text-indigo-700 text-[11.5px] sm:text-[12px] font-bold shadow-2xs transition-all cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
