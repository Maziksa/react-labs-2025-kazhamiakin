import React from "react";
import styles from "./MenuItemCard.module.css";

class MenuItemCard extends React.Component {
    state = {
        inputCount: 1,
    };

    handleCountChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            this.setState({ inputCount: "" });
            return;
        }
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue) && numValue >= 1) {
            this.setState({ inputCount: numValue });
        } else if (value === "" || (!isNaN(numValue) && numValue < 1)) {
            this.setState({ inputCount: 1 });
        }
    };

    handleAddToCartClick = () => {
        if (this.state.inputCount > 0) {
            this.props.onAddToCart(this.state.inputCount);
        }
    }

    render() {
        const { title, description, price, imageURL } = this.props;
        const { inputCount } = this.state;

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
                            onChange={this.handleCountChange}
                            className={styles.menuItemCardQuantityInput}
                            min="1"
                        />
                        <button onClick={this.handleAddToCartClick} className={styles.menuItemCardAddToCartButton}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MenuItemCard;