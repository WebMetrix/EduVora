import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ShieldCheck, X, User, Check, Clock, FileText, Search,
  Calendar, ChevronDown, ChevronLeft, ChevronRight, Download,
  Eye, CheckCircle2, AlertCircle, XCircle
} from 'lucide-react';
import KycDetailsModal from './KycDetailsModal';

// Mock KYC Dataset matching the provided design
const initialKycUsers = [
  {
    id: 1,
    userId: 'EVU001248',
    name: 'Rajesh Kumar',
    email: 'rajesh@gmail.com',
    mobile: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    kycType: 'Aadhar Card',
    registeredOn: '31 Aug 2026, 10:24 AM',
    submissionDate: '31 Aug 2026, 10:24 AM',
    status: 'Approved',
    reviewedBy: 'Neha Sharma',
    reviewedDate: '01 Sep 2026, 11:30 AM',
    aadharNumber: 'XXXX XXXX 1234',
    panNumber: 'ABCDE1234F',
    nameOnDocument: 'Rajesh Kumar',
    dob: '15 Oct 2000',
    gender: 'Male',
    address: '123, MG Road,\nAndheri West, Mumbai,\nMaharashtra - 400053',
    remarks: 'Documents verified successfully. All details are valid.',
    remarkAuthor: 'Neha Sharma (01 Sep 2026, 11:30 AM)'
  },
  {
    id: 2,
    userId: 'EVU001247',
    name: 'Priya Sharma',
    email: 'priya@gmail.com',
    mobile: '+91 91234 56789',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    kycType: 'PAN Card',
    registeredOn: '31 Aug 2026, 09:12 AM',
    submissionDate: '31 Aug 2026, 09:12 AM',
    status: 'Under Review',
    reviewedBy: '-',
    reviewedDate: '-',
    aadharNumber: 'XXXX XXXX 5678',
    panNumber: 'ABCDE1234F',
    nameOnDocument: 'Priya Sharma',
    dob: '22 Feb 1998',
    gender: 'Female',
    address: '45, Park Street, Bandra,\nMumbai, Maharashtra - 400050',
    remarks: 'Documents are currently under review by compliance team.',
    remarkAuthor: 'Automated System (31 Aug 2026, 09:15 AM)'
  },
  {
    id: 3,
    userId: 'EVU001246',
    name: 'Arjun Mehta',
    email: 'arjun@gmail.com',
    mobile: '+91 99887 66554',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    kycType: 'Aadhar Card',
    registeredOn: '30 Aug 2026, 04:20 PM',
    submissionDate: '30 Aug 2026, 04:20 PM',
    status: 'Rejected',
    reviewedBy: 'Vikram Singh',
    reviewedDate: '31 Aug 2026, 10:15 AM',
    aadharNumber: 'XXXX XXXX 9912',
    panNumber: 'ARJPM9912K',
    nameOnDocument: 'Arjun Mehta',
    dob: '10 Jun 1995',
    gender: 'Male',
    address: '88, Ring Road, Connaught Place,\nNew Delhi - 110001',
    rejectReason: 'Blurry document image submitted.',
    remarks: 'Blurry document image submitted. Re-upload requested with clear high-resolution copies.',
    remarkAuthor: 'Vikram Singh (31 Aug 2026, 10:15 AM)'
  },
  {
    id: 4,
    userId: 'EVU001245',
    name: 'Sneha Iyer',
    email: 'sneha@gmail.com',
    mobile: '+91 87654 32109',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
    kycType: 'Passport',
    registeredOn: '30 Aug 2026, 11:05 AM',
    submissionDate: '30 Aug 2026, 11:05 AM',
    status: 'Approved',
    reviewedBy: 'Neha Sharma',
    reviewedDate: '31 Aug 2026, 02:45 PM',
    aadharNumber: 'XXXX XXXX 8732',
    panNumber: 'SNEIP8732L',
    nameOnDocument: 'Sneha Iyer',
    dob: '14 Dec 1999',
    gender: 'Female',
    address: '12, Indiranagar 100ft Road,\nBangalore, Karnataka - 560038',
    remarks: 'Documents verified successfully. All details are valid.',
    remarkAuthor: 'Neha Sharma (31 Aug 2026, 02:45 PM)'
  },
  {
    id: 5,
    userId: 'EVU001244',
    name: 'Vikram Singh',
    email: 'vikram@gmail.com',
    mobile: '+91 76543 21098',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    kycType: 'Driving License',
    registeredOn: '29 Aug 2026, 03:40 PM',
    submissionDate: '29 Aug 2026, 03:40 PM',
    status: 'Pending',
    reviewedBy: '-',
    reviewedDate: '-',
    aadharNumber: 'XXXX XXXX 8129',
    panNumber: 'VIKPS8129M',
    nameOnDocument: 'Vikram Singh',
    dob: '04 Apr 1992',
    gender: 'Male',
    address: '56, Civil Lines,\nJaipur, Rajasthan - 302006',
    remarks: 'KYC application awaiting review in processing queue.',
    remarkAuthor: 'System Automated Queue'
  },
  {
    id: 6,
    userId: 'EVU001243',
    name: 'Amit Verma',
    email: 'amit@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    kycType: 'Voter ID',
    submissionDate: '29 Aug 2026, 12:18 PM',
    status: 'Under Review',
    reviewedBy: '-',
    reviewedDate: '-',
    documentNumber: 'VTR-882194',
  },
  {
    id: 7,
    userId: 'EVU001242',
    name: 'Kavya Nair',
    email: 'kavya@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    kycType: 'PAN Card',
    submissionDate: '28 Aug 2026, 09:55 AM',
    status: 'Approved',
    reviewedBy: 'Rohit Verma',
    reviewedDate: '29 Aug 2026, 01:10 PM',
    documentNumber: 'BKPNA5678Q',
  },
  {
    id: 8,
    userId: 'EVU001241',
    name: 'Manish Gupta',
    email: 'manish@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    kycType: 'Aadhar Card',
    submissionDate: '28 Aug 2026, 08:30 AM',
    status: 'Rejected',
    reviewedBy: 'Vikram Singh',
    reviewedDate: '29 Aug 2026, 10:25 AM',
    documentNumber: 'XXXX-XXXX-3341',
    rejectReason: 'Name does not match registration name.',
  },
  {
    id: 9,
    userId: 'EVU001240',
    name: 'Pooja Das',
    email: 'pooja@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    kycType: 'Driving License',
    submissionDate: '27 Aug 2026, 06:45 PM',
    status: 'Approved',
    reviewedBy: 'Neha Sharma',
    reviewedDate: '28 Aug 2026, 11:20 AM',
    documentNumber: 'DL-092019004512',
  },
  {
    id: 10,
    userId: 'EVU001239',
    name: 'Rohan Patel',
    email: 'rohan@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    kycType: 'PAN Card',
    submissionDate: '27 Aug 2026, 02:15 PM',
    status: 'Pending',
    reviewedBy: '-',
    reviewedDate: '-',
    documentNumber: 'XYZPR9988K',
  },
  {
    id: 11,
    userId: 'EVU001238',
    name: 'Ananya Roy',
    email: 'ananya@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    kycType: 'Passport',
    submissionDate: '26 Aug 2026, 04:10 PM',
    status: 'Approved',
    reviewedBy: 'Neha Sharma',
    reviewedDate: '27 Aug 2026, 10:00 AM',
    documentNumber: 'M4481902',
  },
  {
    id: 12,
    userId: 'EVU001237',
    name: 'Suresh Raina',
    email: 'suresh@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&auto=format&fit=crop&q=80',
    kycType: 'Aadhar Card',
    submissionDate: '25 Aug 2026, 11:45 AM',
    status: 'Under Review',
    reviewedBy: '-',
    reviewedDate: '-',
    documentNumber: 'XXXX-XXXX-6612',
  }
];

