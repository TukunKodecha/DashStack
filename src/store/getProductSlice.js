import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../services/productApi';

export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async (params) => {
        const response = await getProducts(params);
        return response;
    }
);

const getProductSlice = createSlice({
    name: 'products',
    initialState: { products: null, loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;

            })
            .addCase(fetchProducts.rejected, (state) => {
                state.products = null;
            })
    }
});

export default getProductSlice.reducer;
