import { useTranslation } from '../../hooks/useTranslation';
import { Home, BookOpen, Users, Wallet, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', icon: Home, label: t('dashboard.nav.dashboard'), active: true },
    { id: 'courses', icon: BookOpen, label: t('dashboard.nav.courses') },
    { id: 'network', icon: Users, label: t('dashboard.nav.network') },
    { id: 'wallet', icon: Wallet, label: t('dashboard.nav.wallet') },
    { id: 'profile', icon: User, label: t('dashboard.nav.profile') }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-slate-200/60 pb-safe">
      <div className="flex items-center justify-around h-[70px] px-2 relative">
        {navItems.map((item) => {
          const isActive = location.pathname.includes(item.id) || (location.pathname === '/' && item.id === 'dashboard');
          
          return (
          <button 
            key={item.id}
            onClick={() => navigate(`/${item.id}`)}
            className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <item.icon className={`w-[22px] h-[22px] ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>
              {item.label}
            </span>
            
            {/* Active Indicator Line */}
            {isActive && (
              <motion.div 
                layoutId="bottomNavIndicator"
                className="absolute bottom-0 w-12 h-[3px] bg-indigo-600 rounded-t-full"
              />
            )}
          </button>
        )})}
      </div>
    </div>
  );
}
