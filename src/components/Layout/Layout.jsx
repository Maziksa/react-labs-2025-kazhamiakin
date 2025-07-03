import React from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import styles from "./Layout.module.css";

class Layout extends React.Component {
    render() {
        const { children, cartCount } = this.props;
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
}

export default Layout;