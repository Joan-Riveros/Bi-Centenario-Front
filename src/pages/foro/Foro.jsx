import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function Foro() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory !== null) {
            fetchTopics(selectedCategory);
        }
    }, [selectedCategory]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('/forum/categories');
            setCategories(res.data);
            if (res.data.length > 0) {
                setSelectedCategory(res.data[0].id);
            }
        } catch (err) {
            console.error('Error al cargar categorías del foro', err);
        }
    };

    const fetchTopics = async (categoryId) => {
        setLoading(true);
        try {
            const res = await axios.get(`/forum/topics?category_id=${categoryId}&limit=10&offset=0`);
            setTopics(res.data);
        } catch (err) {
            console.error('Error al cargar temas del foro', err);
        } finally {
            setLoading(false);
        }
    };

    const { user } = useAuth();

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8 min-h-screen bg-white dark:bg-darkBase text-gray-900 dark:text-white">
            <h1 className="text-3xl font-bold text-center">Foro Bicentenario 🇧🇴</h1>
            {user && (
                <div className="flex justify-end mb-4">
                    <Link
                        to="/foro/nuevo"
                        className="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg"
                    >
                        ➕ Crear nuevo tema
                    </Link>
                </div>
            )}


            <div className="flex justify-center mt-4">
                <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
                    className="px-4 py-2 border rounded-md dark:bg-darkSecondary dark:text-white"
                >
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {loading ? (
                    <p className="text-center col-span-2">Cargando temas...</p>
                ) : topics.length === 0 ? (
                    <p className="text-center col-span-2">No hay temas en esta categoría.</p>
                ) : (
                    topics.map(topic => (
                        <div
                            key={topic.id}
                            className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-darkSecondary hover:shadow-md transition-all"
                        >
                            <h2 className="text-xl font-semibold text-primary dark:text-darkAccent mb-2">
                                {topic.title}
                            </h2>
                            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                                {topic.content}
                            </p>
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                Publicado el {new Date(topic.created_at).toLocaleDateString()}
                            </p>
                            <Link
                                to={`/foro/${topic.id}`}
                                className="inline-block mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Ver discusión →
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Foro;
