import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Users, X, User, Check, Clock,
  Search, Calendar, ChevronDown, ChevronLeft, ChevronRight,
  Download, Eye, MoreVertical, ShieldCheck, Mail, Phone
} from 'lucide-react';
import UserDetailsModal from './UserDetailsModal';
import KycDetailsModal from './KycDetailsModal';

// Mock Recent Users Dataset matching the provided design
const initialRecentUsers = [
  {
    id: 1,
    userId: 'EVU001248',
    name: 'Rajesh Kumar',
    email: 'rajesh@gmail.com',
    mobile: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    package: 'Business Starter',
    registrationDate: '31 Aug 2026, 10:24 AM',
    kycStatus: 'Verified',
    accountStatus: 'Active',
  },
  {
    id: 2,
    userId: 'EVU001247',
    name: 'Priya Sharma',
    email: 'priya@gmail.com',
    mobile: '+91 91234 56789',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    package: 'Growth Pack',
    registrationDate: '31 Aug 2026, 09:12 AM',
    kycStatus: 'Pending',
    accountStatus: 'Active',
  },
  {
    id: 3,
    userId: 'EVU001246',
    name: 'Arjun Mehta',
    email: 'arjun@gmail.com',
    mobile: '+91 99887 66554',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    package: 'Premium Pack',
    registrationDate: '30 Aug 2026, 04:20 PM',
    kycStatus: 'Verified',
    accountStatus: 'Active',
  },
  {
    id: 4,
    userId: 'EVU001245',
    name: 'Sneha Iyer',
    email: 'sneha@gmail.com',
    mobile: '+91 87654 32109',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
    package: 'Business Starter',
    registrationDate: '30 Aug 2026, 11:05 AM',
    kycStatus: 'Under Review',
    accountStatus: 'Active',
  },
  {
    id: 5,
    userId: 'EVU001244',
    name: 'Vikram Singh',
    email: 'vikram@gmail.com',
    mobile: '+91 76543 21098',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    package: 'Growth Pack',
    registrationDate: '29 Aug 2026, 03:40 PM',
    kycStatus: 'Verified',
    accountStatus: 'Active',
  },
  {
    id: 6,
    userId: 'EVU001243',
    name: 'Amit Verma',
    email: 'amit@gmail.com',
    mobile: '+91 91234 87650',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    package: 'Premium Pack',
    registrationDate: '29 Aug 2026, 12:18 PM',
    kycStatus: 'Rejected',
    accountStatus: 'Inactive',
  },
  {
    id: 7,
    userId: 'EVU001242',
    name: 'Kavya Nair',
    email: 'kavya@gmail.com',
    mobile: '+91 90876 54321',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    package: 'Business Starter',
    registrationDate: '28 Aug 2026, 09:55 AM',
    kycStatus: 'Verified',
    accountStatus: 'Active',
  },
  {
    id: 8,
    userId: 'EVU001241',
    name: 'Manish Gupta',
    email: 'manish@gmail.com',
    mobile: '+91 98712 34567',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    package: 'Growth Pack',
    registrationDate: '28 Aug 2026, 08:30 AM',
    kycStatus: 'Pending',
    accountStatus: 'Active',
  },
  {
    id: 9,
    userId: 'EVU001240',
    name: 'Pooja Das',
    email: 'pooja@gmail.com',
    mobile: '+91 93456 78901',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    package: 'Premium Pack',
    registrationDate: '27 Aug 2026, 06:45 PM',
    kycStatus: 'Verified',
    accountStatus: 'Active',
  },
  {
    id: 10,
    userId: 'EVU001239',
    name: 'Rohan Patel',
    email: 'rohan@gmail.com',
    mobile: '+91 92345 67890',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    package: 'Business Starter',
    registrationDate: '27 Aug 2026, 02:15 PM',
    kycStatus: 'Under Review',
    accountStatus: 'Active',
  },
  {
    id: 11,
    userId: 'EVU001238',
    name: 'Ananya Roy',
    email: 'ananya@gmail.com',
    mobile: '+91 94567 12345',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    package: 'Growth Pack',
    registrationDate: '26 Aug 2026, 04:10 PM',
    kycStatus: 'Verified',
    accountStatus: 'Active',
  },
  {
    id: 12,
    userId: 'EVU001237',
    name: 'Suresh Raina',
    email: 'suresh@gmail.com',
    mobile: '+91 95678 23456',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&auto=format&fit=crop&q=80',
    package: 'Premium Pack',
    registrationDate: '25 Aug 2026, 11:45 AM',
    kycStatus: 'Pending',
    accountStatus: 'Inactive',
  }
];

