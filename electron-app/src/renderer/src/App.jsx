import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        if (loggedIn) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");  // Sauvegarder l'état de connexion
        navigate("/overview"); // Rediriger vers la page OverviewPage après la connexion
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");  // Supprimer l'état de connexion
        navigate("/"); // Rediriger vers la page Login après déconnexion
    };

    return (
        <div className="flex h-screen bg-white text-gray-100 overflow-hidden">
            {/* BG */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-white opacity-80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>
                     {isLoggedIn && <Sidebar onLogout={handleLogout} />}

            <Routes>
                {/* Page Login */}
                {/* Page de dashboard (accessible uniquement si connecté) */}
                <Route path="/overview" element={isLoggedIn ? <OverviewPage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
<Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
                {/* Autres pages, seulement si connecté */}
                <Route path="/products" element={isLoggedIn ? <ProductsPage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/users" element={isLoggedIn ? <UsersPage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/sales" element={isLoggedIn ? <SalesPage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/orders" element={isLoggedIn ? <OrdersPage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/analytics" element={isLoggedIn ? <AnalyticsPage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/settings" element={isLoggedIn ? <SettingsPage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={isLoggedIn ? <RegisterPage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
            </Routes>
        </div>
    );
}

export default App;
