import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dateRange: '01 Aug 2026 - 31 Aug 2026',
  stats: {
    totalUsers: '1,248',
    totalUsersChange: '+12%',
    totalUsersSub: '+132 this month',
    activeUsers: '980',
    activeUsersChange: '+8%',
    activeUsersSub: '78.5% of total',
    totalOrders: '642',
    totalOrdersChange: '+15%',
    totalOrdersSub: '+84 this month',
    totalRevenue: '₹ 6,42,850',
    totalRevenueChange: '+18%',
    totalRevenueSub: '+₹ 98,200 this month',
  },
  trendFilter: 'monthly',
  revenueFilter: 'monthly',
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setTrendFilter: (state, action) => {
      state.trendFilter = action.payload;
    },
    setRevenueFilter: (state, action) => {
      state.revenueFilter = action.payload;
    },
    setStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
  },
});

export const { setDateRange, setTrendFilter, setRevenueFilter, setStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;
