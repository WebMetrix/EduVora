import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Download, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { fetchReferralsList } from '../../redux/slices/referralSlice';

export default function ReferralsDataTable({ t }) {
  const dispatch = useDispatch();
  const { listData, isLoading } = useSelector(state => state.referrals || { listData: [], isLoading: false });

  const [filter, setFilter] = useState(''); // '', 'today', 'week', 'month'
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch data when filter or search changes
  useEffect(() => {
    dispatch(fetchReferralsList({ filter, search: debouncedSearch }));
    setPage(1); // Reset to first page
  }, [filter, debouncedSearch, dispatch]);

  const getStatusStyle = (statusId) => {
    if (statusId === 3) return 'bg-emerald-100 text-emerald-600'; // Active
    if (statusId === 4) return 'bg-rose-100 text-rose-600';       // Cancelled
    if (statusId === 2) return 'bg-blue-100 text-blue-600';       // Registered
    return 'bg-amber-100 text-amber-600';                         // Pending or default
  };

  const getLevelStyle = (level) => {
    return level === 1 ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Pagination logic
  const totalEntries = listData.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage) || 1;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalEntries);
  const paginatedData = listData.slice(startIndex, endIndex);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group/card transition-all duration-300 hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

      {/* Table Header Controls */}
      <div className="relative z-10 p-5 lg:p-6 border-b border-indigo-100/60 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <h3 className="font-bold text-[#1a1446] text-[16px]">{t('myReferrals.title')}</h3>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full xl:w-auto">
          {/* Time Filters */}
          <div className="flex items-center p-1.5 bg-white/60 backdrop-blur-md border border-indigo-100/50 rounded-xl w-full lg:w-auto overflow-x-auto shrink-0 shadow-sm [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <button
              onClick={() => setFilter('')}
              className={`px-4 py-1.5 rounded-lg text-[13px] font-bold whitespace-nowrap transition-all duration-300 ${filter === '' ? 'bg-[#4f3bf3] text-white shadow-md' : 'text-indigo-900/60 hover:text-[#4f3bf3] hover:bg-white'}`}
            >
              All Time
            </button>
            {['today', 'week', 'month'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-bold whitespace-nowrap transition-all duration-300 ${filter === f ? 'bg-[#4f3bf3] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5' : 'text-indigo-900/60 hover:text-[#4f3bf3] hover:bg-white hover:shadow-sm hover:-translate-y-0.5'}`}
              >
                {t(`myReferrals.table.${f}`)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto group/controls">
            {/* Search */}
            <div className="relative flex-1 lg:w-[250px] lg:focus-within:w-[300px] transition-all duration-300">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 group-focus-within/controls:text-[#4f3bf3] transition-colors" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('myReferrals.table.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 bg-white/60 backdrop-blur-md border border-indigo-100/60 rounded-xl text-[13px] font-medium placeholder:text-indigo-300 focus:outline-none focus:bg-white focus:border-[#4f3bf3] focus:ring-2 focus:ring-[#4f3bf3]/20 focus:shadow-md hover:border-indigo-300 transition-all duration-300"
              />
            </div>

            {/* Export */}
            <button className="flex items-center gap-2 px-4 py-2 border border-indigo-200 text-[#4f3bf3] bg-white/60 backdrop-blur-md hover:bg-[#4f3bf3] hover:text-white hover:shadow-md hover:-translate-y-0.5 rounded-xl text-[13px] font-bold transition-all duration-300 shrink-0 group/export">
              <Download className="w-4 h-4 group-hover/export:-translate-y-0.5 transition-transform" />
              <span className="hidden sm:block">{t('myReferrals.table.export')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table (Hidden on mobile) */}
      <div className="relative z-10 hidden lg:block w-full overflow-x-hidden overflow-y-auto max-h-[380px] custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-20 bg-slate-50/90 backdrop-blur-md shadow-sm">
            <tr>
              <th className="px-6 py-4 text-[12px] font-extrabold text-indigo-900/50 uppercase tracking-wider whitespace-nowrap">{t('myReferrals.table.profile')}</th>
              <th className="px-6 py-4 text-[12px] font-extrabold text-indigo-900/50 uppercase tracking-wider whitespace-nowrap">{t('myReferrals.table.userId')}</th>
              <th className="px-6 py-4 text-[12px] font-extrabold text-indigo-900/50 uppercase tracking-wider whitespace-nowrap">{t('myReferrals.table.name')}</th>
              <th className="px-6 py-4 text-[12px] font-extrabold text-indigo-900/50 uppercase tracking-wider whitespace-nowrap">{t('myReferrals.table.package')}</th>
              <th className="px-6 py-4 text-[12px] font-extrabold text-indigo-900/50 uppercase tracking-wider whitespace-nowrap">{t('myReferrals.table.registrationDate')}</th>
              <th className="px-6 py-4 text-[12px] font-extrabold text-indigo-900/50 uppercase tracking-wider whitespace-nowrap">{t('myReferrals.table.status')}</th>
              <th className="px-6 py-4 text-[12px] font-extrabold text-indigo-900/50 uppercase tracking-wider whitespace-nowrap">{t('myReferrals.table.referralLevel')}</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-indigo-400 font-bold">Loading...</td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-indigo-400 font-bold">No referrals found</td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr key={idx} className="group border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.01] hover:z-10 relative transition-all duration-300 cursor-pointer">
                  <td className="px-6 py-3 rounded-l-xl">
                    <img src={row.ProfilePicturePath || `https://ui-avatars.com/api/?name=${encodeURIComponent(row.Name)}&background=random`} alt="Avatar" className="w-8 h-8 rounded-full border border-indigo-200 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md" />
                  </td>
                  <td className="px-6 py-3 text-[13px] font-extrabold text-[#1a1446] group-hover:text-[#4f3bf3] transition-colors">{row.UserID}</td>
                  <td className="px-6 py-3 text-[13px] font-bold text-slate-700 whitespace-nowrap">{row.Name}</td>
                  <td className="px-6 py-3 text-[12px] font-semibold text-slate-600">{row.PackageName}</td>
                  <td className="px-6 py-3 text-[12px] font-semibold text-slate-600 whitespace-nowrap">{formatDate(row.RegistrationDate)}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border border-white/40 shadow-sm ${getStatusStyle(row.StatusId)}`}>
                      {row.StatusId === 3 ? t('myReferrals.table.statusActive')
                        : row.StatusId === 2 ? t('myReferrals.table.statusRegistered')
                          : row.StatusId === 4 ? t('myReferrals.table.statusCancelled')
                            : t('myReferrals.table.statusPending')}
                    </span>
                  </td>
                  <td className="px-6 py-3 rounded-r-xl">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border border-white/40 shadow-sm ${getLevelStyle(row.ReferralLevel)}`}>
                      {t('myReferrals.table.levelPrefix')}{row.ReferralLevel}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (Hidden on desktop) */}
      <div className="block lg:hidden w-full p-4 space-y-4">
        {paginatedData.map((row, idx) => (
          <div key={idx} className="group p-4 flex flex-col gap-3 bg-white/40 border border-indigo-100/50 rounded-2xl hover:bg-white hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={row.ProfilePicturePath || `https://ui-avatars.com/api/?name=${encodeURIComponent(row.Name)}&background=random`} alt="Avatar" className="w-10 h-10 rounded-full border border-indigo-200 shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <div className="text-[14px] font-bold text-slate-900 group-hover:text-[#4f3bf3] transition-colors">{row.Name}</div>
                  <div className="text-[12px] font-extrabold text-indigo-900/60">{row.UserID}</div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm shrink-0 border border-white/40 ${getStatusStyle(row.StatusId)}`}>
                {row.StatusId === 3 ? t('myReferrals.table.statusActive')
                  : row.StatusId === 2 ? t('myReferrals.table.statusRegistered')
                    : row.StatusId === 4 ? t('myReferrals.table.statusCancelled')
                      : t('myReferrals.table.statusPending')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('myReferrals.table.package')}</div>
                <div className="text-[12px] font-bold text-slate-700 truncate">{row.PackageName}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('myReferrals.table.registrationDate')}</div>
                <div className="text-[12px] font-bold text-slate-700 truncate">{formatDate(row.RegistrationDate)}</div>
              </div>
              <div className="col-span-2 pt-2 mt-2 border-t border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('myReferrals.table.referralLevel')}</div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-block ${getLevelStyle(row.ReferralLevel)}`}>
                  {t('myReferrals.table.levelPrefix')}{row.ReferralLevel}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="p-4 lg:p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[13px] font-medium text-slate-500 w-full text-center sm:text-left">
          {totalEntries > 0
            ? t('myReferrals.table.showingEntries').replace('{start}', startIndex + 1).replace('{end}', endIndex).replace('{total}', totalEntries)
            : 'No entries to show'}
        </div>

        {totalEntries > 0 && (
          <div className="flex items-center justify-between w-full sm:w-auto gap-4 lg:gap-6">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button className="w-8 h-8 rounded-lg bg-[#4f3bf3] text-white font-bold text-[13px] shadow-sm flex items-center justify-center">
                {page}
              </button>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[13px] font-medium text-slate-500 hidden sm:inline-block whitespace-nowrap">{t('myReferrals.table.rowsPerPage')}</span>
              <select
                value={rowsPerPage}
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
                className="border border-slate-200 rounded-lg text-[13px] font-bold text-slate-700 py-1.5 pl-3 pr-8 focus:outline-none focus:border-[#4f3bf3] bg-white cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
