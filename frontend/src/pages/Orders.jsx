import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import OrderStats from '../components/orders/OrderStats';
import OrderFilters from '../components/orders/OrderFilters';
import OrdersDataTable from '../components/orders/OrdersDataTable';
import { exportToExcel } from '../utils/excelExport';

export default function Orders() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    {
      id: "ORD123456789",
      name: "Digital Marketing Mastery",
      level: t('orders.levels.beginner'),
      levelColor: "bg-purple-100 text-purple-600",
      amount: "₹4,999",
      paymentMethod: "UPI",
      date: "18 May 2025",
      time: "10:30 AM",
      status: "completed",
      iconBg: "bg-indigo-900"
    },
    {
      id: "ORD123456788",
      name: "Social Media Marketing Secrets",
      level: t('orders.levels.intermediate'),
      levelColor: "bg-indigo-100 text-indigo-600",
      amount: "₹3,499",
      paymentMethod: "Card",
      date: "10 May 2025",
      time: "07:45 PM",
      status: "completed",
      iconBg: "bg-emerald-700"
    },
    {
      id: "ORD123456787",
      name: "Affiliate Marketing Pro",
      level: t('orders.levels.advanced'),
      levelColor: "bg-blue-100 text-blue-600",
      amount: "₹5,999",
      paymentMethod: "Net Banking",
      date: "05 May 2025",
      time: "02:15 PM",
      status: "completed",
      iconBg: "bg-slate-900"
    },
    {
      id: "ORD123456786",
      name: "Content Creation Mastery",
      level: t('orders.levels.beginner'),
      levelColor: "bg-purple-100 text-purple-600",
      amount: "₹2,999",
      paymentMethod: "UPI",
      date: "02 May 2025",
      time: "11:20 AM",
      status: "pending",
      iconBg: "bg-purple-600"
    },
    {
      id: "ORD123456785",
      name: "Email Marketing Excellence",
      level: t('orders.levels.intermediate'),
      levelColor: "bg-indigo-100 text-indigo-600",
      amount: "₹2,499",
      paymentMethod: "Card",
      date: "28 Apr 2025",
      time: "06:10 PM",
      status: "failed",
      iconBg: "bg-emerald-600"
    },
    {
      id: "ORD123456784",
      name: "YouTube Growth Blueprint",
      level: t('orders.levels.advanced'),
      levelColor: "bg-blue-100 text-blue-600",
      amount: "₹3,999",
      paymentMethod: "Net Banking",
      date: "20 Apr 2025",
      time: "09:35 AM",
      status: "completed",
      iconBg: "bg-blue-600"
    }
  ];

  const handleExport = () => {
    const columns = [
      { header: 'Order ID', key: 'id', width: 20 },
      { header: 'Package Name', key: 'name', width: 30 },
      { header: 'Level', key: 'level', width: 15 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Payment Method', key: 'paymentMethod', width: 20 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Time', key: 'time', width: 15 },
      { header: 'Status', key: 'status', width: 15, format: item => item.status.charAt(0).toUpperCase() + item.status.slice(1) }
    ];

    exportToExcel({
      data: orders,
      fileName: 'Orders_Report',
      columns,
      sheetName: 'Orders'
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-[1400px] mx-auto pb-6">
      {/* Header */}
      <div>
        <h1 className="text-[24px] lg:text-[28px] font-bold text-slate-900 mb-2">
          {t('orders.title')}
        </h1>
        <div className="hidden md:flex items-center text-[13px] font-medium text-slate-500 gap-1.5">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900">My Orders</span>
        </div>
      </div>

      <OrderStats t={t} />
      
      <OrderFilters t={t} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onExport={handleExport} />

      <OrdersDataTable t={t} orders={orders} />
    </div>
  );
}
