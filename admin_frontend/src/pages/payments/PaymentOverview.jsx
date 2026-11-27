import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  CreditCard, ArrowLeftRight, ShieldCheck, RotateCcw, Layers, AlertTriangle,
  CheckCircle2, Info, X
} from 'lucide-react';
import PaymentFiltersCard from '../../components/payments/PaymentFiltersCard';
import PaymentStatsCards from '../../components/payments/PaymentStatsCards';
import PaymentCharts from '../../components/payments/PaymentCharts';
import {
  PaymentsOverviewBottom,
} from '../../components/payments/PaymentsBottomSection';
import TransactionManagementSection from '../../components/payments/TransactionManagementSection';
import RefundManagementSection from '../../components/payments/RefundManagementSection';
import TransactionDetailsModal from '../../components/payments/TransactionDetailsModal';
import OrderActionDetailsModal from '../../components/orders/OrderActionDetailsModal';
import InvoicePreviewModal from '../../components/orders/InvoicePreviewModal';
import { isDateWithinRange } from '../../utils/dateFilterUtils';

const PAYMENT_RECORDS = [
  {
    txnId: 'TXN784532109654',
    orderId: 'ORD-202610280954',
    invoiceNo: 'INV-202610280954',
    userId: 'USR100234',
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    mobile: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    package: 'Elite Package',
    amount: '9,999',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Completed',
    orderDate: '28 Oct 2026, 09:54 AM',
    gateway: 'Razorpay',
  },
  {
    txnId: 'TXN784532109655',
    orderId: 'ORD-202610271630',
    invoiceNo: 'INV-202610271630',
    userId: 'USR100233',
    name: 'Rahul Verma',
    email: 'rahul.verma@gmail.com',
    mobile: '+91 98765 43211',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    package: 'Pro Package',
    amount: '4,899',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Completed',
    orderDate: '27 Oct 2026, 04:30 PM',
    gateway: 'Razorpay',
  },
  {
    txnId: 'TXN784532109656',
    orderId: 'ORD-202610271410',
    invoiceNo: 'INV-202610271410',
    userId: 'USR100232',
    name: 'Neha Singh',
    email: 'neha.singh@gmail.com',
    mobile: '+91 98112 34901',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    package: 'Growth Package',
    amount: '2,799',
    paymentMethod: 'Net Banking',
    paymentStatus: 'Pending',
    status: 'Pending',
    orderDate: '27 Oct 2026, 02:10 PM',
    gateway: 'Razorpay',
  },
  {
    txnId: 'TXN784532109657',
    orderId: 'ORD-202610261115',
    invoiceNo: 'INV-202610261115',
    userId: 'USR100231',
    name: 'Amit Das',
    email: 'amit.das@gmail.com',
    mobile: '+91 98223 11408',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    package: 'Starter Package',
    amount: '1,199',
    paymentMethod: 'Wallet',
    paymentStatus: 'Failed',
    status: 'Failed',
    orderDate: '26 Oct 2026, 11:15 AM',
    gateway: 'Cashfree',
  },
  {
    txnId: 'TXN784532109658',
    orderId: 'ORD-202610251905',
    invoiceNo: 'INV-202610251905',
    userId: 'USR100230',
    name: 'Sneha Roy',
    email: 'sneha.roy@gmail.com',
    mobile: '+91 99104 88321',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
    package: 'Pro Package',
    amount: '4,899',
    paymentMethod: 'UPI',
    paymentStatus: 'Refunded',
    status: 'Refunded',
    orderDate: '25 Oct 2026, 07:05 PM',
    gateway: 'Razorpay',
  },
  {
    txnId: 'TXN784532109659',
    orderId: 'ORD-202610241540',
    invoiceNo: 'INV-202610241540',
    userId: 'USR100229',
    name: 'Vikram Patel',
    email: 'vikram.patel@gmail.com',
    mobile: '+91 98331 55201',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    package: 'Elite Package',
    amount: '9,999',
    paymentMethod: 'Debit Card',
    paymentStatus: 'Paid',
    status: 'Completed',
    orderDate: '24 Oct 2026, 03:40 PM',
    gateway: 'Razorpay',
  },
  {
    txnId: 'TXN784532109660',
    orderId: 'ORD-202610231015',
    invoiceNo: 'INV-202610231015',
    userId: 'USR100228',
    name: 'Kavya Nair',
    email: 'kavya.nair@gmail.com',
    mobile: '+91 97450 21899',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    package: 'Growth Package',
    amount: '2,799',
    paymentMethod: 'Wallet',
    paymentStatus: 'Paid',
    status: 'Completed',
    orderDate: '23 Oct 2026, 10:15 AM',
    gateway: 'Paytm',
  },
  {
    txnId: 'TXN784532109661',
    orderId: 'ORD-202610221820',
    invoiceNo: 'INV-202610221820',
    userId: 'USR100227',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@gmail.com',
    mobile: '+91 98201 77412',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    package: 'Starter Package',
    amount: '1,199',
    paymentMethod: 'UPI',
    paymentStatus: 'Pending',
    status: 'Pending',
    orderDate: '22 Oct 2026, 06:20 PM',
    gateway: 'Razorpay',
  },
];

