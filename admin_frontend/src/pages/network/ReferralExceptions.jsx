import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Search, Download } from 'lucide-react';
import ReferralExceptionsStats from '../../components/network/ReferralExceptionsStats';
import ReferralExceptionsTable from '../../components/network/ReferralExceptionsTable';
import ExceptionDetailsModal from '../../components/network/ExceptionDetailsModal';
import DateRangePicker from '../../components/common/DateRangePicker';
import { isDateWithinRange } from '../../utils/dateFilterUtils';

const INITIAL_EXCEPTIONS = [
  {
    id: 'EXC-00041',
    exceptionType: 'Invalid Sponsor Relationship',
    memberId: 'EV1025',
    memberName: 'Rohan Mehta',
    sponsorId: 'EV9999',
    sponsorSub: '(Does not exist)',
    severity: 'High',
    status: 'Open',
    detectedDate: '12 Oct 2026',
    detectedTime: '10:24 AM',
    assignedAdmin: 'Unassigned',
    shortSummary: 'Member EV1025 references sponsor EV9999, but the sponsor does not exist.',
    description:
      'Member EV1025 (Rohan Mehta) is assigned to sponsor EV9999, but the sponsor does not exist in the system.',
    recommendedAction:
      'Verify the correct sponsor for this member. If required, contact the member or review registration logs.',
    orderRecordNote: 'No orders found for this member.',
    commissionRecordNote: 'No commission records found.',
    evidenceEvents: [
      {
        title: 'Member Registered',
        detail: 'Sponsor ID: EV9999 (Not found)',
        time: '12 Oct 2026, 10:24 AM',
        dotColor: 'bg-emerald-500',
      },
      {
        title: 'Referral Link Used',
        detail: 'Link: https://eduvora.com/r/EV9999',
        time: '12 Oct 2026, 10:23 AM',
        dotColor: 'bg-amber-400',
      },
      {
        title: 'System Validation Failed',
        detail: 'Sponsor EV9999 does not exist.',
        time: '12 Oct 2026, 10:24 AM',
        dotColor: 'bg-emerald-500',
        isError: true,
      },
    ],
  },
  {
    id: 'EXC-00042',
    exceptionType: 'Missing Referral Attribution',
    memberId: 'EV1088',
    memberName: 'Priya Sharma',
    sponsorId: '-',
    sponsorSub: '',
    severity: 'Medium',
    status: 'Under Investigation',
    detectedDate: '11 Oct 2026',
    detectedTime: '04:18 PM',
    assignedAdmin: 'Admin User',
    shortSummary: 'Member EV1088 completed checkout without a tracked sponsor attribution.',
    description:
      'Member EV1088 (Priya Sharma) submitted an invite claim post-signup, requiring manual sponsor attribution check.',
    recommendedAction:
      'Review referral session cookies and confirm invite link timestamp before assigning sponsor.',
    orderRecordNote: 'Order #ORD-5521 verified (Pro Package).',
    commissionRecordNote: 'Pending attribution lock.',
    evidenceEvents: [
      {
        title: 'Member Registered',
        detail: 'No referral token captured during signup',
        time: '11 Oct 2026, 04:18 PM',
        dotColor: 'bg-amber-400',
      },
      {
        title: 'Post-Signup Claim Filed',
        detail: 'Ticket #REQ-000142 opened by user',
        time: '11 Oct 2026, 05:05 PM',
        dotColor: 'bg-indigo-500',
      },
    ],
  },
  {
    id: 'EXC-00043',
    exceptionType: 'Duplicate Referral Records',
    memberId: 'EV1102',
    memberName: 'Amit Kumar',
    sponsorId: 'EV1021',
    sponsorSub: 'Neha Singh',
    severity: 'High',
    status: 'Open',
    detectedDate: '10 Oct 2026',
    detectedTime: '11:06 AM',
    assignedAdmin: 'Unassigned',
    shortSummary: 'Duplicate referral record detected between EV1102 and sponsor EV1021.',
    description:
      'Two concurrent referral entries were created for EV1102 (Amit Kumar) under sponsor EV1021 (Neha Singh).',
    recommendedAction:
      'Merge duplicate relationship rows and keep the earliest timestamped entry.',
    orderRecordNote: 'Order #ORD-5498 (Standard Package).',
    commissionRecordNote: 'Commission payout temporarily held.',
    evidenceEvents: [
      {
        title: 'Duplicate Edge Flagged',
        detail: 'Sponsor EV1021 → Member EV1102 recorded twice',
        time: '10 Oct 2026, 11:06 AM',
        dotColor: 'bg-rose-500',
        isError: true,
      },
    ],
  },
  {
    id: 'EXC-00044',
    exceptionType: 'Genealogy Data Inconsistency',
    memberId: 'EV1145',
    memberName: 'Sneha Patel',
    sponsorId: 'EV1080',
    sponsorSub: 'Suresh Yadav',
    severity: 'Critical',
    status: 'Open',
    detectedDate: '09 Oct 2026',
    detectedTime: '03:52 PM',
    assignedAdmin: 'Admin User',
    shortSummary: 'Tree depth mismatch between EV1145 and sponsor EV1080.',
    description:
      'Genealogy level cache shows EV1145 (Sneha Patel) at Level 3 instead of Level 2 under EV1080.',
    recommendedAction:
      'Rebuild subtree hierarchy cache and confirm commission tier calculation.',
    orderRecordNote: 'Order #ORD-5412 active.',
    commissionRecordNote: 'Tier adjustment pending verification.',
    evidenceEvents: [
      {
        title: 'Depth Check Mismatch',
        detail: 'Expected Level 2, Cached Level 3',
        time: '09 Oct 2026, 03:52 PM',
        dotColor: 'bg-rose-500',
        isError: true,
      },
    ],
  },
  {
    id: 'EXC-00045',
    exceptionType: 'Suspicious Referral Activity',
    memberId: 'EV1201',
    memberName: 'Vikram Das',
    sponsorId: 'EV1034',
    sponsorSub: 'Karan Mehta',
    severity: 'Medium',
    status: 'Under Investigation',
    detectedDate: '08 Oct 2026',
    detectedTime: '09:15 AM',
    assignedAdmin: 'Admin User',
    shortSummary: 'Multiple signups from identical IP subnet under sponsor EV1034.',
    description:
      'Detected 4 rapid registrations linked to EV1201 sharing device metadata with EV1034.',
    recommendedAction:
      'Verify KYC documents of flagged accounts before approving commission payout.',
    orderRecordNote: 'Order #ORD-5380 pending KYC clearance.',
    commissionRecordNote: 'Held until KYC approval.',
    evidenceEvents: [
      {
        title: 'Velocity Rule Triggered',
        detail: '4 signups within 12 minutes from subnet 192.168.1.*',
        time: '08 Oct 2026, 09:15 AM',
        dotColor: 'bg-amber-400',
      },
    ],
  },
  {
    id: 'EXC-00046',
    exceptionType: 'Referral to Commission Mismatch',
    memberId: 'EV1188',
    memberName: 'Neha Singh',
    sponsorId: 'EV1047',
    sponsorSub: 'Priya Verma',
    severity: 'Low',
    status: 'Resolved',
    detectedDate: '06 Oct 2026',
    detectedTime: '01:20 PM',
    assignedAdmin: 'System',
    shortSummary: 'Commission rate mismatch resolved for EV1188 under EV1047.',
    description:
      'Initial Level 1 commission was calculated on base price before upgrade; delta credited automatically.',
    recommendedAction: 'No further action needed. Exception verified and closed.',
    orderRecordNote: 'Order #ORD-5299 (Pro Upgrade).',
    commissionRecordNote: 'Credit #COM-9182 settled (₹ 1,200).',
    evidenceEvents: [
      {
        title: 'Commission Delta Adjusted',
        detail: 'Credited ₹ 400 adjustment to EV1047 wallet',
        time: '06 Oct 2026, 02:10 PM',
        dotColor: 'bg-emerald-500',
      },
    ],
  },
];

