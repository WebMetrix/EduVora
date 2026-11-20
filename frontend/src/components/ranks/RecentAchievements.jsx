import React from 'react';
import { Award, ChevronRight, CheckCircle2 } from 'lucide-react';
import { getAchievementIcon, formatRankDate } from '../../utils/rankHelper';

export default function RecentAchievements({ recentList = [], loading = false, onOpenModal }) {
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
            className="text-[13px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center transition-colors cursor-pointer"
          >
            View All History <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>

        {/* Table / List Content */}
        <div className="w-full overflow-x-auto flex-1 flex flex-col justify-between">
          <div className="min-w-[480px] w-full flex-1 flex flex-col">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2.5 bg-slate-50/80 rounded-xl mb-2.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-6">Achievement</div>
              <div className="col-span-3 text-center sm:text-left">Date</div>
              <div className="col-span-3 text-right">Status</div>
            </div>

            {/* Table Rows or Empty State */}
            {loading ? (
              <div className="flex flex-col gap-2 py-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-12 w-full bg-slate-50 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : recentList.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-2">
                  <Award className="w-6 h-6" />
                </div>
                <p className="text-[14px] font-bold text-slate-700">No achievements unlocked yet</p>
                <p className="text-[12px] font-medium text-slate-400 mt-0.5">
                  Complete milestone goals to earn badges and rewards!
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 flex-1 justify-between">
                {recentList.map((item) => {
                  const title = item.title || 'Milestone Unlocked';
                  const category = item.categoryName || item.category || 'General';
                  const dateStr = formatRankDate(item.earnedDate || item.date);
                  const iconName = item.iconName || 'Trophy';

                  return (
                    <div
                      key={item.id || item.achievementId}
                      className="grid grid-cols-12 gap-4 items-center px-4 py-2.5 hover:bg-slate-50/70 rounded-xl transition-colors border border-transparent hover:border-slate-100/80 group"
                    >
                      {/* Title & Category */}
                      <div className="col-span-6 flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-xs border border-slate-100 group-hover:scale-105 transition-transform ${item.iconBg || 'bg-slate-50'}`}>
                          {getAchievementIcon(iconName, "w-4 h-4")}
                        </div>
                        <div className="flex flex-col min-w-0 pr-2">
                          <span className="text-[13.5px] font-bold text-[#1a1446] truncate">{title}</span>
                          <span className="text-[11px] font-medium text-slate-400 truncate">{category}</span>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="col-span-3 flex items-center text-center sm:text-left">
                        <span className="text-[12.5px] font-semibold text-slate-600">{dateStr}</span>
                      </div>

                      {/* Status */}
                      <div className="col-span-3 flex items-center justify-end">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full w-fit shrink-0 border border-emerald-100/40">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="text-[10.5px] font-bold uppercase tracking-wider">Earned</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
