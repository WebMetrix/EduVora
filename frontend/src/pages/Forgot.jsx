import ForgotLeft from '../components/auth/shared/ForgotLeft';
import ForgotRight from '../components/auth/forgot/ForgotRight';

export default function Forgot() {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      <ForgotLeft />
      <ForgotRight />
    </div>
  );
}
