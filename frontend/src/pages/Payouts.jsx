import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight, Plus, PlusCircle, FileText, Clock, Wallet, History, CreditCard, LayoutDashboard } from 'lucide-react';
import { toast } from 'react-toastify';
import { exportToExcel } from '../utils/excelExport';
import { fetchEarnings } from '../redux/slices/earningsSlice';

import PayoutStats from '../components/payouts/PayoutStats';
import PayoutFilters from '../components/payouts/PayoutFilters';
import PayoutHistoryTable from '../components/payouts/PayoutHistoryTable';
import PayoutRequestsList from '../components/payouts/PayoutRequestsList';
import PayoutSidebar from '../components/payouts/PayoutSidebar';
import RequestPayoutModal from '../components/payouts/RequestPayoutModal';
import PayoutDetailsModal from '../components/payouts/PayoutDetailsModal';
import ManagePayoutMethodsModal from '../components/payouts/ManagePayoutMethodsModal';

// Initial dataset of 28 transactions matching the reference screenshot exactly
const INITIAL_PAYOUTS = [
  {
    id: 1,
    transactionId: "TRX202608150001",
    requestDate: "15 Aug 2026",
    processedDate: "18 Aug 2026",
    rawAmount: 2500,
    amount: "2,500.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 2,
    transactionId: "TRX202607280003",
    requestDate: "28 Jul 2026",
    processedDate: "30 Jul 2026",
    rawAmount: 3000,
    amount: "3,000.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 3,
    transactionId: "TRX202607100002",
    requestDate: "10 Jul 2026",
    processedDate: "-",
    rawAmount: 1500,
    amount: "1,500.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "pending",
    remarks: "Under process"
  },
  {
    id: 4,
    transactionId: "TRX202606250001",
    requestDate: "25 Jun 2026",
    processedDate: "27 Jun 2026",
    rawAmount: 2000,
    amount: "2,000.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 5,
    transactionId: "TRX202605180004",
    requestDate: "18 May 2026",
    processedDate: "20 May 2026",
    rawAmount: 1200,
    amount: "1,200.00",
    method: "PayPal",
    methodType: "paypal",
    methodDetail: "subham@gmail",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 6,
    transactionId: "TRX202604300003",
    requestDate: "30 Apr 2026",
    processedDate: "-",
    rawAmount: 2650,
    amount: "2,650.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "rejected",
    remarks: "KYC not verified"
  },
  {
    id: 7,
    transactionId: "TRX202603150002",
    requestDate: "15 Mar 2026",
    processedDate: "17 Mar 2026",
    rawAmount: 1800,
    amount: "1,800.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 8,
    transactionId: "TRX202602280001",
    requestDate: "28 Feb 2026",
    processedDate: "02 Mar 2026",
    rawAmount: 2200,
    amount: "2,200.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 9,
    transactionId: "TRX202601150002",
    requestDate: "15 Jan 2026",
    processedDate: "17 Jan 2026",
    rawAmount: 1500,
    amount: "1,500.00",
    method: "PayPal",
    methodType: "paypal",
    methodDetail: "subham@gmail",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 10,
    transactionId: "TRX202512300001",
    requestDate: "30 Dec 2025",
    processedDate: "02 Jan 2026",
    rawAmount: 2000,
    amount: "2,000.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "paid",
    remarks: "Transferred successfully"
  },
  // Page 2 sample data
  {
    id: 11,
    transactionId: "TRX202511200004",
    requestDate: "20 Nov 2025",
    processedDate: "22 Nov 2025",
    rawAmount: 1750,
    amount: "1,750.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 12,
    transactionId: "TRX202510140002",
    requestDate: "14 Oct 2025",
    processedDate: "16 Oct 2025",
    rawAmount: 3200,
    amount: "3,200.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 13,
    transactionId: "TRX202509180001",
    requestDate: "18 Sep 2025",
    processedDate: "20 Sep 2025",
    rawAmount: 1100,
    amount: "1,100.00",
    method: "PayPal",
    methodType: "paypal",
    methodDetail: "subham@gmail",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 14,
    transactionId: "TRX202508250003",
    requestDate: "25 Aug 2025",
    processedDate: "27 Aug 2025",
    rawAmount: 2800,
    amount: "2,800.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 15,
    transactionId: "TRX202507190002",
    requestDate: "19 Jul 2025",
    processedDate: "21 Jul 2025",
    rawAmount: 1950,
    amount: "1,950.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 16,
    transactionId: "TRX202506300001",
    requestDate: "30 Jun 2025",
    processedDate: "02 Jul 2025",
    rawAmount: 2400,
    amount: "2,400.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 17,
    transactionId: "TRX202505220005",
    requestDate: "22 May 2025",
    processedDate: "24 May 2025",
    rawAmount: 1600,
    amount: "1,600.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 18,
    transactionId: "TRX202504150002",
    requestDate: "15 Apr 2025",
    processedDate: "17 Apr 2025",
    rawAmount: 2100,
    amount: "2,100.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 19,
    transactionId: "TRX202503100001",
    requestDate: "10 Mar 2025",
    processedDate: "12 Mar 2025",
    rawAmount: 1400,
    amount: "1,400.00",
    method: "PayPal",
    methodType: "paypal",
    methodDetail: "subham@gmail",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 20,
    transactionId: "TRX202502180003",
    requestDate: "18 Feb 2025",
    processedDate: "20 Feb 2025",
    rawAmount: 2300,
    amount: "2,300.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "paid",
    remarks: "Transferred successfully"
  },
  // Page 3 sample data
  {
    id: 21,
    transactionId: "TRX202501250002",
    requestDate: "25 Jan 2025",
    processedDate: "27 Jan 2025",
    rawAmount: 1900,
    amount: "1,900.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 22,
    transactionId: "TRX202412150001",
    requestDate: "15 Dec 2024",
    processedDate: "17 Dec 2024",
    rawAmount: 2500,
    amount: "2,500.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 23,
    transactionId: "TRX202411280004",
    requestDate: "28 Nov 2024",
    processedDate: "30 Nov 2024",
    rawAmount: 1350,
    amount: "1,350.00",
    method: "PayPal",
    methodType: "paypal",
    methodDetail: "subham@gmail",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 24,
    transactionId: "TRX202410190002",
    requestDate: "19 Oct 2024",
    processedDate: "21 Oct 2024",
    rawAmount: 2700,
    amount: "2,700.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 25,
    transactionId: "TRX202409050001",
    requestDate: "05 Sep 2024",
    processedDate: "07 Sep 2024",
    rawAmount: 1800,
    amount: "1,800.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 26,
    transactionId: "TRX202408120003",
    requestDate: "12 Aug 2024",
    processedDate: "14 Aug 2024",
    rawAmount: 2200,
    amount: "2,200.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 27,
    transactionId: "TRX202407220002",
    requestDate: "22 Jul 2024",
    processedDate: "24 Jul 2024",
    rawAmount: 1650,
    amount: "1,650.00",
    method: "PayPal",
    methodType: "paypal",
    methodDetail: "subham@gmail",
    status: "paid",
    remarks: "Transferred successfully"
  },
  {
    id: 28,
    transactionId: "TRX202406180001",
    requestDate: "18 Jun 2024",
    processedDate: "20 Jun 2024",
    rawAmount: 2000,
    amount: "2,000.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "paid",
    remarks: "Transferred successfully"
  }
];

