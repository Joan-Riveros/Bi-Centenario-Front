import apiClient from './api';

// Obtener listado de documentos (con filtros opcionales)
export const getDocuments = async (params = {}) => {
    const response = await apiClient.get('/documents/', { params });
    return response.data;
};

// Obtener detalle de un documento por ID
export const getDocumentById = async (id) => {
    const response = await apiClient.get(`/documents/${id}`);
    return response.data;
};

// Descargar archivo principal del documento
export const downloadDocumentFile = async (id) => {
    const response = await apiClient.get(`/documents/${id}/download`, {
        responseType: 'blob',
    });
    return response.data;
};

// Descargar imagen de portada
export const downloadDocumentCover = async (id) => {
    const response = await apiClient.get(`/documents/${id}/cover/download`, {
        responseType: 'blob',
    });
    return response.data;
};

// Preview de los docs
export const getDocumentPreviewUrl = (id) => {
    return `${import.meta.env.VITE_API_BASE_URL}/documents/${id}/preview`;
};
