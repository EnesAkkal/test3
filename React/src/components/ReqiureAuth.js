import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const hasAuth = auth?.username;
    console.log(auth);
    return (
        hasAuth
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;