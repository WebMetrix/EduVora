import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, FileText, RotateCcw, Clock, AlertTriangle, CheckCircle2, Info, X
} from 'lucide-react';
import OrderStatsCards from '../../components/orders/OrderStatsCards';
import OrderFiltersCard from '../../components/orders/OrderFiltersCard';
import OrdersTable from '../../components/orders/OrdersTable';
import InvoicePreviewModal from '../../components/orders/InvoicePreviewModal';
import OrderActionDetailsModal from '../../components/orders/OrderActionDetailsModal';
import { isDateWithinRange } from '../../utils/dateFilterUtils';

const INITIAL_ORDERS = [
  {
    id: 1,
    orderId: 'ORD-202610280954',
    invoiceNo: 'INV-2026-10891',
    userId: 'USR100234',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    mobile: '+91 98765 43211',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    package: 'Elite Package',
    amount: '9,999',
    paymentMethod: 'UPI',
    orderDate: '28 Oct 2026, 09:54 AM',
    status: 'Completed',
    txnId: 'UPI202610280954',
  },
  {
    id: 2,
    orderId: 'ORD-202610271630',
    invoiceNo: 'INV-2026-10884',
    userId: 'USR100233',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    mobile: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    package: 'Pro Package',
    amount: '4,899',
    paymentMethod: 'Credit Card',
    orderDate: '27 Oct 2026, 04:30 PM',
    status: 'Completed',
    txnId: 'CC202610271630',
  },
  {
    id: 3,
    orderId: 'ORD-202610271410',
    invoiceNo: 'INV-2026-10879',
    userId: 'USR100232',
    name: 'Neha Singh',
    email: 'neha.singh@example.com',
    mobile: '+91 98112 34901',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    package: 'Growth Package',
    amount: '2,799',
    paymentMethod: 'UPI',
    orderDate: '27 Oct 2026, 02:10 PM',
    status: 'Pending',
    txnId: 'UPI202610271410',
  },
  {
    id: 4,
    orderId: 'ORD-202610261115',
    invoiceNo: 'INV-2026-10872',
    userId: 'USR100231',
    name: 'Amit Das',
    email: 'amit.das@example.com',
    mobile: '+91 98223 11408',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    package: 'Starter Package',
    amount: '1,199',
    paymentMethod: 'Net Banking',
    orderDate: '26 Oct 2026, 11:15 AM',
    status: 'Failed',
    txnId: 'NB202610261115',
  },
  {
    id: 5,
    orderId: 'ORD-202610251905',
    invoiceNo: 'INV-2026-10865',
    userId: 'USR100230',
    name: 'Sneha Roy',
    email: 'sneha.roy@example.com',
    mobile: '+91 99104 88321',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
    package: 'Pro Package',
    amount: '4,899',
    paymentMethod: 'UPI',
    orderDate: '25 Oct 2026, 07:05 PM',
    status: 'Refunded',
    txnId: 'UPI202610251905',
  },
  {
    id: 6,
    orderId: 'ORD-202610241540',
    invoiceNo: 'INV-2026-10858',
    userId: 'USR100229',
    name: 'Vikram Patel',
    email: 'vikram.patel@example.com',
    mobile: '+91 98331 55201',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    package: 'Elite Package',
    amount: '9,999',
    paymentMethod: 'Credit Card',
    orderDate: '24 Oct 2026, 03:40 PM',
    status: 'Completed',
    txnId: 'CC202610241540',
  },
  {
    id: 7,
    orderId: 'ORD-202610231015',
    invoiceNo: 'INV-2026-10851',
    userId: 'USR100228',
    name: 'Kavya Nair',
    email: 'kavya.nair@example.com',
    mobile: '+91 97450 21899',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    package: 'Growth Package',
    amount: '2,799',
    paymentMethod: 'UPI',
    orderDate: '23 Oct 2026, 10:15 AM',
    status: 'Completed',
    txnId: 'UPI202610231015',
  },
  {
    id: 8,
    orderId: 'ORD-202610221820',
    invoiceNo: 'INV-2026-10844',
    userId: 'USR100227',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@example.com',
    mobile: '+91 98201 77412',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    package: 'Starter Package',
    amount: '1,199',
    paymentMethod: 'Debit Card',
    orderDate: '22 Oct 2026, 06:20 PM',
    status: 'Pending',
    txnId: 'DC202610221820',
  },
  {
    id: 9,
    orderId: 'ORD-202610211210',
    invoiceNo: 'INV-2026-10837',
    userId: 'USR100226',
    name: 'Rohan Malhotra',
    email: 'rohan.malhotra@example.com',
    mobile: '+91 98119 60345',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
    package: 'Pro Package',
    amount: '4,899',
    paymentMethod: 'Net Banking',
    orderDate: '21 Oct 2026, 12:10 PM',
    status: 'Completed',
    txnId: 'NB202610211210',
  },
  {
    id: 10,
    orderId: 'ORD-202610200930',
    invoiceNo: 'INV-2026-10830',
    userId: 'USR100225',
    name: 'Ananya Gupta',
    email: 'ananya.gupta@example.com',
    mobile: '+91 98711 45230',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    package: 'Growth Package',
    amount: '2,799',
    paymentMethod: 'UPI',
    orderDate: '20 Oct 2026, 09:30 AM',
    status: 'Refunded',
    txnId: 'UPI202610200930',
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
    id: 'orders',
    label: 'Order Management',
    path: '/orders',
    icon: ShoppingCart,
    subtitle: 'View and manage all user package orders.',
    tableTitle: 'Orders',
    totalCount: '2,846',
  },
  {
    id: 'invoices',
    label: 'Invoice Management',
    path: '/orders/invoices',
    icon: FileText,
    subtitle: 'Access generated GST invoices and credit notes.',
    tableTitle: 'Invoices',
    totalCount: '2,586',
  },
  {
    id: 'refunds',
    label: 'Refund & Cancellation Management',
    path: '/orders/refunds',
    icon: RotateCcw,
    subtitle: 'Track refund requests, cancellations, and reversals.',
    tableTitle: 'Refund & Cancellation Requests',
    totalCount: '190',
  },
  {
    id: 'history',
    label: 'Order Status History',
    path: '/orders/history',
    icon: Clock,
    subtitle: 'Audit chronological payment and activation updates.',
    tableTitle: 'Order Status Logs',
    totalCount: '2,846',
  },
  {
    id: 'exceptions',
    label: 'Order Exceptions',
    path: '/orders/exceptions',
    icon: AlertTriangle,
    subtitle: 'Investigate failed transactions and pending verifications.',
    tableTitle: 'Flagged Orders',
    totalCount: '210',
  },
];

