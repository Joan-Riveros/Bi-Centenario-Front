import React from 'react';
import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks.jsx';

function Footer() {
    return (
        <footer className="bg-primary dark:bg-darkSecondary text-white py-2 mt-auto shadow-inner transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6 text-sm font-medium tracking-wide">
                <p className="text-white/90 text-center mb-6 leading-snug">
                © {new Date().getFullYear()} Repositorio Bicentenario de Bolivia. Todos los derechos reservados. <span className="font-semibold">Trinity Team</span>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left mb-6">

                    <div>
                        <h3 className="text-white font-semibold mb-2">Navegación</h3>
                        <ul className="space-y-1">
                        <li><Link to="/" className="text-white/90 hover:text-secondary transition">Inicio</Link></li>
                        <li><Link to="/login" className="text-white/90 hover:text-secondary transition">Login</Link></li>
                        <li><Link to="/register" className="text-white/90 hover:text-secondary transition">Registro</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center sm:items-start">
                        <h3 className="text-white font-semibold mb-2">Redes Sociales</h3>
                        <SocialLinks />
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-2">Sobre el Repositorio</h3>
                        <p className="text-white/80 text-sm">
                        Plataforma digital para consulta, preservación y análisis de documentos históricos bolivianos. Proyecto del Bicentenario 2025.
                        </p>
                    </div>
                </div>

                <p className="text-center text-xs text-white/60 tracking-wide italic">
                “Conocer nuestra historia es entender nuestro presente.”
                </p>

            </div>
        </footer>
    );
}

export default Footer;
