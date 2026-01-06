import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext, type User } from './AuthContextDef';
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
    userId: string;
    email: string;
    role: string;
    system_role?: string;
    iat: number;
    exp: number;
}

const SESSION_DURATION_MS = 12 * 60 * 60 * 1000; // 12 hours
const LOGIN_TIMESTAMP_KEY = 'loginTimestamp';
const TOKEN_KEY = 'token';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<{
        token: string | null;
        user: User | null;
        isLoading: boolean;
    }>(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedTimestamp = localStorage.getItem(LOGIN_TIMESTAMP_KEY);

        if (!storedToken) {
            return { token: null, user: null, isLoading: false };
        }

        // Validate session duration
        const now = Date.now();
        if (storedTimestamp) {
            const loginTime = parseInt(storedTimestamp, 10);
            if (now - loginTime > SESSION_DURATION_MS) {
                // Session expired
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(LOGIN_TIMESTAMP_KEY);
                return { token: null, user: null, isLoading: false };
            }
        } else {
            // Legacy session (no timestamp), set it now to start the 12h clock
            localStorage.setItem(LOGIN_TIMESTAMP_KEY, now.toString());
        }

        try {
            const decoded = jwtDecode<JWTPayload>(storedToken);
            // Also check JWT expiration as a fallback
            if (decoded.exp * 1000 < now) {
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(LOGIN_TIMESTAMP_KEY);
                return { token: null, user: null, isLoading: false };
            }

            return {
                token: storedToken,
                user: {
                    id: decoded.userId,
                    email: decoded.email,
                    role: decoded.role,
                    system_role: decoded.system_role
                },
                isLoading: false
            };
        } catch {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(LOGIN_TIMESTAMP_KEY);
            return { token: null, user: null, isLoading: false };
        }
    });

    const login = (newToken: string) => {
        const now = Date.now();
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(LOGIN_TIMESTAMP_KEY, now.toString());

        try {
            const decoded = jwtDecode<JWTPayload>(newToken);
            setState({
                token: newToken,
                user: {
                    id: decoded.userId,
                    email: decoded.email,
                    role: decoded.role,
                    system_role: decoded.system_role
                },
                isLoading: false
            });
        } catch (error) {
            console.error("Invalid token during login", error);
        }
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(LOGIN_TIMESTAMP_KEY);
        setState({ token: null, user: null, isLoading: false });
    };

    // Periodic check for session timeout
    useEffect(() => {
        if (!state.token) return;

        const checkSession = () => {
            const storedTimestamp = localStorage.getItem(LOGIN_TIMESTAMP_KEY);
            if (storedTimestamp) {
                const loginTime = parseInt(storedTimestamp, 10);
                const now = Date.now();
                if (now - loginTime > SESSION_DURATION_MS) {
                    logout();
                }
            }
        };

        const intervalId = setInterval(checkSession, 60 * 1000); // Check every minute
        return () => clearInterval(intervalId);
    }, [state.token]);

    return (
        <AuthContext.Provider value={{
            isAuthenticated: !!state.token,
            token: state.token,
            user: state.user,
            login,
            logout,
            isLoading: state.isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};
