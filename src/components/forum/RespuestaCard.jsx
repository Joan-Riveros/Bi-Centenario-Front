import React from 'react';

function RespuestaCard({ respuesta }) {
    const autor = respuesta.author?.nombre || respuesta.author?.email || "Anónimo";
    const fecha = new Date(respuesta.created_at).toLocaleDateString();

    return (
        <div className="bg-white dark:bg-darkSecondary border border-gray-200 dark:border-gray-700 rounded-lg px-5 py-4 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary dark:text-accent">{autor}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{fecha}</span>
            </div>

            <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {respuesta.content}
            </p>
        </div>
    );
}

export default RespuestaCard;