// Initial dataset of 12 payout requests matching the reference screenshot (8 Approved, 2 Pending, 2 Rejected)
const INITIAL_REQUESTS = [
  {
    id: 1,
    transactionId: "TRX202607100002",
    requestDate: "10 Jul 2026",
    processedDate: "-",
    rawAmount: 1500,
    amount: "1,500.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "pending",
    remarks: "Under verification with bank"
  },
  {
    id: 2,
    transactionId: "TRX202607050001",
    requestDate: "05 Jul 2026",
    processedDate: "-",
    rawAmount: 3150,
    amount: "3,150.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "pending",
    remarks: "Processing payout batch"
  },
  {
    id: 3,
    transactionId: "TRX202606250001",
    requestDate: "25 Jun 2026",
    processedDate: "27 Jun 2026",
    rawAmount: 2000,
    amount: "2,000.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "approved",
    remarks: "Transferred successfully"
  },
  {
    id: 4,
    transactionId: "TRX202605180004",
    requestDate: "18 May 2026",
    processedDate: "20 May 2026",
    rawAmount: 1200,
    amount: "1,200.00",
    method: "PayPal",
    methodType: "paypal",
    methodDetail: "subham@gmail",
    status: "approved",
    remarks: "Transferred successfully"
  },
  {
    id: 5,
    transactionId: "TRX202604300003",
    requestDate: "30 Apr 2026",
    processedDate: "02 May 2026",
    rawAmount: 2650,
    amount: "2,650.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "rejected",
    remarks: "Bank account name mismatch"
  },
  {
    id: 6,
    transactionId: "TRX202604150002",
    requestDate: "15 Apr 2026",
    processedDate: "17 Apr 2026",
    rawAmount: 1800,
    amount: "1,800.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "approved",
    remarks: "Transferred successfully"
  },
  {
    id: 7,
    transactionId: "TRX202603200001",
    requestDate: "20 Mar 2026",
    processedDate: "22 Mar 2026",
    rawAmount: 2500,
    amount: "2,500.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "approved",
    remarks: "Transferred successfully"
  },
  {
    id: 8,
    transactionId: "TRX202603050003",
    requestDate: "05 Mar 2026",
    processedDate: "07 Mar 2026",
    rawAmount: 1400,
    amount: "1,400.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "approved",
    remarks: "Transferred successfully"
  },
  {
    id: 9,
    transactionId: "TRX202602180002",
    requestDate: "18 Feb 2026",
    processedDate: "20 Feb 2026",
    rawAmount: 2200,
    amount: "2,200.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "approved",
    remarks: "Transferred successfully"
  },
  {
    id: 10,
    transactionId: "TRX202602010001",
    requestDate: "01 Feb 2026",
    processedDate: "03 Feb 2026",
    rawAmount: 1900,
    amount: "1,900.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "approved",
    remarks: "Transferred successfully"
  },
  {
    id: 11,
    transactionId: "TRX202601150004",
    requestDate: "15 Jan 2026",
    processedDate: "17 Jan 2026",
    rawAmount: 1750,
    amount: "1,750.00",
    method: "Bank Transfer",
    methodType: "bank",
    methodDetail: "•••• 1234",
    status: "approved",
    remarks: "Transferred successfully"
  },
  {
    id: 12,
    transactionId: "TRX202512280002",
    requestDate: "28 Dec 2025",
    processedDate: "30 Dec 2025",
    rawAmount: 1600,
    amount: "1,600.00",
    method: "UPI",
    methodType: "upi",
    methodDetail: "subham@upi",
    status: "rejected",
    remarks: "Invalid VPA address"
  }
];

