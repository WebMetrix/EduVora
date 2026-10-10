import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Calendar, Gift, Star, FileText, List, Trophy, Info, CheckCircle2, Clock, Lock
} from 'lucide-react';

export default function AchievementDetailsModal({ isOpen, onClose, achievement }) {
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

  if (!isOpen || !achievement) return null;

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

  const isEarned = achievement.status === 'Earned';

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="w-full h-[90vh] md:h-auto md:max-h-[90vh] md:max-w-[850px] xl:max-w-[900px] bg-white md:rounded-[24px] rounded-t-3xl md:rounded-t-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 animate-slide-up md:animate-fade-in overflow-hidden">
        
        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden bg-white shrink-0">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-4 md:px-5 py-2.5 md:py-3 border-b border-slate-100 shrink-0 bg-white">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-[20px] md:text-[22px] font-extrabold text-[#1a1446]">Achievement Details</h2>
            <p className="text-[12px] md:text-[13px] font-medium text-slate-500">
              Detailed information about this achievement and your progress.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden min-h-0 bg-white custom-scrollbar">
          
          {/* Left Column (Main Details) - SCROLLABLE on Desktop */}
          <div className="flex-1 flex flex-col gap-4 lg:overflow-y-auto custom-scrollbar p-4 md:p-5 lg:pr-2 xl:pr-4">
              
              {/* Top Hero Card */}
              <div className="p-4 md:p-5 border border-slate-100 rounded-[20px] flex items-center gap-4 md:gap-5">
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shrink-0 shadow-sm ${achievement.iconBg || 'bg-yellow-50'}`}>
                  {React.cloneElement(achievement.icon, { className: "w-8 h-8 md:w-10 md:h-10 " + achievement.icon.props.className })}
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[20px] font-bold text-[#1a1446]">{achievement.title}</h3>
                    {isEarned && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 w-fit">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Earned</span>
                      </div>
                    )}
                    {achievement.status === 'In Progress' && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 w-fit">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">In Progress</span>
                      </div>
                    )}
                    {achievement.status === 'Locked' && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 w-fit">
                        <Lock className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Locked</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[14px] font-medium text-slate-600">{achievement.description}</p>
                  <div className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold w-fit mt-1 ${getCategoryStyles(achievement.category)}`}>
                    {achievement.category}
                  </div>
                </div>
              </div>

              {/* Three Mini Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <div className="p-3 md:p-4 border border-slate-100 rounded-[16px] flex flex-col gap-1.5 md:gap-2">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Calendar className="w-4 h-4 text-[#1a1446]" />
                    <span className="text-[12px] font-bold text-[#1a1446]">Achieved Date</span>
                  </div>
                  <span className="text-[13px] font-medium text-slate-500">{achievement.date || '-'}</span>
                </div>
                <div className="p-3 md:p-4 border border-slate-100 rounded-[16px] flex flex-col gap-1.5 md:gap-2">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Gift className="w-4 h-4 text-[#1a1446]" />
                    <span className="text-[12px] font-bold text-[#1a1446]">Reward</span>
                  </div>
                  <span className="text-[13px] font-medium text-slate-500 truncate">{achievement.reward || '-'}</span>
                </div>
                <div className="p-3 md:p-4 border border-slate-100 rounded-[16px] flex flex-col gap-1.5 md:gap-2">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Star className="w-4 h-4 text-[#1a1446]" />
                    <span className="text-[12px] font-bold text-[#1a1446]">Points</span>
                  </div>
                  <span className="text-[13px] font-medium text-slate-500">{achievement.points ? `+ ${achievement.points} Points` : '-'}</span>
                </div>
              </div>

              {/* Description Panel */}
              <div className="p-4 md:p-5 border border-slate-100 rounded-[16px] flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#1a1446]" />
                  <span className="text-[14px] md:text-[15px] font-extrabold text-[#1a1446]">Description</span>
                </div>
                <p className="text-[13px] md:text-[14px] font-medium text-slate-600 leading-relaxed">
                  {achievement.description}
                </p>
              </div>

              {/* Criteria Panel */}
              <div className="p-4 md:p-5 border border-slate-100 rounded-[16px] flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                  <List className="w-4 h-4 md:w-5 md:h-5 text-[#1a1446]" />
                  <span className="text-[14px] md:text-[15px] font-extrabold text-[#1a1446]">Criteria</span>
                </div>
                <p className="text-[13px] md:text-[14px] font-medium text-slate-600 leading-relaxed">
                  {achievement.criteria || 'Complete the required milestones to unlock this achievement.'}
                </p>
              </div>

              {/* Reward Panel */}
              <div className="p-4 md:p-5 border border-slate-100 rounded-[16px] flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-1">
                  <Gift className="w-4 h-4 md:w-5 md:h-5 text-[#1a1446]" />
                  <span className="text-[14px] md:text-[15px] font-extrabold text-[#1a1446]">Reward</span>
                </div>
                <div className="bg-slate-50 p-3 md:p-4 rounded-xl flex items-center gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0 border border-yellow-200">
                    <Gift className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[15px] font-bold text-[#1a1446]">{achievement.reward}</h4>
                    <p className="text-[13px] font-medium text-slate-500 leading-relaxed">
                      Awarded for completing your first package purchase.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (Sidebar Details) - FIXED on Desktop */}
            <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0 flex flex-col gap-4 p-4 md:p-5 lg:border-l lg:border-slate-100 bg-white lg:overflow-y-auto custom-scrollbar">
              
              {isEarned && (
                <div className="bg-indigo-50/70 border border-indigo-100 rounded-[16px] p-4 flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h4 className="text-[14px] font-extrabold text-[#1a1446]">Congratulations!</h4>
                    <p className="text-[12px] font-medium text-slate-500 leading-tight">
                      You have unlocked this achievement.
                    </p>
                  </div>
                </div>
              )}

              <div className="border border-slate-100 rounded-[16px] p-4 md:p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-5">
                  <Info className="w-4 h-4 md:w-5 md:h-5 text-[#1a1446]" />
                  <h4 className="text-[14px] md:text-[15px] font-extrabold text-[#1a1446]">Related Information</h4>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  
                  {/* Row */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="text-[13px] font-bold text-[#1a1446]">Category</span>
                    <div className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold ${getCategoryStyles(achievement.category)}`}>
                      {achievement.category}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="text-[13px] font-bold text-[#1a1446]">Status</span>
                    <div className="flex justify-end">
                      {isEarned && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 w-fit">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">Earned</span>
                        </div>
                      )}
                      {achievement.status === 'In Progress' && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 w-fit">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">In Progress</span>
                        </div>
                      )}
                      {achievement.status === 'Locked' && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 w-fit">
                          <Lock className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">Locked</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="text-[13px] font-bold text-[#1a1446]">Achieved Date</span>
                    <span className="text-[13px] font-medium text-slate-600">{achievement.date || '-'}</span>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="text-[13px] font-bold text-[#1a1446]">Reward</span>
                    <span className="text-[13px] font-medium text-slate-600 truncate max-w-[150px]">{achievement.reward || '-'}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#1a1446]">Points</span>
                    <span className="text-[13px] font-medium text-slate-600">{achievement.points || '-'}</span>
                  </div>

                </div>

                <div className="mt-auto pt-8">
                  <button 
                    onClick={onClose}
                    className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-[14px] font-bold transition-colors border border-slate-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }
