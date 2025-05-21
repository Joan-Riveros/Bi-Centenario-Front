import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import CommentSection from './CommentSection';
import DocumentViewer from './DocumentViewer';
import { getDocumentById } from '../../services/documentServiceGet';
import Button from '../../components/Button';

function DocumentDetail() {
    const { id } = useParams();
    const [documento, setDocumento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const data = await getDocumentById(id);
                setDocumento(data);
            } catch (err) {
                if (import.meta.env.DEV) console.error(err);
                setError("No se pudo cargar el documento.");
            } finally {
                setLoading(false);
            }
        };

        fetchDocument();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Cargando documento...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
    if (!documento) return null;

    return (
        <div className="min-h-screen bg-light-gradient dark:bg-dark-gradient bg-full animate-gradient transition-all">
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                <Link to="/search">
                    <Button variant="neutral" className="mb-8 text-sm">
                        ← Volver
                    </Button>
                </Link>

                <div className="bg-white dark:bg-darkSecondary shadow-md rounded-xl p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* 📷 Imagen */}
                        <div className="flex-shrink-0">
                            <img
                                src={
                                    documento.cover_image_path
                                        ? `${import.meta.env.VITE_API_BASE_URL}/documents/${documento.id}/cover/download`
                                        : '/default-cover.jpg' // <-- Imagen por defecto si no tiene portada
                                }
                                alt={`Portada de ${documento.title}`}
                                className="w-full max-w-[200px] h-auto rounded-lg shadow-md object-cover"
                            />
                        </div>

                        {/* 📄 Info textual */}
                        <div className="flex-1 space-y-4">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                                {documento.title}
                            </h1>

                            <div className="text-sm text-gray-600 dark:text-gray-300">
                                <p><strong>Autor:</strong> {documento.author || 'Desconocido'}</p>
                                <p><strong>Fecha de subida:</strong> {new Date(documento.upload_date).toLocaleDateString()}</p>
                            </div>

                            <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                                {documento.short_description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {documento.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-orange-100 dark:bg-orange-700 text-orange-800 dark:text-white text-xs rounded-full"
                                    >
                                        #{tag.name}
                                    </span>
                                ))}
                            </div>

                            <div>
                                <a
                                    href={`${import.meta.env.VITE_API_BASE_URL}/documents/${documento.id}/download`}
                                    className="bg-secondary hover:bg-primary text-white px-6 py-2 rounded-lg shadow transition-colors duration-300 inline-block"
                                    download
                                >
                                    Descargar PDF
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <DocumentViewer file={`${import.meta.env.VITE_API_BASE_URL}/documents/${documento.id}/preview`} />

                <CommentSection />
            </div>
        </div>
    );
}

export default DocumentDetail;
