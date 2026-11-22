import React, { useState } from 'react';
import {
  Calendar, ChevronDown, User, Users, ShoppingCart, IndianRupee,
  ShieldCheck, Wallet, Boxes
} from 'lucide-react';
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
        <button className="flex items-center justify-between sm:justify-start gap-2 bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 text-[12px] sm:text-[12.5px] font-bold text-slate-700 shadow-2xs hover:border-indigo-200 hover:text-indigo-600 transition-all cursor-pointer w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>01 Aug 2026 - 31 Aug 2026</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-4">
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
