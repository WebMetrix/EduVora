import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, ChevronDown, Search, Download } from 'lucide-react';
import AuditHistoryStats from '../../components/network/AuditHistoryStats';
import AuditHistoryTable from '../../components/network/AuditHistoryTable';
import AuditEventDetailsModal from '../../components/network/AuditEventDetailsModal';

const AUDIT_EVENTS = [
  {
    id: 'AUD-000845',
    eventType: 'User Registered',
    memberId: 'EV1025',
    memberName: 'Rohan Mehta',
    sponsorPrimary: 'EV1008',
    sponsorSub: '',
    sourceShort: 'System',
    sourceSub: '',
    sourceCategory: 'System',
    sourceLabel: 'System Automated',
    actorLabel: 'System Engine',
    performedBy: 'System',
    date: '12 Oct 2026,',
    time: '10:32 AM',
    reason: 'Registered with valid referral code',
    fullReason: 'User registered with valid referral code EV1008 during onboarding.',
    status: 'Recorded',
    previousSponsor: { id: '-', name: 'None' },
    newSponsor: { id: 'EV1008', name: 'Amit Kumar' },
    referenceId: 'REG-000845',
    correlationId: 'CORR-4A1D9',
    ipAddress: '192.168.1.22',
    utcTime: '12 Oct 2026, 05:02 AM',
  },
  {
    id: 'AUD-000846',
    eventType: 'Referral Code Validated',
    memberId: 'EV1025',
    memberName: 'Rohan Mehta',
    sponsorPrimary: 'EV1008',
    sponsorSub: '(Valid)',
    sourceShort: 'System',
    sourceSub: '',
    sourceCategory: 'System',
    sourceLabel: 'System Automated',
    actorLabel: 'Validation Service',
    performedBy: 'System',
    date: '12 Oct 2026,',
    time: '10:32 AM',
    reason: 'Referral code EV1008 validated successfully',
    fullReason: 'Referral code EV1008 passed format, active status, and hierarchy checks.',
    status: 'Recorded',
    previousSponsor: { id: 'EV1008', name: 'Amit Kumar' },
    newSponsor: { id: 'EV1008', name: 'Amit Kumar' },
    referenceId: 'VAL-000846',
    correlationId: 'CORR-4A1D9',
    ipAddress: '192.168.1.22',
    utcTime: '12 Oct 2026, 05:02 AM',
  },
  {
    id: 'AUD-000847',
    eventType: 'Sponsor Assigned',
    memberId: 'EV1025',
    memberName: 'Rohan Mehta',
    sponsorPrimary: '- → EV1008',
    sponsorSub: '',
    sourceShort: 'System',
    sourceSub: '',
    sourceCategory: 'System',
    sourceLabel: 'System Automated',
    actorLabel: 'Genealogy Assigner',
    performedBy: 'System',
    date: '12 Oct 2026,',
    time: '10:32 AM',
    reason: 'Initial sponsor assignment during registration',
    fullReason: 'Assigned EV1008 (Amit Kumar) as initial Level 1 upline sponsor.',
    status: 'Recorded',
    previousSponsor: { id: '-', name: 'Unassigned' },
    newSponsor: { id: 'EV1008', name: 'Amit Kumar' },
    referenceId: 'ASG-000847',
    correlationId: 'CORR-4A1D9',
    ipAddress: '192.168.1.22',
    utcTime: '12 Oct 2026, 05:02 AM',
  },
  {
    id: 'AUD-000852',
    eventType: 'Sponsor Changed',
    memberId: 'EV1025',
    memberName: 'Rohan Mehta',
    sponsorPrimary: 'EV1008 → EV1012',
    sponsorSub: '',
    sourceShort: 'Admin',
    sourceSub: '(EV0001)',
    sourceCategory: 'Admin',
    sourceLabel: 'Admin Action',
    actorLabel: 'EV0001 (Admin User)',
    performedBy: 'Admin User (EV0001)',
    date: '12 Oct 2026,',
    time: '11:05 AM',
    reason: 'User request - corrected sponsor as per evidence',
    fullReason: 'User raised a request to correct sponsor. Verified documents and approved.',
    status: 'Review',
    previousSponsor: { id: 'EV1008', name: 'Amit Kumar' },
    newSponsor: { id: 'EV1012', name: 'Vikram Das' },
    referenceId: 'REQ-000123',
    correlationId: 'CORR-8F3A2',
    ipAddress: '192.168.1.45',
    utcTime: '12 Oct 2026, 05:35 AM',
  },
  {
    id: 'AUD-000861',
    eventType: 'Referral Exception Created',
    memberId: 'EV1030',
    memberName: 'Priya Sharma',
    sponsorPrimary: 'EV9999',
    sponsorSub: '(Not found)',
    sourceShort: 'System',
    sourceSub: '',
    sourceCategory: 'System',
    sourceLabel: 'System Integrity Guard',
    actorLabel: 'Audit Monitor',
    performedBy: 'System',
    date: '12 Oct 2026,',
    time: '11:20 AM',
    reason: 'Invalid sponsor reference detected',
    fullReason: 'Submitted sponsor code EV9999 does not exist in active member directory.',
    status: 'Open',
    previousSponsor: { id: 'EV9999', name: 'Not Found' },
    newSponsor: { id: '-', name: 'Pending Review' },
    referenceId: 'EXC-000861',
    correlationId: 'CORR-9B2C1',
    ipAddress: '192.168.1.88',
    utcTime: '12 Oct 2026, 05:50 AM',
  },
  {
    id: 'AUD-000865',
    eventType: 'Referral Link Used',
    memberId: 'EV1040',
    memberName: 'Amit Kumar',
    sponsorPrimary: 'EV1003',
    sponsorSub: '',
    sourceShort: 'System',
    sourceSub: '',
    sourceCategory: 'System',
    sourceLabel: 'System Automated',
    actorLabel: 'Referral Tracker',
    performedBy: 'System',
    date: '11 Oct 2026,',
    time: '09:14 AM',
    reason: 'Registered via referral link (TKN-8F3A2)',
    fullReason: 'Member signed up through verified invite URL token TKN-8F3A2.',
    status: 'Recorded',
    previousSponsor: { id: '-', name: 'None' },
    newSponsor: { id: 'EV1003', name: 'Deepak Seth' },
    referenceId: 'LNK-000865',
    correlationId: 'CORR-7C4E1',
    ipAddress: '192.168.1.94',
    utcTime: '11 Oct 2026, 03:44 AM',
  },
  {
    id: 'AUD-000872',
    eventType: 'Referral Attribute Failed',
    memberId: 'EV1045',
    memberName: 'Neha Singh',
    sponsorPrimary: '-',
    sponsorSub: '',
    sourceShort: 'System',
    sourceSub: '',
    sourceCategory: 'System',
    sourceLabel: 'System Automated',
    actorLabel: 'Attribution Worker',
    performedBy: 'System',
    date: '10 Oct 2026,',
    time: '03:45 PM',
    reason: 'Missing sponsor for end-user registration',
    fullReason: 'No referral cookie or sponsor code provided during checkout attribution.',
    status: 'Recorded',
    previousSponsor: { id: '-', name: 'None' },
    newSponsor: { id: '-', name: 'Unattributed' },
    referenceId: 'ATR-000872',
    correlationId: 'CORR-3D9F0',
    ipAddress: '192.168.1.102',
    utcTime: '10 Oct 2026, 10:15 AM',
  },
  {
    id: 'AUD-000881',
    eventType: 'Exception Resolved',
    memberId: 'EV1030',
    memberName: 'Priya Sharma',
    sponsorPrimary: 'EV1001',
    sponsorSub: '',
    sourceShort: 'Admin',
    sourceSub: '(EV0001)',
    sourceCategory: 'Admin',
    sourceLabel: 'Admin Action',
    actorLabel: 'EV0001 (Admin User)',
    performedBy: 'Admin User (EV0001)',
    date: '09 Oct 2026,',
    time: '04:10 PM',
    reason: 'Correct sponsor assigned after verification',
    fullReason: 'Confirmed sponsor EV1001 (Amit Kumar) via KYC verification and closed exception.',
    status: 'Resolved',
    previousSponsor: { id: 'EV9999', name: 'Invalid Code' },
    newSponsor: { id: 'EV1001', name: 'Amit Kumar' },
    referenceId: 'RES-000881',
    correlationId: 'CORR-9B2C1',
    ipAddress: '192.168.1.45',
    utcTime: '09 Oct 2026, 10:40 AM',
  },
];

