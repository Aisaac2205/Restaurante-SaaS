import React, { useState } from 'react'; // Added React imports
import { Play, Image as ImageIcon, Upload, Loader2, X } from 'lucide-react';
import type { RestaurantFormType } from '../types';
import { useToast } from '../../../context/ToastContext'; // Added hook

interface Props {
    form: RestaurantFormType;
    onUpload: (file: File) => Promise<string>;
    onUploadVideo?: (file: File) => Promise<string>;
    loading: boolean;
}

export const VideoSectionForm = ({ form, onUpload, onUploadVideo, loading }: Props) => {
    const { register, watch, setValue } = form;
    const posterUrl = watch('video_poster_url');
    const videoUrl = watch('video_url');
    const { showToast } = useToast(); // Hook usage

    // Local state for video uploading feedback
    const [uploadingVideo, setUploadingVideo] = useState(false);

    const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const url = await onUpload(file);
            setValue('video_poster_url', url, { shouldDirty: true });
            showToast('Poster cargado correctamente', 'success');
        } catch {
            showToast('Error al subir poster', 'error');
        }
    };

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!onUploadVideo) {
            showToast("No se ha configurado la función de subida de videos.", 'error');
            return;
        }

        try {
            setUploadingVideo(true);
            const url = await onUploadVideo(file);
            setValue('video_url', url, { shouldDirty: true });
            showToast('Video subido correctamente', 'success');
        } catch (error) {
            console.error(error);
            showToast('Error al subir video. Verifica que sea menor a 100MB.', 'error');
        } finally {
            setUploadingVideo(false);
        }
    };

    const clearVideo = () => {
        setValue('video_url', '', { shouldDirty: true });
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-xl font-semibold text-gray-900">Video Promocional</h2>
                <p className="text-sm text-gray-500 mt-1">Engancha a tu audiencia con un video atractivo de tus platillos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Settings & Video Upload */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título del Video</label>
                        <input
                            {...register('video_section_title')}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                            placeholder="Ej. Descubre el sabor real"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                        <input
                            {...register('video_section_subtitle')}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                            placeholder="Ej. Hecho con ingredientes frescos cada día"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Archivo de Video</label>

                        {!videoUrl ? (
                            <div className={`border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors ${loading || uploadingVideo ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'} relative`}>
                                {uploadingVideo ? (
                                    <>
                                        <Loader2 className="w-8 h-8 text-black animate-spin mb-2" />
                                        <p className="text-sm font-medium text-gray-900">Subiendo video...</p>
                                        <p className="text-xs text-gray-500 mt-1">Por favor espera, esto puede tardar.</p>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                        <p className="text-sm font-medium text-gray-900">Subir Video (MP4)</p>
                                        <p className="text-xs text-gray-500 mt-1">Máx. 100MB</p>
                                        <input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            accept="video/mp4,video/webm,video/quicktime"
                                            onChange={handleVideoUpload}
                                            disabled={loading || uploadingVideo}
                                        />
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="relative rounded-xl overflow-hidden bg-black aspect-video group">
                                <video src={videoUrl} className="w-full h-full object-cover" controls />
                                <button
                                    onClick={clearVideo}
                                    type="button"
                                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                    title="Eliminar video"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-[10px] rounded backdrop-blur">
                                    Video Cargado
                                </div>
                            </div>
                        )}
                        {/* Hidden input to keep registering value */}
                        <input type="hidden" {...register('video_url')} />
                    </div>
                </div>

                {/* Right: Poster Image */}
                <div className="space-y-6">
                    <label className="block text-sm font-medium text-gray-700">Poster (Miniatura)</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors group relative overflow-hidden bg-gray-50/50 h-56">
                        {posterUrl ? (
                            <>
                                <img
                                    src={posterUrl}
                                    alt="Poster"
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                                />
                                <div className="relative z-10 bg-white/90 px-4 py-2 rounded-lg shadow-sm backdrop-blur-sm">
                                    <p className="text-xs font-medium text-gray-900">Click para cambiar</p>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white backdrop-blur-md">
                                        <Play className="w-5 h-5 ml-1" fill="currentColor" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                                <ImageIcon className="w-10 h-10 mx-auto mb-3" />
                                <p className="text-sm font-medium">Subir Poster del Video</p>
                                <p className="text-xs mt-1">Imagen que se ve antes de dar play</p>
                            </div>
                        )}
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={handlePosterUpload}
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
