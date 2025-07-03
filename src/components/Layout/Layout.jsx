import React from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import styles from "./Layout.module.css";

function Layout({ children, cartCount, currentPage, setCurrentPage }) {
    return (
        <div className={styles.layout}>
            <Header
                cartCount={cartCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <main className={styles.layoutMain}>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
