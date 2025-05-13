import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentSection from '../../components/CommentSection';
import DocumentViewer from '../../components/DocumentViewer';
import ejemploPDF from '../../assets/Joan_Riveros_2da_EvaluacionBackend.pdf';

function DocumentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Conectar con el backend luego
    const documento = {
        id,
        titulo: 'Acta de Independencia',
        autor: 'Asamblea de 1825',
        fecha: '06/08/1825',
        etiquetas: ['Independencia', 'Historia', 'Oficial'],
        descripcion:
        'Documento fundacional que declara la independencia de Bolivia. Firmado por los miembros de la Asamblea Deliberante reunida en Sucre.',
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="text-sm text-primary hover:underline"
            >
                ← Volver
            </button>

            <div className="bg-white dark:bg-darkSecondary shadow-md rounded-xl p-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {documento.titulo}
                </h1>

                <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <p><strong>Autor:</strong> {documento.autor}</p>
                    <p><strong>Fecha:</strong> {documento.fecha}</p>
                </div>

                <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                    {documento.descripcion}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {documento.etiquetas.map((tag, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-orange-100 dark:bg-orange-700 text-orange-800 dark:text-white text-xs rounded-full"
                        >
                        #{tag}
                            </span>
                    ))}
                </div>

                <div className="mt-6">
                    <button
                        disabled
                        className="bg-secondary text-white px-6 py-2 rounded-lg shadow hover:bg-primary transition-colors duration-300 cursor-not-allowed"
                    >
                        Descargar PDF (Próximamente)
                    </button>
                </div>
            </div>

            {/*El Visor*/}
            <DocumentViewer file={ejemploPDF} />

            <CommentSection />
        </div>
    );
}

export default DocumentDetail;
