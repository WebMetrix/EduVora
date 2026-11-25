import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  X, Users, FileText, Shield, Compass, ShieldCheck, ChevronDown,
  CheckCircle2, Clock, ArrowRight, ExternalLink, GitFork
} from 'lucide-react';

const STATUS_BADGE = {
  Recorded: {
    pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    dot: 'bg-emerald-500',
  },
  Review: {
    pill: 'bg-amber-50 text-amber-700 border-amber-200/60',
    dot: 'bg-amber-400',
  },
  Open: {
    pill: 'bg-rose-50 text-rose-600 border-rose-200/60',
    dot: 'bg-rose-500',
  },
  Resolved: {
    pill: 'bg-sky-50 text-sky-700 border-sky-200/60',
    dot: 'bg-sky-500',
  },
};

export default function AuditEventDetailsModal({ event, isOpen, onClose }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Details');
  const [showRelatedMenu, setShowRelatedMenu] = useState(false);

  useEffect(() => {
    setActiveTab('Details');
    setShowRelatedMenu(false);
  }, [event]);

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

  if (!isOpen || !event || typeof document === 'undefined') return null;

  const badgeStyle = STATUS_BADGE[event.status] || STATUS_BADGE.Review;
  const tabs = ['Details', 'Member', 'Sponsor', 'Evidence', 'Related', 'History'];

  const prevSponsor = event.previousSponsor || { id: 'EV1008', name: 'Amit Kumar' };
  const newSponsor = event.newSponsor || { id: 'EV1012', name: 'Vikram Das' };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fade-in">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Window Card - Matches UserDetailsModal / PayoutRequestDetailsModal / KycSubmissionDetailsModal dimensions */}
      <div className="w-full h-[90vh] sm:h-[86vh] sm:max-h-[86vh] sm:max-w-[800px] bg-white rounded-t-3xl sm:rounded-[22px] flex flex-col shadow-2xl relative mt-auto sm:mt-0 overflow-hidden animate-slide-up sm:animate-fade-in z-10 border border-slate-200/90 pb-safe">
        {/* Mobile Drag Handle */}
        <div
          onClick={onClose}
          className="w-full flex justify-center pt-2.5 pb-1 sm:hidden bg-white shrink-0 cursor-pointer"
        >
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Compact Header matching Dashboard Pop-up Windows */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <h2 className="text-[14px] sm:text-[15px] font-bold text-slate-900 truncate">
              Audit Event Details
            </h2>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline truncate">
              • View complete audit event metadata, sponsor changes, evidence, and linked records
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
          {/* Top Event Summary Card with Dashboard Glassmorphism Effects */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Left: Event Title, Badge, Audit ID, Timestamp */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber-50 border-2 border-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                  <Users className="w-5 h-5" />
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-900 leading-tight group-hover:text-indigo-950 transition-colors truncate">
                      {event.eventType}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border whitespace-nowrap ${badgeStyle.pill}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`} />
                      {event.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10.5px] sm:text-[11px] text-slate-500 mt-0.5">
                    <span className="font-bold text-indigo-600">{event.id}</span>
                    <span className="text-slate-300">•</span>
                    <span>
                      {event.date} {event.time} (UTC +05:30)
                    </span>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <span className="font-medium text-slate-600 hidden sm:inline">
                      Source: {event.sourceLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Actor & Source Meta */}
              <div className="flex items-center gap-2.5 self-stretch sm:self-auto shrink-0 pt-2 sm:pt-0 border-t border-slate-100 sm:border-t-0">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs w-full sm:w-auto">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&auto=format&fit=crop&q=80"
                    alt="Actor"
                    className="w-6 h-6 rounded-full object-cover border border-indigo-100 shrink-0"
                  />
                  <div className="min-w-0 leading-tight">
                    <p className="text-[9.5px] font-bold text-slate-400">Performed By</p>
                    <p className="text-[11px] font-bold text-slate-800 truncate">
                      {event.actorLabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Bar matching UserDetailsModal */}
          <div className="flex items-center gap-1 border-b border-slate-200/80 overflow-x-auto no-scrollbar pb-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-[11.5px] sm:text-[12px] font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/80 border border-indigo-100 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* TAB 1: Details (2-column responsive layout tuned for 800px width) */}
          {activeTab === 'Details' && (
            <div className="space-y-2.5 sm:space-y-3">
              {/* Row 1: Event Information (Left) + Additional Information (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                {/* Event Information Card */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                  <div className="relative z-10 flex items-center gap-1.5 pb-2 mb-2.5 border-b border-slate-100/90">
                    <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <FileText className="w-3 h-3" />
                    </div>
                    <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                      Event Information
                    </h4>
                  </div>

                  <div className="relative z-10 space-y-2 text-[11.5px]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Event Type</span>
                      <span className="font-bold text-slate-900 text-right">
                        {event.eventType}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Date &amp; Time</span>
                      <span className="font-semibold text-slate-800 text-right">
                        {event.date} {event.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Source</span>
                      <span className="font-semibold text-slate-800 text-right">
                        {event.sourceLabel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Performed By</span>
                      <span className="font-semibold text-slate-800 text-right">
                        {event.performedBy}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Status</span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeStyle.pill}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`} />
                        {event.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Information Card */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[35px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                  <div className="relative z-10 flex items-center gap-1.5 pb-2 mb-2.5 border-b border-slate-100/90">
                    <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Compass className="w-3 h-3" />
                    </div>
                    <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                      Additional Information
                    </h4>
                  </div>

                  <div className="relative z-10 space-y-2 text-[11.5px]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Member Affected</span>
                      <span className="font-bold text-indigo-700 text-right">
                        {event.memberId} ({event.memberName})
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Reference ID</span>
                      <span className="font-bold text-slate-900 text-right">
                        {event.referenceId || 'REQ-000123'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Correlation ID</span>
                      <span className="font-bold text-slate-800 text-right">
                        {event.correlationId || 'CORR-8F3A2'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">IP Address</span>
                      <span className="font-bold text-slate-900 text-right">
                        {event.ipAddress || '192.168.1.45'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium">Created At (UTC)</span>
                      <span className="font-semibold text-slate-800 text-right">
                        {event.utcTime || '12 Oct 2026, 05:35 AM'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Change Details Card (Full Width) */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.10)] hover:border-indigo-200 transition-all duration-300 group space-y-3">
                <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-400/10 rounded-full blur-[45px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

                <div className="relative z-10 flex items-center gap-1.5 pb-2 border-b border-slate-100/90">
                  <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Shield className="w-3 h-3" />
                  </div>
                  <h4 className="text-[12px] sm:text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                    Change Details
                  </h4>
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  {/* Previous Sponsor */}
                  <div className="sm:col-span-5 p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 leading-tight">
                      <span className="text-[10px] font-bold text-slate-400 block">
                        Previous Sponsor
                      </span>
                      <p className="text-[12px] font-black text-slate-900 mt-0.5">
                        {prevSponsor.id}
                      </p>
                      <p className="text-[11px] font-medium text-slate-500 truncate">
                        {prevSponsor.name}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="sm:col-span-2 flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center rotate-90 sm:rotate-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* New Sponsor */}
                  <div className="sm:col-span-5 p-2.5 rounded-xl bg-emerald-50/40 border border-emerald-200/70 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 leading-tight">
                      <span className="text-[10px] font-bold text-emerald-700 block">
                        New Sponsor
                      </span>
                      <p className="text-[12px] font-black text-slate-900 mt-0.5">
                        {newSponsor.id}
                      </p>
                      <p className="text-[11px] font-medium text-slate-600 truncate">
                        {newSponsor.name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">Reason</span>
                  <div className="rounded-xl bg-white border border-slate-200/80 px-3 py-2 text-[11.5px] font-medium text-slate-700 leading-relaxed shadow-2xs">
                    {event.fullReason}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Member' && (
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] space-y-2.5 text-[12px]">
              <h4 className="text-[13px] font-black text-slate-900 pb-2 border-b border-slate-100">
                Affected Member Profile
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Member ID</span>
                  <span className="font-bold text-slate-900">{event.memberId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Full Name</span>
                  <span className="font-bold text-slate-900">{event.memberName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Account Status</span>
                  <span className="font-bold text-emerald-700">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Triggered Event</span>
                  <span className="font-semibold text-indigo-600">{event.eventType}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Sponsor' && (
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] space-y-3 text-[12px]">
              <h4 className="text-[13px] font-black text-slate-900 pb-2 border-b border-slate-100">
                Sponsor Lineage Transition
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                  <span className="text-[10.5px] font-bold text-slate-500">Previous Sponsor</span>
                  <p className="font-black text-slate-900">
                    {prevSponsor.id} — {prevSponsor.name}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/70 space-y-1">
                  <span className="text-[10.5px] font-bold text-emerald-700">
                    Current / New Sponsor
                  </span>
                  <p className="font-black text-slate-900">
                    {newSponsor.id} — {newSponsor.name}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Evidence' && (
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] space-y-2.5 text-[12px]">
              <h4 className="text-[13px] font-black text-slate-900 pb-2 border-b border-slate-100">
                Verification Evidence
              </h4>
              <div className="flex items-center gap-2 text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/70 rounded-xl p-3">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  Support Ticket {event.referenceId || 'REQ-000123'} verified &amp; logged.
                </span>
              </div>
              <p className="text-slate-600 text-[11.5px] leading-relaxed">{event.fullReason}</p>
            </div>
          )}

          {activeTab === 'Related' && (
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] space-y-2.5 text-[11.5px]">
              <h4 className="text-[13px] font-black text-slate-900 pb-2 border-b border-slate-100">
                Related Audit Events
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'AUD-000845', title: 'User Registered', time: '12 Oct 2026, 10:32 AM' },
                  { id: 'AUD-000846', title: 'Referral Code Validated', time: '12 Oct 2026, 10:32 AM' },
                  { id: 'AUD-000847', title: 'Sponsor Assigned', time: '12 Oct 2026, 10:32 AM' },
                ].map((rel) => (
                  <div
                    key={rel.id}
                    className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs"
                  >
                    <span className="font-black text-indigo-600">{rel.id}</span>
                    <p className="font-bold text-slate-800 mt-0.5">{rel.title}</p>
                    <span className="text-[10.5px] text-slate-400 font-medium block mt-1">
                      {rel.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'History' && (
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] space-y-3 text-[11.5px]">
              <h4 className="text-[13px] font-black text-slate-900 pb-2 border-b border-slate-100">
                Event Lifecycle
              </h4>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Event Logged ({event.status})</p>
                  <p className="text-slate-500">
                    {event.date} {event.time} • {event.performedBy}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Pinned Footer matching Dashboard Pop-up Windows */}
        <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 border-t border-slate-100 bg-white shrink-0 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2 relative">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[12px] font-bold shadow-2xs transition-all cursor-pointer"
          >
            Close
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 relative">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowRelatedMenu((prev) => !prev)}
                className="w-full sm:w-auto px-3.5 py-2 rounded-xl border border-slate-200/90 bg-white hover:bg-indigo-50/70 hover:border-indigo-300 text-indigo-700 text-[12px] font-bold shadow-2xs inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>View Related Records</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showRelatedMenu && (
                <div className="absolute bottom-full right-0 mb-1.5 w-full sm:w-48 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-30 animate-fade-in">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRelatedMenu(false);
                      setActiveTab('Related');
                    }}
                    className="w-full text-left px-3 py-1.5 text-[11.5px] font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer"
                  >
                    Show Related Events Tab
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose?.();
                      navigate('/network/referral-exceptions');
                    }}
                    className="w-full text-left px-3 py-1.5 text-[11.5px] font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer"
                  >
                    Go to Referral Exceptions
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                onClose?.();
                navigate('/network/genealogy-tree');
              }}
              className="px-3.5 py-2 rounded-xl border border-slate-200/90 bg-white hover:bg-indigo-50/70 hover:border-indigo-300 text-indigo-700 text-[12px] font-bold shadow-2xs inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>View in Genealogy Tree</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose?.();
                navigate('/network/referral-details');
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-99 text-white text-[12px] font-bold shadow-sm shadow-indigo-600/20 inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>View Member Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
