import React, { useState, useEffect } from 'react';
import { getDocuments } from '../../services/documentServiceGet'
import { Link } from 'react-router-dom';
import { AppleCardDocuments } from './AppleCardDocuments';
import imgSearch from '../../assets/imgSearch.jpg'; 

function SearchDocuments() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAuthor, setFilterAuthor] = useState('');
    const [filterTag, setFilterTag] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [documentos, setDocumentos] = useState([]);

    const handleReset = () => {
        setSearchTerm('');
        setFilterAuthor('');
        setFilterTag('');
        setFilterYear('');
    };

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await getDocuments();
                setDocumentos(data);
            } catch (error) {
                console.error('Error al obtener documentos:', error);
            }
        };

        fetchDocuments();
    }, []);

    const filteredDocs = documentos.filter((doc) => {
        const matchesTitle = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAuthor = filterAuthor ? doc.author?.toLowerCase().includes(filterAuthor.toLowerCase()) : true;
        const matchesYear = filterYear ? new Date(doc.upload_date).getFullYear().toString() === filterYear : true;
        const matchesTag = filterTag ? doc.tags?.some(tag => tag.name.toLowerCase().includes(filterTag.toLowerCase())) : true;
        return matchesTitle && matchesAuthor && matchesYear && matchesTag;
    });

    const cardData = filteredDocs.map((doc) => ({
        src: doc.cover_image_path
            ? `${import.meta.env.VITE_API_BASE_URL}/documents/${doc.id}/cover/download`
            : '/default-cover.jpg', // Ajusta si tienes imagen por defecto
        title: doc.title,
        category: `${doc.author || 'Autor desconocido'} • ${new Date(doc.upload_date).getFullYear()}`,
        content: (
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex flex-wrap gap-1">
                {(doc.tags || []).map((tag, i) => (
                <span
                    key={i}
                    className="inline-block bg-[#BBE1FA] text-[#0F4C75] dark:bg-[#3282B8] dark:text-white text-xs font-medium px-2 py-1 rounded-full"
                >
                    #{tag.name}
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
        ),
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
