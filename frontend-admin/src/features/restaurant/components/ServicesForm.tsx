import { Plus, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import type { RestaurantFormType } from '../types';

interface Props {
    form: RestaurantFormType;
    onUpload: (file: File) => Promise<string>;
    loading: boolean;
}

export const ServicesForm = ({ form, onUpload }: Props) => {
    const { control, register, setValue, watch } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "services_data"
    });

    const handleServiceImageUpload = async (file: File, index: number) => {
        try {
            const url = await onUpload(file);
            setValue(`services_data.${index}.image_url`, url, { shouldDirty: true });
        } catch {
            alert('Error al subir imagen de servicio');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-gray-900">Nuestros Servicios</h2>
                <p className="text-sm text-gray-500">Destaca qué hace especial a tu restaurante (Ej. Delivery rápido, Wi-Fi gratis).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fields.map((field, index) => {
                    const imageUrl = watch(`services_data.${index}.image_url`);

                    return (
                        <div key={field.id} className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                            {/* Controls Overlay */}
                            <div className="absolute top-2 right-2 z-20 flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="p-2 bg-white/90 backdrop-blur-sm text-red-500 hover:text-red-600 hover:bg-white rounded-full shadow-sm transition-all border border-gray-100 opacity-100 md:opacity-0 group-hover:opacity-100"
                                    title="Eliminar servicio"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="absolute top-2 left-2 z-20 cursor-move opacity-50 hover:opacity-100 transition-opacity p-1.5 bg-black/20 backdrop-blur-sm rounded-md text-white">
                                <GripVertical className="w-4 h-4" />
                            </div>

                            {/* Image Header */}
                            <div className="relative w-full h-48 bg-gray-100 border-b border-gray-100 group/image cursor-pointer">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="Service preview"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                                        <ImageIcon className="w-8 h-8 opacity-50" />
                                        <span className="text-xs font-medium">Subir Imagen</span>
                                    </div>
                                )}

                                {/* Upload Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors flex items-center justify-center">
                                    <div className="bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium opacity-0 group-hover/image:opacity-100 transition-all transform translate-y-2 group-hover/image:translate-y-0">
                                        {imageUrl ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                                    </div>
                                </div>

                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleServiceImageUpload(file, index);
                                    }}
                                />
                            </div>

                            {/* Content Inputs */}
                            <div className="p-4 space-y-4 flex-1 flex flex-col">
                                <div>
                                    <input
                                        {...register(`services_data.${index}.title`)}
                                        placeholder="Título del servicio"
                                        className="w-full px-0 py-1 bg-transparent border-0 border-b border-transparent focus:border-black focus:ring-0 text-lg font-bold placeholder:text-gray-300 transition-colors"
                                    />
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        {...register(`services_data.${index}.description`)}
                                        placeholder="Describe brevemente este servicio para tus clientes..."
                                        rows={3}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:ring-1 focus:ring-black focus:border-black text-sm text-gray-600 resize-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Empty State / Add Button styled as card */}
                <button
                    type="button"
                    onClick={() => append({ title: '', description: '', image_url: '' })}
                    className="flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50/50 transition-all group"
                >
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-white transition-colors">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900">Agregar Nuevo Servicio</span>
                </button>
            </div>
        </div>
    );
};
