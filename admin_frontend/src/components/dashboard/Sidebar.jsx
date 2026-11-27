import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, Users, GitFork, Boxes, FileText, CreditCard,
  Coins, Wallet, Award, ShieldCheck, BookOpen, BarChart2,
  Sliders, ChevronDown, X, UserPlus, AlignLeft, Edit3, ClipboardCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/images/Eduvora.png';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, hasSub: false },
  {
    id: 'users',
    label: 'User Management',
    icon: Users,
    hasSub: true,
    subItems: [
      { id: 'add-user', label: 'Add User', icon: UserPlus, path: '/users/add' },
      { id: 'view-users', label: 'View Users', icon: AlignLeft, path: '/users/view' },
      { id: 'edit-user', label: 'Edit User', icon: Edit3, path: '/users/edit' },
      { id: 'kyc-verification', label: 'KYC Verification', icon: ClipboardCheck, path: '/users/kyc' },
    ]
  },
  {
    id: 'network',
    label: 'Network & Referrals',
    icon: GitFork,
    hasSub: true,
    subItems: [
      { id: 'referral-overview', label: 'Referral Overview', path: '/network/referral-overview' },
      { id: 'genealogy-tree', label: 'Genealogy Tree', path: '/network/genealogy-tree' },
      { id: 'referral-details', label: 'Referral Details', path: '/network/referral-details' },
      { id: 'referral-analytics', label: 'Referral Analytics', path: '/network/referral-analytics' },
      { id: 'referral-exceptions', label: 'Referral Exceptions', path: '/network/referral-exceptions' },
      { id: 'referral-audit-history', label: 'Referral Audit History', path: '/network/referral-audit-history' },
    ]
  },
  {
    id: 'package',
    label: 'Package & Product Management',
    icon: Boxes,
    hasSub: true,
    subItems: ['Course Packages', 'Courses Catalog', 'EBooks & Materials']
  },
  {
    id: 'orders',
    label: 'Orders & Invoices',
    icon: FileText,
    hasSub: true,
    subItems: [
      { id: 'order-management', label: 'All Orders', path: '/orders' },
      { id: 'invoice-management', label: 'Invoices', path: '/orders/invoices' },
      { id: 'refund-requests', label: 'Refund Requests', path: '/orders/refunds' },
      { id: 'order-status-history', label: 'Order Status History', path: '/orders/history' },
      { id: 'order-exceptions', label: 'Order Exceptions', path: '/orders/exceptions' },
    ]
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: CreditCard,
    hasSub: true,
    subItems: [
      { id: 'payment-overview', label: 'Payment Overview', path: '/payments' },
      { id: 'payment-transactions', label: 'Transactions', path: '/payments/transactions' },
      { id: 'payment-verification', label: 'Payment Verification', path: '/payments/verification' },
      { id: 'payment-refunds', label: 'Refund Management', path: '/payments/refunds' },
      { id: 'payment-reconciliation', label: 'Reconciliation', path: '/payments/reconciliation' },
      { id: 'payment-webhooks', label: 'Webhooks & Exceptions', path: '/payments/webhooks' },
    ]
  },
  {
    id: 'commission',
    label: 'Commission Management',
    icon: Coins,
    hasSub: true,
    subItems: ['Commission Rules', 'Ledger Records', 'Payout Approvals']
  },
  {
    id: 'wallet',
    label: 'Wallet Management',
    icon: Wallet,
    hasSub: true,
    subItems: ['User Wallets', 'Manual Adjustments', 'Withdrawal Limits']
  },
  {
    id: 'ranks',
    label: 'Rank & Achievements',
    icon: Award,
    hasSub: true,
    subItems: ['Rank Tiers', 'Criteria Rules', 'User Achievements']
  },
  {
    id: 'kyc',
    label: 'KYC Verification',
    icon: ShieldCheck,
    hasSub: true,
    subItems: ['Pending Verifications', 'Approved List', 'Rejection History']
  },
  {
    id: 'content',
    label: 'Content & Legal',
    icon: BookOpen,
    hasSub: true,
    subItems: ['Terms of Service', 'Privacy Policy', 'Announcements']
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    icon: BarChart2,
    hasSub: true,
    subItems: ['Sales Summary', 'User Growth', 'Payout Reports']
  },
  {
    id: 'system',
    label: 'System Monitoring & Audit',
    icon: Sliders,
    hasSub: true,
    subItems: ['System Health', 'Audit Trail', 'API Logs']
  }
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState('network');
  const [activeSubItem, setActiveSubItem] = useState('genealogy-tree');
  const [openAccordions, setOpenAccordions] = useState({ network: true, users: true });

  // Sync active states with route
  useEffect(() => {
    if (location.pathname.startsWith('/network') || location.pathname.startsWith('/referral')) {
      setActiveItem('network');
      setOpenAccordions((prev) => ({ ...prev, network: true }));
      if (location.pathname.includes('genealogy') || location.pathname.includes('tree')) {
        setActiveSubItem('genealogy-tree');
      } else if (location.pathname.includes('details')) {
        setActiveSubItem('referral-details');
      } else if (location.pathname.includes('analytics')) {
        setActiveSubItem('referral-analytics');
      } else if (location.pathname.includes('exceptions')) {
        setActiveSubItem('referral-exceptions');
      } else if (location.pathname.includes('audit')) {
        setActiveSubItem('referral-audit-history');
      } else {
        setActiveSubItem('referral-overview');
      }
    } else if (location.pathname.startsWith('/orders')) {
      setActiveItem('orders');
      setOpenAccordions((prev) => ({ ...prev, orders: true }));
      if (location.pathname.includes('/invoices')) {
        setActiveSubItem('invoice-management');
      } else if (location.pathname.includes('/refunds')) {
        setActiveSubItem('refund-requests');
      } else if (location.pathname.includes('/history')) {
        setActiveSubItem('order-status-history');
      } else if (location.pathname.includes('/exceptions')) {
        setActiveSubItem('order-exceptions');
      } else {
        setActiveSubItem('order-management');
      }
    } else if (location.pathname.startsWith('/payments')) {
      setActiveItem('payments');
      setOpenAccordions((prev) => ({ ...prev, payments: true }));
      if (location.pathname.includes('/transactions')) {
        setActiveSubItem('payment-transactions');
      } else if (location.pathname.includes('/verification')) {
        setActiveSubItem('payment-verification');
      } else if (location.pathname.includes('/refunds')) {
        setActiveSubItem('payment-refunds');
      } else if (location.pathname.includes('/reconciliation')) {
        setActiveSubItem('payment-reconciliation');
      } else if (location.pathname.includes('/webhooks')) {
        setActiveSubItem('payment-webhooks');
      } else {
        setActiveSubItem('payment-overview');
      }
    } else if (location.pathname.includes('/kyc')) {
      setActiveItem('users');
      setActiveSubItem('kyc-verification');
      setOpenAccordions((prev) => ({ ...prev, users: true }));
    } else if (location.pathname.includes('/view') || location.pathname === '/users') {
      setActiveItem('users');
      setActiveSubItem('view-users');
      setOpenAccordions((prev) => ({ ...prev, users: true }));
    } else if (location.pathname.includes('/edit')) {
      setActiveItem('users');
      setActiveSubItem('edit-user');
      setOpenAccordions((prev) => ({ ...prev, users: true }));
    } else if (location.pathname.startsWith('/users') || location.pathname.startsWith('/user-management')) {
      setActiveItem('users');
      setActiveSubItem('add-user');
      setOpenAccordions((prev) => ({ ...prev, users: true }));
    } else if (location.pathname === '/' || location.pathname === '/dashboard') {
      setActiveItem('dashboard');
      setActiveSubItem('');
    }
  }, [location.pathname]);

  const toggleAccordion = (id) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[240px] h-full flex flex-col bg-white border-r border-slate-200/70 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Area */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-slate-100 shrink-0">
          <div
            onClick={() => {
              navigate('/dashboard');
              if (window.innerWidth < 1024) setIsOpen(false);
            }}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-9 h-9 shrink-0 flex items-center justify-center">
              <img src={logoImg} alt="Eduvora Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-slate-900 text-[16px] font-black tracking-tight leading-none">
                EduVora
              </h2>
              <p className="text-slate-400 text-[9px] font-bold tracking-wider uppercase mt-0.5">
                Learn. Grow. Earn.
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 -mr-1 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu List */}
        <div className="flex-1 flex flex-col px-3 py-3 overflow-y-auto custom-scrollbar gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeItem === item.id;
            const isAccordionOpen = !!openAccordions[item.id];

            return (
              <div key={item.id} className="flex flex-col">
                <button
                  onClick={() => {
                    setActiveItem(item.id);
                    if (item.id === 'dashboard') {
                      navigate('/dashboard');
                      if (window.innerWidth < 1024) setIsOpen(false);
                    } else if (item.hasSub) {
                      toggleAccordion(item.id);
                    } else if (window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-[12.5px] font-bold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'text-indigo-600 bg-indigo-50/70 shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  {/* Left indicator bar matching user design */}
                  {isSelected && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-indigo-600 rounded-r-md" />
                  )}

                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isSelected ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.hasSub && (
                    <motion.div
                      animate={{ rotate: isAccordionOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 ml-1.5"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-colors ${
                          isSelected ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      />
                    </motion.div>
                  )}
                </button>

                {/* Sub Menu Accordion */}
                {item.hasSub && (
                  <AnimatePresence>
                    {isAccordionOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        {/* Connecting guideline container on the left */}
                        <div className="relative flex flex-col gap-1 pl-3 ml-4.5 border-l-2 border-indigo-200 py-1 my-0.5">
                          {item.subItems.map((sub, idx) => {
                            const isSubObj = typeof sub === 'object';
                            const subLabel = isSubObj ? sub.label : sub;
                            const subId = isSubObj ? sub.id : `sub-${idx}`;
                            const SubIcon = isSubObj ? sub.icon : null;
                            const isSubActive = activeSubItem === subId;

                            return (
                              <button
                                key={subId}
                                onClick={() => {
                                  setActiveItem(item.id);
                                  setActiveSubItem(subId);
                                  if (isSubObj && sub.path) {
                                    navigate(sub.path);
                                  } else if (subId === 'add-user') {
                                    navigate('/users/add');
                                  } else if (subId === 'edit-user') {
                                    navigate('/users/edit');
                                  } else if (subId === 'view-users') {
                                    navigate('/users/view');
                                  } else if (subId === 'kyc-verification') {
                                    navigate('/users/kyc');
                                  }
                                  if (window.innerWidth < 1024) setIsOpen(false);
                                }}
                                className={`w-full group relative flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-bold transition-all duration-200 text-left truncate cursor-pointer ${
                                  isSubActive
                                    ? 'bg-indigo-50/80 text-indigo-600 shadow-2xs font-extrabold'
                                    : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/40'
                                }`}
                              >
                                {/* Active vertical accent bar on the left connecting tree guideline */}
                                {isSubActive && (
                                  <div className="absolute -left-[14px] top-1 bottom-1 w-[3px] bg-indigo-600 rounded-full" />
                                )}

                                {SubIcon && (
                                  <SubIcon
                                    className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                                      isSubActive
                                        ? 'text-indigo-600'
                                        : 'text-slate-400 group-hover:text-indigo-600'
                                    }`}
                                  />
                                )}
                                <span className="truncate">{subLabel}</span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
