import React, { useState } from 'react';

const UploadDocument = () => {
    const [form, setForm] = useState({
        titulo: '',
        autor: '',
        fecha: '',
        tipoArchivo: '',
        archivo: null,
        etiquetas: [],
        etiquetaInput: '',
        restringido: false,
        rolesPermitidos: [],
    });

    const [previewUrl, setPreviewUrl] = useState(null);
    const roles = ['Administrador', 'Investigador', 'Visitante'];

    const tiposPermitidos = ['application/pdf', 'image/jpeg', 'image/png', 'image/tiff'];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && tiposPermitidos.includes(file.type)) {
            setForm((prev) => ({ ...prev, archivo: file }));
            if (file.type.startsWith('image')) {
                const reader = new FileReader();
                reader.onload = (event) => setPreviewUrl(event.target.result);
                reader.readAsDataURL(file);
            } else {
                setPreviewUrl(null);
            }
        } else {
            alert('Tipo de archivo no permitido.');
        }
    };

    const handleAddEtiqueta = (e) => {
        e.preventDefault();
        const etiqueta = form.etiquetaInput.trim();
        if (etiqueta && !form.etiquetas.includes(etiqueta)) {
            setForm((prev) => ({
                ...prev,
                etiquetas: [...prev.etiquetas, etiqueta],
                etiquetaInput: '',
            }));
        }
    };

    const handleRemoveEtiqueta = (etiqueta) => {
        setForm((prev) => ({
            ...prev,
            etiquetas: prev.etiquetas.filter((tag) => tag !== etiqueta),
        }));
    };

    const toggleRol = (rol) => {
        setForm((prev) => {
            const roles = prev.rolesPermitidos.includes(rol)
                ? prev.rolesPermitidos.filter((r) => r !== rol)
                : [...prev.rolesPermitidos, rol];
            return { ...prev, rolesPermitidos: roles };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.titulo || form.titulo.length < 3) return alert('Título inválido');
        if (!form.autor || form.autor.length < 3) return alert('Autor inválido');
        if (!form.fecha) return alert('Fecha requerida');
        if (!form.tipoArchivo) return alert('Tipo de archivo requerido');
        if (!form.archivo) return alert('Archivo requerido');
        if (form.restringido && form.rolesPermitidos.length === 0) {
            return alert('Selecciona al menos un rol autorizado');
        }

        console.log('Documento enviado (mock):', form);
        alert('Documento registrado (simulado)');
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Subida de Documento Histórico
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                    <input
                        name="titulo"
                        value={form.titulo}
                        onChange={handleInputChange}
                        placeholder="Título del documento"
                        className="p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        required
                    />
                    <input
                        name="autor"
                        value={form.autor}
                        onChange={handleInputChange}
                        placeholder="Autor"
                        className="p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        required
                    />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <input
                        type="date"
                        name="fecha"
                        value={form.fecha}
                        onChange={handleInputChange}
                        className="p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        required
                    />
                    <select
                        name="tipoArchivo"
                        value={form.tipoArchivo}
                        onChange={handleInputChange}
                        className="p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        required
                    >
                        <option value="">Tipo de archivo</option>
                        <option value="pdf">PDF</option>
                        <option value="jpg">JPG</option>
                        <option value="png">PNG</option>
                        <option value="tiff">TIFF</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium dark:text-gray-300">Archivo</label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.tiff"
                        onChange={handleFileChange}
                        className="block w-full text-sm border border-gray-300 dark:border-gray-600 rounded file:bg-secondary file:text-white file:border-none file:px-4 file:py-2 file:cursor-pointer file:mr-4"
                    />
                    {previewUrl && (
                        <img src={previewUrl} alt="preview" className="mt-4 rounded shadow-md max-h-64" />
                    )}
                    {form.archivo && !previewUrl && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">📄 {form.archivo.name}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium dark:text-gray-300">Etiquetas</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={form.etiquetaInput}
                            onChange={(e) => setForm((prev) => ({ ...prev, etiquetaInput: e.target.value }))}
                            placeholder="Agregar etiqueta..."
                            className="p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                        <button
                            onClick={handleAddEtiqueta}
                            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded transition"
                        >
                            Añadir
                        </button>
                    </div>
                    <div className="flex flex-wrap mt-2 gap-2">
                        {form.etiquetas.map((tag, i) => (
                        <span
                            key={i}
                            className="bg-orange-100 dark:bg-orange-700 text-orange-900 dark:text-white text-xs px-3 py-1 rounded-full flex items-center gap-2"
                        >
                            #{tag}
                            <button
                                type="button"
                                onClick={() => handleRemoveEtiqueta(tag)}
                                className="text-red-600 font-bold"
                            >
                                ×
                            </button>
                        </span>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="flex items-center space-x-2 text-sm font-medium dark:text-gray-300">
                        <input
                            type="checkbox"
                            name="restringido"
                            checked={form.restringido}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                        />
                        <span>Restringir acceso a ciertos roles</span>
                    </label>

                    {form.restringido && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {roles.map((rol) => (
                                <label key={rol} className="flex items-center space-x-2 text-sm dark:text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={form.rolesPermitidos.includes(rol)}
                                        onChange={() => toggleRol(rol)}
                                        className="w-4 h-4"
                                    />
                                    <span>{rol}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-secondary hover:bg-primary text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                    Registrar documento
                </button>
            </form>
        </div>
    );
};

export default UploadDocument;
