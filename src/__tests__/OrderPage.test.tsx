import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import OrderPage from "../pages/OrderPage/OrderPage.tsx";
import cartReducer, { CartItem } from '../store/slices/cartSlice.ts';

const mockCartItems: CartItem[] = [
    { id: '1', meal: 'Pizza', quantity: 2, price: 15, img: 'pizza.jpg', category: 'Dinner', instructions: '', area: '' },
    { id: '2', meal: 'Salad', quantity: 1, price: 8, img: 'salad.jpg', category: 'Dinner', instructions: '', area: '' }
];

const createMockStore = (items: CartItem[] = []) => {
    return configureStore({
        reducer: {
            cart: cartReducer,
        },
        preloadedState: {
            cart: {
                items: items
            }
        }
    });
};

describe('OrderPage Component', () => {

    it('should display empty cart message', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <OrderPage />
            </Provider>
        );
        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    });

    it('should display cart items and total price', () => {
        const store = createMockStore(mockCartItems);
        render(
            <Provider store={store}>
                <OrderPage />
            </Provider>
        );
        expect(screen.getByText('Pizza')).toBeInTheDocument();
        expect(screen.getByText('$ 30.00 USD')).toBeInTheDocument(); // 2 * 15
        expect(screen.getByText('Salad')).toBeInTheDocument();
        expect(screen.getByText('$ 8.00 USD')).toBeInTheDocument(); // 1 * 8
    });

    it('should remove item from cart when remove button is clicked', () => {
        const store = createMockStore(mockCartItems);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <OrderPage />
                </MemoryRouter>
            </Provider>
        );
        const removeButtons = screen.getAllByText('X');
        fireEvent.click(removeButtons[0]); // Click remove for Pizza

        const state = store.getState().cart;
        expect(state.items.length).toBe(1);
        expect(state.items[0].meal).toBe('Salad');
    });

    it('should update item quantity and price', () => {
        const store = createMockStore(mockCartItems);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <OrderPage />
                </MemoryRouter>
            </Provider>
        );

        const quantityInputs = screen.getAllByRole('spinbutton');
        fireEvent.change(quantityInputs[0], { target: { value: '3' } }); // Change Pizza quantity to 3

        const state = store.getState().cart;
        expect(state.items[0].quantity).toBe(3);
        expect(screen.getByText('$ 45.00 USD')).toBeInTheDocument(); // 3 * 15
    });

    it('should show validation error if address fields are empty on submit', () => {
        const store = createMockStore(mockCartItems);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <OrderPage />
                </MemoryRouter>
            </Provider>
        );
        const orderButton = screen.getByText('Order');
        fireEvent.click(orderButton);

        expect(screen.getByText('Please fill in both Street and House fields.')).toBeInTheDocument();
    });

    it('should open success modal on successful order and then clear cart', () => {
        // Шпионим за console.log и заменяем его пустой функцией
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const store = createMockStore(mockCartItems);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <OrderPage />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('Street'), { target: { value: 'Test Street' } });
        fireEvent.change(screen.getByLabelText('House'), { target: { value: '123' } });

        const orderButton = screen.getByText('Order');
        fireEvent.click(orderButton);

        expect(screen.getByText('Order Successful!')).toBeInTheDocument();
        expect(screen.getByText('Total Price:')).toBeInTheDocument();
        expect(screen.getByText('Delivery Address:')).toBeInTheDocument();

        const okButton = screen.getByText('OK');
        fireEvent.click(okButton);

        const state = store.getState().cart;
        expect(state.items.length).toBe(0);

        // Восстанавливаем оригинальную реализацию console.log
        consoleSpy.mockRestore();
    });
});