export default function OrderManagement({ defaultTab = 'orders' }) {
  const location = useLocation();
  const navigate = useNavigate();

  const resolveTabFromPath = (pathname) => {
    if (pathname.includes('/invoices')) return 'invoices';
    if (pathname.includes('/refunds')) return 'refunds';
    if (pathname.includes('/history')) return 'history';
    if (pathname.includes('/exceptions')) return 'exceptions';
    return defaultTab;
  };

  const [activeTab, setActiveTab] = useState(() => resolveTabFromPath(location.pathname));
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  useEffect(() => {
    setActiveTab(resolveTabFromPath(location.pathname));
  }, [location.pathname, defaultTab]);

  const [draftFilters, setDraftFilters] = useState({
    search: '',
    packageName: 'all',
    status: 'all',
    paymentMethod: 'all',
    dateRange: DEFAULT_DATE_RANGE,
  });
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);

  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [viewingInvoice, setViewingInvoice] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const currentTabConfig = TABS.find((t) => t.id === activeTab) || TABS[0];

  const handleFilterFieldChange = (field, value) => {
    setDraftFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    setAppliedFilters(draftFilters);
    setPage(1);
  };

  const handleResetFilters = () => {
    const reset = {
      search: '',
      packageName: 'all',
      status: 'all',
      paymentMethod: 'all',
      dateRange: DEFAULT_DATE_RANGE,
    };
    setDraftFilters(reset);
    setAppliedFilters(reset);
    setPage(1);
  };

  const filteredOrders = useMemo(() => {
    const q = appliedFilters.search.trim().toLowerCase();

    return orders.filter((row) => {
      if (activeTab === 'invoices' && row.status !== 'Completed' && row.status !== 'Refunded') {
        return false;
      }
      if (activeTab === 'refunds' && row.status !== 'Refunded' && row.status !== 'Failed' && row.status !== 'Pending') {
        return false;
      }
      if (activeTab === 'exceptions' && row.status !== 'Failed' && row.status !== 'Pending') {
        return false;
      }

      if (appliedFilters.packageName !== 'all' && row.package !== appliedFilters.packageName) {
        return false;
      }
      if (appliedFilters.status !== 'all' && row.status !== appliedFilters.status) {
        return false;
      }
      if (appliedFilters.paymentMethod !== 'all' && row.paymentMethod !== appliedFilters.paymentMethod) {
        return false;
      }
      if (q) {
        const match =
          row.orderId.toLowerCase().includes(q) ||
          row.userId.toLowerCase().includes(q) ||
          row.name.toLowerCase().includes(q) ||
          row.email.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (
        appliedFilters.dateRange?.preset !== 'this_month' &&
        !isDateWithinRange(row.orderDate, appliedFilters.dateRange)
      ) {
        return false;
      }
      return true;
    });
  }, [orders, activeTab, appliedFilters]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pagedOrders = filteredOrders.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleToggleSelect = (orderId) => {
    setSelectedIds((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const handleToggleSelectAll = () => {
    const pageIds = pagedOrders.map((r) => r.orderId);
    const allSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const exportCsv = (list, filename = 'orders_report.csv') => {
    const headers = ['Order ID', 'Invoice No', 'User ID', 'User Name', 'Package', 'Amount (INR)', 'Payment Method', 'Order Date', 'Status'];
    const csv = [
      headers.join(','),
      ...list.map((r) =>
        [
          `"${r.orderId}"`,
          `"${r.invoiceNo}"`,
          `"${r.userId}"`,
          `"${r.name}"`,
          `"${r.package}"`,
          `"${r.amount}"`,
          `"${r.paymentMethod}"`,
          `"${r.orderDate}"`,
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

  const handleBulkAction = (action) => {
    if (selectedIds.length === 0) {
      showToast('info', 'Select at least one order to run a bulk action.');
      return;
    }

    if (action === 'mark_completed') {
      setOrders((prev) =>
        prev.map((row) =>
          selectedIds.includes(row.orderId) ? { ...row, status: 'Completed' } : row
        )
      );
      showToast('success', `${selectedIds.length} order(s) marked Completed.`);
      setSelectedIds([]);
    } else if (action === 'generate_invoices') {
      showToast('success', `Generated invoices for ${selectedIds.length} order(s).`);
    } else if (action === 'export_selected') {
      const subset = orders.filter((o) => selectedIds.includes(o.orderId));
      exportCsv(subset, 'selected_orders.csv');
      showToast('success', `Exported ${subset.length} selected order(s).`);
    }
  };

  const dynamicStats = useMemo(() => {
    const completedDelta = orders.filter((o) => o.status === 'Completed').length - INITIAL_ORDERS.filter((o) => o.status === 'Completed').length;
    const pendingDelta = orders.filter((o) => o.status === 'Pending').length - INITIAL_ORDERS.filter((o) => o.status === 'Pending').length;
    const failedDelta = orders.filter((o) => o.status === 'Failed').length - INITIAL_ORDERS.filter((o) => o.status === 'Failed').length;
    const refundedDelta = orders.filter((o) => o.status === 'Refunded').length - INITIAL_ORDERS.filter((o) => o.status === 'Refunded').length;

    return {
      total: '2,846',
      completed: (2538 + completedDelta).toLocaleString(),
      pending: (68 + pendingDelta).toLocaleString(),
      failed: (142 + failedDelta).toLocaleString(),
      refunded: (48 + refundedDelta).toLocaleString(),
    };
  }, [orders]);

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
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-[20px] sm:text-[26px] lg:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
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
          <span className="hover:text-indigo-600 transition-colors">Orders &amp; Invoices</span>
          <span className="text-slate-300">/</span>
          <span className="text-indigo-600 font-bold">{currentTabConfig.label}</span>
        </nav>
      </div>

      {/* 5 Top Navigation Tab Cards */}
      <div className="overflow-x-auto no-scrollbar pb-0.5">
        <div className="grid grid-flow-col auto-cols-max lg:grid-flow-row lg:grid-cols-5 gap-2.5 min-w-max lg:min-w-0">
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
                  setSelectedIds([]);
                  navigate(tab.path);
                }}
                className={`flex items-center justify-center gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border text-[11.5px] sm:text-[12px] font-bold transition-all duration-200 cursor-pointer whitespace-nowrap lg:whitespace-normal ${
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

      {/* Row 2: 5 Stat Cards */}
      <OrderStatsCards stats={dynamicStats} />

      {/* Row 3: Glassmorphic Filter Bar */}
      <OrderFiltersCard
        filters={draftFilters}
        onChange={handleFilterFieldChange}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {/* Row 4: Orders Table Card */}
      <OrdersTable
        sectionTitle={currentTabConfig.tableTitle}
        totalLabelCount={
          filteredOrders.length === orders.length
            ? currentTabConfig.totalCount
            : String(filteredOrders.length)
        }
        rows={pagedOrders}
        totalFilteredCount={filteredOrders.length}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        onExport={() => {
          exportCsv(filteredOrders, `${activeTab}_export.csv`);
          showToast('success', `Exported ${filteredOrders.length} record(s) to CSV.`);
        }}
        onBulkAction={handleBulkAction}
        onViewOrder={(order) => setViewingOrder(order)}
        onViewInvoice={(order) => setViewingInvoice(order)}
        page={safePage}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1);
        }}
        activeTab={activeTab}
      />

      {/* Order Details Modal matching design */}
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

      {/* Tax Invoice Preview Modal */}
      <InvoicePreviewModal
        order={viewingInvoice}
        isOpen={Boolean(viewingInvoice)}
        onClose={() => setViewingInvoice(null)}
        onDownloadToast={(msg) => showToast('success', msg)}
      />
    </div>
  );
}
