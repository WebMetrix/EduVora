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
        const data = action.payload.data || [];
        
        // Filter out activities that are older than 24 hours
        // We exclude any TimeAgoText containing "day", "month", or "year"
        const filteredData = data.filter(activity => {
          if (!activity.TimeAgoText) return true;
          const text = activity.TimeAgoText.toLowerCase();
          return !text.includes('day') && !text.includes('month') && !text.includes('year');
        });

        state.activities = filteredData;
        state.hasMore = data.length > 0; // Check original data for pagination logic
      })
      .addCase(fetchRecentActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default dashboardSlice.reducer;
