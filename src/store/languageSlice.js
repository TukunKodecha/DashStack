import { createSlice } from '@reduxjs/toolkit';

const savedLang = localStorage.getItem('language') || 'en';


const initialState = {
    language: savedLang
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
            localStorage.setItem('language', action.payload);
        }
    }
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
