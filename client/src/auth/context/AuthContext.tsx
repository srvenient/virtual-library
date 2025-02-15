import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {loginRequest, verifyTokenRequest} from "../api/auth.ts";
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

    const login = async (data: Record<string, any>) => {
        try {
            const response = await loginRequest(data);
            setIsAuthenticated(true);
            setUser(response.data);
        } catch (error: any) {
            throw error;
        }
    };

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if (cookies.token) {
                try {
                    const response = await verifyTokenRequest(cookies.token);
                    if (!response.data) {
                        setIsAuthenticated(false);
                    }
                    setIsAuthenticated(true);
                    setUser(response.data);
                } catch (error: any) {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
        }

        checkLogin();
    }, []);


    return (
        <AuthContext.Provider value={{login, user, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
}