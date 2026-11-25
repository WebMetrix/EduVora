import React, { useState } from 'react';
import { BarChart2, PieChart as PieIcon, Filter, ChevronDown } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

const MONTHLY_TREND = [
  { label: 'Apr 2026', value: 300 },
  { label: 'May 2026', value: 450 },
  { label: 'Jun 2026', value: 550 },
  { label: 'Jul 2026', value: 730 },
  { label: 'Aug 2026', value: 640 },
  { label: 'Sep 2026', value: 830 },
  { label: 'Oct 2026', value: 990 },
];

const WEEKLY_TREND = [
  { label: 'W1', value: 180 },
  { label: 'W2', value: 215 },
  { label: 'W3', value: 245 },
  { label: 'W4', value: 206 },
];

const LEVEL_DONUT_DATA = [
  { name: 'Level 1 (Direct)', count: '8,320', value: 8320, percentage: '66.8%', color: '#3B82F6' },
  { name: 'Level 2 (Indirect)', count: '4,130', value: 4130, percentage: '33.2%', color: '#8B5CF6' },
];

const FUNNEL_DATA = [
  { stage: 'Registered\nMembers', shortName: 'Registered Members', count: 1000, color: '#3B82F6' },
  { stage: 'Package\nPurchased', shortName: 'Package Purchased', count: 820, color: '#8B5CF6' },
  { stage: 'Package\nActivated', shortName: 'Package Activated', count: 720, color: '#10B981' },
];

const TrendTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white text-[11.5px] font-semibold px-3 py-2 rounded-xl shadow-xl border border-slate-700/60">
        <p className="text-slate-400 font-medium">{label}</p>
        <p className="text-white font-black text-[13px] mt-0.5">
          {Number(payload[0].value).toLocaleString()} Registrations
        </p>
      </div>
    );
  }
  return null;
};

const FunnelTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white text-[11.5px] font-semibold px-3 py-2 rounded-xl shadow-xl border border-slate-700/60">
        <p className="text-slate-400 font-medium">{item.shortName}</p>
        <p className="text-white font-black text-[13px] mt-0.5">
          {item.count.toLocaleString()} Members
        </p>
      </div>
    );
  }
  return null;
};

export default function ReferralAnalyticsCharts() {
  const [period, setPeriod] = useState('monthly');
  const trendData = period === 'weekly' ? WEEKLY_TREND : MONTHLY_TREND;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
      {/* Chart 1: Referral Registration Trend */}
      <div className="lg:col-span-4 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/8 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between gap-2 mb-3 shrink-0">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <BarChart2 className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[14px] sm:text-[15px] font-black text-slate-900 tracking-tight leading-tight">
                Referral Registration Trend
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                Platform-wide referral registrations over time.
              </p>
            </div>
          </div>

          <div className="relative shrink-0">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-indigo-300 rounded-xl pl-2.5 pr-6 py-1 text-[11px] font-bold text-slate-700 appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Area Chart */}
        <div className="relative z-10 w-full flex-1 min-h-[210px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="analyticsAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.7} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={{ stroke: '#CBD5E1' }}
                tick={{ fill: '#64748B', fontSize: 10, fontWeight: 600 }}
                dy={6}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                domain={[0, 1200]}
                ticks={[0, 300, 600, 900, 1200]}
                tickFormatter={(v) => v.toLocaleString()}
                tick={{ fill: '#64748B', fontSize: 10, fontWeight: 600 }}
              />
              <Tooltip content={<TrendTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366F1"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#analyticsAreaGradient)"
                dot={{ stroke: '#6366F1', strokeWidth: 2, fill: '#FFFFFF', r: 3.5 }}
                activeDot={{ stroke: '#6366F1', strokeWidth: 2, fill: '#6366F1', r: 5.5 }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Referral Level Distribution */}
      <div className="lg:col-span-4 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/8 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        {/* Header */}
        <div className="relative z-10 flex items-start gap-2.5 mb-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            <PieIcon className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-[14px] sm:text-[15px] font-black text-slate-900 tracking-tight leading-tight">
              Referral Level Distribution
            </h3>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
              Distribution of referred members by level.
            </p>
          </div>
        </div>

        {/* Donut + Legend */}
        <div className="relative z-10 flex-1 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-between gap-4 my-auto py-2">
          {/* Donut */}
          <div className="relative w-[150px] h-[150px] shrink-0 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={LEVEL_DONUT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={46}
                  outerRadius={68}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={2.5}
                  dataKey="value"
                  stroke="none"
                  isAnimationActive={false}
                >
                  {LEVEL_DONUT_DATA.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-[18px] font-black text-slate-900 leading-tight">
                12,450
              </span>
              <span className="text-[10px] font-bold text-slate-400 mt-0.5">
                Total Members
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 w-full space-y-3">
            {LEVEL_DONUT_DATA.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50/70 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="min-w-0">
                    <p className="text-[11.5px] font-bold text-slate-700 truncate">{item.name}</p>
                    <p className="text-[13px] font-black text-slate-900 mt-0.5">{item.count}</p>
                  </div>
                </div>
                <span className="text-[11.5px] font-bold text-slate-500 shrink-0">
                  {item.percentage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart 3: Registration to Activation Funnel */}
      <div className="lg:col-span-4 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/8 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        {/* Header */}
        <div className="relative z-10 flex items-start gap-2.5 mb-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            <Filter className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-[14px] sm:text-[15px] font-black text-slate-900 tracking-tight leading-tight">
              Registration to Activation Funnel
            </h3>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
              Conversion from registration to package activation.
            </p>
          </div>
        </div>

        {/* Conversion Step Badges */}
        <div className="relative z-10 flex items-center justify-around px-8 pt-1 -mb-1 text-[10.5px] font-black">
          <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs">
            82% ↘
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
            88% ↘
          </span>
        </div>

        {/* Funnel Bar Chart */}
        <div className="relative z-10 w-full flex-1 min-h-[195px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={FUNNEL_DATA}
              margin={{ top: 24, right: 8, left: -18, bottom: 10 }}
              barSize={46}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.7} />
              <XAxis
                dataKey="shortName"
                tickLine={false}
                axisLine={{ stroke: '#CBD5E1' }}
                interval={0}
                tick={({ x, y, payload }) => {
                  const words = (payload.value || '').split(' ');
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text
                        x={0}
                        y={0}
                        dy={12}
                        textAnchor="middle"
                        fill="#475569"
                        fontSize={10}
                        fontWeight={700}
                      >
                        <tspan x={0} dy={10}>{words[0]}</tspan>
                        <tspan x={0} dy={12}>{words.slice(1).join(' ')}</tspan>
                      </text>
                    </g>
                  );
                }}
                height={38}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                domain={[0, 1200]}
                ticks={[0, 300, 600, 900, 1200]}
                tickFormatter={(v) => v.toLocaleString()}
                tick={{ fill: '#64748B', fontSize: 10, fontWeight: 600 }}
              />
              <Tooltip content={<FunnelTooltip />} />
              <Bar
                dataKey="count"
                radius={[8, 8, 0, 0]}
                isAnimationActive={false}
                label={{
                  position: 'top',
                  fill: '#0F172A',
                  fontSize: 11.5,
                  fontWeight: 900,
                  offset: 6,
                  formatter: (v) => v.toLocaleString(),
                }}
              >
                {FUNNEL_DATA.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
