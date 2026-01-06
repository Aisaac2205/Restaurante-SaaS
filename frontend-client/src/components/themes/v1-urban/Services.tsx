import { motion } from 'framer-motion';

interface ServiceItem {
    title: string;
    description: string;
    image_url: string;
}

interface ServicesSectionProps {
    services: ServiceItem[];
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
        <section className="relative h-[800px] bg-stone-900 overflow-hidden flex items-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                {service.image_url ? (
                    <img
                        src={service.image_url}
                        alt={service.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                ) : (
                    <div className="w-full h-full bg-stone-800" />
                )}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-wider uppercase">
                        {service.title}
                    </h2>
                    <p className="text-lg md:text-xl text-stone-200 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
                        {service.description}
                    </p>

                    {restaurantPhone && (
                        <button
                            onClick={handleReservationClick}
                            className="inline-block border-2 border-white text-white px-10 py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-stone-900 transition-all duration-300"
                        >
                            Reservas
                        </button>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

