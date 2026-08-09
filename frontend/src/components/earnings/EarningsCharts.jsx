import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChevronDown } from 'lucide-react';

const areaData = [
  { name: '01 May', value: 2000 },
  { name: '06 May', value: 3500 },
  { name: '11 May', value: 5000 },
  { name: '16 May', value: 7500 },
  { name: '21 May', value: 6000 },
  { name: '26 May', value: 4500 },
  { name: '31 May', value: 8000 },
];

const pieData = [
  { name: 'Direct', value: 6250, color: '#4611E1' },
  { name: 'Level 1', value: 4850, color: '#8b5cf6' },
  { name: 'Level 2', value: 1250, color: '#a78bfa' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 shadow-xl rounded-xl p-3">
        <p className="text-[12px] font-bold text-slate-500 mb-1">{label}</p>
        <p className="text-[14px] font-extrabold text-indigo-600">
          ₹ {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function EarningsCharts({ t }) {
  const [filter, setFilter] = useState('This Month');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Area Chart Container */}
      <div className="lg:col-span-2 relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h2 className="text-[17px] font-extrabold text-slate-900">{t('earnings.charts.overview')}</h2>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            {t('earnings.charts.thisMonthFilter')}
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4611E1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4611E1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                tickFormatter={(value) => `${value / 1000}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#4611E1" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Small Stat Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-indigo-50/50 rounded-xl p-3 flex flex-col items-center justify-center border border-indigo-100/50">
            <span className="text-[11px] font-bold text-slate-500 mb-1">{t('earnings.charts.direct')}</span>
            <span className="text-[15px] font-extrabold text-indigo-700">₹ 6,250.00</span>
          </div>
          <div className="bg-green-50/50 rounded-xl p-3 flex flex-col items-center justify-center border border-green-100/50">
            <span className="text-[11px] font-bold text-slate-500 mb-1">{t('earnings.charts.levelCommission')}</span>
            <span className="text-[15px] font-extrabold text-slate-900">₹ 4,850.00</span>
          </div>
          <div className="bg-orange-50/50 rounded-xl p-3 flex flex-col items-center justify-center border border-orange-100/50">
            <span className="text-[11px] font-bold text-slate-500 mb-1">{t('earnings.charts.other')}</span>
            <span className="text-[15px] font-extrabold text-slate-900">₹ 1,250.00</span>
          </div>
        </div>
      </div>

      {/* Pie Chart Container */}
      <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />
        <h2 className="text-[17px] font-extrabold text-slate-900 mb-6 relative z-10">{t('earnings.charts.byLevel')}</h2>
        
        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          <div className="h-[200px] w-full relative mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`₹ ${value.toLocaleString()}`, 'Amount']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#4611E1', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[12px] font-bold text-slate-500">{t('earnings.charts.total')}</span>
              <span className="text-[15px] font-extrabold text-slate-900">₹ 12,350</span>
            </div>
          </div>

          {/* Legends */}
          <div className="flex flex-col gap-4 w-full px-4">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[12px] font-bold text-slate-700">{t(`earnings.charts.${item.name.toLowerCase().replace(' ', '')}Percent`)}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[12px] font-medium text-slate-500">₹ {item.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })} ({Math.round(item.value / 12350 * 100)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
