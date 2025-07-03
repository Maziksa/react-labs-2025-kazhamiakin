import React from 'react';
import styles from './MenuPage.module.css';
import MenuItemCard from '../../components/MenuItemCard/MenuItemCard.jsx';
import Tooltip from '../../components/Tooltip/Tooltip.jsx';

const API_URL = 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals';
const ITEMS_PER_PAGE = 6;

class MenuPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: [],
            visibleItemsCount: ITEMS_PER_PAGE,
            loading: true,
            error: null,
        };
    }
    componentDidMount() {
        this.fetchMenuItems();
    }

    fetchMenuItems = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Сохраняем полученные данные в состояние
            this.setState({
                menuItems: data,
                loading: false
            });
        } catch (error) {
            // Обрабатываем ошибки при запросе
            this.setState({
                error: error.message,
                loading: false
            });
        }
    };

    handleSeeMore = () => {
        this.setState(prevState => ({
            visibleItemsCount: prevState.visibleItemsCount + ITEMS_PER_PAGE
        }));
    };

    render() {
        const { menuItems, visibleItemsCount, loading, error } = this.state;
        const { onAddToCart } = this.props;

        if (loading) {
            return <div className={styles.message}>Loading...</div>;
        }

        if (error) {
            return <div className={styles.message}>Error: {error}</div>;
        }

        const visibleItems = menuItems.slice(0, visibleItemsCount);
        const hasMoreItems = visibleItemsCount < menuItems.length;

        return (
            <div className={styles.menuPage}>
                <div className={styles.menuContent}>
                    <section className={styles.menuPageHero}>
                        <h1 className={styles.menuPageTitle}>Browse our menu</h1>
                        <p className={styles.menuPageDescription}>
                            Use our menu to place an order online, or <Tooltip triggerText="phone" tooltipContent="Call us: +370-000-0000"/> our store to place a pickup order. Fast and fresh food.
                        </p>
                    </section>
                    <section className={styles.menuPageCategories}>
                        <button className={`${styles.menuPageCategoryButton} ${styles.menuPageCategoryButtonActive}`}>Desert</button>
                        <button className={styles.menuPageCategoryButton}>Dinner</button>
                        <button className={styles.menuPageCategoryButton}>Breakfast</button>
                    </section>
                    <div className={styles.menuPageGrid}>
                        {visibleItems.map((menuItem) => (
                            <MenuItemCard
                                key={menuItem.id}
                                title={menuItem.meal}
                                price={`$ ${Number(menuItem.price).toFixed(2)} USD`}
                                description={menuItem.instructions}
                                imageURL={menuItem.img}
                                onAddToCart={onAddToCart}
                            />
                        ))}
                    </div>
                    {hasMoreItems && (
                        <div className={styles.seeMoreContainer}>
                            <button onClick={this.handleSeeMore} className={styles.menuGridSeeMoreButton}>
                                See more
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default MenuPage;
