import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import AuthWrapper from '../components/AuthWrapper.jsx';
import Button from '../components/Button.jsx';
import memoriaAntiqua from '../assets/MomoriaAntiqua.jpg'

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const loginResult = await login(email, password);

        setIsLoading(false);

        if (loginResult.success) {
            if (loginResult.requires2FA) {
                navigate('/verify-2fa', {
                state: {
                    twoFactorToken: loginResult.twoFactorToken,
                    email: email,
                },
                });
            } else {
                navigate('/');
            }
        } else {
            setError(loginResult.error || 'Credenciales incorrectas o error en el login');
        }
    };

    return (
        <AuthWrapper>
            <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto bg-white dark:bg-base rounded-xl shadow-lg overflow-hidden animate-fadeIn">
                <div className="w-full md:w-1/2">
                    <img
                        src={memoriaAntiqua}
                        alt="Documentos históricos"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-10">
                    <h2 className="text-3xl font-bold text-center text-primary dark:text-accent mb-6 font-sans">
                        Iniciar Sesión
                    </h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <p className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900 dark:text-red-300 py-2 rounded-md">
                            {error}
                            </p>
                        )}

                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                name="email"
                                autoComplete="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-light dark:bg-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                                placeholder="ejemplo@correo.com"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="relative">
                            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Contraseña
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-light dark:bg-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                                placeholder="********"
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-1 top-[31px] text-gray-600 dark:text-gray-300 hover:text-primary"
                                disabled={isLoading}
                                aria-label="Mostrar u ocultar contraseña"
                            >
                                {showPassword ? <HiEyeOff size={26} /> : <HiEye size={26} />}
                            </button>
                        </div>

                        <div className="text-right text-sm">
                            <Link
                                to="/recover-password"
                                className="text-secondary hover:text-accent transition-colors"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            variant="neutral"
                            className="w-full py-3 text-base"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Ingresando...' : 'Entrar'}
                        </Button>

                        <div className="text-center text-sm text-gray-700 dark:text-gray-300 mt-4">
                            ¿No tienes cuenta?{' '}
                            <Link to="/register" className="text-primary hover:text-accent font-medium">
                                Regístrate
                            </Link>
                        </div>

                        <Link
                            to="/"
                            className="block text-center mt-4 text-sm text-primary hover:text-accent transition-colors"
                        >
                            ⬅️ Volver a Home
                        </Link>
                    </form>
                </div>
            </div>
        </AuthWrapper>
    );
}

export default Login;
