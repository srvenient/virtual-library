import {useAuth} from "../context/AuthContext.tsx";
import {Navigate, Outlet} from "react-router-dom";

export default function ProtectedRoute() {
    const {loading, isAuthenticated} = useAuth();
    console.log(loading, isAuthenticated);

    if (loading) return <div>Loading...</div>;
    if (!loading && !isAuthenticated) return <Navigate to="/" replace/>;

    return <Outlet/>;
}