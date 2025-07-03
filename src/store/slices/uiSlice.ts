import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    currentPage: string;
}

const initialState: UiState = {
    currentPage: 'home',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<string>) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setCurrentPage } = uiSlice.actions;
export default uiSlice.reducer;
