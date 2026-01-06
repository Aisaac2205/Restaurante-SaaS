import { useFieldArray, type Path } from 'react-hook-form';
import type { RestaurantFormType, RestaurantSettingsForm } from '../types';
import { Upload, Trash2, Plus } from 'lucide-react';

interface Props {
    form: RestaurantFormType;
    onUpload: (file: File) => Promise<string>;
}

export const MultimediaForm = ({ form, onUpload }: Props) => {
    const { register, control, watch, setValue } = form;
    const posterUrl = watch('video_poster_url');

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'services_data',
    });

    const handleUpload = async (file: File, fieldName: Path<RestaurantSettingsForm>) => {
        try {
            const url = await onUpload(file);
            setValue(fieldName, url, { shouldDirty: true });
        } catch {
            alert('Error subiendo imagen');
        }
    };

    return (
        <div className="space-y-8">
            {/* Video Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Video Promocional</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Título de la Sección</label>
                            <input {...register('video_section_title')} className="mt-1 w-full border p-2 rounded shadow-sm" placeholder="Nuestra Historia" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Subtítulo</label>
                            <input {...register('video_section_subtitle')} className="mt-1 w-full border p-2 rounded shadow-sm" placeholder="Un vistazo a..." />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">URL del Video (Youtube/Vimeo)</label>
                        <input {...register('video_url')} className="mt-1 w-full border p-2 rounded shadow-sm" placeholder="https://..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Poster / Cover Image</label>
                        <div className="flex items-center gap-4 mt-1">
                            {posterUrl && <img src={posterUrl} className="w-16 h-10 object-cover rounded border" alt="Poster" />}
                            <label className="cursor-pointer bg-white border border-gray-300 px-3 py-2 rounded text-sm hover:bg-gray-50 flex items-center">
                                <Upload className="w-4 h-4 mr-2" /> Subir
                                <input type="file" className="hidden" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0], 'video_poster_url')} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Sección Contenido Destacado</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Título</label>
                            <input {...register('content_section_title')} className="mt-1 w-full border p-2 rounded shadow-sm" placeholder="Vive una experiencia..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Descripción (Body)</label>
                            <textarea {...register('content_section_body')} className="mt-1 w-full border p-2 rounded shadow-sm h-32" placeholder="Lorem ipsum..." />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Imagen Destacada</label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 h-full max-h-60">
                            {watch('content_section_image') ? (
                                <div className="relative w-full h-full">
                                    <img src={watch('content_section_image')} alt="Content" className="w-full h-full object-contain rounded" />
                                    <label className="absolute bottom-2 right-2 cursor-pointer bg-white shadow px-3 py-1 rounded text-xs flex items-center hover:bg-gray-100">
                                        <Upload className="w-3 h-3 mr-1" /> Cambiar
                                        <input type="file" className="hidden" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0], 'content_section_image')} />
                                    </label>
                                </div>
                            ) : (
                                <label className="cursor-pointer flex flex-col items-center">
                                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">Subir imagen</span>
                                    <input type="file" className="hidden" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0], 'content_section_image')} />
                                </label>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-lg font-medium text-gray-900">Servicios Clave</h3>
                    <button
                        type="button"
                        onClick={() => append({ title: '', description: '', image_url: '' })}
                        className="text-sm bg-black text-white px-3 py-1 rounded hover:bg-gray-800 flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Agregar Servicio
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {fields.map((field, index) => {
                        // Watch specific field image for preview
                        const imageUrl = watch(`services_data.${index}.image_url`);

                        return (
                            <div key={field.id} className="border p-4 rounded bg-gray-50 relative group">
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-4">
                                        <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0 border">
                                            {imageUrl ? (
                                                <img src={imageUrl} className="w-full h-full object-cover" alt="Service" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Sin img</div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <label className="cursor-pointer text-xs bg-white border px-2 py-1 rounded shadow-sm hover:bg-gray-50 inline-flex items-center mb-2">
                                                <Upload className="w-3 h-3 mr-1" /> Cambiar Imagen
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0], `services_data.${index}.image_url`)}
                                                />
                                            </label>
                                            <input
                                                {...register(`services_data.${index}.title` as const)}
                                                placeholder="Título del Servicio"
                                                className="w-full border p-1 rounded text-sm font-medium mb-1"
                                            />
                                        </div>
                                    </div>
                                    <textarea
                                        {...register(`services_data.${index}.description` as const)}
                                        placeholder="Descripción corta..."
                                        className="w-full border p-2 rounded text-sm h-16"
                                    />
                                </div>
                            </div>
                        );
                    })}

                    {fields.length === 0 && (
                        <div className="col-span-full text-center py-8 text-gray-500 text-sm italic">
                            No hay servicios configurados. Agrega uno arriba.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
