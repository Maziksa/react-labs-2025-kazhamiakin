import React from "react";
import styles from "./Header.module.css";
import MainLogo from "../../assets/icons/logo.svg";
import CartIcon from "../../assets/icons/cart-icon.svg";
import { useAuth } from "../../context/AuthContext.jsx";

function Header({ cartCount, currentPage, setCurrentPage }) {
    const { currentUser, logout } = useAuth();

    const handleNavClick = (e, page) => {
        e.preventDefault();
        // Запрещаем навигацию для неавторизованных пользователей
        if (!currentUser) return;
        setCurrentPage(page);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
        } catch (error) {
            console.error("Failed to log out", error);
        }
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
                                    className={`${styles.headerNavLink} ${currentPage === 'home' && currentUser ? styles.headerNavLinkActive : ''}`}
                                >
                                    Home
                                </a>
                            </li>
                            <li className={styles.headerNavItem}>
                                <a
                                    href="#"
                                    onClick={(e) => handleNavClick(e, 'menu')}
                                    className={`${styles.headerNavLink} ${currentPage === 'menu' && currentUser ? styles.headerNavLinkActive : ''}`}
                                >
                                    Menu
                                </a>
                            </li>
                            <li className={styles.headerNavItem}>
                                <a href="#" className={styles.headerNavLink}>Company</a>
                            </li>
                            <li className={styles.headerNavItem}>
                                {currentUser ? (
                                    <a href="#" onClick={handleLogout} className={styles.headerNavLink}>
                                        Logout
                                    </a>
                                ) : (
                                    <a href="#" className={`${styles.headerNavLink} ${currentPage === 'login' ? styles.headerNavLinkActive : ''}`}>
                                        Login
                                    </a>
                                )}
                            </li>
                        </ul>
                    </nav>
                    {currentUser && ( // Показываем корзину только залогиненным
                        <div className={styles.cartContainer}>
                            <a href="#">
                                <img src={CartIcon} alt="Cart" className={styles.headerCartImage}/>
                                <span className={styles.cartCounter}>{cartCount}</span>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
