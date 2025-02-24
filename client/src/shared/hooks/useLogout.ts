import {useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useAuth} from "../../auth/context/AuthContext.tsx";

export function useLogout() {
    const {logout} = useAuth();
    const navigate: NavigateFunction = useNavigate();
    const [error, setError] = useState<boolean | null>(null);

    const handleLogout = async () => {
        setError(null);
        try {
            await logout();
            navigate('/');
        } catch (error: any) {
            setError(true);
        }
    };

    return {handleLogout, error};
}
