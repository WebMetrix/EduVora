import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../https/axios';

export const fetchRecentActivities = createAsyncThunk(
  'dashboard/fetchRecentActivities',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/dashboard/activities?page=${page}&limit=${limit}`);
      return response.data; // { message, data }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    activities: [],
    loading: false,
    error: null,
    hasMore: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentActivities.fulfilled, (state, action) => {
        state.loading = false;
        // If it's a new page, append to activities (unless page=1 where we should replace)
        const data = action.payload.data || [];
        state.activities = data;
        state.hasMore = data.length > 0; // simplistic, usually checking if data.length === limit
      })
      .addCase(fetchRecentActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default dashboardSlice.reducer;
