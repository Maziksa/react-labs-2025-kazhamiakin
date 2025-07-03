import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchMeals } from '../../store/slices/mealsSlice';
import styles from './MenuPage.module.css';
import MenuItemCard from '../../components/MenuItemCard/MenuItemCard';
import Tooltip from '../../components/Tooltip/Tooltip';

const ITEMS_PER_PAGE = 6;
const CATEGORIES = ['Desert', 'Dinner', 'Breakfast'];

const MenuPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: menuItems, loading, error } = useSelector((state: RootState) => state.meals);

    const [visibleItemsCount, setVisibleItemsCount] = useState<number>(ITEMS_PER_PAGE);
    const [activeCategory, setActiveCategory] = useState<string>('Desert');

    useEffect(() => {
        dispatch(fetchMeals());
    }, [dispatch]);

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setVisibleItemsCount(ITEMS_PER_PAGE);
    };

    const filteredItems = useMemo(() => {
        if (!menuItems) return [];
        const filterCategory = activeCategory === 'Desert' ? 'Dessert' : activeCategory;
        return menuItems.filter(item => item.category === filterCategory);
    }, [menuItems, activeCategory]);

    const visibleItems = filteredItems.slice(0, visibleItemsCount);
    const hasMoreItems = visibleItemsCount < filteredItems.length;

    const handleSeeMore = () => {
        setVisibleItemsCount(prevCount => prevCount + ITEMS_PER_PAGE);
    };

    if (loading) return <div className={styles.message}>Loading...</div>;
    if (error) return <div className={styles.message}>Error: {error}</div>;

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
                    {CATEGORIES.map(category => (
                        <button key={category} onClick={() => handleCategoryChange(category)} className={`${styles.menuPageCategoryButton} ${activeCategory === category ? styles.menuPageCategoryButtonActive : ''}`}>
                            {category}
                        </button>
                    ))}
                </section>
                <div className={styles.menuPageGrid}>
                    {visibleItems.map((menuItem) => (
                        <MenuItemCard key={menuItem.id} item={menuItem} />
                    ))}
                </div>
                {hasMoreItems && (
                    <div className={styles.seeMoreContainer}>
                        <button onClick={handleSeeMore} className={styles.menuGridSeeMoreButton}>See more</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MenuPage;
