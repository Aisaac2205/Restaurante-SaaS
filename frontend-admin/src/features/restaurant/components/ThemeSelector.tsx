import React from 'react';
import type { UseFormRegister } from 'react-hook-form';
import { Layout, Star, CheckCircle } from 'lucide-react';
import type { RestaurantFormType } from '../types';

interface Props {
    register: UseFormRegister<RestaurantFormType>;
    currentTheme: string;
}

export const ThemeSelector = ({ register, currentTheme }: Props) => {
    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Tema Visual del Menú</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* V1 URBAN */}
                <label className={`relative block cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all ${currentTheme === 'v1-urban' ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input
                        type="radio"
                        {...register('theme_mode')}
                        value="v1-urban"
                        className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-3">
                            <span className={`p-2 rounded-md ${currentTheme === 'v1-urban' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                                <Layout className="w-5 h-5" />
                            </span>
                            <span className="flex flex-col">
                                <span className="block text-sm font-medium text-gray-900">Urbano (V1)</span>
                                <span className="block text-xs text-gray-500">Diseño vibrante con fotos grandes.</span>
                            </span>
                        </span>
                        {currentTheme === 'v1-urban' && (
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                        )}
                    </div>
                </label>

                {/* V2 ELEGANT */}
                <label className={`relative block cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all ${currentTheme === 'v2-elegant' ? 'border-gray-900 ring-1 ring-gray-900 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input
                        type="radio"
                        {...register('theme_mode')}
                        value="v2-elegant"
                        className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-3">
                            <span className={`p-2 rounded-md ${currentTheme === 'v2-elegant' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-500'}`}>
                                <Star className="w-5 h-5" />
                            </span>
                            <span className="flex flex-col">
                                <span className="block text-sm font-medium text-gray-900">Elegante (V2)</span>
                                <span className="block text-xs text-gray-500">Minimalista, tipografía Serif.</span>
                            </span>
                        </span>
                        {currentTheme === 'v2-elegant' && (
                            <CheckCircle className="w-5 h-5 text-gray-900" />
                        )}
                    </div>
                </label>
            </div>
        </div>
    );
};
