import { Routes, Route, Navigate } from 'react-router-dom';
import GlobalLayout from './components/layout/GlobalLayout';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <GlobalLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Wildcard redirect back to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </GlobalLayout>
  );
}
