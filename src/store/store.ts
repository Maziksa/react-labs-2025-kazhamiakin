import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import mealsReducer from './slices/mealsSlice';
import cartReducer from './slices/cartSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        meals: mealsReducer,
        cart: cartReducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
