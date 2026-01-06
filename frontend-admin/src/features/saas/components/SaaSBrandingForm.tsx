import type { RestaurantFormType } from '../../restaurant/types';
import { ThemeSelector } from '../../restaurant/components/ThemeSelector';

interface Props {
    form: RestaurantFormType;
}

export const SaaSBrandingForm = ({ form }: Props) => {
    const { register, watch } = form;
    const primaryColor = watch('primary_color');
    const themeMode = watch('theme_mode');

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in duration-500">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Branding Global (Admin)</h3>
            <p className="text-sm text-gray-500 mb-6">Define los colores base de la marca. Esto afecta a toda la aplicación del cliente.</p>

            <div className="space-y-6">
                <div>
                    <ThemeSelector register={register} currentTheme={themeMode || 'v1-urban'} />
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Color Primario</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="color"
                                {...register('primary_color')}
                                className="h-12 w-12 rounded-lg border border-gray-200 cursor-pointer p-0.5 bg-white shadow-sm"
                            />
                            <div className="flex-1">
                                <span className="text-sm font-mono bg-gray-100 px-3 py-1.5 rounded-md text-gray-900 font-medium uppercase border border-gray-200 block w-fit">
                                    {primaryColor}
                                </span>
                                <p className="text-xs text-gray-400 mt-1.5">Usado en botones, links y destacados.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
