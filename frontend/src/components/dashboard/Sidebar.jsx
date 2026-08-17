import {
  Home, Network, Users, BookOpen, ShoppingBag,
  IndianRupee, Wallet, ArrowUpRight, FileText,
  Award, User, Settings, HelpCircle, Crown, X, ChevronDown, ShieldCheck, UserCog, Star, Zap, LogOut, BarChart2
} from 'lucide-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';
import { useTranslation } from '../../hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../../assets/images/Eduvora.png';
import BronzeIcon from '../../assets/icons/Bronze.svg';
import SilverIcon from '../../assets/icons/Silver.svg';
import GoldIcon from '../../assets/icons/Gold.svg';
import DiamondIcon from '../../assets/icons/Diamond.svg';

const menuItems = [
  { id: 'dashboard', icon: Home, labelKey: 'nav.dashboard', active: true },
  { id: 'network', icon: Network, labelKey: 'nav.network' },
  { id: 'referrals', icon: Users, labelKey: 'nav.referrals' },
  { id: 'courses', icon: BookOpen, labelKey: 'nav.courses' },
  { id: 'orders', icon: ShoppingBag, labelKey: 'nav.orders' },
  { id: 'earnings', icon: IndianRupee, labelKey: 'nav.earnings' },
  { id: 'reports', icon: FileText, labelKey: 'nav.reports' },
  { id: 'rank', icon: Award, labelKey: 'nav.rank' }
];

const sidebarVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 15,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 }
};