export default function RecentUsersModal({ isOpen, onClose }) {
  const [users, setUsers] = useState(initialRecentUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountStatusFilter, setAccountStatusFilter] = useState('All Status');
  const [kycStatusFilter, setKycStatusFilter] = useState('All Status');
  const [packageFilter, setPackageFilter] = useState('All Packages');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewingKycUser, setViewingKycUser] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedUser) {
          setSelectedUser(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedUser, onClose]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mobile.includes(searchQuery) ||
        user.package.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAccountStatus =
        accountStatusFilter === 'All Status' || user.accountStatus.toLowerCase() === accountStatusFilter.toLowerCase();

      const matchesKycStatus =
        kycStatusFilter === 'All Status' || user.kycStatus.toLowerCase() === kycStatusFilter.toLowerCase();

      const matchesPackage =
        packageFilter === 'All Packages' || user.package.toLowerCase() === packageFilter.toLowerCase();

      return matchesSearch && matchesAccountStatus && matchesKycStatus && matchesPackage;
    });
  }, [users, searchQuery, accountStatusFilter, kycStatusFilter, packageFilter]);

  const totalUsersCount = 1248;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const currentRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const handleReset = () => {
    setSearchQuery('');
    setAccountStatusFilter('All Status');
    setKycStatusFilter('All Status');
    setPackageFilter('All Packages');
    setCurrentPage(1);
  };

  const handleExport = () => {
    setIsExporting(true);
    const headers = ['#', 'User ID', 'Name', 'Email', 'Mobile', 'Package', 'Registration Date', 'KYC Status', 'Account Status'];
    const rows = filteredUsers.map((u, i) => [
      i + 1,
      u.userId,
      `"${u.name}"`,
      u.email,
      `"${u.mobile}"`,
      `"${u.package}"`,
      `"${u.registrationDate}"`,
      u.kycStatus,
      u.accountStatus
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `recent_users_records_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsExporting(false), 600);
  };

  if (!isOpen) return null;

  const getKycBadge = (status) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60 whitespace-nowrap">
            Verified
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-amber-50 text-amber-600 border border-amber-200/60 whitespace-nowrap">
            Pending
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-blue-50 text-blue-600 border border-blue-200/60 whitespace-nowrap">
            Under Review
          </span>
        );
      case 'Rejected':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60 whitespace-nowrap">
            Rejected
          </span>
        );
    }
  };

  const getAccountBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10.5px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60 whitespace-nowrap">
            Active
          </span>
        );
      case 'Inactive':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10.5px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60 whitespace-nowrap">
            Inactive
          </span>
        );
    }
  };

  const getPackageBadge = (pkg) => {
    switch (pkg) {
      case 'Business Starter':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-200/60 whitespace-nowrap">
            Business Starter
          </span>
        );
      case 'Growth Pack':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold bg-purple-50 text-purple-600 border border-purple-200/60 whitespace-nowrap">
            Growth Pack
          </span>
        );
      case 'Premium Pack':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-200/60 whitespace-nowrap">
            Premium Pack
          </span>
        );
    }
  };

  const renderDateTime = (dateTimeStr) => {
    if (!dateTimeStr || dateTimeStr === '-') {
      return <span className="text-slate-400 font-medium">-</span>;
    }
    const parts = dateTimeStr.split(', ');
    if (parts.length === 2) {
      return (
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-slate-700 text-[11.5px] whitespace-nowrap">{parts[0]}</span>
          <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap mt-0.5">{parts[1]}</span>
        </div>
      );
    }
    return <span className="font-medium text-slate-600 text-[11.5px] whitespace-nowrap">{dateTimeStr}</span>;
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="w-full h-[90vh] md:h-[620px] lg:h-[670px] md:max-h-[92vh] md:max-w-5xl bg-white rounded-t-3xl md:rounded-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 overflow-hidden modal-slide-up md:modal-fade-in">
        {/* Mobile Drag Handle */}
        <div onClick={onClose} className="w-full flex justify-center pt-3 pb-1 md:hidden bg-white shrink-0 cursor-pointer">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-5 py-2 md:py-2.5 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <h2 className="text-[14.5px] md:text-[15px] font-bold text-slate-900">
              Recent Users
            </h2>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              • View and manage recently registered users on the platform.
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700 cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Container */}
        <div className="flex-1 min-h-0 flex flex-col p-3 md:p-4 gap-2.5 sm:gap-3 bg-white overflow-hidden">
          {/* Top 4 Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-2.5 shrink-0">
            {/* Card 1: Total Users */}
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-linear-to-br from-white/95 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/70 p-2.5 md:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.15)] hover:border-indigo-300 hover:-translate-y-0.5 md:hover:-translate-y-1 transition-all duration-300 group flex items-center gap-2.5">
              <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10 w-8 h-8 md:w-9 md:h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <User className="w-4 h-4 md:w-4.5 md:h-4.5" />
              </div>
              <div className="relative z-10 min-w-0">
                <span className="block text-[10px] md:text-[10.5px] font-semibold text-slate-500 group-hover:text-slate-700 transition-colors truncate">
                  Total Users
                </span>
                <span className="text-[17px] md:text-[18px] font-black text-slate-900 group-hover:text-indigo-950 transition-colors leading-tight">
                  1,248
                </span>
              </div>
            </div>

            {/* Card 2: Active Users */}
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-linear-to-br from-white/95 to-emerald-50/40 backdrop-blur-xl border border-emerald-100/70 p-2.5 md:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(16,185,129,0.15)] hover:border-emerald-300 hover:-translate-y-0.5 md:hover:-translate-y-1 transition-all duration-300 group flex items-center gap-2.5">
              <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-400/15 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Check className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[3]" />
              </div>
              <div className="relative z-10 min-w-0">
                <span className="block text-[10px] md:text-[10.5px] font-semibold text-slate-500 group-hover:text-slate-700 transition-colors truncate">
                  Active Users
                </span>
                <span className="text-[17px] md:text-[18px] font-black text-slate-900 group-hover:text-emerald-950 transition-colors leading-tight">
                  1,082
                </span>
              </div>
              <span className="relative z-10 ml-auto text-[11px] md:text-[11.5px] font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
                87%
              </span>
            </div>

            {/* Card 3: Pending KYC */}
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-linear-to-br from-white/95 to-amber-50/40 backdrop-blur-xl border border-amber-100/70 p-2.5 md:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(245,158,11,0.15)] hover:border-amber-300 hover:-translate-y-0.5 md:hover:-translate-y-1 transition-all duration-300 group flex items-center gap-2.5">
              <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/15 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[2.5]" />
              </div>
              <div className="relative z-10 min-w-0">
                <span className="block text-[10px] md:text-[10.5px] font-semibold text-slate-500 group-hover:text-slate-700 transition-colors truncate">
                  Pending KYC
                </span>
                <span className="text-[17px] md:text-[18px] font-black text-slate-900 group-hover:text-amber-950 transition-colors leading-tight">
                  96
                </span>
              </div>
              <span className="relative z-10 ml-auto text-[11px] md:text-[11.5px] font-bold text-slate-400 group-hover:text-amber-600 transition-colors">
                8%
              </span>
            </div>

            {/* Card 4: Inactive Users */}
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-linear-to-br from-white/95 to-rose-50/40 backdrop-blur-xl border border-rose-100/70 p-2.5 md:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(244,63,94,0.15)] hover:border-rose-300 hover:-translate-y-0.5 md:hover:-translate-y-1 transition-all duration-300 group flex items-center gap-2.5">
              <div className="absolute top-0 right-0 w-28 h-28 bg-rose-400/15 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <X className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[3]" />
              </div>
              <div className="relative z-10 min-w-0">
                <span className="block text-[10px] md:text-[10.5px] font-semibold text-slate-500 group-hover:text-slate-700 transition-colors truncate">
                  Inactive Users
                </span>
                <span className="text-[17px] md:text-[18px] font-black text-slate-900 group-hover:text-rose-950 transition-colors leading-tight">
                  70
                </span>
              </div>
              <span className="relative z-10 ml-auto text-[11px] md:text-[11.5px] font-bold text-slate-400 group-hover:text-rose-600 transition-colors">
                6%
              </span>
            </div>
          </div>

          {/* Filters & Actions Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 pt-0.5 shrink-0">
            <div className="flex-1 min-w-[200px] lg:max-w-sm">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by User ID, name, email or mobile..."
                  className="w-full pl-8 pr-3 py-1.5 md:py-2 bg-white border border-slate-200 rounded-xl text-[12px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 transition-all shadow-2xs"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Account Status Filter */}
              <div className="relative">
                <select
                  value={accountStatusFilter}
                  onChange={(e) => {
                    setAccountStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-1.5 md:py-2 pr-7 text-[11.5px] md:text-[12px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:border-indigo-500 transition-colors shadow-2xs cursor-pointer min-w-[110px]"
                >
                  <option value="All Status">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* KYC Status Filter */}
              <div className="relative">
                <select
                  value={kycStatusFilter}
                  onChange={(e) => {
                    setKycStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-1.5 md:py-2 pr-7 text-[11.5px] md:text-[12px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:border-indigo-500 transition-colors shadow-2xs cursor-pointer min-w-[115px]"
                >
                  <option value="All Status">All Status</option>
                  <option value="Verified">Verified</option>
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Package Filter */}
              <div className="relative">
                <select
                  value={packageFilter}
                  onChange={(e) => {
                    setPackageFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-1.5 md:py-2 pr-7 text-[11.5px] md:text-[12px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:border-indigo-500 transition-colors shadow-2xs cursor-pointer min-w-[115px]"
                >
                  <option value="All Packages">All Packages</option>
                  <option value="Business Starter">Business Starter</option>
                  <option value="Growth Pack">Growth Pack</option>
                  <option value="Premium Pack">Premium Pack</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Date Filter */}
              <button
                type="button"
                className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 md:py-2 text-[11.5px] md:text-[12px] font-semibold text-slate-700 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Select date range</span>
              </button>

              {/* Reset */}
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-1.5 md:py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11.5px] md:text-[12px] font-bold rounded-xl transition-colors shadow-2xs cursor-pointer"
              >
                Reset
              </button>

              {/* Export */}
              <button
                type="button"
                onClick={handleExport}
                disabled={isExporting}
                className="px-3.5 py-1.5 md:py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[11.5px] md:text-[12px] font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isExporting ? 'Export' : 'Export'}</span>
              </button>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:flex flex-col flex-1 min-h-0 border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs bg-white">
            {/* Fixed Header */}
            <div className="bg-slate-50/95 border-b border-slate-200/80 shrink-0 pr-[6px]">
              <table className="w-full table-fixed text-left border-collapse">
                <colgroup>
                  <col style={{ width: '36px' }} />
                  <col style={{ width: '95px' }} />
                  <col style={{ width: '210px' }} />
                  <col style={{ width: '130px' }} />
                  <col style={{ width: '115px' }} />
                  <col style={{ width: '115px' }} />
                  <col style={{ width: '110px' }} />
                  <col style={{ width: '60px' }} />
                </colgroup>
                <thead>
                  <tr className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 px-2 text-center">#</th>
                    <th className="py-2.5 px-2">User ID</th>
                    <th className="py-2.5 px-2">User Details</th>
                    <th className="py-2.5 px-2">Package</th>
                    <th className="py-2.5 px-2">
                      <span className="block whitespace-nowrap leading-tight">Registration</span>
                      <span className="block whitespace-nowrap leading-tight">Date</span>
                    </th>
                    <th className="py-2.5 px-2">
                      <span className="block whitespace-nowrap leading-tight">KYC Status</span>
                    </th>
                    <th className="py-2.5 px-2">
                      <span className="block whitespace-nowrap leading-tight">Account</span>
                      <span className="block whitespace-nowrap leading-tight">Status</span>
                    </th>
                    <th className="py-2.5 px-2 text-center">Actions</th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar">
              <table className="w-full table-fixed text-left border-collapse text-[12px]">
                <colgroup>
                  <col style={{ width: '36px' }} />
                  <col style={{ width: '95px' }} />
                  <col style={{ width: '210px' }} />
                  <col style={{ width: '130px' }} />
                  <col style={{ width: '115px' }} />
                  <col style={{ width: '115px' }} />
                  <col style={{ width: '110px' }} />
                  <col style={{ width: '60px' }} />
                </colgroup>
                <tbody className="divide-y divide-indigo-100/30">
                  {currentRecords.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-10 text-center text-slate-400 font-medium">
                        No users found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    currentRecords.map((item, idx) => (
                      <tr
                        key={item.id}
                        className="group border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300 cursor-pointer"
                      >
                        <td className="py-2.5 px-2 text-center text-slate-400 font-semibold text-[11px] rounded-l-xl">
                          {(currentPage - 1) * itemsPerPage + idx + 1}
                        </td>
                        <td className="py-2.5 px-2 font-bold text-slate-800 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                          {item.userId}
                        </td>
                        <td className="py-2.5 px-2 min-w-0">
                          <div className="flex items-center gap-2">
                            <img
                              src={item.avatar}
                              alt={item.name}
                              className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200/80 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xs"
                            />
                            <div className="flex flex-col min-w-0">
                              <span className="font-bold text-slate-900 group-hover:text-indigo-950 transition-colors leading-tight truncate">
                                {item.name}
                              </span>
                              <span className="text-[10.5px] font-medium text-slate-400 leading-tight truncate">
                                {item.email} <span className="text-slate-300">|</span> {item.mobile}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 px-2 whitespace-nowrap">
                          {getPackageBadge(item.package)}
                        </td>
                        <td className="py-2.5 px-2">
                          {renderDateTime(item.registrationDate)}
                        </td>
                        <td className="py-2.5 px-2">
                          <span className="inline-block transition-transform duration-300 group-hover:scale-105 shadow-2xs">
                            {getKycBadge(item.kycStatus)}
                          </span>
                        </td>
                        <td className="py-2.5 px-2">
                          <span className="inline-block transition-transform duration-300 group-hover:scale-105 shadow-2xs">
                            {getAccountBadge(item.accountStatus)}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-center rounded-r-xl">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => setSelectedUser(item)}
                              className="p-1 rounded-lg text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 transition-all duration-300 group-hover:scale-110 cursor-pointer"
                              title="View User Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-300 group-hover:scale-110 cursor-pointer"
                              title="More Options"
                            >
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex-1 min-h-0 overflow-y-auto custom-scrollbar flex flex-col gap-2.5 pr-0.5">
            {currentRecords.length === 0 ? (
              <div className="py-8 text-center text-slate-400 font-medium bg-white rounded-xl border border-slate-200">
                No users found.
              </div>
            ) : (
              currentRecords.map((item) => (
                <div
                  key={item.id}
                  className="group p-3 sm:p-4 flex flex-col gap-2.5 bg-white/60 border border-indigo-100/50 rounded-2xl hover:bg-white hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative z-10"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200/80 transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight truncate">
                          {item.name}
                        </span>
                        <span className="text-[10.5px] font-semibold text-slate-400">
                          {item.userId}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-1.5">
                      <span className="inline-block transition-transform duration-300 group-hover:scale-105 shadow-2xs">
                        {getAccountBadge(item.accountStatus)}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedUser(item)}
                        className="p-1 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[9.5px] font-bold uppercase">Package</span>
                      <div className="mt-0.5">{getPackageBadge(item.package)}</div>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9.5px] font-bold uppercase">KYC Status</span>
                      <div className="mt-0.5">{getKycBadge(item.kycStatus)}</div>
                    </div>
                  </div>

                  <div className="text-[10.5px] text-slate-500 bg-slate-50 rounded-lg px-2.5 py-1.5 flex items-center justify-between">
                    <span className="truncate">{item.email}</span>
                    <span className="whitespace-nowrap">{item.registrationDate}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 md:px-5 py-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white shrink-0">
          <span className="text-[11.5px] font-semibold text-slate-500">
            Showing {filteredUsers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, totalUsersCount)} of {totalUsersCount} users
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded-lg text-[11.5px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <span className="px-1 text-slate-400 text-xs">...</span>

            <button
              onClick={() => setCurrentPage(125)}
              className={`w-7 h-7 rounded-lg text-[11.5px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                currentPage === 125
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              125
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(125, p + 1))}
              disabled={currentPage === 125}
              className="w-7 h-7 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Nested User Detail Dialog (View All -> Actions Click Window) */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
        onViewKyc={() => setViewingKycUser(selectedUser)}
      />

      {/* KYC Details Dialog if triggered from within User Details */}
      <KycDetailsModal
        user={viewingKycUser}
        isOpen={Boolean(viewingKycUser)}
        onClose={() => setViewingKycUser(null)}
      />
    </div>,
    document.body
  );
}
