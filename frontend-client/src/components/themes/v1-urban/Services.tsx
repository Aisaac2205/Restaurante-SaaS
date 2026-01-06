import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

interface ServiceItem {
    title: string;
    description: string;
    image_url: string;
}

interface ServicesSectionProps {
    services: ServiceItem[];
}

export const ServicesSection = ({ services }: ServicesSectionProps) => {
    if (!services || services.length === 0) return null;

    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16">
                    <div>
                        <div className="w-12 h-1 bg-black mb-6" />
                        <h2 className="text-4xl font-serif font-bold">Ofrecemos servicios únicos</h2>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-4">
                        {/* Custom Navigation Buttons can go here if needed, or keeping the button */}
                        <button className="bg-black text-white px-8 py-3 uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors">
                            Explorar Servicios
                        </button>
                    </div>
                </div>

                <div className="-mx-4 md:mx-0">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        speed={1000}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="service-swiper !pb-12"
                    >
                        {services.map((service, index) => (
                            <SwiperSlide key={index} className="h-auto">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white group cursor-pointer h-full flex flex-col"
                                >
                                    <div className="overflow-hidden h-72 relative">
                                        <img
                                            src={service.image_url}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                    </div>
                                    <div className="p-8 text-center bg-white relative -mt-8 mx-4 shadow-lg flex-grow flex flex-col items-center">
                                        <h3 className="text-xl font-bold mb-3 font-serif">{service.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                            {service.description}
                                        </p>
                                        <div className="w-8 h-0.5 bg-black mx-auto mt-auto" />
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

