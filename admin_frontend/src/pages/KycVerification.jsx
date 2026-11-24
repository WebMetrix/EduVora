import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import KycStatsCards from '../components/user-management/KycStatsCards';
import KycFiltersCard from '../components/user-management/KycFiltersCard';
import KycSubmissionsTable from '../components/user-management/KycSubmissionsTable';
import KycSubmissionDetailsModal from '../components/user-management/KycSubmissionDetailsModal';

export default function KycVerification() {
  // Initial 10 KYC submissions matching the screenshot exactly
  const initialSubmissions = [
    {
      id: 1,
      userId: 'USR000125',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      mobile: '+91 98765 43210',
      proofType: 'Aadhaar Card',
      date: '12 Oct 2026',
      time: '10:30 AM',
      status: 'Pending',
      remarks: '-',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
      documentNumber: 'XXXX XXXX 1234',
      panNumber: 'ABCDE1234F',
      submissionDate: '12 Oct 2026, 10:30 AM',
      dob: '15 Oct 2000',
      gender: 'Male',
      address: '123, MG Road, Bengaluru, Karnataka - 560001, India',
    },
    {
      id: 2,
      userId: 'USR000124',
      name: 'Priya Verma',
      email: 'priya.verma@example.com',
      mobile: '+91 98765 43211',
      proofType: 'PAN Card',
      date: '11 Oct 2026',
      time: '04:15 PM',
      status: 'Approved',
      remarks: '-',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80',
      documentNumber: 'BNZPV4821K',
      panNumber: 'BNZPV4821K',
      submissionDate: '11 Oct 2026, 04:15 PM',
      reviewedBy: 'Neha Sharma',
      reviewedDate: '12 Oct 2026, 10:00 AM',
      dob: '22 Mar 1999',
      gender: 'Female',
      address: '45 Lake View Road, Hyderabad, Telangana - 500081, India',
    },
    {
      id: 3,
      userId: 'SUP000023',
      name: 'Amit Kumar',
      email: 'amit.kumar@example.com',
      mobile: '+91 98765 43212',
      proofType: 'Driving License',
      date: '10 Oct 2026',
      time: '11:20 AM',
      status: 'Rejected',
      remarks: 'Blur image',
      rejectReason: 'Blur image. Identity proof is not readable.',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
      documentNumber: 'DL-1420110012345',
      submissionDate: '10 Oct 2026, 11:20 AM',
      dob: '05 Jan 1995',
      gender: 'Male',
      address: '77 Civil Lines, Jaipur, Rajasthan - 302006, India',
    },
    {
      id: 4,
      userId: 'USR000123',
      name: 'Neha Singh',
      email: 'neha.singh@example.com',
      mobile: '+91 98765 43213',
      proofType: 'Aadhaar Card',
      date: '09 Oct 2026',
      time: '02:45 PM',
      status: 'Pending',
      remarks: '-',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&auto=format&fit=crop&q=80',
      documentNumber: 'XXXX XXXX 5678',
      submissionDate: '09 Oct 2026, 02:45 PM',
      dob: '18 Nov 2001',
      gender: 'Female',
      address: '88 Park Street, Kolkata, West Bengal - 700016, India',
    },
    {
      id: 5,
      userId: 'USR000122',
      name: 'Vikram Patel',
      email: 'vikram.patel@example.com',
      mobile: '+91 98765 43214',
      proofType: 'Passport',
      date: '08 Oct 2026',
      time: '09:10 AM',
      status: 'Approved',
      remarks: '-',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
      documentNumber: 'Z1234567',
      submissionDate: '08 Oct 2026, 09:10 AM',
      reviewedBy: 'Kunal Verma',
      reviewedDate: '08 Oct 2026, 04:30 PM',
      dob: '14 Jul 1997',
      gender: 'Male',
      address: '12 Ring Road, Surat, Gujarat - 395007, India',
    },
    {
      id: 6,
      userId: 'SUP000022',
      name: 'Sneha Kapoor',
      email: 'sneha.kapoor@example.com',
      mobile: '+91 98765 43215',
      proofType: 'Voter ID',
      date: '07 Oct 2026',
      time: '03:30 PM',
      status: 'Pending',
      remarks: '-',
      initials: 'SK',
      documentNumber: 'ABC9876543',
      submissionDate: '07 Oct 2026, 03:30 PM',
      dob: '30 Aug 1996',
      gender: 'Female',
      address: '5 Sector 18, Noida, Uttar Pradesh - 201301, India',
      avatar: null,
    },
    {
      id: 7,
      userId: 'USR000121',
      name: 'Arjun Rao',
      email: 'arjun.rao@example.com',
      mobile: '+91 98765 43216',
      proofType: 'Aadhaar Card',
      date: '06 Oct 2026',
      time: '12:05 PM',
      status: 'Approved',
      remarks: '-',
      initials: 'AR',
      documentNumber: 'XXXX XXXX 9012',
      submissionDate: '06 Oct 2026, 12:05 PM',
      reviewedBy: 'Neha Sharma',
      reviewedDate: '07 Oct 2026, 11:00 AM',
      dob: '12 Feb 1998',
      gender: 'Male',
      address: '32 Jubilee Hills, Hyderabad - 500033, India',
      avatar: null,
    },
    {
      id: 8,
      userId: 'USR000120',
      name: 'Kavya Nair',
      email: 'kavya.nair@example.com',
      mobile: '+91 98765 43217',
      proofType: 'Driving License',
      date: '05 Oct 2026',
      time: '05:40 PM',
      status: 'Pending',
      remarks: '-',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
      documentNumber: 'KL-0720190045678',
      submissionDate: '05 Oct 2026, 05:40 PM',
      dob: '03 Jun 2002',
      gender: 'Female',
      address: '21 Marine Drive, Kochi, Kerala - 682031, India',
    },
    {
      id: 9,
      userId: 'USR000021',
      name: 'Rohit Das',
      email: 'rohit.das@example.com',
      mobile: '+91 98765 43218',
      proofType: 'PAN Card',
      date: '04 Oct 2026',
      time: '10:15 AM',
      status: 'Rejected',
      remarks: 'Invalid document',
      rejectReason: 'Invalid document format. PAN details mismatched with registration info.',
      avatar:
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80',
      documentNumber: 'XYZPD9876M',
      submissionDate: '04 Oct 2026, 10:15 AM',
      dob: '19 Dec 1994',
      gender: 'Male',
      address: '14 Salt Lake, Sector V, Kolkata - 700091, India',
    },
    {
      id: 10,
      userId: 'USR000119',
      name: 'Ankit Gupta',
      email: 'ankit.gupta@example.com',
      mobile: '+91 98765 43219',
      proofType: 'Aadhaar Card',
      date: '03 Oct 2026',
      time: '01:25 PM',
      status: 'Approved',
      remarks: '-',
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80',
      documentNumber: 'XXXX XXXX 3456',
      submissionDate: '03 Oct 2026, 01:25 PM',
      reviewedBy: 'Neha Sharma',
      reviewedDate: '04 Oct 2026, 09:30 AM',
      dob: '27 Sep 1997',
      gender: 'Male',
      address: '50 Connaught Place, New Delhi - 110001, India',
    },
  ];

  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    proofType: 'all',
    fromDate: '',
    toDate: '',
  });

  const [appliedFilters, setAppliedFilters] = useState({
    search: '',
    status: 'all',
    proofType: 'all',
    fromDate: '',
    toDate: '',
  });

  const [submissionsList, setSubmissionsList] = useState(initialSubmissions);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState(null);

  // Modal detail view state
  const [selectedKycUser, setSelectedKycUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const handleClearFilters = () => {
    const reset = {
      search: '',
      status: 'all',
      proofType: 'all',
      fromDate: '',
      toDate: '',
    };
    setFilters(reset);
    setAppliedFilters(reset);
  };

  // Filtered submissions
  const filteredSubmissions = useMemo(() => {
    return submissionsList.filter((item) => {
      // Search
      if (appliedFilters.search.trim()) {
        const q = appliedFilters.search.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesEmail = item.email.toLowerCase().includes(q);
        const matchesId = item.userId.toLowerCase().includes(q);
        const matchesMobile = item.mobile.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesId && !matchesMobile) {
          return false;
        }
      }

      // Status
      if (appliedFilters.status !== 'all' && item.status !== appliedFilters.status) {
        return false;
      }

      // Proof Type
      if (appliedFilters.proofType !== 'all' && item.proofType !== appliedFilters.proofType) {
        return false;
      }

      return true;
    });
  }, [appliedFilters, submissionsList]);

  // Dynamic stat counts
  const stats = useMemo(() => {
    const pendingDelta = submissionsList.filter((s) => s.status === 'Pending').length - initialSubmissions.filter((s) => s.status === 'Pending').length;
    const approvedDelta = submissionsList.filter((s) => s.status === 'Approved').length - initialSubmissions.filter((s) => s.status === 'Approved').length;
    const rejectedDelta = submissionsList.filter((s) => s.status === 'Rejected').length - initialSubmissions.filter((s) => s.status === 'Rejected').length;

    return {
      total: '1,248',
      pending: (156 + pendingDelta).toLocaleString(),
      approved: (980 + approvedDelta).toLocaleString(),
      rejected: (112 + rejectedDelta).toLocaleString(),
    };
  }, [submissionsList]);

  const handleViewKyc = (submission) => {
    setSelectedKycUser({
      ...submission,
      kycType: submission.proofType,
      aadharNumber: submission.documentNumber,
      panNumber: submission.panNumber || 'ABCDE1234F',
      nameOnDocument: submission.name,
      registeredOn: submission.submissionDate,
    });
    setIsModalOpen(true);
  };

  const handleStatusUpdate = (submissionId, newStatus, remarks, actionLabel) => {
    setSubmissionsList((prev) =>
      prev.map((sub) => {
        if (sub.id === submissionId) {
          return {
            ...sub,
            status: newStatus,
            remarks: remarks.trim() !== '' ? remarks : (newStatus === 'Approved' ? '-' : newStatus === 'Rejected' ? 'KYC Rejected' : 'Resubmission Requested'),
          };
        }
        return sub;
      })
    );

    // Provide user feedback toast
    setToast({
      type: newStatus === 'Approved' ? 'success' : newStatus === 'Rejected' ? 'error' : 'info',
      message: actionLabel || `KYC status changed to ${newStatus}`,
    });

    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5 animate-fade-in relative pb-1 sm:pb-2">
      {/* Toast Notification Alert */}
      {toast && (
        <div
          className={`fixed top-4 sm:top-5 left-4 right-4 sm:left-auto sm:right-5 z-[10010] flex items-center justify-between sm:justify-start gap-3 px-4 py-3 rounded-xl shadow-xl border animate-slide-in-right ${
            toast.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : toast.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-indigo-50 border-indigo-200 text-indigo-800'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-indigo-600 shrink-0" />
          )}
          <span className="text-[13px] font-bold">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="p-1 rounded-md hover:bg-black/5 text-slate-500 cursor-pointer ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header Row: Title & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div>
          <h1 className="text-[20px] sm:text-[26px] lg:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
            KYC Verification
          </h1>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            Review and verify user KYC documents.
          </p>
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-[12.5px] font-medium text-slate-500 flex-wrap">
          <Link
            to="/dashboard"
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Dashboard
          </Link>
          <span className="text-slate-300">/</span>
          <span className="hover:text-indigo-600 transition-colors">User Management</span>
          <span className="text-slate-300">/</span>
          <span className="text-indigo-600 font-bold">KYC Verification</span>
        </nav>
      </div>

      {/* 4 Stat Counter Cards */}
      <KycStatsCards stats={stats} />

      {/* Filters Card */}
      <KycFiltersCard
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Table Card (Responsive: Table on desktop/tablet, Cards on mobile) */}
      <KycSubmissionsTable
        submissions={filteredSubmissions}
        onViewKyc={handleViewKyc}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalSubmissions={1248}
      />

      {/* KYC Submission Details Desktop/Mobile Modal View */}
      {isModalOpen && selectedKycUser && (
        <KycSubmissionDetailsModal
          submission={selectedKycUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
}
