import React from 'react';
import { Eye, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function UsersTable({
  users,
  selectedUserId,
  onSelectUser,
  pageSize = 10,
  onPageSizeChange,
  currentPage = 1,
  onPageChange,
  totalUsers = 1248,
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group">
      {/* Decorative hover gradient flare */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-indigo-400/20 group-hover:scale-125 transition-all duration-700" />

      {/* Table Header Bar */}
      <div className="relative z-10 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <h3 className="text-[15px] sm:text-[16px] font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>Users</span>
          <span className="text-[13px] sm:text-[14px] text-slate-400 font-bold">({totalUsers})</span>
        </h3>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <span className="text-[11.5px] sm:text-[12px] text-slate-500 font-medium truncate">
            Showing 1 – {Math.min(pageSize, users.length)} of {totalUsers}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange && onPageSizeChange(Number(e.target.value))}
                className="bg-white border border-slate-200/90 rounded-xl pl-2.5 pr-6 py-1 text-[11.5px] font-bold text-slate-700 appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer shadow-2xs"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <span className="text-[11.5px] text-slate-500 font-medium">/ page</span>
          </div>
        </div>
      </div>

      {/* Desktop View Table (hidden on mobile, visible from md up) */}
      <div className="relative z-10 hidden md:block overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100/90 bg-slate-50/50 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              <th className="py-3 px-3.5 pl-5">User ID</th>
              <th className="py-3 px-2">Profile</th>
              <th className="py-3 px-3">Name</th>
              <th className="py-3 px-3">Email</th>
              <th className="py-3 px-3">Mobile</th>
              <th className="py-3 px-2.5 text-center">Role</th>
              <th className="py-3 px-2.5 text-center">Package</th>
              <th className="py-3 px-3">Registration Date</th>
              <th className="py-3 px-2.5 text-center">Status</th>
              <th className="py-3 px-3.5 pr-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80 text-[12px]">
            {users.map((u) => {
              const isSelected = selectedUserId === u.id;
              const isSupport = u.role === 'Support';
              const isActive = u.status === 'Active';

              return (
                <tr
                  key={u.id}
                  onClick={() => onSelectUser(u)}
                  className={`group border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300 cursor-pointer ${
                    isSelected ? 'bg-indigo-50/50 font-medium' : ''
                  }`}
                >
                  {/* User ID */}
                  <td className="py-2.5 px-3.5 pl-5 font-bold text-slate-800 group-hover:text-indigo-600 tracking-tight whitespace-nowrap transition-colors">
                    {u.id}
                  </td>

                  {/* Profile Avatar / Initials */}
                  <td className="py-2.5 px-2 whitespace-nowrap">
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-7.5 h-7.5 rounded-full object-cover border border-slate-200 group-hover:scale-110 group-hover:shadow-xs transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-7.5 h-7.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-extrabold text-[10.5px] flex items-center justify-center group-hover:scale-110 group-hover:shadow-xs transition-transform duration-300">
                        {u.initials || u.name?.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </td>

                  {/* Name */}
                  <td className="py-2.5 px-3 font-bold text-slate-900 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                    {u.name}
                  </td>

                  {/* Email */}
                  <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap font-medium">
                    {u.email}
                  </td>

                  {/* Mobile */}
                  <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap font-semibold">
                    {u.mobile}
                  </td>

                  {/* Role */}
                  <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-lg text-[11px] font-bold ${
                        isSupport
                          ? 'bg-sky-100 text-sky-700 border border-sky-200/80'
                          : 'bg-purple-100 text-purple-700 border border-purple-200/80'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  {/* Package */}
                  <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                    {u.package && u.package !== '-' ? (
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-lg text-[11px] font-bold ${
                          u.package === 'Premium'
                            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200/80'
                            : u.package === 'Standard'
                            ? 'bg-blue-100 text-blue-700 border border-blue-200/80'
                            : 'bg-emerald-100 text-emerald-700 border border-emerald-200/80'
                        }`}
                      >
                        {u.package}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-bold">-</span>
                    )}
                  </td>

                  {/* Registration Date */}
                  <td className="py-2.5 px-3 whitespace-nowrap text-slate-600 leading-tight">
                    <div className="font-semibold text-slate-800">{u.date}</div>
                    <div className="text-[10.5px] text-slate-400 font-medium">{u.time}</div>
                  </td>

                  {/* Status */}
                  <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                          : 'bg-rose-50 text-rose-700 border border-rose-200/80'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      />
                      {u.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-2.5 px-3.5 pr-5 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectUser(u);
                      }}
                      className="p-1.5 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-600 hover:text-indigo-800 shadow-2xs transition-all cursor-pointer inline-flex items-center justify-center"
                      title="View user details"
                    >
                      <Eye className="w-4 h-4 stroke-[2]" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View (Visible only on mobile < md) */}
      <div className="relative z-10 md:hidden p-3 space-y-2.5">
        {users.map((u) => {
          const isSelected = selectedUserId === u.id;
          const isSupport = u.role === 'Support';
          const isActive = u.status === 'Active';

          return (
            <div
              key={u.id}
              onClick={() => onSelectUser(u)}
              className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-y-0.5 group ${
                isSelected
                  ? 'bg-indigo-50/70 border-indigo-300 shadow-xs ring-1 ring-indigo-500/10'
                  : 'bg-white/90 border-slate-200/80 hover:border-indigo-300 hover:bg-white'
              }`}
            >
              {/* Top: Avatar + Name + ID + Action */}
              <div className="flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  {u.avatar ? (
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0 group-hover:scale-105 group-hover:shadow-xs transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-extrabold text-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-xs transition-transform duration-300">
                      {u.initials || u.name?.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-[13.5px] font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight truncate">
                      {u.name}
                    </h4>
                    <p className="text-[11px] font-bold text-slate-400 mt-0.5">
                      {u.id}
                    </p>
                  </div>
                </div>

                {/* Eye Action button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectUser(u);
                  }}
                  className="p-2 rounded-xl border border-indigo-200 bg-indigo-50/80 text-indigo-600 hover:bg-indigo-100 group-hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer shadow-2xs"
                  title="View user details"
                >
                  <Eye className="w-4 h-4 stroke-[2]" />
                </button>
              </div>

              {/* Middle: Email & Mobile */}
              <div className="mt-2.5 pt-2 border-t border-slate-100/90 flex flex-col gap-1 text-[11.5px]">
                <div className="flex items-center justify-between gap-2 text-slate-600">
                  <span className="text-slate-400 font-medium shrink-0">Email</span>
                  <span className="font-semibold text-slate-800 truncate text-right">{u.email}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-slate-600">
                  <span className="text-slate-400 font-medium shrink-0">Mobile</span>
                  <span className="font-semibold text-slate-800">{u.mobile}</span>
                </div>
              </div>

              {/* Bottom: Role + Package + Status */}
              <div className="mt-2.5 pt-2 border-t border-slate-100/90 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold ${
                      isSupport
                        ? 'bg-sky-100 text-sky-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {u.role}
                  </span>
                  {u.package && u.package !== '-' && (
                    <span className="px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-indigo-100 text-indigo-700">
                      {u.package}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {u.date}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                    {u.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Pagination Footer */}
      <div className="relative z-10 px-4 sm:px-5 py-3 sm:py-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 bg-slate-50/40">
        <div className="flex items-center gap-2">
          <span className="text-[11.5px] sm:text-[12px] text-slate-500 font-medium">Show</span>
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange && onPageSizeChange(Number(e.target.value))}
              className="bg-white border border-slate-200/90 rounded-xl pl-2.5 pr-6 py-1 text-[11px] sm:text-[11.5px] font-bold text-slate-700 appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer shadow-2xs"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <span className="text-[11.5px] sm:text-[12px] text-slate-500 font-medium">entries</span>
        </div>

        {/* Pagination buttons */}
        <div className="flex items-center gap-1 self-center sm:self-auto flex-wrap justify-center">
          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {[1, 2, 3, 4, 5].map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange && onPageChange(pageNum)}
              className={`w-7 h-7 rounded-lg text-[11.5px] sm:text-[12px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                currentPage === pageNum
                  ? 'bg-indigo-600 text-white shadow-2xs font-black'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <span className="px-1 text-slate-400 text-xs">...</span>

          <button
            type="button"
            onClick={() => onPageChange && onPageChange(125)}
            className="w-8 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11.5px] sm:text-[12px] font-bold flex items-center justify-center transition-colors cursor-pointer"
          >
            125
          </button>

          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
