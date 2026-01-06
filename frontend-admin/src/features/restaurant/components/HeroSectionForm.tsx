import type { RestaurantFormType } from '../types';
import { Image as ImageIcon } from 'lucide-react';

interface Props {
    form: RestaurantFormType;
    onUpload: (file: File) => Promise<string>;
}

export const HeroSectionForm = ({ form, onUpload }: Props) => {
    const { register, setValue, watch } = form;
    const heroUrl = watch('hero_image_url');

    const handleUpload = async (file: File) => {
        try {
            const url = await onUpload(file);
            setValue('hero_image_url', url, { shouldDirty: true });
        } catch {
            alert('Error subiendo imagen');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-xl font-semibold text-gray-900">Banner Principal</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Esta es la primera imagen que verán los visitantes. Usa una foto de alta calidad.
                </p>
            </div>

            {/* Hero Image */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Imagen de Fondo</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors group relative overflow-hidden bg-gray-50/50 min-h-[200px]">
                    {heroUrl ? (
                        <>
                            <img
                                src={heroUrl}
                                alt="Hero"
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                            />
                            <div className="relative z-10 bg-white/90 px-4 py-2 rounded-lg shadow-sm">
                                <p className="text-xs font-medium text-gray-900">Click para cambiar</p>
                            </div>
                        </>
                    ) : (
                        <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                            <ImageIcon className="w-10 h-10 mx-auto mb-3" />
                            <p className="text-sm font-medium">Subir imagen del banner</p>
                            <p className="text-xs mt-1">Recomendado: 1920x1080px</p>
                        </div>
                    )}
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0])}
                    />
                </div>
            </div>

            {/* Hero Text */}
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título Principal</label>
                    <input
                        {...register('hero_title')}
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                        placeholder="Ej. Sabor a la Parrilla"
                    />
                    <p className="text-xs text-gray-400 mt-1">El texto grande que aparece sobre la imagen</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                    <input
                        {...register('hero_subtitle')}
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                        placeholder="Ej. La mejor calidad en cada mordida"
                    />
                    <p className="text-xs text-gray-400 mt-1">Texto secundario debajo del título</p>
                </div>
            </div>
        </div>
    );
};
