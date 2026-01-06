import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
    allowedRoles?: string[]; // For System Roles or Tenant Roles
    requireSuperAdmin?: boolean;
}

export const ProtectedRoute = ({ requireSuperAdmin }: ProtectedRouteProps) => {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="p-4">Loading...</div>; // Or a proper spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    if (requireSuperAdmin && user?.system_role !== 'SUPER_ADMIN') {
        // Redirect standard users to dashboard if they try to access admin pages
        return <Navigate to="/" replace />;
    }

    // Future: Check for tenant roles (OWNER, MANAGER) using allowedRoles

    return <Outlet />;
};
