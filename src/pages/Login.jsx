import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import AuthWrapper from '../components/AuthWrapper.jsx';
import Button from '../components/Button';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(email, password);
        if (success) {
        navigate('/admin-users');
        } else {
        setError('Credenciales incorrectas');
        }
    };

    return (
        <AuthWrapper>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                Iniciar Sesión
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="ejemplo@correo.com"
                        required
                    />
                </div>

                <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="********"
                        required
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="absolute top-10 right-3 text-gray-600 dark:text-gray-300">
                        {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
                    </button>
                </div>

                <div className="text-right">
                    <Link to="/recover-password" className="text-sm text-primary hover:text-primary-hover transition-colors">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                <Button
                    type="submit"
                    className="w-full py-3 text-base"
                    color="bg-primary"
                    border="border-orange-500"
                    shadow="shadow-orange-300"
                >
                    Entrar
                </Button>

                <div className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className="text-primary hover:text-primary-hover">Regístrate</Link>
                </div>

                <Link to="/" className="block text-center mt-4 text-sm text-primary hover:text-primary-hover transition-colors">
                    ⬅️ Volver a Home
                </Link>
            </form>
        </AuthWrapper>
    );
}

export default Login;
