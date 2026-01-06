import { Plus, Loader2 } from 'lucide-react';
import { useTenants, TenantTable, TenantModal } from '../features/tenants';

export const TenantsPage = () => {
    const {
        tenants,
        loading,
        modal,
        openCreateModal,
        openEditModal,
        closeModal,
        handleFormChange,
        handleSubmit
    } = useTenants();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestión de Tenants</h1>
                    <p className="text-gray-500 mt-1">Administra los restaurantes de la plataforma</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-lg shadow-gray-200"
                >
                    <Plus className="w-5 h-5" />
                    Nuevo Tenant
                </button>
            </div>

            {/* Table */}
            <TenantTable
                tenants={tenants}
                onEdit={openEditModal}
            />

            {/* Modal */}
            <TenantModal
                isOpen={modal.isOpen}
                editingId={modal.editingId}
                form={modal.form}
                error={modal.error}
                saving={modal.saving}
                onClose={closeModal}
                onChange={handleFormChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
};
