import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthService } from '../services/auth.service';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        setErrorMsg('');
        try {
            const response = await AuthService.login(data.email, data.password);
            login(response.token);

            // Decode token to check role for redirect
            const payload = JSON.parse(atob(response.token.split('.')[1]));
            if (payload.system_role === 'SUPER_ADMIN') {
                navigate('/tenants');
            } else {
                navigate('/');
            }
        } catch (error: unknown) {
            console.error(error);
            // Type guard simple
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const err = error as { response: { status: number } };
                if (err.response.status === 401) {
                    setErrorMsg('Credenciales incorrectas');
                } else {
                    setErrorMsg('Error al conectar con el servidor');
                }
            } else {
                setErrorMsg('Error desconocido');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-5">
                {errorMsg && (
                    <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-sm text-center font-medium">
                        {errorMsg}
                    </div>
                )}

                <div>
                    <input
                        {...register('email')}
                        id="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full px-0 py-3 border-0 border-b border-white/40 bg-transparent text-white placeholder:text-gray-400 focus:bg-transparent focus:ring-0 focus:border-white transition-all duration-200 text-sm"
                        placeholder="Correo electrónico"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400 font-medium">{errors.email.message}</p>}
                </div>

                <div>
                    <input
                        {...register('password')}
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full px-0 py-3 border-0 border-b border-white/40 bg-transparent text-white placeholder:text-gray-400 focus:bg-transparent focus:ring-0 focus:border-white transition-all duration-200 text-sm"
                        placeholder="Contraseña"
                    />
                    {errors.password && <p className="mt-1 text-xs text-red-400 font-medium">{errors.password.message}</p>}
                </div>


            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-3.5 px-4 border-2 border-white text-sm font-bold rounded-none text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-75 transition-all duration-200"
                >
                    {loading ? <Loader2 className="animate-spin h-5 w-5 text-gray-600" /> : 'INICIAR SESIÓN'}
                </button>
            </div>
        </form>
    );
};
