import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    getTopicById,
    getPostsByTopic,
    createPost
} from '../../services/forumService';
import RespuestaCard from '../../components/forum/RespuestaCard';
import Button from '../../components/Button';

function ForoDetalle() {
    const { id } = useParams();
    const [tema, setTema] = useState(null);
    const [respuestas, setRespuestas] = useState([]);
    const [nuevaRespuesta, setNuevaRespuesta] = useState('');
    const [loading, setLoading] = useState(true);
    const lastRespuestaRef = useRef(null);
    const [page, setPage] = useState(0);
    const ITEMS_PER_PAGE = 20;

    const fetchRespuestas = async (pageIndex = 0) => {
        try {
            const data = await getPostsByTopic(parseInt(id), pageIndex * ITEMS_PER_PAGE, ITEMS_PER_PAGE);
            setRespuestas(data);

            setTimeout(() => {
                if (lastRespuestaRef.current) {
                    lastRespuestaRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } catch (err) {
            console.error("Error al obtener respuestas", err);
        }
    };

    useEffect(() => {
        const fetchTemaYRespuestas = async () => {
            try {
                const data = await getTopicById(id);
                setTema(data);
                await fetchRespuestas();
            } catch (err) {
                console.error("Error al cargar el tema", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTemaYRespuestas();
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchRespuestas(page);
        }
    }, [page]);

    const handleResponder = async (e) => {
        e.preventDefault();
        if (!nuevaRespuesta.trim()) return;

        try {
            await createPost({
                topic_id: parseInt(id),
                content: nuevaRespuesta,
            });

            setNuevaRespuesta('');
            await fetchRespuestas(page);
        } catch (err) {
            console.error("Error al enviar respuesta", err);
        }
    };

    return (
        <div className="min-h-screen bg-light-gradient dark:bg-dark-gradient bg-full animate-gradient transition-all">
            <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800 dark:text-white">
                {loading ? (
                    <p className="text-center text-gray-600 dark:text-gray-400">Cargando discusión...</p>
                ) : (
                    <>
                        <Link to="/foro">
                            <Button variant="neutral" className="mb-8 text-sm">
                                ← Volver al Foro
                            </Button>
                        </Link>
                        {/* Tema principal */}
                        <div className="bg-white dark:bg-darkSecondary border border-gray-200 dark:border-gray-600 rounded-lg shadow-md p-6 mb-6">
                            <h1 className="text-3xl font-bold mb-3 leading-snug">{tema?.title}</h1>
                            <p className="text-gray-700 dark:text-gray-300 text-base">{tema?.content}</p>
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                Publicado el {new Date(tema?.created_at).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Respuestas */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold mb-3">Respuestas</h2>
                            {respuestas.length === 0 ? (
                                <p className="text-gray-600 dark:text-gray-400">Aún no hay respuestas.</p>
                            ) : (
                                respuestas.map((r, idx) => (
                                    <div key={r.id} ref={idx === respuestas.length - 1 ? lastRespuestaRef : null}>
                                        <RespuestaCard respuesta={r} />
                                    </div>
                                ))
                            )}
                        </div>

                        <form onSubmit={handleResponder} className="mt-8 space-y-4">
                            {/* Toolbar de edición */}
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                {[
                                    "Estoy de acuerdo 👍",
                                    "Me pareció increíble 🤯",
                                    "Gracias por compartir 📄",
                                    "Es un documento muy interesante 📚",
                                    "¿Alguien más opina igual? 🤔"
                                ].map((frase, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setNuevaRespuesta((prev) => `${prev}${prev && !prev.endsWith(' ') ? ' ' : ''}${frase} `)}
                                        className="text-xs sm:text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                    >
                                        {frase}
                                    </button>
                                ))}
                            </div>

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

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                                disabled={page === 0}
                                className="text-sm px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                ← Anterior
                            </button>
                            <button
                                onClick={() => setPage(prev => prev + 1)}
                                className="text-sm px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                Siguiente →
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>        
    );
}

export default ForoDetalle;