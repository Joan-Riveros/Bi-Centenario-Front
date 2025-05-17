import React from 'react';
import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks.jsx'; 

function Footer() {
    return (
        <footer className="bg-yellow-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 py-2 mt-auto shadow-inner transition-colors duration-300 font-sans">
            <div className="max-w-6xl mx-auto px-6 text-sm font-medium tracking-wide">
                <p className="text-neutral-700 dark:text-neutral-300 text-center mb-6 leading-snug">
                
                    © {new Date().getFullYear()} Repositorio Bicentenario de Bolivia. Todos los derechos reservados. 
                    <span className="font-semibold text-neutral-800 dark:text-neutral-100"> Trinity Team</span>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left mb-8"> 

                    <div>
                        <h3 className="text-neutral-800 dark:text-neutral-100 font-semibold mb-3 text-base">
                        
                            Navegación
                        </h3>
                        <ul className="space-y-2"> 
                            <li><Link to="/" className="text-neutral-600 dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition">Inicio</Link></li>
                            <li><Link to="/login" className="text-neutral-600 dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition">Login</Link></li>
                            <li><Link to="/register" className="text-neutral-600 dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition">Registro</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center sm:items-start">
                        <h3 className="text-neutral-800 dark:text-neutral-100 font-semibold mb-3 text-base">
                            Redes Sociales
                        </h3>

                        <div className="text-neutral-700 dark:text-neutral-300"> 
                            <SocialLinks />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-neutral-800 dark:text-neutral-100 font-semibold mb-3 text-base">

                            Sobre el Repositorio
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed"> 

                            Plataforma digital para consulta, preservación y análisis de documentos históricos bolivianos. Proyecto del Bicentenario 2025.
                        </p>
                    </div>
                </div>

                <p className="text-center text-xs text-neutral-500 dark:text-neutral-500 tracking-wide italic">
                    “Conocer nuestra historia es entender nuestro presente.”
                </p>
            </div>
        </footer>
    );
}

export default Footer;