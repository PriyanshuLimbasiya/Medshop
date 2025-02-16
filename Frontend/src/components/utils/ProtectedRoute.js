import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) throw new Error("No token found");

                await axios.get("http://localhost:5000/api/auth/check-auth", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) return <p>Loading...</p>;
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
