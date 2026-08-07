import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../dashboard/Sidebar';
import Header from '../dashboard/Header';
import Footer from '../dashboard/Footer';
import BottomNav from '../dashboard/BottomNav';
import { fetchUserProfile } from '../../redux/slices/profileSlice';

export default function GlobalLayout({ 
  children, 
  isSuperAdmin = false,
  mainClassName = "flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-4 lg:p-6 pb-[90px] lg:pb-6",
  innerClassName = "max-w-[1400px] w-full min-w-0 mx-auto flex flex-col gap-4 lg:gap-5"
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { data: profileData } = useSelector((state) => state.profile || {});
  const location = useLocation();
  const mainRef = useRef(null);

  // Scroll to top on route change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  // Fetch profile on layout mount if not super admin
  useEffect(() => {
    if (!isSuperAdmin) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isSuperAdmin]);

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
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isSuperAdmin={isSuperAdmin} />
      </AnimatePresence>

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSuperAdmin={isSuperAdmin} />

        <main ref={mainRef} className={mainClassName}>
          <div className={innerClassName}>
            {children || <Outlet />}
            {/* Bottom-most: Footer */}
            <Footer />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
