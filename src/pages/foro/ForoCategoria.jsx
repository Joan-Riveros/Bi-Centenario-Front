import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ForoCategoria() {
    const { categoryId } = useParams();
    const [temas, setTemas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemas = async () => {
            try {
                const response = await axios.get(`/forum/topics?category_id=${categoryId}`);
                setTemas(response.data);
            } catch (err) {
                console.error("Error al cargar temas por categoría", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTemas();
    }, [categoryId]);

    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Temas de la categoría #{categoryId}
            </h1>

            {loading ? (
                <p className="text-gray-600 dark:text-gray-400">Cargando temas...</p>
            ) : temas.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No hay temas en esta categoría.</p>
            ) : (
                <ul className="space-y-4">
                    {temas.map((tema) => (
                        <li key={tema.id} className="bg-white dark:bg-darkSecondary p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{tema.title}</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{tema.content.slice(0, 100)}...</p>
                            <Link
                                to={`/foro/${tema.id}`}
                                className="text-sm text-primary hover:underline font-medium"
                            >
                                Ver discusión →
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ForoCategoria;
