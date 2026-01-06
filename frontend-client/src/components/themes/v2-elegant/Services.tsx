import { motion } from 'framer-motion';

interface ServiceItem {
    title: string;
    description: string;
    image_url: string;
}

interface ServicesSectionProps {
    services: ServiceItem[];
    title?: string | null;
    subtitle?: string | null;
}

export const ServicesSection = ({ services, title, subtitle }: ServicesSectionProps) => {
    if (!services || services.length === 0) return null;

    return (
        <section id="services" className="py-16 md:py-32 bg-white text-stone-900 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20">
                    <div className="max-w-2xl">
                        <span className="block text-xs uppercase tracking-[0.2em] mb-6 text-stone-500 font-medium">
                            {subtitle || "Nuestras Experiencias"}
                        </span>
                        <h2 className="text-5xl md:text-6xl font-serif font-light leading-tight text-stone-900">
                            {title ? (
                                title
                            ) : (
                                <>
                                    Servicios diseñados <br />
                                    <span className="italic text-stone-600">para la excelencia.</span>
                                </>
                            )}
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="group relative h-[500px] flex flex-col justify-end overflow-hidden bg-stone-100 cursor-pointer"
                        >
                            {/* Image Background */}
                            <img
                                src={service.image_url}
                                alt={service.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="relative z-10 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="w-12 h-[1px] bg-white/60 mb-6 group-hover:w-20 transition-all duration-500" />

                                <h3 className="text-3xl font-serif text-white mb-3 italic">
                                    {service.title}
                                </h3>

                                <p className="text-stone-200 font-light text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                                    {service.description}
                                </p>

                                <div className="mt-6">
                                    <span className="text-white text-[10px] uppercase tracking-[0.2em] border-b border-white/40 pb-1 group-hover:border-white transition-colors">
                                        Descubrir
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
