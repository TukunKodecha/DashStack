import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockLogin } from '../services/authApi';

const initialState = {
    user: { role: null, token: null },
    userRole: localStorage.getItem('userRole') || null,
    loading: false,
    error: null
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }) => {
        const response = await mockLogin(email, password);
        return response;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = { role: null, token: null };
            state.userRole = null;
            localStorage.removeItem('userRole');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.userRole = action?.payload?.role || null;
                if (action?.payload?.role) {
                    localStorage.setItem('userRole', action?.payload?.role);
                }
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
