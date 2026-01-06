import { Store, X, Loader2, Check } from 'lucide-react';
import type { TenantFormData } from '../types';

interface TenantModalProps {
    isOpen: boolean;
    editingId: number | null;
    form: TenantFormData;
    error: string | null;
    saving: boolean;
    onClose: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const TenantModal = ({
    isOpen,
    editingId,
    form,
    error,
    saving,
    onClose,
    onChange,
    onSubmit
}: TenantModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                {/* Header */}
                <div className="bg-black px-6 py-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Store className="w-5 h-5" />
                        {editingId ? 'Editar Restaurante' : 'Nuevo Restaurante'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    {/* Name and Slug */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                placeholder="Pizza King"
                                value={form.name}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Slug (URL)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-400">/</span>
                                <input
                                    type="text"
                                    name="slug"
                                    required
                                    className="pl-6 w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-black focus:border-transparent outline-none font-mono text-sm"
                                    placeholder="pizza-king"
                                    value={form.slug}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email - only for creation */}
                    {!editingId && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email del Dueño
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                placeholder="dueño@restaurante.com"
                                value={form.email}
                                onChange={onChange}
                            />
                        </div>
                    )}

                    {/* Password - only for creation */}
                    {!editingId && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    required={!editingId}
                                    className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirmar
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required={!editingId}
                                    className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    placeholder="••••••••"
                                    value={form.confirmPassword}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 font-medium"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Check className="w-4 h-4" />
                            )}
                            {editingId ? 'Guardar Cambios' : 'Crear Restaurante'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
