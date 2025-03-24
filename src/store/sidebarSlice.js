import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMenuCollapsed: false,
    drawerOpen: false,
};

const sidebarSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsMenuCollapsed: (state, action) => {
            state.isMenuCollapsed = action.payload;
        },
        setDrawerOpen: (state, action) => {
            state.drawerOpen = action.payload;
        },
    },
});

export const { setIsMenuCollapsed, setDrawerOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
