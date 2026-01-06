import { useState, useEffect } from 'react';
import { Shield, Save, Loader2, Store } from 'lucide-react';
import { useRestaurantForm } from '../features/restaurant/hooks/useRestaurantForm';
import { SaaSBrandingForm } from '../features/saas/components/SaaSBrandingForm';
import { SaaSFeaturesForm } from '../features/saas/components/SaaSFeaturesForm';
import { RestaurantService } from '../services/restaurant.service';

interface TenantSummary {
    id: number;
    name: string;
    slug: string;
}

export const SaaSConfigPage = () => {
    const [tenants, setTenants] = useState<TenantSummary[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [loadingList, setLoadingList] = useState(true);

    // Fetch Tenants List
    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const list = await RestaurantService.getAll();
                setTenants(list);
                if (list.length > 0) {
                    setSelectedId(list[0].id); // Select first by default
                }
            } catch (error) {
                console.error("Failed to load tenants", error);
            } finally {
                setLoadingList(false);
            }
        };
        fetchTenants();
    }, []);

    // Hook depends on selectedId. It will re-fetch when selectedId changes.
    const { form, loading, saving, saveSettings } = useRestaurantForm(selectedId);

    if (loadingList) return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                        <Shield className="w-8 h-8" />
                        SaaS Configuration
                    </h1>
                    <p className="mt-1 text-gray-500">Panel de Super Administrador. Gestiona tus inquilinos.</p>
                </div>

                {/* Global Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={form.handleSubmit(saveSettings)}
                        disabled={saving || loading}
                        className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 font-medium shadow-sm"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Guardar Cambios
                    </button>
                </div>
            </div>

            {/* Tenant Selector */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                    <Store className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seleccionar Restaurante (Tenant)</label>
                    <select
                        className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        value={selectedId === null ? '' : selectedId}
                        onChange={(e) => setSelectedId(Number(e.target.value))}
                    >
                        {tenants.map(t => (
                            <option key={t.id} value={t.id}>{t.name} ({t.slug})</option>
                        ))}
                    </select>
                </div>
                <div className="text-right text-sm text-gray-500 hidden md:block">
                    ID: <span className="font-mono font-medium">{selectedId}</span>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Feature Flags - Priority 1 */}
                    <SaaSFeaturesForm form={form} />

                    {/* Branding Control - Priority 2 */}
                    <SaaSBrandingForm form={form} />
                </div>
            )}

            <div className="bg-red-50 border border-red-100 rounded-xl p-6 mt-8">
                <h3 className="text-red-800 font-semibold mb-2">Zona de Peligro</h3>
                <p className="text-red-600 text-sm mb-4">Acciones irreversibles para el tenant <strong>{tenants.find(t => t.id === selectedId)?.name}</strong>.</p>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                        Suspender Servicio
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                        Eliminar Tenant
                    </button>
                </div>
            </div>
        </div>
    );
};