import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard, UtensilsCrossed, LogOut, Store, ClipboardList, Settings, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

export const DashboardLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    // Different navigation based on user role
    const isSuperAdmin = user?.system_role === 'SUPER_ADMIN';

    const navItems = isSuperAdmin
        ? [
            { name: 'Tenants', to: '/tenants', icon: Store },
            { name: 'Conf. SaaS', to: '/saas-config', icon: Settings },
        ]
        : [
            { name: 'Resumen', to: '/', icon: LayoutDashboard },
            { name: 'Pedidos', to: '/orders', icon: ClipboardList },
            { name: 'Mi Restaurante', to: '/restaurant', icon: Store },
            { name: 'Menú', to: '/menu', icon: UtensilsCrossed },
        ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="relative flex flex-col w-64 max-w-xs h-full bg-white shadow-xl animate-slide-in-left">
                        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
                            <span className="text-xl font-bold">Menú</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.to}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => clsx(
                                        "flex items-center px-4 py-3 text-base font-medium rounded-md group transition-colors",
                                        isActive
                                            ? "bg-black text-white"
                                            : "text-gray-700 hover:bg-gray-100 hover:text-black"
                                    )}
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </NavLink>
                            ))}
                        </nav>
                        <div className="p-4 border-t border-gray-200">
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 rounded-md hover:bg-red-50"
                            >
                                <LogOut className="mr-3 h-5 w-5" />
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <span className="text-xl font-bold">Admin Panel</span>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.to}
                            className={({ isActive }) => clsx(
                                "flex items-center px-4 py-2 text-sm font-medium rounded-md group transition-colors",
                                isActive
                                    ? "bg-black text-white"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
                            )}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 justify-between md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 hover:bg-gray-100 rounded-md">
                        <Menu className="h-6 w-6 text-gray-700" />
                    </button>
                    <span className="font-bold text-lg">Admin Panel</span>
                    <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-md text-red-600">
                        <LogOut className="h-5 w-5" />
                    </button>
                </header>

                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
