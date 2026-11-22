import { useState } from 'react';
import {
  Home, Users, GitFork, Boxes, FileText, CreditCard,
  Coins, Wallet, Award, ShieldCheck, BookOpen, BarChart2,
  Sliders, ChevronDown, X
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
    subItems: ['All Users', 'Create User', 'Roles & Permissions']
  },
  {
    id: 'network',
    label: 'Network & Referrals',
    icon: GitFork,
    hasSub: true,
    subItems: ['Tree View', 'Referral Logs', 'Genealogy']
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
    subItems: ['All Orders', 'Invoices', 'Refund Requests']
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: CreditCard,
    hasSub: true,
    subItems: ['Transactions', 'Payment Gateways', 'Reconciliation']
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
  const [activeItem, setActiveItem] = useState('dashboard');
  const [openAccordions, setOpenAccordions] = useState({});

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
          <div className="flex items-center gap-2.5">
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
                    if (item.hasSub) {
                      toggleAccordion(item.id);
                    } else if (window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full group relative flex items-center justify-between px-3 py-2 rounded-xl text-[12.5px] font-bold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'text-indigo-600 bg-indigo-50/80 shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
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
                        <div className="flex flex-col gap-0.5 pl-8 pr-1 py-1">
                          {item.subItems.map((sub, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                if (window.innerWidth < 1024) setIsOpen(false);
                              }}
                              className="px-2.5 py-1.5 text-[11.5px] font-semibold text-slate-500 rounded-lg hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors text-left truncate cursor-pointer"
                            >
                              {sub}
                            </button>
                          ))}
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
