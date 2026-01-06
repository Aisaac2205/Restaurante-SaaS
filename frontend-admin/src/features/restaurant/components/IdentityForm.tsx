import { Upload } from 'lucide-react';
import type { RestaurantFormType } from '../types';
import { useToast } from '../../../context/ToastContext';

interface Props {
    form: RestaurantFormType;
    onUpload: (file: File) => Promise<string>;
    loading: boolean;
}

export const IdentityForm = ({ form, onUpload, loading }: Props) => {
    const { showToast } = useToast();
    const { register, watch, setValue, formState: { errors } } = form;
    const logoUrl = watch('logo_url');
    // Primary color is now managed in SaaS Config

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const url = await onUpload(file);
            setValue('logo_url', url, { shouldDirty: true });
            showToast('Logo subido correctamente', 'success');
        } catch {
            showToast('Error al subir logo', 'error');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-xl font-semibold text-gray-900">Identidad de Marca</h2>
                <p className="text-sm text-gray-500 mt-1">Configura la información principal y visual de tu restaurante.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Basic Info */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Restaurante</label>
                        <input
                            {...register('name')}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                            placeholder="Ej. Burger King"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Slug field removed temporarily if not in schema. It's usually backend managed anyway. */}
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                        ...
                    </div> */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp de Contacto</label>
                        <input
                            {...register('whatsapp_number')}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                            placeholder="+502 1234 5678"
                        />
                    </div>
                </div>

                {/* Right Column: Visual Brand */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                        <div className="flex items-start gap-6">
                            <div className="w-24 h-24 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                {logoUrl ? (
                                    <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                                ) : (
                                    <div className="text-gray-300">
                                        <Upload className="w-8 h-8" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Subir Logo
                                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} disabled={loading} />
                                </label>
                                <p className="text-xs text-gray-400 mt-2">Recomendado: 512x512px PNG transparente.</p>
                            </div>
                        </div>
                    </div>

                    {/* Branding Controls moved to SaaSConfigPage */}
                </div>
            </div>
        </div>
    );
};
