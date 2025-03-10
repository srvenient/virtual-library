import React from 'react';
import './App.css'
import {Suspense} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SuspenseFallback from "./shared/components/feedback/SuspenseFallback.tsx";
import ErrorPage from "./shared/pages/ErrorPage.tsx";
import ProtectedRoute from "./shared/components/guard/ProtectedRoute.tsx";

const SignInPage = React.lazy(() => import('./auth/pages/SignInPage.tsx'));
const SignUpPage = React.lazy(() => import('./auth/pages/SignUpPage.tsx'));

const HomePage = React.lazy(() => import('./home/pages/HomePage.tsx'));

function App() {
    return (
        <React.StrictMode>
            <Suspense fallback={<SuspenseFallback/>}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignInPage/>}/>
                        <Route path="/register" element={<SignUpPage/>}/>
                        <Route path="/errors/:type" element={<ErrorPage/>}/>

                        <Route element={<ProtectedRoute/>}>
                            <Route path="/home" element={<HomePage/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </React.StrictMode>
    )
}

export default App
