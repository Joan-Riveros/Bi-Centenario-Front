import React, { useState } from 'react';

const mockUsers = [
    { id: 1, name: 'Carlos Rojas', email: 'carlos@correo.com', role: 'Investigador', status: 'Activo' },
    { id: 2, name: 'Ana López', email: 'ana@correo.com', role: 'Visitante', status: 'Inactivo' },
    { id: 3, name: 'Administrador General', email: 'admin@admin.com', role: 'Admin', status: 'Activo' },
];

function AdminUsers() {
    const [users] = useState(mockUsers);

    return (
        <div className="min-h-screen bg-paleYellow p-10">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-primary mb-6">Administración de Usuarios</h1>

                <div className="flex justify-end mb-4">
                    <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors">
                        + Nuevo Usuario
                    </button>
                </div>

                <div className="overflow-x-auto bg-lightBrown rounded-lg shadow-md">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Nombre</th>
                                <th className="px-6 py-3">Correo</th>
                                <th className="px-6 py-3">Rol</th>
                                <th className="px-6 py-3">Estado</th>
                                <th className="px-6 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b border-white/20 hover:bg-white/30">
                                    <td className="px-6 py-4">{user.id}</td>
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.role}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            user.status === 'Activo' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                                        }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button className="text-sm bg-secondary text-white px-3 py-1 rounded hover:opacity-90 transition">
                                            Editar
                                        </button>
                                        <button className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminUsers;