export default function ReferralAuditHistory() {
  const navigate = useNavigate();

  const [draftFilters, setDraftFilters] = useState({
    dateRange: 'this_month',
    eventType: 'all',
    source: 'all',
    memberQuery: '',
    sponsorQuery: '',
  });
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);
  const [exportFormat, setExportFormat] = useState('CSV');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = useMemo(() => {
    const mq = appliedFilters.memberQuery.trim().toLowerCase();
    const sq = appliedFilters.sponsorQuery.trim().toLowerCase();

    return AUDIT_EVENTS.filter((ev) => {
      if (appliedFilters.eventType !== 'all' && ev.eventType !== appliedFilters.eventType) {
        return false;
      }
      if (appliedFilters.source !== 'all' && ev.sourceCategory !== appliedFilters.source) {
        return false;
      }
      if (
        mq &&
        !ev.memberId.toLowerCase().includes(mq) &&
        !ev.memberName.toLowerCase().includes(mq)
      ) {
        return false;
      }
      if (
        sq &&
        !ev.sponsorPrimary.toLowerCase().includes(sq) &&
        !(ev.newSponsor?.name || '').toLowerCase().includes(sq)
      ) {
        return false;
      }
      return true;
    });
  }, [appliedFilters]);

  const handleApply = (e) => {
    e.preventDefault();
    setAppliedFilters(draftFilters);
  };

  const handleReset = () => {
    const initial = {
      dateRange: 'this_month',
      eventType: 'all',
      source: 'all',
      memberQuery: '',
      sponsorQuery: '',
    };
    setDraftFilters(initial);
    setAppliedFilters(initial);
  };

  const handleExport = () => {
    const headers = [
      'Audit ID',
      'Event Type',
      'Member ID',
      'Member Name',
      'Sponsor',
      'Event Source',
      'Date',
      'Time',
      'Reason / Details',
      'Status',
    ];
    const rows = [
      headers.join(','),
      ...filteredEvents.map((e) =>
        [
          `"${e.id}"`,
          `"${e.eventType}"`,
          `"${e.memberId}"`,
          `"${e.memberName}"`,
          `"${e.sponsorPrimary} ${e.sponsorSub}".trim()`,
          `"${e.sourceShort} ${e.sourceSub}".trim()`,
          `"${e.date.replace(',', '')}"`,
          `"${e.time}"`,
          `"${e.reason}"`,
          `"${e.status}"`,
        ].join(',')
      ),
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `referral_audit_history_${exportFormat.toLowerCase()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const dateRangeSubtitle =
    draftFilters.dateRange === 'last_3_months'
      ? '01 Aug 2026 - 31 Oct 2026'
      : draftFilters.dateRange === 'last_6_months'
      ? '01 May 2026 - 31 Oct 2026'
      : '01 Oct 2026 - 31 Oct 2026';

  return (
    <div className="flex flex-col gap-4 sm:gap-5 animate-fade-in relative pb-1 sm:pb-2">
      {/* Header + Breadcrumbs + Export */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="text-[20px] sm:text-[26px] lg:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
            Referral Audit History
          </h1>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            View complete audit trail of referral-related activities and changes.
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-[12.5px] font-medium text-slate-500 flex-wrap">
            <Link to="/dashboard" className="hover:text-indigo-600 transition-colors cursor-pointer">
              Dashboard
            </Link>
            <span className="text-slate-300">/</span>
            <Link
              to="/network/referral-overview"
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Network &amp; Referrals
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-indigo-600 font-bold">Referral Audit History</span>
          </nav>

          {/* Export | CSV Split Button */}
          <div className="inline-flex items-center bg-white border border-slate-200/90 rounded-xl shadow-2xs overflow-hidden self-start sm:self-end hover:border-indigo-300 transition-colors">
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors cursor-pointer border-r border-slate-200/80"
            >
              <Download className="w-3.5 h-3.5 text-indigo-600" />
              <span>Export</span>
            </button>
            <div className="relative">
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                aria-label="Export format"
                className="bg-transparent pl-2.5 pr-6 py-1.5 text-[11.5px] font-bold text-slate-600 appearance-none focus:outline-none cursor-pointer"
              >
                <option value="CSV">CSV</option>
                <option value="XLSX">XLSX</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: 4 Stat Cards */}
      <AuditHistoryStats />

      {/* Row 2: Filters Card */}
      <form
        onSubmit={handleApply}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-3.5 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.08)] hover:border-indigo-300 transition-all duration-300"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
          {/* Date Range */}
          <div className="lg:col-span-3">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
              Date Range
            </label>
            <div className="relative flex items-center bg-slate-50/70 hover:bg-white border border-slate-200/90 rounded-xl px-3 py-1.5 h-11">
              <Calendar className="w-4 h-4 text-indigo-600 shrink-0 mr-2.5" />
              <div className="min-w-0 flex-1">
                <select
                  value={draftFilters.dateRange}
                  onChange={(e) =>
                    setDraftFilters((prev) => ({ ...prev, dateRange: e.target.value }))
                  }
                  className="w-full bg-transparent text-[11.5px] font-bold text-slate-800 appearance-none focus:outline-none cursor-pointer leading-tight pr-4"
                >
                  <option value="this_month">This Month</option>
                  <option value="last_3_months">Last 3 Months</option>
                  <option value="last_6_months">Last 6 Months</option>
                </select>
                <p className="text-[10px] font-medium text-slate-400 truncate leading-tight">
                  {dateRangeSubtitle}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none shrink-0" />
            </div>
          </div>

          {/* Event Type */}
          <div className="lg:col-span-2">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
              Event Type
            </label>
            <div className="relative">
              <select
                value={draftFilters.eventType}
                onChange={(e) =>
                  setDraftFilters((prev) => ({ ...prev, eventType: e.target.value }))
                }
                className="w-full h-11 bg-white border border-slate-200/90 hover:border-indigo-300 focus:border-indigo-500 rounded-xl pl-3 pr-7 text-[12px] font-bold text-slate-700 appearance-none focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value="all">All Events</option>
                <option value="User Registered">User Registered</option>
                <option value="Referral Code Validated">Referral Code Validated</option>
                <option value="Sponsor Assigned">Sponsor Assigned</option>
                <option value="Sponsor Changed">Sponsor Changed</option>
                <option value="Referral Exception Created">Referral Exception Created</option>
                <option value="Referral Link Used">Referral Link Used</option>
                <option value="Referral Attribute Failed">Referral Attribute Failed</option>
                <option value="Exception Resolved">Exception Resolved</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Source */}
          <div className="lg:col-span-1.5 sm:col-span-1 lg:col-span-1">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
              Source
            </label>
            <div className="relative">
              <select
                value={draftFilters.source}
                onChange={(e) => setDraftFilters((prev) => ({ ...prev, source: e.target.value }))}
                className="w-full h-11 bg-white border border-slate-200/90 hover:border-indigo-300 focus:border-indigo-500 rounded-xl pl-2.5 pr-6 text-[11.5px] font-bold text-slate-700 appearance-none focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value="all">All Sources</option>
                <option value="System">System</option>
                <option value="Admin">Admin</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Member User ID */}
          <div className="lg:col-span-2">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
              Member User ID
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={draftFilters.memberQuery}
                onChange={(e) =>
                  setDraftFilters((prev) => ({ ...prev, memberQuery: e.target.value }))
                }
                placeholder="Search by User ID or name"
                className="w-full h-11 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl pl-8 pr-3 text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Sponsor User ID */}
          <div className="lg:col-span-2">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
              Sponsor User ID
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={draftFilters.sponsorQuery}
                onChange={(e) =>
                  setDraftFilters((prev) => ({ ...prev, sponsorQuery: e.target.value }))
                }
                placeholder="Search by User ID or name"
                className="w-full h-11 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl pl-8 pr-3 text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Apply & Reset */}
          <div className="sm:col-span-2 lg:col-span-2 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 h-11 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-[12.5px] font-bold shadow-sm shadow-indigo-600/20 hover:shadow-md hover:shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 h-11 px-4 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 active:scale-98 text-slate-700 text-[12.5px] font-bold shadow-2xs transition-all cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* Row 3: Audit History Table + Mobile Cards */}
      <AuditHistoryTable
        events={filteredEvents}
        onViewEvent={(ev) => setSelectedEvent(ev)}
        onNavigateMember={() => navigate('/network/referral-details')}
        onNavigateTree={() => navigate('/network/genealogy-tree')}
      />

      {/* Action View Popup Window (Desktop modal + Mobile bottom sheet) */}
      <AuditEventDetailsModal
        event={selectedEvent}
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
