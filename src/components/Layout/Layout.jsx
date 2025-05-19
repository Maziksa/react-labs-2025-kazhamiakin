import React from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import styles from "./Layout.module.css"

function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.layoutMain}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout;