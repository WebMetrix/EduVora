import { Routes, Route } from 'react-router-dom';
import CreateUserForm from '../components/superadmin/CreateUserForm';

export default function SuperAdmin() {
  return (
    <>
      <Routes>
        <Route path="users/create" element={<CreateUserForm />} />
        <Route path="*" element={<div className="text-center mt-20 text-slate-500 font-medium">Select an option from the sidebar.</div>} />
      </Routes>
    </>
  );
}
