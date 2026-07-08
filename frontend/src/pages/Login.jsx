import LoginLeft from '../components/auth/shared/LoginLeft';
import LoginRight from '../components/auth/login/LoginRight';

export default function Login() {
  return (
    <div className="h-screen w-full flex overflow-hidden relative bg-white">
      {/* Main Container */}
      <div className="w-full h-full flex z-10 animate-slide-up">
        <LoginLeft />
        <LoginRight />
      </div>
    </div>
  );
}
