import {useAuth} from "../context/AuthContext.tsx";
import {Navigate, Outlet} from "react-router-dom";

export default function ProtectedRoute() {
    const {isAuthenticated} = useAuth();
    console.log(isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <Outlet />
    );
}