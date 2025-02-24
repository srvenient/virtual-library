import {useState} from "react";
import {useAuth} from "../context/AuthContext.tsx";
import {NavigateFunction, useNavigate} from "react-router-dom";

export function useLogin() {
    const {login} = useAuth();
    const navigate: NavigateFunction = useNavigate();
    const [error, setError] = useState<boolean | null>(null);

    const handleLogin = async (data: Record<string, any>) => {
        setError(null);
        try {
            await login(data);
            navigate('/home');
        } catch (error: any) {
            setError(true);
        }
    };

    return {handleLogin, error};
}
