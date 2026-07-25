import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import Footer from '../components/dashboard/Footer';
import BottomNav from '../components/dashboard/BottomNav';
import CompleteProfileContent from '../components/profile/complete/CompleteProfileContent';

export default function CompleteProfile() {
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
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <AnimatePresence>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </AnimatePresence>

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-4 lg:p-6 pb-[90px] lg:pb-6">
          <div className="max-w-[1400px] w-full min-w-0 mx-auto flex flex-col gap-4 lg:gap-5">
            <CompleteProfileContent />
            <Footer />
          </div>
        </main>
        
        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
