import { Routes, Route, Navigate } from 'react-router-dom';
import GlobalLayout from './components/layout/GlobalLayout';
import Dashboard from './pages/Dashboard';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import ViewUsers from './pages/ViewUsers';
import KycVerification from './pages/KycVerification';
import ReferralOverview from './pages/network/ReferralOverview';
import GenealogyTree from './pages/network/GenealogyTree';
import ReferralDetails from './pages/network/ReferralDetails';
import ReferralAnalytics from './pages/network/ReferralAnalytics';
import ReferralExceptions from './pages/network/ReferralExceptions';
import ReferralAuditHistory from './pages/network/ReferralAuditHistory';
import OrderManagement from './pages/orders/OrderManagement';

export default function App() {
  return (
    <GlobalLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* User Management */}
        <Route path="/users" element={<ViewUsers />} />
        <Route path="/users/view" element={<ViewUsers />} />
        <Route path="/user-management/view-users" element={<ViewUsers />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/user-management/add-user" element={<AddUser />} />
        <Route path="/users/edit" element={<EditUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/user-management/edit-user" element={<EditUser />} />
        <Route path="/users/kyc" element={<KycVerification />} />
        <Route path="/users/kyc-verification" element={<KycVerification />} />
        <Route path="/user-management/kyc-verification" element={<KycVerification />} />

        {/* Network & Referrals */}
        <Route path="/network" element={<Navigate to="/network/referral-overview" replace />} />
        <Route path="/network/referral-overview" element={<ReferralOverview />} />
        <Route path="/network/genealogy-tree" element={<GenealogyTree />} />
        <Route path="/network/genealogy" element={<GenealogyTree />} />
        <Route path="/network/referral-details" element={<ReferralDetails />} />
        <Route path="/network/referral-analytics" element={<ReferralAnalytics />} />
        <Route path="/network/referral-exceptions" element={<ReferralExceptions />} />
        <Route path="/network/referral-audit-history" element={<ReferralAuditHistory />} />

        {/* Aliases for referrals */}
        <Route path="/referrals" element={<Navigate to="/network/referral-overview" replace />} />
        <Route path="/referrals/overview" element={<ReferralOverview />} />
        <Route path="/referrals/tree" element={<GenealogyTree />} />
        <Route path="/referrals/details" element={<ReferralDetails />} />
        <Route path="/referrals/analytics" element={<ReferralAnalytics />} />

        {/* Orders & Invoices */}
        <Route path="/orders" element={<OrderManagement defaultTab="orders" />} />
        <Route path="/orders/all" element={<OrderManagement defaultTab="orders" />} />
        <Route path="/orders/invoices" element={<OrderManagement defaultTab="invoices" />} />
        <Route path="/orders/refunds" element={<OrderManagement defaultTab="refunds" />} />
        <Route path="/orders/history" element={<OrderManagement defaultTab="history" />} />
        <Route path="/orders/exceptions" element={<OrderManagement defaultTab="exceptions" />} />

        {/* Wildcard redirect back to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </GlobalLayout>
  );
}
