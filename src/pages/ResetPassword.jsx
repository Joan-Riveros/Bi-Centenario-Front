import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { authService } from '../services/authService'; 
import AuthWrapper from '../components/AuthWrapper.jsx'; 
import Button from '../components/Button.jsx'; 

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const resetToken = searchParams.get('token');
        if (resetToken) {
            setToken(resetToken);
        } else {
            setMessage("Token de reseteo no encontrado o invalido. Por favor, solicita un nuevo enlace de reseteo");
            setIsError(true);
        }
    }, [searchParams, navigate]);

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setIsError(false);

        if (!token) {
            setMessage("Enlace de reseteo invalido. Intenta de nuevo desde tu correo");
            setIsError(true);
            setIsLoading(false);
            return;
        }
        if (newPassword.length < 8) {
            setMessage("La nueva contraseña debe tener al menos 8 caracteres");
            setIsError(true);
            setIsLoading(false);
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage("Las contraseñas no coinciden");
            setIsError(true);
            setIsLoading(false);
            return;
        }

        try {
            const response = await authService.confirmPasswordReset(token, newPassword);
            setMessage(response.msg + " Seras redirigido al login");
            setIsError(false);
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 3000);
        } catch (err) {
            setMessage(err.detail || err.message || "Ocurrio un error al restablecer la contraseña");
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthWrapper> 
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                Restablecer Contraseña
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {message && (
                    <p className={`text-sm text-center p-3 rounded-md ${
                        isError ? 'bg-red-50 text-red-700 dark:bg-red-700 dark:text-red-100' 
                                : 'bg-green-50 text-green-700 dark:bg-green-700 dark:text-green-100'
                    }`}>
                        {message}
                    </p>
                )}

                <div className="relative">
                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nueva Contraseña
                    </label>
                    <input
                        id="newPassword"
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Mínimo 8 caracteres"
                        required
                        disabled={isLoading || !token}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute top-10 right-3 text-gray-600 dark:text-gray-300" 
                        disabled={isLoading || !token}
                    >
                        {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
                    </button>
                </div>

                <div className="relative">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirmar Nueva Contraseña
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Confirma tu contraseña"
                        required
                        disabled={isLoading || !token}
                    />
                    <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute top-10 right-3 text-gray-600 dark:text-gray-300"
                        disabled={isLoading || !token}
                    >
                        {showConfirmPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
                    </button>
                </div>

                <Button
                    type="submit"
                    className="w-full py-3 text-base"
                    disabled={isLoading || !token || message && !isError} 
                >
                    {isLoading ? 'Actualizando...' : 'Cambiar Contraseña'}
                </Button>

                {!token && isError && ( 
                    <Link to="/recover-password" className="block text-center mt-4 text-sm text-primary hover:text-primary-hover transition-colors">
                        Solicitar nuevo enlace de reseteo
                    </Link>
                )}
                <Link to="/login" className="block text-center mt-4 text-sm text-primary hover:text-primary-hover transition-colors">
                    ⬅️ Volver a Login
                </Link>
            </form>
        </AuthWrapper>
    );
}

export default ResetPassword;