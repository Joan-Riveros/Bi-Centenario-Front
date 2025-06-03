import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// Asumiendo que CommentSection está en el mismo directorio o ajusta la ruta
import CommentSection from './CommentSection'; 
import DocumentViewer from './DocumentViewer'; // Asegúrate que la ruta es correcta
import { getDocumentById } from '../../services/documentServiceGet'; // Asegúrate que la ruta es correcta
import Button from '../../components/Button'; // Asegúrate que la ruta es correcta

function DocumentDetail() {
  const { id } = useParams(); // Obtiene el 'id' de la URL (suele ser string)
  const [documento, setDocumento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      setError(null);
      try {
        // El 'id' de useParams es string, getDocumentById podría necesitar un número.
        // Sin embargo, tu servicio apiClient.get(`/documents/${id}`) probablemente lo maneje bien.
        // Si tuvieras problemas, convierte 'id' a número: const numericId = Number(id);
        const data = await getDocumentById(id); 
        setDocumento(data);
      } catch (err) {
        if (import.meta.env.DEV) console.error('Error fetching document:', err);
        if (err.response && err.response.status === 404) {
          setError("Documento no encontrado.");
        } else if (err.response && err.response.status === 403) {
          setError("No tienes permiso para ver este documento.");
        } else {
          setError("No se pudo cargar el documento. Intenta de nuevo más tarde.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDocument();
    }
  }, [id]); 

  if (loading) return <p className="text-center mt-10 text-gray-600 dark:text-gray-300">Cargando documento...</p>;
  if (error) return <p className="text-center text-red-500 dark:text-red-400 mt-10">{error}</p>;
  // Si !documento después de cargar y sin error, es un caso raro, pero bueno tener un fallback.
  if (!documento) return (
    <p className="text-center mt-10 text-gray-500 dark:text-gray-400">
      No hay información del documento para mostrar.
    </p>
  );

  const coverImageUrl = documento.cover_image_path
    ? `${import.meta.env.VITE_API_BASE_URL}/documents/${documento.id}/cover/download`
    : '/default-cover.jpg'; 

  const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}/documents/${documento.id}/download`;
  const previewUrl = `${import.meta.env.VITE_API_BASE_URL}/documents/${documento.id}/preview`;

  return (
    <div className="min-h-screen bg-light-gradient dark:bg-dark-gradient bg-full animate-gradient transition-all">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6"> {/* Ajustado padding para móviles */}
        <Link to="/search"> {/* Asumiendo que tu página de búsqueda está en /search */}
          <Button variant="neutral" className="mb-6 sm:mb-8 text-sm">
            ← Volver a la búsqueda
          </Button>
        </Link>

        <article className="bg-white dark:bg-darkSecondary shadow-xl rounded-xl p-4 sm:p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* 📷 Imagen de Portada */}
            <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center md:justify-start">
              <img
                src={coverImageUrl}
                alt={`Portada de ${documento.title}`}
                className="w-full max-w-[200px] md:max-w-full h-auto rounded-lg shadow-md object-cover aspect-[3/4]" // Ratio de aspecto para consistencia
                onError={(e) => { e.target.onerror = null; e.target.src="/default-cover.jpg"; }} 
              />
            </div>

            {/* 📄 Información Textual del Documento */}
            <div className="flex-1 space-y-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white break-words">
                {documento.title}
              </h1>

              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <p><strong>Autor:</strong> {documento.author || 'Desconocido'}</p>
                <p><strong>Fecha de subida:</strong>
                  {documento.upload_date
                    ? new Date(documento.upload_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
                    : 'Desconocida'}
                </p>
                {/* Puedes añadir más detalles aquí si los tienes en 'documento' */}
                {/* Ejemplo:
                {documento.publisher && <p><strong>Editorial:</strong> {documento.publisher}</p>}
                {documento.categories && documento.categories.length > 0 && (
                  <p><strong>Categorías:</strong> {documento.categories.map(cat => cat.name).join(', ')}</p>
                )}
                */}
              </div>

              {documento.short_description && (
                <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                  {documento.short_description}
                </p>
              )}

              {documento.tags && documento.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <strong className="text-sm text-gray-600 dark:text-gray-300">Etiquetas:</strong>
                  {documento.tags.map((tag) => ( // Asumiendo que tag es un objeto {id, name}
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-orange-100 dark:bg-orange-700 text-orange-800 dark:text-orange-100 text-xs rounded-full"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-2"> {/* Espacio antes del botón de descarga */}
                <a
                  href={downloadUrl}
                  className="bg-secondary hover:bg-primary text-white font-medium px-6 py-2.5 rounded-lg shadow-md transition-colors duration-300 inline-block text-sm"
                  download
                >
                  Descargar PDF
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Visor de Documentos PDF (si hay archivo) */}
        {documento.file_path && (
          <section className="bg-white dark:bg-darkSecondary shadow-xl rounded-xl p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Vista Previa del Documento</h2>
            <DocumentViewer file={previewUrl} title={documento.title} />
          </section>
        )}
        
        {/* Sección de Comentarios */}
        {documento.id && ( // Asegurarse que documento.id existe antes de renderizar
          <section className="bg-white dark:bg-darkSecondary shadow-xl rounded-xl p-4 sm:p-6">
            <CommentSection documentId={Number(documento.id)} />
          </section>
        )}
      </div>
    </div>
  );
}

export default DocumentDetail;