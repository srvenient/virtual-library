import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {loginRequest, verifyTokenRequest} from "../services/auth.ts";
import Cookies from 'js-cookie';

// @ts-ignore
export const AuthContext = createContext();

export const useAuth: any = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const login = async (data: Record<string, any>) => {
        try {
            await loginRequest(data);

            setIsAuthenticated(true);
            setLoading(false);
        } catch (error: any) {
            throw error;
        }
    };

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const data = await verifyTokenRequest();
                if (!data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(data);
                setLoading(false);
            } catch (error: any) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }

        checkLogin();
    }, []);


    return (
        <AuthContext.Provider value={{login, user, isAuthenticated, loading}}>
            {children}
        </AuthContext.Provider>
    );
}