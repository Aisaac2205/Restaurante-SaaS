// Tenant entity from backend
export interface Tenant {
    id: number;
    name: string;
    slug: string;
    email: string;
}

// Form data for creating/editing tenant
export interface TenantFormData {
    name: string;
    slug: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const initialTenantForm: TenantFormData = {
    name: '',
    slug: '',
    email: '',
    password: '',
    confirmPassword: ''
};
