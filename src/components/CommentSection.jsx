import React, { useState } from 'react';

const mockComentarios = [
    {
        id: 1,
        autor: "Juan Pérez",
        fecha: "2025-04-20",
        texto: "Este documento es fundamental para entender la independencia.",
    },
    {
        id: 2,
        autor: "María López",
        fecha: "2025-04-22",
        texto: "Gracias por digitalizar este material histórico. Muy valioso.",
    },
];

function getInitials(name) {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
}

function CommentSection() {
    const [comentario, setComentario] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Comentario enviado (simulado)");
        setComentario("");
    };

    return (
        <div className="mt-10 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Comentarios</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                    rows="3"
                    placeholder="Escribe tu comentario..."
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    required
                ></textarea>
                <button
                    type="submit"
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded transition"
                >
                    Enviar comentario
                </button>
            </form>

            <div className="space-y-4">
                {mockComentarios.map((com) => (
                <div
                    key={com.id}
                    className="bg-white dark:bg-darkSecondary border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-sm"
                >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-200 dark:bg-orange-700 text-white font-bold text-sm">
                        {getInitials(com.autor)}
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-800 dark:text-white">{com.autor}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{com.fecha}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{com.texto}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSection;
