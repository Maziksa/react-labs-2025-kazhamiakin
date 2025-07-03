import React, { useState, useCallback } from "react";
import Layout from "./components/Layout/Layout.jsx";
import MenuPage from './pages/MenuPage/MenuPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx'; // Импортируем новую страницу

function App() {
    const [cartCount, setCartCount] = useState(0);
    const [currentPage, setCurrentPage] = useState('home'); // Состояние для текущей страницы

    const handleAddToCart = useCallback((quantity) => {
        setCartCount(prevCount => prevCount + quantity);
    }, []);

    const renderPage = () => {
        switch (currentPage) {
            case 'menu':
                return <MenuPage onAddToCart={handleAddToCart} />;
            case 'home':
            default:
                return <HomePage />;
        }
    };

    return (
        <Layout cartCount={cartCount} currentPage={currentPage} setCurrentPage={setCurrentPage}>
            {renderPage()}
        </Layout>
    );
}

export default App;
