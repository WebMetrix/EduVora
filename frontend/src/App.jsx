import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Forgot from './pages/Forgot';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import CompleteProfile from './pages/CompleteProfile';
import SuperAdmin from './pages/SuperAdmin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<Forgot />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/completeprofile" element={<CompleteProfile />} />
      <Route path="/superadmin/*" element={<SuperAdmin />} />
    </Routes>
  );
}

export default App;
