import React from 'react';
import { GitFork } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell
} from 'recharts';

const data = [
  { level: 'Level 1\n(Direct)', name: 'Level 1 (Direct)', count: 16420, label: '16,420', color: '#8B5CF6' },
  { level: 'Level 2\n(Indirect)', name: 'Level 2 (Indirect)', count: 7892, label: '7,892', color: '#60A5FA' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white text-[11.5px] font-semibold px-3 py-2 rounded-xl shadow-xl border border-slate-700/60 animate-scale-in">
        <p className="text-slate-400 font-medium">{item.name}</p>
        <p className="text-white font-black text-[13px] mt-0.5">
          {item.count.toLocaleString()} Referrals
        </p>
      </div>
    );
  }
  return null;
};

export default function ReferralLevelBarChart() {
  const formatYAxis = (val) => {
    if (val === 0) return '0';
    return `${val / 1000}K`;
  };

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
          <h3 className="text-[14.5px] sm:text-[15px] font-black text-slate-900 tracking-tight">
            Referral Level Distribution
          </h3>
        </div>
      </div>

      {/* Bar Chart Area with flex-1 to fill equal height */}
      <div className="relative z-10 w-full flex-1 min-h-[220px] pt-1 flex flex-col justify-end">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 25, right: 10, left: -20, bottom: 5 }} barSize={54}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: '#CBD5E1' }}
              tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }}
              dy={6}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
              domain={[0, 18000]}
              ticks={[0, 3000, 6000, 9000, 12000]}
              tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              radius={[10, 10, 0, 0]}
              isAnimationActive={false}
              label={{
                position: 'top',
                fill: '#0F172A',
                fontSize: 12,
                fontWeight: 900,
                offset: 8,
                formatter: (val) => val.toLocaleString(),
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
