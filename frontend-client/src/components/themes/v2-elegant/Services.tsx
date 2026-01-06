import { motion } from 'framer-motion';

interface ServiceItem {
    title: string;
    description: string;
    image_url: string;
}

interface ServicesSectionProps {
    services: ServiceItem[];
    title?: string | null;
    subtitle?: string | null; // Keeping these for compatibility, though we prioritize the service data
    restaurantPhone?: string | null;
}

export const ServicesSection = ({ services, restaurantPhone }: ServicesSectionProps) => {
    // We only use the first service item for the "Eventos y Reservas" section
    const service = services?.[0];

    if (!service) return null;

    const handleReservationClick = () => {
        if (!restaurantPhone) return;
        const phone = restaurantPhone.replace(/\D/g, '');
        const message = encodeURIComponent(`Hola, me gustaría obtener información sobre eventos y reservas en el restaurante.`);
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    };

    return (
        <section id="services" className="relative py-32 md:py-48 bg-white text-stone-900 overflow-hidden">
            {/* Background Image with Parallax-like effect */}
            <div className="absolute inset-0 z-0">
                {service.image_url ? (
                    <img
                        src={service.image_url}
                        alt={service.title}
                        className="w-full h-full object-cover scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-stone-200" />
                )}
                {/* Elegante gradient overlay */}
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="max-w-3xl"
                >
                    <span className="block text-xs md:text-sm uppercase tracking-[0.3em] mb-6 text-white/80 font-medium">
                        Experiencias Exclusivas
                    </span>

                    <h2 className="text-5xl md:text-7xl font-serif font-light leading-tight text-white mb-8 italic">
                        {service.title}
                    </h2>

                    <div className="w-24 h-[1px] bg-white/60 mx-auto mb-10" />

                    <p className="text-lg md:text-xl text-stone-100 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                        {service.description}
                    </p>

                    {restaurantPhone && (
                        <button
                            onClick={handleReservationClick}
                            className="bg-white text-stone-900 px-12 py-4 text-xs md:text-sm font-bold tracking-[0.25em] uppercase hover:bg-stone-200 transition-colors duration-300 shadow-xl"
                        >
                            Reservar Ahora
                        </button>
                    )}
                </motion.div>
            </div>
        </section>
    );
};
