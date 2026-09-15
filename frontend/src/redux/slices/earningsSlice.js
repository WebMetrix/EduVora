import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios';
import { toast } from 'react-toastify';

export const fetchEarnings = createAsyncThunk(
    'earnings/fetchEarnings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/earnings');
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch earnings';
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

const earningsSlice = createSlice({
    name: 'earnings',
    initialState: {
        data: {
            summary: null,
            periodStats: [],
            chartData: [],
            levelStats: [],
            commissions: [],
            transactions: []
        },
        loading: false,
        error: null,
    },
    reducers: {
        clearEarnings: (state) => {
            state.data = {
                summary: null,
                periodStats: [],
                chartData: [],
                levelStats: [],
                commissions: [],
                transactions: []
            };
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEarnings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEarnings.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchEarnings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearEarnings } = earningsSlice.actions;
export default earningsSlice.reducer;
