import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios';
import { toast } from 'react-toastify';

export const createPaymentOrder = createAsyncThunk(
    'payment/createOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await api.post('/payment/demo/create-order', orderData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create payment session');
        }
    }
);

const initialState = {
  paymentData: null,
  loading: false,
  error: null,
  paymentSessionId: null,
  orderId: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentData: (state, action) => {
      state.paymentData = action.payload;
    },
    clearPaymentData: (state) => {
      state.paymentData = null;
      state.paymentSessionId = null;
      state.orderId = null;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(createPaymentOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createPaymentOrder.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.success) {
                state.paymentSessionId = action.payload.payment_session_id;
                state.orderId = action.payload.order_id;
            }
        })
        .addCase(createPaymentOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        });
  }
});

export const { setPaymentData, clearPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;
