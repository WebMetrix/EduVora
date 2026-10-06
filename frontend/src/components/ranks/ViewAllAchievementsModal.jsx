import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X, Search, ChevronDown, CheckCircle2, Clock, Lock,
  Trophy, Star, Users, DollarSign, Target, ArrowUpCircle,
  Calendar, FileText, List, Gift, ChevronLeft
} from 'lucide-react';

const ALL_ACHIEVEMENTS_DATA = [
  {
    id: 1,
    title: "First Package Sale",
    description: "Make your first package purchase.",
    criteria: "Complete a successful package purchase of any plan.",
    reward: "First Package Sale Badge",
    icon: <Trophy className="w-6 h-6 text-yellow-600" />,
    iconBg: "bg-yellow-50",
    status: "Earned",
    date: "10 Aug 2026",
    category: "Sales"
  },
  {
    id: 2,
    title: "First Direct Referral",
    description: "Get your first direct referral.",
    criteria: "Have one user register and purchase a package using your referral link.",
    reward: "First Referral Badge",
    icon: <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />,
    iconBg: "bg-yellow-50",
    status: "Earned",
    date: "12 Aug 2026",
    category: "Network"
  },
  {
    id: 3,
    title: "5 Direct Referrals",
    description: "Get 5 direct referrals.",
    criteria: "Have 5 users register and purchase a package using your referral link.",
    reward: "Team Builder Badge",
    icon: <Users className="w-6 h-6 text-emerald-600" />,
    iconBg: "bg-emerald-50",
    status: "Earned",
    date: "05 Sep 2026",
    category: "Network"
  },
  {
    id: 4,
    title: "10 Team Members",
    description: "Build a team of 10 eligible members.",
    criteria: "Have a total of 10 active package holders in your downline.",
    reward: "Leader Badge",
    icon: <Users className="w-6 h-6 text-blue-600" />,
    iconBg: "bg-blue-50",
    status: "In Progress",
    progress: 7,
    total: 10,
    category: "Network"
  },
  {
    id: 5,
    title: "25 Team Members",
    description: "Build a team of 25 eligible members.",
    criteria: "Have a total of 25 active package holders in your downline.",
    reward: "Elite Leader Badge",
    icon: <Users className="w-6 h-6 text-slate-500" />,
    iconBg: "bg-slate-100",
    status: "Locked",
    category: "Network"
  },
  {
    id: 6,
    title: "First Level 2 Member",
    description: "Get your first level 2 member.",
    criteria: "One of your direct referrals makes a successful referral.",
    reward: "Mentor Badge",
    icon: <Users className="w-6 h-6 text-emerald-600" />,
    iconBg: "bg-emerald-50",
    status: "Earned",
    date: "22 Aug 2026",
    category: "Network"
  },
  {
    id: 7,
    title: "First Commission",
    description: "Earn your first commission.",
    criteria: "Receive your first payout from a referral or team sale.",
    reward: "Earner Badge",
    icon: <DollarSign className="w-6 h-6 text-purple-600" />,
    iconBg: "bg-purple-50",
    status: "Earned",
    date: "28 Aug 2026",
    category: "Earnings"
  },
  {
    id: 8,
    title: "Commission Milestone",
    description: "Reach a defined commission milestone.",
    criteria: "Earn a total of ₹50,000 in commissions.",
    reward: "Top Earner Badge",
    icon: <Target className="w-6 h-6 text-orange-600" />,
    iconBg: "bg-orange-50",
    status: "Locked",
    category: "Earnings"
  },
  {
    id: 9,
    title: "Rank Achievement",
    description: "Achieve a higher rank.",
    criteria: "Reach Gold Rank.",
    reward: "Gold Rank Badge",
    icon: <ArrowUpCircle className="w-6 h-6 text-indigo-600" />,
    iconBg: "bg-indigo-50",
    status: "Earned",
    date: "15 Sep 2026",
    category: "Rank"
  },
  {
    id: 10,
    title: "Team Growth Milestone",
    description: "Reach a team growth target.",
    criteria: "Achieve 50 total team members.",
    reward: "Growth Master Badge",
    icon: <ArrowUpCircle className="w-6 h-6 text-pink-600" />,
    iconBg: "bg-pink-50",
    status: "Locked",
    category: "Network"
  }
];