const DEFAULT_DATE_RANGE = {
  preset: 'this_month',
  label: 'This Month',
  startDate: new Date(2026, 9, 1),
  endDate: new Date(2026, 9, 31),
};

const TABS = [
  {
    id: 'overview',
    label: 'Payment Overview',
    path: '/payments',
    icon: CreditCard,
    subtitle: 'Monitor payment performance and transaction statistics across all packages.',
  },
  {
    id: 'transactions',
    label: 'Transaction Management',
    path: '/payments/transactions',
    icon: ArrowLeftRight,
    subtitle: 'View and manage every payment transaction across payment methods.',
  },
  {
    id: 'verification',
    label: 'Payment Verification',
    path: '/payments/verification',
    icon: ShieldCheck,
    subtitle: 'Verify pending gateway callbacks and confirm manual settlements.',
  },
  {
    id: 'refunds',
    label: 'Refund Management',
    path: '/payments/refunds',
    icon: RotateCcw,
    subtitle: 'Process, track and manage payment refunds for packages and orders.',
  },
  {
    id: 'reconciliation',
    label: 'Payment Reconciliation',
    path: '/payments/reconciliation',
    icon: Layers,
    subtitle: 'Cross-check gateway settlements with platform order ledger.',
  },
  {
    id: 'webhooks',
    label: 'Payment Webhook & Exceptions',
    path: '/payments/webhooks',
    icon: AlertTriangle,
    subtitle: 'Track webhook delivery failures and unresolved payment exceptions.',
  },
];

