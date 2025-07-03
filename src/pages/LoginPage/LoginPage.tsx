import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginPage.module.css';
// ИЗМЕНЕНО: Импортируем тип вместе с функцией
import validateLoginForm, { ILoginFormErrorsProps } from '../../utils/validateForm';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firebaseError, setFirebaseError] = useState<string>('');
    // ИЗМЕНЕНО: Используем импортированный тип для состояния
    const [formErrors, setFormErrors] = useState<ILoginFormErrorsProps>({});
    const [loading, setLoading] = useState<boolean>(false);
    const { login, signup } = useAuth();

    const handleSubmit = async (e: React.FormEvent, action: 'login' | 'signup') => {
        e.preventDefault();
        const validationErrors = validateLoginForm({ email, password });
        setFormErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setFirebaseError('');
        setLoading(true);

        try {
            if (action === 'login') {
                await login(email, password);
            } else {
                await signup(email, password);
            }
        } catch (err: any) {
            setFirebaseError(err.message);
        }

        setLoading(false);
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
