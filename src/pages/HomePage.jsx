import React from 'react';
import { Link } from 'react-router-dom';
import fondoVideo from '../assets/fondoHome.mp4';

function HomePage() {
    const documentosRecomendados = [
        { id: 1, titulo: "Acta de Independencia", autor: "Asamblea 1825", fecha: "06/08/1825" },
        { id: 2, titulo: "Carta de Simón Bolívar", autor: "Simón Bolívar", fecha: "23/10/1825" },
        { id: 3, titulo: "Constitución de 1831", autor: "Congreso Nacional", fecha: "15/03/1831" },
    ];
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
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
            
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                    Repositorio Bicentenario de Bolivia
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Explora documentos históricos digitalizados de Bolivia. Aquí encontrarás actas, cartas, decretos y más archivos relevantes del proceso de independencia y fundación de la república.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                    Documentos Recomendados del Bicentenario
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {documentosRecomendados.map((doc) => (
                        <Link
                            to={`/documento/${doc.id}`}
                            key={doc.id}
                            className="rounded-xl border border-orange-300 bg-white dark:bg-darkSecondary p-5 transition hover:scale-[1.02] hover:shadow-md hover:border-primary duration-200 cursor-pointer block"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                {doc.titulo}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                <strong>Autor:</strong> {doc.autor}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                <strong>Fecha:</strong> {doc.fecha}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;

