import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeSwitch from './ThemeSwitch.jsx';

function Navbar() {
    const { user, logout } = useAuth();
    const [showSettings, setShowSettings] = useState(false);
    const settingsRef = useRef(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef(null);

    useEffect(() => {

        if (user) {
            console.log('Usuario en Navbar:', user);
            console.log('Rol del usuario en Navbar:', user.role);
        }

        const handleClickOutside = (event) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setShowSettings(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [user]); 

    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-sky-700 text-white sticky top-0 z-50 shadow-lg font-sans tracking-wide">
            <div className="text-2xl font-bold">
                <Link to="/" className="text-white hover:text-sky-200 transition-colors duration-300">
                    Repositorio Bicentenario
                </Link>
            </div>

            <ul className="flex items-center space-x-6">
                <li>
                    <Link
                        to="/search"
                        className="text-sky-100 hover:text-white font-medium text-base transition-all duration-300 px-3 py-2 rounded-lg hover:bg-sky-600/70 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50"
                    >
                        Buscar
                    </Link>
                </li>

                <li>
                    <Link
                        to="/foro"
                        className="text-sky-100 hover:text-white font-medium text-base transition-all duration-300 px-3 py-2 rounded-lg hover:bg-sky-600/70 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50"
                    >
                        Foro
                    </Link>
                </li>

                {user?.role === 'administrador' && (
                    <>
                        <li>
                            <Link
                                to="/admin/upload"
                                className="text-sky-100 hover:text-white font-medium text-base transition-all duration-300 px-3 py-2 rounded-lg hover:bg-sky-600/70 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50"
                            >
                                Subir documento
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin-users"
                                className="text-sky-100 hover:text-white font-medium text-base transition-all duration-300 px-3 py-2 rounded-lg hover:bg-sky-600/70 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50"
                            >
                                Administración de usuarios
                            </Link>
                        </li>
                    </>
                )}

                <li className="relative" ref={settingsRef}>
                    <button
                        onClick={() => setShowSettings((prev) => !prev)}
                        className="text-sm font-medium text-white bg-sky-600/30 border border-sky-500/70 px-4 py-2 rounded-lg hover:bg-sky-500/80 hover:border-sky-400 transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
                    >
                        Ajustes
                    </button>
                    {showSettings && (
                        <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg shadow-xl border border-gray-300 dark:border-slate-700 z-50 py-2 font-normal">
                            <p className="text-sm text-gray-500 dark:text-gray-400 px-4 pb-1">Opciones (Próximamente)</p>
                            <button
                                disabled
                                className="w-full text-left px-4 py-2 text-sm text-gray-400 dark:text-gray-500 cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-700 rounded"
                            >
                                Idioma
                            </button>
                            <button
                                disabled
                                className="w-full text-left px-4 py-2 text-sm text-gray-400 dark:text-gray-500 cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-700 rounded"
                            >
                                Tamaño de texto
                            </button>
                        </div>
                    )}
                </li>

                <li className="ml-2">
                    <ThemeSwitch />
                </li>

                <li className="relative" ref={userMenuRef}>
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu((prev) => !prev)}
                                className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-opacity-75"
                            >
                                {user.email.split('@')[0]}
                            </button>

                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg shadow-xl border border-gray-300 dark:border-slate-700 z-50 font-normal">
                                    <Link
                                        to="/profile" 
                                        onClick={() => setShowUserMenu(false)}
                                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 rounded-t-lg"
                                    >
                                        Perfil
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            logout();
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-b-lg"
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-opacity-75"
                        >
                            Login
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;