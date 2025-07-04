import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addItemToCart } from '../../store/slices/cartSlice';
import styles from "./MenuItemCard.module.css";
import { MenuItem } from "@src/types";

interface MenuItemCardProps {
    item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [inputCount, setInputCount] = useState<number>(1);

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numValue = parseInt(value, 10);
        if (value === "" || isNaN(numValue)) {
            setInputCount(1);
        } else if (numValue >= 1) {
            setInputCount(numValue);
        }
    };

    const handleAddToCartClick = () => {
        if (inputCount > 0) {
            dispatch(addItemToCart({ item, quantity: inputCount }));
        }
    };

    const shortDescription = item.instructions.length > 100 ? item.instructions.substring(0, 100) + '...' : item.instructions;

    return (
        <div className={styles.menuItemCard}>
            <div className={styles.menuItemCardImageContainer}>
                <img src={item.img} alt={item.meal} className={styles.menuItemCardImage} />
            </div>
            <div className={styles.menuItemCardInfo}>
                <div className={styles.menuItemCardHeader}>
                    <h4 className={styles.menuItemCardTitle}>{item.meal}</h4>
                    <span className={styles.menuItemCardPrice}>{`$ ${item.price.toFixed(2)} USD`}</span>
                </div>
                <p className={styles.menuItemCardDescription}>{shortDescription}</p>
                <div className={styles.menuItemCardControls}>
                    <input type="number" value={inputCount} onChange={handleCountChange} className={styles.menuItemCardQuantityInput} min="1" />
                    <button onClick={handleAddToCartClick} className={styles.menuItemCardAddToCartButton}>Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default MenuItemCard;
