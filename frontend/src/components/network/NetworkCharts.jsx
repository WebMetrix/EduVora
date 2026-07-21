import { useTranslation } from '../../hooks/useTranslation';
import { Info, ChevronDown } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export default function NetworkCharts() {
  const { t } = useTranslation();

  // Mock data for Referral Growth
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

  // Mock data for Package Distribution
  const packageData = [
    { name: 'Gold Package', value: 20, percentage: '40.8%', color: '#eab308' },
    { name: 'Silver Package', value: 18, percentage: '36.7%', color: '#3b82f6' },
    { name: 'Diamond Package', value: 8, percentage: '16.3%', color: '#8b5cf6' },
    { name: 'Premium Package', value: 3, percentage: '6.1%', color: '#22c55e' },
  ];

  // Mock data for Registration Trend
  const registrationData = [
    { name: '01 May', value: 10 },
    { name: '', value: 15 },
    { name: '08 May', value: 16 },
    { name: '', value: 25 },
    { name: '15 May', value: 20 },
    { name: '', value: 31 },
    { name: '22 May', value: 28 },
    { name: '', value: 30 },
    { name: '29 May', value: 15 },
  ];

  const totalPackages = packageData.reduce((acc, curr) => acc + curr.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-100">
          <p className="text-[12px] font-bold text-slate-600 mb-1">{payload[0].payload.name || 'Value'}</p>
          <p className="text-[14px] font-extrabold text-slate-900">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-5">
      
      {/* 1. Referral Growth */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-5 relative overflow-hidden">
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

        <div className="h-[220px] w-full mt-2 -ml-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={referralData}>
              <defs>
                <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} dx={-10} domain={[0, 40]} ticks={[0, 10, 20, 30, 40]} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorPurple)" activeDot={{r: 6, fill: "#8b5cf6", stroke: "#fff", strokeWidth: 2}} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Package Distribution */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-5">
        <div className="flex items-center gap-1.5 mb-2 cursor-pointer">
          <h3 className="text-[15px] font-bold text-slate-900">{t('network.charts.packageDistribution')}</h3>
          <Info className="w-4 h-4 text-slate-400 hover:text-indigo-500 transition-colors" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between h-[220px] mt-4">
          {/* Donut Chart */}
          <div className="w-[180px] h-[180px] relative flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={packageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {packageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[24px] font-extrabold text-slate-900 leading-none">{totalPackages}</span>
              <span className="text-[12px] font-bold text-slate-500">{t('network.charts.total')}</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-3.5 w-full sm:w-[50%] mt-4 sm:mt-0">
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

      {/* 3. Registration Trend */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-5 relative overflow-hidden">
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex items-center gap-1.5 cursor-pointer">
            <h3 className="text-[15px] font-bold text-slate-900">{t('network.charts.registrationTrend')}</h3>
            <Info className="w-4 h-4 text-slate-400 hover:text-indigo-500 transition-colors" />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[12px] font-bold text-slate-600 hover:bg-slate-100 transition-colors">
            <span>{t('network.charts.thisMonth')}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <div className="absolute top-16 right-5 text-right z-10">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[12px] font-bold border border-emerald-100/50">
            ↑ 16%
          </div>
          <div className="text-[11px] font-medium text-slate-400 mt-1">{t('network.dashboard.vsLastMonth')}</div>
        </div>

        <div className="h-[220px] w-full mt-2 -ml-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={registrationData}>
              <defs>
                <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} dx={-10} domain={[0, 40]} ticks={[0, 10, 20, 30, 40]} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBlue)" activeDot={{r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2}} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
