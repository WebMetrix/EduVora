import { useTranslation } from '../../hooks/useTranslation';
import { Home, BookOpen, Users, Wallet, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', route: '/dashboard', icon: Home, label: t('dashboard.nav.dashboard'), active: true },
    { id: 'courses', route: '/courses', icon: BookOpen, label: t('dashboard.nav.courses') },
    { id: 'network', route: '/mynetwork', icon: Users, label: t('dashboard.nav.network') },
    { id: 'wallet', route: '/wallet', icon: Wallet, label: t('dashboard.nav.wallet') },
    { id: 'profile', route: '/profile', icon: User, label: t('dashboard.nav.profile') }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[65px] bg-white border-t border-slate-100 flex items-center justify-center px-1 pb-safe lg:hidden z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
      <div className="w-full max-w-md h-full flex items-center justify-between px-2">
        {navItems.map((item) => {
          const isActive = location.pathname.includes(item.route) || (location.pathname === '/' && item.id === 'dashboard');
          
          return (
          <button 
            key={item.id}
            onClick={() => navigate(item.route)}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <item.icon className={`w-[22px] h-[22px] ${isActive ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} />
            <span className="text-[10px] font-medium whitespace-nowrap tracking-wide">
              {item.label}
            </span>
          </button>
        )})}
      </div>
    </div>
  );
}
