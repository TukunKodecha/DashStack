// third-party imports
import { configureStore } from '@reduxjs/toolkit';

// project-imports
import authReducer from './authSlice';
import languageReducer from './languageSlice';
import getProductReducer from './getProductSlice';
import sidebarReducer from "./sidebarSlice";
import toastReducer from "./toastSlice";
import deleteProductReducer from "./deleteProductSlice";

const store = configureStore({
    reducer: {
        language: languageReducer,
        auth: authReducer,
        getProducts: getProductReducer,
        sidebar: sidebarReducer,
        toast: toastReducer,
        deleteProduct: deleteProductReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['your/action/type'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                ignoredPaths: ['items.dates'],
            },
        }),
});

export default store;
