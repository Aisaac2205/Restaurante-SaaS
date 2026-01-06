import React from "react";
import { motion } from "framer-motion";

interface HeroProps {
    title: string;
    subtitle?: string;
    bgImage?: string | null;
    primaryColor: string;
    menuLink: string;
}

export const Hero: React.FC<HeroProps> = ({
    title,
    subtitle,
    bgImage,
    primaryColor,
    menuLink,
}) => {
    return (
        <div id="hero" className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-stone-900 overflow-hidden">
            {/* Left Column: Content */}
            <div className="flex flex-col justify-center px-6 pt-32 pb-16 lg:px-24 lg:py-0 z-10 order-1">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
                >
                    {/* Decorative Line */}
                    <div
                        className="w-16 h-1 mb-8 mx-auto lg:mx-0"
                        style={{ backgroundColor: primaryColor || '#000' }}
                    ></div>

                    {/* Title */}
                    <h1 className="font-sans text-4xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900 tracking-tight">
                        {title}
                    </h1>

                    {/* Subtitle / Paragraph */}
                    <p className="font-sans text-lg lg:text-xl text-stone-600 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                        {subtitle}
                    </p>

                    {/* Buttons Container */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        {/* Primary Button */}
                        <a
                            href={menuLink}
                            className="inline-block w-full sm:w-auto min-w-[200px] px-10 py-4 bg-gray-900 text-white hover:bg-black transition-colors duration-300 text-sm font-bold tracking-widest uppercase text-center"
                        >
                            Ver Menú
                        </a>

                        {/* Secondary Button */}
                        <a
                            href="#content"
                            className="inline-block w-full sm:w-auto min-w-[200px] px-10 py-4 border border-gray-900 text-gray-900 hover:bg-gray-50 transition-colors duration-300 text-sm font-bold tracking-widest uppercase bg-transparent text-center"
                        >
                            Nosotros
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Right Column: Image */}
            <div className="relative h-[50vh] lg:h-auto min-h-[400px] lg:min-h-screen order-2">
                {bgImage ? (
                    <motion.img
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        src={bgImage}
                        alt="Hero Ambience"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-stone-200 flex items-center justify-center">
                        <span className="font-sans text-stone-400 font-medium">Sin imagen disponible</span>
                    </div>
                )}
                {/* Overlay for aesthetic (optional, can be removed for pure clarity) */}
                <div className="absolute inset-0 bg-black/5 lg:hidden"></div>
            </div>
        </div>
    );
};
