import React, { useState, useMemo } from 'react';
import {
  Coins, Check, Clock, XCircle, RotateCcw, Search, Plus, Download, Layers, Eye,
  Crown, Diamond, Star, Sparkles, CreditCard, Smartphone, Wallet, Landmark,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight
} from 'lucide-react';
import CustomSelect from '../common/CustomSelect';
import DateRangePicker from '../common/DateRangePicker';
import { isDateWithinRange } from '../../utils/dateFilterUtils';
import { RefundDetailsModal, InitiateRefundModal } from './RefundModals';

const INITIAL_REFUNDS = [
  {
    refundId: 'RFD20261028054',
    orderId: 'ORD-202610280954',
    txnId: 'TXN784532109654',
    userId: 'USR100234',
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    package: 'Elite Package',
    amount: '9,999',
    requestDate: '28 Oct 2026, 11:20 AM',
    refundMethod: 'Original Method',
    status: 'Refunded',
    reason: 'Duplicate package checkout',
    adminRemarks: 'Verified duplicate charge and processed refund to source.',
  },
  {
    refundId: 'RFD20261027163',
    orderId: 'ORD-202610271630',
    txnId: 'TXN784532109655',
    userId: 'USR100233',
    name: 'Rahul Verma',
    email: 'rahul.verma@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    package: 'Pro Package',
    amount: '4,899',
    requestDate: '27 Oct 2026, 06:45 PM',
    refundMethod: 'Credit Card',
    status: 'In Progress',
    reason: 'Course tier downgrade requested',
    adminRemarks: 'Awaiting card issuer settlement batch.',
  },
  {
    refundId: 'RFD20261027141',
    orderId: 'ORD-202610271410',
    txnId: 'TXN784532109656',
    userId: 'USR100232',
    name: 'Neha Singh',
    email: 'neha.singh@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    package: 'Growth Package',
    amount: '2,799',
    requestDate: '27 Oct 2026, 02:25 PM',
    refundMethod: 'UPI',
    status: 'Requested',
    reason: 'Purchased wrong package tier',
    adminRemarks: '',
  },
  {
    refundId: 'RFD20261026111',
    orderId: 'ORD-202610261115',
    txnId: 'TXN784532109657',
    userId: 'USR100231',
    name: 'Amit Das',
    email: 'amit.das@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    package: 'Starter Package',
    amount: '1,199',
    requestDate: '26 Oct 2026, 11:18 AM',
    refundMethod: 'Wallet',
    status: 'Rejected',
    reason: 'Refund window expired (14 days)',
    adminRemarks: 'Content consumed >80%; request rejected per policy.',
  },
  {
    refundId: 'RFD20261025190',
    orderId: 'ORD-202610251905',
    txnId: 'TXN784532109968',
    userId: 'USR100230',
    name: 'Sneha Roy',
    email: 'sneha.roy@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
    package: 'Pro Package',
    amount: '4,899',
    requestDate: '25 Oct 2026, 07:40 PM',
    refundMethod: 'Original Method',
    status: 'Refunded',
    reason: 'Billing mismatch resolved',
    adminRemarks: 'Refund credited to customer UPI account.',
  },
  {
    refundId: 'RFD20261024112',
    orderId: 'ORD-202610241540',
    txnId: 'TXN784532109659',
    userId: 'USR100229',
    name: 'Vikram Patel',
    email: 'vikram.patel@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    package: 'Elite Package',
    amount: '9,999',
    requestDate: '24 Oct 2026, 05:10 PM',
    refundMethod: 'Original Method',
    status: 'Requested',
    reason: 'Accidental renewal order',
    adminRemarks: '',
  },
];

const PACKAGE_OPTIONS = [
  { label: 'All Packages', value: 'all' },
  { label: 'Elite Package', value: 'Elite Package' },
  { label: 'Pro Package', value: 'Pro Package' },
  { label: 'Growth Package', value: 'Growth Package' },
  { label: 'Starter Package', value: 'Starter Package' },
];

const REFUND_STATUS_OPTIONS = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Refunded', value: 'Refunded' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Requested', value: 'Requested' },
  { label: 'Rejected', value: 'Rejected' },
];

