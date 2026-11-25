import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar, ChevronDown, Search, Download, X, Trophy, AlertTriangle, ExternalLink
} from 'lucide-react';
import ReferralAnalyticsStats from '../../components/network/ReferralAnalyticsStats';
import ReferralAnalyticsCharts from '../../components/network/ReferralAnalyticsCharts';
import ReferralAnalyticsTables from '../../components/network/ReferralAnalyticsTables';

const TOP_SPONSORS = [
  { id: 'EV10021', name: 'Amit Kumar', direct: 85, level2: 142, activated: 68, rate: '80%', period: '12 Jul 2026', status: 'Active', pkgStatus: 'Activated', level: '1' },
  { id: 'EV10047', name: 'Priya Verma', direct: 72, level2: 118, activated: 54, rate: '75%', period: '10 Aug 2026', status: 'Active', pkgStatus: 'Activated', level: '1' },
  { id: 'EV10063', name: 'Rohit Das', direct: 61, level2: 96, activated: 49, rate: '80%', period: '05 Sep 2026', status: 'Active', pkgStatus: 'Activated', level: '1' },
  { id: 'EV10089', name: 'Neha Singh', direct: 58, level2: 91, activated: 46, rate: '79%', period: '18 Jul 2026', status: 'Active', pkgStatus: 'Purchased', level: '2' },
  { id: 'EV10102', name: 'Suresh Yadav', direct: 52, level2: 84, activated: 40, rate: '77%', period: '22 Aug 2026', status: 'Active', pkgStatus: 'Activated', level: '1' },
  { id: 'EV10114', name: 'Vikram Patel', direct: 47, level2: 73, activated: 36, rate: '77%', period: '29 Aug 2026', status: 'Active', pkgStatus: 'Activated', level: '2' },
  { id: 'EV10128', name: 'Sneha Iyer', direct: 41, level2: 65, activated: 30, rate: '73%', period: '02 Sep 2026', status: 'Pending KYC', pkgStatus: 'Pending', level: '1' },
  { id: 'EV10135', name: 'Karan Mehta', direct: 38, level2: 59, activated: 29, rate: '76%', period: '08 Sep 2026', status: 'Active', pkgStatus: 'Activated', level: '2' },
];

const REFERRAL_EXCEPTIONS = [
  { id: 'EXC-1', issueType: 'Missing Sponsor', count: 8, severity: 'High', description: 'Users registered without an attributed upline sponsor ID.' },
  { id: 'EXC-2', issueType: 'Invalid Referral Code', count: 4, severity: 'Medium', description: 'Referral codes entered at signup did not resolve to an active member.' },
  { id: 'EXC-3', issueType: 'Duplicate Referral', count: 2, severity: 'High', description: 'Potential duplicate referral claims from matching device/IP fingerprints.' },
  { id: 'EXC-4', issueType: 'Suspicious Pattern', count: 3, severity: 'High', description: 'Rapid sequential signups under the same sponsor requiring manual KYC audit.' },
  { id: 'EXC-5', issueType: 'Admin Created (No Sponsor)', count: 6, severity: 'Low', description: 'Accounts created manually by platform administrators without sponsor linkage.' },
];

