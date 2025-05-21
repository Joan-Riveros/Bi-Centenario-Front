import React, { useState, useEffect, useCallback } from 'react';
import { adminService } from '../../services/adminService';
import Modal from '../../components/ui/Modal';
import UserForm from '../../components/admin/UserForm';
import Pagination from '../../components/ui/Pagination';
import Button from '../../components/Button';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const ITEMS_PER_PAGE = 10;

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); 


    const [currentPage, setCurrentPage] = useState(0); 
    const [hasMoreNextPage, setHasMoreNextPage] = useState(false);

    const fetchUsers = useCallback(async (page) => {
        setIsLoading(true);
        setError('');
        try {
            const skip = page * ITEMS_PER_PAGE;
            const limit = ITEMS_PER_PAGE;
            const fetchedUsers = await adminService.getUsers(skip, limit);
            setUsers(fetchedUsers);
            setHasMoreNextPage(fetchedUsers.length === ITEMS_PER_PAGE);
        } catch (err) {
            setError(err.detail || err.message || "Error al cargar usuarios");
            setUsers([]); 
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage, fetchUsers]);

    const handleOpenCreateModal = () => {
        setSelectedUser(null); 
        setIsCreateModalOpen(true);
    };

    const handleOpenEditModal = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleOpenDeleteModal = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
        setError(''); 
    };

    const handleCreateUser = async (userDataFromForm) => {
        setError('');
        setIsLoading(true);
        try {
            await adminService.createUser(userDataFromForm);
            handleCloseModals();
            fetchUsers(0); 
            setCurrentPage(0); 
        } catch (err) {
            console.error("Error al crear el usuario:", err);
            setError(formatErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateUser = async (userDataFromForm) => {
        if (!selectedUser) return;
            setError('');
            setIsLoading(true);
        try {
            await adminService.updateUser(selectedUser.id, userDataFromForm);
            handleCloseModals();
            fetchUsers(currentPage); 
        } catch (err) {
            console.error("Error al actualizar el usuario:", err);
            setError(formatErrorMessage(err)); 
        } finally {
            setIsLoading(false); 
        }
    };

    const handleDeleteUser = async () => {
        if (!selectedUser) return;
        setIsLoading(true);
        try {
            await adminService.deleteUser(selectedUser.id);
            handleCloseModals();
            if (users.length === 1 && currentPage > 0) {
                setCurrentPage(prev => prev - 1);
            } else {
                fetchUsers(currentPage);
            }
        } catch (err) {
            setError(err.detail || err.message || "Error al eliminar el usuario");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const formatErrorMessage = (err) => {
    if (err && err.detail) {
        if (Array.isArray(err.detail)) {
            return err.detail.map(d => {
                const field = d.loc && d.loc.length > 1 ? d.loc[1] : 'Campo desconocido';
                return `${field}: ${d.msg}`;
            }).join('; ');
        }
        return err.detail; 
    }
    if (err && err.message) {
        return err.message;
    }
    return "Ocurrio un error desconocido";
    };

    return (
        <div className="min-h-screen bg-light-gradient dark:bg-dark-gradient py-12 px-4 sm:px-6 lg:px-8"> 
            <div className="max-w-7xl mx-auto bg-white dark:bg-[#1e2a38] rounded-xl shadow-xl p-6 space-y-8 text-gray-900 dark:text-white transition-all duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-primary dark:text-[#BBE1FA] mb-4 sm:mb-0">Administración de Usuarios</h1>
                    <Button onClick={handleOpenCreateModal} variant="primary" className="flex items-center">
                        <FiPlus className="mr-2"/> Nuevo Usuario
                    </Button>
                </div>

                {isLoading && !users.length && <p className="text-center dark:text-gray-300">Cargando usuarios...</p>}
                {error && !isLoading && <p className="text-red-500 text-center p-3 bg-red-100 dark:bg-red-800 dark:text-red-200 rounded-md">{error}</p>}
                
                {!isLoading && !error && users.length === 0 && (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-10">No se encontraron usuarios.</p>
                )}

                {users.length > 0 && (
                    <div className="overflow-x-auto bg-lightBrown dark:bg-darkSecondary rounded-lg shadow-md">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th className="px-4 py-3 sm:px-6">ID</th>
                                    <th className="px-4 py-3 sm:px-6">Nombre</th>
                                    <th className="px-4 py-3 sm:px-6">Correo</th>
                                    <th className="px-4 py-3 sm:px-6">Rol</th>
                                    <th className="px-4 py-3 sm:px-6">Estado</th>
                                    <th className="px-4 py-3 sm:px-6">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-4 py-4 sm:px-6 text-gray-700 dark:text-gray-300">{user.id}</td>
                                        <td className="px-4 py-4 sm:px-6 text-gray-900 dark:text-white font-medium">{user.nombre}</td>
                                        <td className="px-4 py-4 sm:px-6 text-gray-600 dark:text-gray-300">{user.email}</td>
                                        <td className="px-4 py-4 sm:px-6 text-gray-600 dark:text-gray-300 capitalize">{user.role?.toLowerCase()}</td>
                                        <td className="px-4 py-4 sm:px-6">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            user.is_active ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'
                                        }`}>
                                            {user.is_active ? 'Activo' : 'Inactivo'}
                                        </span>
                                        </td>
                                        <td className="px-4 py-4 sm:px-6 space-x-2 whitespace-nowrap">
                                        <Button onClick={() => handleOpenEditModal(user)} variant="icon" size="sm" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                            <FiEdit /> <span className="sr-only sm:not-sr-only ml-1">Editar</span>
                                        </Button>
                                        <Button onClick={() => handleOpenDeleteModal(user)} variant="icon" size="sm" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                                            <FiTrash2 /> <span className="sr-only sm:not-sr-only ml-1">Eliminar</span>
                                        </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {users.length > 0 && (
                    <Pagination 
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        hasMoreNext={hasMoreNextPage}
                        itemsPerPage={ITEMS_PER_PAGE} 
                    />
                )}

                {/*Crear Usuario */}
                <Modal isOpen={isCreateModalOpen} onClose={handleCloseModals} title="Crear Nuevo Usuario">
                    <UserForm
                        onSubmit={handleCreateUser}
                        onCancel={handleCloseModals}
                        isLoading={isLoading} 
                        isEditMode={false}
                    />
                    {error && isCreateModalOpen && <p className="mt-2 text-red-500 text-sm">{error}</p>}
                </Modal>

                {/*Editar Usuario */}
                {selectedUser && (
                <Modal isOpen={isEditModalOpen} onClose={handleCloseModals} title={`Editar Usuario: ${selectedUser.nombre}`}>
                    <UserForm
                        initialData={{
                            nombre: selectedUser.nombre,
                            email: selectedUser.email,
                            role: selectedUser.role,
                            is_active: selectedUser.is_active,
                        }}
                        onSubmit={handleUpdateUser}
                        onCancel={handleCloseModals}
                        isLoading={isLoading}
                        isEditMode={true}
                    />
                    {error && isEditModalOpen && <p className="mt-2 text-red-500 text-sm">{error}</p>}
                </Modal>
                )}

                {/* Confirmar Eliminación */}
                {selectedUser && (
                <Modal
                    isOpen={isDeleteModalOpen}
                    onClose={handleCloseModals}
                    title="Confirmar Eliminacion"
                    footer={
                    <div className="flex justify-end space-x-3">
                        <Button variant="secondary" onClick={handleCloseModals} disabled={isLoading}>Cancelar</Button>
                        <Button variant="danger" onClick={handleDeleteUser} disabled={isLoading}>
                            {isLoading ? 'Eliminando...' : 'Eliminar Usuario'}
                        </Button>
                    </div>
                    }
                >
                    <p className="text-gray-700 dark:text-gray-300">
                        ¿Estas seguro de que quieres eliminar al usuario <strong className="font-medium">{selectedUser.nombre}</strong> ({selectedUser.email})? Esta acción no se puede deshacer.
                    </p>
                    {error && isDeleteModalOpen && <p className="mt-2 text-red-500 text-sm">{error}</p>}
                </Modal>
                )}
            </div>
        </div>
    );
}

export default AdminUsers;