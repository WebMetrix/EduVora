import { Menu, ChevronDown, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ toggleSidebar }) {
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
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        
        {/* Optional Notification Bell (adding for premium feel) */}
        <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 group">
          <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 text-indigo-700 font-bold text-[14px] shadow-sm group-hover:shadow-md transition-shadow">
              PS
            </div>
            {/* Glowing ring on hover */}
            <div className="absolute inset-0 rounded-full ring-2 ring-indigo-500/0 group-hover:ring-indigo-500/30 ring-offset-2 transition-all duration-300"></div>
          </div>
          
          {/* Info */}
          <div className="hidden sm:block">
            <h4 className="text-[14px] font-bold text-slate-900 leading-tight">Priya Sharma</h4>
            <p className="text-[11px] font-medium text-slate-500 mt-0.5">ID: LN100245</p>
          </div>

          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors ml-1 hidden sm:block" />
        </motion.div>

      </div>
    </header>
  );
}
