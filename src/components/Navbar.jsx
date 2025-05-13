import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeSwitch from './ThemeSwitch.jsx';

function Navbar() {
    const { user, logout } = useAuth();
    const [showSettings, setShowSettings] = useState(false);
    const settingsRef = useRef(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef(null)

    useEffect(() => {
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
    }, []);

    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-primary text-white sticky top-0 z-50 shadow-md font-medium tracking-wide">
            <div className="text-2xl font-bold">
                <Link to="/" className="text-white hover:text-secondary transition-colors duration-300">
                    Repositorio Bicentenario
                </Link>
            </div>

            <ul className="flex items-center space-x-6">
                <li>
                    <Link
                        to="/search"
                        className="text-white hover:text-secondary text-base transition-colors duration-300"
                    >
                        Buscar
                    </Link>
                </li>
                {user?.role === 'Admin' && (
                    <>
                        <li>
                            <Link
                                to="/admin/upload"
                                className="text-white hover:text-secondary text-base transition-colors duration-300"
                            >
                                Subir documento
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin-users"
                                className="text-white hover:text-secondary text-base transition-colors duration-300"
                            >
                                Administración de usuarios
                            </Link>
                            
                        </li>
                    </>
                )}

                <li className="relative" ref={settingsRef}>
                    <button
                        onClick={() => setShowSettings((prev) => !prev)}
                        className="text-sm text-white border border-white/30 px-3 py-1.5 rounded-md hover:border-secondary transition-all"
                    >
                        Ajustes
                    </button>
                    {showSettings && (
                        <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-darkSecondary text-gray-900 dark:text-white rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 z-50 py-2">
                            <p className="text-sm text-gray-400 px-4 pb-1">Opciones (Próximamente)</p>
                            <button
                                disabled
                                className="w-full text-left px-4 py-2 text-gray-400 cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                                Idioma
                            </button>
                            <button
                                disabled
                                className="w-full text-left px-4 py-2 text-gray-400 cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
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
                                className="bg-secondary hover:bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-sm"
                            >
                                {user.email.split('@')[0]}
                            </button>

                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-darkSecondary text-gray-900 dark:text-white rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 z-50">
                                    <Link
                                        to="profile"
                                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t"
                                    >
                                        Perfil
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            logout();
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b"
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-secondary hover:bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-sm"
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
