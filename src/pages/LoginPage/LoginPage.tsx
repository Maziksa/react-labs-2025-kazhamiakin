import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { loginUser, signupUser } from '../../store/slices/authSlice';
import styles from './LoginPage.module.css';
import validateLoginForm, { ILoginFormErrorsProps } from '../../utils/validateForm';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error: firebaseError, user: currentUser } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [formErrors, setFormErrors] = useState<ILoginFormErrorsProps>({});

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (currentUser) {
            navigate(from, { replace: true });
        }
    }, [currentUser, navigate, from]);

    const handleSubmit = (e: React.FormEvent, action: 'login' | 'signup') => {
        e.preventDefault();
        const validationErrors = validateLoginForm({ email, password });
        setFormErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        if (action === 'login') {
            dispatch(loginUser({ email, password }));
        } else {
            dispatch(signupUser({ email, password }));
        }
    };

    return (
        <div className={styles.loginPageContainer}>
            <h2 className={styles.title}>Log In</h2>
            <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e, 'login')}>
                {firebaseError && <p className={styles.errorMessage}>{firebaseError}</p>}
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.label}>Email</label>
                    <div className={styles.inputWrapper}>
                        <input type="email" id="username" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} required />
                        {formErrors.email && <p className={styles.validationError}>{formErrors.email}</p>}
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <div className={styles.inputWrapper}>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} required />
                        {formErrors.password && <p className={styles.validationError}>{formErrors.password}</p>}
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" disabled={loading} className={`${styles.button} ${styles.buttonPrimary}`}>Submit</button>
                    <button type="button" disabled={loading} onClick={(e) => handleSubmit(e, 'signup')} className={styles.button}>Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
