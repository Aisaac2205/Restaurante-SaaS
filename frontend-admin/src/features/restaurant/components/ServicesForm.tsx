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
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-gray-900">Eventos y Reservas</h2>
                <p className="text-sm text-gray-500">
                    Configura la sección de eventos y reservas. Esta será la imagen principal que verán tus clientes.
                </p>
            </div>

            <div className="max-w-4xl">
                <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row">

                    {/* Image Section */}
                    <div className="relative w-full md:w-2/5 h-64 md:h-auto bg-gray-100 border-b md:border-b-0 md:border-r border-gray-100 group/image cursor-pointer">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="Start preview"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                                <ImageIcon className="w-8 h-8 opacity-50" />
                                <span className="text-xs font-medium">Subir Imagen de Fondo</span>
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
                                if (file) handleServiceImageUpload(file);
                            }}
                        />
                    </div>

                    {/* Content Inputs */}
                    <div className="p-6 space-y-6 flex-1 flex flex-col justify-center">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Título</label>
                            <input
                                {...register(`services_data.0.title`)}
                                placeholder="Ej. Eventos y Reservas"
                                className="w-full px-0 py-1 bg-transparent border-0 border-b border-gray-200 focus:border-black focus:ring-0 text-xl font-bold placeholder:text-gray-300 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Descripción</label>
                            <textarea
                                {...register(`services_data.0.description`)}
                                placeholder="Describe brevemente la experiencia..."
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-1 focus:ring-black focus:border-black text-sm text-gray-600 resize-none transition-all"
                            />
                        </div>
                        <div className="pt-2">
                            <div className="text-xs text-gray-400 border-l-2 border-gray-200 pl-3 italic">
                                El botón de acción redirigirá automáticamente al WhatsApp configurado del restaurante preguntando por reservas.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
