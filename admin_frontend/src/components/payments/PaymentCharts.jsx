import React, { useState } from 'react';
import { TrendingUp, Wallet } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell
} from 'recharts';

const PAYMENT_TREND_DATA = [
  { date: '01 Oct', amount: 155000, txns: 62 },
  { date: '02 Oct', amount: 195000, txns: 78 },
  { date: '04 Oct', amount: 280000, txns: 108 },
  { date: '06 Oct', amount: 215000, txns: 84 },
  { date: '07 Oct', amount: 190000, txns: 74 },
  { date: '09 Oct', amount: 260000, txns: 98 },
  { date: '10 Oct', amount: 295000, txns: 112 },
  { date: '12 Oct', amount: 245000, txns: 91 },
  { date: '13 Oct', amount: 205000, txns: 79 },
  { date: '14 Oct', amount: 250000, txns: 95 },
  { date: '15 Oct', amount: 258000, txns: 99 },
  { date: '16 Oct', amount: 195000, txns: 72 },
  { date: '18 Oct', amount: 205000, txns: 77 },
  { date: '19 Oct', amount: 295000, txns: 114 },
  { date: '21 Oct', amount: 268000, txns: 101 },
  { date: '22 Oct', amount: 248000, txns: 94 },
  { date: '23 Oct', amount: 315000, txns: 121 },
  { date: '24 Oct', amount: 235000, txns: 88 },
  { date: '25 Oct', amount: 252000, txns: 96 },
  { date: '27 Oct', amount: 292000, txns: 110 },
  { date: '28 Oct', amount: 312000, txns: 118 },
  { date: '29 Oct', amount: 325000, txns: 124 },
  { date: '30 Oct', amount: 230000, txns: 87 },
  { date: '31 Oct', amount: 268000, txns: 102 },
];

const PAYMENT_METHODS_DONUT = [
  { name: 'UPI', value: 1662410, pct: '58.4%', amount: '₹16,62,410', color: '#4F46E5' },
  { name: 'Credit Card', value: 517330, pct: '18.2%', amount: '₹5,17,330', color: '#0EA5E9' },
  { name: 'Debit Card', value: 344760, pct: '12.1%', amount: '₹3,44,760', color: '#22C55E' },
  { name: 'Net Banking', value: 244010, pct: '8.6%', amount: '₹2,44,010', color: '#F59E0B' },
  { name: 'Wallet', value: 78360, pct: '2.7%', amount: '₹78,360', color: '#A855F7' },
];

const CustomTrendTooltip = ({ active, payload, label, metric }) => {
  if (!active || !payload || !payload.length) return null;
  const val = payload[0].value;
  return (
    <div className="bg-slate-900 text-white px-3 py-2 rounded-xl shadow-xl border border-slate-700/60">
      <p className="text-[10.5px] font-semibold text-slate-300">{label} 2026</p>
      <p className="text-[13px] font-black mt-0.5">
        {metric === 'amount' ? `₹${Number(val).toLocaleString('en-IN')}` : `${val} Transactions`}
      </p>
    </div>
  );
};

export default function PaymentCharts() {
  const [metric, setMetric] = useState('amount'); // 'amount' | 'txns'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
      {/* Left: Payment Trend Area Chart */}
      <div className="lg:col-span-7 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/8 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
              <TrendingUp className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h3 className="text-[15px] sm:text-[16px] font-black text-indigo-700 tracking-tight">
              Payment Trend
            </h3>
          </div>

          <div className="inline-flex items-center p-1 bg-slate-100/80 border border-slate-200/70 rounded-xl">
            <button
              type="button"
              onClick={() => setMetric('amount')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                metric === 'amount'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              Amount (₹)
            </button>
            <button
              type="button"
              onClick={() => setMetric('txns')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                metric === 'txns'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              Transactions
            </button>
          </div>
        </div>

        <div className="relative z-10 w-full flex-1 min-h-[210px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={PAYMENT_TREND_DATA}
              margin={{ top: 10, right: 10, left: metric === 'amount' ? 6 : -14, bottom: 0 }}
            >
              <defs>
                <linearGradient id="paymentTrendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.7} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={{ stroke: '#CBD5E1' }}
                interval={2}
                tick={{ fill: '#64748B', fontSize: 10, fontWeight: 600 }}
                dy={6}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                domain={metric === 'amount' ? [0, 500000] : [0, 150]}
                ticks={
                  metric === 'amount'
                    ? [0, 100000, 200000, 300000, 400000, 500000]
                    : [0, 30, 60, 90, 120, 150]
                }
                tickFormatter={(v) =>
                  metric === 'amount' ? v.toLocaleString('en-IN') : String(v)
                }
                tick={{ fill: '#64748B', fontSize: 10, fontWeight: 600 }}
              />
              <Tooltip content={<CustomTrendTooltip metric={metric} />} />
              <Area
                type="monotone"
                dataKey={metric}
                stroke="#6366F1"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#paymentTrendFill)"
                dot={{ stroke: '#6366F1', strokeWidth: 2, fill: '#FFFFFF', r: 3 }}
                activeDot={{ stroke: '#6366F1', strokeWidth: 2, fill: '#6366F1', r: 5 }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right: Payments by Method Donut */}
      <div className="lg:col-span-5 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/8 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        <div className="relative z-10 flex items-center gap-2.5 mb-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
            <Wallet className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-[15px] sm:text-[16px] font-black text-indigo-700 tracking-tight">
            Payments by Method
          </h3>
        </div>

        {/* Donut + Legend - stacks on narrow lg, side-by-side on sm and xl+ so percentages never clip */}
        <div className="relative z-10 flex-1 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-between gap-3.5 xl:gap-4 my-auto py-1">
          <div className="relative w-[138px] h-[138px] sm:w-[144px] sm:h-[144px] shrink-0 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PAYMENT_METHODS_DONUT}
                  cx="50%"
                  cy="50%"
                  innerRadius={43}
                  outerRadius={63}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                  isAnimationActive={false}
                >
                  {PAYMENT_METHODS_DONUT.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-2">
              <span className="text-[13px] sm:text-[14px] font-black text-slate-900 leading-tight">
                ₹28,46,870
              </span>
              <span className="text-[10px] font-bold text-slate-400 mt-0.5">Total</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 w-full space-y-1.5">
            {PAYMENT_METHODS_DONUT.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-2 text-[11.5px] px-1.5 py-1 rounded-lg hover:bg-slate-50/90 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-sm shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-bold text-slate-700 truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-2.5 shrink-0 tabular-nums">
                  <span className="text-slate-500 font-semibold">{item.pct}</span>
                  <span className="font-black text-slate-900 min-w-[66px] text-right">
                    {item.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
