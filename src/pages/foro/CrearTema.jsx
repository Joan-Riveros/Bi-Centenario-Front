import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import { getForumCategories, createTopic } from '../../services/forumService';

function CrearTema() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await getForumCategories();
            setCategories(res);
        } catch (err) {
            console.error('Error al cargar categorías', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim() || !content.trim() || !categoryId) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        setIsLoading(true);

        try {
            await createTopic({
                title,
                content,
                category_id: parseInt(categoryId),
            });
            navigate('/foro'); 
        } catch (err) {
            console.error('Error al crear el tema', err);
            setError('Hubo un error al crear el tema.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="text-center mt-10 text-gray-700 dark:text-gray-200">
                Debes iniciar sesión para crear un nuevo tema.
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6 text-gray-900 dark:text-white">
            <h1 className="text-2xl font-bold">Crear nuevo tema 🧵</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div>
                    <label className="block mb-1 font-medium">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 dark:bg-darkSecondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Contenido</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={6}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 dark:bg-darkSecondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Categoría</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 dark:bg-darkSecondary dark:text-white"
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <Button type="submit" className="w-full py-3" disabled={isLoading}>
                    {isLoading ? 'Creando...' : 'Crear Tema'}
                </Button>
            </form>
        </div>
    );
}

export default CrearTema;
