import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import networkReducer from './slices/networkSlice';
import referralReducer from './slices/referralSlice';
import paymentReducer from './slices/paymentSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        network: networkReducer,
        referrals: referralReducer,
        payment: paymentReducer,
    },
});