import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

interface InstagramFeedProps {
    username: string | null;
    images: string[];
}

export const InstagramFeed = ({ username, images }: InstagramFeedProps) => {
    if (!images || images.length === 0) return null;

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 text-center mb-16">
                <div className="w-12 h-1 bg-black mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                    Síguenos en <a href={`https://instagram.com/${username?.replace('@', '')}`} target="_blank" className="underline hover:text-gray-600 transition-colors">Instagram</a>
                </h2>
                {username && (
                    <p className="text-gray-500">{username}</p>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 px-2 md:px-4 max-w-7xl mx-auto">
                {images.slice(0, 4).map((img, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="aspect-square bg-gray-200 overflow-hidden relative group"
                    >
                        <img
                            src={img}
                            alt={`Instagram ${index}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <Instagram className="text-white w-8 h-8" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-12">
                <a
                    href={`https://instagram.com/${username?.replace('@', '')}`}
                    target="_blank"
                    className="bg-black text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors inline-flex items-center"
                >
                    <Instagram className="w-4 h-4 mr-2" /> Seguir a {username}
                </a>
            </div>
        </section>
    );
};