export default function ReferralAnalytics() {
  const navigate = useNavigate();

  const [draftFilters, setDraftFilters] = useState({
    dateRange: 'this_month',
    level: 'all',
    regStatus: 'all',
    pkgStatus: 'all',
    sponsor: '',
  });
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);
  const [exportFormat, setExportFormat] = useState('CSV');
  const [previewModal, setPreviewModal] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setPreviewModal(null);
    };
    if (previewModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [previewModal]);

  const filteredSponsors = useMemo(() => {
    const q = appliedFilters.sponsor.trim().toLowerCase();
    return TOP_SPONSORS.filter((row) => {
      if (appliedFilters.level !== 'all' && row.level !== appliedFilters.level) return false;
      if (appliedFilters.regStatus !== 'all' && row.status !== appliedFilters.regStatus) return false;
      if (appliedFilters.pkgStatus !== 'all' && row.pkgStatus !== appliedFilters.pkgStatus) return false;
      if (q && !row.id.toLowerCase().includes(q) && !row.name.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [appliedFilters]);

  const handleApplyFilters = (e) => {
    e.preventDefault();
    setAppliedFilters(draftFilters);
  };

  const handleResetFilters = () => {
    const resetState = {
      dateRange: 'this_month',
      level: 'all',
      regStatus: 'all',
      pkgStatus: 'all',
      sponsor: '',
    };
    setDraftFilters(resetState);
    setAppliedFilters(resetState);
  };

  const handleExport = () => {
    const headers = [
      'Sponsor ID',
      'Sponsor Name',
      'Direct Referrals (Level 1)',
      'Level 2 Members',
      'Activated Referrals',
      'Activation Rate',
      'Registration Period',
    ];
    const rows = [
      headers.join(','),
      ...filteredSponsors.map((s) =>
        [
          `"${s.id}"`,
          `"${s.name}"`,
          s.direct,
          s.level2,
          s.activated,
          `"${s.rate}"`,
          `"${s.period}"`,
        ].join(',')
      ),
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `referral_analytics_${exportFormat.toLowerCase()}.csv`;
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
      {/* Top Header + Breadcrumbs + Export */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="text-[20px] sm:text-[26px] lg:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
            Referral Analytics
          </h1>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            Analyze platform-wide referral growth and performance.
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
            <span className="text-indigo-600 font-bold">Referral Analytics</span>
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

      {/* Row 1: Filters Card */}
      <form
        onSubmit={handleApplyFilters}
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

          {/* Referral Level */}
          <div className="lg:col-span-2">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
              Referral Level
            </label>
            <div className="relative">
              <select
                value={draftFilters.level}
                onChange={(e) => setDraftFilters((prev) => ({ ...prev, level: e.target.value }))}
                className="w-full h-11 bg-white border border-slate-200/90 hover:border-indigo-300 focus:border-indigo-500 rounded-xl pl-3 pr-7 text-[12px] font-bold text-slate-700 appearance-none focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value="all">All Levels</option>
                <option value="1">Level 1 (Direct)</option>
                <option value="2">Level 2 (Indirect)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Registration Status */}
          <div className="lg:col-span-2">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
              Registration Status
            </label>
            <div className="relative">
              <select
                value={draftFilters.regStatus}
                onChange={(e) =>
                  setDraftFilters((prev) => ({ ...prev, regStatus: e.target.value }))
                }
                className="w-full h-11 bg-white border border-slate-200/90 hover:border-indigo-300 focus:border-indigo-500 rounded-xl pl-3 pr-7 text-[12px] font-bold text-slate-700 appearance-none focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending KYC">Pending KYC</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Package Status */}
          <div className="lg:col-span-1.5 sm:col-span-1 lg:col-span-1">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1 truncate">
              Package Status
            </label>
            <div className="relative">
              <select
                value={draftFilters.pkgStatus}
                onChange={(e) =>
                  setDraftFilters((prev) => ({ ...prev, pkgStatus: e.target.value }))
                }
                className="w-full h-11 bg-white border border-slate-200/90 hover:border-indigo-300 focus:border-indigo-500 rounded-xl pl-2.5 pr-6 text-[11.5px] font-bold text-slate-700 appearance-none focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value="all">All Status</option>
                <option value="Activated">Activated</option>
                <option value="Purchased">Purchased</option>
                <option value="Pending">Pending</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Sponsor Search */}
          <div className="sm:col-span-2 lg:col-span-2">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
              Sponsor
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={draftFilters.sponsor}
                onChange={(e) =>
                  setDraftFilters((prev) => ({ ...prev, sponsor: e.target.value }))
                }
                placeholder="Search by User ID or name"
                className="w-full h-11 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl pl-8 pr-3 text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Apply & Reset Buttons */}
          <div className="sm:col-span-2 lg:col-span-2 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 h-11 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-[12.5px] font-bold shadow-sm shadow-indigo-600/20 hover:shadow-md hover:shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex-1 h-11 px-4 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 active:scale-98 text-slate-700 text-[12.5px] font-bold shadow-2xs transition-all cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* Row 2 & 3: 8 KPI Stat Cards */}
      <ReferralAnalyticsStats />

      {/* Row 4: 3 Equal-Height Analytics Charts */}
      <ReferralAnalyticsCharts />

      {/* Row 5: Top Performing Sponsors + Referral Exceptions */}
      <ReferralAnalyticsTables
        sponsors={filteredSponsors}
        exceptions={REFERRAL_EXCEPTIONS}
        onViewSponsor={(row) => setPreviewModal({ kind: 'sponsor', data: row })}
        onViewException={(row) => setPreviewModal({ kind: 'exception', data: row })}
      />

      {/* Preview Modal (Desktop & Mobile Bottom-Sheet) */}
      {previewModal &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div
              onClick={() => setPreviewModal(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
            />

            <div className="relative z-10 w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-slide-up">
              {/* Compact Header */}
              <div className="px-4 sm:px-5 py-2.5 sm:py-3 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${previewModal.kind === 'sponsor'
                      ? 'bg-indigo-50 border-indigo-100/80 text-indigo-600'
                      : 'bg-rose-50 border-rose-100 text-rose-500'
                      }`}
                  >
                    {previewModal.kind === 'sponsor' ? (
                      <Trophy className="w-3.5 h-3.5" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-900 truncate">
                    {previewModal.kind === 'sponsor'
                      ? 'Sponsor Performance Details'
                      : 'Referral Exception Summary'}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setPreviewModal(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5 space-y-3 text-[12.5px]">
                {previewModal.kind === 'sponsor' ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Sponsor ID</span>
                      <span className="font-black text-slate-900">{previewModal.data.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Sponsor Name</span>
                      <span className="font-bold text-slate-900">{previewModal.data.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Direct Referrals (Level 1)</span>
                      <span className="font-black text-indigo-700">{previewModal.data.direct}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Level 2 Members</span>
                      <span className="font-bold text-slate-900">{previewModal.data.level2}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Activated Referrals</span>
                      <span className="font-bold text-slate-900">{previewModal.data.activated}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Activation Rate</span>
                      <span className="font-black text-emerald-600">{previewModal.data.rate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Registration Date</span>
                      <span className="font-semibold text-slate-700">{previewModal.data.period}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Issue Type</span>
                      <span className="font-black text-slate-900">{previewModal.data.issueType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Flagged Count</span>
                      <span className="font-black text-rose-600">{previewModal.data.count} cases</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Priority</span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold">
                        {previewModal.data.severity}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-slate-500 font-medium block mb-1">Description</span>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {previewModal.data.description}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 sm:px-5 py-3 border-t border-slate-100 bg-slate-50/90 flex flex-col sm:flex-row items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const target =
                      previewModal.kind === 'sponsor'
                        ? '/network/referral-details'
                        : '/network/referral-exceptions';
                    setPreviewModal(null);
                    navigate(target);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-bold shadow-xs transition-all cursor-pointer"
                >
                  <span>
                    {previewModal.kind === 'sponsor' ? 'Open Referral Details' : 'Review Exceptions'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewModal(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-[12px] font-bold shadow-2xs transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
