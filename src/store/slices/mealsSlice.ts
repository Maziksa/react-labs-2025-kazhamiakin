import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MenuItem} from '@src/types';

const API_URL = 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals';

interface MealsState {
    items: MenuItem[];
    loading: boolean;
    error: string | null;
}

const initialState: MealsState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchMeals = createAsyncThunk('meals/fetchMeals', async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch meals');
    }
    return await response.json();
});

const mealsSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMeals.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchMeals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default mealsSlice.reducer;
