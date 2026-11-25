import React from 'react';
import { Users } from 'lucide-react';

export default function ReferralLevelTable() {
  const rows = [
    {
      level: 'Level 1 (Direct)',
      totalUsers: '8,420',
      totalReferrals: '16,420',
      directReferrals: '16,420',
      indirectReferrals: '-',
      activeUsers: '6,842',
      inactiveUsers: '1,132',
      suspendedUsers: '86',
      badge: 'bg-purple-100 text-purple-700',
    },
    {
      level: 'Level 2 (Indirect)',
      totalUsers: '4,426',
      totalReferrals: '7,892',
      directReferrals: '-',
      indirectReferrals: '7,892',
      activeUsers: '3,388',
      inactiveUsers: '710',
      suspendedUsers: '74',
      badge: 'bg-blue-100 text-blue-700',
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group">
      {/* Decorative subtle hover flare */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-400/8 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-all duration-700" />

      {/* Header */}
      <div className="relative z-10 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Users className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-[15px] sm:text-[16px] font-black text-slate-900 tracking-tight">
            Referral Overview by Level
          </h3>
        </div>
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="relative z-10 hidden md:block overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-[12px] whitespace-nowrap">
          <thead>
            <tr className="border-b border-slate-200/60 text-slate-400 font-bold bg-slate-50/50">
              <th className="py-3 px-4 font-semibold">Level</th>
              <th className="py-3 px-4 font-semibold">Total Users</th>
              <th className="py-3 px-4 font-semibold">Total Referrals</th>
              <th className="py-3 px-4 font-semibold">Direct Referrals</th>
              <th className="py-3 px-4 font-semibold">Indirect Referrals</th>
              <th className="py-3 px-4 font-semibold">Active Users</th>
              <th className="py-3 px-4 font-semibold">Inactive Users</th>
              <th className="py-3 px-4 font-semibold">Suspended Users</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-100/30">
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className="group border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300 cursor-pointer"
              >
                <td className="py-3 px-4 font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-extrabold mr-2 ${row.badge}`}>
                    {row.level}
                  </span>
                </td>
                <td className="py-3 px-4 font-bold text-slate-800">{row.totalUsers}</td>
                <td className="py-3 px-4 font-bold text-slate-800">{row.totalReferrals}</td>
                <td className="py-3 px-4 font-bold text-slate-800">{row.directReferrals}</td>
                <td className="py-3 px-4 font-bold text-slate-800">{row.indirectReferrals}</td>
                <td className="py-3 px-4 font-bold text-emerald-600">{row.activeUsers}</td>
                <td className="py-3 px-4 font-medium text-slate-500">{row.inactiveUsers}</td>
                <td className="py-3 px-4 font-medium text-rose-500">{row.suspendedUsers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View (< md) */}
      <div className="relative z-10 md:hidden p-3.5 space-y-3">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl border border-slate-200/80 bg-white/90 shadow-2xs space-y-2.5 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className={`px-2.5 py-0.5 rounded-lg text-[11.5px] font-black ${row.badge}`}>
                {row.level}
              </span>
              <span className="text-[11.5px] font-extrabold text-slate-900">
                {row.totalUsers} Users
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11.5px]">
              <div>
                <span className="text-slate-400 block font-medium">Total Referrals</span>
                <span className="font-bold text-slate-800">{row.totalReferrals}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Direct / Indirect</span>
                <span className="font-bold text-slate-800">
                  {row.directReferrals !== '-' ? row.directReferrals : row.indirectReferrals}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Active Users</span>
                <span className="font-bold text-emerald-600">{row.activeUsers}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Inactive / Suspended</span>
                <span className="font-bold text-slate-600">{row.inactiveUsers} / {row.suspendedUsers}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
