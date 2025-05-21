import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createCategory } from '../../services/forumService';
import Button from '../../components/Button';

function CrearCategoria() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
        setError('El nombre es obligatorio');
        return;
        }
        setIsLoading(true);
        try {
            await createCategory({ name, description });
            navigate('/foro'); // Redirige al listado principal
        } catch (err) {
            console.error("Error al crear categoría", err);
            setError('Hubo un error al crear la categoría');
        }
    };

    return (
        <div className="min-h-screen bg-light-gradient dark:bg-dark-gradient py-10 px-4">
            <div className="max-w-xl mx-auto bg-white dark:bg-darkSecondary shadow-xl rounded-xl p-8 space-y-6 text-gray-900 dark:text-white">
                <Link to="/foro">
                    <Button variant="contrast" className="mb-4 text-sm">
                        ← Volver
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold text-center text-primary dark:text-blue">
                    Crear Nueva Categoría 📂
                </h1>

                {error && (
                    <div className="bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-100 text-sm p-3 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium">Nombre de la Categoría</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Ej: Historia Colonial"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">Descripción (opcional)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Describe brevemente el propósito o contenido de esta categoría"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-3 text-base"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creando...' : 'Crear Categoria'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default CrearCategoria;