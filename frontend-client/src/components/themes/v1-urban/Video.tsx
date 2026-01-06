import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoSectionProps {
    title: string | null;
    subtitle: string | null;
    videoUrl: string | null;
    posterUrl: string | null;
}

export const VideoSection = ({ title, subtitle, videoUrl, posterUrl }: VideoSectionProps) => {
    const [playing, setPlaying] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!videoUrl) return null;

    return (
        <section className="bg-black py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-12">
                <div className="w-12 h-1 bg-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-white">
                    {title || "Nuestra Historia"}
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    {subtitle || "Un vistazo a nuestra cocina y pasión."}
                </p>
            </div>

            <div className="w-full max-w-6xl mx-auto relative bg-black aspect-video shadow-2xl overflow-hidden group">
                {!playing && (
                    <div
                        className="absolute inset-0 bg-cover bg-center z-10 flex items-center justify-center cursor-pointer transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: posterUrl ? `url(${posterUrl})` : undefined }}
                        onClick={() => setPlaying(true)}
                    >
                        {/* Overlay darker */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                        {/* Play Button */}
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white h-20 w-20 rounded-full flex items-center justify-center relative z-20 shadow-lg"
                        >
                            <Play className="w-8 h-8 ml-1 text-black" fill="currentColor" />
                        </motion.div>
                    </div>
                )}

                {/* React 19 Compat: Force cast to any to avoid type errors with react-player */}
                {mounted && (() => {
                    const Player = ReactPlayer as any;
                    return (
                        <Player
                            url={videoUrl || ''}
                            width="100%"
                            height="100%"
                            playing={playing}
                            controls={true}
                        />
                    );
                })()}
            </div>
        </section>
    );
};
