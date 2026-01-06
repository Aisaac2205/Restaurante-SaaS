import type { RestaurantFormType } from '../types';
import { Upload } from 'lucide-react';

interface Props {
    form: RestaurantFormType;
    onUpload: (file: File) => Promise<string>;
}

export const BrandingForm = ({ form, onUpload }: Props) => {
    const { register, setValue, watch } = form;
    const logoUrl = watch('logo_url');
    const primaryColor = watch('primary_color');

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const url = await onUpload(file);
                setValue('logo_url', url, { shouldDirty: true });
            } catch {
                alert('Error subiendo imagen');
            }
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Identidad de Marca</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color Principal</label>
                    <div className="flex items-center gap-3">
                        <input
                            {...register('primary_color')}
                            type="color"
                            className="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer"
                        />
                        <span className="text-sm text-gray-500 font-mono">{primaryColor}</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                    <div className="flex items-center gap-4">
                        {logoUrl ? (
                            <img src={logoUrl} alt="Logo" className="w-16 h-16 rounded-full border object-cover" />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs text-center border">
                                Sin Logo
                            </div>
                        )}
                        <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center shadow-sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Cambiar Logo
                            <input type="file" className="hidden" accept="image/*" onChange={handleFile} />
                        </label>
                    </div>
                    <input type="hidden" {...register('logo_url')} />
                </div>
            </div>
        </div>
    );
};
