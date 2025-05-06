// src/pages/HomePage.jsx
import React from 'react';
import fondoVideo from '../assets/fondoHome.mp4';

function HomePage() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            >
                <source src={fondoVideo} type="video/mp4" />
                Tu navegador no soporta video HTML5.
            </video>

            <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
                <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Repositorio Bicentenario</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                    Accede a documentos históricos digitalizados de Bolivia con tecnología moderna.
                </p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
