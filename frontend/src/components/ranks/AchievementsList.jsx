import React, { useState } from 'react';
import { Award, ChevronRight, ChevronLeft, CheckCircle2, Clock, Lock, Trophy, Star, Users } from 'lucide-react';

export default function AchievementsList({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = [
    { id: 'All', label: 'All' },
    { id: 'Earned', label: 'Earned (5)' },
    { id: 'InProgress', label: 'In Progress (2)' },
    { id: 'Locked', label: 'Locked (3)' }
  ];

  const achievements = [
    {
      id: 1,
      title: "First Package Sale",
      description: "Make your first package purchase.",
      icon: <Trophy className="w-5 h-5 text-yellow-600" />,
      iconBg: "bg-yellow-50",
      status: "Earned",
      date: "10 Aug 2026"
    },
    {
      id: 2,
      title: "First Direct Referral",
      description: "Get your first direct referral.",
      icon: <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />,
      iconBg: "bg-yellow-50",
      status: "Earned",
      date: "12 Aug 2026"
    },
    {
      id: 3,
      title: "5 Direct Referrals",
      description: "Get 5 direct referrals.",
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      iconBg: "bg-emerald-50",
      status: "Earned",
      date: "05 Sep 2026"
    },
    {
      id: 4,
      title: "10 Team Members",
      description: "Build a team of 10 eligible members.",
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      iconBg: "bg-indigo-50",
      status: "In Progress",
      progress: 7,
      total: 10
    },
    {
      id: 5,
      title: "25 Team Members",
      description: "Build a team of 25 eligible members.",
      icon: <Users className="w-5 h-5 text-slate-500" />,
      iconBg: "bg-slate-100",
      status: "Locked"
    }
  ];

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
          className="text-[13px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center w-fit"
        >
          View All Achievements <ChevronRight className="w-4 h-4 ml-0.5" />
        </button>
      </div>

      {/* Controls: Tabs & Arrows */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Tabs */}
        <div className="flex overflow-x-auto custom-scrollbar pb-1 sm:pb-0 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-2 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all ${
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
            <button className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm">
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Cards List (Horizontal Scrollable) */}
      <div className="flex overflow-x-auto gap-4 custom-scrollbar pb-4 -mx-2 px-2">
        {achievements.map((item) => (
            <div 
                key={item.id} 
                className="min-w-[280px] w-[280px] shrink-0 border border-slate-100 bg-white rounded-[20px] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 relative"
            >
                {/* Content */}
                <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}>
                        {item.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="text-[14px] font-extrabold text-[#1a1446] leading-tight">{item.title}</h4>
                        <p className="text-[12px] font-medium text-slate-500 leading-snug">{item.description}</p>
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
                                <span className="text-[12px] font-medium">{item.date}</span>
                            </div>
                        </>
                    )}

                    {item.status === 'In Progress' && (
                        <div className="w-full flex items-center justify-between gap-4">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600">
                                <Clock className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-bold uppercase tracking-wider">In Progress</span>
                            </div>
                            <div className="flex flex-col items-end gap-1 flex-1">
                                <span className="text-[12px] font-bold text-[#1a1446]">{item.progress} / {item.total}</span>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(item.progress / item.total) * 100}%` }} />
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
        ))}
      </div>
      </div>
    </div>
  );
}
