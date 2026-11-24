import { Routes, Route, Navigate } from 'react-router-dom';
import GlobalLayout from './components/layout/GlobalLayout';
import Dashboard from './pages/Dashboard';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import ViewUsers from './pages/ViewUsers';
import KycVerification from './pages/KycVerification';

export default function App() {
  return (
    <GlobalLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
        {/* Wildcard redirect back to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </GlobalLayout>
  );
}