export default function Sidebar({ isOpen, setIsOpen, isSuperAdmin }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(true);
  const [mobileTab, setMobileTab] = useState('pages'); // 'pages' or 'user'
  const { profileData } = useSelector((state) => state.profile);

  // Logic to determine the next package
  const getNextPackageInfo = (currentPackage) => {
    const packageLevels = [
      { name: 'Bronze', icon: BronzeIcon },
      { name: 'Silver', icon: SilverIcon },
      { name: 'Gold', icon: GoldIcon },
      { name: 'Diamond', icon: DiamondIcon }
    ];

    if (!currentPackage) return packageLevels[0]; // Default to Bronze

    const currentIndex = packageLevels.findIndex(p => 
      currentPackage.toLowerCase().includes(p.name.toLowerCase())
    );

    if (currentIndex !== -1 && currentIndex < packageLevels.length - 1) {
      return packageLevels[currentIndex + 1];
    }
    
    if (currentIndex === packageLevels.length - 1) {
      return null; // Highest package reached
    }

    return packageLevels[0]; // Fallback
  };

  const nextPackageInfo = getNextPackageInfo(profileData?.ActivePackageName);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[240px] h-full flex flex-col bg-white/70 backdrop-blur-xl border-r border-slate-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo Area */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0">
              <img src={logoImg} alt="Eduvora Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-slate-900 text-[17px] font-bold tracking-tight leading-tight">{t('login.logoTitle')}</h2>
              <p className="text-slate-500 text-[10px] font-semibold tracking-widest uppercase mt-0.5">{t('login.logoSubtitle')}</p>
            </div>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 -mr-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 flex flex-col px-4 pt-3 overflow-y-auto custom-scrollbar">
          
          {/* Mobile Tabs */}
          <div className="lg:hidden flex p-1 mb-4 bg-slate-100/80 backdrop-blur-sm rounded-xl">
             <button onClick={() => setMobileTab('pages')} className={`flex-1 py-1.5 text-[13px] font-semibold rounded-lg transition-all ${mobileTab === 'pages' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Pages</button>
             <button onClick={() => setMobileTab('user')} className={`flex-1 py-1.5 text-[13px] font-semibold rounded-lg transition-all ${mobileTab === 'user' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>User</button>
          </div>

          <nav className="space-y-2">
            {/* Desktop always shows pages. Mobile shows pages only when tab is 'pages' */}
            <div className={`space-y-2 ${mobileTab === 'pages' ? 'block' : 'hidden lg:block'}`}>
              {menuItems.map((item) => {
              const Icon = item.icon;
              const routeMap = {
                dashboard: '/dashboard',
                network: '/mynetwork',
                referrals: '/myreferrals',
                courses: '/courses',
                orders: '/orders',
                earnings: '/earnings'
              };
              const isActive = routeMap[item.id] ? location.pathname === routeMap[item.id] : item.active;

              return (
                <a
                  key={item.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (routeMap[item.id]) {
                      navigate(routeMap[item.id]);
                    }
                    if (window.innerWidth < 1024 && typeof setIsOpen === 'function') setIsOpen(false);
                  }}
                  className={`group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${isActive
                    ? 'text-white bg-indigo-600 shadow-md shadow-indigo-600/20'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50'
                    }`}
                >
                  <Icon className={`w-[18px] h-[18px] transition-transform duration-300 ${!isActive ? 'group-hover:rotate-6' : ''}`} />
                  {t(`dashboard.${item.labelKey}`)}

                  {/* Subtle active glow */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl ring-2 ring-indigo-600/20 ring-offset-2 ring-offset-white animate-pulse" />
                  )}
                </a>
              );
            })}

            {isSuperAdmin && (
              <>

                {/* User Management Accordion */}
                <div>
                  <button
                    onClick={() => setIsUserManagementOpen(!isUserManagementOpen)}
                    className={`w-full group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${isUserManagementOpen || location.pathname.includes('/superadmin/users')
                      ? 'text-white bg-indigo-600 shadow-md shadow-indigo-600/20'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50'
                      }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <UserCog className="w-[18px] h-[18px] transition-transform duration-300 group-hover:rotate-6" />
                      {t('dashboard.superadmin.userManagement')}
                    </div>
                    <motion.div animate={{ rotate: isUserManagementOpen ? 180 : 0 }}>
                      <ChevronDown className={`w-4 h-4 transition-colors ${isUserManagementOpen || location.pathname.includes('/superadmin/users') ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}`} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isUserManagementOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-1 pl-[42px] pr-2 pt-2 pb-1">
                          <a
                            href="#"
                            className="px-3 py-2 text-[13px] font-medium text-slate-500 rounded-lg hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors"
                          >
                            {t('dashboard.superadmin.allUsers')}
                          </a>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate('/superadmin/users/create');
                              if (window.innerWidth < 1024) setIsOpen(false);
                            }}
                            className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${location.pathname.includes('/superadmin/users/create')
                              ? 'text-white bg-indigo-600 shadow-md shadow-indigo-600/20'
                              : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50'
                              }`}
                          >
                            {t('dashboard.superadmin.createUser')}
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
            </div>

            {/* Mobile-only User Links (Profile, Settings, Logout) */}
            <div className={`space-y-2 lg:hidden ${mobileTab === 'user' ? 'block' : 'hidden'}`}>
              {[
                { id: 'profile', icon: User, label: t('dashboard.nav.myProfile'), route: '/profile' },
                { id: 'settings', icon: Settings, label: t('dashboard.nav.settings'), route: '#' },
                { id: 'wallet', icon: Wallet, label: t('dashboard.nav.wallet'), route: '#' },
                { id: 'payouts', icon: BarChart2, label: t('dashboard.nav.payouts'), route: '#' },
                { id: 'help', icon: HelpCircle, label: t('dashboard.nav.helpSupport'), route: '#' }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.route;
                return (
                  <a
                    key={item.id}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.route !== '#') navigate(item.route);
                      setIsOpen(false);
                    }}
                    className={`group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${isActive
                      ? 'text-white bg-indigo-600 shadow-md shadow-indigo-600/20'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50'
                      }`}
                  >
                    <Icon className={`w-[18px] h-[18px] transition-transform duration-300 ${!isActive ? 'group-hover:rotate-6' : ''}`} />
                    {item.label}
                  </a>
                );
              })}

              <div className="h-px bg-slate-200/60 my-2 mx-2" />
              
              <a
                href="#"
                onClick={async (e) => {
                  e.preventDefault();
                  await dispatch(logoutUser());
                  navigate('/login');
                  setIsOpen(false);
                }}
                className="group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm text-red-500 hover:text-red-600 hover:bg-red-50/50"
              >
                <LogOut className="w-[18px] h-[18px] transition-transform duration-300 group-hover:rotate-6" />
                {t('dashboard.nav.logout')}
              </a>
            </div>
          </nav>
        </div>

        <div className="p-2 mb-1 shrink-0">
          {isSuperAdmin ? (
            <div className="relative overflow-hidden rounded-2xl bg-indigo-50/50 border border-indigo-100 p-4 shadow-sm group">
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#4f3bf3] flex items-center justify-center mb-3 shadow-md shadow-indigo-500/30">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-[#1a1446] text-[15px] font-extrabold mb-2">{t('dashboard.superadmin.title')}</h4>
                <p className="text-slate-500 text-[12px] leading-relaxed font-medium">{t('dashboard.superadmin.accessDesc')}</p>
              </div>
            </div>
          ) : nextPackageInfo ? (
            <div
              className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-50 to-indigo-50/30 border border-slate-200/60 p-3 shadow-sm hover:shadow-md hover:-translate-y-1 group cursor-pointer transition-all duration-300"
            >
              {/* Background animated blob */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl group-hover:bg-indigo-400/20 transition-colors duration-500" />

              <div className="relative z-10">
                <div className="mb-3 group-hover:scale-110 transition-transform duration-300 origin-left">
                  <img src={nextPackageInfo.icon} alt={nextPackageInfo.name} className="w-10 h-10 object-contain drop-shadow-md" />
                </div>
                <h4 className="text-slate-900 text-[14px] font-bold mb-0.5">Go {nextPackageInfo.name}</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed mb-3">{t('dashboard.upgrade.desc')}</p>

                <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-bold rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95">
                  {t('dashboard.upgrade.button')}
                </button>
              </div>
            </div>
          ) : null}
        </div>

      </aside>
    </>
  );
}
