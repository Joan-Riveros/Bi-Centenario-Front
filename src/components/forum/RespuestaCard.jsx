import React from 'react';

function RespuestaCard({ respuesta }) {
    return (
        <div className="bg-white dark:bg-darkSecondary p-4 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm transition-all">
            <p className="text-sm text-gray-700 dark:text-gray-200">{respuesta.content}</p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Publicado el {new Date(respuesta.created_at).toLocaleDateString()}
            </p>
        </div>
    );
}

export default RespuestaCard;
