import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function DocumentViewer({ file }) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: () => [],
    });

    return (
        <div className="mt-12 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
                Vista del Documento 📖
            </h2>

            <div className="h-[80vh] rounded-lg border border-gray-300 dark:border-gray-600 shadow-lg overflow-hidden bg-white dark:bg-darkSecondary">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer
                        fileUrl={file}
                        plugins={[defaultLayoutPluginInstance]}
                    />
                </Worker>
            </div>
        </div>
    );
}

export default DocumentViewer;