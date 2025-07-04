import React, {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {onAuthStateChanged} from 'firebase/auth';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {auth} from './firebase';
import {AppDispatch} from './store/store';
import {setUser} from './store/slices/authSlice';
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import MenuPage from './pages/MenuPage/MenuPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from "./pages/LoginPage/LoginPage";
import OrderPage from "./pages/OrderPage/OrderPage";

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            dispatch(setUser(user ? JSON.parse(JSON.stringify(user)) : null));
        });
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Public Routes */}
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="menu" element={<MenuPage />} />

                    {/* Private Routes */}
                    <Route path="order" element={
                        <PrivateRoute>
                            <OrderPage />
                        </PrivateRoute>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
