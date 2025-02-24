import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {loginRequest, verifyTokenRequest} from "../services/auth.ts";
import Cookies from 'js-cookie';

interface AuthContextType {
    user: any | null;
    isAuthenticated: boolean;
    login: (data: Record<string, any>) => Promise<void>;
    logout: () => void;
    loading: boolean;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth: any = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default function AuthProvider({children}: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const setAuthState = (isAuthenticated: boolean, user: any = null) => {
        setIsAuthenticated(isAuthenticated);
        setUser(user);
    };

    const onAuthStateChanged = useCallback(async () => {
        setLoading(true);

        if (!Cookies.get('token')) {
            setAuthState(false);
            setLoading(false);
            return;
        }

        try {
            const response = await verifyTokenRequest();
            if (!response.data) {
                return setAuthState(false);
            } else {
                setAuthState(true, response.data);
            }
        } catch (error: any) {
            console.error("Error verifying token:", error);
            setAuthState(false);
        } finally {
            setLoading(false);
        }
    }, [verifyTokenRequest]);

    const login = async (data: Record<string, any>) => {
        try {
            await loginRequest(data);

            setIsAuthenticated(true);
            setLoading(false);

            await onAuthStateChanged();
        } catch (error: any) {
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logout = () => {
        Cookies.remove('token');
        setAuthState(false);
    }

    useEffect(() => {
        (async () => {
            await onAuthStateChanged();
        })();
    }, [onAuthStateChanged]);

    return (
        <AuthContext.Provider value={{login, logout, user, isAuthenticated, loading}}>
            {children}
        </AuthContext.Provider>
    );
}