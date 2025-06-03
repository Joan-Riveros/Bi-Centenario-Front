import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("BASE URL desde .env:", API_BASE_URL); 

export const subirDocumento = async (formData) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No se encontro el token en localStorage.");
  }

  return await axios.post(`${API_BASE_URL}/documents/direct-upload/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};