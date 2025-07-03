import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

interface LayoutProps {
    children: React.ReactNode;
    cartCount: number;
    currentPage: string;
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const Layout: React.FC<LayoutProps> = ({ children, cartCount, currentPage, setCurrentPage }) => {
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
