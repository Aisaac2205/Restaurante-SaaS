import api from '../api/axios';
// Redefinimos interfaces si el backend no es accesible directamente en build time (común en frontend separado)
// Por robustez, las redefinimos aquí para desacoplar.
export interface LoginResponse {
    token: string;
    restaurant: {
        id: number;
        name: string;
        slug: string;
        email: string;
    }
}

export const AuthService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', { email, password });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loginTimestamp');
    }
};
