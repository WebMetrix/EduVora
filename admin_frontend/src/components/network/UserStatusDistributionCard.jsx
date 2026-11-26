import React from 'react';
import { GitFork } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function UserStatusDistributionCard() {
  const data = [
    { name: 'Active', count: '10,230', value: 10230, percentage: '79.6%', color: '#10B981' },
    { name: 'Inactive', count: '1,842', value: 1842, percentage: '14.3%', color: '#EF4444' },
    { name: 'Pending KYC', count: '614', value: 614, percentage: '4.8%', color: '#F59E0B' },
    { name: 'Suspended', count: '160', value: 160, percentage: '1.3%', color: '#6366F1' },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full w-full">
      {/* Decorative subtle hover flare */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/8 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <GitFork className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-[15px] sm:text-[16px] font-black text-slate-900 tracking-tight">
            User Status Distribution
          </h3>
        </div>
      </div>

      {/* Donut Chart & Legend Container with flex-1 to fill equal height */}
      <div className="relative z-10 flex-1 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-between gap-3 sm:gap-4 my-auto py-2">
        {/* Left: Donut Chart with Center Total */}
        <div className="relative w-[136px] h-[136px] sm:w-[144px] sm:h-[144px] shrink-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={62}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2.5}
                dataKey="value"
                stroke="none"
                isAnimationActive={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Total Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-[17px] sm:text-[18px] font-black text-slate-900 leading-tight">
              12,846
            </span>
            <span className="text-[10px] font-bold text-slate-400 leading-tight mt-0.5">
              Total Users
            </span>
          </div>
        </div>

        {/* Right: Legend Breakdown List */}
        <div className="flex-1 min-w-0 w-full space-y-2 flex flex-col justify-center">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2 text-[11.5px] sm:text-[12px] group/item hover:bg-slate-50/80 px-1.5 py-1.5 rounded-xl transition-colors">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs group-hover/item:scale-125 transition-transform"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-bold text-slate-700 truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-black text-slate-900 tabular-nums">{item.count}</span>
                <span className="text-slate-400 font-semibold min-w-[38px] text-right tabular-nums">{item.percentage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
