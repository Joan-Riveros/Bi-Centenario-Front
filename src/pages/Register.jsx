import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import AuthWrapper from '../components/AuthWrapper.jsx';


function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev);
    };

    return (
        <AuthWrapper>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                Crear Cuenta
            </h2>

            <form className="space-y-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Nombre Completo</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Tu nombre completo"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
                    <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="ejemplo@correo.com"
                        required
                    />
                </div>

                <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="********"
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
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar Contraseña</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="********"
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

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        required
                    />
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                        Acepto los <a href="#" className="text-primary hover:text-primary-hover">Términos y Condiciones</a>.
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-md transition-colors duration-300"
                >
                    Registrarse
                </button>

                <Link to="/" className="block text-center mt-4 text-sm text-primary hover:text-primary-hover transition-colors">
                    ⬅️ Volver a Home
                </Link>
            </form>
        </AuthWrapper>
    );
}

export default Register;
