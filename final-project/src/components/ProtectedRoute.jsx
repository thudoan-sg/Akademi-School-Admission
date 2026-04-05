import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, allowedRoles, children }) {
    // Chưa login
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Sai role
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // redirect về đúng dashboard theo role
        return <Navigate to={`/${user.role}`} replace />;
    }

    return children;
}

export default ProtectedRoute;