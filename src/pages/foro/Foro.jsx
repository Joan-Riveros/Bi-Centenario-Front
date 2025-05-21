import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getForumCategories, getTopicsByCategory } from '../../services/forumService';
import CategoriaList from '../../components/forum/CategoriaList'
import TopicList from '../../components/forum/TopicList'

function Foro() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

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
            const res = await getForumCategories();
            setCategories(res);
            if (res.length > 0) {
                setSelectedCategory(res[0].id);
            }
        } catch (err) {
            console.error('Error al cargar categorías del foro', err);
        }
    };

    const fetchTopics = async (categoryId) => {
        setLoading(true);
        try {
            const res = await getTopicsByCategory(categoryId, 10, 0);
            setTopics(res);
        } catch (err) {
            console.error('Error al cargar temas del foro', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8 min-h-screen bg-white dark:bg-darkBase text-gray-900 dark:text-white">
            <h1 className="text-3xl font-bold text-center text-[#0F4C75] dark:text-[#BBE1FA]">Foro Bicentenario 🇧🇴</h1>

            {user && (
                <div className="flex justify-end mb-4 space-x-4">
                    <Link
                        to="/foro/nuevo"
                        className="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg"
                    >
                        ➕ Crear nuevo tema
                    </Link>

                    {user.role?.toLowerCase() === 'administrador' && (
                        <Link
                            to="/foro/categorias/nueva"
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg"
                        >
                            📂 Crear categoría
                        </Link>
                    )}
                </div>
            )}

            <CategoriaList
                categories={categories}
                selectedCategoryId={selectedCategory}
                onSelect={setSelectedCategory}
            />

            <TopicList topics={topics} loading={loading} />
        </div>
    );
}

export default Foro;