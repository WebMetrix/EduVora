import React, { useState } from 'react';
import { Users } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const dataMonthly = [
  { date: '1 Aug', users: 20 },
  { date: '5 Aug', users: 70 },
  { date: '10 Aug', users: 85 },
  { date: '15 Aug', users: 75 },
  { date: '20 Aug', users: 90 },
  { date: '25 Aug', users: 115 },
  { date: '31 Aug', users: 180 }
];

const dataWeekly = [
  { date: 'Week 1', users: 90 },
  { date: 'Week 2', users: 160 },
  { date: 'Week 3', users: 205 },
  { date: 'Week 4', users: 295 }
];

const dataDaily = [
  { date: 'Mon', users: 24 },
  { date: 'Tue', users: 38 },
  { date: 'Wed', users: 45 },
  { date: 'Thu', users: 32 },
  { date: 'Fri', users: 58 },
  { date: 'Sat', users: 65 },
  { date: 'Sun', users: 48 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-2 rounded-xl shadow-lg border border-slate-700/50">
        <p className="text-slate-300">{label}</p>
        <p className="text-white font-bold text-[12px]">{payload[0].value} Registrations</p>
      </div>
    );
  }
  return null;
};

export default function RegistrationTrendChart() {
  const [period, setPeriod] = useState('monthly');

  const chartData = period === 'daily' ? dataDaily : period === 'weekly' ? dataWeekly : dataMonthly;

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between">
      {/* Decorative hover gradient flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-indigo-400/20 transition-colors duration-700" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Users className="w-4 h-4" />
          </div>
          <h3 className="text-[14.5px] sm:text-[15px] font-extrabold text-slate-900 tracking-tight">
            User Registration Trend
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
      <div className="relative z-10 w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="userTrendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
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
              domain={[0, 200]}
              ticks={[0, 50, 100, 150, 200]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#6366f1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#userTrendGradient)"
              dot={{ stroke: '#6366f1', strokeWidth: 2, r: 3.5, fill: '#ffffff' }}
              activeDot={{ stroke: '#4f46e5', strokeWidth: 2, r: 5, fill: '#6366f1' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
