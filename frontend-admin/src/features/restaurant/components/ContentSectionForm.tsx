import { AlignLeft, Image as ImageIcon } from 'lucide-react';
import type { RestaurantFormType } from '../types';

interface Props {
    form: RestaurantFormType;
    onUpload: (file: File) => Promise<string>;
    loading: boolean;
}

export const ContentSectionForm = ({ form, onUpload, loading }: Props) => {
    const { register, watch, setValue } = form;
    const contentImage = watch('content_section_image');

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const url = await onUpload(file);
            setValue('content_section_image', url, { shouldDirty: true });
        } catch {
            alert('Error al subir imagen');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-xl font-semibold text-gray-900">Historia y Contenido</h2>
                <p className="text-sm text-gray-500 mt-1">Esta sección aparece debajo del banner principal. Ideal para contar tu historia.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Text Content */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título de la Sección</label>
                        <div className="relative">
                            <input
                                {...register('content_section_title')}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                                placeholder="Ej. Nuestra Pasión por el Sabor"
                            />
                            <AlignLeft className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cuerpo del Texto</label>
                        <textarea
                            {...register('content_section_body')}
                            rows={6}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all resize-none"
                            placeholder="Cuenta la historia de tu restaurante..."
                        />
                    </div>
                </div>

                {/* Right: Feature Image */}
                <div className="space-y-6">
                    <label className="block text-sm font-medium text-gray-700">Imagen Destacada</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors group relative overflow-hidden bg-gray-50/50">
                        {contentImage ? (
                            <>
                                <img
                                    src={contentImage}
                                    alt="Content"
                                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity"
                                />
                                <div className="relative z-10 bg-white/90 px-4 py-2 rounded-lg shadow-sm">
                                    <p className="text-xs font-medium text-gray-900">Click para cambiar</p>
                                </div>
                            </>
                        ) : (
                            <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                                <ImageIcon className="w-10 h-10 mx-auto mb-3" />
                                <p className="text-sm font-medium">Subir imagen lateral</p>
                                <p className="text-xs mt-1">Recomendado: 800x600px</p>
                            </div>
                        )}
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2 my-8 border-t pt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sección Secundaria (ZigZag)</h3>
                </div>

                {/* Left: Text Content 2 */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título Sección 2</label>
                        <div className="relative">
                            <input
                                {...register('content_section_2_title')}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                                placeholder="Ej. Ingredientes Frescos"
                            />
                            <AlignLeft className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cuerpo del Texto 2</label>
                        <textarea
                            {...register('content_section_2_body')}
                            rows={6}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all resize-none"
                            placeholder="Describe más detalles..."
                        />
                    </div>
                </div>

                {/* Right: Feature Image 2 */}
                <div className="space-y-6">
                    <label className="block text-sm font-medium text-gray-700">Imagen Destacada 2</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors group relative overflow-hidden bg-gray-50/50">
                        {watch('content_section_2_image') ? (
                            <>
                                <img
                                    src={watch('content_section_2_image')}
                                    alt="Content 2"
                                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity"
                                />
                                <div className="relative z-10 bg-white/90 px-4 py-2 rounded-lg shadow-sm">
                                    <p className="text-xs font-medium text-gray-900">Click para cambiar</p>
                                </div>
                            </>
                        ) : (
                            <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                                <ImageIcon className="w-10 h-10 mx-auto mb-3" />
                                <p className="text-sm font-medium">Subir imagen 2</p>
                                <p className="text-xs mt-1">Recomendado: 800x800px (Cuadrada)</p>
                            </div>
                        )}
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                try {
                                    const url = await onUpload(file);
                                    setValue('content_section_2_image', url, { shouldDirty: true });
                                } catch {
                                    alert('Error al subir imagen');
                                }
                            }}
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
