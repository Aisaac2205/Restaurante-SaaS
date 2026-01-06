import { Store, Globe, Mail, Pencil } from 'lucide-react';
import type { Tenant } from '../types';

interface TenantTableProps {
    tenants: Tenant[];
    onEdit: (tenant: Tenant) => void;
}

export const TenantTable = ({ tenants, onEdit }: TenantTableProps) => {
    if (tenants.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center text-gray-500">
                No hay restaurantes registrados. Crea el primero.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Restaurante
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Slug
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {tenants.map((tenant) => (
                            <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <Store className="w-5 h-5 text-gray-500" />
                                        </div>
                                        <span className="font-medium text-gray-900">{tenant.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Globe className="w-4 h-4" />
                                        <code className="text-sm bg-gray-100 px-2 py-0.5 rounded">
                                            /{tenant.slug}
                                        </code>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Mail className="w-4 h-4" />
                                        <span className="text-sm">{tenant.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => onEdit(tenant)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden divide-y divide-gray-100">
                {tenants.map((tenant) => (
                    <div key={tenant.id} className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Store className="w-5 h-5 text-gray-500" />
                                </div>
                                <div>
                                    <span className="block font-medium text-gray-900">{tenant.name}</span>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                        <Globe className="w-3 h-3" />
                                        <code>/{tenant.slug}</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Mail className="w-4 h-4" />
                                <span>{tenant.email}</span>
                            </div>
                            <button
                                onClick={() => onEdit(tenant)}
                                className="p-2 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
