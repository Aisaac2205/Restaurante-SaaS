import { useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import type { RestaurantFormType } from '../types';

interface Props {
    form: RestaurantFormType;
    onUpload: (file: File) => Promise<string>;
    loading: boolean;
}

export const ServicesForm = ({ form, onUpload }: Props) => {
    const { control, register, setValue, watch } = form;

    const { fields, append } = useFieldArray({
        control,
        name: "services_data"
    });

    // Ensure there is always at least one service item
    useEffect(() => {
        if (fields.length === 0) {
            append({
                title: 'Eventos y Reservas',
                description: 'Ambientes exclusivos para disfrutar con la mejor compañía.',
                image_url: ''
            });
        }
    }, [fields.length, append]);

    const handleServiceImageUpload = async (file: File) => {
        try {
            const url = await onUpload(file);
            setValue(`services_data.0.image_url`, url, { shouldDirty: true });
        } catch {
            alert('Error al subir imagen de servicio');
        }
    };

    // Watch values for the first item directly
    const imageUrl = watch(`services_data.0.image_url`);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-2xl">
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-gray-900">Eventos y Reservas</h2>
                <p className="text-sm text-gray-500">
                    Configura la sección de eventos y reservas.
                </p>
            </div>

            <div className="space-y-6">
                {/* Image Upload - Simple Box */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Imagen de Fondo</label>
                    <div className="relative w-full h-64 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer overflow-hidden">
                        {imageUrl ? (
                            <>
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-medium text-sm bg-black/50 px-3 py-1 rounded-full">Cambiar Imagen</span>
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                                <ImageIcon className="w-8 h-8 opacity-50" />
                                <span className="text-sm">Clic para subir imagen</span>
                            </div>
                        )}
                        <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleServiceImageUpload(file);
                            }}
                        />
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                        <input
                            {...register(`services_data.0.title`)}
                            placeholder="Ej. Eventos y Reservas"
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                        <textarea
                            {...register(`services_data.0.description`)}
                            placeholder="Describe brevemente la experiencia..."
                            rows={4}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black resize-none transition-all"
                        />
                    </div>
                </div>

                <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg text-xs">
                    El botón de acción redirigirá automáticamente al WhatsApp configurado del restaurante preguntando por reservas.
                </div>
            </div>
        </div>
    );
};
