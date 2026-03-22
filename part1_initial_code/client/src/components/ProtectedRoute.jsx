import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <div className="protected-shell">{children}</div>;
}

export default ProtectedRoute;
