import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { LoginPage } from '../pages/LoginPage';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardPage } from '../pages/DashboardPage';
import { MyRestaurantPage } from '../pages/MyRestaurantPage';
import { MenuPage } from '../pages/MenuPage';
import { OrdersPage } from '../pages/OrdersPage';
import { SaaSConfigPage } from '../pages/SaaSConfigPage';
import { TenantsPage } from '../pages/TenantsPage';
import { SuperAdminRoute } from './SuperAdminRoute';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route index element={<Navigate to="login" />} />
                </Route>

                {/* Rutas Privadas */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<DashboardLayout />}>
                        <Route index element={<DashboardPage />} />
                        <Route path="restaurant" element={<MyRestaurantPage />} />
                        <Route path="menu" element={<MenuPage />} />
                        <Route path="orders" element={<OrdersPage />} />


                        {/* Admin Only */}
                        <Route element={<SuperAdminRoute />}>
                            <Route path="tenants" element={<TenantsPage />} />
                            <Route path="saas-config" element={<SaaSConfigPage />} />
                        </Route>
                    </Route>
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};
