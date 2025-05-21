import React, { useState, useEffect } from 'react';
import Button from '../Button';

const ROLES = [
    { value: 'administrador', label: 'Administrador' },
    { value: 'investigador', label: 'Investigador' },
    { value: 'visitante', label: 'Visitante' },
];

function UserForm({ initialData, onSubmit, onCancel, isLoading, isEditMode = false }) {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        role: 'visitante',
        is_active: true,
    });
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (isEditMode && initialData) {
        setFormData({
            nombre: initialData.nombre || '',
            email: initialData.email || '',
            password: '', 
            role: initialData.role || 'visitante',
            is_active: initialData.is_active !== undefined ? initialData.is_active : true,
        });
        } else if (!isEditMode) { 
            setFormData({
                nombre: initialData?.nombre || '',
                email: initialData?.email || '',
                password: initialData?.password || '', 
                role: initialData?.role || 'visitante',
                is_active: initialData?.is_active !== undefined ? initialData.is_active : true,
            });
        }
    }, [initialData, isEditMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError('');
        if (!formData.nombre.trim() || !formData.email.trim() || (!isEditMode && !formData.password) || !formData.role) {
            setFormError("Por favor, completa todos los campos requeridos (Nombre, Email, Rol y Contraseña para nuevos usuarios)");
            return;
        }
        if (!isEditMode && formData.password.length < 8) {
            setFormError("La contraseña para nuevos usuarios debe tener al menos 8 caracteres");
            return;
        }
        
        const dataToSubmit = {
            nombre: formData.nombre.trim(),
            email: formData.email.trim(),
            role: formData.role,
            is_active: formData.is_active,
        };

        if (!isEditMode) {
        if (formData.password) {
            dataToSubmit.password = formData.password;
        } else {

            // Ser extra defensivos o si la validacion cambiara:
            // setFormError("La contraseña es requerida para nuevos usuarios.");
            // return;
        }
        }

        
        onSubmit(dataToSubmit);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
        {formError && <p className="text-red-500 text-sm p-2 bg-red-100 dark:bg-red-800 dark:text-red-200 rounded">{formError}</p>}
        
        <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre Completo</label>
            <input
                type="text"
                name="nombre"
                id="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
                disabled={isLoading}
            />
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label>
            <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
                disabled={isLoading}
            />
        </div>
        {!isEditMode && (
            <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña</label>
            <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Mínimo 8 caracteres"
                required={!isEditMode} 
                disabled={isLoading}
            />
            </div>
        )}
        <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rol</label>
            <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
                disabled={isLoading}
            >
            {ROLES.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
            ))}
            </select>
        </div>
        <div className="flex items-center">
            <input
                type="checkbox"
                name="is_active"
                id="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                disabled={isLoading}
            />
            <label htmlFor="is_active" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Usuario Activo</label>
        </div>
        <div className="flex justify-end space-x-3 pt-2">
            <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
                Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? (isEditMode ? 'Guardando...' : 'Creando...') : (isEditMode ? 'Guardar Cambios' : 'Crear Usuario')}
            </Button>
        </div>
        </form>
    );
}

export default UserForm;