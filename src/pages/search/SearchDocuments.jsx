import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const documentos = [
    { id: 1, titulo: "Acta de Independencia", autor: "Asamblea 1825", fecha: "1825", etiquetas: ["Historia", "Independencia"] },
    { id: 2, titulo: "Carta de Simón Bolívar", autor: "Simón Bolívar", fecha: "1825", etiquetas: ["Carta", "Bolívar"] },
    { id: 3, titulo: "Constitución de 1831", autor: "Congreso Nacional", fecha: "1831", etiquetas: ["Constitución", "Ley"] },
    { id: 4, titulo: "Decreto Supremo 1840", autor: "Gobierno", fecha: "1840", etiquetas: ["Decreto", "Oficial"] },
];

function SearchDocuments() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAuthor, setFilterAuthor] = useState('');
    const [filterTag, setFilterTag] = useState('');
    const [filterYear, setFilterYear] = useState('');

    const handleReset = () => {
        setSearchTerm('');
        setFilterAuthor('');
        setFilterTag('');
        setFilterYear('');
    };

    const filteredDocs = documentos.filter((doc) => {
        const matchesTitle = doc.titulo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAuthor = filterAuthor ? doc.autor.toLowerCase().includes(filterAuthor.toLowerCase()) : true;
        const matchesYear = filterYear ? doc.fecha === filterYear : true;
        const matchesTag = filterTag ? doc.etiquetas.some(tag => tag.toLowerCase().includes(filterTag.toLowerCase())) : true;
        return matchesTitle && matchesAuthor && matchesYear && matchesTag;
    });

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
                Búsqueda Avanzada de Documentos
            </h1>

            <input
                type="text"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-xl mx-auto block p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Autor"
                    value={filterAuthor}
                    onChange={(e) => setFilterAuthor(e.target.value)}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
                <input
                    type="text"
                    placeholder="Etiqueta"
                    value={filterTag}
                    onChange={(e) => setFilterTag(e.target.value)}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
                <input
                    type="text"
                    placeholder="Año"
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
                <button
                    onClick={handleReset}
                    className="bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2 transition-colors"
                >
                    Limpiar filtros
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                    <Link
                        to={`/documento/${doc.id}`}
                        key={doc.id}
                        className="group rounded-xl border border-orange-300 bg-white dark:bg-darkSecondary p-5 transition transform hover:scale-[1.03] hover:shadow-lg hover:border-primary duration-200 cursor-pointer block"
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
                        <div className="flex gap-1 flex-wrap mt-2">
                            {doc.etiquetas.map((tag, i) => (
                            <span
                                key={i}
                                className="bg-orange-100 dark:bg-orange-700 text-orange-800 dark:text-white text-xs px-2 py-1 rounded-full"
                            >
                                #{tag}
                            </span>
                            ))}
                        </div>
                    </Link>
                ))
                ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
                    No se encontraron documentos con esos filtros.
                </p>
                )}
            </div>
        </div>
    );
}

export default SearchDocuments;
