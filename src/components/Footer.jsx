import React from 'react';
import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks.jsx';

function Footer() {
    return (
        <footer className="bg-primary text-white py-8 mt-auto shadow-inner">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-0 text-sm font-medium tracking-wide text-center">
                <p className="text-white/90">
                    © {new Date().getFullYear()} Repositorio Bicentenario de Bolivia. Todos los derechos reservados. <span className="font-semibold">Trinity Team</span>.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/" className="hover:text-secondary transition-colors duration-200">Inicio</Link>
                    <Link to="/login" className="hover:text-secondary transition-colors duration-200">Login</Link>
                    <Link to="/register" className="hover:text-secondary transition-colors duration-200">Registro</Link>
                </div>

                <SocialLinks />
            </div>
        </footer>
    );
}

export default Footer;
