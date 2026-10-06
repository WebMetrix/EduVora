import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import CurrentRankCard from '../components/ranks/CurrentRankCard';
import NextRankProgress from '../components/ranks/NextRankProgress';
import AchievementsList from '../components/ranks/AchievementsList';
import RecentAchievements from '../components/ranks/RecentAchievements';
import ViewAllAchievementsModal from '../components/ranks/ViewAllAchievementsModal';
import AchievementHistoryModal from '../components/ranks/AchievementHistoryModal';

export default function RankAchievements() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = React.useState(false);

  return (
    <div className="w-full flex flex-col gap-6 max-w-[1400px] mx-auto pb-6">
      {/* Header */}
      <div>
        <div className="hidden md:flex items-center text-[13px] font-medium text-slate-500 gap-1.5 mb-2">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Rank & Achievements</span>
        </div>
        <h1 className="text-[24px] lg:text-[28px] font-bold text-[#1a1446] mb-1">
          Rank & Achievements
        </h1>
        <p className="text-[14px] text-slate-500 font-medium">
          Track your journey, unlock milestones and achieve new ranks.
        </p>
      </div>

      {/* Top Grid: Current Rank & Progress */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-5 flex h-full">
          <CurrentRankCard />
        </div>
        <div className="xl:col-span-7 flex h-full">
          <NextRankProgress />
        </div>
      </div>

      {/* Achievements Section */}
      <AchievementsList onOpenModal={() => setIsModalOpen(true)} />

      {/* Bottom Grid: Recent Achievements & Illustration */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 flex h-full">
          <RecentAchievements onOpenModal={() => setIsHistoryModalOpen(true)} />
        </div>
        <div className="xl:col-span-4 bg-indigo-50/50 border border-indigo-100/50 rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden hidden xl:flex">
          {/* Trophy Illustration Approximation */}
          <div className="relative z-10 w-full flex justify-center items-end h-48 mt-8">
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-100/80 to-transparent -bottom-6 w-full rounded-full blur-xl" />
            
            {/* Pedestals */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end">
                <div className="w-16 h-12 bg-indigo-200/40 rounded-t-lg backdrop-blur-sm border border-white/40 shadow-sm z-10" />
                <div className="w-24 h-24 bg-indigo-200/60 rounded-t-lg backdrop-blur-md border border-white/50 shadow-md mx-[-8px] z-20 flex justify-center">
                    {/* Trophy icon */}
                    <div className="absolute -top-16 drop-shadow-[0_10px_20px_rgba(234,179,8,0.3)]">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 fill-yellow-400">
                          <defs>
                            <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#FDE047" />
                                <stop offset="50%" stopColor="#EAB308" />
                                <stop offset="100%" stopColor="#A16207" />
                            </linearGradient>
                          </defs>
                          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                          <path d="M4 22h16" />
                          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                          <path d="M18 2H6v7c0 3.31 2.69 6 6 6s6-2.69 6-6V2z" />
                        </svg>
                    </div>
                </div>
                <div className="w-16 h-8 bg-indigo-200/40 rounded-t-lg backdrop-blur-sm border border-white/40 shadow-sm z-10" />
            </div>

            {/* Stars */}
            <svg className="absolute w-6 h-6 text-yellow-400 fill-yellow-400 top-4 left-10 animate-pulse" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg className="absolute w-4 h-4 text-yellow-300 fill-yellow-300 top-12 left-6 opacity-70" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg className="absolute w-5 h-5 text-yellow-400 fill-yellow-400 top-8 right-14 animate-pulse delay-300" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg className="absolute w-3 h-3 text-yellow-300 fill-yellow-300 top-20 right-8 opacity-60" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <ViewAllAchievementsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <AchievementHistoryModal 
        isOpen={isHistoryModalOpen} 
        onClose={() => setIsHistoryModalOpen(false)} 
      />
    </div>
  );
}
