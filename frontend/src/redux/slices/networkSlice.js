import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios';

// Fetch the nested network tree hierarchy
export const fetchNetworkTree = createAsyncThunk(
    'network/fetchNetworkTree',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/network');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'network.errors.fetchFailed');
        }
    }
);

const initialState = {
    treeData: null,
    dashboardStats: null,
    charts: null,
    totalMembers: 0,
    maxLevel: 0,
    isLoading: false,
    error: null,
};

const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        // Reducer to manually clear network data (e.g., on logout)
        clearNetworkData: (state) => {
            state.treeData = null;
            state.dashboardStats = null;
            state.charts = null;
            state.totalMembers = 0;
            state.maxLevel = 0;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNetworkTree.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNetworkTree.fulfilled, (state, action) => {
                state.isLoading = false;
                state.treeData = action.payload?.treeData || null;
                state.dashboardStats = action.payload?.dashboardStats || null;
                state.charts = action.payload?.charts || null;

                // Calculate stats if treeData exists
                if (state.treeData) {
                    let totalMembers = 0;
                    let maxLevel = 0;

                    const traverse = (node, currentLevel) => {
                        totalMembers++;
                        if (currentLevel > maxLevel) maxLevel = currentLevel;
                        if (node.children) {
                            node.children.forEach(child => traverse(child, currentLevel + 1));
                        }
                    };

                    traverse(state.treeData, 0);
                    
                    // Total members excludes the root user
                    state.totalMembers = totalMembers > 0 ? totalMembers - 1 : 0;
                    state.maxLevel = maxLevel;
                } else {
                    state.totalMembers = 0;
                    state.maxLevel = 0;
                }
            })
            .addCase(fetchNetworkTree.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearNetworkData } = networkSlice.actions;

export default networkSlice.reducer;
