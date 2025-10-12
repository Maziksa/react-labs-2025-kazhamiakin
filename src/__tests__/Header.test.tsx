import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header/Header';
import cartReducer from '../store/slices/cartSlice';
import authReducer from '../store/slices/authSlice';
import themeReducer from '../store/slices/themeSlice';
import { CartItem } from '../store/slices/cartSlice';

jest.mock('../firebase', () => ({
    auth: {}, // Предоставляем пустой объект для мока 'auth'
}));

const createMockStore = (cartItems: CartItem[] = [], user: any = null) => {
    return configureStore({
        reducer: {
            cart: cartReducer,
            auth: authReducer,
            theme: themeReducer,
        },
        preloadedState: {
            cart: {
                items: cartItems,
            },
            auth: {
                user,
                loading: false,
                error: null,
            },
            theme: {
                // Исправление: добавлено утверждение типа 'as light'
                theme: 'light' as 'light',
            }
        },
    });
};

describe('Header Component', () => {
    const mockUser = { uid: '123', email: 'test@test.com' };

    it('should not display cart icon if user is not logged in', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.queryByAltText('Cart')).not.toBeInTheDocument();
    });

    it('should display cart icon but no counter if cart is empty and user is logged in', () => {
        const store = createMockStore([], mockUser);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByAltText('Cart')).toBeInTheDocument();
        // В вашем коде счетчик рендерится только если cartCount > 0
        expect(screen.queryByText(/\d+/)).not.toBeInTheDocument();
    });

    it('should display cart count correctly when items are in cart', () => {
        const mockCartItems: CartItem[] = [
            { id: '1', meal: 'Item 1', quantity: 2, price: 10, img: '', category: '', instructions: '', area: '' },
            { id: '2', meal: 'Item 2', quantity: 3, price: 10, img: '', category: '', instructions: '', area: '' },
        ]; // Общее количество 5
        const store = createMockStore(mockCartItems, mockUser);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('5')).toBeInTheDocument();
    });
});