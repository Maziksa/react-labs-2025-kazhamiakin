import React, { useState, useCallback, useEffect } from "react";
import Layout from "./components/Layout/Layout.jsx";
import MenuPage from './pages/MenuPage/MenuPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

function AppContent() {
    const { currentUser } = useAuth();
    const [cartCount, setCartCount] = useState(0);
    const [currentPage, setCurrentPage] = useState('home');

    const handleAddToCart = useCallback((quantity) => {
        setCartCount(prevCount => prevCount + quantity);
    }, []);

    // При изменении статуса аутентификации, переключаем страницу
    useEffect(() => {
        if (currentUser) {
            setCurrentPage('home');
        } else {
            setCurrentPage('login');
        }
    }, [currentUser]);


    const renderPage = () => {
        // Если пользователя нет, всегда показываем страницу входа
        if (!currentUser) {
            return <LoginPage />;
        }

        // В противном случае, показываем страницу на основе currentPage
        switch (currentPage) {
            case 'menu':
                return <MenuPage onAddToCart={handleAddToCart} />;
            case 'home':
            default:
                return <HomePage />;
        }
    };

    return (
        <Layout
            cartCount={cartCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        >
            {renderPage()}
        </Layout>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
