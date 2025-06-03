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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <nav className="relative bg-sky-700 text-white sticky top-0 z-50 shadow-lg font-sans tracking-wide">
            <div className="flex justify-between items-center px-6 py-4">
                <div className="text-2xl font-bold">
                    <Link to="/" className="text-white hover:text-sky-200 transition-colors duration-300">
                        Repositorio Bicentenario
                    </Link>
                </div>

                <ul className="hidden md:flex items-center space-x-6">
                    <li>
                        <Link
                            to="/search"
                            className="text-sky-100 hover:text-white font-medium text-base transition-all duration-300 px-3 py-2 rounded-lg hover:bg-sky-600/70"
                        >
                            Buscar
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/foro"
                            className="text-sky-100 hover:text-white font-medium text-base transition-all duration-300 px-3 py-2 rounded-lg hover:bg-sky-600/70"
                        >
                            Foro
                        </Link>
                    </li>

                    {user?.role === 'administrador' && (
                        <>
                        <li>
                            <Link
                                to="/documentos/nuevo"
                                className="text-sky-100 hover:text-white font-medium text-base transition-all duration-300 px-3 py-2 rounded-lg hover:bg-sky-600/70"
                            >
                                Subir documento
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin-users"
                                className="text-sky-100 hover:text-white font-medium text-base transition-all duration-300 px-3 py-2 rounded-lg hover:bg-sky-600/70"
                            >
                                Administración de usuarios
                            </Link>
                        </li>
                        </>
                    )}

                    <li className="relative" ref={settingsRef}>
                        <button
                            onClick={() => setShowSettings(prev => !prev)}
                            className="text-sm font-medium text-white bg-sky-600/30 border border-sky-500/70 px-4 py-2 rounded-lg hover:bg-sky-500/80"
                        >
                            Ajustes
                        </button>
                        {showSettings && (
                            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg shadow-xl border border-gray-300 dark:border-slate-700 z-50 py-2 font-normal">
                                <p className="text-sm text-gray-500 dark:text-gray-400 px-4 pb-1">Opciones (Próximamente)</p>
                                <button disabled className="w-full text-left px-4 py-2 text-sm text-gray-400 dark:text-gray-500 cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-700 rounded">
                                    Idioma
                                </button>
                                <button disabled className="w-full text-left px-4 py-2 text-sm text-gray-400 dark:text-gray-500 cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-700 rounded">
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
                                    className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg"
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
                            className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg"
                        >
                            Login
                        </Link>
                        )}
                    </li>
                </ul>

                <button
                    onClick={() => setIsMobileMenuOpen(prev => !prev)}
                    className="md:hidden focus:outline-none text-white"
                    aria-label="Abrir menú"
                >
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-sky-700 text-white z-40 shadow-lg">
                    <ul className="flex flex-col p-4 space-y-2 text-base">
                        <li><Link to="/search" onClick={() => setIsMobileMenuOpen(false)}>Buscar</Link></li>
                        <li><Link to="/foro" onClick={() => setIsMobileMenuOpen(false)}>Foro</Link></li>

                        {user?.role === 'administrador' && (
                        <>
                            <li><Link to="/admin/upload" onClick={() => setIsMobileMenuOpen(false)}>Subir documento</Link></li>
                            <li><Link to="/admin-users" onClick={() => setIsMobileMenuOpen(false)}>Admin. usuarios</Link></li>
                        </>
                        )}

                        <li><ThemeSwitch /></li>

                        {user ? (
                        <>
                            <li><Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>Perfil</Link></li>
                            <li>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        </>
                        ) : (
                        <li><Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link></li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;