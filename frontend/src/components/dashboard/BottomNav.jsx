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
    <div className="fixed bottom-0 left-0 right-0 h-17.5 bg-white border-t border-slate-200 flex items-center justify-around px-2 pb-safe lg:hidden z-50">
      <div className="flex items-center justify-around h-17.5 px-2 relative">
        {navItems.map((item) => {
          const isActive = location.pathname.includes(item.route) || (location.pathname === '/' && item.id === 'dashboard');
          
          return (
          <button 
            key={item.id}
            onClick={() => navigate(item.route)}
            className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <item.icon className={`w-5.5 h-5.5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>
              {item.label}
            </span>
            
            {/* Active Indicator Line */}
            {isActive && (
              <motion.div 
                layoutId="bottomNavIndicator"
                className="absolute -bottom-5.5 left-1/2 -translate-x-1/2 w-1 h-0.75 rounded-t-full bg-indigo-600 shadow-[0_-2px_8px_rgba(79,70,229,0.5)]"
              />
            )}
          </button>
        )})}
      </div>
    </div>
  );
}
