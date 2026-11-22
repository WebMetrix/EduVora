import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function StatusDonutCard({
  title,
  icon: Icon,
  total,
  items = [],
  viewAllLink = '#',
  onViewAll
}) {
  const chartData = items.map((item) => ({
    name: item.label,
    value: item.count,
    color: item.color
  }));

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
      {/* Decorative hover gradient flare */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/10 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
              <Icon className="w-3.5 h-3.5" />
            </div>
          )}
          <h3 className="text-[14px] sm:text-[15px] font-extrabold text-slate-900 tracking-tight">
            {title}
          </h3>
        </div>
        {onViewAll ? (
          <button
            type="button"
            onClick={onViewAll}
            className="text-[11.5px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer focus:outline-none"
          >
            View All
          </button>
        ) : (
          <a
            href={viewAllLink}
            className="text-[11.5px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
          >
            View All
          </a>
        )}
      </div>

      {/* Content: Donut Chart on Left, Legend on Right */}
      <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4 my-auto">
        {/* Left: Donut Chart with Center Text */}
        <div className="relative w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] shrink-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={38}
                outerRadius={54}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Total Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[16px] sm:text-[18px] font-black text-slate-900 leading-tight">
              {total}
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              Total
            </span>
          </div>
        </div>

        {/* Right: Legend Breakdown List */}
        <div className="flex-1 flex flex-col gap-1.5 sm:gap-2 min-w-0 pr-1">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-[11px] sm:text-[12px] font-medium">
              {/* Dot & Label */}
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 truncate font-semibold">
                  {item.label}
                </span>
              </div>

              {/* Count & Percentage */}
              <div className="flex items-center gap-2 shrink-0 font-extrabold">
                <span className="text-slate-900">
                  {item.count}
                </span>
                <span className="text-slate-400 font-bold w-8 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
