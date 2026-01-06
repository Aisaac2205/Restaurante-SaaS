import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import type { Product } from '@/types';

interface MenuPreviewSliderProps {
    products: Product[];
    menuLink: string;
}

export const MenuPreviewSlider = ({ products, menuLink }: MenuPreviewSliderProps) => {
    // Desktop: Take first 3 for elegance (less clutter than V1's 6)
    const featuredProducts = products.slice(0, 3);
    // Mobile Carousel: Take up to 15 items for better infinite scrolling experience
    const carouselProducts = products.slice(0, 15);

    return (
        <section className="bg-black py-16 md:py-32 text-white">
            <div className="container mx-auto px-6 mb-20 text-center">
                <span className="block text-xs uppercase tracking-[0.2em] mb-4 text-stone-400">
                    Destacados Culinarios
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-white">
                    Platillos Favoritos
                </h2>
                <div className="w-16 h-[1px] bg-stone-700 mx-auto"></div>
            </div>

            {/* Mobile Carousel (Swiper) */}
            <div className="md:hidden">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    loop={true}
                    spaceBetween={24}
                    slidesPerView={1.2}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    className="pb-12"
                >
                    {carouselProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="group cursor-pointer bg-white text-stone-900 pb-8 h-full">
                                <a href={`/product/${product.id}`} className="block h-full">
                                    <div className="aspect-[4/5] w-full overflow-hidden mb-6 bg-stone-100 relative">
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-stone-300 font-serif italic">
                                                Sin Imagen
                                            </div>
                                        )}
                                    </div>
                                    <div className="px-6 text-center">
                                        <h3 className="text-2xl font-serif font-medium mb-3 group-hover:text-stone-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-stone-500 font-sans text-sm leading-relaxed mb-4 mx-auto line-clamp-3 font-light">
                                            {product.description}
                                        </p>
                                        <span className="text-xs uppercase tracking-widest border-b border-stone-300 group-hover:border-stone-500 transition-all pb-1 inline-block mt-2">
                                            Ver Detalle
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid max-w-6xl mx-auto px-6 grid-cols-3 gap-8">
                {featuredProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer bg-white text-stone-900 pb-8"
                    >
                        <a href={`/product/${product.id}`} className="block h-full">
                            <div className="aspect-[4/5] w-full overflow-hidden mb-6 bg-stone-100 relative">
                                {product.image_url ? (
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-stone-300 font-serif italic">
                                        Sin Imagen
                                    </div>
                                )}
                            </div>
                            <div className="px-6 text-center">
                                <h3 className="text-2xl font-serif font-medium mb-3 group-hover:text-stone-600 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-stone-500 font-sans text-sm leading-relaxed mb-4 mx-auto line-clamp-3 font-light">
                                    {product.description}
                                </p>
                                <span className="text-xs uppercase tracking-widest border-b border-stone-300 group-hover:border-stone-500 transition-all pb-1 inline-block mt-2">
                                    Ver Detalle
                                </span>
                            </div>
                        </a>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-20">
                <a
                    href={menuLink}
                    target={menuLink.startsWith('http') ? '_blank' : undefined}
                    rel={menuLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-block px-12 py-4 border border-white text-white text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
                >
                    Menú Completo
                </a>
            </div>
        </section>
    );
};
