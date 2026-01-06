
import { Outlet } from 'react-router-dom';
import LoginImageMobile from '../assets/login_movil.webp';
import LoginImagePC from '../assets/login_pc.webp';

export const AuthLayout = () => {
    return (
        <div className="h-screen w-full flex bg-white overflow-hidden">
            {/* Mobile: Full background image with floating form */}
            <div className="lg:hidden fixed inset-0 z-0 bg-white">
                <img
                    src={LoginImageMobile}
                    alt="Login Visual"
                    className="w-full h-full object-cover"
                />
                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
            </div>

            {/* Side Left - Form */}
            <div className="relative z-10 w-full flex-1 lg:h-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 xl:px-20 overflow-y-auto lg:bg-black">
                {/* Mobile: Solid black container / Desktop: No container */}
                <div className="w-full max-w-sm space-y-6 py-10 px-8 lg:py-0 lg:px-0 bg-black lg:bg-transparent rounded-2xl lg:rounded-none">
                    <div className="text-center lg:text-left">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                            ¡Bienvenido de nuevo!
                        </h1>
                        <p className="mt-2 lg:mt-3 text-sm lg:text-base text-gray-300 lg:text-gray-400 font-medium">
                            Panel de Administración
                        </p>
                    </div>
                    <div className="mt-6 lg:mt-8">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Side Right - Image (Desktop) */}
            <div className="hidden lg:flex w-1/2 h-full bg-white items-center justify-end">
                <img
                    src={LoginImagePC}
                    alt="Login Visual"
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
};

