import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import networkReducer from './slices/networkSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        network: networkReducer,
    },
});