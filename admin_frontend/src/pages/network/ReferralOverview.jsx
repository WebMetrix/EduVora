import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DateRangePicker from '../../components/common/DateRangePicker';
import ReferralOverviewStats from '../../components/network/ReferralOverviewStats';
import ReferralGrowthChart from '../../components/network/ReferralGrowthChart';
import UserStatusDistributionCard from '../../components/network/UserStatusDistributionCard';
import ReferralLevelBarChart from '../../components/network/ReferralLevelBarChart';
import ReferralHealthCard from '../../components/network/ReferralHealthCard';
import ReferralQuickActionsCard from '../../components/network/ReferralQuickActionsCard';
import ReferralLevelTable from '../../components/network/ReferralLevelTable';

export default function ReferralOverview() {
  const [dateRange, setDateRange] = useState({
    preset: 'this_month',
    label: 'This Month',
    startDate: new Date(2026, 9, 1),
    endDate: new Date(2026, 9, 31),
  });

  return (
    <div className="flex flex-col gap-4 sm:gap-5 animate-fade-in relative pb-1 sm:pb-2">
      {/* Top Header Row matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
        {/* Left: Title & Subtitle */}
        <div>
          <h1 className="text-[20px] sm:text-[26px] lg:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
            Network & Referrals
          </h1>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            Get a complete view of the platform's referral structure and performance.
          </p>
        </div>

        {/* Right: Breadcrumbs & Date Filter */}
        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-[12.5px] font-medium text-slate-500 flex-wrap">
            <Link to="/dashboard" className="hover:text-indigo-600 transition-colors cursor-pointer">
              Dashboard
            </Link>
            <span className="text-slate-300">/</span>
            <span className="hover:text-indigo-600 transition-colors">Network & Referrals</span>
            <span className="text-slate-300">/</span>
            <span className="text-indigo-600 font-bold">Referral Overview</span>
          </nav>

          {/* Date Picker Button */}
          <DateRangePicker
            variant="header"
            value={dateRange}
            onChange={setDateRange}
            placeholder="01 Oct 2026 - 31 Oct 2026"
            clearable={false}
            initialMonth={new Date(2026, 9, 1)}
          />
        </div>
      </div>

      {/* Row 1: 4 Stat Counter Cards */}
      <ReferralOverviewStats />

      {/* Row 2: 2 Visual Analytics Charts (Referral Growth Trend + User Status Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-7 flex flex-col h-full">
          <ReferralGrowthChart />
        </div>
        <div className="lg:col-span-5 flex flex-col h-full">
          <UserStatusDistributionCard />
        </div>
      </div>

      {/* Row 3: 3 Grid Cards (Referral Level Distribution + Referral Health + Quick Actions) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        {/* Referral Level Distribution Bar Chart */}
        <div className="md:col-span-1 lg:col-span-4 flex flex-col h-full">
          <ReferralLevelBarChart />
        </div>

        {/* Referral Health Progress Card */}
        <div className="md:col-span-1 lg:col-span-4 flex flex-col h-full">
          <ReferralHealthCard />
        </div>

        {/* Quick Actions Card */}
        <div className="md:col-span-2 lg:col-span-4 flex flex-col h-full">
          <ReferralQuickActionsCard />
        </div>
      </div>

      {/* Row 4: Referral Overview by Level Table */}
      <ReferralLevelTable />
    </div>
  );
}
