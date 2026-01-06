import { createContext } from 'react';

export interface User {
    id: string;
    email: string;
    role: string; // 'OWNER' | 'MANAGER'
    system_role?: string; // 'SUPER_ADMIN'
}

export interface AuthContextProps {
    isAuthenticated: boolean;
    token: string | null;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
