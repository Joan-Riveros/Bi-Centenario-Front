import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../services/forumService';

function CrearCategoria() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
        setError('El nombre es obligatorio');
        return;
        }

        try {
            await createCategory({ name, description });
            navigate('/foro'); // Redirige al listado principal
        } catch (err) {
            console.error("Error al crear categoría", err);
            setError('Hubo un error al crear la categoría');
        }
    };

    return (
        <div className="max-w-xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Crear nueva categoría 📂</h1>

            {error && <p className="text-red-500 mb-3">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 dark:bg-darkSecondary dark:text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 dark:bg-darkSecondary dark:text-white"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
                >
                    Crear Categoría
                </button>
            </form>
        </div>
    );
}

export default CrearCategoria;