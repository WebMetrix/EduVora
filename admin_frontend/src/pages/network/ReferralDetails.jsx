import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, X, Users, GitFork, FileText, Wallet, History, Eye, UserCheck
} from 'lucide-react';
import ReferralMemberOverview from '../../components/network/ReferralMemberOverview';
import ReferralConnectionsTable from '../../components/network/ReferralConnectionsTable';
import ReferralActivityCard from '../../components/network/ReferralActivityCard';
import ReferralBottomTables from '../../components/network/ReferralBottomTables';

const MEMBERS_DATA = {
  EV100125: {
    id: 'EV100125',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    mobile: '+91 98765 43210',
    registrationDate: '01 Aug 2026, 10:24 AM',
    package: 'Pro',
    accountStatus: 'Active',
    kycStatus: 'Verified',
    referralCode: 'EV100125',
    referralLink: 'https://eduvora.com/r/EV100125',
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
    sponsorInfo: {
      id: 'EV100001',
      name: 'Amit Kumar',
      email: 'amit.kumar@example.com',
      mobile: '+91 98765 12345',
      package: 'Pro',
      registrationDate: '15 Jul 2026, 09:18 AM',
      accountStatus: 'Active',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    },
    summary: {
      direct: 3,
      indirect: 6,
      total: 9,
      earnings: '₹ 12,450',
    },
    referralStatus: {
      relationship: 'Valid',
      hasSponsor: 'Yes (EV100001)',
      sponsorActive: 'Yes',
      eligible: 'Yes',
      level: 'Level 1 (Direct)',
    },
    directReferrals: [
      {
        id: 'EV100124',
        name: 'Priya Verma',
        package: 'Basic',
        date: '12 Aug 2026',
        status: 'Active',
        kycStatus: 'Verified',
        email: 'priya.verma@example.com',
        mobile: '+91 98765 43211',
      },
      {
        id: 'EV100123',
        name: 'Amit Kumar',
        package: 'Pro',
        date: '14 Aug 2026',
        status: 'Active',
        kycStatus: 'Verified',
        email: 'amit.kumar23@example.com',
        mobile: '+91 98765 43212',
      },
      {
        id: 'EV100122',
        name: 'Neha Singh',
        package: 'Starter',
        date: '18 Aug 2026',
        status: 'Pending KYC',
        kycStatus: 'Pending',
        email: 'neha.singh@example.com',
        mobile: '+91 98765 43213',
      },
    ],
    indirectReferrals: [
      {
        id: 'EV100201',
        name: 'Karan Mehta',
        package: 'Starter',
        date: '25 Aug 2026',
        status: 'Active',
        kycStatus: 'Verified',
        email: 'karan.mehta@example.com',
        mobile: '+91 98765 43221',
      },
      {
        id: 'EV100202',
        name: 'Riya Patel',
        package: 'Basic',
        date: '26 Aug 2026',
        status: 'Pending KYC',
        kycStatus: 'Pending',
        email: 'riya.patel@example.com',
        mobile: '+91 98765 43222',
      },
      {
        id: 'EV100203',
        name: 'Suresh Yadav',
        package: 'Pro',
        date: '27 Aug 2026',
        status: 'Active',
        kycStatus: 'Verified',
        email: 'suresh.yadav@example.com',
        mobile: '+91 98765 43223',
      },
      {
        id: 'EV100204',
        name: 'Anjali Singh',
        package: 'Premium',
        date: '28 Aug 2026',
        status: 'Active',
        kycStatus: 'Verified',
        email: 'anjali.singh@example.com',
        mobile: '+91 98765 43224',
      },
      {
        id: 'EV100205',
        name: 'Rohit Das',
        package: 'Starter',
        date: '29 Aug 2026',
        status: 'Inactive',
        kycStatus: 'Pending',
        email: 'rohit.das@example.com',
        mobile: '+91 98765 43225',
      },
      {
        id: 'EV100206',
        name: 'Aditya Rao',
        package: 'Basic',
        date: '30 Aug 2026',
        status: 'Active',
        kycStatus: 'Verified',
        email: 'aditya.rao@example.com',
        mobile: '+91 98765 43226',
      },
    ],
    activities: [
      {
        title: 'Package Activated',
        description: 'Pro package activated successfully.',
        date: '02 Aug 2026',
        time: '11:30 AM',
        dotColor: 'bg-emerald-500',
      },
      {
        title: 'Member Registered',
        description: 'Rahul Sharma registered with referral code.',
        date: '01 Aug 2026',
        time: '10:24 AM',
        dotColor: 'bg-sky-500',
      },
      {
        title: 'Referral Assigned',
        description: 'Sponsor Amit Kumar (EV100001) assigned.',
        date: '01 Aug 2026',
        time: '10:24 AM',
        dotColor: 'bg-amber-400',
      },
      {
        title: 'Email Verified',
        description: 'Email verification completed.',
        date: '01 Aug 2026',
        time: '10:26 AM',
        dotColor: 'bg-emerald-500',
      },
      {
        title: 'KYC Documents Approved',
        description: 'Aadhaar & PAN verification passed automated check.',
        date: '01 Aug 2026',
        time: '04:10 PM',
        dotColor: 'bg-indigo-500',
      },
    ],
    commissions: [
      {
        id: 'COM-101',
        date: '15 Aug 2026',
        type: 'Referral Commission',
        fromUser: 'EV100124 (Priya Verma)',
        level: 1,
        amount: '₹ 1,200',
        status: 'Paid',
      },
      {
        id: 'COM-102',
        date: '20 Aug 2026',
        type: 'Referral Commission',
        fromUser: 'EV100123 (Amit Kumar)',
        level: 1,
        amount: '₹ 1,200',
        status: 'Paid',
      },
      {
        id: 'COM-103',
        date: '22 Aug 2026',
        type: 'Referral Commission',
        fromUser: 'EV100122 (Neha Singh)',
        level: 1,
        amount: '₹ 800',
        status: 'Pending',
      },
    ],
    auditLogs: [
      {
        id: 'AUD-1',
        dateTime: '01 Aug 2026, 10:24 AM',
        action: 'Referral Assigned',
        by: 'System',
        details: 'Sponsor EV100001 assigned',
      },
      {
        id: 'AUD-2',
        dateTime: '01 Aug 2026, 10:24 AM',
        action: 'Member Registered',
        by: 'System',
        details: 'Registered with code EV100125',
      },
      {
        id: 'AUD-3',
        dateTime: '01 Aug 2026, 10:26 AM',
        action: 'Email Verified',
        by: 'System',
        details: 'Email verification completed',
      },
    ],
  },
  EV100001: {
    id: 'EV100001',
    name: 'Amit Kumar',
    email: 'amit.kumar@example.com',
    mobile: '+91 98765 12345',
    registrationDate: '15 Jul 2026, 09:18 AM',
    package: 'Pro',
    accountStatus: 'Active',
    kycStatus: 'Verified',
    referralCode: 'EV100001',
    referralLink: 'https://eduvora.com/r/EV100001',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    sponsorInfo: {
      id: 'EV100000',
      name: 'EduVora Root',
      email: 'root@eduvora.com',
      mobile: '+91 98000 00001',
      package: 'Enterprise',
      registrationDate: '01 Jan 2026, 08:00 AM',
      accountStatus: 'Active',
      avatar: null,
    },
    summary: {
      direct: 2,
      indirect: 3,
      total: 5,
      earnings: '₹ 24,800',
    },
    referralStatus: {
      relationship: 'Valid',
      hasSponsor: 'Yes (EV100000)',
      sponsorActive: 'Yes',
      eligible: 'Yes',
      level: 'Top Sponsor',
    },
    directReferrals: [
      {
        id: 'EV100125',
        name: 'Rahul Sharma',
        package: 'Pro',
        date: '01 Aug 2026',
        status: 'Active',
        kycStatus: 'Verified',
        email: 'rahul.sharma@example.com',
        mobile: '+91 98765 43210',
      },
      {
        id: 'EV100126',
        name: 'Vikram Patel',
        package: 'Premium',
        date: '05 Aug 2026',
        status: 'Active',
        kycStatus: 'Verified',
        email: 'vikram.patel@example.com',
        mobile: '+91 98765 43214',
      },
    ],
    indirectReferrals: [
      {
        id: 'EV100124',
        name: 'Priya Verma',
        package: 'Basic',
        date: '12 Aug 2026',
        status: 'Active',
        kycStatus: 'Verified',
        email: 'priya.verma@example.com',
        mobile: '+91 98765 43211',
      },
      {
        id: 'EV100123',
        name: 'Amit Kumar',
        package: 'Pro',
        date: '14 Aug 2026',
        status: 'Active',
        kycStatus: 'Verified',
        email: 'amit.kumar23@example.com',
        mobile: '+91 98765 43212',
      },
      {
        id: 'EV100122',
        name: 'Neha Singh',
        package: 'Starter',
        date: '18 Aug 2026',
        status: 'Pending KYC',
        kycStatus: 'Pending',
        email: 'neha.singh@example.com',
        mobile: '+91 98765 43213',
      },
    ],
    activities: [
      {
        title: 'Pro Package Renewed',
        description: 'Pro membership extended cleanly.',
        date: '16 Jul 2026',
        time: '10:00 AM',
        dotColor: 'bg-emerald-500',
      },
      {
        title: 'Member Registered',
        description: 'Amit Kumar registered as Root Upline Sponsor.',
        date: '15 Jul 2026',
        time: '09:18 AM',
        dotColor: 'bg-sky-500',
      },
    ],
    commissions: [
      {
        id: 'COM-201',
        date: '02 Aug 2026',
        type: 'Referral Commission',
        fromUser: 'EV100125 (Rahul Sharma)',
        level: 1,
        amount: '₹ 1,800',
        status: 'Paid',
      },
    ],
    auditLogs: [
      {
        id: 'AUD-11',
        dateTime: '15 Jul 2026, 09:18 AM',
        action: 'Member Registered',
        by: 'System',
        details: 'Registered with code EV100001',
      },
    ],
  },
};

