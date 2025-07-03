import React from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import styles from "./Layout.module.css";

function Layout({ children, cartCount }) {
    return (
        <div className={styles.layout}>
            <Header cartCount={cartCount} />
            <main className={styles.layoutMain}>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
