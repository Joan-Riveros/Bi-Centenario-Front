import apiClient from './api'; 

/**
 * @typedef {Object} UserDataFromAdmin
 * @property {string} nombre
 * @property {string} email
 * @property {string} [password] 
 * @property {string} role 
 * @property {boolean} is_active
 */

/**
 * @typedef {Object} UserOut
 * @property {number} id
 * @property {string} nombre
 * @property {string} email
 * @property {string} role
 * @property {boolean} is_active
 */

/**
 * @param {number} skip 
 * @param {number} limit 
 * @returns {Promise<UserOut[]>}
 */
const getUsers = async (skip = 0, limit = 20) => { 
  try {
    const response = await apiClient.get('/admin/users/', {
      params: { skip, limit }
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message || "Error al obtener usuarios" };
  }
};

/**
 * @param {UserDataFromAdmin} userData 
 * @returns {Promise<UserOut>} 
 */
const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/admin/users/', userData);
    return response.data; 
  } catch (error) {
    console.error('Error creating user:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message || "Error al crear usuario" };
  }
};

/**
 * @param {number} userId 
 * @returns {Promise<UserOut>} 
 */
const getUserById = async (userId) => {
  try {
    const response = await apiClient.get(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error.response?.data || error.message);
    throw error.response?.data || { message: error.message || "Error al obtener datos del usuario" };
  }
};


/**
 * @param {number} userId 
 * @param {Partial<UserDataFromAdmin>} userData 
 * @returns {Promise<UserOut>} 
 */
const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/admin/users/${userId}`, userData);
    return response.data; 
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error.response?.data || error.message);
    throw error.response?.data || { message: error.message || "Error al actualizar usuario" };
  }
};

/**
 * @param {number} userId 
 * @returns {Promise<UserOut>} 
 */
const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/admin/users/${userId}`);
    return response.data; 
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error.response?.data || error.message);
    throw error.response?.data || { message: error.message || "Error al eliminar usuario" };
  }
};

export const adminService = {
  getUsers,
  createUser,
  getUserById, 
  updateUser,
  deleteUser,
};