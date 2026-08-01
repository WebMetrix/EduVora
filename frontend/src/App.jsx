import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Forgot from './pages/Forgot';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MyNetwork from './pages/MyNetwork';
import CompleteProfile from './pages/CompleteProfile';
import MyReferrals from './pages/MyReferrals';
import SuperAdmin from './pages/SuperAdmin';

import ProtectedRoute from './components/common/ProtectedRoute';
import GlobalLayout from './components/layout/GlobalLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<Forgot />} />
      
      {/* Protected Routes */}
      {/* <Route element={<ProtectedRoute />}> */}
        <Route element={<GlobalLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mynetwork" element={<MyNetwork />} />
          <Route path="/completeprofile" element={<CompleteProfile />} />
          <Route path="/myreferrals" element={<MyReferrals />} />
        </Route>
      {/* </Route> */}

      <Route path="/superadmin/*" element={
        <GlobalLayout isSuperAdmin={true}>
          <SuperAdmin />
        </GlobalLayout>
      } />
    </Routes>
  );
}

export default App;
