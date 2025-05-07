import React from 'react';
import { Link } from 'react-router-dom';

function VisitorHome() {
    const documentosRecomendados = [
        { id: 1, titulo: "Acta de Independencia", autor: "Asamblea 1825", fecha: "06/08/1825" },
        { id: 2, titulo: "Carta de Simón Bolívar", autor: "Simón Bolívar", fecha: "23/10/1825" },
        { id: 3, titulo: "Constitución de 1831", autor: "Congreso Nacional", fecha: "15/03/1831" },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
                Documentos Recomendados del Bicentenario
            </h1>
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
    );
}

export default VisitorHome;
