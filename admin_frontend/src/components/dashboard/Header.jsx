import { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown, User, Settings, HelpCircle, LogOut, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/images/Eduvora.png';

export default function Header({ toggleSidebar }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownItems = [
    { id: 1, icon: User, label: 'Admin Profile' },
    { id: 2, icon: Settings, label: 'Platform Settings' },
    { id: 3, icon: Shield, label: 'Security & Audit' },
    { id: 4, icon: HelpCircle, label: 'Help & Docs' },
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 shadow-xs">
      <div className="flex items-center gap-3">
        {/* Hamburger - visible on mobile/tablet */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-100/80 transition-colors focus:outline-none cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Logo & Name */}
        <div className="flex lg:hidden items-center gap-2">
          <img src={logoImg} alt="Eduvora Logo" className="w-7 h-7 object-contain shrink-0" />
          <div className="flex flex-col">
            <span className="text-[14px] font-extrabold text-indigo-900 leading-none tracking-tight">EduVora</span>
            <span className="text-[8px] font-bold text-slate-500 tracking-wider">ADMIN</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
        {/* Admin Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 lg:gap-3 focus:outline-none group hover:bg-slate-100/60 p-1.5 rounded-2xl transition-all cursor-pointer"
          >
            {/* Avatar */}
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-slate-900 text-white overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center font-bold text-[12px] shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Admin User"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=Admin+User&background=4f46e5&color=fff";
                }}
              />
            </div>

            {/* User Name & Role */}
            <div className="hidden sm:flex flex-col text-left">
              <h4 className="text-[13px] font-extrabold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                Admin User
              </h4>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5 tracking-wide">
                Super Admin
              </p>
            </div>

            <motion.div
              animate={{ rotate: isProfileOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:block"
            >
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </motion.div>
          </motion.button>

          {/* Profile Dropdown Menu */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.12)] border border-slate-100 overflow-hidden z-50 origin-top-right p-1.5"
              >
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-[12.5px] font-bold text-slate-900">Admin User</p>
                  <p className="text-[11px] text-indigo-600 font-semibold">admin@eduvora.com</p>
                </div>

                <div className="flex flex-col gap-0.5">
                  {dropdownItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 rounded-xl transition-colors w-full text-left group cursor-pointer"
                    >
                      <item.icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      <span className="text-[12px] font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
                        {item.label}
                      </span>
                    </button>
                  ))}

                  <div className="h-px bg-slate-100 my-1" />

                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 hover:bg-rose-50 rounded-xl transition-colors w-full text-left group cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500 group-hover:text-rose-600 transition-colors" />
                    <span className="text-[12px] font-semibold text-rose-600">
                      Sign Out
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
