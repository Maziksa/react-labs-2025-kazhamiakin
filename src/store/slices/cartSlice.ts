import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
    totalCount: number;
}

const initialState: CartState = {
    totalCount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<number>) => {
            state.totalCount += action.payload;
        },
    },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
