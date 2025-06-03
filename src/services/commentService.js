import apiClient from './api';


// Crear un nuevo comentario o respuesta
export const createComment = async (commentData) => {
  // commentData debería ser un objeto como:
  // { document_id: number, content: string, parent_comment_id?: number | null }
  const response = await apiClient.post('/comments/comments', commentData);
  return response.data;
};

// Listar comentarios de un documento (solo nivel superior)
export const getCommentsForDocument = async (documentId, params = {}) => {
  // params puede incluir skip, limit
  const response = await apiClient.get(`/comments/comments/document/${documentId}`, { params });
  return response.data;
};

// Listar respuestas de un comentario
export const getRepliesForComment = async (commentId, params = {}) => {
  // params puede incluir skip, limit
  const response = await apiClient.get(`/comments/comments/${commentId}/replies`, { params });
  return response.data;
};

// Actualizar un comentario
export const updateComment = async (commentId, commentUpdateData) => {
  // commentUpdateData debería ser un objeto como:
  // { content: string }
  const response = await apiClient.put(`/comments/comments/${commentId}`, commentUpdateData);
  return response.data;
};

// Eliminar un comentario
export const deleteComment = async (commentId) => {
  const response = await apiClient.delete(`/comments/comments/${commentId}`);
  return response.data;
};