import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store/store';
import { logoutUser } from '../../store/slices/authSlice';
import styles from "./Header.module.css";
import MainLogo from "../../assets/icons/logo.svg";
import CartIcon from "../../assets/icons/cart-icon.svg";

const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const { user: currentUser } = useSelector((state: RootState) => state.auth);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        await dispatch(logoutUser());
        navigate('/login');
    };

    const getLinkClass = (path: string) => {
        return `${styles.headerNavLink} ${location.pathname === path ? styles.headerNavLinkActive : ''}`;
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div>
                    <Link to="/">
                        <img src={MainLogo} alt="logo" className={styles.headerLogoImage} />
                    </Link>
                </div>
                <div className={styles.headerRightSection}>
                    <nav className={styles.headerNav}>
                        <ul className={styles.headerNavList}>
                            <li className={styles.headerNavItem}>
                                <Link to="/" className={getLinkClass('/')}>Home</Link>
                            </li>
                            <li className={styles.headerNavItem}>
                                <Link to="/menu" className={getLinkClass('/menu')}>Menu</Link>
                            </li>
                            <li className={styles.headerNavItem}>
                                <a href="#" className={styles.headerNavLink}>Company</a>
                            </li>
                            <li className={styles.headerNavItem}>
                                {currentUser ? (
                                    <a href="#" onClick={handleLogout} className={styles.headerNavLink}>Logout</a>
                                ) : (
                                    <Link to="/login" className={getLinkClass('/login')}>Login</Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                    {currentUser && (
                        <div className={styles.cartContainer}>
                            <Link to="/order">
                                <img src={CartIcon} alt="Cart" className={styles.headerCartImage}/>
                                {cartCount > 0 && <span className={styles.cartCounter}>{cartCount}</span>}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
