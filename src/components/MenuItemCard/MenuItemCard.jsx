import React, { useState } from "react";
import styles from "./MenuItemCard.module.css";

function MenuItemCard({ title, description, price, imageURL, onAddToCart }) {
    const [inputCount, setInputCount] = useState(1);

    const handleCountChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            setInputCount("");
            return;
        }
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue) && numValue >= 1) {
            setInputCount(numValue);
        } else if (value === "" || (!isNaN(numValue) && numValue < 1)) {
            setInputCount(1);
        }
    };

    const handleAddToCartClick = () => {
        if (inputCount > 0) {
            onAddToCart(inputCount);
        }
    };

    const shortDescription = description.length > 100 ? description.substring(0, 100) + '...' : description;

    return (
        <div className={styles.menuItemCard}>
            <div className={styles.menuItemCardImageContainer}>
                <img src={imageURL} alt={title} className={styles.menuItemCardImage} />
            </div>
            <div className={styles.menuItemCardInfo}>
                <div className={styles.menuItemCardHeader}>
                    <h4 className={styles.menuItemCardTitle}>{title}</h4>
                    <span className={styles.menuItemCardPrice}>{price}</span>
                </div>
                <p className={styles.menuItemCardDescription}>{shortDescription}</p>
                <div className={styles.menuItemCardControls}>
                    <input
                        type="number"
                        value={inputCount}
                        onChange={handleCountChange}
                        className={styles.menuItemCardQuantityInput}
                        min="1"
                    />
                    <button onClick={handleAddToCartClick} className={styles.menuItemCardAddToCartButton}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MenuItemCard;
