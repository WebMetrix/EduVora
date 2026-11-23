import React, { useState } from 'react';
import { Users, Calendar, Package } from 'lucide-react';
import UserDetailsModal from './UserDetailsModal';

const usersData = [
  {
    id: 1,
    userId: 'EVU001248',
    name: 'Rajesh Kumar',
    initials: 'RK',
    initialsBg: 'bg-purple-100 text-purple-700',
    package: 'Starter',
    regDate: '31 Aug 2026',
    status: 'Active'
  },
  {
    id: 2,
    userId: 'EVU001247',
    name: 'Priya Sharma',
    initials: 'PS',
    initialsBg: 'bg-blue-100 text-blue-700',
    package: 'Advanced',
    regDate: '31 Aug 2026',
    status: 'Active'
  },
  {
    id: 3,
    userId: 'EVU001246',
    name: 'Arjun Mehta',
    initials: 'AM',
    initialsBg: 'bg-emerald-100 text-emerald-700',
    package: 'Pro',
    regDate: '30 Aug 2026',
    status: 'Active'
  },
  {
    id: 4,
    userId: 'EVU001245',
    name: 'Sneha Iyer',
    initials: 'SI',
    initialsBg: 'bg-indigo-100 text-indigo-700',
    package: 'Basic',
    regDate: '30 Aug 2026',
    status: 'Active'
  },
  {
    id: 5,
    userId: 'EVU001244',
    name: 'Vikram Singh',
    initials: 'VS',
    initialsBg: 'bg-amber-100 text-amber-700',
    package: 'Starter',
    regDate: '29 Aug 2026',
    status: 'Inactive'
  }
];

export default function RecentUsersTable({ onViewAll }) {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 p-3.5 sm:p-4 lg:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full">
      {/* Decorative hover gradient flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-indigo-400/20 transition-colors duration-700" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-2.5 sm:mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Users className="w-4 h-4" />
          </div>
          <h3 className="text-[14.5px] sm:text-[15px] font-extrabold text-slate-900 tracking-tight">
            Recent Users
          </h3>
        </div>
        {onViewAll ? (
          <button
            type="button"
            onClick={onViewAll}
            className="text-[11.5px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer focus:outline-none"
          >
            View All
          </button>
        ) : (
          <a
            href="#"
            className="text-[11.5px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
          >
            View All
          </a>
        )}
      </div>

      {/* Desktop View Table (hidden on mobile) */}
      <div className="relative z-10 hidden md:block overflow-hidden">
        <table className="w-full text-left text-[11.5px] sm:text-[12px] whitespace-nowrap">
          <colgroup>
            <col className="w-[6%]" />
            <col className="w-[18%]" />
            <col className="w-[30%]" />
            <col className="w-[16%]" />
            <col className="w-[18%]" />
            <col className="w-[12%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-slate-200/60 text-slate-400 font-bold">
              <th className="py-2 sm:py-2.5 px-2 font-semibold text-center">#</th>
              <th className="py-2 sm:py-2.5 px-2 font-semibold">User ID</th>
              <th className="py-2 sm:py-2.5 px-2 font-semibold">Name</th>
              <th className="py-2 sm:py-2.5 px-2 font-semibold">Package</th>
              <th className="py-2 sm:py-2.5 px-2 font-semibold">Registration Date</th>
              <th className="py-2 sm:py-2.5 px-2 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-100/30">
            {usersData.map((user) => (
              <tr
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="group border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300 cursor-pointer"
              >
                <td className="py-2 sm:py-2.5 px-2 text-slate-400 font-medium text-center rounded-l-xl">{user.id}</td>
                <td className="py-2 sm:py-2.5 px-2 font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors tracking-tight">{user.userId}</td>
                <td className="py-2 sm:py-2.5 px-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 shadow-2xs transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xs ${user.initialsBg}`}
                    >
                      {user.initials}
                    </span>
                    <span className="font-bold text-slate-900 group-hover:text-indigo-950 transition-colors truncate">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="py-2 sm:py-2.5 px-2 text-slate-600 font-semibold">{user.package}</td>
                <td className="py-2 sm:py-2.5 px-2 text-slate-500 font-medium">{user.regDate}</td>
                <td className="py-2 sm:py-2.5 px-2 text-center rounded-r-xl">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold border inline-flex items-center shadow-2xs transition-transform duration-300 group-hover:scale-105 ${user.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                      : 'bg-rose-50 text-rose-700 border-rose-200/60'
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (Visible only on mobile) */}
      <div className="relative z-10 flex flex-col gap-2.5 md:hidden">
        {usersData.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className="group p-3 sm:p-4 flex flex-col gap-2.5 bg-white/60 border border-indigo-100/50 rounded-2xl hover:bg-white hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative z-10"
          >
            {/* Top row: Avatar + Name + Status */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10.5px] font-extrabold shrink-0 shadow-2xs transition-transform duration-300 group-hover:scale-110 ${user.initialsBg}`}
                >
                  {user.initials}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight truncate">
                    {user.name}
                  </span>
                  <span className="text-[10.5px] font-semibold text-slate-400">
                    {user.userId}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-transform duration-300 group-hover:scale-105 ${user.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                    : 'bg-rose-50 text-rose-700 border-rose-200/60'
                    }`}
                >
                  {user.status}
                </span>
              </div>
            </div>

            {/* Bottom details row: Package & Date */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Package className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-semibold text-slate-700">{user.package}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 justify-end">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{user.regDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
}
