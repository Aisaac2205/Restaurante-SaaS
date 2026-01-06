import type { RestaurantFormType } from '../types';

interface Props {
    form: RestaurantFormType;
}

export const GeneralInfoForm = ({ form }: Props) => {
    const { register, formState: { errors } } = form;

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Información General</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Restaurante</label>
                    <input
                        {...register('name')}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp (Pedidos)</label>
                    <input
                        {...register('whatsapp_number')}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                        placeholder="+502 12345678"
                    />
                </div>
            </div>

            <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Métodos de Entrega</h4>
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="enable_pickup"
                            {...register('enable_pickup')}
                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <label htmlFor="enable_pickup" className="text-sm text-gray-700 select-none cursor-pointer">
                            Habilitar <strong>Recoger en Tienda</strong>
                        </label>
                    </div>

                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="enable_delivery"
                            {...register('enable_delivery')}
                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <label htmlFor="enable_delivery" className="text-sm text-gray-700 select-none cursor-pointer">
                            Habilitar <strong>Servicio a Domicilio</strong>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};
