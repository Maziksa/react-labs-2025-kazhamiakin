import cartReducer, {
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCart
} from '../store/slices/cartSlice.ts';
import { MenuItem } from '@src/types';

describe('cartSlice', () => {
    const initialState = {
        items: [],
    };

    const mockItem: MenuItem = {
        id: '1',
        meal: 'Test Meal',
        price: 10,
        img: 'test.jpg',
        category: 'Dinner',
        instructions: 'Test instructions',
        area: 'Test Area'
    };

    const mockItem2: MenuItem = {
        id: '2',
        meal: 'Test Meal 2',
        price: 15,
        img: 'test2.jpg',
        category: 'Dinner',
        instructions: 'Test instructions 2',
        area: 'Test Area'
    };


    it('should return the initial state', () => {
        expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle addItemToCart for a new item', () => {
        const action = addItemToCart({ item: mockItem, quantity: 2 });
        const state = cartReducer(initialState, action);
        expect(state.items).toHaveLength(1);
        expect(state.items[0]).toEqual({ ...mockItem, quantity: 2 });
    });

    it('should handle addItemToCart for an existing item', () => {
        const stateWithItem = {
            items: [{ ...mockItem, quantity: 1 }],
        };
        const action = addItemToCart({ item: mockItem, quantity: 2 });
        const newState = cartReducer(stateWithItem, action);
        expect(newState.items).toHaveLength(1);
        expect(newState.items[0].quantity).toBe(3);
    });

    it('should handle removeItemFromCart', () => {
        const stateWithItems = {
            items: [
                { ...mockItem, quantity: 1 },
                { ...mockItem2, quantity: 2 }
            ],
        };
        const action = removeItemFromCart('1');
        const newState = cartReducer(stateWithItems, action);
        expect(newState.items).toHaveLength(1);
        expect(newState.items[0].id).toBe('2');
    });

    it('should handle updateItemQuantity', () => {
        const stateWithItems = {
            items: [{ ...mockItem, quantity: 2 }],
        };
        const action = updateItemQuantity({ id: '1', quantity: 5 });
        const newState = cartReducer(stateWithItems, action);
        expect(newState.items[0].quantity).toBe(5);
    });

    it('should not update quantity if less than 1', () => {
        const stateWithItems = {
            items: [{ ...mockItem, quantity: 2 }],
        };
        const action = updateItemQuantity({ id: '1', quantity: 0 });
        const newState = cartReducer(stateWithItems, action);
        // В вашем редьюсере проверка `quantity >= 1`, так что состояние не должно измениться
        expect(newState.items[0].quantity).toBe(2);
    });

    it('should handle clearCart', () => {
        const stateWithItems = {
            items: [{ ...mockItem, quantity: 2 }],
        };
        const action = clearCart();
        const newState = cartReducer(stateWithItems, action);
        expect(newState.items).toHaveLength(0);
    });
});