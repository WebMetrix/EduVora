import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Search, Calendar, ChevronDown, CheckCircle2, Clock, Lock, 
  Trophy, Star, Users, DollarSign, Target, ArrowUpCircle, ChevronLeft, ChevronRight
} from 'lucide-react';

const HISTORY_DATA = [
  {
    id: 1,
    title: "First Direct Referral",
    description: "Get your first direct referral.",
    criteria: "Have one user register and purchase a package using your referral link.",
    points: 50,
    reward: "First Referral Badge",
    icon: <Trophy className="w-5 h-5 text-yellow-600" />,
    iconBg: "bg-yellow-50",
    status: "Earned",
    date: "12 Aug 2026",
    category: "Referral"
  },
  {
    id: 2,
    title: "First Package Sale",
    description: "Make your first package purchase.",
    criteria: "Complete a successful package purchase of any plan.",
    points: 100,
    reward: "First Purchase Badge",
    icon: <Trophy className="w-5 h-5 text-yellow-600" />,
    iconBg: "bg-yellow-50",
    status: "Earned",
    date: "10 Aug 2026",
    category: "Sales"
  },
  {
    id: 3,
    title: "5 Direct Referrals",
    description: "Get 5 direct referrals.",
    reward: "5 Referrals Badge",
    icon: <Users className="w-5 h-5 text-emerald-600" />,
    iconBg: "bg-emerald-50",
    status: "Earned",
    date: "05 Sep 2026",
    category: "Referral"
  },
  {
    id: 4,
    title: "10 Team Members",
    description: "Build a team of 10 eligible members.",
    reward: "-",
    icon: <Users className="w-5 h-5 text-blue-600" />,
    iconBg: "bg-blue-50",
    status: "In Progress",
    date: "-",
    category: "Team Growth"
  },
  {
    id: 5,
    title: "25 Team Members",
    description: "Build a team of 25 eligible members.",
    reward: "-",
    icon: <Users className="w-5 h-5 text-slate-500" />,
    iconBg: "bg-slate-100",
    status: "Locked",
    date: "-",
    category: "Team Growth"
  },
  {
    id: 6,
    title: "50 Team Members",
    description: "Build a team of 50 eligible members.",
    reward: "-",
    icon: <Users className="w-5 h-5 text-pink-600" />,
    iconBg: "bg-pink-50",
    status: "Locked",
    date: "-",
    category: "Team Growth"
  },
  {
    id: 7,
    title: "First Level 2 Member",
    description: "Get your first level 2 member.",
    reward: "Level 2 Member Badge",
    icon: <Users className="w-5 h-5 text-emerald-600" />,
    iconBg: "bg-emerald-50",
    status: "Earned",
    date: "22 Aug 2026",
    category: "Referral"
  },
  {
    id: 8,
    title: "First Commission",
    description: "Earn your first commission.",
    reward: "First Commission Badge",
    icon: <DollarSign className="w-5 h-5 text-purple-600" />,
    iconBg: "bg-purple-50",
    status: "Earned",
    date: "28 Aug 2026",
    category: "Earnings"
  },
  {
    id: 9,
    title: "Commission Milestone",
    description: "Reach a defined commission milestone.",
    reward: "-",
    icon: <Target className="w-5 h-5 text-orange-600" />,
    iconBg: "bg-orange-50",
    status: "Locked",
    date: "-",
    category: "Earnings"
  },
  {
    id: 10,
    title: "Rank Achievement",
    description: "Achieve a higher rank.",
    reward: "Gold Rank Badge",
    icon: <ArrowUpCircle className="w-5 h-5 text-indigo-600" />,
    iconBg: "bg-indigo-50",
    status: "Earned",
    date: "15 Sep 2026",
    category: "Rank"
  }
];

import AchievementDetailsModal from './AchievementDetailsModal';

