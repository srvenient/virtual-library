import {Routes, Route, useLocation} from 'react-router-dom';
import LoginPage from "./auth/pages/LoginPage.tsx";
import RegisterPage from "./auth/pages/RegisterPage.tsx";
import TermsAndConditionsPage from "./auth/pages/TermsAndConditionsPage.tsx";
import AuthProvider from "./auth/context/AuthContext.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import HomePage from "./home/pages/HomePage.tsx";

export default function App() {
    const location = useLocation();
    const isPublicRoute = ["/", "/register", "/terms-and-conditions"].includes(location.pathname);

    return (
        <AuthProvider>
            <Routes>
                <Route element={isPublicRoute ? null : <ProtectedRoute/>}>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/terms-and-conditions" element={<TermsAndConditionsPage pathName={''}/>}/>

                    <Route element={<ProtectedRoute/>}>
                        <Route path="/home" element={<HomePage/>}/>
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
}