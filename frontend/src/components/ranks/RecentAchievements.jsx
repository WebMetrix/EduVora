import React from 'react';
import { Award, ChevronRight, CheckCircle2, Star, Trophy, Users } from 'lucide-react';

export default function RecentAchievements({ onOpenModal }) {
  const recentHistory = [
    {
      id: 1,
      title: "First Direct Referral",
      category: "Referral Milestone",
      date: "12 Aug 2026",
      icon: <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
    },
    {
      id: 2,
      title: "First Package Sale",
      category: "Sales Milestone",
      date: "10 Aug 2026",
      icon: <Trophy className="w-5 h-5 text-yellow-600" />
    },
    {
      id: 3,
      title: "5 Direct Referrals",
      category: "Network Milestone",
      date: "05 Sep 2026",
      icon: <Users className="w-5 h-5 text-emerald-600" />
    },
    {
      id: 4,
      title: "First Level 2 Member",
      category: "Team Growth",
      date: "22 Aug 2026",
      icon: <Users className="w-5 h-5 text-indigo-600" />
    },
    {
      id: 5,
      title: "First Commission",
      category: "Earnings Milestone",
      date: "28 Aug 2026",
      icon: <Award className="w-5 h-5 text-purple-600" />
    }
  ];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-[24px] shadow-sm p-6 sm:p-7 flex flex-col h-full relative overflow-hidden group/card transition-all duration-300 hover:shadow-md hover:border-indigo-200">
      
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700 z-0" />
      
      <div className="relative z-10 flex flex-col h-full w-full justify-between">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-[#4f3bf3]" />
            <h2 className="text-[19px] sm:text-[20px] font-extrabold text-[#1a1446]">Recent Achievements</h2>
          </div>
          <button 
            onClick={onOpenModal}
            className="text-[13px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center transition-colors"
          >
            View All History <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>

        {/* Table / List */}
        <div className="w-full overflow-x-auto flex-1 flex flex-col justify-between">
          <div className="min-w-[480px] w-full flex-1 flex flex-col">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2.5 bg-slate-50/80 rounded-xl mb-2.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-6">Achievement</div>
              <div className="col-span-3 text-center sm:text-left">Date</div>
              <div className="col-span-3 text-right">Status</div>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col gap-1.5 flex-1 justify-between">
              {recentHistory.map((item) => (
                <div 
                  key={item.id} 
                  className="grid grid-cols-12 gap-4 items-center px-4 py-2.5 hover:bg-slate-50/70 rounded-xl transition-colors border border-transparent hover:border-slate-100/80 group"
                >
                  
                  {/* Title & Category */}
                  <div className="col-span-6 flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center shrink-0 shadow-xs border border-slate-100 group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="text-[13.5px] font-bold text-[#1a1446] truncate">{item.title}</span>
                      <span className="text-[11px] font-medium text-slate-400 truncate">{item.category}</span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="col-span-3 flex items-center text-center sm:text-left">
                    <span className="text-[12.5px] font-semibold text-slate-600">{item.date}</span>
                  </div>

                  {/* Status (Right-aligned to fill right margin cleanly) */}
                  <div className="col-span-3 flex items-center justify-end">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full w-fit shrink-0 border border-emerald-100/40">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="text-[10.5px] font-bold uppercase tracking-wider">Earned</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
