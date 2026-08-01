import { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown, Bell, User, Settings, Wallet, BarChart2, HelpCircle, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import api from '../../https/axios';
import logoImg from '../../assets/images/Eduvora.png';

export default function Header({ toggleSidebar, isSuperAdmin }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  
  const { data: profileData } = useSelector((state) => state.profile || {});

  const rawName = profileData?.FullName || user?.name || user?.fullName || t('dashboard.mock.userName');
  const firstName = rawName.split(' ')[0];
  const nameParts = rawName.split(' ');
  const initials = nameParts
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  // --- AVATAR URL LOGIC START ---
  const defaultUiAvatarUrl = import.meta.env.VITE_FALLBACK_PROF_PICTURE;
  const baseFallbackUrl = import.meta.env.VITE_FALLBACK_PROF_PICTURE || defaultUiAvatarUrl;
  const fallbackAvatar = `${baseFallbackUrl}${encodeURIComponent(rawName)}&background=random`;

  let avatarUrl = fallbackAvatar;
  
  if (profileData?.ProfilePicturePath) {
    const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
    const normalizedPath = profileData.ProfilePicturePath.replace(/\\/g, '/');
    const folderStartIndex = normalizedPath.indexOf('UserData'); 
    
    if (folderStartIndex !== -1) {
      const relativePath = normalizedPath.substring(folderStartIndex);
      avatarUrl = `${baseUrl}/${relativePath}`;
    } else {
      avatarUrl = `${baseUrl}/${normalizedPath.replace(/^\/+/, '')}`;
    }
  }
  // --- AVATAR URL LOGIC END ---

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
    { id: 'profile', icon: User, label: t('dashboard.nav.myProfile') },
    { id: 'settings', icon: Settings, label: t('dashboard.nav.settings') },
    { id: 'wallet', icon: Wallet, label: t('dashboard.nav.wallet') },
    { id: 'payouts', icon: BarChart2, label: t('dashboard.nav.payouts') },
    { id: 'help', icon: HelpCircle, label: t('dashboard.nav.helpSupport') }
  ];

  // Handle user logout action
  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(result)) {
        navigate('/login'); // Redirect to login page after logout
      }
    } catch (error) {
      toast.error(t('toast.auth.logoutFailed'));
    }
  };

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8 h-14 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 shadow-sm"
    >
      <div className="flex items-center">
        {/* Hamburger - only visible on mobile/tablet */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Mobile Logo & Name */}
        <div className="flex lg:hidden items-center gap-2 ml-1">
          <img src={logoImg} alt="Eduvora Logo" className="w-8 h-8 object-contain shrink-0" />
          <div className="flex flex-col pt-1">
            <span className="text-[15px] font-extrabold text-indigo-900 leading-none tracking-tight">{t('login.logoTitle')}</span>
            <span className="text-[8px] font-bold text-slate-500 tracking-wider">
              {t('login.logoSubtitle').toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">

        {/* Notification Bell */}
        <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 group">
          <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 lg:gap-3 focus:outline-none group hover:bg-slate-100/50 p-1.5 lg:p-2 rounded-2xl transition-all"
          >
            {/* Avatar */}
            <div className="relative shrink-0 flex">
              {isSuperAdmin ? (
                <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-[#f3edff] flex items-center justify-center text-[#4f3bf3] font-bold text-[13px] shadow-sm">
                  SA
                </div>
              ) : (
                <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  <img 
                    src={avatarUrl} 
                    alt={rawName} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallbackAvatar;
                    }}
                  />
                </div>
              )}
            </div>

            {/* User Name & Rank */}
            <div className="hidden lg:flex flex-col text-left">
              {isSuperAdmin ? (
                <>
                  <h4 className="text-[13px] font-extrabold text-[#1a1446] leading-tight group-hover:text-indigo-700 transition-colors">{t('dashboard.superadmin.title')}</h4>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5 tracking-wide">{t('dashboard.superadmin.title')}</p>
                </>
              ) : (
                <>
                  <h4 className="text-[13px] font-extrabold text-slate-900 leading-tight group-hover:text-indigo-700 transition-colors">{firstName}</h4>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5 tracking-wide">{t('dashboard.mock.userRank')}</p>
                </>
              )}
            </div>

            <motion.div
              animate={{ rotate: isProfileOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors lg:ml-1" />
            </motion.div>
          </motion.button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-[160px] lg:w-[170px] bg-white rounded-xl shadow-[0_10px_40px_rgb(0,0,0,0.12)] border border-slate-100 overflow-hidden z-100 origin-top-right"
              >
                <div className="py-1.5 flex flex-col">
                  {dropdownItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (item.id === 'profile') {
                          navigate('/profile');
                        }
                        setIsProfileOpen(false);
                      }}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors w-full text-left group/item"
                    >
                      <item.icon className="w-[15px] h-[15px] text-slate-500 group-hover/item:text-indigo-600 transition-colors" />
                      <span className="text-[12px] font-semibold text-slate-700 group-hover/item:text-indigo-600 transition-colors">{item.label}</span>
                    </button>
                  ))}

                  <div className="h-px bg-slate-100 my-1 mx-3" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-red-50 transition-colors w-full text-left group/logout"
                  >
                    <LogOut className="w-[15px] h-[15px] text-red-500 group-hover/logout:text-red-600 transition-colors" />
                    <span className="text-[12px] font-semibold text-red-500 group-hover/logout:text-red-600 transition-colors">{t('dashboard.nav.logout')}</span>
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
