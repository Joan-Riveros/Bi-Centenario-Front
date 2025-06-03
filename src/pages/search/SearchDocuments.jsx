import React, { useState, useEffect, useCallback } from 'react';
import { getDocuments } from '../../services/documentServiceGet';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = () => {
    setSearchTerm('');
    setFilterAuthor('');
    setFilterTag('');
    setFilterYear('');
  };

  const fetchDocumentsCallback = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log("Iniciando fetch de documentos..."); // DEBUG
    try {
      let combinedSearchQuery = searchTerm.trim();
      if (filterAuthor.trim()) {
        combinedSearchQuery += ` ${filterAuthor.trim()}`;
      }
      if (filterTag.trim()) {
        combinedSearchQuery += ` ${filterTag.trim()}`;
      }

      const params = {
        limit: 100,
        skip: 0,
      };

      if (combinedSearchQuery.trim()) {
        params.q = combinedSearchQuery.trim();
      }
      
      console.log("Parámetros para getDocuments:", params); // DEBUG

      const data = await getDocuments(params);
      console.log("Documentos recibidos del backend:", data); // DEBUG
      setDocumentos(data || []); // Asegurarse que documentos sea siempre un array
    } catch (error) {
      console.error('Error al obtener documentos:', error);
      setError('No se pudo cargar la lista de documentos. Intenta de nuevo más tarde.');
      setDocumentos([]); // En caso de error, establecer documentos a un array vacío
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterAuthor, filterTag]);

  useEffect(() => {
    fetchDocumentsCallback();
  }, [fetchDocumentsCallback]);

  const filteredDocs = (documentos || []).filter((doc) => { // Asegurarse que documentos no sea null/undefined
    const matchesYear = filterYear
      ? doc.upload_date && new Date(doc.upload_date).getFullYear().toString() === filterYear
      : true;
    return matchesYear;
  });

  const cardData = filteredDocs.map((doc) => {
    // --- DEBUGGING IMAGE URL ---
    const imageUrl = doc.cover_image_path
      ? `${import.meta.env.VITE_API_BASE_URL}/documents/${doc.id}/cover/download`
      : '/default-cover.jpg';
    
    // console.log(`Documento ID: ${doc.id}, Título: ${doc.title}, Cover Path: ${doc.cover_image_path}, Image URL construida: ${imageUrl}`); // DEBUG

    return {
      id: doc.id,
      src: imageUrl,
      title: doc.title,
      author: doc.author, // Añadido para mostrarlo si es necesario
      upload_date: doc.upload_date, // Añadido para consistencia
      category: `${doc.author || 'Autor desconocido'} • ${doc.upload_date ? new Date(doc.upload_date).getFullYear() : 'Año desconocido'}`,
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
            className="inline-block mt-2 text-sm text-[#000000] hover:text-[#ffffff] underline transition dark:text-blue-300 dark:hover:text-blue-100"
          >
            Ver documento completo →
          </Link>
        </div>
      ),
    };
  });

  // DEBUG: Loguear cardData para ver qué se va a renderizar
  // useEffect(() => {
  //   if (cardData.length > 0) {
  //     console.log("CardData a renderizar:", cardData.map(c => ({ id: c.id, title: c.title, src: c.src })));
  //   }
  // }, [cardData]);

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
          placeholder="Buscar por título, autor, descripción, tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:max-w-lg p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-base text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3282B8]"
        />
        <button
          onClick={() => setShowFilters(prev => !prev)}
          className="mt-2 md:mt-0 px-6 py-2 bg-[#3282B8] hover:bg-[#0F4C75] text-white font-medium rounded-lg transition"
        >
          {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeIn p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
          <input
            type="text"
            placeholder="Filtrar por autor..."
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-base text-gray-800 dark:text-white"
          />
          <input
            type="text"
            placeholder="Filtrar por etiqueta..."
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-base text-gray-800 dark:text-white"
          />
          <input
            type="text"
            placeholder="Filtrar por año (ej: 2023)"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-base text-gray-800 dark:text-white"
          />
          <button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      )}

      {loading && <p className="text-center text-gray-500 dark:text-gray-400">Cargando documentos...</p>}
      {error && <p className="text-center text-red-500 dark:text-red-400">{error}</p>}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {cardData.length > 0 ? (
            cardData.map((card, index) => (
              <AppleCardDocuments key={card.id || index} card={card} index={index} />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
              No se encontraron documentos con esos criterios.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchDocuments;