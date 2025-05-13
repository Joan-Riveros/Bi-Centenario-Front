import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

function DocumentViewer({ file }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    const goPrevious = () => setPageNumber((prev) => Math.max(1, prev - 2));
    const goNext = () => setPageNumber((prev) => Math.min(numPages - 1, prev + 2));

    return (
        <div className="mt-10 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Vista tipo libro 📘
            </h2>

            <div className="border border-gray-300 dark:border-gray-600 p-4 bg-white dark:bg-darkSecondary rounded-lg shadow-lg overflow-x-auto">
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading="Cargando documento..."
                    className="flex justify-center"
                >
                    <div className="flex flex-row gap-4 justify-center items-start snap-x overflow-x-auto">
                        <Page pageNumber={pageNumber} width={400} className="min-w-[400px]" />
                        {pageNumber + 1 <= numPages && (
                            <Page pageNumber={pageNumber + 1} width={400} className="min-w-[400px]" />
                        )}
                    </div>
                </Document>

                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={goPrevious}
                        disabled={pageNumber <= 1}
                        className="px-4 py-2 bg-secondary hover:bg-primary text-white rounded disabled:opacity-50 transition-all"
                    >
                        ⬅ Página anterior
                    </button>

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Páginas {pageNumber}
                        {pageNumber + 1 <= numPages && ` - ${pageNumber + 1}`} de {numPages}
                    </p>

                    <button
                        onClick={goNext}
                        disabled={pageNumber + 1 > numPages}
                        className="px-4 py-2 bg-secondary hover:bg-primary text-white rounded disabled:opacity-50 transition-all"
                    >
                        Página siguiente ➡
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DocumentViewer;
