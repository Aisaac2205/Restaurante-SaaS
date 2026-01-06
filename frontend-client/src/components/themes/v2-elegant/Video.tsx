import React, { useState, useEffect, type ComponentType } from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoSectionProps {
    title: string | null;
    subtitle: string | null;
    videoUrl: string | null;
    posterUrl: string | null;
}

// Manually define props since ReactPlayer types can be unstable/missing in some environments
interface VideoPlayerProps {
    url: string;
    width: string | number;
    height: string | number;
    playing?: boolean;
    controls?: boolean;
    className?: string;
}

export const VideoSection = ({ title, subtitle, videoUrl, posterUrl }: VideoSectionProps) => {
    const [playing, setPlaying] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!videoUrl && !posterUrl) return null;

    // ...
    // Using useEffect inside component body, not inside replacement string if I can help it.
    // I need to add useEffect to imports.
    // And add useEffect hook.
    // Let's rewrite the start of component.


    return (
        <section id="video" className="bg-white py-12 md:py-24 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">

                {/* Desktop Layout: Overlapping Grid */}
                <div className="hidden md:grid grid-cols-12 grid-rows-1 items-center relative min-h-[600px]">

                    {/* Video Area (Center) - MUST be row-start-1 */}
                    <div className="col-start-3 col-end-11 row-start-1 relative h-[600px] w-full z-0">
                        {/* Video Thumbnail/Player */}
                        {!playing && (
                            <div
                                className="absolute inset-0 bg-cover bg-center z-10 flex items-center justify-center cursor-pointer group shadow-xl"
                                style={{ backgroundImage: posterUrl ? `url("${posterUrl}")` : undefined }}
                                onClick={() => setPlaying(true)}
                            >
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-500"></div>
                                <div className="relative z-20 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <Play className="w-10 h-10 text-black ml-1" fill="currentColor" />
                                </div>
                            </div>
                        )}

                        {mounted && playing && (() => {
                            const Player = ReactPlayer as unknown as ComponentType<VideoPlayerProps>;
                            return (
                                <div className="absolute inset-0 w-full h-full z-20">
                                    <Player
                                        url={videoUrl || ''}
                                        width="100%"
                                        height="100%"
                                        playing={playing}
                                        controls={true}
                                        className="react-player"
                                    />
                                </div>
                            );
                        })()}
                    </div>

                    {/* Text Card (Left Side - Overlapping) - Hidden when playing */}
                    {!playing && (
                        <motion.div
                            className="col-start-1 col-end-6 row-start-1 relative z-10 bg-white p-12 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)]"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-16 h-0.5 bg-black mb-8"></div>
                            <h2 className="text-4xl lg:text-5xl font-serif font-medium mb-6 leading-tight text-gray-900 whitespace-nowrap">
                                {title || "Nuestra Historia"}
                            </h2>
                            <p className="text-gray-500 font-light leading-relaxed mb-10 text-lg">
                                {subtitle || "Un vistazo a nuestra cocina y pasión."}
                            </p>

                            <a
                                href="/menu"
                                className="inline-block bg-black text-white px-10 py-4 text-sm font-medium uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors"
                            >
                                Ordena ya
                            </a>
                        </motion.div>
                    )}
                </div>


                {/* Mobile Layout: Stacked (Strictly Top-Down) */}
                <div className="md:hidden flex flex-col gap-8">
                    {/* Text Section Group */}
                    <div className="flex flex-col items-start">
                        <div className="w-16 h-0.5 bg-black mb-6"></div>
                        <h2 className="text-3xl font-serif font-medium mb-4 leading-tight text-gray-900">
                            {title || "Nuestra Historia"}
                        </h2>
                        <p className="text-gray-500 font-light leading-relaxed mb-8 text-base">
                            {subtitle || "Un vistazo a nuestra cocina y pasión."}
                        </p>
                        <a
                            href="/menu"
                            className="block w-full bg-black text-white text-center py-4 text-sm font-bold uppercase tracking-[0.1em] hover:bg-gray-800 transition-colors"
                        >
                            Ordena ya
                        </a>
                    </div>

                    {/* Video Section */}
                    <div className="aspect-video relative w-full mt-2">
                        {!playing && (
                            <div
                                className="absolute inset-0 bg-cover bg-center z-10 flex items-center justify-center cursor-pointer group"
                                style={{ backgroundImage: posterUrl ? `url("${posterUrl}")` : undefined }}
                                onClick={() => setPlaying(true)}
                            >
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="relative z-20 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
                                </div>
                            </div>
                        )}
                        {mounted && playing && (() => {
                            const Player = ReactPlayer as unknown as ComponentType<VideoPlayerProps>;
                            return (
                                <div className="absolute inset-0 w-full h-full z-20">
                                    <Player
                                        url={videoUrl || ''}
                                        width="100%"
                                        height="100%"
                                        playing={playing}
                                        controls={true}
                                    />
                                </div>
                            );
                        })()}
                    </div>
                </div>

            </div>
        </section>
    );
};
