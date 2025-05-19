import React from 'react';
import styles from './MenuPage.module.css'
import MenuItemCard from '../../components/MenuItemCard/MenuItemCard.jsx'
import Tooltip from '../../components/Tooltip/Tooltip.jsx'
import {menuItems} from '../../data/menuItemsData.js'

function MenuPage() {
    return (
        <div className={styles.menuPage}>
            <div className={styles.menuContent}>
                <section className={styles.menuPageHero}>
                    <h1 className={styles.menuPageTitle}>Browse our menu</h1>
                    <p className={styles.menuPageDescription}>Use our menu to place an order online, or <Tooltip triggerText="phone" tooltipContent="Call us: +370-000-0000"/> our store to place a pickup order. Fast and fresh food.</p>
                </section>
                <section className={styles.menuPageCategories}>
                    <button className={`${styles.menuPageCategoryButton} ${styles.menuPageCategoryButtonActive}`}>Desert</button>
                    <button className={styles.menuPageCategoryButton}>Dinner</button>
                    <button className={styles.menuPageCategoryButton}>Breakfast</button>
                </section>
                <div className={styles.menuPageGrid}>
                    {menuItems.map((menuItem) => (
                        <MenuItemCard
                            key={menuItem.id}
                            title={menuItem.name}
                            price={menuItem.price}
                            description={menuItem.description}
                            imageURL={menuItem.imageURL}
                        />
                    ))}
                </div>
                <div className={styles.seeMoreContainer}>
                    <button className={styles.menuGridSeeMoreButton}>See more</button>
                </div>
            </div>
        </div>
    )
}

export default MenuPage