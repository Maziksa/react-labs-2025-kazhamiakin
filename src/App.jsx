import React, { useState, useCallback } from "react";
import Layout from "./components/Layout/Layout.jsx";
import MenuPage from './pages/MenuPage/MenuPage.jsx';

function App() {
    // Используем хук useState для управления состоянием корзины
    const [cartCount, setCartCount] = useState(0);

    // Используем useCallback, чтобы избежать лишних ре-рендеров дочерних компонентов
    const handleAddToCart = useCallback((quantity) => {
        setCartCount(prevCount => prevCount + quantity);
    }, []);

    return (
        <Layout cartCount={cartCount}>
            <MenuPage onAddToCart={handleAddToCart} />
        </Layout>
    );
}

export default App;
