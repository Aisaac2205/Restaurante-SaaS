import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

interface InstagramFeedProps {
    username: string | null;
    images: string[];
}

export const InstagramFeed = ({ username, images }: InstagramFeedProps) => {
    if (!images || images.length === 0) return null;

    return (
        <section id="instagram" className="py-24 bg-stone-50 text-stone-900 border-t border-stone-200">
            <div className="container mx-auto px-6 text-center mb-16">
                <span className="block text-xs uppercase tracking-[0.2em] mb-4 text-stone-400">
                    Síguenos en Instagram
                </span>
                <h2 className="text-3xl md:text-5xl font-serif italic font-light mb-6">
                    <a href={`https://instagram.com/${username?.replace('@', '')}`} target="_blank" className="hover:text-stone-600 transition-colors">
                        @{username?.replace('@', '')}
                    </a>
                </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-4 md:px-0 max-w-7xl mx-auto">
                {images.slice(0, 4).map((img, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.15, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="aspect-square bg-stone-200 overflow-hidden relative group"
                    >
                        <img
                            src={img}
                            alt={`Instagram ${index}`}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                            <Instagram className="text-white w-6 h-6" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-16">
                <a
                    href={`https://instagram.com/${username?.replace('@', '')}`}
                    target="_blank"
                    className="inline-block border-b border-stone-900 pb-1 text-sm uppercase tracking-widest hover:text-stone-600 hover:border-stone-600 transition-all font-medium"
                >
                    Ver Galería
                </a>
            </div>
        </section>
    );
};
