import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteProduct } from '../services/productApi';

export const removeProduct = createAsyncThunk(
    'products/delete',
    async (id) => {
        const response = await deleteProduct(id);
        return response;
    }
);

const deleteProductSlice = createSlice({
    name: 'products',
    initialState: { deleted: false, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(removeProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeProduct.fulfilled, (state) => {
                state.deleted = true;
                state.loading = false;
                state.error = null;

            })
            .addCase(removeProduct.rejected, (state) => {
                state.error = "Could not delete product, try again";
            })
    }
});

export default deleteProductSlice.reducer;
