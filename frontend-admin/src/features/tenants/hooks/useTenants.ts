import { useState, useEffect, useCallback } from 'react';
import { RestaurantService } from '../../../services/restaurant.service';
import type { Tenant, TenantFormData } from '../types';
import { initialTenantForm } from '../types';

interface UseTenantModalState {
    isOpen: boolean;
    editingId: number | null;
    form: TenantFormData;
    error: string | null;
    saving: boolean;
}

export const useTenants = () => {
    // Tenants list state
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [modal, setModal] = useState<UseTenantModalState>({
        isOpen: false,
        editingId: null,
        form: initialTenantForm,
        error: null,
        saving: false
    });

    // Load tenants on mount
    useEffect(() => {
        void loadTenants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadTenants = useCallback(async () => {
        try {
            setLoading(true);
            const list = await RestaurantService.getAll();
            setTenants(list);
        } catch (err) {
            console.error('Failed to load tenants:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Form handlers
    const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setModal(prev => {
            const updates = { ...prev.form, [name]: value };
            // Auto-generate slug from name when creating
            if (name === 'name' && !prev.editingId && !prev.form.slug) {
                updates.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            }
            return { ...prev, form: updates };
        });
    }, []);

    // Modal operations
    const openCreateModal = useCallback(() => {
        setModal({
            isOpen: true,
            editingId: null,
            form: initialTenantForm,
            error: null,
            saving: false
        });
    }, []);

    const openEditModal = useCallback((tenant: Tenant) => {
        setModal({
            isOpen: true,
            editingId: tenant.id,
            form: {
                name: tenant.name,
                slug: tenant.slug,
                email: tenant.email,
                password: '',
                confirmPassword: ''
            },
            error: null,
            saving: false
        });
    }, []);

    const closeModal = useCallback(() => {
        setModal({
            isOpen: false,
            editingId: null,
            form: initialTenantForm,
            error: null,
            saving: false
        });
    }, []);

    const setModalError = useCallback((error: string | null) => {
        setModal(prev => ({ ...prev, error }));
    }, []);

    // Submit handler
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setModal(prev => ({ ...prev, error: null }));

        const { editingId, form } = modal;

        // Validate passwords only for creation or if password is being changed
        if (!editingId || form.password) {
            if (form.password !== form.confirmPassword) {
                setModalError('Las contraseñas no coinciden');
                return;
            }
            if (!editingId && form.password.length < 6) {
                setModalError('La contraseña debe tener al menos 6 caracteres');
                return;
            }
        }

        setModal(prev => ({ ...prev, saving: true }));

        try {
            if (editingId) {
                await RestaurantService.updateById(editingId, {
                    name: form.name,
                    slug: form.slug,
                });
            } else {
                await RestaurantService.createTenant({
                    name: form.name,
                    slug: form.slug,
                    email: form.email,
                    password: form.password
                });
            }

            await loadTenants();
            closeModal();
        } catch (err) {
            console.error(err);
            setModalError(editingId
                ? 'Error al actualizar el restaurante.'
                : 'Error al crear el restaurante. Verifica que el email o slug no existan.'
            );
        } finally {
            setModal(prev => ({ ...prev, saving: false }));
        }
    }, [modal, loadTenants, closeModal, setModalError]);

    return {
        // List state
        tenants,
        loading,

        // Modal state
        modal,

        // Actions
        openCreateModal,
        openEditModal,
        closeModal,
        handleFormChange,
        handleSubmit,
        refreshTenants: loadTenants
    };
};