export default function PaymentOverview({ defaultTab = 'overview' }) {
  const location = useLocation();
  const navigate = useNavigate();

  const resolveTabFromPath = (pathname) => {
    if (pathname.includes('/transactions')) return 'transactions';
    if (pathname.includes('/verification')) return 'verification';
    if (pathname.includes('/refunds')) return 'refunds';
    if (pathname.includes('/reconciliation')) return 'reconciliation';
    if (pathname.includes('/webhooks')) return 'webhooks';
    return defaultTab;
  };

  const [activeTab, setActiveTab] = useState(() => resolveTabFromPath(location.pathname));
  const [records, setRecords] = useState(PAYMENT_RECORDS);

  useEffect(() => {
    setActiveTab(resolveTabFromPath(location.pathname));
  }, [location.pathname, defaultTab]);

  const [draftFilters, setDraftFilters] = useState({
    dateRange: DEFAULT_DATE_RANGE,
    packageName: 'all',
    paymentMethod: 'all',
    status: 'all',
  });
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [viewingInvoice, setViewingInvoice] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const currentTabConfig = TABS.find((t) => t.id === activeTab) || TABS[0];

  const handleFieldChange = (field, val) => {
    setDraftFilters((prev) => ({ ...prev, [field]: val }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    setAppliedFilters(draftFilters);
    setPage(1);
  };

  const handleReset = () => {
    const reset = {
      dateRange: DEFAULT_DATE_RANGE,
      packageName: 'all',
      paymentMethod: 'all',
      status: 'all',
    };
    setDraftFilters(reset);
    setAppliedFilters(reset);
    setPage(1);
  };

  const filteredRecords = useMemo(() => {
    return records.filter((row) => {
      if (activeTab === 'verification' && row.paymentStatus !== 'Pending') {
        return false;
      }
      if (activeTab === 'refunds' && row.paymentStatus !== 'Refunded') {
        return false;
      }
      if (activeTab === 'webhooks' && row.paymentStatus !== 'Failed' && row.paymentStatus !== 'Pending') {
        return false;
      }

      if (appliedFilters.packageName !== 'all' && row.package !== appliedFilters.packageName) {
        return false;
      }
      if (
        appliedFilters.paymentMethod !== 'all' &&
        row.paymentMethod !== appliedFilters.paymentMethod
      ) {
        return false;
      }
      if (appliedFilters.status !== 'all' && row.paymentStatus !== appliedFilters.status) {
        return false;
      }
      if (
        appliedFilters.dateRange?.preset !== 'this_month' &&
        !isDateWithinRange(row.orderDate, appliedFilters.dateRange)
      ) {
        return false;
      }
      return true;
    });
  }, [records, activeTab, appliedFilters]);

  const HeaderIcon = currentTabConfig.icon;

  return (
    <div className="flex flex-col gap-4 sm:gap-5 animate-fade-in relative pb-1 sm:pb-2">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 sm:top-5 left-4 right-4 sm:left-auto sm:right-5 z-[10030] flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-xl border animate-slide-in-right ${
            toast.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-indigo-50 border-indigo-200 text-indigo-800'
          }`}
        >
          <div className="flex items-center gap-2 text-[12px] font-bold">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="p-0.5 rounded-md hover:bg-black/5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header + Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
            <HeaderIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-[20px] sm:text-[26px] lg:text-[28px] font-black text-indigo-700 tracking-tight leading-tight">
              {currentTabConfig.label}
            </h1>
            <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
              {currentTabConfig.subtitle}
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-[12.5px] font-medium text-slate-500 flex-wrap">
          <Link to="/dashboard" className="hover:text-indigo-600 transition-colors cursor-pointer">
            Dashboard
          </Link>
          <span className="text-slate-300">/</span>
          <span className="hover:text-indigo-600 transition-colors">Payments</span>
          <span className="text-slate-300">/</span>
          <span className="text-indigo-600 font-bold">{currentTabConfig.label}</span>
        </nav>
      </div>

      {/* 6 Navigation Tabs - scrollable on mobile/tablet, 6-col grid on xl */}
      <div className="overflow-x-auto no-scrollbar pb-0.5">
        <div className="grid grid-flow-col auto-cols-max xl:grid-flow-row xl:grid-cols-6 gap-2.5 min-w-max xl:min-w-0">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setPage(1);
                  navigate(tab.path);
                }}
                className={`flex items-center justify-center gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border text-[11.5px] sm:text-[12px] font-bold transition-all duration-200 cursor-pointer whitespace-nowrap xl:whitespace-normal ${
                  isActive
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                    : 'bg-white/90 border-slate-200/80 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5 shadow-2xs'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="leading-tight text-left">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Row 2: Filters Bar */}
          <PaymentFiltersCard
            filters={draftFilters}
            onChange={handleFieldChange}
            onApply={handleApply}
            onReset={handleReset}
          />

          {/* Row 3: 6 KPI Stat Cards */}
          <PaymentStatsCards />

          {/* Row 4: Payment Trend + Payments by Method */}
          <PaymentCharts />

          {/* Row 5: Payments by Package + Recent Payments */}
          <PaymentsOverviewBottom
            recentPayments={filteredRecords}
            onViewAll={() => {
              setActiveTab('transactions');
              navigate('/payments/transactions');
            }}
            onSelectPayment={(row) => setSelectedPayment(row)}
          />
        </>
      ) : activeTab === 'refunds' ? (
        <RefundManagementSection onToast={showToast} />
      ) : (
        <TransactionManagementSection
          records={records}
          onUpdateRecords={setRecords}
          onSelectTransaction={(row) => setSelectedPayment(row)}
          onToast={showToast}
          activeTab={activeTab}
          sectionLabel={activeTab === 'transactions' ? 'Transactions' : currentTabConfig.label}
        />
      )}

      {/* Transaction Details Modal matching screenshot */}
      <TransactionDetailsModal
        transaction={selectedPayment}
        isOpen={Boolean(selectedPayment)}
        onClose={() => setSelectedPayment(null)}
        onViewOrder={(txn) => {
          setSelectedPayment(null);
          setViewingOrder(txn);
        }}
        onViewInvoice={(txn) => {
          setSelectedPayment(null);
          setViewingInvoice(txn);
        }}
        onInitiateRefund={(txn) => {
          setRecords((prev) =>
            prev.map((row) =>
              row.txnId === txn.txnId
                ? { ...row, paymentStatus: 'Refunded', status: 'Refunded' }
                : row
            )
          );
          setSelectedPayment((prev) =>
            prev && prev.txnId === txn.txnId
              ? { ...prev, paymentStatus: 'Refunded', status: 'Refunded' }
              : prev
          );
          showToast('success', `Refund initiated for transaction ${txn.txnId}.`);
        }}
        onToast={showToast}
      />

      {/* Order Details Modal (opened when clicking Order ID inside Transaction Details) */}
      <OrderActionDetailsModal
        order={viewingOrder}
        isOpen={Boolean(viewingOrder)}
        onClose={() => setViewingOrder(null)}
        onViewInvoice={(order) => {
          setViewingOrder(null);
          setViewingInvoice(order);
        }}
        onActionToast={showToast}
      />

      {/* Invoice Preview Modal */}
      <InvoicePreviewModal
        order={viewingInvoice}
        isOpen={Boolean(viewingInvoice)}
        onClose={() => setViewingInvoice(null)}
        onDownloadToast={(msg) => showToast('success', msg)}
      />
    </div>
  );
}
