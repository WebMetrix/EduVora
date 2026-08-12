import { useTranslation } from '../../hooks/useTranslation';
import { Info, ChevronDown } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function NetworkCharts() {
  const { t } = useTranslation();
  const { charts, dashboardStats } = useSelector((state) => state.network);
  const [trendFilter, setTrendFilter] = useState('monthly');
  const registrationGrowth = dashboardStats?.[trendFilter]?.periodGrowthPercentage || 0;

  const getVsText = () => {
    if (trendFilter === 'quarterly') return t('network.dashboard.vsLastQuarter');
    if (trendFilter === 'yearly') return t('network.dashboard.vsLastYear');
    return t('network.dashboard.vsLastMonth');
  };

  // Mock data for Referral Growth (left hardcoded as requested)
  const referralData = [
    { name: '01 May', value: 10 },
    { name: '', value: 16 },
    { name: '08 May', value: 23 },
    { name: '', value: 19 },
    { name: '15 May', value: 16 },
    { name: '', value: 22 },
    { name: '22 May', value: 22 },
    { name: '', value: 31 },
    { name: '29 May', value: 15 },
  ];

  // Dynamic data for Package Distribution
  const packageColors = {
    'Bronze Package': '#d97706',
    'Silver Package': '#3b82f6',
    'Gold Package': '#eab308',
    'Diamond Package': '#8b5cf6',
    'Premium Package': '#22c55e',
    'Free/None': '#94a3b8'
  };

  const dbPackageList = charts?.packageDistribution || [];
  const totalPackages = dbPackageList.reduce((acc, curr) => acc + curr.value, 0);

  // Use exactly what the database returns. No hardcoded forcing!
  const allPackageNames = [...new Set([...dbPackageList.map(p => p.name)])];

  const packageData = allPackageNames.map(pkgName => {
    const dbPkg = dbPackageList.find(p => p.name === pkgName);
    const value = dbPkg ? dbPkg.value : 0;
    return {
      name: pkgName,
      value: value,
      color: packageColors[pkgName] || '#64748b',
      percentage: totalPackages > 0 ? ((value / totalPackages) * 100).toFixed(1) + '%' : '0.0%'
    };
  });

  // Dynamic data for Registration Trend based on Filter
  let rawRegistrationData = charts?.registrationTrend?.[trendFilter] || [];

  const generateTimeline = () => {
    const timeline = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (trendFilter === 'monthly') {
      // Current Calendar Month (e.g. 1 to 31)
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let i = 1; i <= daysInMonth; i++) {
        const d = new Date(year, month, i);
        // Manually format to match SQL "dd MMM" (e.g. "01 Aug")
        const dateStr = `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]}`;
        const existing = rawRegistrationData.find(item => item.date === dateStr);
        timeline.push(existing ? { ...existing, date: dateStr } : { date: dateStr, value: 0 });
      }
    } else if (trendFilter === 'quarterly') {
      // Last 3 Months including current (e.g. Jun, Jul, Aug)
      const now = new Date();
      for (let i = 2; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const dateStr = months[d.getMonth()]; // 'Jun'
        const existing = rawRegistrationData.find(item => item.date === dateStr);
        timeline.push(existing ? { ...existing, date: dateStr } : { date: dateStr, value: 0 });
      }
    } else if (trendFilter === 'yearly') {
      // Current Year (Jan to Dec)
      const now = new Date();
      const year = now.getFullYear();
      for (let i = 0; i < 12; i++) {
        const d = new Date(year, i, 1);
        const dateStr = months[d.getMonth()]; // 'Jan'
        const existing = rawRegistrationData.find(item => item.date === dateStr);
        timeline.push(existing ? { ...existing, date: dateStr } : { date: dateStr, value: 0 });
      }
    }
    return timeline;
  };

  const registrationData = generateTimeline();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-100">
          <p className="text-[12px] font-bold text-slate-600 mb-1">{payload[0].payload.name || payload[0].payload.date || t('network.charts.value')}</p>
          <p className="text-[14px] font-extrabold text-slate-900">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4 lg:gap-5 w-full">

      {/* 1. Referral Growth (Commented out as requested)
      <div className="flex-1 min-w-full lg:min-w-[calc(50%-10px)] xl:min-w-[30%] bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-5 relative overflow-hidden transition-all duration-300 hover:border-indigo-300 hover:shadow-md cursor-pointer group/card">
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex items-center gap-1.5 cursor-pointer">
            <h3 className="text-[15px] font-bold text-slate-900">{t('network.charts.referralGrowth')}</h3>
            <Info className="w-4 h-4 text-slate-400 hover:text-indigo-500 transition-colors" />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[12px] font-bold text-slate-600 hover:bg-slate-100 transition-colors">
            <span>{t('network.charts.thisMonth')}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="absolute top-16 right-5 text-right z-10">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[12px] font-bold border border-emerald-100/50">
            ↑ 18%
          </div>
          <div className="text-[11px] font-medium text-slate-400 mt-1">{t('network.dashboard.vsLastMonth')}</div>
        </div>

        <div className="h-[180px] w-full mt-4 -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={referralData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={5} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dx={-5} domain={[0, 40]} ticks={[0, 10, 20, 30, 40]} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorPurple)" activeDot={{ r: 6, fill: "#8b5cf6", stroke: "#fff", strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      */}

      {/* 2. Registration Trend */}
      <div className="flex-1 min-w-full lg:min-w-[calc(50%-10px)] xl:min-w-[30%] bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-5 relative overflow-hidden transition-all duration-300 hover:border-indigo-300 hover:shadow-md cursor-pointer group/card">
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex items-center gap-1.5 cursor-pointer">
            <h3 className="text-[15px] font-bold text-slate-900">{t('network.charts.registrationTrend')}</h3>
            <Info className="w-4 h-4 text-slate-400 hover:text-indigo-500 transition-colors" />
          </div>
          <div className="relative">
            <select
              value={trendFilter}
              onChange={(e) => setTrendFilter(e.target.value)}
              className="appearance-none flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[12px] font-bold text-slate-600 hover:bg-slate-100 transition-colors pr-8 focus:outline-none cursor-pointer"
            >
              <option value="monthly">{t('network.charts.thisMonth')}</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
          </div>
        </div>

        <div className="absolute top-16 right-5 text-right z-10">
          <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[12px] font-bold border ${registrationGrowth >= 0
            ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50'
            : 'bg-rose-50 text-rose-600 border-rose-100/50'
            }`}>
            {registrationGrowth >= 0 ? '↑' : '↓'} {Math.abs(registrationGrowth)}%
          </div>
          <div className="text-[11px] font-medium text-slate-400 mt-1">{getVsText()}</div>
        </div>

        <div className="h-[180px] w-full mt-4 -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={registrationData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                dy={5}
                minTickGap={trendFilter === 'yearly' ? 0 : 25}
                ticks={trendFilter === 'yearly' ? ['Mar', 'Jun', 'Sep', 'Dec'] : undefined}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dx={-5} allowDecimals={false} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBlue)" activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Package Distribution */}
      <div className="flex-1 min-w-full xl:min-w-[30%] relative overflow-hidden rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl p-5 border border-indigo-100/60 shadow-sm group/card transition-all duration-300 hover:shadow-md hover:border-indigo-300 hover:-translate-y-[2px] cursor-pointer">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

        <div className="relative z-10 flex items-center gap-1.5 mb-2 cursor-pointer">
          <h3 className="text-[15px] font-bold text-slate-900">{t('network.charts.packageDistribution')}</h3>
          <Info className="w-4 h-4 text-slate-400 hover:text-indigo-500 transition-colors" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between h-auto sm:h-[180px] mt-4 gap-4 sm:gap-0 xl:gap-2 2xl:gap-0">
          {/* Donut Chart */}
          <div className="w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] xl:w-[135px] xl:h-[135px] 2xl:w-[170px] 2xl:h-[170px] relative flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart style={{ outline: 'none' }}>
                <Pie
                  data={packageData}
                  cx="50%"
                  cy="50%"
                  innerRadius="65%"
                  outerRadius="85%"
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {packageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: 'none' }} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none drop-shadow-sm">
              <span className="text-[24px] sm:text-[26px] xl:text-[20px] 2xl:text-[26px] font-black text-slate-800 leading-none tracking-tight">{totalPackages}</span>
              <span className="text-[10px] sm:text-[11px] xl:text-[9px] 2xl:text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{t('network.charts.total')}</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2.5 sm:gap-3.5 xl:gap-2 2xl:gap-3.5 w-full sm:w-[50%] xl:w-[55%] 2xl:w-[50%] mt-2 sm:mt-0">
            {packageData.map((pkg, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pkg.color }}></div>
                  <span className="text-[12px] font-bold text-slate-600">{pkg.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-extrabold text-slate-900">{pkg.value}</span>
                  <span className="text-[11px] font-bold text-slate-400 w-12 text-right">({pkg.percentage})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
