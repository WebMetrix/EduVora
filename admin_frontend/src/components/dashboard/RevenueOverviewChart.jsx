import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const dataMonthly = [
  { date: '1 Aug', packageSales: 22, commissions: 12 },
  { date: '5 Aug', packageSales: 6, commissions: 8 },
  { date: '10 Aug', packageSales: 16, commissions: 19 },
  { date: '15 Aug', packageSales: 18, commissions: 17 },
  { date: '20 Aug', packageSales: 35, commissions: 26 },
  { date: '25 Aug', packageSales: 44, commissions: 28 },
  { date: '31 Aug', packageSales: 62, commissions: 31 }
];

const dataWeekly = [
  { date: 'Week 1', packageSales: 35, commissions: 20 },
  { date: 'Week 2', packageSales: 55, commissions: 30 },
  { date: 'Week 3', packageSales: 70, commissions: 42 },
  { date: 'Week 4', packageSales: 90, commissions: 55 }
];

const dataDaily = [
  { date: 'Mon', packageSales: 15, commissions: 8 },
  { date: 'Tue', packageSales: 22, commissions: 14 },
  { date: 'Wed', packageSales: 28, commissions: 18 },
  { date: 'Thu', packageSales: 20, commissions: 12 },
  { date: 'Fri', packageSales: 38, commissions: 24 },
  { date: 'Sat', packageSales: 45, commissions: 30 },
  { date: 'Sun', packageSales: 32, commissions: 19 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const pkg = payload.find(p => p.dataKey === 'packageSales')?.value || 0;
    const comm = payload.find(p => p.dataKey === 'commissions')?.value || 0;
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-2 rounded-xl shadow-lg border border-slate-700/50 flex flex-col gap-1">
        <p className="text-slate-300 font-bold">{label}</p>
        <p className="text-[#a5b4fc]">Package Sales: ₹ {pkg}K</p>
        <p className="text-[#38bdf8]">Commissions: ₹ {comm}K</p>
        <p className="text-white font-extrabold pt-1 border-t border-slate-700">
          Total: ₹ {(pkg + comm).toFixed(0)}K
        </p>
      </div>
    );
  }
  return null;
};

export default function RevenueOverviewChart() {
  const [period, setPeriod] = useState('monthly');

  const chartData = period === 'daily' ? dataDaily : period === 'weekly' ? dataWeekly : dataMonthly;

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between">
      {/* Decorative hover gradient flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-purple-400/20 transition-colors duration-700" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <BarChart2 className="w-4 h-4" />
          </div>
          <h3 className="text-[14.5px] sm:text-[15px] font-extrabold text-slate-900 tracking-tight">
            Revenue Overview
          </h3>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center bg-white/80 backdrop-blur-md p-1 rounded-xl border border-indigo-100/80 shadow-2xs text-[11px] font-bold">
          {['daily', 'weekly', 'monthly'].map((tab) => (
            <button
              key={tab}
              onClick={() => setPeriod(tab)}
              className={`px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                period === tab
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative z-10 w-full h-[190px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.6} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(v) => `${v}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="packageSales" stackId="revenue" fill="#818cf8" radius={[0, 0, 0, 0]} maxBarSize={28} />
            <Bar dataKey="commissions" stackId="revenue" fill="#38bdf8" radius={[4, 4, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Legend */}
      <div className="relative z-10 flex items-center justify-center gap-6 pt-3 mt-1 border-t border-slate-200/60 text-[11.5px] font-semibold text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-xs bg-[#818cf8] shadow-2xs" />
          <span>Package Sales</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-xs bg-[#38bdf8] shadow-2xs" />
          <span>Commissions</span>
        </div>
      </div>
    </div>
  );
}
