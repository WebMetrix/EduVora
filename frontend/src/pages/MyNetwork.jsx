import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronRight } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import Footer from '../components/dashboard/Footer';
import BottomNav from '../components/dashboard/BottomNav';

// We will build these components next
import TeamDashboard from '../components/network/TeamDashboard';
import NetworkCharts from '../components/network/NetworkCharts';
import TreeControls from '../components/network/TreeControls';
import GenealogyTree from '../components/network/GenealogyTree';

export default function MyNetwork() {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on window resize if it's open on mobile and screen becomes desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen w-full bg-[#FAFAFC] overflow-hidden font-sans">
      {/* Decorative premium background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-150 h-150 bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <AnimatePresence>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </AnimatePresence>

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-6 pb-22.5 lg:pb-6">
          <div className="max-w-350 mx-auto flex flex-col gap-5 lg:gap-6">
            
            {/* Header & Breadcrumbs */}
            <div>
              <h1 className="text-[24px] lg:text-[28px] font-bold text-slate-900 mb-1">
                {t('network.title')}
              </h1>
              <div className="flex items-center text-[13px] font-medium text-slate-500 gap-1.5">
                <span>{t('network.breadcrumb1')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span>{t('network.breadcrumb2')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-slate-900">{t('network.breadcrumb3')}</span>
              </div>
            </div>

            {/* Top Stat Cards */}
            <TeamDashboard />

            {/* Charts Row */}
            <NetworkCharts />

            {/* Genealogy Tree Section */}
            <div className="flex flex-col gap-4">
              <TreeControls />
              <GenealogyTree />
            </div>

            {/* Footer */}
            <Footer />

          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
