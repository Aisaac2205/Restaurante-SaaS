import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/types';

interface MenuPreviewSliderProps {
    products: Product[];
    menuLink: string;
    slug?: string;
}

export const MenuPreviewSlider = ({ products, menuLink, slug }: MenuPreviewSliderProps) => {
    // Tomamos los primeros 6 productos para mostrar
    const featuredProducts = products.slice(0, 6);

    return (
        <section className="bg-white py-12 md:py-24">
            <div className="container mx-auto px-4 mb-8 md:mb-16 text-center">
                <div className="w-12 h-1 bg-black mx-auto mb-6" />
                <h2 className="text-4xl font-serif font-bold mb-4">Explora nuestro menú</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Descubre nuestros platillos más populares, preparados con pasión.
                </p>
            </div>

            {/* Slider Container */}
            <div className="w-full overflow-x-auto pb-12 hide-scrollbar">
                <div className="flex gap-8 px-4 md:px-12 w-max mx-auto">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col w-72 md:w-80 group"
                        >
                            <a href={slug ? `/${slug}/product/${product.id}` : `/product/${product.id}`} className="block cursor-pointer">
                                <div className="h-80 w-full overflow-hidden mb-6 relative bg-gray-100">
                                    {product.image_url ? (
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            Sin Foto
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold mb-2 font-serif group-hover:text-gray-600 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                    {product.description || "Delicioso platillo preparado al momento."}
                                </p>
                                <span className="font-semibold text-lg">
                                    Ver platillo &rarr;
                                </span>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="text-center mt-12">
                <a
                    href={menuLink}
                    target={menuLink.startsWith('http') ? '_blank' : undefined}
                    rel={menuLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="bg-black text-white px-10 py-4 uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
                >
                    Ver Menú Completo
                </a>
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};
