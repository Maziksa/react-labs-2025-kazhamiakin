import React, { useState, useCallback, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import MenuPage from './pages/MenuPage/MenuPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from "./pages/LoginPage/LoginPage";
import { AuthProvider, useAuth } from "./context/AuthContext";

const AppContent: React.FC = () => {
    const { currentUser } = useAuth();
    const [cartCount, setCartCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<string>('home');

    const handleAddToCart = useCallback((quantity: number) => {
        setCartCount(prevCount => prevCount + quantity);
    }, []);

    useEffect(() => {
        if (currentUser) {
            setCurrentPage('home');
        } else {
            setCurrentPage('login');
        }
    }, [currentUser]);

    const renderPage = () => {
        if (!currentUser) {
            return <LoginPage />;
        }

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

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
