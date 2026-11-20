import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios';

// Fetch Full Overview for Rank & Achievements Page (ActionType 1)
export const fetchUserRanksOverview = createAsyncThunk(
    'rank/fetchUserRanksOverview',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/ranks');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch rank overview');
        }
    }
);

// Fetch Filtered Achievements for View All Modal (ActionType 2)
export const fetchFilteredAchievements = createAsyncThunk(
    'rank/fetchFilteredAchievements',
    async ({ categoryId = null, status = '', search = '', page = 1, limit = 20 } = {}, { rejectWithValue }) => {
        try {
            const params = {
                categoryId: categoryId || undefined,
                status: status || undefined,
                search: search || undefined,
                page,
                limit
            };
            const response = await api.get('/ranks/achievements', { params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch achievements');
        }
    }
);

// Fetch Chronological History Audit Timeline (ActionType 3)
export const fetchAchievementHistory = createAsyncThunk(
    'rank/fetchAchievementHistory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/ranks/history');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch achievement history');
        }
    }
);

// Fetch Achievement Categories for Dropdown Filter (ActionType 4)
export const fetchAchievementCategories = createAsyncThunk(
    'rank/fetchAchievementCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/ranks/categories');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
        }
    }
);

const initialState = {
    rankSummary: null,
    ranksCatalog: [],
    achievements: [],
    counts: {
        all: 0,
        earned: 0,
        inProgress: 0,
        locked: 0
    },
    recentAchievements: [],
    filteredAchievements: [],
    history: [],
    categories: [],
    selectedAchievement: null,
    loading: false,
    modalLoading: false,
    historyLoading: false,
    error: null
};

const rankSlice = createSlice({
    name: 'rank',
    initialState,
    reducers: {
        setSelectedAchievement: (state, action) => {
            state.selectedAchievement = action.payload;
        },
        clearSelectedAchievement: (state) => {
            state.selectedAchievement = null;
        },
        clearRankError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchUserRanksOverview
            .addCase(fetchUserRanksOverview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserRanksOverview.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.success) {
                    state.rankSummary = action.payload.rankSummary || null;
                    state.ranksCatalog = action.payload.ranksCatalog || [];
                    state.achievements = action.payload.achievements || [];
                    state.counts = action.payload.counts || state.counts;
                    state.recentAchievements = action.payload.recentAchievements || [];
                }
            })
            .addCase(fetchUserRanksOverview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // fetchFilteredAchievements
            .addCase(fetchFilteredAchievements.pending, (state) => {
                state.modalLoading = true;
            })
            .addCase(fetchFilteredAchievements.fulfilled, (state, action) => {
                state.modalLoading = false;
                if (action.payload?.success) {
                    state.filteredAchievements = action.payload.achievements || [];
                }
            })
            .addCase(fetchFilteredAchievements.rejected, (state, action) => {
                state.modalLoading = false;
                state.error = action.payload;
            })

            // fetchAchievementHistory
            .addCase(fetchAchievementHistory.pending, (state) => {
                state.historyLoading = true;
            })
            .addCase(fetchAchievementHistory.fulfilled, (state, action) => {
                state.historyLoading = false;
                if (action.payload?.success) {
                    state.history = action.payload.history || [];
                }
            })
            .addCase(fetchAchievementHistory.rejected, (state, action) => {
                state.historyLoading = false;
                state.error = action.payload;
            })

            // fetchAchievementCategories
            .addCase(fetchAchievementCategories.fulfilled, (state, action) => {
                if (action.payload?.success) {
                    state.categories = action.payload.categories || [];
                }
            });
    }
});

export const { setSelectedAchievement, clearSelectedAchievement, clearRankError } = rankSlice.actions;
export default rankSlice.reducer;
