import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    User
} from 'firebase/auth';
import { auth } from '../../firebase';
import { ILoginFormErrorsProps } from '../../utils/validateForm';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials: ILoginFormErrorsProps) => {
    const { email, password } = credentials;
    if (!email || !password) throw new Error("Email and password are required");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
});

export const signupUser = createAsyncThunk('auth/signupUser', async (credentials: ILoginFormErrorsProps) => {
    const { email, password } = credentials;
    if (!email || !password) throw new Error("Email and password are required");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    await signOut(auth);
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload as any; // Firebase user is not directly serializable
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to login';
            })
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload as any;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to sign up';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