const REFUND_METHOD_OPTIONS = [
  { label: 'All Methods', value: 'all' },
  { label: 'Original Method', value: 'Original Method' },
  { label: 'Credit Card', value: 'Credit Card' },
  { label: 'UPI', value: 'UPI' },
  { label: 'Wallet', value: 'Wallet' },
  { label: 'Net Banking', value: 'Net Banking' },
];

const PACKAGE_STYLES = {
  'Elite Package': { icon: Crown, bg: 'bg-rose-50 text-rose-600 border-rose-200/80' },
  'Pro Package': { icon: Diamond, bg: 'bg-amber-50 text-amber-600 border-amber-200/80' },
  'Growth Package': { icon: Star, bg: 'bg-sky-50 text-sky-600 border-sky-200/80' },
  'Starter Package': { icon: Sparkles, bg: 'bg-indigo-50 text-indigo-600 border-indigo-200/80' },
};

const METHOD_STYLES = {
  'Original Method': { icon: CreditCard, color: 'text-indigo-600 bg-indigo-50 border-indigo-200/70' },
  'Credit Card': { icon: CreditCard, color: 'text-indigo-600 bg-indigo-50 border-indigo-200/70' },
  UPI: { icon: Smartphone, color: 'text-emerald-600 bg-emerald-50 border-emerald-200/70' },
  Wallet: { icon: Wallet, color: 'text-purple-600 bg-purple-50 border-purple-200/70' },
  'Net Banking': { icon: Landmark, color: 'text-violet-600 bg-violet-50 border-violet-200/70' },
};