export default function Payouts() {
  const dispatch = useDispatch();
  const { data: earningsData } = useSelector((state) => state.earnings || {});

  // Page state
  const [activeTab, setActiveTab] = useState('history'); // 'history' | 'requests' | 'methods'

  // Filter states
  const [dateRange, setDateRange] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Datasets
  const [payoutsList, setPayoutsList] = useState(INITIAL_PAYOUTS);
  const [requestsList, setRequestsList] = useState(INITIAL_REQUESTS);

  // Available balance
  const [availableBalance, setAvailableBalance] = useState(2630.00);

  // Modals state
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [isManageMethodsOpen, setIsManageMethodsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEarnings());
  }, [dispatch]);

  // Sync available balance if earningsData has current balance
  useEffect(() => {
    if (earningsData?.summary?.CurrentBalance !== undefined && earningsData?.summary?.CurrentBalance !== null) {
      // Keep default 2630.00 unless explicitly changed by withdrawal
    }
  }, [earningsData]);

  // Active dataset according to selected tab
  const activeDataset = activeTab === 'requests' ? requestsList : payoutsList;

  // Filtered items
  const filteredItems = useMemo(() => {
    return activeDataset.filter((item) => {
      // Status filter
      if (statusFilter !== 'all') {
        const itemStatus = item.status.toLowerCase();
        const filter = statusFilter.toLowerCase();
        if (filter === 'approved' || filter === 'paid') {
          if (itemStatus !== 'approved' && itemStatus !== 'paid') return false;
        } else if (itemStatus !== filter) {
          return false;
        }
      }
      // Method filter
      if (methodFilter !== 'all' && item.methodType.toLowerCase() !== methodFilter.toLowerCase()) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesId = item.transactionId.toLowerCase().includes(query);
        const matchesRemarks = item.remarks.toLowerCase().includes(query);
        const matchesMethod = item.method.toLowerCase().includes(query);
        if (!matchesId && !matchesRemarks && !matchesMethod) {
          return false;
        }
      }
      return true;
    });
  }, [activeDataset, statusFilter, methodFilter, searchQuery, dateRange]);

  // Paginated slice
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredItems.slice(startIndex, startIndex + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  // Reset page & filters when switching tabs
  useEffect(() => {
    setCurrentPage(1);
    setStatusFilter('all');
    setMethodFilter('all');
    setSearchQuery('');
  }, [activeTab]);

  // Export to Excel handler
  const handleExport = async () => {
    try {
      const exportData = filteredItems.map((p, idx) => ({
        index: idx + 1,
        transactionId: p.transactionId,
        requestDate: p.requestDate,
        processedDate: p.processedDate,
        amount: `₹ ${p.amount}`,
        method: p.method,
        status: p.status.toUpperCase(),
        remarks: p.remarks
      }));

      const columns = [
        { header: '#', key: 'index', width: 6 },
        { header: 'Transaction ID', key: 'transactionId', width: 22 },
        { header: 'Request Date', key: 'requestDate', width: 16 },
        { header: 'Processed Date', key: 'processedDate', width: 16 },
        { header: 'Amount', key: 'amount', width: 15 },
        { header: 'Payout Method', key: 'method', width: 18 },
        { header: 'Status', key: 'status', width: 14 },
        { header: 'Remarks', key: 'remarks', width: 26 },
      ];

      const fileName = activeTab === 'requests' ? 'Eduvora_Payout_Requests' : 'Eduvora_Payouts_Statement';
      const sheetName = activeTab === 'requests' ? 'Payout Requests' : 'Payouts';

      await exportToExcel({
        data: exportData,
        fileName,
        columns,
        sheetName
      });
      toast.success('Report exported successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to export statement');
    }
  };

  // View details modal opener
  const handleViewDetails = (payout) => {
    setSelectedPayout(payout);
    setIsDetailsModalOpen(true);
  };

  // Submit payout request handler
  const handleRequestPayoutSubmit = async ({ amount, method, remarks }) => {
    // Generate new Transaction ID
    const today = new Date();
    const dateStr = today.getFullYear() +
      String(today.getMonth() + 1).padStart(2, '0') +
      String(today.getDate()).padStart(2, '0');
    const randomSuffix = String(Math.floor(1000 + Math.random() * 9000));
    const newTxId = `TRX${dateStr}${randomSuffix}`;

    const formattedDate = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const newRecord = {
      id: payoutsList.length + 1,
      transactionId: newTxId,
      requestDate: formattedDate,
      processedDate: "-",
      rawAmount: amount,
      amount: Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      method: method === 'upi' ? 'UPI' : method === 'paypal' ? 'PayPal' : 'Bank Transfer',
      methodType: method,
      methodDetail: method === 'upi' ? 'subham@upi' : method === 'paypal' ? 'subham@gmail.com' : '•••• 1234',
      status: "pending",
      remarks: remarks || "Under process"
    };

    setPayoutsList([newRecord, ...payoutsList]);
    setRequestsList([newRecord, ...requestsList]);
    setAvailableBalance((prev) => Math.max(0, prev - amount));
    toast.success(`Payout request of ₹${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })} submitted successfully!`);
  };

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {/* 1. Header & Breadcrumbs matching reference UI */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {/* Breadcrumbs: Dashboard > Payouts */}
          <div className="flex items-center text-[12px] sm:text-[13px] font-medium text-slate-500 gap-1.5 mb-1 sm:mb-1.5">
            <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">
              {activeTab === 'requests' ? 'Payout Requests' : 'Payouts'}
            </span>
          </div>

          {/* Title & Subtitle dynamically updated by tab */}
          <h1 className="text-[26px] sm:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
            {activeTab === 'requests' ? 'Payout Requests' : 'Payouts'}
          </h1>
          <p className="text-[13px] sm:text-[14px] text-slate-500 font-medium mt-1">
            {activeTab === 'requests'
              ? 'Track the status of your payout requests and view the complete history.'
              : 'View your earning summary, request payouts and track payout history.'}
          </p>
        </div>

        {/* Header Action Button: + Request Payout */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => setIsRequestModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#4f3bf3] hover:bg-indigo-700 active:scale-95 text-white rounded-xl text-[13.5px] font-bold shadow-md shadow-indigo-600/20 hover:shadow-lg transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Request Payout</span>
          </button>
        </div>
      </div>

      {/* 2. Top Stat Cards (Dynamically switches between Payout History & Payout Requests) */}
      <PayoutStats
        type={activeTab === 'requests' ? 'requests' : 'history'}
        stats={{
          totalEarnings: 25480.00,
          totalPaidOut: 18200.00,
          pendingPayouts: 4650.00,
          availableBalance: availableBalance
        }}
        requestStats={{
          totalRequests: requestsList.length,
          approved: requestsList.filter(r => r.status === 'approved' || r.status === 'paid').length,
          pending: requestsList.filter(r => r.status === 'pending').length,
          rejected: requestsList.filter(r => r.status === 'rejected').length
        }}
      />

      {/* 3. Unified Responsive Tab Bar (Single clean bar across all screens) */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white/70 backdrop-blur-md border border-indigo-100/60 rounded-2xl w-full sm:w-fit shadow-xs overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-[12.5px] sm:text-[13px] font-bold whitespace-nowrap transition-all duration-300 ${activeTab === 'history'
            ? 'bg-[#4f3bf3] text-white shadow-md shadow-indigo-500/20'
            : 'text-indigo-900/60 hover:text-[#4f3bf3] hover:bg-white/80'
            }`}
        >
          <FileText className="w-4 h-4 shrink-0" />
          <span>Payout History</span>
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-[12.5px] sm:text-[13px] font-bold whitespace-nowrap transition-all duration-300 ${activeTab === 'requests'
            ? 'bg-[#4f3bf3] text-white shadow-md shadow-indigo-500/20'
            : 'text-indigo-900/60 hover:text-[#4f3bf3] hover:bg-white/80'
            }`}
        >
          <FileText className="w-4 h-4 shrink-0" />
          <span>Payout Requests</span>
        </button>

        {/* Visible only on mobile/tablet (< lg) where sidebar is not side-by-side */}
        <button
          onClick={() => setActiveTab('methods')}
          className={`lg:hidden flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-[12.5px] sm:text-[13px] font-bold whitespace-nowrap transition-all duration-300 ${activeTab === 'methods'
            ? 'bg-[#4f3bf3] text-white shadow-md shadow-indigo-500/20'
            : 'text-indigo-900/60 hover:text-[#4f3bf3] hover:bg-white/80'
            }`}
        >
          <Wallet className="w-4 h-4 shrink-0" />
          <span>Payout Methods</span>
        </button>
      </div>

      {/* 4. Main Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 items-start w-full">

        {/* Left Column: Takes all available space on desktop */}
        <div className="flex-1 min-w-0 flex flex-col gap-4 sm:gap-5 w-full">
          {/* Active Tab Table View: Both Payout History and Payout Requests share the same table UI */}
          {(activeTab === 'history' || activeTab === 'requests') && (
            <>
              {/* Filters Bar */}
              <PayoutFilters
                dateRange={dateRange}
                setDateRange={setDateRange}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                methodFilter={methodFilter}
                setMethodFilter={setMethodFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onExport={handleExport}
              />

              {/* Transactions Table & Mobile Cards */}
              <PayoutHistoryTable
                payouts={paginatedItems}
                totalCount={filteredItems.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                onViewDetails={handleViewDetails}
              />
            </>
          )}

          {/* Tab 3: Payout Methods & Info (Mobile view) */}
          {activeTab === 'methods' && (
            <div className="lg:hidden w-full">
              <PayoutSidebar
                onManageMethods={() => setIsManageMethodsOpen(true)}
                onSelectMethod={() => setIsManageMethodsOpen(true)}
              />
            </div>
          )}
        </div>

        {/* Right Column: Always side-by-side on desktop (lg: and above) */}
        <div className="hidden lg:block w-[260px] xl:w-[280px] 2xl:w-[310px] shrink-0">
          <PayoutSidebar
            onManageMethods={() => setIsManageMethodsOpen(true)}
            onSelectMethod={() => setIsManageMethodsOpen(true)}
          />
        </div>

      </div>

      {/* Interactive Modals */}
      <RequestPayoutModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        availableBalance={availableBalance}
        minPayout={500.00}
        onSubmit={handleRequestPayoutSubmit}
      />

      <PayoutDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        payout={selectedPayout}
      />

      <ManagePayoutMethodsModal
        isOpen={isManageMethodsOpen}
        onClose={() => setIsManageMethodsOpen(false)}
      />
    </div>
  );
}
