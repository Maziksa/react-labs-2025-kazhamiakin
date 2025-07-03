import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './firebase';
import {AppDispatch, RootState} from './store/store';
import {setUser} from './store/slices/authSlice';
import {setCurrentPage} from './store/slices/uiSlice';
import Layout from "./components/Layout/Layout";
import MenuPage from './pages/MenuPage/MenuPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from "./pages/LoginPage/LoginPage";

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user: currentUser } = useSelector((state: RootState) => state.auth);
    const { currentPage } = useSelector((state: RootState) => state.ui);

    // Слушаем изменения состояния аутентификации Firebase
    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            dispatch(setUser(user ? JSON.parse(JSON.stringify(user)) : null));
            dispatch(setCurrentPage(user ? 'home' : 'login'));
        }); // Отписываемся при размонтировании
    }, [dispatch]);

    const renderPage = () => {
        if (!currentUser) {
            return <LoginPage />;
        }

        switch (currentPage) {
            case 'menu':
                return <MenuPage />;
            case 'home':
            default:
                return <HomePage />;
        }
    };

    return (
        <Layout>
            {renderPage()}
        </Layout>
    );
}

export default App;
