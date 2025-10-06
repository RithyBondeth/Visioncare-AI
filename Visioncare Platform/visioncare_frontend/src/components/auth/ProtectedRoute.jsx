import { Navigate } from "react-router";
import { useAuth } from "../../hooks/AuthProvider";
import { useLocation } from "react-router";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, token } = useAuth() 
    const location = useLocation()

    //Specifically protect only the PredictionPage route
    if(!isAuthenticated && !token && ( location.pathname === "/prediction" || location.pathname === "/profile")) {
        return <Navigate to="/login" replace/>
    }

    return children
}