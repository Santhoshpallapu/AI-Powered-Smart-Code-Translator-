import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./styles/components.css";
import HomePage from "./pages/HomePage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
    return (
        <div className="app-shell">
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<ProtectedRoute><Navbar /><HomePage /></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute><Navbar /><HistoryPage /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    )
}

export default App;
