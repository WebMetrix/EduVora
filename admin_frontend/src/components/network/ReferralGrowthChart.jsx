import React, { useState } from 'react';
import { Users } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const totalReferralsData = [
  { date: '01 Oct', value: 4200 },
  { date: '03 Oct', value: 6100 },
  { date: '05 Oct', value: 8300 },
  { date: '08 Oct', value: 7400 },
  { date: '10 Oct', value: 12200 },
  { date: '12 Oct', value: 9800 },
  { date: '15 Oct', value: 11100 },
  { date: '18 Oct', value: 13400 },
  { date: '20 Oct', value: 14600 },
  { date: '22 Oct', value: 13800 },
  { date: '25 Oct', value: 16200 },
  { date: '27 Oct', value: 18500 },
  { date: '29 Oct', value: 20400 },
  { date: '31 Oct', value: 24312 },
];

const level1Data = [
  { date: '01 Oct', value: 2800 },
  { date: '03 Oct', value: 4100 },
  { date: '05 Oct', value: 5600 },
  { date: '08 Oct', value: 4900 },
  { date: '10 Oct', value: 8200 },
  { date: '12 Oct', value: 6500 },
  { date: '15 Oct', value: 7400 },
  { date: '18 Oct', value: 9100 },
  { date: '20 Oct', value: 9800 },
  { date: '22 Oct', value: 9200 },
  { date: '25 Oct', value: 10900 },
  { date: '27 Oct', value: 12400 },
  { date: '29 Oct', value: 13800 },
  { date: '31 Oct', value: 16420 },
];

const level2Data = [
  { date: '01 Oct', value: 1400 },
  { date: '03 Oct', value: 2000 },
  { date: '05 Oct', value: 2700 },
  { date: '08 Oct', value: 2500 },
  { date: '10 Oct', value: 4000 },
  { date: '12 Oct', value: 3300 },
  { date: '15 Oct', value: 3700 },
  { date: '18 Oct', value: 4300 },
  { date: '20 Oct', value: 4800 },
  { date: '22 Oct', value: 4600 },
  { date: '25 Oct', value: 5300 },
  { date: '27 Oct', value: 6100 },
  { date: '29 Oct', value: 6600 },
  { date: '31 Oct', value: 7892 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white text-[11.5px] font-semibold px-3 py-2 rounded-xl shadow-xl border border-slate-700/60 animate-scale-in">
        <p className="text-slate-400 font-medium">{label}</p>
        <p className="text-white font-black text-[13px] mt-0.5">
          {Number(payload[0].value).toLocaleString()} Referrals
        </p>
      </div>
    );
  }
  return null;
};

export default function ReferralGrowthChart() {
  const [activeTab, setActiveTab] = useState('total');

  const currentData =
    activeTab === 'level1'
      ? level1Data
      : activeTab === 'level2'
        ? level2Data
        : totalReferralsData;

  const formatYAxis = (val) => {
    if (val === 0) return '0';
    return `${val / 1000}K`;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full w-full">
      {/* Decorative subtle hover flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/8 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Users className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-[15px] sm:text-[16px] font-black text-slate-900 tracking-tight">
            Referral Growth Trend
          </h3>
        </div>

        {/* Segmented Controls matching screenshot */}
        <div className="flex items-center bg-slate-50 border border-slate-200/80 rounded-xl p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab('total')}
            className={`px-3 py-1.5 rounded-lg text-[11.5px] font-bold transition-all cursor-pointer ${activeTab === 'total'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-indigo-600 hover:bg-white'
              }`}
          >
            Total Referrals
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('level1')}
            className={`px-3 py-1.5 rounded-lg text-[11.5px] font-bold transition-all cursor-pointer ${activeTab === 'level1'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-indigo-600 hover:bg-white'
              }`}
          >
            Level 1
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('level2')}
            className={`px-3 py-1.5 rounded-lg text-[11.5px] font-bold transition-all cursor-pointer ${activeTab === 'level2'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-indigo-600 hover:bg-white'
              }`}
          >
            Level 2
          </button>
        </div>
      </div>

      {/* Area Chart with flex-1 to fill card height evenly */}
      <div className="relative z-10 w-full flex-1 min-h-[220px] sm:min-h-[240px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="purpleAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={{ stroke: '#CBD5E1' }}
              tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }}
              dy={6}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
              domain={[0, 26000]}
              ticks={[0, 5000, 10000, 15000, 20000, 25000]}
              tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#7C3AED"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#purpleAreaGradient)"
              dot={{ stroke: '#7C3AED', strokeWidth: 2, fill: '#FFFFFF', r: 3.5 }}
              activeDot={{ stroke: '#7C3AED', strokeWidth: 2, fill: '#7C3AED', r: 6 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
