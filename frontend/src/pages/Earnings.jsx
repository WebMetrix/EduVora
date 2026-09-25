import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchEarnings } from '../redux/slices/earningsSlice';
import { fetchKycDetails } from '../redux/slices/kycSlice';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronRight, LayoutDashboard, History, Wallet } from 'lucide-react';
import EarningsStats from '../components/earnings/EarningsStats';
import EarningsCharts from '../components/earnings/EarningsCharts';
import RecentCommission from '../components/earnings/RecentCommission';
import WalletSummary from '../components/earnings/WalletSummary';
import CommissionHistoryStats from '../components/earnings/CommissionHistoryStats';
import CommissionHistoryFilters from '../components/earnings/CommissionHistoryFilters';
import CommissionHistoryTable from '../components/earnings/CommissionHistoryTable';
import WalletStats from '../components/earnings/WalletStats';
import WalletTransactions from '../components/earnings/WalletTransactions';
import WalletDetailsSidebar from '../components/earnings/WalletDetailsSidebar';

export default function Earnings() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { data: earningsData, loading } = useSelector((state) => state.earnings);
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'summary');

  useEffect(() => {
    // If the location state changes, update the tab
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  useEffect(() => {
    dispatch(fetchEarnings());
    dispatch(fetchKycDetails());
  }, [dispatch]);

  const tabs = [
    { id: 'summary', label: t('earnings.tabs.summary'), icon: LayoutDashboard },
    { id: 'history', label: t('earnings.tabs.history'), icon: History },
    { id: 'wallet', label: t('earnings.tabs.wallet'), icon: Wallet }
  ];

  return (
    <div className="w-full flex flex-col gap-6 max-w-[1400px] mx-auto pb-6">
      {/* Header Section */}
      <div className="flex flex-col">
        <h1 className="text-[24px] lg:text-[28px] font-bold text-slate-900 mb-1">
          {t('earnings.title')}
        </h1>
        <div className="hidden md:flex items-center text-[13px] font-medium text-slate-500 gap-1.5 mt-1">
          <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">{t('earnings.breadcrumb1')}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900">{t('earnings.breadcrumb2')}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl flex items-center p-1.5 w-fit max-w-full overflow-x-auto custom-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-[13px] font-bold transition-all whitespace-nowrap outline-none ${isActive
                  ? 'bg-indigo-50/50 text-indigo-600 shadow-sm border border-indigo-100/50'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-transparent'
                }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'summary' && (
        <div className="flex flex-col gap-6">
          <EarningsStats t={t} loading={loading} summary={earningsData?.summary} periodStats={earningsData?.periodStats} />
          <EarningsCharts t={t} loading={loading} chartData={earningsData?.chartData} levelStats={earningsData?.levelStats} />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <RecentCommission t={t} showPagination={true} loading={loading} commissions={earningsData?.commissions} />
            </div>
            <div className="xl:col-span-1">
              <WalletSummary t={t} loading={loading} summary={earningsData?.summary} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="flex flex-col">
          <CommissionHistoryStats t={t} loading={loading} summary={earningsData?.summary} periodStats={earningsData?.periodStats} commissions={earningsData?.commissions} />
          <CommissionHistoryTable t={t} loading={loading} commissions={earningsData?.commissions} />
        </div>
      )}

      {activeTab === 'wallet' && (
        <div className="flex flex-col gap-6">
          <WalletStats t={t} loading={loading} summary={earningsData?.summary} transactions={earningsData?.transactions} />
          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
            <WalletTransactions t={t} loading={loading} transactions={earningsData?.transactions} />
            <WalletDetailsSidebar t={t} loading={loading} summary={earningsData?.summary} />
          </div>
        </div>
      )}
    </div>
  );
}
