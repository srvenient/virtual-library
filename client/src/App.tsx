import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from "./auth/pages/LoginPage.tsx";
import RegisterPage from "./auth/pages/RegisterPage.tsx";
import TermsAndConditionsPage from "./common/pages/TermsAndConditionsPage.tsx";
import HomePage from "./core/pages/HomePage.tsx";
import AuthProvider from "./auth/context/AuthContext.tsx";
import ProtectedRoute from "./auth/components/ProtectedRoute.tsx";
import BooksPage from "./book/pages/BooksPage.tsx";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/terms-and-conditions" element={<TermsAndConditionsPage pathName={''}/>}/>

                    <Route element={<ProtectedRoute/>}>
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/books" element={<BooksPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}