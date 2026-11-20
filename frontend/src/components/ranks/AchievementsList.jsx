import React, { useState, useRef } from 'react';
import { Award, ChevronRight, ChevronLeft, CheckCircle2, Clock, Lock } from 'lucide-react';
import { getAchievementIcon, formatRankDate } from '../../utils/rankHelper';
import AchievementDetailsModal from './AchievementDetailsModal';

export default function AchievementsList({ achievements = [], counts = {}, loading = false, onOpenModal }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const scrollRef = useRef(null);

  const tabs = [
    { id: 'All', label: `All (${counts?.all ?? achievements.length})` },
    { id: 'Earned', label: `Earned (${counts?.earned ?? achievements.filter(a => a.status === 'Earned').length})` },
    { id: 'In Progress', label: `In Progress (${counts?.inProgress ?? achievements.filter(a => a.status === 'In Progress').length})` },
    { id: 'Locked', label: `Locked (${counts?.locked ?? achievements.filter(a => a.status === 'Locked').length})` }
  ];

  const filteredAchievements = achievements.filter(item => {
    if (activeTab === 'All') return true;
    return item.status === activeTab;
  });

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 bg-white border border-slate-200 rounded-[24px] shadow-sm p-6 sm:p-8 relative overflow-hidden group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200">
      
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700 z-0" />
      
      <div className="relative z-10 w-full flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-[#1a1446]" />
              <h2 className="text-[20px] font-extrabold text-[#1a1446]">Achievements</h2>
            </div>
            <p className="text-[14px] text-slate-500 font-medium md:border-l md:border-slate-200 md:pl-4">
              Complete milestones and unlock achievements on your journey.
            </p>
          </div>
          
          <button 
            onClick={onOpenModal}
            className="text-[13px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center w-fit cursor-pointer"
          >
            View All Achievements <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>

        {/* Controls: Tabs & Carousel Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex overflow-x-auto custom-scrollbar pb-1 sm:pb-0 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#4f3bf3] text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Carousel Arrows */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button 
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cards List (Horizontal Scrollable Carousel) */}
        <div ref={scrollRef} className="flex overflow-x-auto gap-4 custom-scrollbar pb-4 -mx-2 px-2">
          {filteredAchievements.length === 0 ? (
            <div className="w-full py-12 text-center text-slate-400 font-bold text-[14px]">
              No achievements found in this tab
            </div>
          ) : (
            filteredAchievements.map((item) => {
              const currentProg = item.currentProgress ?? item.progress ?? 0;
              const targetVal = item.targetValue ?? item.total ?? 1;
              const progressPct = targetVal > 0 ? Math.min(100, Math.round((currentProg / targetVal) * 100)) : 0;
              const earnedDateStr = formatRankDate(item.earnedDate || item.date);

              return (
                <div 
                  key={item.achievementId || item.id} 
                  onClick={() => setSelectedAchievement(item)}
                  className="min-w-[280px] w-[280px] shrink-0 border border-slate-100 bg-white rounded-[20px] p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col gap-4 relative cursor-pointer group"
                >
                  {/* Content */}
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.iconBg || 'bg-yellow-50'} transition-transform group-hover:scale-105`}>
                      {getAchievementIcon(item.iconName)}
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <h4 className="text-[14px] font-extrabold text-[#1a1446] leading-tight group-hover:text-indigo-600 transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-[12px] font-medium text-slate-500 leading-snug line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress / Status Area */}
                  <div className="mt-auto pt-4 flex items-end justify-between">
                    {item.status === 'Earned' && (
                      <>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">Earned</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <span className="text-[12px] font-medium">{earnedDateStr}</span>
                        </div>
                      </>
                    )}

                    {item.status === 'In Progress' && (
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 shrink-0">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">In Progress</span>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-1">
                          <span className="text-[12px] font-bold text-[#1a1446]">{currentProg} / {targetVal}</span>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full transition-all duration-700" style={{ width: `${progressPct}%` }} />
                          </div>
                        </div>
                      </div>
                    )}

                    {item.status === 'Locked' && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-500">
                        <Lock className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Locked</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <AchievementDetailsModal 
        isOpen={Boolean(selectedAchievement)}
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </div>
  );
}