const DEFAULT_EXCEPTIONS_DATE_RANGE = {
  preset: 'this_month',
  label: 'This Month',
  startDate: new Date(2026, 9, 1),
  endDate: new Date(2026, 9, 31),
};

export default function ReferralExceptions() {
  const navigate = useNavigate();

  const [exceptions, setExceptions] = useState(INITIAL_EXCEPTIONS);
  const [selectedExceptionId, setSelectedExceptionId] = useState(null);
  const [exportFormat, setExportFormat] = useState('CSV');

  const [draftFilters, setDraftFilters] = useState({
    dateRange: DEFAULT_EXCEPTIONS_DATE_RANGE,
    exceptionType: 'all',
    severity: 'all',
    status: 'all',
    assignedAdmin: 'all',
    search: '',
  });
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);

  const selectedException = useMemo(
    () => exceptions.find((e) => e.id === selectedExceptionId) || null,
    [exceptions, selectedExceptionId]
  );

  const filteredExceptions = useMemo(() => {
    const q = appliedFilters.search.trim().toLowerCase();
    return exceptions.filter((row) => {
      if (
        appliedFilters.exceptionType !== 'all' &&
        row.exceptionType !== appliedFilters.exceptionType
      ) {
        return false;
      }
      if (appliedFilters.severity !== 'all' && row.severity !== appliedFilters.severity) {
        return false;
      }
      if (appliedFilters.status !== 'all' && row.status !== appliedFilters.status) {
        return false;
      }
      if (
        appliedFilters.assignedAdmin !== 'all' &&
        row.assignedAdmin !== appliedFilters.assignedAdmin
      ) {
        return false;
      }
      if (
        q &&
        !row.id.toLowerCase().includes(q) &&
        !row.memberId.toLowerCase().includes(q) &&
        !row.memberName.toLowerCase().includes(q) &&
        !row.sponsorId.toLowerCase().includes(q) &&
        !(row.sponsorSub || '').toLowerCase().includes(q)
      ) {
        return false;
      }
      if (
        (appliedFilters.dateRange?.preset === 'custom' ||
          appliedFilters.dateRange?.preset === 'today' ||
          appliedFilters.dateRange?.preset === 'week') &&
        !isDateWithinRange(row.detectedDate, appliedFilters.dateRange)
      ) {
        return false;
      }
      return true;
    });
  }, [exceptions, appliedFilters]);

  const handleUpdateException = (id, patch) => {
    setExceptions((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    setAppliedFilters(draftFilters);
  };

  const handleResetFilters = () => {
    const reset = {
      dateRange: DEFAULT_EXCEPTIONS_DATE_RANGE,
      exceptionType: 'all',
      severity: 'all',
      status: 'all',
      assignedAdmin: 'all',
      search: '',
    };
    setDraftFilters(reset);
    setAppliedFilters(reset);
  };

  const handleExport = () => {
    const headers = [
      'Exception ID',
      'Exception Type',
      'Member ID',
      'Member Name',
      'Sponsor ID',
      'Severity',
      'Status',
      'Detected Date',
      'Assigned Admin',
    ];
    const rows = [
      headers.join(','),
      ...filteredExceptions.map((r) =>
        [
          `"${r.id}"`,
          `"${r.exceptionType}"`,
          `"${r.memberId}"`,
          `"${r.memberName}"`,
          `"${r.sponsorId}"`,
          `"${r.severity}"`,
          `"${r.status}"`,
          `"${r.detectedDate} ${r.detectedTime}"`,
          `"${r.assignedAdmin}"`,
        ].join(',')
      ),
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `referral_exceptions_${exportFormat.toLowerCase()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5 animate-fade-in relative pb-1 sm:pb-2">
      {/* Header + Breadcrumbs + Export */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="text-[20px] sm:text-[26px] lg:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
            Referral Exceptions
          </h1>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            Identify and manage referral records that require investigation.
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
            <Link
              to="/network/referral-analytics"
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Referral Analytics
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-indigo-600 font-bold">Referral Exceptions</span>
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
      <ReferralExceptionsStats exceptions={exceptions} />

      {/* Row 2: Filters Card */}
      <form
        onSubmit={handleApplyFilters}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-3.5 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.08)] hover:border-indigo-300 transition-all duration-300"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-3 items-end">
          {/* Date Range */}
          <div className="lg:col-span-2">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
              Date Range
            </label>
            <DateRangePicker
              variant="field"
              value={draftFilters.dateRange}
              onChange={(val) =>
                setDraftFilters((prev) => ({ ...prev, dateRange: val }))
              }
              initialMonth={new Date(2026, 9, 1)}
            />
          </div>

          {/* Exception Type */}
          <div className="lg:col-span-2">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
              Exception Type
            </label>
            <div className="relative">
              <select
                value={draftFilters.exceptionType}
                onChange={(e) =>
                  setDraftFilters((prev) => ({ ...prev, exceptionType: e.target.value }))
                }
                className="w-full h-11 bg-white border border-slate-200/90 hover:border-indigo-300 focus:border-indigo-500 rounded-xl pl-2.5 pr-6 text-[11.5px] font-bold text-slate-700 appearance-none focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value="all">All Types</option>
                <option value="Invalid Sponsor Relationship">Invalid Sponsor Relationship</option>
                <option value="Missing Referral Attribution">Missing Referral Attribution</option>
                <option value="Duplicate Referral Records">Duplicate Referral Records</option>
                <option value="Genealogy Data Inconsistency">Genealogy Data Inconsistency</option>
                <option value="Suspicious Referral Activity">Suspicious Referral Activity</option>
                <option value="Referral to Commission Mismatch">
                  Referral to Commission Mismatch
                </option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Severity */}
          <div className="lg:col-span-1">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1">Severity</label>
            <div className="relative">
              <select
                value={draftFilters.severity}
                onChange={(e) =>
                  setDraftFilters((prev) => ({ ...prev, severity: e.target.value }))
                }
                className="w-full h-11 bg-white border border-slate-200/90 hover:border-indigo-300 focus:border-indigo-500 rounded-xl pl-2.5 pr-6 text-[11.5px] font-bold text-slate-700 appearance-none focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value="all">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Status */}
          <div className="lg:col-span-1">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1">Status</label>
            <div className="relative">
              <select
                value={draftFilters.status}
                onChange={(e) => setDraftFilters((prev) => ({ ...prev, status: e.target.value }))}
                className="w-full h-11 bg-white border border-slate-200/90 hover:border-indigo-300 focus:border-indigo-500 rounded-xl pl-2.5 pr-6 text-[11.5px] font-bold text-slate-700 appearance-none focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value="all">All Status</option>
                <option value="Open">Open</option>
                <option value="Under Investigation">Under Investigation</option>
                <option value="Resolved">Resolved</option>
                <option value="Dismissed">Dismissed</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Assigned Admin */}
          <div className="lg:col-span-2">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
              Assigned Admin
            </label>
            <div className="relative">
              <select
                value={draftFilters.assignedAdmin}
                onChange={(e) =>
                  setDraftFilters((prev) => ({ ...prev, assignedAdmin: e.target.value }))
                }
                className="w-full h-11 bg-white border border-slate-200/90 hover:border-indigo-300 focus:border-indigo-500 rounded-xl pl-3 pr-7 text-[11.5px] font-bold text-slate-700 appearance-none focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value="all">All Admins</option>
                <option value="Unassigned">Unassigned</option>
                <option value="Admin User">Admin User</option>
                <option value="System">System</option>
                <option value="Compliance Team">Compliance Team</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Search Input */}
          <div className="sm:col-span-2 lg:col-span-2">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1">Search</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={draftFilters.search}
                onChange={(e) => setDraftFilters((prev) => ({ ...prev, search: e.target.value }))}
                placeholder="Search by Member ID, Sponsor ID or name"
                className="w-full h-11 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl pl-8 pr-3 text-[11.5px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Apply & Reset */}
          <div className="sm:col-span-2 lg:col-span-2 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 h-11 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-[12px] font-bold shadow-sm shadow-indigo-600/20 hover:shadow-md hover:shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex-1 h-11 px-3 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 active:scale-98 text-slate-700 text-[12px] font-bold shadow-2xs transition-all cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* Row 3: Exceptions Table + Mobile Cards */}
      <ReferralExceptionsTable
        exceptions={filteredExceptions}
        onViewDetails={(row) => setSelectedExceptionId(row.id)}
        onQuickResolve={(id) => handleUpdateException(id, { status: 'Resolved' })}
        onNavigateMember={() => navigate('/network/referral-details')}
      />

      {/* Exception Details Modal Window (Desktop wide popup + Mobile bottom sheet) */}
      <ExceptionDetailsModal
        exceptionItem={selectedException}
        isOpen={Boolean(selectedException)}
        onClose={() => setSelectedExceptionId(null)}
        onUpdateException={handleUpdateException}
      />
    </div>
  );
}
