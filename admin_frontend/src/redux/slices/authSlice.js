import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminUser: {
    name: 'Admin User',
    role: 'Super Admin',
    email: 'admin@eduvora.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  },
  isAuthenticated: true,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAdminUser: (state, action) => {
      state.adminUser = action.payload;
    },
    logout: (state) => {
      state.adminUser = null;
      state.isAuthenticated = false;
      state.token = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setAdminUser, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
