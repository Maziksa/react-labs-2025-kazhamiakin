import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {theme: 'light' | 'dark' | null;
}

const initialState: ThemeState = {theme: null,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload === 'dark' ? 'dark' : 'light';
        },
        toggleTheme: (state) => {
            if (state.theme) {
                state.theme = state.theme === 'light' ? 'dark' : 'light';
            }
        },
    },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
