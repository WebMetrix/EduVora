import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios';

export const fetchKycDetails = createAsyncThunk(
    'kyc/fetchKycDetails',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/kyc');
            return response.data; // Will return the KYC record or null
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch KYC details');
        }
    }
);

const kycSlice = createSlice({
    name: 'kyc',
    initialState: {
        data: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        clearKycData: (state) => {
            state.data = null;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchKycDetails.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchKycDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchKycDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { clearKycData } = kycSlice.actions;

export default kycSlice.reducer;
