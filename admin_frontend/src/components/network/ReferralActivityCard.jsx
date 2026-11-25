import React, { useState } from 'react';
import { Clock } from 'lucide-react';

export default function ReferralActivityCard({ memberName, activities = [] }) {
  const [showAll, setShowAll] = useState(false);

  const visibleActivities = showAll ? activities : activities.slice(0, 4);

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full">
      <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-400/8 rounded-full blur-[65px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            <Clock className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-[14.5px] sm:text-[15.5px] font-black text-slate-900 tracking-tight leading-tight">
              Referral Activity
            </h3>
            <p className="text-[11.5px] text-slate-500 font-medium mt-0.5">
              Key referral-related activities for {memberName}.
            </p>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-5 space-y-4 flex-1">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200" />

          {visibleActivities.map((act, idx) => (
            <div key={idx} className="relative flex items-start justify-between gap-3">
              <span
                className={`absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white ${
                  act.dotColor || 'bg-emerald-500'
                }`}
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-[12.5px] font-extrabold text-slate-900 leading-tight">
                  {act.title}
                </h4>
                <p className="text-[11.5px] text-slate-500 font-medium mt-0.5 leading-snug">
                  {act.description}
                </p>
              </div>
              <div className="text-right shrink-0 text-[10.5px] font-semibold text-slate-400 leading-tight">
                <span className="block">{act.date}</span>
                <span className="block mt-0.5">{act.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Less */}
        {activities.length > 4 && (
          <div className="pt-3 mt-3 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="text-[11.5px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer transition-colors"
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
