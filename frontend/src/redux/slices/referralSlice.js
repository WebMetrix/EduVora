import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios';

export const fetchReferralsList = createAsyncThunk(
    'referrals/fetchReferralsList',
    async ({ filter, search } = {}, { rejectWithValue }) => {
        try {
            // Build query params
            const params = new URLSearchParams();
            if (filter) params.append('filter', filter);
            if (search) params.append('search', search);

            const response = await api.get(`/referral/list?${params.toString()}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'referrals.errors.fetchFailed');
        }
    }
);

const initialState = {
    listData: [],
    isLoading: false,
    error: null,
};

const referralSlice = createSlice({
    name: 'referrals',
    initialState,
    reducers: {
        clearReferralsData: (state) => {
            state.listData = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReferralsList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchReferralsList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.listData = action.payload?.data || [];
            })
            .addCase(fetchReferralsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearReferralsData } = referralSlice.actions;
export default referralSlice.reducer;
