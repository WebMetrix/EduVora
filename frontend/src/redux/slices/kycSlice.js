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

export const fetchIdentityProofTypes = createAsyncThunk(
    'kyc/fetchIdentityProofTypes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/kyc/dropdowns/identity-types');
            return response.data;
        } catch (error) {   
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch identity proof types');
        }
    }
);

const kycSlice = createSlice({
    name: 'kyc',
    initialState: {
        data: null,
        identityProofTypes: [], // To store dropdown options
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
            })
            // Identity Proof Types
            .addCase(fetchIdentityProofTypes.fulfilled, (state, action) => {
                state.identityProofTypes = action.payload;
            });
    }
});

export const { clearKycData } = kycSlice.actions;

export default kycSlice.reducer;
