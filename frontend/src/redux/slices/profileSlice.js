import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios';

export const fetchUserProfile = createAsyncThunk(
    'profile/fetchUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/profile');
            // Store specific fields in session storage if needed, or stringify the whole response
            if (response.data) {
                sessionStorage.setItem('cachedProfile', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: sessionStorage.getItem('cachedProfile') ? JSON.parse(sessionStorage.getItem('cachedProfile')) : null,
        loading: false,
        error: null,
    },
    reducers: {
        clearProfile: (state) => {
            state.data = null;
            sessionStorage.removeItem('cachedProfile');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
