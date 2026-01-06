import { motion } from 'framer-motion';

interface ContentSectionProps {
    image: string | null;
    title: string | null;
    body: string | null;
    menuLink: string;
}

export const ContentSection = ({ image, title, body, menuLink }: ContentSectionProps) => {
    return (
        <section id="content" className="bg-black text-white py-16 md:py-32 overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text Column */}
                    <div className="order-1 flex flex-col items-start text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="w-full"
                        >
                            <span className="block text-xs uppercase tracking-[0.2em] mb-4 lg:mb-6 text-stone-400">
                                Sobre Nosotros
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 lg:mb-8 leading-[1.1] italic">
                                {title || "Una experiencia inolvidable"}
                            </h2>

                            <p className="text-gray-300 text-lg leading-relaxed mb-8 lg:mb-12 font-light max-w-lg mx-auto lg:mx-0">
                                {body || "La gastronomía es un arte que se celebra en cada plato. Descubre nuestra pasión por los sabores auténticos."}
                            </p>

                            <a
                                href={menuLink}
                                className="hidden lg:inline-flex group items-center text-sm uppercase tracking-widest font-medium border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-all"
                            >
                                Nuestra Carta
                                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </motion.div>
                    </div>

                    {/* Image Column */}
                    <div className="order-2 relative">
                        {image ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="relative z-10"
                            >
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img
                                        src={image}
                                        alt="Restaurant Ambiance"
                                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                                    />
                                </div>
                                {/* Decorative Element */}
                                <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-stone-800 z-[-1] hidden md:block"></div>
                            </motion.div>
                        ) : (
                            <div className="aspect-[4/5] bg-zinc-900 flex items-center justify-center text-zinc-600 font-serif italic">
                                Sin Imagen Configurada
                            </div>
                        )}
                    </div>

                    {/* Mobile Button (Order 3) */}
                    <div className="order-3 lg:hidden flex justify-center w-full mt-4">
                        <a
                            href={menuLink}
                            target={menuLink.startsWith('http') ? '_blank' : undefined}
                            rel={menuLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="inline-flex group items-center text-sm uppercase tracking-widest font-medium border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-all"
                        >
                            Nuestra Carta
                            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
