import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ForoDetalle() {
    const { id } = useParams();
    const [tema, setTema] = useState(null);
    const [respuestas, setRespuestas] = useState([]);
    const [nuevaRespuesta, setNuevaRespuesta] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchRespuestas = async () => {
        try {
            const res = await axios.get(`/forum/posts?topic_id=${id}`);
            setRespuestas(res.data);
        } catch (err) {
            console.error("Error al obtener respuestas", err);
        }
    };

    useEffect(() => {
        const fetchTemaYRespuestas = async () => {
            try {
                const resTema = await axios.get(`/forum/topics/${id}`);
                setTema(resTema.data);
                await fetchRespuestas();
            } catch (err) {
                console.error("Error al cargar el tema", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTemaYRespuestas();
    }, [id]);

    const handleResponder = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/forum/posts/', {
                topic_id: id,
                content: nuevaRespuesta
            });
            setNuevaRespuesta('');
            await fetchRespuestas();
        } catch (err) {
            console.error("Error al enviar respuesta", err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            {loading ? (
                <p className="text-gray-600 dark:text-gray-400">Cargando discusión...</p>
            ) : (
                <>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{tema?.title}</h1>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{tema?.content}</p>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Respuestas</h2>
                        {respuestas.length === 0 ? (
                            <p className="text-gray-600 dark:text-gray-400">Aún no hay respuestas.</p>
                        ) : (
                            respuestas.map((r) => (
                                <div key={r.id} className="bg-white dark:bg-darkSecondary p-4 rounded-md border border-gray-200 dark:border-gray-600">
                                    <p className="text-sm text-gray-700 dark:text-gray-200">{r.content}</p>
                                </div>
                            ))
                        )}
                    </div>

                    <form onSubmit={handleResponder} className="mt-8 space-y-4">
                        <textarea
                            value={nuevaRespuesta}
                            onChange={(e) => setNuevaRespuesta(e.target.value)}
                            placeholder="Escribe tu respuesta..."
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-darkSecondary text-gray-800 dark:text-white"
                        />
                        <button
                            type="submit"
                            className="bg-primary hover:bg-secondary text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
                        >
                            Publicar respuesta
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

export default ForoDetalle;
