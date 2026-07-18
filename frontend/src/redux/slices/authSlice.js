import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios';
import { toast } from 'react-toastify';

// Auth Thunks
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


// Google Auth Thunk
export const googleAuthUser = createAsyncThunk(
    'auth/googleAuthUser',
    async (credential, { rejectWithValue }) => {
        try {
            // Sends the Google ID token (credential) to your backend
            const response = await api.post('/auth/google', { credential });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Google Authentication failed');
        }
    }
);


export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/logout');
            sessionStorage.removeItem('sessionid'); // Clear session storage on logout
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Logout failed');
        }
    }
);


// Otp Thunks
export const sendOtp = createAsyncThunk(
    'auth/sendOtp',
    async (emailData, { rejectWithValue }) => {
        try {
            const response = await api.post('/otp/send', emailData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to send OTP');
        }
    }
);

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async (verificationData, { rejectWithValue }) => {
        try {
            const response = await api.post('/otp/verify', verificationData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Invalid OTP');
        }
    }
);

export const resendOtp = createAsyncThunk(
    'auth/resendOtp',
    async (emailData, { rejectWithValue }) => {
        try {
            const response = await api.post('/otp/resend', emailData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to resend OTP');
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (resetData, { rejectWithValue }) => {
        try {
            // CHANGED: Point to the new dedicated password route
            const response = await api.post('/password/reset', resetData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Password reset failed');
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

            // --- Google Auth ---
            .addCase(googleAuthUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(googleAuthUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;

                // ✅ STORE TOKEN IN SESSION STORAGE
                if (action.payload.token) {
                    sessionStorage.setItem('sessionid', action.payload.token);
                }
                toast.success('Google Authentication successful!');
            })
            .addCase(googleAuthUser.rejected, (state, action) => {
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
            })

            // --- OTP Actions ---
            .addCase(sendOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(resendOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resendOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            // --- Reset Password ---
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;