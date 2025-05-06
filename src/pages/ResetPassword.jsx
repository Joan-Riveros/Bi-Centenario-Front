import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';

function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark p-6">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                    Restablecer Contraseña
                </h2>

                <form className="space-y-6">
                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nueva Contraseña
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Nueva contraseña"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-10 right-3 text-gray-600 dark:text-gray-300"
                        >
                            {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
                        </button>
                    </div>

                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirmar Nueva Contraseña
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Confirma tu contraseña"
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute top-10 right-3 text-gray-600 dark:text-gray-300"
                        >
                            {showConfirmPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-md transition-colors duration-300"
                    >
                        Cambiar Contraseña
                    </button>

                    <Link to="/login" className="block text-center mt-4 text-sm text-primary hover:text-primary-hover transition-colors">
                        ⬅️ Volver a Login
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
