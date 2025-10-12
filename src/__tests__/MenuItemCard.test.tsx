import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/slices/cartSlice.ts';
import MenuItemCard from '../components/MenuItemCard/MenuItemCard.tsx';
import { MenuItem } from '@src/types';

const mockItem: MenuItem = {
    id: '1',
    meal: 'Cheeseburger',
    price: 12.99,
    instructions: 'A classic beef burger with cheese, lettuce, and tomato.',
    img: 'cheeseburger.jpg',
    category: 'Dinner',
    area: 'American'
};

const createMockStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer,
        },
    });
};

describe('MenuItemCard Component', () => {
    it('should render item details correctly', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <MenuItemCard item={mockItem} />
            </Provider>
        );

        expect(screen.getByText('Cheeseburger')).toBeInTheDocument();
        expect(screen.getByText('$ 12.99 USD')).toBeInTheDocument();
        expect(screen.getByText(/A classic beef burger/)).toBeInTheDocument();
    });

    it('should add item to cart with default quantity of 1', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <MenuItemCard item={mockItem} />
            </Provider>
        );

        const addToCartButton = screen.getByText('Add to cart');
        fireEvent.click(addToCartButton);

        const state = store.getState().cart;
        expect(state.items).toHaveLength(1);
        expect(state.items[0].id).toBe('1');
        expect(state.items[0].quantity).toBe(1);
    });

    it('should add item to cart with the specified quantity', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <MenuItemCard item={mockItem} />
            </Provider>
        );

        const quantityInput = screen.getByRole('spinbutton');
        fireEvent.change(quantityInput, { target: { value: '3' } });

        const addToCartButton = screen.getByText('Add to cart');
        fireEvent.click(addToCartButton);

        const state = store.getState().cart;
        expect(state.items).toHaveLength(1);
        expect(state.items[0].quantity).toBe(3);
    });
});