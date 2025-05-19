import React from "react";
import styles from "./Header.module.css";
import MainLogo from "../../assets/icons/logo.svg";
import CartIcon from "../../assets/icons/cart-icon.svg";


function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div>
                    <a href="#">
                        <img src={MainLogo} alt="logo" className={styles.headerLogoImage} />
                    </a>
                </div>
                <div className={styles.headerRightSection}>
                    <nav className={styles.headerNav}>
                        <ul className={styles.headerNavList}>
                            <li className={styles.headerNavItem}>
                                <a href="#" className={styles.headerNavLink}>Home</a>
                            </li>
                            <li className={styles.headerNavItem}>
                                <a href="#" className={`${styles.headerNavLink} ${styles.headerNavLinkActive}`}>Menu</a>
                            </li>
                            <li className={styles.headerNavItem}>
                                <a href="#" className={styles.headerNavLink}>Company</a>
                            </li>
                            <li className={styles.headerNavItem}>
                                <a href="#" className={styles.headerNavLink}>Login</a>
                            </li>
                        </ul>
                    </nav>
                    <div>
                        <a href="#">
                            <img src={CartIcon} alt="Cart" className={styles.headerCartImage}/>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;