import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./auth/pages/LoginPage.tsx";
import RegisterPage from "./auth/pages/RegisterPage.tsx";
import TermsAndConditionsPage from "./common/TermsAndConditionsPage.tsx";

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        </Routes>
    </BrowserRouter>
  );
}