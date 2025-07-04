import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { removeItemFromCart, clearCart, updateItemQuantity } from '../../store/slices/cartSlice';
import styles from './OrderPage.module.css';
import Modal from '../../components/Modal/Modal';

const OrderPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: cartItems } = useSelector((state: RootState) => state.cart);
    const [street, setStreet] = useState('');
    const [house, setHouse] = useState('');
    const [addressError, setAddressError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cartItems]);

    const handleRemoveItem = (id: string) => {
        dispatch(removeItemFromCart(id));
    };

    const handleQuantityChange = (id: string, newQuantity: number) => {
        const quantity = Math.max(1, newQuantity);
        dispatch(updateItemQuantity({ id, quantity }));
    };

    const handleOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!street || !house) {
            setAddressError('Please fill in both Street and House fields.');
            return;
        }

        console.log('Order placed:', { cartItems, street, house, totalPrice });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        dispatch(clearCart());
        setStreet('');
        setHouse('');
        setAddressError('');
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
        setter(value);
        if (addressError) {
            setAddressError('');
        }
    };

    return (
        <div className={styles.orderPageMain}>
            <div className={styles.orderPageContainer}>
                <h2 className={styles.title}>Finish your order</h2>
                <div className={styles.orderForm}>
                    <div className={styles.orderItems}>
                        {cartItems.length > 0 ? (
                            cartItems.map(item => (
                                <div key={item.id} className={styles.orderItem}>
                                    <img src={item.img} alt={item.meal} className={styles.itemImage} />
                                    <span className={styles.itemName}>{item.meal}</span>
                                    {/* ИЗМЕНЕНО: Отображаем цену с учетом количества */}
                                    <span className={styles.itemPrice}>{`$ ${(item.price * item.quantity).toFixed(2)} USD`}</span>
                                    <input
                                        type="number"
                                        className={styles.itemQuantityInput}
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                                    />
                                    <button onClick={() => handleRemoveItem(item.id)} className={styles.removeButton}>X</button>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <form className={styles.addressForm} onSubmit={handleOrder}>
                            <div className={styles.formGroup}>
                                <label htmlFor="street">Street</label>
                                <input type="text" id="street" value={street} onChange={e => handleInputChange(setStreet, e.target.value)} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="house">House</label>
                                <input type="text" id="house" value={house} onChange={e => handleInputChange(setHouse, e.target.value)} />
                            </div>
                            {addressError && <p className={styles.addressError}>{addressError}</p>}
                            <button type="submit" className={styles.submitOrderButton}>Order</button>
                        </form>
                    )}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2>Order Successful!</h2>
                <div className={styles.orderDetails}>
                    <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)} USD</p>
                    <p><strong>Delivery Address:</strong> {street}, {house}</p>
                </div>
                <p>Thank you for your order!</p>
                <button onClick={handleCloseModal}>OK</button>
            </Modal>
        </div>
    );
};

export default OrderPage;
