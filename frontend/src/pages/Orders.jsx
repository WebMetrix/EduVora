import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import OrderStats from '../components/orders/OrderStats';
import OrderFilters from '../components/orders/OrderFilters';
import OrdersDataTable from '../components/orders/OrdersDataTable';
import OrderDetailsModal from '../components/orders/OrderDetailsModal';
import { exportToExcel } from '../utils/excelExport';
import { fetchUserOrders, fetchOrdersExport } from '../redux/slices/orderSlice';

export default function Orders() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { orders, stats, pagination, loading } = useSelector((state) => state.order);

  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders whenever filters or pagination change
  useEffect(() => {
    dispatch(fetchUserOrders({
      page,
      limit: rowsPerPage,
      search: searchTerm,
      timeFilter,
      statusFilter
    }));
  }, [dispatch, page, rowsPerPage, searchTerm, timeFilter, statusFilter]);

  // Reset page to 1 when filters change
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
    setPage(1);
  };

  const handleStatusFilterChange = (filter) => {
    setStatusFilter(filter);
    setPage(1);
  };

  const handleRowsPerPageChange = (newLimit) => {
    setRowsPerPage(newLimit);
    setPage(1);
  };

  // Export filtered orders to Excel
  const handleExport = async () => {
    const exportData = await dispatch(fetchOrdersExport({
      search: searchTerm,
      timeFilter,
      statusFilter
    })).unwrap();

    const columns = [
      { header: t('orders.table.orderId'), key: 'Order ID', width: 25 },
      { header: t('orders.table.package'), key: 'Package Name', width: 30 },
      { header: t('orders.table.amount'), key: 'Amount', width: 15 },
      { header: t('orders.table.paymentMethod'), key: 'Payment Method', width: 20 },
      { header: t('orders.table.orderDate'), key: 'Order Date', width: 20 },
      { header: t('orders.table.status'), key: 'Status', width: 15 },
      { header: t('orders.details.transactionId'), key: 'Transaction ID', width: 25 },
      { header: t('orders.actions.downloadInvoice'), key: 'Invoice Number', width: 25 }
    ];

    exportToExcel({
      data: exportData || [],
      fileName: 'Orders_Report',
      columns,
      sheetName: 'Orders'
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-[1400px] mx-auto pb-6">
      {/* Header & Breadcrumbs */}
      <div>
        <h1 className="text-[24px] lg:text-[28px] font-bold text-slate-900 mb-2">
          {t('orders.title')}
        </h1>
        <div className="hidden md:flex items-center text-[13px] font-medium text-slate-500 gap-1.5">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            {t('orders.breadcrumbHome')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900">{t('orders.breadcrumbCurrent')}</span>
        </div>
      </div>

      {/* Summary Cards */}
      <OrderStats t={t} statsData={stats} />
      
      {/* Filter Controls */}
      <OrderFilters 
        t={t} 
        searchTerm={searchTerm} 
        setSearchTerm={handleSearchChange} 
        timeFilter={timeFilter}
        setTimeFilter={handleTimeFilterChange}
        statusFilter={statusFilter}
        setStatusFilter={handleStatusFilterChange}
        onExport={handleExport} 
      />

      {/* Paginated Orders Table */}
      <OrdersDataTable 
        t={t} 
        orders={orders}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        onViewDetails={setSelectedOrder}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
