import { useState } from 'react';
import type { RestaurantFormType } from '../types';
import { Loader2, Plus, Trash2 } from 'lucide-react';

interface Props {
    form: RestaurantFormType;
    onUpload: (file: File) => Promise<string>;
}

export const SocialForm = ({ form, onUpload }: Props) => {
    const { register, watch, setValue } = form;
    const [uploading, setUploading] = useState(false);

    // Parse existing text to array (handling empty string case)
    const imagesText = watch('instagram_images_text') || '';
    const images = imagesText ? imagesText.split('\n').map(s => s.trim()).filter(Boolean) : [];

    const handleUpload = async (file: File) => {
        setUploading(true);
        try {
            const url = await onUpload(file);
            const newImages = [...images, url];
            setValue('instagram_images_text', newImages.join('\n'), { shouldDirty: true });
        } catch (error) {
            console.error('Error uploading:', error);
            alert('Error al subir la imagen. Verifica tu conexión.');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (indexToRemove: number) => {
        const newImages = images.filter((_, idx) => idx !== indexToRemove);
        setValue('instagram_images_text', newImages.join('\n'), { shouldDirty: true });
    };

    return (
        <div className="space-y-8">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Redes Sociales</h3>

            <div className="space-y-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Usuario de Instagram (@username)</label>
                    <input
                        {...register('instagram_username')}
                        className="w-full md:w-1/2 border border-gray-300 p-2.5 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                        placeholder="@usuario"
                    />
                </div>

                <div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Galería de Imágenes</label>
                            <p className="text-sm text-gray-500 mt-1">Estas imágenes se mostrarán como tu feed reciente.</p>
                        </div>
                        <label className={`w-full md:w-auto cursor-pointer bg-black text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center justify-center hover:bg-gray-800 transition-colors shadow-sm active:scale-95 ${uploading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                            {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                            {uploading ? 'Subiendo...' : 'Agregar Foto'}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={e => !uploading && e.target.files?.[0] && handleUpload(e.target.files[0])}
                                disabled={uploading}
                            />
                        </label>
                    </div>

                    {images.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="mx-auto w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3 text-gray-400">
                                <Plus className="w-6 h-6" />
                            </div>
                            <p className="text-gray-900 font-medium">No hay imágenes en la galería</p>
                            <p className="text-gray-500 text-sm mt-1">Sube fotos para empezar a construir tu feed.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {images.map((url, idx) => (
                                <div key={`${idx}-${url}`} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                    <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="bg-white p-2.5 rounded-full text-red-600 hover:bg-red-50 hover:text-red-700 transition-all transform hover:scale-110 shadow-lg"
                                            title="Eliminar imagen"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Hidden textarea used for form registration */}
                    <textarea {...register('instagram_images_text')} className="hidden" />
                </div>
            </div>
        </div>
    );
};
