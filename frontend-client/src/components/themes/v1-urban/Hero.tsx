import { motion } from 'framer-motion';

interface LandingHeroProps {
    title: string | null;
    subtitle: string | null;
    bgImage: string | null;
    primaryColor: string;
    menuLink: string;
    menuMode?: 'INTERACTIVE' | 'PDF';
    menuPdfUrl?: string | null;
}

export const LandingHero = ({ title, subtitle, bgImage, primaryColor, menuLink, menuMode = 'INTERACTIVE', menuPdfUrl }: LandingHeroProps) => {
    // Determine button behavior based on menu mode
    const menuButtonProps = menuMode === 'PDF' && menuPdfUrl
        ? { href: menuPdfUrl, target: '_blank', rel: 'noopener noreferrer' }
        : { href: menuLink };

    return (
        <div className="relative h-screen w-full flex items-center justify-start overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                {bgImage ? (
                    <img
                        src={bgImage}
                        alt="Restaurante Hero"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-900" />
                )}
                {/* Dark gradients for better text readability */}
                <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Content Left-Aligned */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-start text-left max-w-2xl"
                >
                    {/* Decorative Line */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-1 bg-white mb-8"
                    />

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] font-sans tracking-tight">
                        {title || "The best food experience"}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light opacity-90 max-w-xl">
                        {subtitle || "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut drak atempus sit euismod."}
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <a
                            {...menuButtonProps}
                            className="bg-white text-black text-center font-bold py-4 px-8 rounded-none hover:bg-gray-100 transition-colors uppercase tracking-widest text-sm w-full md:w-auto min-w-[200px]"
                        >
                            {menuMode === 'PDF' ? 'Ver Menú PDF' : 'Ordenar En Línea'}
                        </a>

                        <a
                            href="#content"
                            className="bg-transparent border border-white text-white text-center font-bold py-4 px-8 rounded-none hover:bg-white/10 transition-colors uppercase tracking-widest text-sm w-full md:w-auto min-w-[200px]"
                        >
                            Nuestra Historia
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
