import React from 'react';
import { Home, Users, Boxes, FileText, Menu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomNav({ onOpenMenu }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', route: '/dashboard', icon: Home, label: 'Dashboard' },
    { id: 'users', route: '/dashboard#users', icon: Users, label: 'Users' },
    { id: 'products', route: '/dashboard#packages', icon: Boxes, label: 'Products' },
    { id: 'orders', route: '/dashboard#orders', icon: FileText, label: 'Orders' },
    { id: 'menu', isAction: true, icon: Menu, label: 'Menu' }
  ];

  const handleNavClick = (item) => {
    if (item.isAction) {
      if (typeof onOpenMenu === 'function') {
        onOpenMenu();
      }
    } else {
      navigate(item.route);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[64px] bg-white/95 backdrop-blur-xl border-t border-slate-200/80 flex items-center justify-center px-2 pb-safe lg:hidden z-40 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
      <div className="w-full max-w-md h-full flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = item.id === 'dashboard'
            ? (location.pathname === '/dashboard' || location.pathname === '/')
            : location.pathname.includes(item.id);

          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all active:scale-95 cursor-pointer ${
                isActive && !item.isAction
                  ? 'text-indigo-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${isActive && !item.isAction ? 'bg-indigo-50 text-indigo-600' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive && !item.isAction ? 'stroke-[2.2px]' : 'stroke-[1.8px]'}`} />
              </div>
              <span className="text-[10px] tracking-wide leading-none truncate max-w-[60px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
