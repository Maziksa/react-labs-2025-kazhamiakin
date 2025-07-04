import { useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setTheme } from '../store/slices/themeSlice';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useSelector((state: RootState) => state.theme);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            dispatch(setTheme(storedTheme));
        } else {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            dispatch(setTheme(systemPrefersDark ? 'dark' : 'light'));
        }
    }, [dispatch]);

    useEffect(() => {if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    return <>{children}</>;
};
