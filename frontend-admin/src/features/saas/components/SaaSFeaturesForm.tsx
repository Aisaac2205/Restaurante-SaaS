import { Video, ShoppingBag } from 'lucide-react';
import type { RestaurantFormType } from '../../restaurant/types';

interface Props {
    form: RestaurantFormType;
}

export const SaaSFeaturesForm = ({ form }: Props) => {
    const { register, watch } = form;

    const features = [
        { id: 'feat_video', label: 'Sección Video', icon: Video, desc: 'Muestra video promocional en landing.' },
        { id: 'feat_services', label: 'Sección Servicios', icon: ShoppingBag, desc: 'Muestra cards de servicios.' },
    ];

    // Watch values for visual feedback
    const config = watch('features_config') || {};

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Flags</h3>
            <p className="text-sm text-gray-500 mb-6">Activa o desactiva módulos según el plan contratado.</p>

            <div className="space-y-4">
                {features.map((feat) => {
                    const isEnabled = config[feat.id] === true;

                    return (
                        <div key={feat.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-md transition-colors ${isEnabled ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    <feat.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{feat.label}</p>
                                    <p className="text-xs text-gray-500">{feat.desc}</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    {...register(`features_config.${feat.id}`)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
