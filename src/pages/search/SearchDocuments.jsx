import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppleCardDocuments } from './AppleCardDocuments';
import imgSearch from '../../assets/imgSearch.jpg'; 

const documentos = [
    {
        id: 1,
        titulo: "Acta de Independencia",
        autor: "Asamblea 1825",
        fecha: "1825",
        etiquetas: ["Historia", "Independencia"],
        imagen: "https://upload.wikimedia.org/wikipedia/commons/4/47/Acta_de_independencia_de_la_Rep%C3%BAblica_de_Bolivia.png"
    },
    {
        id: 2,
        titulo: "Carta de Simón Bolívar",
        autor: "Simón Bolívar",
        fecha: "1825",
        etiquetas: ["Carta", "Bolívar"],
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGc-YrDY45rg-4UydjjJXBdz1avC7GJOylykZfC0X3Oy5QWtBUeMz7wsRVk7pEamvn2W8&usqp=CAU"
    },
    {
        id: 3,
        titulo: "Constitución de 1831",
        autor: "Congreso Nacional",
        fecha: "1831",
        etiquetas: ["Constitución", "Ley"],
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo8_-lCRUXWmkquA5uldXnbJ5BdJEq551ODXsz7Jwtd_tK7Hw1MKCuIqYXToMsKX2lAVs&usqp=CAU"
    },
    {
        id: 4,
        titulo: "Decreto Supremo 1840",
        autor: "Gobierno",
        fecha: "1840",
        etiquetas: ["Decreto", "Oficial"],
        imagen: "https://lh4.googleusercontent.com/proxy/_cf0q5OBKkuhS1Z1HoFWzjGsMid6I8sMYGWbK0sV0ShFtCgeLTRWVhph4QYn930nUxESoBFCoidM9oE6u7MZ1_NWBK8jT4gSumvF5iAY0Zb5irXJ9yrq_I1WtwDy"
    }
];

function SearchDocuments() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAuthor, setFilterAuthor] = useState('');
    const [filterTag, setFilterTag] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [showFilters, setShowFilters] = useState(false);

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

    const cardData = filteredDocs.map((doc) => ({
        src: doc.imagen,
        title: doc.titulo,
        category: `${doc.autor} • ${doc.fecha}`,
        content: (
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex flex-wrap gap-1">
                {doc.etiquetas.map((tag, i) => (
                    <span
                        key={i}
                        className="inline-block bg-[#BBE1FA] text-[#0F4C75] dark:bg-[#3282B8] dark:text-white text-xs font-medium px-2 py-1 rounded-full"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
            <Link
                to={`/documento/${doc.id}`}
                className="inline-block mt-2 text-sm text-[#000000] hover:text-[#ffffff] underline transition"
            >
                Ver documento completo →
            </Link>
        </div>
        )
    }));

    return (
        <div className="max-w-8xl mx-auto px-6 py-10 space-y-10 bg-light-gradient dark:bg-dark-gradient bg-full animate-gradient transition-all">
            
            <img
                src={imgSearch}
                alt="Documentos históricos"
                className="w-full max-h-80 object-cover rounded-xl shadow-lg"
            />

            <h1 className="text-3xl font-bold text-center text-[#0F4C75] dark:text-[#BBE1FA]">
                Búsqueda de Documentos Históricos
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:max-w-lg p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-base text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3282B8]"
                />

                <button
                    onClick={() => setShowFilters(prev => !prev)}
                    className="mt-2 md:mt-0 px-6 py-2 bg-[#3282B8] hover:bg-[#0F4C75] text-white font-medium rounded-lg transition"
                >
                    Filtros
                </button>
            </div>

            {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeIn">
                    <input
                        type="text"
                        placeholder="Autor"
                        value={filterAuthor}
                        onChange={(e) => setFilterAuthor(e.target.value)}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-base text-gray-800 dark:text-white"
                    />
                    <input
                        type="text"
                        placeholder="Etiqueta"
                        value={filterTag}
                        onChange={(e) => setFilterTag(e.target.value)}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-base text-gray-800 dark:text-white"
                    />
                    <input
                        type="text"
                        placeholder="Año"
                        value={filterYear}
                        onChange={(e) => setFilterYear(e.target.value)}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-base text-gray-800 dark:text-white"
                    />
                    <button
                        onClick={handleReset}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 transition-colors"
                    >
                        Limpiar
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-items-center">
                {cardData.length > 0 ? (
                    cardData.map((card, index) => (
                        <AppleCardDocuments key={index} card={card} index={index} />
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
