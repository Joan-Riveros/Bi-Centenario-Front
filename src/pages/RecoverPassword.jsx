import React from 'react';
import { Link } from 'react-router-dom';
import AuthWrapper from '../components/AuthWrapper.jsx';


function RecoverPassword() {
    return (
        <AuthWrapper>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                Recuperar Contraseña
            </h2>

            <form className="space-y-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="ejemplo@correo.com"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-md transition-colors duration-300"
                >
                    Enviar instrucciones
                </button>

                <Link to="/login" className="block text-center mt-4 text-sm text-primary hover:text-primary-hover transition-colors">
                    ⬅️ Volver a Login
                </Link>
            </form>
        </AuthWrapper>
    );
}

export default RecoverPassword;
