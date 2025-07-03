import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { logoutUser } from '../../store/slices/authSlice';
import { setCurrentPage } from '../../store/slices/uiSlice';
import styles from "./Header.module.css";
import MainLogo from "../../assets/icons/logo.svg";
import CartIcon from "../../assets/icons/cart-icon.svg";

const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user: currentUser } = useSelector((state: RootState) => state.auth);
    const { totalCount: cartCount } = useSelector((state: RootState) => state.cart);
    const { currentPage } = useSelector((state: RootState) => state.ui);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
        e.preventDefault();
        if (!currentUser && page !== 'login') return;
        dispatch(setCurrentPage(page));
    };

    const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(logoutUser());
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
                                <a href="#" onClick={(e) => handleNavClick(e, 'home')} className={`${styles.headerNavLink} ${currentPage === 'home' && currentUser ? styles.headerNavLinkActive : ''}`}>Home</a>
                            </li>
                            <li className={styles.headerNavItem}>
                                <a href="#" onClick={(e) => handleNavClick(e, 'menu')} className={`${styles.headerNavLink} ${currentPage === 'menu' && currentUser ? styles.headerNavLinkActive : ''}`}>Menu</a>
                            </li>
                            <li className={styles.headerNavItem}>
                                <a href="#" className={styles.headerNavLink}>Company</a>
                            </li>
                            <li className={styles.headerNavItem}>
                                {currentUser ? (
                                    <a href="#" onClick={handleLogout} className={styles.headerNavLink}>Logout</a>
                                ) : (
                                    <a href="#" onClick={(e) => handleNavClick(e, 'login')} className={`${styles.headerNavLink} ${currentPage === 'login' ? styles.headerNavLinkActive : ''}`}>Login</a>
                                )}
                            </li>
                        </ul>
                    </nav>
                    {currentUser && (
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
