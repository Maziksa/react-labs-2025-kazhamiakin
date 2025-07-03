import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginPage.module.css';
import validateLoginForm from '../../utils/validateForm';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firebaseError, setFirebaseError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { login, signup } = useAuth();

    const handleSubmit = async (e, action) => {
        e.preventDefault();

        const validationErrors = validateLoginForm({ email, password });
        setFormErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setFirebaseError('');
        setLoading(true);

        try {
            if (action === 'login') {
                await login(email, password);
            } else {
                await signup(email, password);
            }
        } catch (err) {
            setFirebaseError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className={styles.loginPageContainer}>
            <h2 className={styles.title}>Log In</h2>
            <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e, 'login')}>

                {/* ИСПРАВЛЕНО: Отображение ошибки от Firebase */}
                {firebaseError && <p className={styles.errorMessage}>{firebaseError}</p>}

                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.label}>Email</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="email"
                            id="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            required
                        />
                        {formErrors.email && <p className={styles.validationError}>{formErrors.email}</p>}
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                        {formErrors.password && <p className={styles.validationError}>{formErrors.password}</p>}
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${styles.button} ${styles.buttonPrimary}`}
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        disabled={loading}
                        onClick={(e) => handleSubmit(e, 'signup')}
                        className={styles.button}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
