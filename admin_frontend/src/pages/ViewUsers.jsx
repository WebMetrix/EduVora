import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import UserStatsCards from '../components/user-management/UserStatsCards';
import UserFiltersCard from '../components/user-management/UserFiltersCard';
import UsersTable from '../components/user-management/UsersTable';
import UserDetailsSidePanel from '../components/user-management/UserDetailsSidePanel';
import { isDateWithinRange } from '../utils/dateFilterUtils';

export default function ViewUsers() {
  // Initial 10 users matching the screenshot exactly
  const initialUsers = [
    {
      id: 'USR000125',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      mobile: '+91 98765 43210',
      role: 'User',
      package: 'Premium',
      date: '12 Oct 2026',
      time: '10:30 AM',
      status: 'Active',
      dob: '15 Oct 2000',
      gender: 'Male',
      address: '123, MG Road, Bengaluru, Karnataka - 560001, India',
      referralId: 'USR000101',
      referredBy: 'USR000101 (Ankit Gupta)',
      referralLink: 'https://eduvora.com/r/USR000125',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 'USR000124',
      name: 'Priya Verma',
      email: 'priya.verma@example.com',
      mobile: '+91 98765 43211',
      role: 'User',
      package: 'Standard',
      date: '11 Oct 2026',
      time: '04:15 PM',
      status: 'Active',
      dob: '22 Mar 1999',
      gender: 'Female',
      address: '45 Lake View Road, Hyderabad, Telangana - 500081, India',
      referralId: 'USR000105',
      referredBy: 'USR000105 (Rohit Das)',
      referralLink: 'https://eduvora.com/r/USR000124',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 'SUP000023',
      name: 'Amit Kumar',
      email: 'amit.kumar@example.com',
      mobile: '+91 98765 43212',
      role: 'Support',
      package: '-',
      date: '10 Oct 2026',
      time: '11:20 AM',
      status: 'Active',
      dob: '05 Jan 1995',
      gender: 'Male',
      address: '77 Civil Lines, Jaipur, Rajasthan - 302006, India',
      referralId: '-',
      referredBy: 'Admin (System Assigned)',
      referralLink: '',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 'USR000123',
      name: 'Neha Singh',
      email: 'neha.singh@example.com',
      mobile: '+91 98765 43213',
      role: 'User',
      package: 'Basic',
      date: '09 Oct 2026',
      time: '02:45 PM',
      status: 'Inactive',
      dob: '18 Nov 2001',
      gender: 'Female',
      address: '88 Park Street, Kolkata, West Bengal - 700016, India',
      referralId: 'USR000102',
      referredBy: 'USR000102 (Pooja Rao)',
      referralLink: 'https://eduvora.com/r/USR000123',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 'USR000122',
      name: 'Vikram Patel',
      email: 'vikram.patel@example.com',
      mobile: '+91 98765 43214',
      role: 'User',
      package: 'Premium',
      date: '08 Oct 2026',
      time: '09:10 AM',
      status: 'Active',
      dob: '14 Jul 1997',
      gender: 'Male',
      address: '12 Ring Road, Surat, Gujarat - 395007, India',
      referralId: 'USR000109',
      referredBy: 'USR000109 (Karan Verma)',
      referralLink: 'https://eduvora.com/r/USR000122',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 'SUP000022',
      name: 'Sneha Kapoor',
      email: 'sneha.kapoor@example.com',
      mobile: '+91 98765 43215',
      role: 'Support',
      package: '-',
      date: '07 Oct 2026',
      time: '03:30 PM',
      status: 'Active',
      initials: 'SK',
      dob: '30 Aug 1996',
      gender: 'Female',
      address: '5 Sector 18, Noida, Uttar Pradesh - 201301, India',
      referralId: '-',
      referredBy: 'Admin (System Assigned)',
      referralLink: '',
      avatar: null,
    },
    {
      id: 'USR000121',
      name: 'Arjun Rao',
      email: 'arjun.rao@example.com',
      mobile: '+91 98765 43216',
      role: 'User',
      package: 'Standard',
      date: '06 Oct 2026',
      time: '12:05 PM',
      status: 'Active',
      initials: 'AR',
      dob: '12 Feb 1998',
      gender: 'Male',
      address: '32 Jubilee Hills, Hyderabad - 500033, India',
      referralId: 'USR000115',
      referredBy: 'USR000115 (Vikas Shah)',
      referralLink: 'https://eduvora.com/r/USR000121',
      avatar: null,
    },
    {
      id: 'USR000120',
      name: 'Kavya Nair',
      email: 'kavya.nair@example.com',
      mobile: '+91 98765 43217',
      role: 'User',
      package: 'Premium',
      date: '05 Oct 2026',
      time: '05:40 PM',
      status: 'Inactive',
      dob: '03 Jun 2002',
      gender: 'Female',
      address: '21 Marine Drive, Kochi, Kerala - 682031, India',
      referralId: 'USR000118',
      referredBy: 'USR000118 (Ravi Kumar)',
      referralLink: 'https://eduvora.com/r/USR000120',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 'SUP000021',
      name: 'Rohit Das',
      email: 'rohit.das@example.com',
      mobile: '+91 98765 43218',
      role: 'Support',
      package: '-',
      date: '04 Oct 2026',
      time: '10:15 AM',
      status: 'Active',
      dob: '19 Dec 1994',
      gender: 'Male',
      address: '14 Salt Lake, Sector V, Kolkata - 700091, India',
      referralId: '-',
      referredBy: 'Admin (System Assigned)',
      referralLink: '',
      avatar:
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 'USR000119',
      name: 'Ankit Gupta',
      email: 'ankit.gupta@example.com',
      mobile: '+91 98765 43219',
      role: 'User',
      package: 'Basic',
      date: '03 Oct 2026',
      time: '01:25 PM',
      status: 'Active',
      dob: '27 Sep 1997',
      gender: 'Male',
      address: '50 Connaught Place, New Delhi - 110001, India',
      referralId: 'USR000100',
      referredBy: 'USR000100 (Deepak Seth)',
      referralLink: 'https://eduvora.com/r/USR000119',
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80',
    },
  ];

  // Currently selected user (starts with Rahul Sharma as in screenshot)
  const [selectedUser, setSelectedUser] = useState(initialUsers[0]);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Close mobile drawer on ESC and lock background scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileDrawerOpen(false);
      }
    };

    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileDrawerOpen]);

  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    role: 'all',
    status: 'all',
    package: 'all',
    fromDate: '',
    toDate: '',
  });

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      role: 'all',
      status: 'all',
      package: 'all',
      fromDate: '',
      toDate: '',
    });
  };

  // Filtered users
  const filteredUsers = useMemo(() => {
    return initialUsers.filter((u) => {
      // Search
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchesName = u.name.toLowerCase().includes(q);
        const matchesEmail = u.email.toLowerCase().includes(q);
        const matchesId = u.id.toLowerCase().includes(q);
        const matchesReferral = (u.referralId || '').toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesId && !matchesReferral) {
          return false;
        }
      }

      // Role
      if (filters.role !== 'all' && u.role !== filters.role) {
        return false;
      }

      // Status
      if (filters.status !== 'all' && u.status !== filters.status) {
        return false;
      }

      // Package
      if (filters.package !== 'all') {
        if (u.package !== filters.package) return false;
      }

      // Registration Date Range
      if (!isDateWithinRange(u.registrationDate, filters)) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setIsSidePanelOpen(true);
    setIsMobileDrawerOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5 animate-fade-in relative pb-1 sm:pb-2">
      {/* Top Header Row: Title & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div>
          <h1 className="text-[20px] sm:text-[26px] lg:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
            View Users
          </h1>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            View all registered users on the EduVora platform.
          </p>
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-[12.5px] font-medium text-slate-500 flex-wrap">
          <Link
            to="/dashboard"
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Dashboard
          </Link>
          <span className="text-slate-300">/</span>
          <span className="hover:text-indigo-600 transition-colors">User Management</span>
          <span className="text-slate-300">/</span>
          <span className="text-indigo-600 font-bold">View Users</span>
        </nav>
      </div>

      {/* 4 Stat Counter Cards */}
      <UserStatsCards
        stats={{
          total: '1,248',
          endUsers: '1,120',
          supportUsers: '128',
          inactiveUsers: '36',
        }}
      />

      {/* Main Grid: Filters & Table (Left) + User Details Panel (Right on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Filters and Table */}
        <div
          className={`${
            isSidePanelOpen ? 'lg:col-span-8' : 'lg:col-span-12'
          } flex flex-col gap-4 sm:gap-5 transition-all duration-300`}
        >
          {/* Filters Card */}
          <UserFiltersCard
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />

          {/* Table Card (Responsive: Table on desktop/tablet, Cards on mobile) */}
          <UsersTable
            users={filteredUsers}
            selectedUserId={selectedUser?.id}
            onSelectUser={handleSelectUser}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalUsers={1248}
          />
        </div>

        {/* Right Column: User Details Side Panel (Desktop only: lg and up) */}
        {isSidePanelOpen && (
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-4">
              <UserDetailsSidePanel
                user={selectedUser}
                onClose={() => setIsSidePanelOpen(false)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer / Bottom-Sheet Modal (Portal directly into document.body at z-[10000]) */}
      {isMobileDrawerOpen && selectedUser && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[10000] lg:hidden flex items-end justify-center">
          {/* Dimmed backdrop covering 100% of viewport including Header and BottomNav */}
          <div
            onClick={() => setIsMobileDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
          />

          {/* Bottom sheet content card */}
          <div className="relative z-10 w-full h-[90vh] max-h-[90vh] bg-white rounded-t-3xl border-t border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-slide-up pb-safe">
            {/* Pull handle indicator */}
            <div
              onClick={() => setIsMobileDrawerOpen(false)}
              className="w-full flex justify-center py-2.5 bg-white shrink-0 cursor-pointer"
            >
              <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
            </div>

            {/* Inner Side Panel with flex-1 scrollable body */}
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
              <UserDetailsSidePanel
                user={selectedUser}
                onClose={() => setIsMobileDrawerOpen(false)}
                isDrawer={true}
              />
            </div>

            {/* Mobile Close Button */}
            <div className="p-3.5 border-t border-slate-100 bg-slate-50/90 shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="w-full py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-bold text-[13px] shadow-2xs transition-all cursor-pointer text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
