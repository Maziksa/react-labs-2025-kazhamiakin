import React, { useState, useMemo } from 'react';
import styles from './MenuPage.module.css';
import MenuItemCard from '../../components/MenuItemCard/MenuItemCard';
import Tooltip from '../../components/Tooltip/Tooltip';
import { useFetch } from '../../hooks/useFetch';
import { MenuItem } from '@src/types';

const API_URL = 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals';
const ITEMS_PER_PAGE = 6;
const CATEGORIES = ['Desert', 'Dinner', 'Breakfast'];

interface MenuPageProps {
    onAddToCart: (quantity: number) => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ onAddToCart }) => {
    const { data: menuItems, loading, error } = useFetch<MenuItem[]>(API_URL);
    const [visibleItemsCount, setVisibleItemsCount] = useState<number>(ITEMS_PER_PAGE);
    const [activeCategory, setActiveCategory] = useState<string>('Desert');

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
                        <MenuItemCard key={menuItem.id} item={menuItem} onAddToCart={onAddToCart} />
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
