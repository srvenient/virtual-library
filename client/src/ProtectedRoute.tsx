import {useAuth} from "./auth/context/AuthContext.tsx";
import {Navigate, Outlet} from "react-router-dom";

export default function ProtectedRoute() {
    const {loading, isAuthenticated} = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!loading && !isAuthenticated) return <Navigate to="/" replace/>;

    return <Outlet/>;
}