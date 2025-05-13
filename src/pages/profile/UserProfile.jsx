import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

function UserProfile() {
    const { user } = useAuth();

    // Fallback si no hay usuario aún (previene errores de lectura de propiedades)
    const currentUser = user ?? {
        nombre: 'Usuario Invitado',
        email: 'correo@ejemplo.com',
        role: 'Visitante',
    };

    const inicial = currentUser?.nombre?.[0] || currentUser?.email?.[0] || '?';

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <div className="bg-white dark:bg-darkSecondary rounded-lg shadow-md p-8 space-y-6 border border-gray-200 dark:border-gray-600">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                    Perfil del Usuario
                </h1>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="flex-shrink-0 w-28 h-28 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-md">
                        {inicial}
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3 text-gray-800 dark:text-white">
                            <FiUser className="text-xl" />
                            <span className="font-medium">{currentUser.nombre}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                            <FiMail className="text-xl" />
                            <span>{currentUser.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                            <FiLock className="text-xl" />
                            <span className="capitalize">Rol: {currentUser.role}</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-300 dark:border-gray-500 pt-6 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Configuraciones (próximamente)</h2>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li className="cursor-not-allowed">Cambiar contraseña</li>
                        <li className="cursor-not-allowed">Subir imagen de perfil</li>
                        <li className="cursor-not-allowed">Notificaciones</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
