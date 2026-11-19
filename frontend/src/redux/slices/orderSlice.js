import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios';

export const fetchUserOrders = createAsyncThunk(
    'order/fetchUserOrders',
    async ({ page = 1, limit = 10, search = '', timeFilter = '', statusFilter = '' } = {}, { rejectWithValue }) => {
        try {
            // Build query params
            const params = {
                page,
                limit,
                search: search || undefined,
                timeFilter: timeFilter || undefined,
                statusFilter: statusFilter || undefined
            };
            const response = await api.get('/orders', { params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
        }
    }
);

export const fetchOrderDetails = createAsyncThunk(
    'order/fetchOrderDetails',
    async (orderNumber, { rejectWithValue }) => {
        try {
            const response = await api.get(`/orders/details/${orderNumber}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch order details');
        }
    }
);

export const fetchOrdersExport = createAsyncThunk(
    'order/fetchOrdersExport',
    async ({ search = '', timeFilter = '', statusFilter = '' } = {}, { rejectWithValue }) => {
        try {
            const params = {
                search: search || undefined,
                timeFilter: timeFilter || undefined,
                statusFilter: statusFilter || undefined
            };
            const response = await api.get('/orders/export', { params });
            return response.data?.data || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to export orders');
        }
    }
);

export const downloadOrderInvoice = createAsyncThunk(
    'order/downloadOrderInvoice',
    async (orderNumber, { rejectWithValue }) => {
        try {
            const response = await api.get(`/payment/invoice/${orderNumber}`, {
                responseType: 'blob'
            });

            // Trigger browser download
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `${orderNumber}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);

            return { orderNumber };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to download invoice');
        }
    }
);

const initialState = {
    orders: [],
    stats: {
        total: 0,
        completed: 0,
        pending: 0,
        failed: 0
    },
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1
    },
    selectedOrder: null,
    loading: false,
    detailsLoading: false,
    downloadingInvoice: false,
    error: null
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setSelectedOrder: (state, action) => {
            state.selectedOrder = action.payload;
        },
        clearSelectedOrder: (state) => {
            state.selectedOrder = null;
        },
        clearOrderError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchUserOrders
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.success) {
                    state.orders = action.payload.orders || [];
                    state.stats = action.payload.stats || state.stats;
                    state.pagination = action.payload.pagination || state.pagination;
                }
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // fetchOrderDetails
            .addCase(fetchOrderDetails.pending, (state) => {
                state.detailsLoading = true;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.detailsLoading = false;
                if (action.payload?.success) {
                    state.selectedOrder = action.payload.order;
                }
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.detailsLoading = false;
                state.error = action.payload;
            })

            // downloadOrderInvoice
            .addCase(downloadOrderInvoice.pending, (state) => {
                state.downloadingInvoice = true;
            })
            .addCase(downloadOrderInvoice.fulfilled, (state) => {
                state.downloadingInvoice = false;
            })
            .addCase(downloadOrderInvoice.rejected, (state, action) => {
                state.downloadingInvoice = false;
                state.error = action.payload;
            });
    }
});

export const { setSelectedOrder, clearSelectedOrder, clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
