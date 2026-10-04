import React from 'react';
import { Award, ChevronRight, CheckCircle2, Star, Trophy, Users } from 'lucide-react';

export default function RecentAchievements({ onOpenModal }) {
  const recentHistory = [
    {
      id: 1,
      title: "First Direct Referral",
      date: "12 Aug 2026",
      icon: <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
    },
    {
      id: 2,
      title: "First Package Sale",
      date: "10 Aug 2026",
      icon: <Trophy className="w-5 h-5 text-yellow-600" />
    },
    {
      id: 3,
      title: "5 Direct Referrals",
      date: "05 Sep 2026",
      icon: <Users className="w-5 h-5 text-emerald-600" />
    }
  ];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-[24px] shadow-sm p-6 sm:p-8 flex flex-col h-full relative overflow-hidden group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200">
      
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700 z-0" />
      
      <div className="relative z-10 flex flex-col h-full w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-[#4f3bf3]" />
            <h2 className="text-[20px] font-extrabold text-[#1a1446]">Recent Achievements</h2>
        </div>
        <button 
          onClick={onOpenModal}
          className="text-[13px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center"
        >
            View All History <ChevronRight className="w-4 h-4 ml-0.5" />
        </button>
      </div>

      {/* Table / List */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[500px]">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-xl mb-3">
            <div className="col-span-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Achievement</div>
            <div className="col-span-3 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Date</div>
            <div className="col-span-3 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Status</div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col gap-2">
            {recentHistory.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-center px-4 py-3 hover:bg-slate-50/50 rounded-xl transition-colors border border-transparent hover:border-slate-100 group cursor-pointer">
                
                {/* Title */}
                <div className="col-span-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[14px] font-bold text-[#1a1446]">{item.title}</span>
                </div>

                {/* Date */}
                <div className="col-span-3">
                  <span className="text-[13px] font-semibold text-slate-600">{item.date}</span>
                </div>

                {/* Status */}
                <div className="col-span-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full w-fit">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Earned</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
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
