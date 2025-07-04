import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem } from '@src/types';

export interface CartItem extends MenuItem {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<{ item: MenuItem; quantity: number }>) => {
            const { item, quantity } = action.payload;
            const existingItem = state.items.find(cartItem => cartItem.id === item.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ ...item, quantity });
            }
        },
        removeItemFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        // ИЗМЕНЕНО: Добавлен новый reducer для обновления количества
        updateItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.id === id);
            if (itemToUpdate && quantity >= 1) {
                itemToUpdate.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
