import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronRight } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import Footer from '../components/dashboard/Footer';
import BottomNav from '../components/dashboard/BottomNav';

import ReferralProfileCard from '../components/referrals/ReferralProfileCard';
import ReferralLinkCard from '../components/referrals/ReferralLinkCard';
import ReferralQRCodeCard from '../components/referrals/ReferralQRCodeCard';
import ReferralStats from '../components/referrals/ReferralStats';
import ReferralFunnel from '../components/referrals/ReferralFunnel';
import ReferralRewards from '../components/referrals/ReferralRewards';
import ReferralSharingTips from '../components/referrals/ReferralSharingTips';
import ReferralsDataTable from '../components/referrals/ReferralsDataTable';

export default function MyReferrals() {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <AnimatePresence>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </AnimatePresence>

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar p-4 lg:p-6 pb-[90px] lg:pb-6">
          <div className="max-w-[1400px] mx-auto min-w-0 flex flex-col gap-5 lg:gap-6">
            
            <div>
              <h1 className="text-[24px] lg:text-[28px] font-bold text-slate-900 mb-1">
                {t('myReferrals.title')}
              </h1>
              <div className="flex items-center text-[13px] font-medium text-slate-500 gap-1.5">
                <span>{t('myReferrals.breadcrumb1')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-slate-900">{t('myReferrals.breadcrumb2')}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
              <div className="w-full min-w-0 h-full lg:col-span-6 xl:col-span-4"><ReferralProfileCard t={t} /></div>
              <div className="w-full min-w-0 h-full lg:col-span-6 xl:col-span-5"><ReferralLinkCard t={t} /></div>
              <div className="w-full min-w-0 h-full lg:col-span-12 xl:col-span-3"><ReferralQRCodeCard t={t} /></div>
            </div>

            <ReferralStats t={t} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
              <div className="w-full min-w-0 h-full lg:col-span-12 xl:col-span-5"><ReferralFunnel t={t} /></div>
              <div className="w-full min-w-0 h-full lg:col-span-6 xl:col-span-4"><ReferralRewards t={t} /></div>
              <div className="w-full min-w-0 h-full lg:col-span-6 xl:col-span-3"><ReferralSharingTips t={t} /></div>
            </div>

            <ReferralsDataTable t={t} />

            <Footer />

          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
