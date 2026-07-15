import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios';
import { toast } from 'react-toastify';


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/register', credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/logout');
            return response.data;
            sessionStorage.removeItem('sessionid'); // Clear session storage on logout
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Logout failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            // Clear session storage on manual reducer logout
            sessionStorage.removeItem('sessionid');
        }
    },
    extraReducers: (builder) => {
        builder
            // --- Login user ---
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;

                // ✅ STORE TOKEN IN SESSION STORAGE
                if (action.payload.token) {
                    sessionStorage.setItem('sessionid', action.payload.token);
                }

                toast.success('Login successful');
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            // --- Register user ---
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;

                // ✅ STORE TOKEN IN SESSION STORAGE (Since backend sends token on register)
                if (action.payload.token) {
                    sessionStorage.setItem('sessionid', action.payload.token);
                }

                toast.success('Registration successful! Please log in.');
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            // --- Logout user ---
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;

                // ✅ REMOVE TOKEN FROM SESSION STORAGE ON LOGOUT
                sessionStorage.removeItem('sessionid');

                toast.success('Logged out successfully');
            })
            .addCase(logoutUser.rejected, (state, action) => {
                toast.error(action.payload);
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;