export default function AchievementHistoryModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'All', label: `All (${HISTORY_DATA.length})` },
    { id: 'Earned', label: `Earned (${HISTORY_DATA.filter(a => a.status === 'Earned').length})` },
    { id: 'In Progress', label: `In Progress (${HISTORY_DATA.filter(a => a.status === 'In Progress').length})` },
    { id: 'Locked', label: `Locked (${HISTORY_DATA.filter(a => a.status === 'Locked').length})` }
  ];

  const filteredData = HISTORY_DATA.filter(a => {
    const matchesTab = activeTab === 'All' || a.status === activeTab;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getCategoryStyles = (category) => {
    switch(category) {
      case 'Referral': return 'bg-indigo-50 text-indigo-600';
      case 'Sales': return 'bg-blue-50 text-blue-600';
      case 'Team Growth': return 'bg-emerald-50 text-emerald-600';
      case 'Earnings': return 'bg-orange-50 text-orange-600';
      case 'Rank': return 'bg-pink-50 text-pink-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-6 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="w-full h-[90vh] md:h-auto md:max-h-[90vh] md:max-w-[1200px] bg-white md:rounded-[24px] rounded-t-3xl md:rounded-t-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 animate-slide-up md:animate-fade-in overflow-hidden">
        
        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden bg-white shrink-0">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-4 md:px-5 py-2.5 md:py-3 border-b border-slate-100 shrink-0 bg-white">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-[20px] md:text-[22px] font-extrabold text-[#1a1446]">Achievement History</h2>
            <p className="text-[12px] md:text-[13px] font-medium text-slate-500">
              View the list of achievements you have earned and your milestone journey.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between px-4 md:px-5 py-3 border-b border-slate-100 gap-4 shrink-0 bg-white">
          {/* Tabs */}
          <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-1 xl:pb-0 gap-2 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#4f3bf3] text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
            {/* Date Range Select */}
            <div className="relative w-full sm:w-[200px] border border-slate-200 rounded-xl px-3 py-1.5 flex items-center justify-between bg-white cursor-pointer hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Date Range</span>
                  <span className="text-[12px] font-bold text-slate-700 leading-tight">Select date range</span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-[260px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search achievements..."
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
          <div className="w-full">
            {/* Table Area (Desktop) */}
            <div className="hidden lg:block w-full">
              <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead className="sticky top-0 z-20 bg-slate-50 shadow-sm border-b border-slate-100">
                <tr>
                  <th className="px-4 xl:px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider">#</th>
                  <th className="px-4 xl:px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider">Achievement</th>
                  <th className="px-4 xl:px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider">Category</th>
                  <th className="px-4 xl:px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider">Description</th>
                  <th className="px-4 xl:px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider">Achieved Date</th>
                  <th className="px-4 xl:px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-4 xl:px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider">Reward</th>
                  <th className="px-4 xl:px-6 py-4 text-[13px] font-extrabold text-slate-600 uppercase tracking-wider text-right"></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id} className="group border-b border-slate-100/50 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300 cursor-pointer">
                    
                    {/* # */}
                    <td className="px-4 xl:px-6 py-3 rounded-l-xl align-middle">
                      <span className="text-[12px] font-bold text-slate-800 group-hover:text-[#4f3bf3] transition-colors">{index + 1}</span>
                    </td>

                    {/* Achievement */}
                    <td className="px-4 xl:px-6 py-3 align-middle">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}>
                          {item.icon}
                        </div>
                        <span className="text-[13px] font-bold text-slate-800 leading-snug group-hover:text-[#4f3bf3] transition-colors truncate max-w-[200px]">{item.title}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 xl:px-6 py-3 align-middle">
                      <div className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold ${getCategoryStyles(item.category)}`}>
                        {item.category}
                      </div>
                    </td>

                    {/* Description */}
                    <td className="px-4 xl:px-6 py-3 align-middle">
                      <span className="text-[13px] font-bold text-slate-800 line-clamp-2 max-w-[220px]">{item.description}</span>
                    </td>

                    {/* Date */}
                    <td className="px-4 xl:px-6 py-3 align-middle">
                      <span className="text-[13px] font-bold text-slate-800">{item.date}</span>
                    </td>

                    {/* Status */}
                    <td className="px-4 xl:px-6 py-3 align-middle">
                      {item.status === 'Earned' && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50 w-fit">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">Earned</span>
                        </div>
                      )}
                      {item.status === 'In Progress' && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100/50 w-fit">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">In Progress</span>
                        </div>
                      )}
                      {item.status === 'Locked' && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200/50 w-fit">
                          <Lock className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">Locked</span>
                        </div>
                      )}
                    </td>

                    {/* Reward */}
                    <td className="px-4 xl:px-6 py-3 align-middle">
                      <span className="text-[13px] font-bold text-slate-800 truncate block max-w-[150px]">{item.reward}</span>
                    </td>

                    {/* Action */}
                    <td className="px-4 xl:px-6 py-3 align-middle rounded-r-xl text-right">
                      <button 
                        onClick={() => {
                          setSelectedAchievement(item);
                          setIsDetailsModalOpen(true);
                        }}
                        className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:text-[#1a1446] transition-colors whitespace-nowrap shadow-sm"
                      >
                        View Details
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            {/* Mobile Stacked Cards (Hidden on desktop) */}
            <div className="block lg:hidden w-full p-4 space-y-4">
              {filteredData.map((item, index) => (
                <div key={item.id} className="group p-4 flex flex-col gap-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 relative z-10">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}>
                        {item.icon}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-[#4f3bf3] transition-colors leading-tight line-clamp-2 pr-2">{item.title}</span>
                        <div className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider w-fit ${getCategoryStyles(item.category)}`}>
                          {item.category}
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0">
                      {item.status === 'Earned' && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Earned</span>
                        </div>
                      )}
                      {item.status === 'In Progress' && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100/50">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">In Progress</span>
                        </div>
                      )}
                      {item.status === 'Locked' && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200/50">
                          <Lock className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Locked</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="col-span-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Description</div>
                      <div className="text-[12px] font-medium text-slate-600">{item.description}</div>
                    </div>
                    <div className="pt-2 mt-2 border-t border-slate-200">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Achieved Date</div>
                      <div className="text-[12px] font-bold text-slate-800">{item.date}</div>
                    </div>
                    <div className="pt-2 mt-2 border-t border-slate-200">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reward</div>
                      <span className="text-[12px] font-bold text-slate-800 truncate block max-w-full">{item.reward}</span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1 w-full">
                    <button 
                      onClick={() => {
                        setSelectedAchievement(item);
                        setIsDetailsModalOpen(true);
                      }}
                      className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:text-[#1a1446] transition-colors shadow-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="py-12 flex flex-col items-center justify-center text-slate-400 w-full">
                <Search className="w-10 h-10 mb-3 opacity-20" />
                <p className="text-[14px] font-medium">No achievements found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer / Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 shrink-0 bg-white">
          <span className="text-[13px] font-medium text-slate-500">
            Showing 1 to {filteredData.length} of {filteredData.length} achievements
          </span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#4f3bf3] text-white font-bold text-[13px]">
              1
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      <AchievementDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        achievement={selectedAchievement}
      />
    </div>,
    document.body
  );
}
