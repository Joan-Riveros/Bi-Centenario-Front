import React from 'react';
import { Link } from 'react-router-dom';

function AccessDenied() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-paleYellow to-lightBrown dark:from-darkBase dark:to-darkSecondary px-4">
            <div className="text-center animate-fadeIn shadow-xl rounded-lg p-10 bg-white/80 dark:bg-darkSecondary/80 backdrop-blur-sm">
                <h1 className="text-6xl font-extrabold text-red-600 drop-shadow-md mb-4 animate-pulse tracking-wider">
                    403
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                    Acceso Denegado
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md mx-auto">
                    No tienes permiso para acceder a esta página. Verifica tus credenciales o contacta con un administrador.
                </p>

                <Link
                    to="/"
                    className="inline-block bg-primary hover:bg-primary-hover text-white text-sm md:text-base font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}

export default AccessDenied;