export default function ViewAllAchievementsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedAchievement, setSelectedAchievement] = useState(ALL_ACHIEVEMENTS_DATA[0]);
  const [showMobileDetails, setShowMobileDetails] = useState(false);

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
    { id: 'All', label: `All (${ALL_ACHIEVEMENTS_DATA.length})` },
    { id: 'Earned', label: `Earned (${ALL_ACHIEVEMENTS_DATA.filter(a => a.status === 'Earned').length})` },
    { id: 'In Progress', label: `In Progress (${ALL_ACHIEVEMENTS_DATA.filter(a => a.status === 'In Progress').length})` },
    { id: 'Locked', label: `Locked (${ALL_ACHIEVEMENTS_DATA.filter(a => a.status === 'Locked').length})` }
  ];

  const categories = ['All Categories', 'Sales', 'Network', 'Earnings', 'Rank'];

  const filteredAchievements = ALL_ACHIEVEMENTS_DATA.filter(a => {
    const matchesTab = activeTab === 'All' || a.status === activeTab;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All Categories' || a.category === selectedCategory;
    return matchesTab && matchesSearch && matchesCat;
  });

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-6 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="w-full h-[90vh] md:h-auto md:max-h-[85vh] md:max-w-[1000px] bg-white md:rounded-[24px] rounded-t-3xl md:rounded-t-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 animate-slide-up md:animate-fade-in overflow-hidden">

        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden bg-white shrink-0">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-4 md:px-5 py-2.5 md:py-3 border-b border-slate-100 shrink-0 bg-white">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-[20px] md:text-[22px] font-extrabold text-[#1a1446]">All Achievements</h2>
            <p className="text-[12px] md:text-[13px] font-medium text-slate-500">
              Complete milestones and unlock achievements on your journey.
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
        <div className="flex flex-col xl:flex-row xl:items-center justify-between px-4 md:px-5 py-2.5 border-b border-slate-100 gap-3 shrink-0">
          {/* Tabs */}
          <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-1 xl:pb-0 gap-2 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 md:px-4 py-2 rounded-xl text-[12px] font-bold whitespace-nowrap transition-all ${activeTab === tab.id
                  ? 'bg-[#4f3bf3] text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Select */}
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full xl:w-auto">
            <div className="relative w-full sm:w-[220px] md:w-[260px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search achievements..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-[12px] font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
              />
            </div>

            <div className="relative w-full sm:w-[150px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all cursor-pointer"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 bg-white">

          {/* Left: Cards Grid */}
          <div className={`flex-1 overflow-y-auto custom-scrollbar p-4 md:p-5 pr-2 md:pr-4 ${showMobileDetails ? 'hidden md:block' : 'block'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredAchievements.map((item) => {
                const isSelected = selectedAchievement.id === item.id;

                // Determine border color based on status and selection
                let borderColor = "border-slate-100";
                if (isSelected) {
                  if (item.status === 'Earned') borderColor = "border-yellow-300 ring-2 ring-yellow-300/20";
                  else if (item.status === 'In Progress') borderColor = "border-indigo-300 ring-2 ring-indigo-300/20";
                  else borderColor = "border-slate-300 ring-2 ring-slate-300/20";
                } else {
                  if (item.status === 'Earned') borderColor = "border-yellow-200/50 hover:border-yellow-300";
                  else if (item.status === 'In Progress') borderColor = "border-indigo-100 hover:border-indigo-200";
                  else borderColor = "border-slate-100 hover:border-slate-200";
                }

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedAchievement(item);
                      setShowMobileDetails(true);
                    }}
                    className={`bg-white rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col gap-3 relative border ${borderColor}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}>
                        {React.cloneElement(item.icon, { className: item.icon.props.className.replace('w-6 h-6', 'w-5 h-5') })}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-[13px] font-extrabold text-[#1a1446] leading-tight line-clamp-1">{item.title}</h4>
                        <p className="text-[11px] font-medium text-slate-500 leading-snug line-clamp-2">{item.description}</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-2 flex flex-col gap-3">
                      {item.status === 'In Progress' && (
                        <div className="w-full flex items-center gap-3">
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex-1">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(item.progress / item.total) * 100}%` }} />
                          </div>
                          <span className="text-[12px] font-bold text-[#1a1446]">{item.progress} / {item.total}</span>
                        </div>
                      )}

                      <div className="flex items-end justify-between">
                        {item.status === 'Earned' && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600">
                            <CheckCircle2 className="w-3 h-3" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">Earned</span>
                          </div>
                        )}
                        {item.status === 'In Progress' && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600">
                            <Clock className="w-3 h-3" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">In Progress</span>
                          </div>
                        )}
                        {item.status === 'Locked' && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-500">
                            <Lock className="w-3 h-3" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">Locked</span>
                          </div>
                        )}

                        {item.date && (
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold">{item.date}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredAchievements.length === 0 && (
                <div className="col-span-full py-10 flex flex-col items-center justify-center text-slate-400">
                  <Search className="w-10 h-10 mb-3 opacity-20" />
                  <p className="text-[14px] font-medium">No achievements found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Selected Achievement Details */}
          <div className={`flex-1 md:flex-none md:w-[310px] xl:w-[330px] md:shrink-0 bg-slate-50/70 border border-slate-100 rounded-[20px] m-4 md:my-4 md:mr-4 md:ml-2 p-4 flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${showMobileDetails ? 'flex' : 'hidden md:flex'}`}>

            {/* Mobile Back Button */}
            <button
              onClick={() => setShowMobileDetails(false)}
              className="md:hidden flex items-center gap-1.5 text-slate-500 font-bold text-[13px] mb-4 hover:text-[#1a1446] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back to achievements
            </button>

            <div className="flex flex-col items-center text-center mb-4 pt-1">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${selectedAchievement.iconBg} relative`}>
                {/* Decorative glow */}
                <div className={`absolute inset-0 rounded-full blur-xl opacity-50 ${selectedAchievement.iconBg}`} />
                <div className="relative z-10 scale-[1.1]">
                  {selectedAchievement.icon}
                </div>
              </div>

              <h3 className="text-[17px] font-extrabold text-[#1a1446] mb-2">
                {selectedAchievement.title}
              </h3>

              {selectedAchievement.status === 'Earned' && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Earned</span>
                </div>
              )}
              {selectedAchievement.status === 'In Progress' && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">In Progress</span>
                </div>
              )}
              {selectedAchievement.status === 'Locked' && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 shadow-sm">
                  <Lock className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Locked</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {/* Details List */}
              {selectedAchievement.date && (
                <div className="flex gap-2.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-[#1a1446] mb-0.5">Achieved Date</span>
                    <span className="text-[12px] font-medium text-slate-500 leading-tight">{selectedAchievement.date}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-2.5">
                <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#1a1446] mb-0.5">Description</span>
                  <span className="text-[12px] font-medium text-slate-500 leading-tight">{selectedAchievement.description}</span>
                </div>
              </div>

              <div className="flex gap-2.5">
                <List className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#1a1446] mb-0.5">Criteria</span>
                  <span className="text-[12px] font-medium text-slate-500 leading-tight">{selectedAchievement.criteria}</span>
                </div>
              </div>

              <div className="flex gap-2.5">
                <Gift className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#1a1446] mb-0.5">Reward</span>
                  <span className="text-[12px] font-medium text-slate-500 leading-tight">{selectedAchievement.reward}</span>
                </div>
              </div>
            </div>

            {/* Bottom Banner */}
            <div className="mt-auto pt-4">
              {selectedAchievement.status === 'Earned' && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-emerald-100">
                    <Trophy className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-extrabold text-emerald-900">Congratulations!</span>
                    <span className="text-[11px] font-medium text-emerald-700 leading-tight">You have unlocked this.</span>
                  </div>
                </div>
              )}
              {selectedAchievement.status === 'Locked' && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                    <Lock className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-extrabold text-slate-700">Locked</span>
                    <span className="text-[11px] font-medium text-slate-500 leading-tight">Keep working to unlock.</span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}
