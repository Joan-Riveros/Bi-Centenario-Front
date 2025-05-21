import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
            console.error('Error al cargar categorias', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim() || !content.trim() || !categoryId) {
            setError('Todos los campos son obligatorios');
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
        <div className="min-h-screen bg-light-gradient dark:bg-dark-gradient py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white dark:bg-darkSecondary shadow-xl rounded-xl p-8 space-y-6 text-gray-900 dark:text-white">
                <Link to="/foro">
                    <Button variant="contrast" className="mb-4 text-sm">
                        ← Volver
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold text-center text-primary dark:text-blue">
                    Crear un Nuevo Tema 📝
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-100 text-sm p-3 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block mb-2 text-sm font-medium">Título</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Ej. ¿Cuál fue el rol de Sucre en 1825?"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">Contenido</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={6}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Describe en detalle tu inquietud o tema de debate..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">Categoría</label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
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

                    <Button
                        type="submit"
                        className="w-full py-3 text-base"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creando...' : 'Crear Tema'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default CrearTema;
