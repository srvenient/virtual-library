import React, {Suspense} from 'react';
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SuspenseFallback from "./shared/components/feedback/SuspenseFallback.tsx";
import ProtectedRoute from "./shared/components/guard/ProtectedRoute.tsx";

const SignInPage = React.lazy(() => import('./auth/pages/SignInPage.tsx'));
const SignUpPage = React.lazy(() => import('./auth/pages/SignUpPage.tsx'));

const HomePage = React.lazy(() => import('./home/pages/HomePage.tsx'));
const BookPage = React.lazy(() => import('./book/pages/BookPage.tsx'));

function App() {
    return (
        <React.StrictMode>
            <Suspense fallback={<SuspenseFallback/>}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignInPage/>}/>
                        <Route path="/register" element={<SignUpPage/>}/>

                        <Route element={<ProtectedRoute/>}>
                            <Route path="/home" element={<HomePage/>}/>
                            <Route path="/books" element={<BookPage/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </React.StrictMode>
    )
}

export default App
