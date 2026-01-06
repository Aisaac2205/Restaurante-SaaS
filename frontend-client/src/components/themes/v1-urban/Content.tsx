import { motion } from 'framer-motion';

interface ContentSectionProps {
    image: string | null;
    title: string | null;
    body: string | null;
    image2?: string | null;
    title2?: string | null;
    body2?: string | null;
    menuLink: string;
}

export const ContentSection = ({ image, title, body, image2, title2, body2, menuLink }: ContentSectionProps) => {
    return (
        <section className="bg-black text-white py-12 md:py-32 space-y-16 md:space-y-32">
            <div className="container mx-auto px-4">
                {/* SECTION 1: Image Left, Text Right */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-1 lg:order-1 relative flex justify-center">
                        {image ? (
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="w-full max-w-lg aspect-square overflow-hidden"
                            >
                                <img
                                    src={image}
                                    alt="Featured Content"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        ) : (
                            <div className="w-full max-w-lg aspect-square bg-gray-800 flex items-center justify-center text-gray-500">
                                Sin Imagen
                            </div>
                        )}
                    </div>

                    <div className="order-2 lg:order-2 flex flex-col items-start lg:pl-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-16 h-1 bg-white mb-8" />
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-serif leading-tight">
                                {title || "Vive una experiencia culinaria única"}
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-10">
                                {body || "Disfruta de nuestros deliciosos platillos preparados con los mejores ingredientes."}
                            </p>
                            <a
                                href={menuLink}
                                target={menuLink.startsWith('http') ? '_blank' : undefined}
                                rel={menuLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="border border-white text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors"
                            >
                                Ver Menú
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: Text Left, Image Right (ZigZag) */}
            {(image2 || title2 || body2) && (
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-2 relative flex justify-center">
                            {image2 ? (
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="w-full max-w-lg aspect-square overflow-hidden"
                                >
                                    <img
                                        src={image2}
                                        alt="Featured Content 2"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            ) : (
                                <div className="w-full max-w-lg aspect-square bg-gray-800 flex items-center justify-center text-gray-500">
                                    Sin Imagen
                                </div>
                            )}
                        </div>

                        <div className="order-1 lg:order-1 flex flex-col items-start lg:pr-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-16 h-1 bg-white mb-8" />
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-serif leading-tight">
                                    {title2 || "Pasión por los detalles"}
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                                    {body2 || "Cada plato cuenta una historia, cada sabor es un recuerdo."}
                                </p>
                                <a
                                    href={menuLink}
                                    className="border border-white text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors"
                                >
                                    Ver Menú
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
