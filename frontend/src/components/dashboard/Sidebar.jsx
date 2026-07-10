import { 
  Home, Network, Users, BookOpen, ShoppingBag, 
  DollarSign, Wallet, ArrowUpRight, FileText, 
  Award, User, Settings, HelpCircle, Crown, X
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { id: 'dashboard', icon: Home, labelKey: 'nav.dashboard', active: true },
  { id: 'network', icon: Network, labelKey: 'nav.network' },
  { id: 'referrals', icon: Users, labelKey: 'nav.referrals' },
  { id: 'courses', icon: BookOpen, labelKey: 'nav.courses' },
  { id: 'orders', icon: ShoppingBag, labelKey: 'nav.orders' },
  { id: 'earnings', icon: DollarSign, labelKey: 'nav.earnings' },
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

export default function Sidebar({ isOpen, setIsOpen }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

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
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] h-full flex flex-col bg-white/70 backdrop-blur-xl border-r border-slate-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo Area */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/30">
              <span className="text-white text-[10px] font-bold">Logo</span>
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
        <div className="flex-1 flex flex-col px-4 pt-3 overflow-y-auto">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              // Highlight dashboard only when location is '/dashboard'
              const isActive = item.id === 'dashboard' ? location.pathname === '/dashboard' : item.active;

              return (
                <a
                  key={item.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.id === 'dashboard') {
                      navigate('/dashboard');
                    }
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                  className={`group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${
                    isActive 
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
          </nav>
        </div>

        <div className="p-2 mb-1 shrink-0">
          <div 
            className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-50 to-indigo-50/30 border border-slate-200/60 p-3 shadow-sm hover:shadow-md hover:-translate-y-1 group cursor-pointer transition-all duration-300"
          >
            {/* Background animated blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl group-hover:bg-indigo-400/20 transition-colors duration-500" />
            
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                <Crown className="w-4 h-4 text-indigo-600" />
              </div>
              <h4 className="text-slate-900 text-[14px] font-bold mb-0.5">{t('dashboard.upgrade.title')}</h4>
              <p className="text-slate-500 text-[11px] leading-relaxed mb-3">{t('dashboard.upgrade.desc')}</p>
              
              <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-bold rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95">
                {t('dashboard.upgrade.button')}
              </button>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
}