const STATUS_BADGES = {
  Refunded: { pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/70', Icon: Check },
  'In Progress': { pill: 'bg-sky-50 text-sky-700 border-sky-200/70', Icon: RotateCcw },
  Requested: { pill: 'bg-amber-50 text-amber-700 border-amber-200/70', Icon: Clock },
  Rejected: { pill: 'bg-rose-50 text-rose-700 border-rose-200/70', Icon: XCircle },
};

const DEFAULT_DATE_RANGE = {
  preset: 'this_month',
  label: 'This Month',
  startDate: new Date(2026, 9, 1),
  endDate: new Date(2026, 9, 31),
};

export default function RefundManagementSection({ onToast }) {
  const [refunds, setRefunds] = useState(INITIAL_REFUNDS);
  const [draftFilters, setDraftFilters] = useState({
    search: '',
    dateRange: DEFAULT_DATE_RANGE,
    packageName: 'all',
    status: 'all',
    refundMethod: 'all',
  });
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [viewingRefund, setViewingRefund] = useState(null);
  const [isInitiateOpen, setIsInitiateOpen] = useState(false);

  const filteredRows = useMemo(() => {
    const q = appliedFilters.search.trim().toLowerCase();
    return refunds.filter((row) => {
      if (appliedFilters.packageName !== 'all' && row.package !== appliedFilters.packageName) {
        return false;
      }
      if (appliedFilters.status !== 'all' && row.status !== appliedFilters.status) {
        return false;
      }
      if (
        appliedFilters.refundMethod !== 'all' &&
        row.refundMethod !== appliedFilters.refundMethod
      ) {
        return false;
      }
      if (q) {
        const matched =
          row.refundId.toLowerCase().includes(q) ||
          row.orderId.toLowerCase().includes(q) ||
          row.txnId.toLowerCase().includes(q) ||
          row.userId.toLowerCase().includes(q) ||
          row.name.toLowerCase().includes(q) ||
          row.email.toLowerCase().includes(q);
        if (!matched) return false;
      }
      if (
        appliedFilters.dateRange?.preset !== 'this_month' &&
        !isDateWithinRange(row.requestDate, appliedFilters.dateRange)
      ) {
        return false;
      }
      return true;
    });
  }, [refunds, appliedFilters]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pagedRows = filteredRows.slice((safePage - 1) * pageSize, safePage * pageSize);

  const allSelected = pagedRows.length > 0 && pagedRows.every((r) => selectedIds.includes(r.refundId));

  const handleToggleAll = () => {
    const ids = pagedRows.map((r) => r.refundId);
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...ids])));
    }
  };

  const handleToggleRow = (refundId) => {
    setSelectedIds((prev) =>
      prev.includes(refundId) ? prev.filter((id) => id !== refundId) : [...prev, refundId]
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setAppliedFilters(draftFilters);
    setPage(1);
  };

  const handleReset = () => {
    const reset = {
      search: '',
      dateRange: DEFAULT_DATE_RANGE,
      packageName: 'all',
      status: 'all',
      refundMethod: 'all',
    };
    setDraftFilters(reset);
    setAppliedFilters(reset);
    setPage(1);
  };

  const exportCsv = (list, filename = 'refund_requests.csv') => {
    const headers = [
      'Refund ID', 'Order ID', 'Transaction ID', 'User ID', 'User Name',
      'Package', 'Refund Amount (INR)', 'Request Date', 'Refund Method', 'Status',
    ];
    const csv = [
      headers.join(','),
      ...list.map((r) =>
        [
          `"${r.refundId}"`,
          `"${r.orderId}"`,
          `"${r.txnId}"`,
          `"${r.userId}"`,
          `"${r.name}"`,
          `"${r.package}"`,
          `"${r.amount}"`,
          `"${r.requestDate}"`,
          `"${r.refundMethod}"`,
          `"${r.status}"`,
        ].join(',')
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleStatusUpdate = (refundId, newStatus, adminRemarks) => {
    setRefunds((prev) =>
      prev.map((row) =>
        row.refundId === refundId ? { ...row, status: newStatus, adminRemarks } : row
      )
    );
    onToast?.('success', `Refund ${refundId} marked as ${newStatus}.`);
  };

  const handleBulkAction = (action) => {
    if (selectedIds.length === 0) {
      onToast?.('info', 'Select at least one refund request to run a bulk action.');
      return;
    }
    if (action === 'approve_selected') {
      setRefunds((prev) =>
        prev.map((r) => (selectedIds.includes(r.refundId) ? { ...r, status: 'Refunded' } : r))
      );
      onToast?.('success', `${selectedIds.length} refund request(s) approved & marked Refunded.`);
      setSelectedIds([]);
    } else if (action === 'progress_selected') {
      setRefunds((prev) =>
        prev.map((r) => (selectedIds.includes(r.refundId) ? { ...r, status: 'In Progress' } : r))
      );
      onToast?.('info', `${selectedIds.length} refund request(s) moved to In Progress.`);
      setSelectedIds([]);
    } else if (action === 'export_selected') {
      const subset = refunds.filter((r) => selectedIds.includes(r.refundId));
      exportCsv(subset, 'selected_refunds.csv');
      onToast?.('success', `Exported ${subset.length} selected refund request(s).`);
    }
  };

  const handleCreateRefund = (payload) => {
    const newRow = {
      refundId: `RFD202610${Math.floor(10000 + Math.random() * 89999)}`,
      orderId: payload.orderId,
      txnId: payload.txnId,
      userId: 'USR100235',
      name: payload.name,
      email: `${payload.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      package: payload.package,
      amount: payload.amount,
      requestDate: '28 Oct 2026, 12:15 PM',
      refundMethod: payload.refundMethod,
      status: 'Requested',
      reason: payload.reason,
      adminRemarks: '',
    };
    setRefunds((prev) => [newRow, ...prev]);
    setPage(1);
    onToast?.('success', `Refund request ${newRow.refundId} initiated.`);
  };

  const kpiCards = [
    {
      id: 'total',
      title: 'Total Refunds',
      value: '142',
      icon: Coins,
      cardBg: 'from-white/95 to-indigo-50/50',
      borderColor: 'border-indigo-100/70',
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      flareColor: 'bg-indigo-400/12',
    },
    {
      id: 'refunded',
      title: 'Refunded',
      value: '96',
      pct: '(67.6%)',
      icon: Check,
      cardBg: 'from-white/95 to-emerald-50/55',
      borderColor: 'border-emerald-100/80',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      flareColor: 'bg-emerald-400/12',
    },
    {
      id: 'progress',
      title: 'In Progress',
      value: '18',
      pct: '(12.7%)',
      icon: Clock,
      cardBg: 'from-white/95 to-amber-50/55',
      borderColor: 'border-amber-100/80',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      flareColor: 'bg-amber-400/12',
    },
    {
      id: 'rejected',
      title: 'Rejected',
      value: '12',
      pct: '(8.5%)',
      icon: XCircle,
      cardBg: 'from-white/95 to-rose-50/55',
      borderColor: 'border-rose-100/80',
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-500',
      flareColor: 'bg-rose-400/12',
    },
    {
      id: 'requested',
      title: 'Requested',
      value: '16',
      pct: '(11.3%)',
      icon: RotateCcw,
      cardBg: 'from-white/95 to-sky-50/55',
      borderColor: 'border-sky-100/80',
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      flareColor: 'bg-sky-400/12',
    },
  ];

  const splitDateTime = (val = '') => {
    const parts = val.split(',');
    if (parts.length >= 2) {
      return { date: `${parts[0].trim()},`, time: parts.slice(1).join(',').trim() };
    }
    return { date: val, time: '' };
  };

  const renderPackage = (pkg) => {
    const cfg = PACKAGE_STYLES[pkg] || PACKAGE_STYLES['Starter Package'];
    const Icon = cfg.icon;
    return (
      <div className="flex items-center gap-1.5 min-w-0">
        <span
          className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs ${cfg.bg}`}
        >
          <Icon className="w-3.5 h-3.5" />
        </span>
        <span className="font-semibold text-slate-800 leading-tight">{pkg}</span>
      </div>
    );
  };

  const renderMethod = (method) => {
    const cfg = METHOD_STYLES[method] || METHOD_STYLES['Original Method'];
    const Icon = cfg.icon;
    return (
      <div className="flex items-center gap-1.5 min-w-0">
        <span
          className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${cfg.color}`}
        >
          <Icon className="w-3.5 h-3.5" />
        </span>
        <span className="font-semibold text-slate-700 leading-tight">{method}</span>
      </div>
    );
  };

  const renderStatusPill = (status) => {
    const cfg = STATUS_BADGES[status] || STATUS_BADGES.Requested;
    const StatusIcon = cfg.Icon;
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border whitespace-nowrap shadow-2xs transition-transform duration-300 group-hover/row:scale-105 ${cfg.pill}`}
      >
        <StatusIcon className="w-3 h-3 shrink-0" />
        <span>{status}</span>
      </span>
    );
  };

  const totalCountLabel = filteredRows.length === refunds.length && refunds.length === INITIAL_REFUNDS.length
    ? '142'
    : String(filteredRows.length);
  const showingFrom = pagedRows.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const showingTo = (safePage - 1) * pageSize + pagedRows.length;

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Row 1: 5 KPI Cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-3.5 items-stretch">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br ${card.cardBg} backdrop-blur-xl border ${card.borderColor} p-3.5 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 group flex items-center gap-3 sm:gap-3.5 h-full`}
            >
              <div
                className={`absolute top-0 right-0 w-36 h-36 ${card.flareColor} rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700`}
              />
              <div
                className={`relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}
              >
                <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-3" />
              </div>
              <div className="relative z-10 flex-1 min-w-0">
                <span className="block text-[11.5px] sm:text-[12px] font-semibold text-slate-500 truncate group-hover:text-slate-700 transition-colors">
                  {card.title}
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5 flex-wrap">
                  <h3 className="text-[20px] sm:text-[23px] font-black text-slate-900 tracking-tight leading-tight group-hover:text-indigo-950 transition-colors">
                    {card.value}
                  </h3>
                  {card.pct && (
                    <span className="text-[11.5px] font-bold text-slate-500">{card.pct}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Filters Card */}
      <form
        onSubmit={handleSearch}
        className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-3.5 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.08)] hover:border-indigo-300 transition-all duration-300"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 2xl:flex 2xl:items-end gap-3 items-end">
          {/* Search */}
          <div className="sm:col-span-2 lg:col-span-4 2xl:flex-[1.35] 2xl:min-w-[215px]">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
              Search
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={draftFilters.search}
                onChange={(e) =>
                  setDraftFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                placeholder="Refund ID, Transaction ID, Order ID, User or Email..."
                className="w-full h-10 bg-slate-50/75 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-[#4f3bf3] focus:ring-4 focus:ring-indigo-500/10 rounded-xl pl-8.5 pr-3 text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="sm:col-span-2 lg:col-span-4 2xl:w-[215px] 2xl:shrink-0">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1 whitespace-nowrap">
              Date Range
            </label>
            <DateRangePicker
              variant="modal"
              value={draftFilters.dateRange}
              onChange={(val) =>
                setDraftFilters((prev) => ({ ...prev, dateRange: val }))
              }
              placeholder="01 Oct 2026 - 31 Oct 2026"
              initialMonth={new Date(2026, 9, 1)}
              className="w-full"
            />
          </div>

          {/* Package */}
          <div className="lg:col-span-4 2xl:flex-1 2xl:min-w-[130px]">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1 whitespace-nowrap">
              Package
            </label>
            <CustomSelect
              options={PACKAGE_OPTIONS}
              value={draftFilters.packageName}
              onChange={(val) =>
                setDraftFilters((prev) => ({ ...prev, packageName: val }))
              }
              buttonClassName="w-full h-10 flex items-center justify-between gap-2 px-3 bg-white/85 hover:bg-white border border-slate-200/90 hover:border-indigo-300 rounded-xl shadow-2xs transition-all"
              textClassName="text-[12px] font-bold text-slate-700"
              iconClassName="w-3.5 h-3.5 text-slate-400"
            />
          </div>

          {/* Refund Status */}
          <div className="lg:col-span-4 2xl:flex-1 2xl:min-w-[130px]">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1 whitespace-nowrap">
              Refund Status
            </label>
            <CustomSelect
              options={REFUND_STATUS_OPTIONS}
              value={draftFilters.status}
              onChange={(val) =>
                setDraftFilters((prev) => ({ ...prev, status: val }))
              }
              buttonClassName="w-full h-10 flex items-center justify-between gap-2 px-3 bg-white/85 hover:bg-white border border-slate-200/90 hover:border-indigo-300 rounded-xl shadow-2xs transition-all"
              textClassName="text-[12px] font-bold text-slate-700"
              iconClassName="w-3.5 h-3.5 text-slate-400"
            />
          </div>

          {/* Refund Method */}
          <div className="lg:col-span-4 2xl:flex-1 2xl:min-w-[135px]">
            <label className="block text-[11.5px] font-bold text-slate-600 mb-1 whitespace-nowrap">
              Refund Method
            </label>
            <CustomSelect
              options={REFUND_METHOD_OPTIONS}
              value={draftFilters.refundMethod}
              onChange={(val) =>
                setDraftFilters((prev) => ({ ...prev, refundMethod: val }))
              }
              buttonClassName="w-full h-10 flex items-center justify-between gap-2 px-3 bg-white/85 hover:bg-white border border-slate-200/90 hover:border-indigo-300 rounded-xl shadow-2xs transition-all"
              textClassName="text-[12px] font-bold text-slate-700"
              iconClassName="w-3.5 h-3.5 text-slate-400"
            />
          </div>

          {/* Search & Reset */}
          <div className="sm:col-span-2 lg:col-span-4 2xl:w-[185px] 2xl:shrink-0 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-[12px] font-bold shadow-sm shadow-indigo-600/20 hover:shadow-md hover:shadow-indigo-600/30 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 h-10 px-3.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 active:scale-98 text-slate-700 text-[12px] font-bold shadow-2xs transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </form>

      {/* Row 3: Refund Requests Table Card */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.10)] hover:border-indigo-300 transition-all duration-300 group">
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-400/8 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        {/* Header */}
        <div className="relative z-10 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
              <RotateCcw className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h3 className="text-[15px] sm:text-[17px] font-black text-indigo-700 tracking-tight">
              Refund Requests ({totalCountLabel})
            </h3>
            {selectedIds.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10.5px] font-bold">
                {selectedIds.length} selected
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsInitiateOpen(true)}
              className="flex-1 sm:flex-none h-9 px-3.5 rounded-xl border border-indigo-200/90 bg-white hover:bg-indigo-50 text-indigo-700 text-[12px] font-bold shadow-2xs transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Initiate Refund</span>
            </button>

            <button
              type="button"
              onClick={() => {
                exportCsv(filteredRows, 'refund_requests.csv');
                onToast?.('success', `Exported ${filteredRows.length} refund request(s) to CSV.`);
              }}
              className="flex-1 sm:flex-none h-9 px-3.5 rounded-xl border border-slate-200/90 bg-white hover:bg-indigo-50/70 hover:border-indigo-300 hover:text-indigo-700 text-slate-700 text-[12px] font-bold shadow-2xs transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            <CustomSelect
              options={[
                { label: 'Bulk Actions', value: '' },
                { label: 'Approve & Refund', value: 'approve_selected' },
                { label: 'Mark In Progress', value: 'progress_selected' },
                { label: 'Export Selected', value: 'export_selected' },
              ]}
              value=""
              placeholder="Bulk Actions"
              leftIcon={<Layers className="w-3.5 h-3.5 text-slate-500" />}
              align="right"
              onChange={(val) => {
                if (val) handleBulkAction(val);
              }}
              buttonClassName="h-9 px-3 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-indigo-300 text-slate-700 shadow-2xs transition-all flex items-center justify-between gap-2 min-w-[134px]"
              textClassName="text-[12px] font-bold text-slate-700"
              iconClassName="w-3.5 h-3.5 text-slate-400"
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="relative z-10 hidden md:block overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-[11px] xl:text-[11.5px]">
            <thead>
              <tr className="border-b border-slate-200/70 text-slate-700 font-extrabold bg-slate-50/60">
                <th className="py-3 pl-4 pr-1.5 w-8 text-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleToggleAll}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                    aria-label="Select all refund requests"
                  />
                </th>
                <th className="py-3 px-1.5 font-bold">Refund ID</th>
                <th className="py-3 px-1.5 font-bold">Order ID</th>
                <th className="py-3 px-1.5 font-bold">Transaction ID</th>
                <th className="py-3 px-1.5 font-bold">User</th>
                <th className="py-3 px-1.5 font-bold">Package</th>
                <th className="py-3 px-1.5 font-bold leading-tight">
                  <span className="block">Refund</span>
                  <span className="block">Amount (₹)</span>
                </th>
                <th className="py-3 px-1.5 font-bold">Request Date</th>
                <th className="py-3 px-1.5 font-bold">Refund Method</th>
                <th className="py-3 px-1.5 font-bold text-center">Status</th>
                <th className="py-3 pl-1.5 pr-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-100/35">
              {pagedRows.length > 0 ? (
                pagedRows.map((row) => {
                  const isSelected = selectedIds.includes(row.refundId);
                  const dt = splitDateTime(row.requestDate);
                  return (
                    <tr
                      key={row.refundId}
                      className={`group/row border-b border-indigo-100/35 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300 ${
                        isSelected ? 'bg-indigo-50/40' : ''
                      }`}
                    >
                      <td className="py-3 pl-4 pr-1.5 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleRow(row.refundId)}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                          aria-label={`Select refund ${row.refundId}`}
                        />
                      </td>

                      <td className="py-3 px-1.5 leading-tight">
                        <button
                          type="button"
                          onClick={() => setViewingRefund(row)}
                          className="font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-2 decoration-indigo-300 hover:decoration-indigo-600 cursor-pointer text-left"
                        >
                          {row.refundId}
                        </button>
                      </td>

                      <td className="py-3 px-1.5 font-semibold text-slate-700 leading-tight">
                        {row.orderId}
                      </td>

                      <td className="py-3 px-1.5 font-semibold text-slate-700 leading-tight">
                        {row.txnId}
                      </td>

                      <td className="py-3 px-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <img
                            src={row.avatar}
                            alt={row.name}
                            className="w-6.5 h-6.5 rounded-full object-cover shrink-0 border border-slate-200/90 shadow-2xs transition-transform duration-300 group-hover/row:scale-110"
                          />
                          <div className="min-w-0 leading-tight">
                            <span className="block font-bold text-slate-900 truncate">
                              {row.name}
                            </span>
                            <span className="block text-[10px] font-semibold text-slate-400">
                              {row.userId}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-1.5">{renderPackage(row.package)}</td>

                      <td className="py-3 px-1.5 font-black text-slate-900 whitespace-nowrap tabular-nums">
                        ₹{row.amount}
                      </td>

                      <td className="py-3 px-1.5 text-slate-600 font-medium leading-tight">
                        <span className="block font-semibold text-slate-700 whitespace-nowrap">
                          {dt.date}
                        </span>
                        <span className="block text-[10px] text-slate-400 whitespace-nowrap">
                          {dt.time}
                        </span>
                      </td>

                      <td className="py-3 px-1.5">{renderMethod(row.refundMethod)}</td>

                      <td className="py-3 px-1.5 text-center">{renderStatusPill(row.status)}</td>

                      <td className="py-3 pl-1.5 pr-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setViewingRefund(row)}
                          className="w-7 h-7 rounded-lg border border-indigo-200/80 bg-white hover:bg-indigo-50 text-indigo-600 hover:text-indigo-800 inline-flex items-center justify-center shadow-2xs transition-all group-hover/row:scale-105 cursor-pointer"
                          title="View Refund Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400 font-semibold">
                    No refund requests match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Cards (< md) */}
        <div className="relative z-10 md:hidden p-3.5 space-y-3">
          {pagedRows.length > 0 && (
            <div className="flex items-center justify-between px-1 pb-1">
              <label className="inline-flex items-center gap-2 text-[11.5px] font-bold text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleToggleAll}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                />
                <span>Select all on page ({pagedRows.length})</span>
              </label>
            </div>
          )}

          {pagedRows.length > 0 ? (
            pagedRows.map((row) => {
              const isSelected = selectedIds.includes(row.refundId);
              return (
                <div
                  key={row.refundId}
                  className={`p-3.5 rounded-2xl border bg-white shadow-2xs space-y-2.5 transition-all ${
                    isSelected
                      ? 'border-indigo-400 ring-2 ring-indigo-500/15'
                      : 'border-slate-200/80 hover:border-indigo-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleRow(row.refundId)}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600 shrink-0"
                      />
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() => setViewingRefund(row)}
                          className="text-[12px] font-extrabold text-indigo-600 underline underline-offset-2 text-left truncate block"
                        >
                          {row.refundId}
                        </button>
                        <span className="text-[10.5px] font-semibold text-slate-400 block truncate">
                          {row.orderId} • {row.txnId}
                        </span>
                      </div>
                    </div>
                    {renderStatusPill(row.status)}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={row.avatar}
                        alt={row.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0">
                        <p className="text-[12.5px] font-bold text-slate-900 truncate">{row.name}</p>
                        <p className="text-[11px] font-semibold text-slate-400">{row.userId}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block text-[10px] font-semibold text-slate-400">Refund</span>
                      <span className="text-[14px] font-black text-slate-900">₹{row.amount}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11.5px]">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block mb-1">Package</span>
                      {renderPackage(row.package)}
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block mb-1">Refund Method</span>
                      {renderMethod(row.refundMethod)}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-medium text-slate-400">{row.requestDate}</span>
                    <button
                      type="button"
                      onClick={() => setViewingRefund(row)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/70 text-indigo-700 text-[11.5px] font-bold cursor-pointer transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-10 text-center text-slate-400 font-semibold text-[12.5px]">
              No refund requests match the selected filters.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="relative z-10 px-4 sm:px-5 py-3 border-t border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[11.5px] text-slate-500 font-medium">
            Showing {showingFrom} to {showingTo} of {totalCountLabel} refund requests
          </span>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[11.5px] text-slate-500 font-medium">Rows per page:</span>
              <CustomSelect
                options={[
                  { label: '5', value: '5' },
                  { label: '10', value: '10' },
                  { label: '25', value: '25' },
                ]}
                value={String(pageSize)}
                onChange={(val) => {
                  setPageSize(Number(val));
                  setPage(1);
                }}
                align="right"
                buttonClassName="h-7.5 px-2.5 rounded-lg border border-slate-200 bg-white hover:border-indigo-300 flex items-center justify-between gap-1.5 min-w-[54px]"
                textClassName="text-[11.5px] font-bold text-slate-700"
                iconClassName="w-3 h-3 text-slate-400"
              />
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage(1)}
                className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <ChevronsLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const p = idx + 1;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 rounded-lg text-[11.5px] font-bold cursor-pointer ${
                      safePage === p
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setPage(totalPages)}
                className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <ChevronsRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RefundDetailsModal
        refund={viewingRefund}
        isOpen={Boolean(viewingRefund)}
        onClose={() => setViewingRefund(null)}
        onStatusUpdate={handleStatusUpdate}
        onToast={onToast}
      />

      <InitiateRefundModal
        isOpen={isInitiateOpen}
        onClose={() => setIsInitiateOpen(false)}
        onCreateRefund={handleCreateRefund}
      />
    </div>
  );
}
