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
        <div className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Vista tipo lector 🧾
            </h2>

            <div className="h-[80vh] border border-gray-300 dark:border-gray-700 rounded-lg shadow bg-white dark:bg-darkSecondary">
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
