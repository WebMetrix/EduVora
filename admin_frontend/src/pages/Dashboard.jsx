import React, { useState, useEffect } from 'react';
import {
  User, Users, ShoppingCart, IndianRupee,
  ShieldCheck, Wallet, Boxes
} from 'lucide-react';
import DateRangePicker from '../components/common/DateRangePicker';
import StatCard from '../components/dashboard/StatCard';
import RegistrationTrendChart from '../components/dashboard/RegistrationTrendChart';
import RevenueOverviewChart from '../components/dashboard/RevenueOverviewChart';
import StatusDonutCard from '../components/dashboard/StatusDonutCard';
import RecentUsersTable from '../components/dashboard/RecentUsersTable';
import RecentOrdersTable from '../components/dashboard/RecentOrdersTable';
import KycStatusModal from '../components/dashboard/KycStatusModal';
import OrderStatusModal from '../components/dashboard/OrderStatusModal';
import PayoutRequestsModal from '../components/dashboard/PayoutRequestsModal';
import RecentOrdersModal from '../components/dashboard/RecentOrdersModal';
import RecentUsersModal from '../components/dashboard/RecentUsersModal';

export default function Dashboard() {
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const [isOrderStatusModalOpen, setIsOrderStatusModalOpen] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [isRecentOrdersModalOpen, setIsRecentOrdersModalOpen] = useState(false);
  const [isRecentUsersModalOpen, setIsRecentUsersModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    preset: 'aug_2026',
    label: 'Aug 2026',
    startDate: new Date(2026, 7, 1),
    endDate: new Date(2026, 7, 31),
  });

  // Listen to sidebar custom events to trigger view modals
  useEffect(() => {
    const handleOpenUsers = () => setIsRecentUsersModalOpen(true);
    const handleOpenKyc = () => setIsKycModalOpen(true);

    window.addEventListener('open-recent-users-modal', handleOpenUsers);
    window.addEventListener('open-kyc-modal', handleOpenKyc);

    return () => {
      window.removeEventListener('open-recent-users-modal', handleOpenUsers);
      window.removeEventListener('open-kyc-modal', handleOpenKyc);
    };
  }, []);
  return (
    <div className="flex flex-col gap-3.5 sm:gap-4 lg:gap-5 animate-fade-in">
      {/* Top Header Row: Title & Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] sm:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
            Dashboard
          </h1>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            Welcome back, Admin! Here's an overview of your platform performance and key activity.
          </p>
        </div>

        {/* Date Filter Button */}
        <DateRangePicker
          variant="header"
          value={dateRange}
          onChange={setDateRange}
          placeholder="01 Aug 2026 - 31 Aug 2026"
          clearable={false}
          initialMonth={new Date(2026, 7, 1)}
        />
      </div>

      {/* Row 1: Four Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Total Users"
          value="1,248"
          trend="12%"
          trendPositive={true}
          subtitle="+132 this month"
          icon={User}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
          flareColor="bg-indigo-400/10"
        />
        <StatCard
          title="Active Users"
          value="980"
          trend="8%"
          trendPositive={true}
          subtitle="78.5% of total"
          icon={Users}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          flareColor="bg-emerald-400/10"
        />
        <StatCard
          title="Total Orders"
          value="642"
          trend="15%"
          trendPositive={true}
          subtitle="+84 this month"
          icon={ShoppingCart}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          flareColor="bg-orange-400/10"
        />
        <StatCard
          title="Total Revenue"
          value="₹ 6,42,850"
          trend="18%"
          trendPositive={true}
          subtitle="+₹ 98,200 this month"
          icon={IndianRupee}
          iconBg="bg-rose-50"
          iconColor="text-rose-600"
          flareColor="bg-rose-400/10"
        />
      </div>

      {/* Row 2: Two Big Analytics Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
        <RegistrationTrendChart />
        <RevenueOverviewChart />
      </div>

      {/* Row 3: Three Donut Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
        {/* KYC Status */}
        <StatusDonutCard
          title="KYC Status"
          icon={ShieldCheck}
          total="248"
          onViewAll={() => setIsKycModalOpen(true)}
          items={[
            { label: 'Approved', count: 186, percentage: 75, color: '#10b981' },
            { label: 'Under Review', count: 32, percentage: 13, color: '#f59e0b' },
            { label: 'Rejected', count: 18, percentage: 7, color: '#ef4444' },
            { label: 'Pending', count: 12, percentage: 5, color: '#94a3b8' }
          ]}
        />

        {/* Payout Requests */}
        <StatusDonutCard
          title="Payout Requests"
          icon={Wallet}
          total="42"
          onViewAll={() => setIsPayoutModalOpen(true)}
          items={[
            { label: 'Paid', count: 28, percentage: 67, color: '#10b981' },
            { label: 'Pending', count: 8, percentage: 19, color: '#f59e0b' },
            { label: 'Rejected', count: 6, percentage: 14, color: '#ef4444' }
          ]}
        />

        {/* Order Status */}
        <StatusDonutCard
          title="Order Status"
          icon={Boxes}
          total="642"
          onViewAll={() => setIsOrderStatusModalOpen(true)}
          items={[
            { label: 'Completed', count: 512, percentage: 80, color: '#10b981' },
            { label: 'Pending', count: 86, percentage: 13, color: '#f59e0b' },
            { label: 'Failed', count: 44, percentage: 7, color: '#ef4444' }
          ]}
        />
      </div>

      {/* Row 4: Two Recent Activity Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5 items-stretch">
        <RecentUsersTable onViewAll={() => setIsRecentUsersModalOpen(true)} />
        <RecentOrdersTable onViewAll={() => setIsRecentOrdersModalOpen(true)} />
      </div>

      {/* Modals Window Boxes */}
      <KycStatusModal
        isOpen={isKycModalOpen}
        onClose={() => setIsKycModalOpen(false)}
      />

      <OrderStatusModal
        isOpen={isOrderStatusModalOpen}
        onClose={() => setIsOrderStatusModalOpen(false)}
      />

      <PayoutRequestsModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
      />

      <RecentOrdersModal
        isOpen={isRecentOrdersModalOpen}
        onClose={() => setIsRecentOrdersModalOpen(false)}
      />

      <RecentUsersModal
        isOpen={isRecentUsersModalOpen}
        onClose={() => setIsRecentUsersModalOpen(false)}
      />
    </div>
  );
}