export default function ReferralDetails() {
  const navigate = useNavigate();

  const [selectedMemberId, setSelectedMemberId] = useState('EV100125');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFeedback, setSearchFeedback] = useState(null);
  const [activeTab, setActiveTab] = useState('direct');
  const [previewModal, setPreviewModal] = useState(null); // { kind: 'member' | 'commission', data: ... }

  const activeMember = MEMBERS_DATA[selectedMemberId] || MEMBERS_DATA.EV100125;

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

  const handleMemberSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSelectedMemberId('EV100125');
      setSearchFeedback(null);
      return;
    }

    const allMembers = Object.values(MEMBERS_DATA);
    const match = allMembers.find(
      (m) =>
        m.id.toLowerCase() === q ||
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
    );

    if (match) {
      setSelectedMemberId(match.id);
      setActiveTab('direct');
      setSearchFeedback({ type: 'success', message: `Loaded ${match.name} (${match.id})` });
    } else {
      setSearchFeedback({
        type: 'error',
        message: 'No top-level profile found (try EV100125 or EV100001)',
      });
    }
  };

  const handleViewSponsorProfile = (sponsor) => {
    if (sponsor?.id && MEMBERS_DATA[sponsor.id]) {
      setSelectedMemberId(sponsor.id);
      setSearchQuery(sponsor.id);
      setSearchFeedback({ type: 'success', message: `Viewing Sponsor: ${sponsor.name}` });
    } else {
      navigate('/users/view');
    }
  };

  const tabs = [
    {
      id: 'direct',
      label: `Direct Referrals (${activeMember.directReferrals.length})`,
      icon: Users,
    },
    {
      id: 'indirect',
      label: `Indirect Referrals (${activeMember.indirectReferrals.length})`,
      icon: GitFork,
    },
    {
      id: 'activity',
      label: 'Referral Activity',
      icon: FileText,
    },
    {
      id: 'commission',
      label: 'Commission History',
      icon: Wallet,
    },
    {
      id: 'audit',
      label: 'Audit History',
      icon: History,
    },
  ];

  const isIndirectTab = activeTab === 'indirect';
  const tableRows = isIndirectTab
    ? activeMember.indirectReferrals
    : activeMember.directReferrals;
  const tableTitle = isIndirectTab
    ? 'Indirect Referrals (Level 2)'
    : 'Direct Referrals (Level 1)';
  const tableSubtitle = isIndirectTab
    ? `Level 2 members referred through ${activeMember.name}'s direct team.`
    : `Members directly referred by ${activeMember.name}.`;

  return (
    <div className="flex flex-col gap-4 sm:gap-5 animate-fade-in relative pb-1 sm:pb-2">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div>
          <h1 className="text-[20px] sm:text-[26px] lg:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
            Network &amp; Referrals
          </h1>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            View detailed referral information for any member in the platform.
          </p>
        </div>

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
          <span className="text-indigo-600 font-bold">Referral Details</span>
        </nav>
      </div>

      {/* Row 1: Search Member Card */}
      <form
        onSubmit={handleMemberSearch}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-3.5 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.08)] hover:border-indigo-300 transition-all duration-300"
      >
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <label
            htmlFor="referral-details-search"
            className="text-[12px] font-bold text-slate-700 tracking-tight"
          >
            Search Member <span className="text-rose-500">*</span>
          </label>
          {searchFeedback && (
            <span
              className={`text-[11px] font-bold ${
                searchFeedback.type === 'error' ? 'text-rose-600' : 'text-indigo-600'
              }`}
            >
              {searchFeedback.message}
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative flex-1 sm:max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="referral-details-search"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value.trim()) setSearchFeedback(null);
              }}
              placeholder="Enter User ID, name or email"
              className="w-full h-10 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl pl-9 pr-8 text-[12.5px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMemberId('EV100125');
                  setSearchFeedback(null);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 p-0.5 rounded-full hover:bg-slate-100 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="h-10 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-[12.5px] font-bold shadow-sm shadow-indigo-600/20 hover:shadow-md hover:shadow-indigo-600/30 transition-all cursor-pointer shrink-0"
          >
            Search
          </button>
        </div>
      </form>

      {/* Row 2: 3-Column Overview (Member Info, Sponsor Info, Summary + Status) */}
      <ReferralMemberOverview
        member={activeMember}
        onViewSponsorProfile={handleViewSponsorProfile}
      />

      {/* Row 3: Horizontal Navigation Tabs */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-1.5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-x-auto no-scrollbar">
        <div className="grid grid-flow-col auto-cols-max sm:auto-cols-fr gap-1.5 min-w-max sm:min-w-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 4: Direct/Indirect Referrals Table (Left) + Referral Activity (Right) */}
      {(activeTab === 'direct' || activeTab === 'indirect') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
          <div className="lg:col-span-8">
            <ReferralConnectionsTable
              title={tableTitle}
              subtitle={tableSubtitle}
              rows={tableRows}
              onViewMember={(row) => setPreviewModal({ kind: 'member', data: row })}
            />
          </div>

          <div className="lg:col-span-4">
            <ReferralActivityCard
              memberName={activeMember.name}
              activities={activeMember.activities}
            />
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="w-full max-w-[540px]">
          <ReferralActivityCard
            memberName={activeMember.name}
            activities={activeMember.activities}
          />
        </div>
      )}

      {/* Row 5: Commission Reference + Audit History */}
      <ReferralBottomTables
        commissions={activeMember.commissions}
        auditLogs={activeMember.auditLogs}
        focusMode={
          activeTab === 'commission'
            ? 'commission'
            : activeTab === 'audit'
            ? 'audit'
            : 'both'
        }
        onViewCommission={(row) => setPreviewModal({ kind: 'commission', data: row })}
        onViewAllCommissions={() => setActiveTab('commission')}
      />

      {/* Quick Preview Modal (matching Dashboard / User Management Popup Window styling) */}
      {previewModal &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div
              onClick={() => setPreviewModal(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
            />

            <div className="relative z-10 w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-slide-up">
              {/* Compact Header matching Dashboard Modals */}
              <div className="px-4 sm:px-5 py-2.5 sm:py-3 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
                    {previewModal.kind === 'member' ? (
                      <UserCheck className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-900 truncate">
                    {previewModal.kind === 'member'
                      ? 'Referred Member Details'
                      : 'Commission Record'}
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
                {previewModal.kind === 'member' ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">User ID</span>
                      <span className="font-black text-slate-900">{previewModal.data.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Name</span>
                      <span className="font-bold text-slate-900">{previewModal.data.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Email</span>
                      <span className="font-semibold text-slate-800">
                        {previewModal.data.email || '-'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Mobile</span>
                      <span className="font-semibold text-slate-800">
                        {previewModal.data.mobile || '-'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Package</span>
                      <span className="font-bold text-indigo-700">{previewModal.data.package}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Registration Date</span>
                      <span className="font-semibold text-slate-800">{previewModal.data.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Account Status</span>
                      <span className="font-bold text-emerald-700">{previewModal.data.status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">KYC Status</span>
                      <span className="font-bold text-slate-900">{previewModal.data.kycStatus}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Commission ID</span>
                      <span className="font-black text-slate-900">{previewModal.data.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Date</span>
                      <span className="font-semibold text-slate-800">{previewModal.data.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Type</span>
                      <span className="font-bold text-slate-800">{previewModal.data.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">From User</span>
                      <span className="font-bold text-slate-900">{previewModal.data.fromUser}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Tier Level</span>
                      <span className="font-bold text-indigo-700">
                        Level {previewModal.data.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Amount</span>
                      <span className="font-black text-emerald-600 text-[14px]">
                        {previewModal.data.amount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Status</span>
                      <span className="font-bold text-slate-900">{previewModal.data.status}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 sm:px-5 py-3 border-t border-slate-100 bg-slate-50/90 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewModal(null)}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-[12px] font-bold shadow-2xs transition-all cursor-pointer"
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