export default function KycStatusModal({ isOpen, onClose }) {
  const [users, setUsers] = useState(initialKycUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const itemsPerPage = 10;

  // Prevent background scrolling and compensate scrollbar width (identical to PackageDetailsModal)
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

  // Handle ESC key to close
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

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All Status' || user.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesType =
        typeFilter === 'All Types' || user.kycType.toLowerCase() === typeFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [users, searchQuery, statusFilter, typeFilter]);

  // Pagination calculation
  const totalUsersCount = 248; // Total users in system
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const currentRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const handleReset = () => {
    setSearchQuery('');
    setStatusFilter('All Status');
    setTypeFilter('All Types');
    setCurrentPage(1);
  };

  const handleExport = () => {
    setIsExporting(true);
    const headers = ['#', 'User ID', 'Name', 'Email', 'KYC Type', 'Submission Date', 'Status', 'Reviewed By', 'Reviewed Date'];
    const rows = filteredUsers.map((u, i) => [
      i + 1,
      u.userId,
      u.name,
      u.email,
      u.kycType,
      `"${u.submissionDate}"`,
      u.status,
      u.reviewedBy,
      `"${u.reviewedDate}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kyc_status_records_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsExporting(false), 600);
  };

  if (!isOpen) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60 whitespace-nowrap">
            Approved
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-amber-50 text-amber-600 border border-amber-200/60 whitespace-nowrap">
            Under Review
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60 whitespace-nowrap">
            Rejected
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-slate-100 text-slate-600 border border-slate-200/70 whitespace-nowrap">
            Pending
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
      {/* Backdrop overlay */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Modal Window Box - Dimensions and mobile slide-up matched with PackageDetailsModal */}
      <div
        className="w-full h-[90vh] md:h-[620px] lg:h-[670px] md:max-h-[92vh] md:max-w-5xl bg-white rounded-t-3xl md:rounded-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 overflow-hidden modal-slide-up md:modal-fade-in"
      >
        {/* Mobile Drag Handle Bar */}
        <div
          onClick={onClose}
          className="w-full flex justify-center pt-3 pb-1 md:hidden bg-white shrink-0 cursor-pointer"
        >
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Compact Header - Matched with PackageDetailsModal dimensions & height */}
        <div className="flex items-center justify-between px-4 md:px-5 py-2 md:py-2.5 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <h2 className="text-[14.5px] md:text-[15px] font-bold text-slate-900">
              KYC Status
            </h2>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              • View and manage verification status of all users
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

        {/* Content Container - Fixed upper controls, scrolling only for table contents */}
        <div className="flex-1 min-h-0 flex flex-col p-3 md:p-4 gap-2.5 sm:gap-3 bg-white overflow-hidden">
          {/* Top 5 Metric Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-2.5 shrink-0">
            {/* Card 1: Total Users */}
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-linear-to-br from-white/95 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/70 p-2.5 md:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.15)] hover:border-indigo-300 hover:-translate-y-0.5 md:hover:-translate-y-1 transition-all duration-300 group flex items-center gap-2.5">
              {/* Decorative hover gradient flare */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10 w-8 h-8 md:w-9 md:h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <User className="w-4 h-4 md:w-4.5 md:h-4.5" />
              </div>
              <div className="relative z-10 min-w-0">
                <span className="block text-[10px] md:text-[10.5px] font-semibold text-slate-500 group-hover:text-slate-700 transition-colors truncate">
                  Total Users
                </span>
                <span className="text-[17px] md:text-[18px] font-black text-slate-900 group-hover:text-indigo-950 transition-colors leading-tight">
                  248
                </span>
              </div>
            </div>

            {/* Card 2: Approved */}
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-linear-to-br from-white/95 to-emerald-50/40 backdrop-blur-xl border border-emerald-100/70 p-2.5 md:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(16,185,129,0.15)] hover:border-emerald-300 hover:-translate-y-0.5 md:hover:-translate-y-1 transition-all duration-300 group flex items-center gap-2.5">
              {/* Decorative hover gradient flare */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-400/15 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Check className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[3]" />
              </div>
              <div className="relative z-10 min-w-0">
                <span className="block text-[10px] md:text-[10.5px] font-semibold text-slate-500 group-hover:text-slate-700 transition-colors truncate">
                  Approved
                </span>
                <span className="text-[17px] md:text-[18px] font-black text-slate-900 group-hover:text-emerald-950 transition-colors leading-tight">
                  186
                </span>
              </div>
              <span className="relative z-10 ml-auto text-[11px] md:text-[11.5px] font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
                75%
              </span>
            </div>

            {/* Card 3: Under Review */}
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-linear-to-br from-white/95 to-amber-50/40 backdrop-blur-xl border border-amber-100/70 p-2.5 md:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(245,158,11,0.15)] hover:border-amber-300 hover:-translate-y-0.5 md:hover:-translate-y-1 transition-all duration-300 group flex items-center gap-2.5">
              {/* Decorative hover gradient flare */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/15 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[2.5]" />
              </div>
              <div className="relative z-10 min-w-0">
                <span className="block text-[10px] md:text-[10.5px] font-semibold text-slate-500 group-hover:text-slate-700 transition-colors truncate">
                  Under Review
                </span>
                <span className="text-[17px] md:text-[18px] font-black text-slate-900 group-hover:text-amber-950 transition-colors leading-tight">
                  32
                </span>
              </div>
              <span className="relative z-10 ml-auto text-[11px] md:text-[11.5px] font-bold text-slate-400 group-hover:text-amber-600 transition-colors">
                13%
              </span>
            </div>

            {/* Card 4: Rejected */}
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-linear-to-br from-white/95 to-rose-50/40 backdrop-blur-xl border border-rose-100/70 p-2.5 md:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(244,63,94,0.15)] hover:border-rose-300 hover:-translate-y-0.5 md:hover:-translate-y-1 transition-all duration-300 group flex items-center gap-2.5">
              {/* Decorative hover gradient flare */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-rose-400/15 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <X className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[3]" />
              </div>
              <div className="relative z-10 min-w-0">
                <span className="block text-[10px] md:text-[10.5px] font-semibold text-slate-500 group-hover:text-slate-700 transition-colors truncate">
                  Rejected
                </span>
                <span className="text-[17px] md:text-[18px] font-black text-slate-900 group-hover:text-rose-950 transition-colors leading-tight">
                  18
                </span>
              </div>
              <span className="relative z-10 ml-auto text-[11px] md:text-[11.5px] font-bold text-slate-400 group-hover:text-rose-600 transition-colors">
                7%
              </span>
            </div>

            {/* Card 5: Pending */}
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-linear-to-br from-white/95 to-slate-100/50 backdrop-blur-xl border border-slate-200/80 p-2.5 md:p-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(100,116,139,0.15)] hover:border-slate-300 hover:-translate-y-0.5 md:hover:-translate-y-1 transition-all duration-300 group flex items-center gap-2.5 col-span-2 sm:col-span-1">
              {/* Decorative hover gradient flare */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-slate-400/15 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-400 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </div>
              <div className="relative z-10 min-w-0">
                <span className="block text-[10px] md:text-[10.5px] font-semibold text-slate-500 group-hover:text-slate-700 transition-colors truncate">
                  Pending
                </span>
                <span className="text-[17px] md:text-[18px] font-black text-slate-900 group-hover:text-slate-950 transition-colors leading-tight">
                  12
                </span>
              </div>
              <span className="relative z-10 ml-auto text-[11px] md:text-[11.5px] font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                5%
              </span>
            </div>
          </div>

          {/* Filters & Actions Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 pt-0.5 shrink-0">
            {/* Search Input */}
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
                  placeholder="Search by User ID, name or email..."
                  className="w-full pl-8 pr-3 py-1.5 md:py-2 bg-white border border-slate-200 rounded-xl text-[12px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Filter Dropdowns and Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-1.5 md:py-2 pr-7 text-[11.5px] md:text-[12px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:border-indigo-500 transition-colors shadow-2xs cursor-pointer min-w-[110px]"
                >
                  <option value="All Status">All Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Verification Type Filter */}
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => {
                    setTypeFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-1.5 md:py-2 pr-7 text-[11.5px] md:text-[12px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:border-indigo-500 transition-colors shadow-2xs cursor-pointer min-w-[115px]"
                >
                  <option value="All Types">All Types</option>
                  <option value="Aadhar Card">Aadhar Card</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Passport">Passport</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Voter ID">Voter ID</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Registration Date Filter */}
              <button
                type="button"
                className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 md:py-2 text-[11.5px] md:text-[12px] font-semibold text-slate-700 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Select date range</span>
              </button>

              {/* Reset Button */}
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-1.5 md:py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11.5px] md:text-[12px] font-bold rounded-xl transition-colors shadow-2xs cursor-pointer"
              >
                Reset
              </button>

              {/* Export Button */}
              <button
                type="button"
                onClick={handleExport}
                disabled={isExporting}
                className="px-3.5 py-1.5 md:py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[11.5px] md:text-[12px] font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isExporting ? 'Exporting...' : 'Export'}</span>
              </button>
            </div>
          </div>

          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden md:flex flex-col flex-1 min-h-0 border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs bg-white">
            {/* Fixed Table Header - Scrollbar is NOT beside this header */}
            <div className="bg-slate-50/95 border-b border-slate-200/80 shrink-0 pr-[6px]">
              <table className="w-full table-fixed text-left border-collapse">
                <colgroup>
                  <col style={{ width: '36px' }} />
                  <col style={{ width: '95px' }} />
                  <col style={{ width: '195px' }} />
                  <col style={{ width: '110px' }} />
                  <col style={{ width: '110px' }} />
                  <col style={{ width: '105px' }} />
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '110px' }} />
                  <col style={{ width: '55px' }} />
                </colgroup>
                <thead>
                  <tr className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 px-2 text-center">#</th>
                    <th className="py-2.5 px-2">User ID</th>
                    <th className="py-2.5 px-2">User Details</th>
                    <th className="py-2.5 px-2">KYC Type</th>
                    <th className="py-2.5 px-2">
                      <span className="block whitespace-nowrap leading-tight">Submission</span>
                      <span className="block whitespace-nowrap leading-tight">Date</span>
                    </th>
                    <th className="py-2.5 px-2">Status</th>
                    <th className="py-2.5 px-2">
                      <span className="block whitespace-nowrap leading-tight">Reviewed</span>
                      <span className="block whitespace-nowrap leading-tight">By</span>
                    </th>
                    <th className="py-2.5 px-2">
                      <span className="block whitespace-nowrap leading-tight">Reviewed</span>
                      <span className="block whitespace-nowrap leading-tight">Date</span>
                    </th>
                    <th className="py-2.5 px-2 text-center">Actions</th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Scrollable Table Body - Scrollbar is strictly contained below the header */}
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar">
              <table className="w-full table-fixed text-left border-collapse text-[12px]">
                <colgroup>
                  <col style={{ width: '36px' }} />
                  <col style={{ width: '95px' }} />
                  <col style={{ width: '195px' }} />
                  <col style={{ width: '110px' }} />
                  <col style={{ width: '110px' }} />
                  <col style={{ width: '105px' }} />
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '110px' }} />
                  <col style={{ width: '55px' }} />
                </colgroup>
                <tbody className="divide-y divide-indigo-100/30">
                  {currentRecords.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="py-10 text-center text-slate-400 font-medium">
                        No KYC verification records found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    currentRecords.map((item, idx) => (
                      <tr
                        key={item.id}
                        className="group border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300 cursor-pointer"
                      >
                        {/* Index */}
                        <td className="py-2.5 px-2 text-center text-slate-400 font-semibold text-[11px] rounded-l-xl">
                          {(currentPage - 1) * itemsPerPage + idx + 1}
                        </td>

                        {/* User ID */}
                        <td className="py-2.5 px-2 font-bold text-slate-800 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                          {item.userId}
                        </td>

                        {/* User Details */}
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
                                {item.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* KYC Type */}
                        <td className="py-2.5 px-2 font-medium text-slate-700 whitespace-nowrap">
                          {item.kycType}
                        </td>

                        {/* Submission Date (Time below date) */}
                        <td className="py-2.5 px-2">
                          {renderDateTime(item.submissionDate)}
                        </td>

                        {/* Status */}
                        <td className="py-2.5 px-2">
                          <span className="inline-block transition-transform duration-300 group-hover:scale-105 shadow-2xs">
                            {getStatusBadge(item.status)}
                          </span>
                        </td>

                        {/* Reviewed By */}
                        <td className="py-2.5 px-2 font-medium text-slate-700 whitespace-nowrap">
                          {item.reviewedBy === '-' ? (
                            <span className="text-slate-400">-</span>
                          ) : (
                            item.reviewedBy
                          )}
                        </td>

                        {/* Reviewed Date (Time below date) */}
                        <td className="py-2.5 px-2">
                          {renderDateTime(item.reviewedDate)}
                        </td>

                        {/* Action Eye Button */}
                        <td className="py-2.5 px-2 text-center rounded-r-xl">
                          <button
                            type="button"
                            onClick={() => setSelectedUser(item)}
                            className="p-1 rounded-lg text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 transition-all duration-300 group-hover:scale-110 cursor-pointer"
                            title="View KYC Verification Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Stacked Cards (Visible only on mobile screens < 768px) */}
          <div className="md:hidden flex-1 min-h-0 overflow-y-auto custom-scrollbar flex flex-col gap-2.5 pr-0.5">
            {currentRecords.length === 0 ? (
              <div className="py-8 text-center text-slate-400 font-medium bg-white rounded-xl border border-slate-200">
                No KYC verification records found.
              </div>
            ) : (
              currentRecords.map((item) => (
                <div
                  key={item.id}
                  className="group p-3 sm:p-4 flex flex-col gap-2.5 bg-white/60 border border-indigo-100/50 rounded-2xl hover:bg-white hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative z-10"
                >
                  {/* Top: Avatar, Name, UserID, Status */}
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
                        {getStatusBadge(item.status)}
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

                  {/* Middle row: Doc Type & Submission Date */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[9.5px] font-bold uppercase">KYC Type</span>
                      <span className="font-semibold text-slate-700">{item.kycType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9.5px] font-bold uppercase">Submitted</span>
                      <span className="text-slate-600 font-medium">{item.submissionDate}</span>
                    </div>
                  </div>

                  {/* Bottom: Reviewer details if available */}
                  {item.reviewedBy !== '-' && (
                    <div className="text-[10.5px] text-slate-500 bg-slate-50 rounded-lg px-2.5 py-1.5 flex items-center justify-between">
                      <span>Reviewed: <strong className="text-slate-700">{item.reviewedBy}</strong></span>
                      <span>{item.reviewedDate}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Compact Footer: Pagination - Matching PackageDetailsModal / global modals */}
        <div className="px-4 md:px-5 py-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white shrink-0">
          <span className="text-[11.5px] font-semibold text-slate-500">
            Showing {filteredUsers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, totalUsersCount)} of {totalUsersCount} users
          </span>

          <div className="flex items-center gap-1">
            {/* Prev Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Page numbers: [1, 2, 3, 4, 5] */}
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

            {/* Next Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || currentPage === 5}
              className="w-7 h-7 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Nested KYC Detail Dialog (View All -> Actions Click Window) */}
      <KycDetailsModal
        user={selectedUser}
        isOpen={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
      />

      {/* Keyframe animations identical to PackageDetailsModal */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes modal-slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes modal-fade-in {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-slide-up {
          animation: modal-slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (min-width: 768px) {
          .md\\:modal-fade-in {
            animation: modal-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
        }
      `}} />
    </div>,
    document.body
  );
}
