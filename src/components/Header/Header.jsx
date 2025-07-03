import React from "react";
import styles from "./Header.module.css";
import MainLogo from "../../assets/icons/logo.svg";
import CartIcon from "../../assets/icons/cart-icon.svg";

function Header({ cartCount, currentPage, setCurrentPage }) {
    const handleNavClick = (e, page) => {
        e.preventDefault();
        setCurrentPage(page);
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div>
                    <a href="#" onClick={(e) => handleNavClick(e, 'home')}>
                        <img src={MainLogo} alt="logo" className={styles.headerLogoImage} />
                    </a>
                </div>
                <div className={styles.headerRightSection}>
                    <nav className={styles.headerNav}>
                        <ul className={styles.headerNavList}>
                            <li className={styles.headerNavItem}>
                                <a
                                    href="#"
                                    onClick={(e) => handleNavClick(e, 'home')}
                                    className={`${styles.headerNavLink} ${currentPage === 'home' ? styles.headerNavLinkActive : ''}`}
                                >
                                    Home
                                </a>
                            </li>
                            <li className={styles.headerNavItem}>
                                <a
                                    href="#"
                                    onClick={(e) => handleNavClick(e, 'menu')}
                                    className={`${styles.headerNavLink} ${currentPage === 'menu' ? styles.headerNavLinkActive : ''}`}
                                >
                                    Menu
                                </a>
                            </li>
                            <li className={styles.headerNavItem}>
                                <a href="#" className={styles.headerNavLink}>Company</a>
                            </li>
                            <li className={styles.headerNavItem}>
                                <a href="#" className={styles.headerNavLink}>Login</a>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.cartContainer}>
                        <a href="#">
                            <img src={CartIcon} alt="Cart" className={styles.headerCartImage}/>
                            <span className={styles.cartCounter}>{cartCount}</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
