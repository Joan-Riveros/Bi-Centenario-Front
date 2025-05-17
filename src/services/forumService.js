import apiClient from './api';

// Obtener categorías del foro
export const getForumCategories = async () => {
  try {
    const res = await apiClient.get('/forum/categories/');
    return res.data;
  } catch (err) {
    console.error("Error al obtener categorías:", err);
    throw err;
  }
};


// Obtener temas por categoría
export const getTopicsByCategory = async (categoryId, limit = 10, offset = 0) => {
  const res = await apiClient.get(`/forum/topics?category_id=${categoryId}&limit=${limit}&offset=${offset}`);
  return res.data;
};

// Obtener detalle de un tema
export const getTopicById = async (topicId) => {
  const res = await apiClient.get(`/forum/topics/${topicId}`);
  return res.data;
};

// Crear nuevo tema
export const createTopic = async (data) => {
  const res = await apiClient.post('/forum/topics/', data);
  return res.data;
};

// Obtener respuestas de un tema
export const getPostsByTopic = async (topicId, skip = 0, limit = 20) => {
  const res = await apiClient.get(
    `/forum/posts?topic_id=${topicId}&skip=${skip}&limit=${limit}`
  );
  return res.data;
};


// Crear respuesta
export const createPost = async (data) => {
  const res = await apiClient.post('/forum/posts/', data);
  return res.data;
};

